"use client";

import { useState } from "react";

export default function AdminUpload() {
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    setUploading(true);
    setMessage("");
    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("Upload successful!");
        form.reset();
      } else {
        setMessage(data.error || "Upload failed");
      }
    } catch {
      setMessage("An unexpected error occurred");
    } finally {
      setUploading(false);
    }
  };

  return (
    <section className="max-w-2xl mx-auto p-6 bg-white/5 backdrop-blur-md rounded-2xl shadow-lg border border-white/10">
      <h2 className="text-2xl font-bold mb-4 text-white">Admin Upload</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">Audio File</label>
          <input
            type="file"
            name="audio"
            accept="audio/*"
            required
            className="w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-amber-400 file:text-slate-900 hover:file:bg-amber-300"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">Cover Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            required
            className="w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-amber-400 file:text-slate-900 hover:file:bg-amber-300"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">Summary (optional)</label>
          <textarea
            name="summary"
            rows={3}
            className="w-full rounded-md bg-slate-800 text-white p-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
        </div>
        <button
          type="submit"
          disabled={uploading}
          className="w-full py-2 px-4 bg-amber-400 text-slate-900 font-semibold rounded-full hover:bg-amber-300 transition"
        >
          {uploading ? "Uploading…" : "Upload"}
        </button>
        {message && <p className="mt-2 text-center text-sm text-amber-200">{message}</p>}
      </form>
    </section>
  );
}
