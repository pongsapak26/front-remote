// components/Aside.tsx
'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Home, Package, Ticket, Settings } from 'lucide-react'

export default function Aside() {
  const pathname = usePathname()

  const menu = [
    { name: 'หน้าหลัก', href: '/admin', icon: Home },
    { name: 'จัดการสินค้า', href: '/admin/products', icon: Package },
    { name: 'จัดการคูปอง', href: '/admin/coupons', icon: Ticket },
    { name: 'ประวัติการใช้คูปอง', href: '/admin/coupon-usage', icon: Ticket },
    { name: 'ตั้งค่า', href: '/admin/settings', icon: Settings },
  ]

  return (
    <aside className="w-64 h-screen bg-gray-900 text-white fixed left-0 flex flex-col">
      <div className="p-4 text-xl font-bold border-b border-gray-700">
        🧠 My Admin
      </div>

      <nav className="flex-1 overflow-y-auto">
        {menu.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 transition-colors ${
                isActive
                  ? 'bg-gray-800 font-semibold'
                  : 'hover:bg-gray-800 text-gray-300'
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </Link>
          )
        })}
      </nav>

      <div className="p-4 text-sm border-t border-gray-700">
        © 2025 MyCompany
      </div>
    </aside>
  )
}
