'use client'

import { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'

type CouponUsage = {
  id: number
  userId: number
  couponId: number
  usedAt: string
  coupon: { code: string }
  user: { email: string }
}

export default function CouponUsagePage() {
  const [data, setData] = useState<CouponUsage[]>([])

  useEffect(() => {
    fetch('/api/admin/coupon-usage')
      .then(res => res.json())
      .then(setData)
  }, [])

  const columns = [
    { name: 'User', selector: (row: CouponUsage) => row.user.email },
    { name: 'Coupon Code', selector: (row: CouponUsage) => row.coupon.code },
    { name: 'Used At', selector: (row: CouponUsage) => new Date(row.usedAt).toLocaleString() },
  ]

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">ประวัติการใช้คูปอง</h1>
      <DataTable columns={columns} data={data} pagination />
    </div>
  )
}
