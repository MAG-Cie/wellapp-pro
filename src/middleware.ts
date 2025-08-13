import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';

// Routes qui ne nécessitent pas d'authentification
const publicRoutes = ['/login', '/register', '/forgot-password', '/reset-password'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Ignorer les requêtes pour les ressources statiques
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/static') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Créer un client Supabase côté serveur
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (name) => request.cookies.get(name)?.value,
        set: (name, value, options) => {
          // Cette fonction n'est pas utilisée dans le middleware
        },
        remove: (name, options) => {
          // Cette fonction n'est pas utilisée dans le middleware
        },
      },
    }
  );

  // Vérifier si l'utilisateur est connecté
  const { data: { session } } = await supabase.auth.getSession();

  // Si l'utilisateur n'est pas connecté et essaie d'accéder à une route protégée
  if (!session && !publicRoutes.some(route => pathname.startsWith(route))) {
    const redirectUrl = new URL('/login', request.url);
    redirectUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(redirectUrl);
  }

  // Si l'utilisateur est connecté et essaie d'accéder à une route publique (login, register, etc.)
  if (session && publicRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Si l'utilisateur accède à la racine, rediriger vers le dashboard s'il est connecté, sinon vers login
  if (pathname === '/') {
    return NextResponse.redirect(new URL(session ? '/dashboard' : '/login', request.url));
  }

  return NextResponse.next();
}

// Configurer le middleware pour s'exécuter sur toutes les routes
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
