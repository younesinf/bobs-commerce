import React, { useEffect } from 'react'
import { Close, Edit, Visibility } from '@mui/icons-material'
import { Link, useNavigate } from 'react-router-dom'
import { URL } from '../data'

const Pcard = ({ props }) => {
    const navigate = useNavigate()
    const handleDelete = async (id) => {
        if (confirm("do you really wanna delete this product")) {
            await fetch(`${URL}/api/admin/product/${id}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            navigate("/admin/products?page=1")
        }
    }

    return (
        <div className='flex text-center w-full py-1 border-b-[1px] text-lg'>
            <p className='w-[10%] hidden lg:flexCenter'>{props._id}</p>
            <p className='w-[20%] flexCenter'>
                <img src={props.imgs[0]} className='w-20 p-2' alt="image" />
            </p>
            <p className='w-[30%] lg:w-[25%] flexCenter '>{props.pName}</p>
            <p className='w-[25%] lg:w-[20%] flexCenter'>{props.category}</p>
            <div className='w-[25%] flexCenter lg:gap-2'>
                <Link to={`/admin/products/${props._id}`} >
                    <button
                        className='icon text-[#00674F]'>
                        <Edit /></button>
                </Link>

                <button onClick={() => {
                    handleDelete(props._id)
                }}
                    className='icon text-red-500'
                ><Close /></button>

                <Link to={`/item/${props._id}`} target="_blank" >
                    <button
                        className='icon text-gray-500'
                    ><Visibility /></button>
                </Link>
            </div>
        </div>
    )
}

export default Pcard