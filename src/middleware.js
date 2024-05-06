export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/cpa/:path*", "/academic/:path*", "/courses/:path*"],
};
