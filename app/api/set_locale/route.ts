import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const lang = searchParams.get("lang") === "en" ? "en" : "mk";

    const referer = request.headers.get("referer");
    const redirectTo = referer || "/";

    const response = NextResponse.redirect(redirectTo);
    response.cookies.set("locale", lang, {
        path: "/",
        maxAge: 60 * 60 * 24 * 365,
    });
    
    return response;
}