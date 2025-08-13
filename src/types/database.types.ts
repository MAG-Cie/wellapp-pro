export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          first_name: string | null
          last_name: string | null
          role: 'veterinarian' | 'assistant' | null
          is_admin: boolean | null
          avatar_url: string | null
          created_at: string
          updated_at: string | null
        }
        Insert: {
          id: string
          first_name?: string | null
          last_name?: string | null
          role?: 'veterinarian' | 'assistant' | null
          is_admin?: boolean | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string | null
        }
        Update: {
          id?: string
          first_name?: string | null
          last_name?: string | null
          role?: 'veterinarian' | 'assistant' | null
          is_admin?: boolean | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string | null
        }
      }
      clinics: {
        Row: {
          id: string
          name: string
          address: string | null
          phone: string | null
          email: string | null
          website: string | null
          created_at: string
          updated_at: string | null
        }
        Insert: {
          id?: string
          name: string
          address?: string | null
          phone?: string | null
          email?: string | null
          website?: string | null
          created_at?: string
          updated_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          address?: string | null
          phone?: string | null
          email?: string | null
          website?: string | null
          created_at?: string
          updated_at?: string | null
        }
      }
      clinic_users: {
        Row: {
          id: string
          clinic_id: string
          user_id: string
          is_primary: boolean
          created_at: string
        }
        Insert: {
          id?: string
          clinic_id: string
          user_id: string
          is_primary?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          clinic_id?: string
          user_id?: string
          is_primary?: boolean
          created_at?: string
        }
      }
      clients: {
        Row: {
          id: string
          clinic_id: string
          first_name: string
          last_name: string
          email: string | null
          phone: string | null
          address: string | null
          preferred_contact_method: 'email' | 'phone' | 'sms' | null
          notes: string | null
          created_at: string
          updated_at: string | null
        }
        Insert: {
          id?: string
          clinic_id: string
          first_name: string
          last_name: string
          email?: string | null
          phone?: string | null
          address?: string | null
          preferred_contact_method?: 'email' | 'phone' | 'sms' | null
          notes?: string | null
          created_at?: string
          updated_at?: string | null
        }
        Update: {
          id?: string
          clinic_id?: string
          first_name?: string
          last_name?: string
          email?: string | null
          phone?: string | null
          address?: string | null
          preferred_contact_method?: 'email' | 'phone' | 'sms' | null
          notes?: string | null
          created_at?: string
          updated_at?: string | null
        }
      }
      patients: {
        Row: {
          id: string
          client_id: string
          name: string
          species: string
          breed: string | null
          birth_date: string | null
          gender: 'male' | 'female' | null
          weight_kg: number | null
          color: string | null
          microchip_id: string | null
          insurance_id: string | null
          notes: string | null
          created_at: string
          updated_at: string | null
        }
        Insert: {
          id?: string
          client_id: string
          name: string
          species: string
          breed?: string | null
          birth_date?: string | null
          gender?: 'male' | 'female' | null
          weight_kg?: number | null
          color?: string | null
          microchip_id?: string | null
          insurance_id?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string | null
        }
        Update: {
          id?: string
          client_id?: string
          name?: string
          species?: string
          breed?: string | null
          birth_date?: string | null
          gender?: 'male' | 'female' | null
          weight_kg?: number | null
          color?: string | null
          microchip_id?: string | null
          insurance_id?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string | null
        }
      }
      appointments: {
        Row: {
          id: string
          clinic_id: string
          patient_id: string
          veterinarian_id: string | null
          appointment_type_id: string
          start_time: string
          end_time: string
          status: 'scheduled' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled' | 'no_show'
          notes: string | null
          is_emergency: boolean
          emergency_notes: string | null
          created_at: string
          updated_at: string | null
        }
        Insert: {
          id?: string
          clinic_id: string
          patient_id: string
          veterinarian_id?: string | null
          appointment_type_id: string
          start_time: string
          end_time: string
          status?: 'scheduled' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled' | 'no_show'
          notes?: string | null
          is_emergency?: boolean
          emergency_notes?: string | null
          created_at?: string
          updated_at?: string | null
        }
        Update: {
          id?: string
          clinic_id?: string
          patient_id?: string
          veterinarian_id?: string | null
          appointment_type_id?: string
          start_time?: string
          end_time?: string
          status?: 'scheduled' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled' | 'no_show'
          notes?: string | null
          is_emergency?: boolean
          emergency_notes?: string | null
          created_at?: string
          updated_at?: string | null
        }
      }
      medical_records: {
        Row: {
          id: string
          patient_id: string
          appointment_id: string | null
          veterinarian_id: string
          consultation_date: string
          weight_kg: number | null
          temperature_c: number | null
          diagnosis: string | null
          treatment: string | null
          notes: string | null
          created_at: string
          updated_at: string | null
        }
        Insert: {
          id?: string
          patient_id: string
          appointment_id?: string | null
          veterinarian_id: string
          consultation_date: string
          weight_kg?: number | null
          temperature_c?: number | null
          diagnosis?: string | null
          treatment?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string | null
        }
        Update: {
          id?: string
          patient_id?: string
          appointment_id?: string | null
          veterinarian_id?: string
          consultation_date?: string
          weight_kg?: number | null
          temperature_c?: number | null
          diagnosis?: string | null
          treatment?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
