import Image from 'next/image';
import Link from 'next/link';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Côté gauche - Formulaire */}
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="mb-8">
            <Link href="/" className="flex items-center">
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                WellApp<span className="text-primary">Pro</span>
              </span>
            </Link>
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              Bienvenue sur WellApp Pro
            </h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              La solution complète pour la gestion de votre cabinet vétérinaire
            </p>
          </div>
          {children}
        </div>
      </div>
      
      {/* Côté droit - Image */}
      <div className="relative hidden w-0 flex-1 lg:block">
        <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-600 to-indigo-600 opacity-90">
          <div className="flex h-full items-center justify-center p-12">
            <div className="max-w-xl text-center text-white">
              <h2 className="text-3xl font-bold mb-4">Gérez votre cabinet vétérinaire en toute simplicité</h2>
              <p className="text-xl mb-8">
                Agenda, dossiers médicaux, facturation, et bien plus encore dans une seule application.
              </p>
              <div className="grid grid-cols-2 gap-6 text-left">
                <div className="bg-white/10 p-4 rounded-lg">
                  <h3 className="font-bold mb-2">Agenda intelligent</h3>
                  <p>Gestion des rendez-vous optimisée et rappels automatiques</p>
                </div>
                <div className="bg-white/10 p-4 rounded-lg">
                  <h3 className="font-bold mb-2">Dossiers médicaux</h3>
                  <p>Suivi complet de la santé de vos patients</p>
                </div>
                <div className="bg-white/10 p-4 rounded-lg">
                  <h3 className="font-bold mb-2">CRM intégré</h3>
                  <p>Gestion de la relation client simplifiée</p>
                </div>
                <div className="bg-white/10 p-4 rounded-lg">
                  <h3 className="font-bold mb-2">Multi-établissements</h3>
                  <p>Gérez plusieurs cliniques depuis une seule interface</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}