// /app/admin/products/page.tsx
'use client'

import { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import FormModal from './FormModal'

type EaProduct = {
  id: number
  eaName: string
  priceStart: number
  priceSub: number
  priceKey: number
  sku: string
}

export default function ProductPage() {
  const [products, setProducts] = useState<EaProduct[]>([])
  const [selected, setSelected] = useState<EaProduct | null>(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    fetch('/api/admin/products')
      .then(res => res.json())
      .then(data => setProducts(data))
  }, [])

  const handleDelete = async (id: number) => {
    await fetch('/api/admin/products', {
      method: 'DELETE',
      body: JSON.stringify({ id }),
    })
    setProducts(prev => prev.filter(p => p.id !== id))
  }

  const columns = [
    { name: 'ชื่อ EA', selector: (row: EaProduct) => row.eaName },
    { name: 'ราคาเริ่มต้น', selector: (row: EaProduct) => row.priceStart },
    { name: 'ราคาต่อเดือน', selector: (row: EaProduct) => row.priceSub },
    { name: 'ราคาซื้อขาด', selector: (row: EaProduct) => row.priceKey },
    { name: 'SKU', selector: (row: EaProduct) => row.sku },
    {
      name: 'จัดการ',
      cell: (row: EaProduct) => (
        <div className="space-x-2">
          <button onClick={() => { setSelected(row); setOpen(true) }}>✏️</button>
          <button onClick={() => handleDelete(row.id)}>🗑️</button>
        </div>
      ),
    },
  ]

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-bold">จัดการสินค้า EA</h1>
        <button onClick={() => { setSelected(null); setOpen(true) }}>➕ เพิ่มสินค้า</button>
      </div>

      <DataTable columns={columns} data={products} pagination />

      <FormModal
        open={open}
        onClose={() => setOpen(false)}
        initialData={selected}
        onSuccess={(newData) => {
          setOpen(false)
          setProducts((prev) =>
            selected
              ? prev.map((p) => (p.id === newData.id ? newData : p))
              : [...prev, newData]
          )
        }}
      />
    </div>
  )
}
