'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Product } from '@/lib/types'
import toast from 'react-hot-toast'

const MAX_PRODUCTS = 5

interface Props {
  pageId: string
  products: Product[]
}

export function ProductsManager({ pageId, products: initialProducts }: Props) {
  const supabase = createClient()
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [showForm, setShowForm] = useState(false)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [form, setForm] = useState({
    name: '',
    price: '',
    description: '',
    file: null as File | null,
  })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (products.length >= MAX_PRODUCTS) {
      toast.error(`Pro plan allows up to ${MAX_PRODUCTS} products.`)
      return
    }

    setSaving(true)
    let file_path: string | null = null

    if (form.file) {
      setUploading(true)
      const fileName = `${pageId}/${Date.now()}_${form.file.name}`
      const { data, error } = await supabase.storage
        .from('products')
        .upload(fileName, form.file, { upsert: true })

      if (error) {
        toast.error('File upload failed: ' + error.message)
        setSaving(false)
        setUploading(false)
        return
      }
      file_path = data.path
      setUploading(false)
    }

    const { data, error } = await supabase
      .from('products')
      .insert({
        page_id: pageId,
        name: form.name,
        price: parseInt(form.price),
        description: form.description,
        file_path,
        is_active: true,
      })
      .select()
      .single()

    if (error) {
      toast.error('Failed to add product')
    } else {
      setProducts([data, ...products])
      setForm({ name: '', price: '', description: '', file: null })
      setShowForm(false)
      toast.success('Product added.')
    }
    setSaving(false)
  }

  async function deleteProduct(id: string) {
    const { error } = await supabase.from('products').delete().eq('id', id)
    if (!error) {
      setProducts(products.filter((p) => p.id !== id))
      toast.success('Product removed.')
    }
  }

  async function toggleProduct(id: string, isActive: boolean) {
    await supabase.from('products').update({ is_active: !isActive }).eq('id', id)
    setProducts(products.map((p) => p.id === id ? { ...p, is_active: !isActive } : p))
  }

  return (
    <div className="max-w-2xl mx-auto px-4 md:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-4xl tracking-wider text-white">PRODUCTS</h1>
          <p className="text-gray-500 text-sm mt-1">
            {products.length}/{MAX_PRODUCTS} products
          </p>
        </div>
        {products.length < MAX_PRODUCTS && (
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-[#E8593C] text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-[#d44e33] transition-colors"
          >
            + Add product
          </button>
        )}
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-[#141414] border border-[#222] rounded-2xl p-6 mb-6 space-y-4">
          <h2 className="font-semibold text-white">New product</h2>
          <input
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Product name"
            className="w-full bg-[#0A0A0A] border border-[#333] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#E8593C] placeholder-gray-600"
          />
          <input
            required
            type="number"
            min="1"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            placeholder="Price in ₹ (e.g. 299)"
            className="w-full bg-[#0A0A0A] border border-[#333] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#E8593C] placeholder-gray-600"
          />
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Short description (optional)"
            rows={2}
            className="w-full bg-[#0A0A0A] border border-[#333] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#E8593C] placeholder-gray-600 resize-none"
          />
          <div>
            <label className="text-xs text-gray-500 block mb-2">Upload file (PDF, ZIP, etc.)</label>
            <input
              type="file"
              onChange={(e) => setForm({ ...form, file: e.target.files?.[0] || null })}
              className="w-full text-gray-400 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-[#222] file:text-white hover:file:bg-[#333]"
            />
          </div>
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 bg-[#E8593C] text-white py-3 rounded-xl font-semibold text-sm disabled:opacity-50"
            >
              {uploading ? 'Uploading...' : saving ? 'Saving...' : 'Add product'}
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-6 border border-[#333] text-gray-400 rounded-xl text-sm"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {products.length === 0 ? (
        <div className="bg-[#141414] border border-[#222] rounded-2xl p-12 text-center">
          <div className="text-4xl mb-3">📦</div>
          <p className="text-gray-600 text-sm">No products yet. Add your first digital product.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {products.map((product) => (
            <div key={product.id} className="bg-[#141414] border border-[#222] rounded-2xl p-5">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-white">{product.name}</h3>
                  {product.description && (
                    <p className="text-gray-500 text-sm mt-1">{product.description}</p>
                  )}
                  <div className="text-[#E8593C] font-bold mt-2">₹{product.price}</div>
                  {product.file_path && (
                    <div className="text-gray-600 text-xs mt-1">📎 File attached</div>
                  )}
                </div>
                <div className="flex items-center gap-3 ml-4 shrink-0">
                  <button
                    onClick={() => toggleProduct(product.id, product.is_active)}
                    className={`w-8 h-4 rounded-full transition-colors ${
                      product.is_active ? 'bg-[#E8593C]' : 'bg-[#333]'
                    }`}
                  />
                  <button
                    onClick={() => deleteProduct(product.id)}
                    className="text-gray-600 hover:text-red-400 text-sm transition-colors"
                  >
                    ✕
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
