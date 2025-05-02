import React from 'react'
import ProductCard from './ProductCard'

const products = [
    {
        title: "SL Guard",
        description: "SL Guard for EA Key",  
        imageUrl: "https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=800&amp;q=80",
        type: "sl",
    },
    // {
    //     title: "EA Key",
    //     description: "EA Key for FIFA 23",  
    //     imageUrl: "https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=800&amp;q=80",
    //     type: "rsi",
    // },
]

interface AlleaProps {
  handlerCreateEakey: (type: string) => void;
}

const Allea: React.FC<AlleaProps> = ({ handlerCreateEakey }) => {
  return (
    <div className='w-full flex flex-col items-center justify-center'>
        <h1 className='text-2xl font-bold'>Add EA Key</h1>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4'>
        {products.map((product, index) => (
            <div key={index} className='col-span-1'>
                <ProductCard title={product.title} description={product.description} imageUrl={product.imageUrl} type={product.type} handlerCreateEakey={handlerCreateEakey}/>
            </div>
        ))}
        </div>
    </div>
  )
}

export default Allea