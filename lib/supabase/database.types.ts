export type Database = {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string
          slug: string
          name: string
          parent_id: string | null
          position: number
          created_at: string
        }
        Insert: {
          id?: string
          slug: string
          name: string
          parent_id?: string | null
          position?: number
          created_at?: string
        }
        Update: {
          id?: string
          slug?: string
          name?: string
          parent_id?: string | null
          position?: number
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'categories_parent_id_fkey'
            columns: ['parent_id']
            referencedRelation: 'categories'
            referencedColumns: ['id']
          }
        ]
      }
      products: {
        Row: {
          id: string
          slug: string
          name: string
          description: string | null
          category_id: string | null
          base_price: number
          status: Database['public']['Enums']['product_status']
          metadata: Record<string, unknown>
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          slug: string
          name: string
          description?: string | null
          category_id?: string | null
          base_price: number
          status?: Database['public']['Enums']['product_status']
          metadata?: Record<string, unknown>
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          slug?: string
          name?: string
          description?: string | null
          category_id?: string | null
          base_price?: number
          status?: Database['public']['Enums']['product_status']
          metadata?: Record<string, unknown>
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'products_category_id_fkey'
            columns: ['category_id']
            referencedRelation: 'categories'
            referencedColumns: ['id']
          }
        ]
      }
      product_variants: {
        Row: {
          id: string
          product_id: string
          sku: string
          color: string | null
          size: string | null
          price: number | null
          stock: number
          weight_g: number | null
          created_at: string
        }
        Insert: {
          id?: string
          product_id: string
          sku: string
          color?: string | null
          size?: string | null
          price?: number | null
          stock?: number
          weight_g?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          product_id?: string
          sku?: string
          color?: string | null
          size?: string | null
          price?: number | null
          stock?: number
          weight_g?: number | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'product_variants_product_id_fkey'
            columns: ['product_id']
            referencedRelation: 'products'
            referencedColumns: ['id']
          }
        ]
      }
      product_images: {
        Row: {
          id: string
          product_id: string
          url: string
          alt: string | null
          position: number
        }
        Insert: {
          id?: string
          product_id: string
          url: string
          alt?: string | null
          position?: number
        }
        Update: {
          id?: string
          product_id?: string
          url?: string
          alt?: string | null
          position?: number
        }
        Relationships: [
          {
            foreignKeyName: 'product_images_product_id_fkey'
            columns: ['product_id']
            referencedRelation: 'products'
            referencedColumns: ['id']
          }
        ]
      }
      addresses: {
        Row: {
          id: string
          user_id: string
          label: string | null
          recipient: string | null
          zip: string | null
          street: string | null
          number: string | null
          complement: string | null
          district: string | null
          city: string | null
          state: string | null
          is_default: boolean
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          label?: string | null
          recipient?: string | null
          zip?: string | null
          street?: string | null
          number?: string | null
          complement?: string | null
          district?: string | null
          city?: string | null
          state?: string | null
          is_default?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          label?: string | null
          recipient?: string | null
          zip?: string | null
          street?: string | null
          number?: string | null
          complement?: string | null
          district?: string | null
          city?: string | null
          state?: string | null
          is_default?: boolean
          created_at?: string
        }
        Relationships: []
      }
      orders: {
        Row: {
          id: string
          user_id: string | null
          order_number: string
          status: Database['public']['Enums']['order_status']
          subtotal: number
          shipping_cost: number
          discount: number
          total: number
          shipping_address: Record<string, unknown> | null
          payment_method: string | null
          stripe_payment_intent: string | null
          tracking_code: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          order_number: string
          status?: Database['public']['Enums']['order_status']
          subtotal: number
          shipping_cost?: number
          discount?: number
          total: number
          shipping_address?: Record<string, unknown> | null
          payment_method?: string | null
          stripe_payment_intent?: string | null
          tracking_code?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          order_number?: string
          status?: Database['public']['Enums']['order_status']
          subtotal?: number
          shipping_cost?: number
          discount?: number
          total?: number
          shipping_address?: Record<string, unknown> | null
          payment_method?: string | null
          stripe_payment_intent?: string | null
          tracking_code?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      order_items: {
        Row: {
          id: string
          order_id: string
          variant_id: string | null
          quantity: number
          unit_price: number
          snapshot: Record<string, unknown> | null
        }
        Insert: {
          id?: string
          order_id: string
          variant_id?: string | null
          quantity: number
          unit_price: number
          snapshot?: Record<string, unknown> | null
        }
        Update: {
          id?: string
          order_id?: string
          variant_id?: string | null
          quantity?: number
          unit_price?: number
          snapshot?: Record<string, unknown> | null
        }
        Relationships: [
          {
            foreignKeyName: 'order_items_order_id_fkey'
            columns: ['order_id']
            referencedRelation: 'orders'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'order_items_variant_id_fkey'
            columns: ['variant_id']
            referencedRelation: 'product_variants'
            referencedColumns: ['id']
          }
        ]
      }
      wishlist_items: {
        Row: {
          id: string
          user_id: string
          product_id: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          product_id: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          product_id?: string
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'wishlist_items_product_id_fkey'
            columns: ['product_id']
            referencedRelation: 'products'
            referencedColumns: ['id']
          }
        ]
      }
      coupons: {
        Row: {
          id: string
          code: string
          discount_type: Database['public']['Enums']['discount_type']
          discount_value: number
          min_order: number
          expires_at: string | null
          uses_left: number | null
          created_at: string
        }
        Insert: {
          id?: string
          code: string
          discount_type: Database['public']['Enums']['discount_type']
          discount_value: number
          min_order?: number
          expires_at?: string | null
          uses_left?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          code?: string
          discount_type?: Database['public']['Enums']['discount_type']
          discount_value?: number
          min_order?: number
          expires_at?: string | null
          uses_left?: number | null
          created_at?: string
        }
        Relationships: []
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: {
      product_status: 'active' | 'draft' | 'archived'
      order_status: 'pending' | 'paid' | 'preparing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded'
      discount_type: 'percent' | 'fixed' | 'free_shipping'
    }
    CompositeTypes: Record<string, never>
  }
}
