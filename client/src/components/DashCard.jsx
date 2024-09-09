
const DashCard = ({ props }) => {
    return (
        <div style={{ backgroundColor: `#${props.bg}` }} 
        className=' rounded-md p-6 px-6 text-white flex flex-col gap-1.5 shadow-md'>
            {props.icon}
            <h3 className='text-xl text-left font-medium'>{props.title}</h3>
            <p className='text-3xl text-left font-semibold'>{props.value}</p>

        </div>
    )
}

export default DashCard