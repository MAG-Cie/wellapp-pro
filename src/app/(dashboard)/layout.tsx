import { Sidebar } from '@/components/dashboard/sidebar';
import { Header } from '@/components/dashboard/header';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <Sidebar />
      <div className="ml-64 flex flex-col flex-1 pt-16">
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
          {children}
        </main>
        <footer className="border-t border-gray-200 dark:border-gray-700 p-4 text-center text-sm text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} WellApp Pro. Tous droits réservés.
        </footer>
      </div>
    </div>
  );
}