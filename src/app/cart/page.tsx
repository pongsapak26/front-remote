'use client'

import { useUserContext } from '@/context/UserContext'
import { useRouter } from 'next/navigation';
import { useMemo } from 'react'

export default function CartPage() {
  const { cart, setCart, setcheckout } = useUserContext()
  const router = useRouter();

  // คำนวณรวมราคา
  const total = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.price, 0)
  }, [cart])
  // คำนวณรวมราคา
  const product = useMemo(() => {
    const productName = ''
    return cart.map(item => `${productName} ${item.product} `).join('+')
  }, [cart])
  
  // ฟังก์ชันลบสินค้าออก
  const removeItem = (index: number) => {
    setCart(prev => prev.filter((_, i) => i !== index))
  }

  const checkOut = () =>{
    setcheckout({price:total,product:product})
    router.push('/checkout')
  }

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">ตะกร้าสินค้า</h1>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* ซ้าย: รายการสินค้า */}
        <div className="md:col-span-8 space-y-4">
          {cart.length === 0 ? (
            <p className="text-gray-500">ไม่มีสินค้าในตะกร้า</p>
          ) : (
            cart.map((item, index) => (
              <div
                key={index}
                className="border p-4 flex justify-between items-center bg-white shadow-sm"
              >
                <div>
                  <div className="font-medium">{item.product}</div>
                  <div className="text-sm text-gray-500">{item.price.toLocaleString()} ฿</div>
                </div>
                <button
                  onClick={() => removeItem(index)}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  ลบ
                </button>
              </div>
            ))
          )}
        </div>

        {/* ขวา: สรุปราคา */}
        <div className="md:col-span-4">
          <div className="border p-6 bg-gray-50 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">สรุปคำสั่งซื้อ</h2>
            <div className="flex justify-between text-gray-700 mb-2">
              <span>รวมสินค้า</span>
              <span>{cart.length} รายการ</span>
            </div>
            <div className="flex justify-between text-lg font-bold">
              <span>รวมทั้งหมด</span>
              <span>{total.toLocaleString()} ฿</span>
            </div>
            <button
              className="mt-6 w-full bg-green-600 text-white py-2 hover:bg-green-700 transition disabled:opacity-50"
              disabled={cart.length === 0}
              onClick={()=>checkOut()}
            >
              ดำเนินการชำระเงิน
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
