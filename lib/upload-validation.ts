const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif"]);
const AUDIO_EXTENSIONS = new Set([".mp3", ".mpeg", ".m4a", ".wav", ".ogg"]);

const IMAGE_MIMES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);
const AUDIO_MIMES = new Set([
  "audio/mpeg",
  "audio/mp3",
  "audio/mp4",
  "audio/x-m4a",
  "audio/wav",
  "audio/ogg",
]);

export function sanitizeExtension(filename: string, allowed: Set<string>, fallback: string) {
  const ext = filename.slice(filename.lastIndexOf(".")).toLowerCase();
  return allowed.has(ext) ? ext : fallback;
}

export function isAllowedImage(mimeType: string, filename: string) {
  const ext = filename.slice(filename.lastIndexOf(".")).toLowerCase();
  return IMAGE_MIMES.has(mimeType) && IMAGE_EXTENSIONS.has(ext);
}

export function isAllowedAudio(mimeType: string, filename: string) {
  const ext = filename.slice(filename.lastIndexOf(".")).toLowerCase();
  return (AUDIO_MIMES.has(mimeType) || mimeType === "application/octet-stream") && AUDIO_EXTENSIONS.has(ext);
}

export const UPLOAD_LIMITS = {
  imageBytes: 5 * 1024 * 1024,
  audioBytes: 50 * 1024 * 1024,
} as const;
