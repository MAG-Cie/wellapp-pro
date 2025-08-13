'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Bell, Menu, X } from 'lucide-react';
import { getCurrentUser } from '@/lib/supabase/utils';
import { Database } from '@/types/database.types';

type Profile = Database['public']['Tables']['profiles']['Row'];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<{ id: string; email?: string } | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { user, error } = await getCurrentUser();
      if (user && !error) {
        setUser(user);
        // Ici, on pourrait également récupérer le profil complet depuis la table profiles
      }
    };

    fetchUser();
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={toggleMobileMenu}
              type="button"
              className="inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 md:hidden dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            >
              <span className="sr-only">Ouvrir le menu</span>
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
            <Link href="/dashboard" className="ml-2 flex md:mr-24">
              <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                WellApp<span className="text-primary">Pro</span>
              </span>
            </Link>
          </div>
          <div className="flex items-center">
            <div className="relative ml-3 flex items-center">
              <button
                type="button"
                className="mr-4 rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:ring-4 focus:ring-gray-300 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                <span className="sr-only">Voir les notifications</span>
                <Bell className="h-6 w-6" />
              </button>
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-medium">
                  {user?.email ? user.email.charAt(0).toUpperCase() : 'U'}
                </div>
                <div className="ml-2">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {profile?.first_name ? `${profile.first_name} ${profile.last_name || ''}` : user?.email || 'Utilisateur'}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {profile?.role || 'Utilisateur'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
