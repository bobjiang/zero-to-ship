export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          full_name: string | null;
          avatar_path: string | null;
          bio: string | null;
          skills: string[];
          building: string | null;
          is_public: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          full_name?: string | null;
          avatar_path?: string | null;
          bio?: string | null;
          skills?: string[];
          building?: string | null;
          is_public?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string | null;
          avatar_path?: string | null;
          bio?: string | null;
          skills?: string[];
          building?: string | null;
          is_public?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'profiles_id_fkey';
            columns: ['id'];
            isOneToOne: true;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      lesson_progress: {
        Row: {
          user_id: string;
          series_slug: string;
          lesson_slug: string;
          is_completed: boolean;
          completed_at: string | null;
          updated_at: string;
        };
        Insert: {
          user_id: string;
          series_slug: string;
          lesson_slug: string;
          is_completed?: boolean;
          completed_at?: string | null;
          updated_at?: string;
        };
        Update: {
          user_id?: string;
          series_slug?: string;
          lesson_slug?: string;
          is_completed?: boolean;
          completed_at?: string | null;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'lesson_progress_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      bookmarks: {
        Row: {
          id: string;
          user_id: string;
          content_type: string;
          content_slug: string;
          parent_slug: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          content_type: string;
          content_slug: string;
          parent_slug?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          content_type?: string;
          content_slug?: string;
          parent_slug?: string;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'bookmarks_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
