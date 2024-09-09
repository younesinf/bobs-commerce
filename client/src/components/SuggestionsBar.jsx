import { useEffect, useState } from 'react'
import ProductCard from './ProductCard'
import { URL } from '../data'


const SuggestionsBar = () => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        const getRandom = async () => {
            const res = await fetch(`${URL}/api/admin/products/random`)
            const data = await res.json()
            setProducts(data)
            //console.log(data);
        }
        getRandom()
    }, [])
    return (
        <div className='lg:p-8 mt-16 lg:-mt-5'>
            <h2 className="text-2xl font-medium my-6 text-center">اقتراحاتنا لكم!</h2>
            <div className='mt-4 grid grid-cols-2 md:grid-cols-5 gap-2 lg:gap-5'>
                {products && products.map((p) => (
                    <ProductCard props={p} key={p._id} />
                ))}
            </div>
        </div>
    )
}

export default SuggestionsBar