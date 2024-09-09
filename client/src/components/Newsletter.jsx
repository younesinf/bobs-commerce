import SendIcon from '@mui/icons-material/Send';

function Newsletter() {
  return (
    <div className="hidden py-16 bg-[#E0F7E9] lg:flexCenter flex-col gap-6">
      <h2 className="text-5xl font-medium">Newsletter</h2>
      <p className="font-light text-lg">Get Timely Update from your favorite products.</p>
      <div className="flexCenter px-4 w-full lg:w-1/2 h-12">
        <input type="text" placeholder="Your email" className="w-5/6 text-xl p-2 outline-none
         border-[0.2px] border-[#e4e4e4] h-full"/>
        <button className="flexCenter bg-[#00674F] text-white w-1/6 h-full">
          <SendIcon /></button>
      </div>
    </div>
  )
}

export default Newsletter