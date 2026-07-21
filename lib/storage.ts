import { appendFile, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { head, put } from "@vercel/blob";

const blobToken = () => process.env.BLOB_READ_WRITE_TOKEN;

export function hasBlobStorage(): boolean {
  return Boolean(blobToken());
}

function localPath(key: string): string {
  return path.join(process.cwd(), key.replace(/^\//, ""));
}

async function readBlobText(pathname: string): Promise<string | null> {
  const token = blobToken();
  if (!token) return null;
  try {
    const meta = await head(pathname, { token });
    const res = await fetch(meta.url);
    if (!res.ok) return null;
    return res.text();
  } catch {
    return null;
  }
}

export async function readTextFile(key: string): Promise<string | null> {
  if (hasBlobStorage()) {
    return readBlobText(key);
  }
  try {
    return await readFile(localPath(key), "utf8");
  } catch {
    return null;
  }
}

export async function readJsonFile<T>(key: string, fallback: T): Promise<T> {
  const raw = await readTextFile(key);
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export async function writeTextFile(
  key: string,
  content: string,
  access: "public" | "private" = "private",
): Promise<void> {
  if (hasBlobStorage()) {
    await put(key, content, {
      access,
      token: blobToken(),
      addRandomSuffix: false,
      allowOverwrite: true,
    });
    return;
  }
  const target = localPath(key);
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, content, "utf8");
}

export async function writeJsonFile(key: string, data: unknown): Promise<void> {
  await writeTextFile(key, JSON.stringify(data, null, 2), "private");
}

export async function appendTextFile(key: string, line: string): Promise<void> {
  const existing = (await readTextFile(key)) ?? "";
  await writeTextFile(key, existing + line, "private");
}

export async function appendTextFileLocal(key: string, line: string): Promise<void> {
  if (hasBlobStorage()) {
    await appendTextFile(key, line);
    return;
  }
  const target = localPath(key);
  await mkdir(path.dirname(target), { recursive: true });
  await appendFile(target, line, "utf8");
}

type UploadBody = Buffer | Blob | ArrayBuffer | ReadableStream | string;

export async function readAuditEntriesFromLog(
  key: string,
  limit = 100,
): Promise<
  Array<{
    timestamp: string;
    locale: string;
    sermonsCount: number;
    ip: string;
    userAgent: string;
    action: string;
  }>
> {
  const raw = await readTextFile(key);
  if (!raw) return [];
  const lines = raw
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  return lines
    .slice(-limit)
    .reverse()
    .map((line) => JSON.parse(line));
}

export async function uploadPublicFile(
  pathname: string,
  body: UploadBody,
  contentType: string,
): Promise<{ url: string; pathname: string }> {
  const normalized = pathname.replace(/^\//, "");

  if (hasBlobStorage()) {
    const useMultipart = Buffer.isBuffer(body) && body.length > 5 * 1024 * 1024;
    const result = await put(normalized, body, {
      access: "public",
      token: blobToken(),
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType,
      multipart: useMultipart,
    });
    return { url: result.url, pathname: result.pathname };
  }

  const target = path.join(process.cwd(), "public", normalized);
  await mkdir(path.dirname(target), { recursive: true });
  const buffer =
    typeof body === "string"
      ? Buffer.from(body)
      : body instanceof Buffer
        ? body
        : Buffer.from(body as ArrayBuffer);
  await writeFile(target, buffer);
  return { url: `/${normalized}`, pathname: normalized };
}
