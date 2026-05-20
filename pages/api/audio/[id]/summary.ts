import type { NextApiRequest, NextApiResponse } from 'next';
import { getSummary, updateSummary } from '@/services/audioSummaries';
import { isAuthorizedCookieHeader } from '@/lib/admin-session';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  if (typeof id !== 'string') {
    res.status(400).json({ error: 'Invalid audio ID' });
    return;
  }

  if (req.method === 'GET') {
    const summary = getSummary(id);
    res.status(200).json({ id, summary });
  } else if (req.method === 'POST') {
    if (!isAuthorizedCookieHeader(req.headers.cookie)) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    const { summary } = req.body;
    if (typeof summary !== 'string') {
      res.status(400).json({ error: 'Summary must be a string' });
      return;
    }
    updateSummary(id, summary);
    res.status(200).json({ id, summary });
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
