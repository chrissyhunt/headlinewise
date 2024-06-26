// generated by Supabase
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      analysis: {
        Row: {
          analysis: string | null
          approved: boolean | null
          article: string | null
          created_at: string
          id: string
          language: string | null
          model: string | null
          political_bias: string | null
        }
        Insert: {
          analysis?: string | null
          approved?: boolean | null
          article?: string | null
          created_at?: string
          id?: string
          language?: string | null
          model?: string | null
          political_bias?: string | null
        }
        Update: {
          analysis?: string | null
          approved?: boolean | null
          article?: string | null
          created_at?: string
          id?: string
          language?: string | null
          model?: string | null
          political_bias?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'analysis_article_fkey'
            columns: ['article']
            isOneToOne: false
            referencedRelation: 'articles'
            referencedColumns: ['url']
          }
        ]
      }
      article_topics: {
        Row: {
          article: string
          created_at: string
          topic: string
        }
        Insert: {
          article: string
          created_at?: string
          topic: string
        }
        Update: {
          article?: string
          created_at?: string
          topic?: string
        }
        Relationships: [
          {
            foreignKeyName: 'article_topics_article_fkey'
            columns: ['article']
            isOneToOne: false
            referencedRelation: 'articles'
            referencedColumns: ['url']
          },
          {
            foreignKeyName: 'article_topics_topic_fkey'
            columns: ['topic']
            isOneToOne: false
            referencedRelation: 'topics'
            referencedColumns: ['slug']
          }
        ]
      }
      articles: {
        Row: {
          analysis: string | null
          author: string | null
          content: string | null
          created_at: string
          description: string | null
          published_at: string | null
          source: string | null
          title: string | null
          topic: string | null
          url: string
          url_to_image: string | null
        }
        Insert: {
          analysis?: string | null
          author?: string | null
          content?: string | null
          created_at?: string
          description?: string | null
          published_at?: string | null
          source?: string | null
          title?: string | null
          topic?: string | null
          url: string
          url_to_image?: string | null
        }
        Update: {
          analysis?: string | null
          author?: string | null
          content?: string | null
          created_at?: string
          description?: string | null
          published_at?: string | null
          source?: string | null
          title?: string | null
          topic?: string | null
          url?: string
          url_to_image?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'articles_source_fkey'
            columns: ['source']
            isOneToOne: false
            referencedRelation: 'sources'
            referencedColumns: ['id']
          }
        ]
      }
      logs: {
        Row: {
          created_at: string
          details: Json | null
          id: number
        }
        Insert: {
          created_at?: string
          details?: Json | null
          id?: number
        }
        Update: {
          created_at?: string
          details?: Json | null
          id?: number
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          id: string
          role: string | null
          username: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          role?: string | null
          username?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          role?: string | null
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'profiles_id_fkey'
            columns: ['id']
            isOneToOne: true
            referencedRelation: 'users'
            referencedColumns: ['id']
          }
        ]
      }
      sources: {
        Row: {
          active: boolean | null
          created_at: string
          id: string
          name: string | null
          URL: string | null
        }
        Insert: {
          active?: boolean | null
          created_at?: string
          id: string
          name?: string | null
          URL?: string | null
        }
        Update: {
          active?: boolean | null
          created_at?: string
          id?: string
          name?: string | null
          URL?: string | null
        }
        Relationships: []
      }
      topics: {
        Row: {
          created_at: string
          query: string | null
          slug: string
        }
        Insert: {
          created_at?: string
          query?: string | null
          slug: string
        }
        Update: {
          created_at?: string
          query?: string | null
          slug?: string
        }
        Relationships: []
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, 'public'>]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] &
      PublicSchema['Views'])
  ? (PublicSchema['Tables'] &
      PublicSchema['Views'])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
  ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
  ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema['Enums']
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
  ? PublicSchema['Enums'][PublicEnumNameOrOptions]
  : never
