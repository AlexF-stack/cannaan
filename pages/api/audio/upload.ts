import { promises as fs } from 'fs';
import path from 'path';
import formidable from 'formidable';
import { v4 as uuidv4 } from 'uuid';
import type { NextApiRequest, NextApiResponse } from 'next';

export const config = {
  api: {
    bodyParser: false,
  },
};

const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'audio');

/** Ensure the upload directory exists */
async function ensureUploadDir() {
  try {
    await fs.mkdir(uploadDir, { recursive: true });
  } catch (err) {
    // ignore if exists
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  await ensureUploadDir();
  const form = new formidable.IncomingForm({
    uploadDir,
    keepExtensions: true,
    maxFileSize: 50 * 1024 * 1024, // 50 MB
    // generate random filename
    filename: (name, ext, part) => `${uuidv4()}${ext}`,
  });
  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Upload failed' });
    }
    const file = files.file as any;
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    // file.filepath already points to uploadDir with random name
    const filename = path.basename(file.filepath);
    const urlPath = `/uploads/audio/${filename}`;
    return res.status(200).json({ 
      message: 'Upload successful', 
      audioId: filename,
      url: urlPath 
    });
  });
}
