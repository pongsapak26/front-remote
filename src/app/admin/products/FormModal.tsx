/* eslint-disable @typescript-eslint/no-explicit-any */
// /app/admin/products/FormModal.tsx
'use client'

import { useState } from 'react'

export default function FormModal({ open, onClose, initialData, onSuccess }: {
  open: boolean,
  onClose: () => void,
  initialData?: any,
  onSuccess: (data: any) => void
}) {
  const [form, setForm] = useState(initialData ?? {
    eaName: '', priceStart: 0, priceSub: 0, priceKey: 0, sku: ''
  })

  const handleSubmit = async () => {
    const method = form.id ? 'PUT' : 'POST'
    const res = await fetch('/api/admin/products', {
      method,
      body: JSON.stringify(form),
    })
    const data = await res.json()
    onSuccess(data)
  }

  if (!open) return null
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded w-[400px] space-y-4">
        <h2 className="text-lg font-semibold">{form.id ? 'แก้ไขสินค้า' : 'เพิ่มสินค้า'}</h2>
        {['eaName', 'priceStart', 'priceSub', 'priceKey', 'sku'].map(key => (
          <input
            key={key}
            className="w-full border rounded p-2"
            placeholder={key}
            value={form[key]}
            type={key.includes('price') ? 'number' : 'text'}
            onChange={(e) => setForm({ ...form, [key]: key.includes('price') ? parseFloat(e.target.value) : e.target.value })}
          />
        ))}
        <div className="flex justify-end space-x-2">
          <button className="px-3 py-1 border" onClick={onClose}>ยกเลิก</button>
          <button className="px-3 py-1 bg-blue-500 text-white rounded" onClick={handleSubmit}>บันทึก</button>
        </div>
      </div>
    </div>
  )
}
