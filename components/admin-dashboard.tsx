"use client";

import { useEffect, useState } from "react";
import AdminUpload from "@/components/admin-upload"; // existing generic uploader (kept for other uses)
import AdminAudioUpload from "@/components/admin-audio-upload";
import AdminImageReview from "@/components/admin-image-review";

export function AdminDashboard() {
  const [launchDate, setLaunchDate] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/countdown")
      .then((res) => res.json())
      .then((data: { launchDate?: string }) => setLaunchDate(data.launchDate ?? ""))
      .catch(() => setLaunchDate(""));
  }, []);

  const handleUpdateCountdown = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");
    const res = await fetch("/api/countdown", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ launchDate }),
    });
    setMessage(res.ok ? "Countdown updated!" : "Failed to update countdown");
  };

  return (
    <div className="space-y-12">
      {/* Countdown management */}
      <section className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
        <h2 className="mb-4 text-2xl font-bold">Manage Countdown</h2>
        <form onSubmit={handleUpdateCountdown} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-300">
              Target Launch Date (Benin Time)
            </label>
            <input
              type="datetime-local"
              value={launchDate.split("+")[0]}
              onChange={(e) => setLaunchDate(`${e.target.value}+01:00`)}
              className="w-full rounded-md bg-slate-800 p-2 text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-full bg-amber-400 py-2 font-bold text-slate-900 transition hover:bg-amber-300"
          >
            Update Timer
          </button>
          {message && <p className="text-center text-sm text-amber-200">{message}</p>}
        </form>
      </section>

      {/* Audio upload + summary */}
      <AdminAudioUpload />

      {/* Image review upload */}
      <AdminImageReview />

      {/* Legacy generic upload (kept for backward compatibility) */}
      <AdminUpload />
    </div>
  );
}
