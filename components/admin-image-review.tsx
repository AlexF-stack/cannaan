"use client";

import { useState } from "react";

export default function AdminImageReview() {
  const [file, setFile] = useState<File | null>(null);
  const [caption, setCaption] = useState<string>("");
  const [status, setStatus] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const upload = async () => {
    if (!file) {
      setStatus("Please select an image file");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    formData.append("caption", caption);
    try {
      const res = await fetch("/api/images/review", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");
      setStatus(`Image uploaded: ${data.url}`);
      setFile(null);
      setCaption("");
    } catch (err: any) {
      setStatus(err.message);
    }
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md mt-8">
      <h2 className="mb-4 text-xl font-bold">Upload Image Review</h2>
      <input type="file" accept="image/*" onChange={handleFileChange} className="mb-4 w-full rounded-md bg-slate-800 p-2 text-white" />
      <input
        type="text"
        placeholder="Optional caption"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        className="mb-4 w-full rounded-md bg-slate-800 p-2 text-white"
      />
      <button
        onClick={upload}
        className="rounded-full bg-amber-400 py-2 px-4 font-bold text-slate-900 hover:bg-amber-300"
      >
        Upload Image
      </button>
      {status && <p className="mt-2 text-sm text-amber-200">{status}</p>}
    </div>
  );
}
