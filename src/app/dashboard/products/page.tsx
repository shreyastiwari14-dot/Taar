import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { ProductsManager } from '@/components/dashboard/ProductsManager'

export default async function ProductsPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: userData } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single()

  const { data: page } = await supabase
    .from('pages')
    .select('id')
    .eq('user_id', user.id)
    .single()

  if (!page) return <div className="p-8 text-gray-500">No page found.</div>

  const { data: products } = await supabase
    .from('products')
    .select('*')
    .eq('page_id', page.id)
    .order('created_at', { ascending: false })

  return <ProductsManager pageId={page.id} products={products || []} />
}
