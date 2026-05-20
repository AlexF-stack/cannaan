import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: true,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { audioId, content, summary, title, speaker, date } = req.body as { 
    audioId: string; 
    content?: string; 
    summary?: string;
    title?: string;
    speaker?: string;
    date?: string;
  };

  const actualContent = content || summary;

  if (!audioId || typeof actualContent !== 'string') {
    return res.status(400).json({ error: 'Missing audioId or summary content' });
  }

  const manifestPath = path.join(process.cwd(), 'data', 'audio_summaries.json');
  let manifest: any[] = [];
  try {
    const raw = await fs.promises.readFile(manifestPath, 'utf-8');
    manifest = JSON.parse(raw);
  } catch (_) {}

  // Upsert summary and metadata
  const existing = manifest.find((item) => item.audioId === audioId);
  if (existing) {
    existing.content = actualContent;
    if (title) existing.title = title;
    if (speaker) existing.speaker = speaker;
    if (date) existing.date = date;
  } else {
    manifest.push({ 
      audioId, 
      content: actualContent, 
      title: title || 'Message Audio',
      speaker: speaker || 'Prophète Ithiel Dossou',
      date: date || new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }),
      createdAt: new Date().toISOString() 
    });
  }

  await fs.promises.mkdir(path.dirname(manifestPath), { recursive: true });
  await fs.promises.writeFile(manifestPath, JSON.stringify(manifest, null, 2));

  res.status(200).json({ success: true });
}
