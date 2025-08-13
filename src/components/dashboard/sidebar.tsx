'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  FileText, 
  MessageSquare, 
  CheckSquare, 
  Settings,
  LogOut
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { signOut } from '@/lib/supabase/utils';

// Définition des liens de navigation
const navLinks = [
  {
    name: 'Tableau de bord',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    name: 'Agenda',
    href: '/agenda',
    icon: Calendar,
  },
  {
    name: 'CRM',
    href: '/crm',
    icon: Users,
  },
  {
    name: 'Carnet de santé',
    href: '/health-records',
    icon: FileText,
  },
  {
    name: 'Messagerie',
    href: '/messages',
    icon: MessageSquare,
  },
  {
    name: 'Tâches',
    href: '/tasks',
    icon: CheckSquare,
  },
  {
    name: 'Paramètres',
    href: '/settings',
    icon: Settings,
  },
];

export function Sidebar() {
  const pathname = usePathname();

  const handleSignOut = async () => {
    await signOut();
    // La redirection sera gérée par le middleware
  };

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-gray-200 bg-white pt-16 dark:border-gray-700 dark:bg-gray-900">
      <div className="h-full overflow-y-auto px-3 py-5">
        <ul className="space-y-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
            const Icon = link.icon;
            
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    'flex items-center rounded-lg p-2 text-base font-medium transition duration-75',
                    isActive
                      ? 'bg-primary/10 text-primary'
                      : 'text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700'
                  )}
                >
                  <Icon className={cn('h-5 w-5', isActive ? 'text-primary' : 'text-gray-500 dark:text-gray-400')} />
                  <span className="ml-3">{link.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
        
        <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={handleSignOut}
            className="flex w-full items-center rounded-lg p-2 text-base font-medium text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
          >
            <LogOut className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            <span className="ml-3">Déconnexion</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
