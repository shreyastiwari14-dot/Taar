export type LinkType = 'url' | 'upi' | 'whatsapp' | 'instagram' | 'youtube' | 'custom'

export type Template = 'bollywood' | 'streetwear' | 'pastel'

export interface User {
  id: string
  email: string
  username: string | null
  is_pro: boolean
  instagram_handle: string | null
  created_at: string
}

export interface Page {
  id: string
  user_id: string
  template_id: Template
  title: string | null
  bio: string | null
  avatar_url: string | null
  is_published: boolean
  created_at: string
  updated_at: string
}

export interface Link {
  id: string
  page_id: string
  type: LinkType
  label: string
  url: string
  position: number
  is_active: boolean
  created_at: string
}

export interface LinkClick {
  id: string
  link_id: string
  clicked_at: string
  device_type: string | null
  country: string | null
}

export interface Product {
  id: string
  page_id: string
  name: string
  price: number
  description: string | null
  file_path: string | null
  is_active: boolean
  created_at: string
}

export interface Order {
  id: string
  product_id: string
  buyer_email: string
  razorpay_payment_id: string | null
  razorpay_order_id: string | null
  status: string
  created_at: string
}

export interface Subscription {
  id: string
  user_id: string
  razorpay_sub_id: string | null
  status: string
  current_period_end: string | null
  created_at: string
}
