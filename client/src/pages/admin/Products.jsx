import { useEffect, useState } from 'react'
import { getProducts } from '../../controllers/adminControllers'
import Pcard from '../../components/Pcard'
import { Sell } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import Pagination from '../../components/Pagination';
import { URL } from '../../data'


const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Products = () => {
  document.title = "Products"

  const [products, setProducts] = useState([])

  const query = useQuery();
  const page = query.get('page') || 1;

  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    setLoading(true)
    const getProd = async () => {
      const data = await getProducts({ newPrice: 999999, category: "", page: 1, limit: 6, title: "" })
      setProducts(data.products)
      setTotalPages(data.totalPages);
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
    getProd()

  }, [page])


  if (loading) {
    return <div className='bg-[#E0F7E9] h-[calc(100vh-60px)] flexCenter'>
      <div className='flex gap-2'>
        <div className="h-6 w-6 rounded-full bg-gray-500 animate-bounce delay-75"></div>
        <div className="h-6 w-6 rounded-full bg-gray-500 animate-bounce delay-100"></div>
        <div className="h-6 w-6 rounded-full bg-gray-500 animate-bounce delay-150"></div>
      </div>
    </div>;
  }
  return (
    <div className='bg-[#E0F7E9] min-h-[calc(100vh-60px)] p-2 py-8 lg:p-8'>
      <div className='flexBetween items-start gap-4'>
        <h2 className='font-semibold text-xl flex items-center gap-2 text-[#00674F]'>
          <Sell />
          Products
        </h2>
        <Link to="/admin/products/new">
          <button onClick={() => { handleDelete() }}
            className="bg-[#00674F] flex items-center gap-2 p-1.5 px-3 rounded-md text-white">
            <Sell />
            New Product
          </button>
        </Link>
      </div>

      <div className='mt-10 '>
        <div className='flex text-center font-medium mb-4 py-3 bg-white rounded-md '>
          <p className='hidden lg:flexCenter w-[10%]'>Id</p>
          <p className='w-[20%] text-center'>Picture</p>
          <p className='w-[30%] lg:w-[25%] text-center'>Title</p>
          <p className='w-[25%] lg:w-[20%] text-center'>Category</p>
          <p className='w-[25%] text-center'>Options</p>
        </div>

        <div className='bg-white rounded-md mb-8'>
          {products && products.map((p) => (<Pcard key={p._id} props={p} />))}
        </div>
        <Pagination totalPages={totalPages} currentPage={page} link="/admin/products" />

      </div>
    </div>
  )
}

export default Products