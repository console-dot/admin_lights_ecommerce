import React, { useContext } from 'react'
import AddContext from '../../context/dashboard/AddContext'
import { ImCross } from 'react-icons/im'

export const ProductViewModal = ({ setProductModal, singelProductData }) => {           
    const data = useContext(AddContext)
    return (
        <div className='w-full h-[100vh] fixed flex justify-center items-center top-0'>
            <div className='absolute flex justify-center items-center w-full h-screen  z-50'>
                <div className={`overflow-y-scroll no-scrollbar hidden lg:flex ${data?.width ? "w-[40%]" : "w-[35%]"} ${data.bodyColor ? "bg-[#111111] border-[5px] border-[#232323]" : " bg-white shadow-lg rounded-lg"} h-[650px]  p-4 flex flex-col`}>
                    <div className='flex justify-center items-center relative'>
                        <h1 className='text-3xl font-semibold text-amber-500 pb-4'> Card View </h1>
                        <div className='absolute top-0 right-0'>
                            <ImCross className='cursor-pointer text-slate-200 rounded-lg' onClick={() => setProductModal(false)} />
                        </div>
                    </div>
                    <div className='w-full  flex border-none justify-center items-center'>
                        <div className='w-full h-full rounded-xl border-none'>
                            {singelProductData?.avatar?.image && (
                                <img
                                    src={`data:image/png;base64,${singelProductData?.avatar?.image}`} // Pass the file object, not the file name
                                    className='rounded-lg border-none w-full h-full'
                                    alt='gImage'
                                />
                            )}
                        </div>
                    </div>
                    <div className='mt-2 flex flex-col'>
                        <h1 className={`text-lg font-semibold ${data.bodyColor ? "text-white" : "text-black"}`}>{singelProductData?.name || "Name"}</h1>
                        <h1 className='text-[#414141]'>({singelProductData?.categoryId?.name || "category"})</h1>
                    </div>
                    <div className='mt-2'>
                        <h1 className={`text-lg font-semibold ${data.bodyColor ? "text-white" : "text-black"}`}>Price :</h1>
                        <h1 className='text-[#414141] font-semibold  flex gap-2 -tracking-tight'><span className='line-through '>{singelProductData?.price || "Name"}</span>$80(30% Off)</h1>
                    </div>
                    <div className='mt-2 flex flex-col gap-1'>
                        <h1 className={`text-lg font-semibold ${data.bodyColor ? "text-white" : "text-black"}`}>Description</h1>
                        <h1 className='text-[#414141] font-semibold tracking-wide'>{singelProductData?.description}</h1>
                    </div>
                    <div className='mt-2 flex gap-2 items-center'>
                        <h1 className={`text-lg font-semibold ${data.bodyColor ? "text-white" : "text-black"}`}>Rating</h1>
                        <h1 className='text-[#414141] font-semibold tracking-wide'>{singelProductData?.review}</h1>
                    </div>
                    <div className='mt-2 flex gap-2 items-center'>
                        <h1 className={`text-lg font-semibold ${data.bodyColor ? "text-white" : "text-black"}`}>Instock</h1>
                        <h1 className='text-[#dfd2d2] font-semibold tracking-wide'>{singelProductData?.inStock}</h1>
                    </div>
                    <div className='mt-2 flex gap-2 items-center'>
                        <h1 className={`text-lg font-semibold ${data.bodyColor ? "text-white" : "text-black"}`}>stock :</h1>
                        <h1 className='text-[#414141] font-semibold tracking-wide'>{singelProductData?.stock || "Name"}</h1>
                    </div>
                    <div className='mt-2 flex flex-col gap-2'>
                        <h1 className={`text-lg font-semibold ${data.bodyColor ? "text-white" : "text-black"}`}>More Images</h1>
                        <div className='flex gap-5 overflow-x-scroll no-scrollbar'>
                            {singelProductData?.gallery.map((item, index) => (
                                <img
                                    key={index}
                                    src={`data:image/png;base64,${item?.image}`}
                                    alt={`upload-${index}`}
                                    className='rounded-xl'
                                    style={{ width: '80px', height: '80px', objectFit: 'cover', }}
                                />
                            ))}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
