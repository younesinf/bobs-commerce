import { Sell } from '@mui/icons-material'
import Order from '../../components/Order'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import Pagination from '../../components/Pagination';
import { URL } from '../../data'


const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Orders = () => {
  document.title = "Orders"

  const query = useQuery();
  const page = query.get('page') || 1;

  const [items, setItems] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${URL}/api/orders?page=${page}&limit=10`);
        const data = await res.json()
        setItems(data.orders);
        setTotalPages(data.totalPages);
        setTimeout(() => {
          setLoading(false);
        }, 500);
      } catch (err) {
        console.error(err);
      }

    };

    fetchData();
  }, [page]);

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
      <h2 className='font-semibold text-xl flex items-center gap-2 text-[#00674F]'>
        <Sell />
        Orders
      </h2>
      <div className='mt-10 '>
        <div className='flex text-center font-medium mb-4 py-3 bg-white rounded-md '>
          <p className='w-[10%] text-center'>Id</p>
          <p className='w-[25%] lg:w-[20%] flexCenter'>Full Name</p>
          <p className='w-[25%] lg:w-[15%] flexCenter'>Phone</p>
          <p className='w-[20%] lg:w-[15%] flexCenter'>State</p>
          <p className='w-[25%] lg:w-[20%] flexCenter'>Commune</p>
          <p className='hidden lg:flexCenter w-[10%] lg:inline'>Total Price</p>
        </div>

        <div className='bg-white rounded-md mb-8'>
          {items && items.map((i) => (
            <Order key={i.id} id={i.id} billingInfo={i.billingInfo} price={i.totalPrice} />
          ))}
        </div>
        <Pagination totalPages={totalPages} currentPage={page} link="/admin/orders" />
      </div>
    </div>
  )
}

export default Orders