'use client'

import { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'

type Log = {
  id: number
  user: string
  action: string
  detail?: string
  createdAt: string
}

export default function LogPage() {
  const [logs, setLogs] = useState<Log[]>([])

  useEffect(() => {
    fetch('/api/admin/logs')
      .then(res => res.json())
      .then((data: Log[]) => {
        // เรียงจากใหม่ -> เก่า (descending)
        const sorted = data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        setLogs(sorted)
      })
  }, [])

  const columns = [
    { name: 'ผู้ใช้', selector: (row: Log) => row.user, sortable: true },
    { name: 'การกระทำ', selector: (row: Log) => row.action, sortable: true },
    { name: 'รายละเอียด', selector: (row: Log) => row.detail || '-', grow: 2 },
    {
      name: 'เวลา',
      selector: (row: Log) => new Date(row.createdAt).toLocaleString(),
      sortable: true,
    },
  ]

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Log การใช้งานระบบ</h1>
      <DataTable
        columns={columns}
        data={logs}
        pagination
        fixedHeader
        highlightOnHover
      />
    </div>
  )
}
