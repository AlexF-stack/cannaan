import type { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Parse multipart form data manually (simple implementation)
  const busboy = require('busboy');
  const bb = busboy({ headers: req.headers });
  let fileData: Buffer[] = [];
  let fileName = '';
  let mimeType = '';

  bb.on('file', (name: string, file: any, info: any) => {
    mimeType = info.mimeType;
    fileName = info.filename;
    file.on('data', (data: Buffer) => {
      fileData.push(data);
    });
  });

  bb.on('finish', async () => {
    if (!mimeType.startsWith('image/')) {
      return res.status(400).json({ error: 'Invalid file type' });
    }
    const buffer = Buffer.concat(fileData);
    const id = uuidv4();
    const ext = path.extname(fileName) || '.jpg';
    const filePath = path.join(process.cwd(), 'public', 'uploads', 'reviews', `${id}${ext}`);
    await fs.promises.mkdir(path.dirname(filePath), { recursive: true });
    await fs.promises.writeFile(filePath, buffer);
    const url = `/uploads/reviews/${id}${ext}`;
    // Optional: store metadata in JSON manifest
    const manifestPath = path.join(process.cwd(), 'data', 'image_reviews.json');
    let manifest = [] as any[];
    try {
      const content = await fs.promises.readFile(manifestPath, 'utf-8');
      manifest = JSON.parse(content);
    } catch (_) {}
    manifest.push({ id, url, title: '', description: '' });
    await fs.promises.mkdir(path.dirname(manifestPath), { recursive: true });
    await fs.promises.writeFile(manifestPath, JSON.stringify(manifest, null, 2));
    res.status(200).json({ id, url });
  });

  req.pipe(bb);
}
