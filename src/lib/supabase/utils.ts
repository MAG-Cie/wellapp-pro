// src/lib/supabase/utils.ts
import { createBrowserClient } from '@supabase/ssr'
import { createClient } from './client'
import { Database } from '@/types/database.types'

/**
 * Fonction pour s'inscrire avec email et mot de passe
 */
export async function signUp(email: string, password: string) {
  const supabase = createClient()
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })
  return { data, error }
}

/**
 * Fonction pour se connecter avec email et mot de passe
 */
export async function signIn(email: string, password: string) {
  const supabase = createClient()
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  return { data, error }
}

/**
 * Fonction pour se déconnecter
 */
export async function signOut() {
  const supabase = createClient()
  const { error } = await supabase.auth.signOut()
  return { error }
}

/**
 * Fonction pour récupérer la session utilisateur
 */
export async function getSession() {
  const supabase = createClient()
  const { data, error } = await supabase.auth.getSession()
  return { data, error }
}

/**
 * Fonction pour récupérer l'utilisateur actuel
 */
export async function getCurrentUser() {
  const supabase = createClient()
  const { data: { user }, error } = await supabase.auth.getUser()
  return { user, error }
}

/**
 * Fonction pour mettre à jour le profil utilisateur
 */
export async function updateProfile(userId: string, profileData: Partial<Database['public']['Tables']['profiles']['Update']>) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('profiles')
    .update(profileData)
    .eq('id', userId)
    .select()
    .single()
  return { data, error }
}

/**
 * Fonction pour réinitialiser le mot de passe
 */
export async function resetPassword(email: string) {
  const supabase = createClient()
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`,
  })
  return { data, error }
}

/**
 * Fonction pour mettre à jour le mot de passe
 */
export async function updatePassword(newPassword: string) {
  const supabase = createClient()
  const { data, error } = await supabase.auth.updateUser({
    password: newPassword,
  })
  return { data, error }
}