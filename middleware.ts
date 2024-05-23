import { NextRequest, NextResponse } from "next/server";
import { getUrl } from "./app/_lib/get-url";

export function middleware(request: NextRequest) {
    const token = request.cookies.get("__Secure-authjs.session-token");
    const pathname = request.nextUrl.pathname;

    if (pathname === "/auth" && token) {
        return NextResponse.redirect(new URL(getUrl("/app")));
    }
    if (pathname.includes("/app") && !token) {
        return NextResponse.redirect(new URL(getUrl("/auth")));
    }
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
