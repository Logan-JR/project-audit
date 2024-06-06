import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export default withAuth(
  async function middleware(req) {
    const { pathname } = req.nextUrl;
    const session = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });
    const accessControl = {
      admin: ["/cpa"],
      secretario: ["/academic"],
      cursos: ["/courses"],
    };

    if (!session) {
      const url = req.nextUrl.clone();
      url.pathname = "/auth/signin";
      return NextResponse.redirect(url);
    }

    const role = session.user.role;
    if (accessControl[role]) {
      const allowedPaths = accessControl[role];
      const isAllowed = allowedPaths.some((path) => pathname.startsWith(path));

      if (!isAllowed) {
        const url = req.nextUrl.clone();
        url.pathname = "/";
        return NextResponse.redirect(url);
      }
    }
    return NextResponse.next();
  },
  {
    callbacks: {
      async authorized({ token }) {
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: ["/cpa/:path*", "/academic/:path*", "/courses/:path*"],
};
