import { AddShoppingCart, SearchOutlined } from '@mui/icons-material';
import Badge from '@mui/material/Badge';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useState } from 'react';


const Header = () => {
  const { cart } = useCart();
  let length = cart.length

  const [title, setTitle] = useState("")
  const navigate = useNavigate()
  return (
    <header className='flexBetween py-3 px-6 lg:px-28 shadow-sm'>
      <Link to='/'>
        <h1 className='text-2xl font-bold'>
          BOB'S STORE
        </h1>
      </Link>

      <form onSubmit={(e) => {
        e.preventDefault()
        navigate(`/?title=${title}`)
      }}
        className='bg-[#e9e9e9] px-2 rounded-full hidden lg:flexCenter lg:w-[350px]'>
        <input type="text" className='bg-transparent outline-none p-1.5 w-full'
          placeholder='ابحث عن منتوج'
          value={title} onChange={(e) => { setTitle(e.target.value) }} />
        <button type='submit' className='cursor-pointer text-[#808080]'
        ><SearchOutlined /></button>
      </form>

      <div className='flex gap-8'>
        {/*         <div className='flexCenter gap-1'>
          <Person2Outlined />
          Account
        </div> */}
        <Link to="/cart">
          <div className='flexCenter gap-2.5'>
            السلة
            <Badge color="success" badgeContent={length}>
              <AddShoppingCart />
            </Badge>
          </div>
        </Link>
      </div>
    </header>
  )
}

export default Header