"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import type { Locale } from "@/lib/i18n";

type Sermon = { title: string; date: string; speaker: string };
type Events = {
  mainTitle: string;
  mainDescription: string;
  sunday: string;
  welcome: string;
  speaker: string;
  study: string;
  youth: string;
};

export function AdminEditor({
  locale,
  initialSermons,
  initialEvents,
}: {
  locale: Locale;
  initialSermons: Sermon[];
  initialEvents: Events;
}) {
  const [sermons, setSermons] = useState<Sermon[]>(initialSermons);
  const [events, setEvents] = useState<Events>(initialEvents);
  const [status, setStatus] = useState("");

  const onSermonChange = (index: number, key: keyof Sermon, value: string) => {
    setSermons((prev) => prev.map((item, i) => (i === index ? { ...item, [key]: value } : item)));
  };

  const save = async () => {
    setStatus("Saving...");
    const response = await fetch("/api/admin/content", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        locale,
        sermons,
        events,
      }),
    });
    setStatus(response.ok ? "Saved" : "Unauthorized or invalid payload");
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-3">
        {Object.entries(events).map(([key, value]) => (
          <input
            key={key}
            className="h-10 w-full rounded-lg border border-white/15 bg-black/30 px-3 text-sm text-white"
            value={value}
            onChange={(e) => setEvents((prev) => ({ ...prev, [key]: e.target.value }))}
            placeholder={key}
          />
        ))}
      </div>

      <div className="space-y-4">
        {sermons.map((sermon, index) => (
          <div key={`${sermon.title}-${index}`} className="rounded-xl border border-white/10 p-4">
            <input
              className="mb-2 h-10 w-full rounded-lg border border-white/15 bg-black/30 px-3 text-sm text-white"
              value={sermon.title}
              onChange={(e) => onSermonChange(index, "title", e.target.value)}
              placeholder="Title"
            />
            <input
              className="mb-2 h-10 w-full rounded-lg border border-white/15 bg-black/30 px-3 text-sm text-white"
              value={sermon.date}
              onChange={(e) => onSermonChange(index, "date", e.target.value)}
              placeholder="Date"
            />
            <input
              className="h-10 w-full rounded-lg border border-white/15 bg-black/30 px-3 text-sm text-white"
              value={sermon.speaker}
              onChange={(e) => onSermonChange(index, "speaker", e.target.value)}
              placeholder="Speaker"
            />
          </div>
        ))}
      </div>

      <Button onClick={save}>Save content</Button>
      <p className="text-sm text-white/70">{status}</p>
    </div>
  );
}
