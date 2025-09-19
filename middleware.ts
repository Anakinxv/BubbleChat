import { auth } from "@/auth";

// Middleware que protege todas las rutas menos las de auth
export default auth((req) => {
  // Si NO hay sesión y estás intentando entrar a algo protegido
  if (!req.auth && req.nextUrl.pathname.startsWith("/app")) {
    return Response.redirect(new URL("/auth/login", req.url)); // ajusta a tu ruta de login
  }
});

// Configuración de qué rutas cubrir
export const config = {
  matcher: [
    "/app/:path*", // protege todo lo que esté bajo /app
  ],
};
