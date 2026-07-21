import type { NextApiRequest } from "next";

import { isAuthorizedCookieHeader } from "@/lib/admin-session";

export function requireAdminApi(req: NextApiRequest) {
  return isAuthorizedCookieHeader(req.headers.cookie ?? "");
}
