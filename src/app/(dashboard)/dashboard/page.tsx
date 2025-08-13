'use client';

import { useState, useEffect } from 'react';
import { getCurrentUser } from '@/lib/supabase/utils';
import { Database } from '@/types/database.types';
import { 
  Calendar, 
  Users, 
  FileText, 
  MessageSquare, 
  CheckSquare,
  Clock,
  TrendingUp
} from 'lucide-react';

type Profile = Database['public']['Tables']['profiles']['Row'];

// Composant pour les cartes de statistiques
function StatCard({ title, value, icon: Icon, color }: { 
  title: string; 
  value: string | number; 
  icon: React.ElementType;
  color: string;
}) {
  return (
    <div className="rounded-lg border bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
          <h3 className="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">{value}</h3>
        </div>
        <div className={`rounded-full p-3 ${color}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
    </div>
  );
}

// Composant pour les cartes d'accès rapide
function QuickAccessCard({ title, description, icon: Icon, href }: { 
  title: string; 
  description: string; 
  icon: React.ElementType;
  href: string;
}) {
  return (
    <a 
      href={href}
      className="flex flex-col rounded-lg border bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-gray-800 dark:bg-gray-900"
    >
      <div className="mb-4 rounded-full bg-primary/10 p-3 w-fit">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">{title}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
    </a>
  );
}

export default function DashboardPage() {
  const [user, setUser] = useState<{ id: string; email?: string } | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      try {
        const { user, error } = await getCurrentUser();
        if (user && !error) {
          setUser(user);
          // Ici, on pourrait également récupérer le profil complet depuis la table profiles
        }
      } catch (error) {
        console.error('Erreur lors de la récupération de l\'utilisateur:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* En-tête du tableau de bord */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Bonjour, {profile?.first_name || user?.email?.split('@')[0] || 'Utilisateur'}
        </h1>
        <p className="mt-1 text-gray-500 dark:text-gray-400">
          Voici un aperçu de votre activité et des tâches à venir.
        </p>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Rendez-vous aujourd'hui" 
          value="5" 
          icon={Calendar} 
          color="bg-blue-500" 
        />
        <StatCard 
          title="Nouveaux clients" 
          value="12" 
          icon={Users} 
          color="bg-green-500" 
        />
        <StatCard 
          title="Consultations en attente" 
          value="8" 
          icon={FileText} 
          color="bg-amber-500" 
        />
        <StatCard 
          title="Messages non lus" 
          value="3" 
          icon={MessageSquare} 
          color="bg-purple-500" 
        />
      </div>

      {/* Rendez-vous à venir */}
      <div>
        <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
          Rendez-vous à venir
        </h2>
        <div className="rounded-lg border bg-white dark:border-gray-800 dark:bg-gray-900">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-800 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">Client</th>
                  <th scope="col" className="px-6 py-3">Patient</th>
                  <th scope="col" className="px-6 py-3">Date</th>
                  <th scope="col" className="px-6 py-3">Heure</th>
                  <th scope="col" className="px-6 py-3">Type</th>
                  <th scope="col" className="px-6 py-3">Statut</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b dark:border-gray-700">
                  <td className="px-6 py-4">Martin Dupont</td>
                  <td className="px-6 py-4">Rex (Berger Allemand)</td>
                  <td className="px-6 py-4">13/08/2025</td>
                  <td className="px-6 py-4">14:30</td>
                  <td className="px-6 py-4">Consultation</td>
                  <td className="px-6 py-4">
                    <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
                      Confirmé
                    </span>
                  </td>
                </tr>
                <tr className="border-b dark:border-gray-700">
                  <td className="px-6 py-4">Sophie Martin</td>
                  <td className="px-6 py-4">Minou (Chat Européen)</td>
                  <td className="px-6 py-4">13/08/2025</td>
                  <td className="px-6 py-4">15:45</td>
                  <td className="px-6 py-4">Vaccination</td>
                  <td className="px-6 py-4">
                    <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
                      Confirmé
                    </span>
                  </td>
                </tr>
                <tr className="border-b dark:border-gray-700">
                  <td className="px-6 py-4">Jean Petit</td>
                  <td className="px-6 py-4">Bubulle (Poisson rouge)</td>
                  <td className="px-6 py-4">13/08/2025</td>
                  <td className="px-6 py-4">16:30</td>
                  <td className="px-6 py-4">Urgence</td>
                  <td className="px-6 py-4">
                    <span className="rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800 dark:bg-red-900 dark:text-red-300">
                      En attente
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Accès rapide */}
      <div>
        <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
          Accès rapide
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <QuickAccessCard 
            title="Agenda" 
            description="Gérer les rendez-vous et consultations" 
            icon={Calendar} 
            href="/agenda" 
          />
          <QuickAccessCard 
            title="Clients & Patients" 
            description="Accéder à la base de données clients" 
            icon={Users} 
            href="/crm" 
          />
          <QuickAccessCard 
            title="Dossiers médicaux" 
            description="Consulter les dossiers médicaux" 
            icon={FileText} 
            href="/health-records" 
          />
          <QuickAccessCard 
            title="Messagerie" 
            description="Communiquer avec les clients" 
            icon={MessageSquare} 
            href="/messages" 
          />
          <QuickAccessCard 
            title="Tâches" 
            description="Gérer les tâches et rappels" 
            icon={CheckSquare} 
            href="/tasks" 
          />
          <QuickAccessCard 
            title="Rapports" 
            description="Analyser l'activité du cabinet" 
            icon={TrendingUp} 
            href="/reports" 
          />
        </div>
      </div>

      {/* Activité récente */}
      <div>
        <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
          Activité récente
        </h2>
        <div className="rounded-lg border bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            <li className="py-3">
              <div className="flex items-center space-x-4">
                <div className="rounded-full bg-blue-100 p-2 dark:bg-blue-900">
                  <Calendar className="h-4 w-4 text-blue-600 dark:text-blue-300" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    Nouveau rendez-vous ajouté
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Martin Dupont - 13/08/2025 à 14:30
                  </p>
                </div>
                <div className="inline-flex items-center text-xs text-gray-500 dark:text-gray-400">
                  <Clock className="mr-1 h-3 w-3" />
                  Il y a 30 min
                </div>
              </div>
            </li>
            <li className="py-3">
              <div className="flex items-center space-x-4">
                <div className="rounded-full bg-green-100 p-2 dark:bg-green-900">
                  <Users className="h-4 w-4 text-green-600 dark:text-green-300" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    Nouveau client enregistré
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Sophie Martin avec son chat Minou
                  </p>
                </div>
                <div className="inline-flex items-center text-xs text-gray-500 dark:text-gray-400">
                  <Clock className="mr-1 h-3 w-3" />
                  Il y a 2h
                </div>
              </div>
            </li>
            <li className="py-3">
              <div className="flex items-center space-x-4">
                <div className="rounded-full bg-purple-100 p-2 dark:bg-purple-900">
                  <MessageSquare className="h-4 w-4 text-purple-600 dark:text-purple-300" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    Nouveau message reçu
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Jean Petit concernant son poisson rouge Bubulle
                  </p>
                </div>
                <div className="inline-flex items-center text-xs text-gray-500 dark:text-gray-400">
                  <Clock className="mr-1 h-3 w-3" />
                  Il y a 3h
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
