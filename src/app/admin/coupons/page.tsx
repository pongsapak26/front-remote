'use client'

import { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import { Pencil, Trash2, Plus } from 'lucide-react'
import CouponFormModal from './FormModal'

type Coupon = {
  id: number
  code: string
  name: string
  discount: number
  type: string
  count: number
  onlyOnce: boolean
  exp: string
}

export default function CouponPage() {
  const [coupons, setCoupons] = useState<Coupon[]>([])
  const [selected, setSelected] = useState<Coupon | null>(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    fetch('/api/admin/coupons')
      .then(res => res.json())
      .then(setCoupons)
  }, [])

  const handleDelete = async (id: number) => {
    await fetch('/api/coupons', {
      method: 'DELETE',
      body: JSON.stringify({ id }),
    })
    setCoupons(prev => prev.filter(c => c.id !== id))
  }

  const columns = [
    { name: 'โค้ด', selector: (row: Coupon) => row.code },
    { name: 'ชื่อ', selector: (row: Coupon) => row.name },
    { name: 'ส่วนลด', selector: (row: Coupon) => row.discount.toString() },
    { name: 'ชนิด', selector: (row: Coupon) => row.type },
    { name: 'ครั้งสูงสุด', selector: (row: Coupon) => row.count.toString() },
    { name: 'หมดอายุ', selector: (row: Coupon) => new Date(row.exp).toLocaleDateString() },
    {
      name: 'จัดการ',
      cell: (row: Coupon) => (
        <div className="flex gap-2">
          <button onClick={() => { setSelected(row); setOpen(true) }}>
            <Pencil className="w-4 h-4" />
          </button>
          <button onClick={() => handleDelete(row.id)}>
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ]

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-bold">จัดการคูปอง</h1>
        <button onClick={() => { setSelected(null); setOpen(true) }}>
          <Plus className="w-4 h-4 mr-2" /> เพิ่มคูปอง
        </button>
      </div>
      <DataTable columns={columns} data={coupons} pagination />
      <CouponFormModal
        open={open}
        onClose={() => setOpen(false)}
        initialData={selected}
        onSuccess={(data) => {
          setOpen(false)
          setCoupons(prev =>
            selected ? prev.map(c => (c.id === data.id ? data : c)) : [...prev, data]
          )
        }}
      />
    </div>
  )
}
