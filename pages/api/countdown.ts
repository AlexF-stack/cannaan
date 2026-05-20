import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import { isAuthorizedCookieHeader } from "@/lib/admin-session";

const configPath = path.join(process.cwd(), 'data', 'launch.json');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    if (fs.existsSync(configPath)) {
      const data = fs.readFileSync(configPath, 'utf8');
      res.status(200).json(JSON.parse(data));
    } else {
      res.status(404).json({ error: 'Config not found' });
    }
  } else if (req.method === 'POST') {
    if (!isAuthorizedCookieHeader(req.headers.cookie)) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    const { launchDate } = req.body;
    if (!launchDate) {
      return res.status(400).json({ error: 'launchDate is required' });
    }

    fs.writeFileSync(configPath, JSON.stringify({ launchDate }, null, 2));
    res.status(200).json({ launchDate });
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
