'use client'

import { useState } from 'react'
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd'
import { createClient } from '@/lib/supabase/client'
import { Link, Page, User, LinkType, Template } from '@/lib/types'
import { getLinkIcon, cn } from '@/lib/utils'
import { TEMPLATES, TEMPLATE_CATEGORIES } from '@/lib/templates'
import { BioPagePreview } from './BioPagePreview'
import toast from 'react-hot-toast'

const LINK_TYPES: { value: LinkType; label: string; placeholder: string }[] = [
  { value: 'url', label: 'Website', placeholder: 'https://yoursite.com' },
  { value: 'upi', label: 'UPI Payment', placeholder: 'yourname@upi' },
  { value: 'whatsapp', label: 'WhatsApp', placeholder: '+91 9999999999' },
  { value: 'instagram', label: 'Instagram', placeholder: '@username' },
  { value: 'youtube', label: 'YouTube', placeholder: '@channel' },
  { value: 'custom', label: 'Custom', placeholder: 'https://...' },
]

const FREE_LINK_LIMIT = 8

interface Props {
  page: Page | null
  links: Link[]
  user: User | null
}

export function LinkEditor({ page, links: initialLinks, user }: Props) {
  const supabase = createClient()
  const [links, setLinks] = useState<Link[]>(initialLinks)
  const [pageData, setPageData] = useState<Page | null>(page)
  const [saving, setSaving] = useState(false)
  const [showAddForm, setShowAddForm] = useState(false)
  const [newLink, setNewLink] = useState({ type: 'url' as LinkType, label: '', url: '' })
  const [editingId, setEditingId] = useState<string | null>(null)
  const [profileEditing, setProfileEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    title: page?.title || '',
    bio: page?.bio || '',
    username: user?.username || '',
  })
  const [activeTemplate, setActiveTemplate] = useState<Template>(page?.template_id || 'streetwear')

  const canAddLink = !user?.is_pro ? links.length < FREE_LINK_LIMIT : true

  async function addLink() {
    if (!pageData || !newLink.label || !newLink.url) return
    if (!canAddLink) {
      toast.error('Free plan limit: 8 links. Upgrade to Pro for unlimited.')
      return
    }

    setSaving(true)
    const { data, error } = await supabase
      .from('links')
      .insert({
        page_id: pageData.id,
        type: newLink.type,
        label: newLink.label,
        url: newLink.url,
        position: links.length,
        is_active: true,
      })
      .select()
      .single()

    if (error) {
      toast.error('Failed to add link')
    } else {
      setLinks([...links, data])
      setNewLink({ type: 'url', label: '', url: '' })
      setShowAddForm(false)
      toast.success('Thread added.')
    }
    setSaving(false)
  }

  async function deleteLink(id: string) {
    const { error } = await supabase.from('links').delete().eq('id', id)
    if (error) {
      toast.error('Failed to delete link')
    } else {
      setLinks(links.filter((l) => l.id !== id))
      toast.success('Link removed.')
    }
  }

  async function toggleLink(id: string, isActive: boolean) {
    const { error } = await supabase.from('links').update({ is_active: !isActive }).eq('id', id)
    if (!error) {
      setLinks(links.map((l) => l.id === id ? { ...l, is_active: !isActive } : l))
    }
  }

  async function updateLink(id: string, updates: Partial<Link>) {
    const { error } = await supabase.from('links').update(updates).eq('id', id)
    if (!error) {
      setLinks(links.map((l) => l.id === id ? { ...l, ...updates } : l))
      setEditingId(null)
      toast.success('Link updated.')
    }
  }

  async function onDragEnd(result: DropResult) {
    if (!result.destination) return
    const reordered = Array.from(links)
    const [removed] = reordered.splice(result.source.index, 1)
    reordered.splice(result.destination.index, 0, removed)

    const updated = reordered.map((l, i) => ({ ...l, position: i }))
    setLinks(updated)

    // Update positions in DB
    await Promise.all(
      updated.map((l) =>
        supabase.from('links').update({ position: l.position }).eq('id', l.id)
      )
    )
  }

  async function saveProfile() {
    if (!pageData) return
    setSaving(true)

    const [pageRes, userRes] = await Promise.all([
      supabase.from('pages').update({ title: profileData.title, bio: profileData.bio }).eq('id', pageData.id),
      profileData.username !== user?.username
        ? supabase.from('users').update({ username: profileData.username }).eq('id', user?.id || '')
        : Promise.resolve({ error: null }),
    ])

    if (pageRes.error || (userRes as any).error) {
      toast.error((userRes as any).error?.message || 'Failed to save profile')
    } else {
      setProfileEditing(false)
      toast.success('Profile saved.')
    }
    setSaving(false)
  }

  async function setTemplate(templateId: string) {
    if (!pageData) return
    setActiveTemplate(templateId as Template)
    await supabase.from('pages').update({ template_id: templateId }).eq('id', pageData.id)
    setPageData({ ...pageData, template_id: templateId as any })
    toast.success('Template applied.')
  }

  async function publishPage() {
    if (!pageData) return
    if (!profileData.username) {
      toast.error('Set a username before publishing.')
      return
    }
    const newVal = !pageData.is_published
    const { error } = await supabase.from('pages').update({ is_published: newVal }).eq('id', pageData.id)
    if (!error) {
      setPageData({ ...pageData, is_published: newVal })
      toast.success(newVal ? 'Your thread is live.' : 'Page unpublished.')
    }
  }

  return (
    <div className="flex h-[calc(100vh-64px)] overflow-hidden">
      {/* Editor Panel */}
      <div className="flex-1 overflow-y-auto bg-[#0A0A0A] px-4 md:px-8 py-6">
        <div className="max-w-xl mx-auto space-y-6">
          {/* Profile Section */}
          <div className="bg-[#141414] border border-[#222] rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-white">Profile</h2>
              <button
                onClick={() => profileEditing ? saveProfile() : setProfileEditing(true)}
                className="text-sm text-[#E8593C] hover:underline"
              >
                {profileEditing ? (saving ? 'Saving...' : 'Save') : 'Edit'}
              </button>
            </div>
            {profileEditing ? (
              <div className="space-y-3">
                <div>
                  <label className="text-xs text-gray-500 block mb-1">Username (taar.bio/username)</label>
                  <div className="flex items-center bg-[#0A0A0A] border border-[#333] rounded-xl overflow-hidden">
                    <span className="text-gray-600 text-sm px-3">taar.bio/</span>
                    <input
                      value={profileData.username}
                      onChange={(e) => setProfileData({ ...profileData, username: e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, '') })}
                      className="flex-1 bg-transparent text-white text-sm px-2 py-3 focus:outline-none"
                      placeholder="yourname"
                    />
                  </div>
                </div>
                <input
                  value={profileData.title}
                  onChange={(e) => setProfileData({ ...profileData, title: e.target.value })}
                  className="w-full bg-[#0A0A0A] border border-[#333] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#E8593C]"
                  placeholder="Display name"
                />
                <textarea
                  value={profileData.bio}
                  onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                  className="w-full bg-[#0A0A0A] border border-[#333] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#E8593C] resize-none"
                  placeholder="Short bio..."
                  rows={2}
                />
              </div>
            ) : (
              <div className="space-y-1">
                <div className="text-gray-400 text-sm">
                  <span className="text-gray-600">taar.bio/</span>
                  <span className="text-white">{profileData.username || 'not set'}</span>
                </div>
                {profileData.title && <p className="text-white font-medium">{profileData.title}</p>}
                {profileData.bio && <p className="text-gray-500 text-sm">{profileData.bio}</p>}
                {!profileData.title && !profileData.bio && (
                  <p className="text-gray-600 text-sm italic">No profile info yet</p>
                )}
              </div>
            )}
          </div>

          {/* Template Picker */}
          <TemplatePicker activeTemplate={activeTemplate} onSelect={setTemplate} />

          {/* Links */}
          <div className="bg-[#141414] border border-[#222] rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-white">
                Links{' '}
                <span className="text-gray-600 text-sm font-normal">
                  {links.length}{!user?.is_pro ? `/${FREE_LINK_LIMIT}` : ''}
                </span>
              </h2>
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="text-sm bg-[#E8593C] text-white px-4 py-1.5 rounded-full hover:bg-[#d44e33] transition-colors"
              >
                + Add link
              </button>
            </div>

            {/* Add link form */}
            {showAddForm && (
              <div className="mb-4 bg-[#0A0A0A] border border-[#333] rounded-xl p-4 space-y-3">
                <select
                  value={newLink.type}
                  onChange={(e) => setNewLink({ ...newLink, type: e.target.value as LinkType })}
                  className="w-full bg-[#141414] border border-[#333] rounded-lg px-3 py-2 text-white text-sm focus:outline-none"
                >
                  {LINK_TYPES.map((t) => (
                    <option key={t.value} value={t.value}>
                      {getLinkIcon(t.value)} {t.label}
                    </option>
                  ))}
                </select>
                <input
                  value={newLink.label}
                  onChange={(e) => setNewLink({ ...newLink, label: e.target.value })}
                  placeholder="Button label"
                  className="w-full bg-[#141414] border border-[#333] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#E8593C] placeholder-gray-600"
                />
                <input
                  value={newLink.url}
                  onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
                  placeholder={LINK_TYPES.find((t) => t.value === newLink.type)?.placeholder || ''}
                  className="w-full bg-[#141414] border border-[#333] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#E8593C] placeholder-gray-600"
                />
                <div className="flex gap-2">
                  <button
                    onClick={addLink}
                    disabled={saving}
                    className="flex-1 bg-[#E8593C] text-white py-2 rounded-lg text-sm font-medium hover:bg-[#d44e33] disabled:opacity-50"
                  >
                    {saving ? 'Adding...' : 'Add'}
                  </button>
                  <button
                    onClick={() => setShowAddForm(false)}
                    className="px-4 border border-[#333] text-gray-400 rounded-lg text-sm hover:border-[#555]"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Link list */}
            {links.length === 0 ? (
              <div className="text-center py-8 text-gray-600">
                <div className="text-3xl mb-2">🧵</div>
                <p className="text-sm">Your thread starts here. Add your first link.</p>
              </div>
            ) : (
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="links">
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
                      {links.map((link, index) => (
                        <Draggable key={link.id} draggableId={link.id} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              className={cn(
                                'bg-[#0A0A0A] border border-[#2a2a2a] rounded-xl p-3 link-connector',
                                snapshot.isDragging && 'border-[#E8593C]/50 opacity-80'
                              )}
                            >
                              {editingId === link.id ? (
                                <EditLinkForm
                                  link={link}
                                  onSave={(updates) => updateLink(link.id, updates)}
                                  onCancel={() => setEditingId(null)}
                                />
                              ) : (
                                <div className="flex items-center gap-3">
                                  <div {...provided.dragHandleProps} className="text-gray-600 cursor-grab text-sm">⠿</div>
                                  <span className="text-lg">{getLinkIcon(link.type)}</span>
                                  <div className="flex-1 min-w-0">
                                    <div className="text-white text-sm font-medium truncate">{link.label}</div>
                                    <div className="text-gray-600 text-xs truncate">{link.url}</div>
                                  </div>
                                  <div className="flex items-center gap-2 shrink-0">
                                    <button
                                      onClick={() => toggleLink(link.id, link.is_active)}
                                      className={cn(
                                        'w-8 h-4 rounded-full transition-colors',
                                        link.is_active ? 'bg-[#E8593C]' : 'bg-[#333]'
                                      )}
                                    />
                                    <button
                                      onClick={() => setEditingId(link.id)}
                                      className="text-gray-500 hover:text-white text-xs"
                                    >
                                      Edit
                                    </button>
                                    <button
                                      onClick={() => deleteLink(link.id)}
                                      className="text-gray-600 hover:text-red-400 text-xs"
                                    >
                                      ✕
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            )}
          </div>

          {/* Publish */}
          <div className="bg-[#141414] border border-[#222] rounded-2xl p-5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-semibold text-white">Publish</h2>
                <p className="text-gray-500 text-sm">
                  {pageData?.is_published
                    ? `Live at taar.bio/${profileData.username}`
                    : 'Your page is not live yet'}
                </p>
              </div>
              <button
                onClick={publishPage}
                className={cn(
                  'px-5 py-2 rounded-full text-sm font-semibold transition-colors',
                  pageData?.is_published
                    ? 'bg-[#222] text-gray-400 hover:bg-[#333]'
                    : 'bg-[#E8593C] text-white hover:bg-[#d44e33]'
                )}
              >
                {pageData?.is_published ? 'Unpublish' : 'Publish →'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Live Preview Panel */}
      <div className="hidden lg:flex w-80 xl:w-96 bg-[#0D0D0D] border-l border-[#222] flex-col">
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#222]">
          <span className="text-gray-500 text-sm">Live preview</span>
          <div className="w-2 h-2 rounded-full bg-[#E8593C] animate-pulse" />
        </div>
        <div className="flex-1 overflow-y-auto flex justify-center py-6 px-4">
          <div className="w-full max-w-xs">
            <BioPagePreview
              page={pageData ? { ...pageData, template_id: activeTemplate as any } : null}
              links={links}
              username={profileData.username}
              title={profileData.title}
              bio={profileData.bio}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

function EditLinkForm({
  link,
  onSave,
  onCancel,
}: {
  link: Link
  onSave: (updates: Partial<Link>) => void
  onCancel: () => void
}) {
  const [label, setLabel] = useState(link.label)
  const [url, setUrl] = useState(link.url)
  const [type, setType] = useState<LinkType>(link.type)

  return (
    <div className="space-y-2">
      <select
        value={type}
        onChange={(e) => setType(e.target.value as LinkType)}
        className="w-full bg-[#141414] border border-[#333] rounded-lg px-3 py-2 text-white text-sm focus:outline-none"
      >
        {LINK_TYPES.map((t) => (
          <option key={t.value} value={t.value}>{t.label}</option>
        ))}
      </select>
      <input
        value={label}
        onChange={(e) => setLabel(e.target.value)}
        className="w-full bg-[#141414] border border-[#333] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#E8593C]"
        placeholder="Label"
      />
      <input
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="w-full bg-[#141414] border border-[#333] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#E8593C]"
        placeholder="URL"
      />
      <div className="flex gap-2">
        <button
          onClick={() => onSave({ label, url, type })}
          className="flex-1 bg-[#E8593C] text-white py-2 rounded-lg text-sm font-medium"
        >
          Save
        </button>
        <button onClick={onCancel} className="px-4 border border-[#333] text-gray-400 rounded-lg text-sm">
          Cancel
        </button>
      </div>
    </div>
  )
}


function TemplatePicker({
  activeTemplate,
  onSelect,
}: {
  activeTemplate: string
  onSelect: (id: string) => void
}) {
  const [activeCategory, setActiveCategory] = useState('All')

  const categories = ['All', ...TEMPLATE_CATEGORIES]
  const filtered = activeCategory === 'All'
    ? TEMPLATES
    : TEMPLATES.filter((t) => t.category === activeCategory)

  return (
    <div className="bg-[#141414] border border-[#222] rounded-2xl p-5">
      <h2 className="font-semibold text-white mb-3">
        Template <span className="text-gray-600 font-normal text-sm">{TEMPLATES.length} designs</span>
      </h2>

      <div className="flex gap-2 overflow-x-auto pb-3 mb-4" style={{ scrollbarWidth: 'none' }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={cn(
              'px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors shrink-0',
              activeCategory === cat ? 'bg-[#E8593C] text-white' : 'bg-[#222] text-gray-400 hover:text-white'
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-2 max-h-72 overflow-y-auto pr-1">
        {filtered.map((t) => {
          const bgVal = t.bgGradient || (t.bg.startsWith('linear') ? t.bg : t.bg)
          const isActive = activeTemplate === t.id
          return (
            <button
              key={t.id}
              onClick={() => onSelect(t.id)}
              title={t.name}
              className={cn(
                'rounded-xl border-2 transition-all overflow-hidden text-left',
                isActive ? 'border-[#E8593C]' : 'border-[#2a2a2a] hover:border-[#555]'
              )}
            >
              {/* Mini page preview */}
              <div style={{ background: bgVal, padding: '8px 8px 6px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, minHeight: 72 }}>
                {/* Avatar dot */}
                <div style={{ width: 18, height: 18, borderRadius: '50%', background: t.textAccent, opacity: 0.9, border: `1px solid ${t.textPrimary}33` }} />
                {/* Name bar */}
                <div style={{ width: '70%', height: 5, borderRadius: 2, background: t.textPrimary, opacity: 0.8 }} />
                {/* Link bars */}
                {[100, 85, 90].map((w, i) => (
                  <div key={i} style={{
                    width: `${w}%`, height: 8, borderRadius: t.btnRadius === 'full' ? 8 : t.btnRadius === 'none' ? 0 : 3,
                    background: t.btnStyle === 'solid' ? t.btnBg : 'transparent',
                    border: t.btnStyle === 'outline' ? `1px solid ${t.btnBorder || t.btnText}` : `1px solid ${t.btnBg}44`,
                    opacity: 0.85,
                  }} />
                ))}
              </div>
              {/* Label */}
              <div className={cn('px-2 py-1.5 text-center', isActive ? 'bg-[#E8593C]/10' : 'bg-[#1a1a1a]')}>
                <div className="text-[10px] text-gray-300 leading-tight truncate">{t.name}</div>
                {isActive && <div className="text-[9px] text-[#E8593C] mt-0.5">Active</div>}
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
