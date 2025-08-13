'use client';

import { useState } from 'react';
import Link from 'next/link';
import { resetPassword } from '@/lib/supabase/utils';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const { error } = await resetPassword(email);
      
      if (error) {
        setError(error.message);
      } else {
        setIsSubmitted(true);
      }
    } catch (err) {
      setError('Une erreur est survenue lors de l\'envoi du lien de réinitialisation');
      console.error('Erreur de réinitialisation:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="mt-8">
        <div className="mt-6">
          {error && (
            <div className="mb-4 rounded-md bg-red-50 p-4 text-sm text-red-700">
              {error}
            </div>
          )}
          
          {isSubmitted ? (
            <div className="rounded-md bg-green-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-green-800">Email envoyé</h3>
                  <div className="mt-2 text-sm text-green-700">
                    <p>
                      Si un compte existe avec cette adresse email, vous recevrez un lien de réinitialisation de mot de passe.
                    </p>
                  </div>
                  <div className="mt-4">
                    <div className="-mx-2 -my-1.5 flex">
                      <Link
                        href="/login"
                        className="rounded-md bg-green-50 px-2 py-1.5 text-sm font-medium text-green-800 hover:bg-green-100"
                      >
                        Retour à la connexion
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Mot de passe oublié
                </h2>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  Entrez votre adresse email et nous vous enverrons un lien pour réinitialiser votre mot de passe.
                </p>
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Adresse email
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex w-full justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50"
                >
                  {isLoading ? 'Envoi en cours...' : 'Envoyer le lien de réinitialisation'}
                </button>
              </div>
              
              <div className="text-center">
                <Link
                  href="/login"
                  className="text-sm font-medium text-primary hover:text-primary/80"
                >
                  Retour à la connexion
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
