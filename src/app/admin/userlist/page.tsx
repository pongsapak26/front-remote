'use client'

import { calculateDaysRemaining } from '@/components/EakeyCard'
import { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'

type Eakey = {
  id: number
  mainkey?: string
  exp: string // ISO date string
}

type User = {
  id: number
  username: string
  email: string
  role: string
  createdAt: string
  eakeys: Eakey[]
}

export default function UserListPage() {
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    fetch('/api/admin/user') // ✅ คุณต้องมี API endpoint นี้
      .then(res => res.json())
      .then((data: User[]) => setUsers(data))
  }, [])

  const columns = [
    {
      name: 'ชื่อผู้ใช้',
      selector: (row: User) => row.username,
      sortable: true,
    },
    {
      name: 'Email',
      selector: (row: User) => row.email,
    },
    {
      name: 'จำนวน EA Key',
      selector: (row: User) => row.eakeys.length.toString(),
    },
    {
      name: 'Key หลักหมดอายุใน',
      cell: (row: User) => {
        const main = row.eakeys.find(e => !!e.mainkey)
        if (!main) return '-'
        const daysLeft = calculateDaysRemaining(main.exp)
        return `${daysLeft} วัน`
      },
    },
    {
      name: 'สร้างเมื่อ',
      selector: (row: User) => row.createdAt,
      sortable: true,
    },
  ]

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">ผู้ใช้ทั้งหมดในระบบ</h1>
      <DataTable
        columns={columns}
        data={users}
        pagination
        fixedHeader
        highlightOnHover
      />
    </div>
  )
}
