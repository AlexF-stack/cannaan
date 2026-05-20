"use client";

import { useState } from "react";

export default function AdminAudioUpload() {
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [title, setTitle] = useState<string>("");
  const [speaker, setSpeaker] = useState<string>("Prophète Ithiel Dossou");
  const [date, setDate] = useState<string>(() => {
    const today = new Date();
    return today.toISOString().split("T")[0]; // YYYY-MM-DD format
  });
  const [summary, setSummary] = useState<string>("");
  const [status, setStatus] = useState<string>("");

  const handleAudioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAudioFile(e.target.files[0]);
    }
  };

  const uploadAudio = async () => {
    if (!audioFile) {
      setStatus("Veuillez sélectionner un fichier audio.");
      return;
    }
    if (!title.trim()) {
      setStatus("Veuillez saisir un titre pour le message.");
      return;
    }
    if (!summary.trim()) {
      setStatus("Veuillez rédiger un résumé pour le message.");
      return;
    }

    setStatus("Téléversement de l'audio en cours...");
    const formData = new FormData();
    formData.append("file", audioFile);
    const res = await fetch("/api/audio/upload", {
      method: "POST",
      body: formData,
    });
    if (!res.ok) {
      setStatus("Le téléversement de l'audio a échoué.");
      return;
    }
    const { audioId } = await res.json();
    setStatus("Audio téléversé avec succès. Enregistrement du résumé...");

    // Formatting date to French style for display (e.g. "20 Mai 2026")
    const formattedDate = new Date(date).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    // send summary and metadata linked to audioId
    const summaryRes = await fetch("/api/audio/summary", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        audioId, 
        summary,
        title,
        speaker,
        date: formattedDate
      }),
    });

    if (summaryRes.ok) {
      setStatus("Prédication enregistrée avec succès sur la page d'accueil !");
      // Reset form fields
      setAudioFile(null);
      setTitle("");
      setSummary("");
    } else {
      setStatus("Erreur lors de l'enregistrement du résumé.");
    }
  };

  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-md mt-8">
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-300">Nouveau message</p>
        <h2 className="mt-2 text-2xl font-bold text-white">Ajouter un Message Audio + Résumé</h2>
        <p className="mt-1 text-sm text-slate-300">
          Publiez les enseignements réels du prophète avec leur piste audio et un résumé détaillé.
        </p>
      </div>

      <div className="space-y-5">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-200">
            Fichier Audio (.mp3, .wav, .m4a)
          </label>
          <input 
            type="file" 
            accept="audio/*" 
            onChange={handleAudioChange} 
            className="w-full rounded-xl border border-white/10 bg-black/40 p-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-400 file:mr-4 file:py-1.5 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-amber-400 file:text-slate-900 hover:file:bg-amber-300 file:cursor-pointer" 
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-200">
              Titre du Message
            </label>
            <input
              type="text"
              placeholder="Ex: Renaître dans la Grâce"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-200">
              Orateur / Prédicateur
            </label>
            <input
              type="text"
              placeholder="Ex: Prophète Ithiel Dossou"
              value={speaker}
              onChange={(e) => setSpeaker(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-200">
            Date de Prédication
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-200">
            Résumé du Message (Ce qui sera affiché et lu)
          </label>
          <textarea
            placeholder="Écrivez le résumé inspirant et détaillé du message ici..."
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400"
            rows={5}
          />
        </div>

        <button
          onClick={uploadAudio}
          className="w-full rounded-full bg-amber-400 py-3.5 px-6 font-bold text-slate-900 shadow-xl shadow-amber-400/20 transition-all hover:scale-[1.01] hover:bg-amber-300 active:scale-[0.99]"
        >
          Publier le message réels
        </button>

        {status && (
          <div className="rounded-xl bg-white/5 p-4 border border-white/5 text-center">
            <p className="text-sm font-semibold text-amber-300">{status}</p>
          </div>
        )}
      </div>
    </div>
  );
}
