import { useEffect, useState } from 'react'
import { storage } from '../../firebase'
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { v4 } from 'uuid'
import { Close, Sell } from '@mui/icons-material'
import { categories } from '../../data'
import { getProduct, updateProduct } from '../../controllers/adminControllers'
import { useNavigate, useParams } from 'react-router-dom'
import { URL } from '../../data'


const EditProduct = () => {
  const { id } = useParams()

  const [imgs, setImgs] = useState([])
  const [pName, setPName] = useState("")
  const [sDesc, setSDesc] = useState("")
  const [category, setCategory] = useState("")
  const [buyPrice, setBuyPrice] = useState("")
  const [oldPrice, setOldPrice] = useState("")
  const [newPrice, setNewPrice] = useState("")
  const [sizes, setSizes] = useState([])
  const [colors, setColors] = useState([])
  const [size, setSize] = useState("")
  const [color, setColor] = useState("")

  const [loading, setLoading] = useState(true);


  const navigate = useNavigate()

  const uploadImage = async (img) => {
    if (!img) return alert("No image has been selected")
    const imgRef = ref(storage, `ecommerce/${img.name + v4()}`)
    uploadBytes(imgRef, img).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => setImgs((prev) => [...prev, url]))
    })
  }
  const handleUpdateProduct = async (e) => {
    e.preventDefault()
    try {
      await updateProduct({
        pName, sDesc,
        buyPrice: parseInt(buyPrice), newPrice: parseInt(newPrice),
        oldPrice: parseInt(oldPrice),
        category, imgs, sizes, colors, id
      })
      navigate('/admin/products')
    } catch (error) {
      alert(error.message)
    }
  }
  useEffect(() => {
    setLoading(true)

    const handleP = async (id) => {
      const data = await getProduct(id)
      document.title = `${data.pName} | Edit`
      setPName(data.pName)
      setSDesc(data.sDesc)
      setBuyPrice(data.buyPrice)
      setNewPrice(data.newPrice)
      setOldPrice(data.oldPrice)
      setCategory(data.category)
      setImgs(data.imgs)
      setSizes(data.sizes)
      setColors(data.colors)
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
    handleP(id)
  }, [id])

  useEffect(() => { }, [imgs])

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
        Edit Product
      </h2>
      <div className="flex flex-col items-start lg:flex-row w-full gap-5 mt-10">
        <div className="flex flex-col gap-4 w-full lg:w-3/5  ">
          <div className='bg-[#fff] p-6 rounded-md flex flex-col gap-4'>
            <h3 className='text-xl font-medium'>General Informations</h3>
            <div className='flex flex-col'>
              <label>Title</label>
              <input className='input' type="text" value={pName}
                onChange={(e) => { setPName(e.target.value) }}
                placeholder='Enter product title' required />
            </div>
            <div className='flex flex-col'>
              <label>Primary Description</label>
              <textarea required placeholder='Enter your large desc' value={sDesc}
                onChange={(e) => { setSDesc(e.target.value) }}
                className='input h-20 w-full resize-none' ></textarea>
            </div>
          </div>
          <div className='bg-[#fff] p-6 rounded-md flex flex-col gap-4'>
            <h3 className='text-xl font-medium mb-2'>Pricing</h3>
            <div className='flex flex-col'>
              <label>Buying Price</label>
              <input className='input' type="text" value={buyPrice}
                onChange={(e) => { setBuyPrice(e.target.value) }}
                placeholder='Enter buying price' required />
            </div>
            <div className='flex flex-col'>
              <label>Old Price</label>
              <input className='input' type="text" value={oldPrice}
                onChange={(e) => { setOldPrice(e.target.value) }}
                placeholder='Enter selling price' required />
            </div>
            <div className='flex flex-col'>
              <label>Selling Price</label>
              <input className='input' type="text" value={newPrice}
                onChange={(e) => { setNewPrice(e.target.value) }}
                placeholder='Enter selling price' required />
            </div>
          </div>
        </div>
        <div className="w-full lg:w-2/5 h-full flex flex-col gap-4  ">
          <div className='bg-[#fff] p-6 rounded-md flex flex-col gap-4'>
            <h3 className='text-xl font-medium '>Images (5 Max!)</h3>
            <div className='flexCenter'>
              <input type="file" onChange={(e) => {
                uploadImage(e.target.files[0])
              }} />
            </div>
            <div className='grid grid-cols-3 gap-2 mt-2'>
              {imgs && imgs.map(i =>
                <div className='bg-purple-100 rounded-md p-2 relative'>
                  <img src={i} alt={i} className='w-full cursor-none' />
                  <div className='absolute w-full h-full top-0 left-0 z-10 '>
                    <Close className='text-white bg-red-500 cursor-pointer'
                      onClick={() => {
                        const newImgs = imgs.filter(img => img != i)
                        setImgs(newImgs)
                      }} />
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className='bg-[#fff] p-6 rounded-md flex flex-col gap-4'>
            <h3 className='text-xl font-medium'>Category</h3>
            <select value={category} onChange={(e) => { setCategory(e.target.value) }}
              className='p-2 text-base bg-white shadow-sm border-[1.5px] rounded-md'>
              <option>Select a category</option>
              {categories.map(c => (<option key={c.id} value={c.name}>
                {c.name}
              </option>))}
            </select>
          </div>
          <div className='bg-[#fff] p-6 rounded-md flex flex-col'>
            <h3 className='text-xl font-medium mb-4'>Specifications</h3>
            <label>Set the sizes</label>
            <form className='flex gap-1'
              onSubmit={(e) => {
                e.preventDefault()
                if (size.length > 0) {
                  setSizes(prev => [...prev, size])
                  setSize('')
                }
              }}>
              <input type="text" placeholder='Add size' className='input w-full'
                value={size} onChange={(e) => { setSize(e.target.value.trimEnd()) }} />
              <button className='bg-[#00674F] px-2 rounded-md text-white'
                type='submit'>Add</button>
            </form>
            <div className='flex gap-1 flex-wrap my-4'>
              {sizes.map((s) => (<div key={s}
                onClick={() => {
                  const newSizes = sizes.filter(size => size != s)
                  setSizes(newSizes)
                }}
                className='bg-[#00674F] text-white p-1 px-3 rounded-md text-lg cursor-pointer'  >
                {s}
              </div>))}
            </div>

            <label>Set the colors</label>
            <form className='flex gap-1' onSubmit={(e) => {
              e.preventDefault()
              if (color.length) {
                setColors(prev => [...prev, color])
                setColor('')
              }
            }}>
              <input type="text" placeholder='Add color' className='input w-full'
                value={color} onChange={(e) => { setColor(e.target.value.trimEnd()) }} />
              <button className='bg-[#00674F] px-2 rounded-md text-white'
                type='submit'>Add</button>
            </form>
            <div className='flex gap-1 flex-wrap mt-4'>
              {colors.map((c) => (<div key={c}
                onClick={() => {
                  const newColors = colors.filter(color => color != c)
                  setColors(newColors)
                }}
                className='bg-[#00674F] text-white p-1 px-3 rounded-md text-lg cursor-pointer'  >
                {c}
              </div>))}
            </div>
          </div>
        </div>
      </div>
      <button onClick={handleUpdateProduct}
        className='py-2 w-full text-lg text-center bg-[#00674F] text-white mt-4 rounded-md'>Submit</button>
    </div >
  )
}

export default EditProduct