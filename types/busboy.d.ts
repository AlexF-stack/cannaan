declare module "busboy" {
  import type { IncomingHttpHeaders } from "http";

  interface BusboyConfig {
    headers: IncomingHttpHeaders;
    limits?: { fileSize?: number };
  }

  interface BusboyFileInfo {
    mimeType: string;
    filename: string;
  }

  interface Busboy extends NodeJS.WritableStream {
    on(event: "file", listener: (name: string, stream: NodeJS.ReadableStream, info: BusboyFileInfo) => void): this;
    on(event: "finish", listener: () => void): this;
    on(event: "error", listener: (error: Error) => void): this;
  }

  function busboy(config: BusboyConfig): Busboy;
  export = busboy;
}
