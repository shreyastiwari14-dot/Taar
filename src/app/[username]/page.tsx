import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { TemplateRenderer } from '@/components/templates/TemplateRenderer'

export const revalidate = 60

interface Props {
  params: { username: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const supabase = createClient()
  const { data: user } = await supabase
    .from('users')
    .select('id')
    .eq('username', params.username)
    .single()

  if (!user) return { title: 'Not found — Taar' }

  const { data: page } = await supabase
    .from('pages')
    .select('title, bio')
    .eq('user_id', user.id)
    .eq('is_published', true)
    .single()

  const title = `${page?.title || params.username} — Link in Bio | Taar`
  const description = page?.bio
    ? `${page.bio} — Follow ${page.title || params.username} on Taar.`
    : `${params.username}'s link in bio — all links, UPI payments and more on Taar.`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://taar.bio/${params.username}`,
      siteName: 'Taar',
      type: 'profile',
    },
    twitter: {
      card: 'summary',
      title,
      description,
    },
    alternates: {
      canonical: `https://taar.bio/${params.username}`,
    },
  }
}

export default async function UserBioPage({ params }: Props) {
  const supabase = createClient()

  const { data: user } = await supabase
    .from('users')
    .select('id, username, is_pro')
    .eq('username', params.username)
    .single()

  if (!user) notFound()

  const { data: page } = await supabase
    .from('pages')
    .select('*')
    .eq('user_id', user.id)
    .eq('is_published', true)
    .single()

  if (!page) notFound()

  const { data: links } = await supabase
    .from('links')
    .select('*')
    .eq('page_id', page.id)
    .eq('is_active', true)
    .order('position')

  const { data: products } = user.is_pro
    ? await supabase.from('products').select('*').eq('page_id', page.id).eq('is_active', true)
    : { data: null }

  return (
    <TemplateRenderer
      page={page}
      links={links || []}
      products={products || []}
      username={user.username || params.username}
      isPro={user.is_pro}
      showWatermark={!user.is_pro}
    />
  )
}
