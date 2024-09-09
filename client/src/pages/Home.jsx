import { useEffect, useState } from "react"
import ProductCard from "../components/ProductCard"
import { getProducts } from "../controllers/adminControllers"
import Pagination from "../components/Pagination"
import { useLocation } from 'react-router-dom';
import { categories, prices } from "../data";


const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};


const Home = () => {
  document.title = "الرئيسية"
  const [products, setProducts] = useState([])
  
  const [loading, setLoading] = useState(true);

  const query = useQuery();
  const page = query.get('page') || 1;
  const title = query.get('title') || "";

  const [totalPages, setTotalPages] = useState(1);

  const [category, setCategory] = useState("");
  const [newPrice, setNewPrice] = useState(999999);

  useEffect(() => {
    setLoading(true);
    const handleProducts = async () => {
      const data = await getProducts({ page, category, newPrice ,limit:8 ,title})
    //console.log(title);
      setProducts(data.products)
      setTotalPages(data.totalPages);
      setTimeout(async () => {
        setLoading(false)
      }, 500);
    }
    handleProducts()
  }, [page, category, newPrice,title])

  //purple #00674F
  //2nd purple #E0F7E9
  //gray #808080
  //green #00674F
  //2nd green #E0F7E9
  return (
    <section className='py-4 mb-8 px-2 lg:px-20'>
      <div className='bg-[#E0F7E9] px-2 lg:px-28 flex flex-col lg:flex-row-reverse rounded-lg'>
        <div className='w-full lg:w-4/5 flexCenter lg:items-end  flex-col justify-center  gap-6 py-12'>
          <p className='text-4xl font-[Cairo] text-center lg:text-right font-semibold leading-snug'>
          تحصل على أفضل العروض و التخفيضات في موقعنا أطلب الان
          </p>
          <div>
            <button className='p-3 px-8  bg-[#00674F] text-white font-medium rounded-full'>
              شراء الان
            </button>
          </div>
        </div>
        <div className='hidden w-2/5 lg:flex justify-end items-end pt-12'>
          <img src="./hero.png" alt="model" className='h-full' />
        </div>
      </div>

      <div className='my-8 flex justify-end flex-wrap gap-4'>
        <div className='flex gap-4 '>
          <select className='p-1.5 px-4 rounded-full bg-[#e9e9e9]'
            value={category} onChange={(e) => { setCategory(e.target.value) }}>
            <option value="">كل التصنيفات</option>
            {categories.map((c) => (
              <option value={c.name} key={c.id}>{c.name}</option>
            ))}
          </select>
          <select className='p-1.5 px-4 rounded-full bg-[#e9e9e9]'
            value={newPrice} onChange={(e) => {
              setNewPrice(e.target.value)
              setNewPrice(prev => parseInt(prev))
            }}>
            <option value={9999999}>كل الاسعار</option>
            {prices.map((p) => (
              <option value={p.value} key={p.id}>{p.name}</option>
            ))}
          </select>
        </div>
{/*         <select className='p-1 px-3 rounded-full border-[1px] border-[#acacac] bg-transparent'>
          <option value="Price">Order by</option>
        </select> */}
      </div>
      <h2 className="text-2xl font-medium my-4">!اخر المنتوجات المضافة</h2>
      {!loading ? <>{products ? <>
        <div className='mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 lg:gap-5'>
          {products && products.map((p) => (
            <ProductCard props={p} key={p._id} />
          ))}
        </div>
        <div className="mt-12 flexCenter">
          <Pagination totalPages={totalPages} currentPage={page} link="" />
        </div>
      </> : <span className="flexCenter mx-auto text-xl font-light">There is No product</span>
      }

      </> :
        <div className='h-36 flexCenter'>
          <div className='flex gap-2'>
            <div className="h-6 w-6 rounded-full bg-gray-500 animate-bounce delay-75"></div>
            <div className="h-6 w-6 rounded-full bg-gray-500 animate-bounce delay-100"></div>
            <div className="h-6 w-6 rounded-full bg-gray-500 animate-bounce delay-150"></div>
          </div>
        </div>
      }
    </section>
  )
}

export default Home