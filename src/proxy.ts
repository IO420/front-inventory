import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { envConfig } from "./app/actions/config";

export function proxy(request: NextRequest) {
  const token = request.cookies.get("authToken")?.value;

  if (!token) {
    let destination = envConfig.login as string;

    return NextResponse.redirect(destination);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};
//IO
