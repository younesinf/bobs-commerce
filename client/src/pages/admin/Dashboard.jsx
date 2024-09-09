import { DashboardRounded, EmojiObjects, Money, Sell } from '@mui/icons-material'
import { useEffect, useState } from 'react'
import DashCard from '../../components/DashCard'
import { getProducts } from '../../controllers/adminControllers'
import { URL } from '../../data'

const Dashboard = () => {
  document.title = "Dashboard"

  const [count, setCount] = useState()
  const [productsC, setProductsC] = useState()
  const [earningM, setEarningM] = useState()
  const [earningW, setEarningW] = useState()
  const [earningD, setEarningD] = useState()


  const [loading, setLoading] = useState(true);


  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      try {
        const res = await fetch(`${URL}/api/orders`);
        const data = await res.json()
        const data1 = await getProducts({ newPrice: 999999, category: "", page: 1 ,title:""})
        setProductsC(data1.count)
        setCount(data.count)
        setEarningM(data.monthTotal)
        setEarningW(data.weekTotal)
        setEarningD(data.dayTotal)
        setTimeout(() => {
          setLoading(false);
        }, 500);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();

  }, []);

  if (loading) {
    return <div className='bg-[#E0F7E9] min-h-[calc(100vh-60px)] flexCenter'>
      <div className='flex gap-2'>
        <div className="h-6 w-6 rounded-full bg-gray-500 animate-bounce delay-75"></div>
        <div className="h-6 w-6 rounded-full bg-gray-500 animate-bounce delay-100"></div>
        <div className="h-6 w-6 rounded-full bg-gray-500 animate-bounce delay-150"></div>
      </div>
    </div>;
  }

  return (
    <div className='bg-[#E0F7E9] min-h-[calc(100vh-60px)] p-3 py-8 lg:p-8 '>
      <h2 className='font-semibold text-xl flex items-center gap-2 text-[#00674F]'>
        <DashboardRounded />
        Dashboard</h2>
      <div className='mt-10 grid grid-cols-2 lg:grid-cols-3 gap-4'>
        <DashCard props={{
          icon: <Sell fontSize='large' />,
          title: "Total Products:",
          value: productsC,
          bg: "2980B9"
        }} />
        <DashCard props={{
          icon: <EmojiObjects fontSize='large' />,
          title: "Total orders",
          value: count,
          bg: "F39C12"
        }} />
        <DashCard props={{
          icon: <Money fontSize='large' />,
          title: "This Day earnings:",
          value: `${earningD} دج`,
          bg: "2C3E50"
        }} />
        <DashCard props={{
          icon: <Money fontSize='large' />,
          title: "This Week earnings",
          value: `${earningW} دج`,
          bg: "16A085"
        }} />
        <DashCard props={{
          icon: <Money fontSize='large' />,
          title: "This Month earnings",
          value: `${earningM} دج`,
          bg: "C0392B"
        }} />

        {/*         <DashCard props={{
          icon: <Money fontSize='large' />,
          title: "Total orders",
          value: 100,
          bg: "8E44AD"
        }} /> */}
      </div>
    </div>
  )
}

export default Dashboard