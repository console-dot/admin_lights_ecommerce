import React, { useContext, useEffect, useRef, useState } from 'react'
import { light1 } from '../../assets'
import { WiCloudUp } from 'react-icons/wi'
import AddContext from '../../context/dashboard/AddContext'
import { CategoryModal } from './CategoryModal'
import { createFile, product } from '../../api'
import { category, getCategory, getCategoryById } from '../../api/category'
import { toast } from 'react-toastify'

export const CreateProduct = () => {
  const [categoryName, setCategoryName] = useState()
  const [createProductData, setCreateProductData] = useState({})
  const [singelFile, setSingelFile] = useState()
  const [categoryData, setCategoryData] = useState()
  const [gallery, setGallery] = useState([])
  const data = useContext(AddContext)
  const inputFile = useRef(null)
  const inputFiles = useRef(null)

  useEffect(() => {
  }, [createProductData, singelFile])


  const createProduct = async () => {
    const fileRes = await fileUpload();
    if (fileRes) {
      const avatarId = fileRes?.data?.data?._id;
      const addAvatar = { ...createProductData, avatar: avatarId };
      setCreateProductData(addAvatar);

      const galleryRes = await galleryUpload()
      if (galleryRes) {
        // const id = galleryRes?.data?.data?._id
        const addGallery = { ...addAvatar, gallery: galleryRes }

        const token = localStorage.getItem("access_token");
        const res = await product({ createProductData: addGallery, token })
        if (res?.status === 201) {
          toast("Product is Created")
          setCreateProductData({
            avatar: "",
            categoryId: "",
            description: "",
            inStock: "",
            name: "",
            price: "",
            review: "",
            stock: "",
            gallery:""
          })
          setSingelFile("")
          setGallery([])
        } else {
          toast("Please fill this fields")
        }
      }
    }
  }

  const fileUpload = async () => {
    const token = localStorage.getItem("access_token")
    const fromData = new FormData()
    fromData.append("file", singelFile)
    const res = await createFile({ fromData, token })
    
    return res
  }

  const galleryUpload = async () => {
    const galleryIds = []
    const token = localStorage.getItem("access_token");
    for (let i = 0; i < gallery.length; i++) {
      const fromData = new FormData();
      fromData.append('file', gallery[i]);
      try {
        const res = await createFile({ fromData, token });
        galleryIds.push(res?.data?.data?._id);


      } catch (error) {
        console.error('Error:', error);
      }
    } return galleryIds

  };

  const handelGalleryFileChange = (e) => {
    const file = Array.from(e.target.files);
    setGallery((prevImages) => [...prevImages, ...file]);
  };

  const singleImageClick = () => {
    inputFile.current.click();
  }
  const multiplyImageClick = () => {
    inputFiles.current.click();
  }
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSingelFile(e.target.files[0])
    }
  }
  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const res = await getCategory({ token });
        setCategoryData(res?.data?.data);
      } catch (error) {
        console.error("Error fetching category data:", error);
      }
    };
    fetchCategoryData();
  }, [createProductData?.categoryId, data.addCategoryModal]);


  useEffect(() => {

    if (createProductData?.categoryId) {
      const id = createProductData?.categoryId;

      const fetchSingleCategory = async () => {
        const token = localStorage.getItem("access_token");
        const res = await getCategoryById({ id, token });
        setCategoryName(res?.data?.data)
      };

      fetchSingleCategory();
    }
  }, [createProductData?.categoryId]);



  return (
    <>
      <div className='w-full flex gap-5 '>
        {/* card view */}

        <div className={`hidden lg:flex ${data?.width ? "w-[40%]" : "w-[35%]"} ${data.bodyColor ? "bg-[#111111] border-[5px] border-[#232323]" : " bg-white shadow-lg rounded-lg"} h-[650px]  p-2 flex flex-col`}>
          <div className='w-full h-2/5 flex border-none justify-center items-center'>
            <div className='w-full h-full rounded-xl border-none'>
              {singelFile && (
                <img
                  src={URL.createObjectURL(singelFile)} // Pass the file object, not the file name
                  className='rounded-lg border-none w-full h-full'
                  alt='gImage'
                />
              )}
            </div>
          </div>

          <div className='mt-2 flex flex-col'>
            <h1 className={`text-lg font-semibold ${data.bodyColor ? "text-white" : "text-black"}`}>{createProductData?.name || "Name"}</h1>
            <h1 className='text-[#414141]'>({categoryName?.name || "category"})</h1>
          </div>
          <div className='mt-2'>
            <h1 className={`text-lg font-semibold ${data.bodyColor ? "text-white" : "text-black"}`}>Price :</h1>
            <h1 className='text-[#414141] font-semibold  flex gap-2 -tracking-tight'><span className='line-through '>{createProductData?.price || "Name"}</span>$80(30% Off)</h1>
          </div>
          <div className='mt-2 flex gap-2'>
            <h1 className={`text-lg font-semibold ${data.bodyColor ? "text-white" : "text-black"}`}>Brand :</h1>
            <h1 className='text-[#414141] font-semibold tracking-wide'>Royal</h1>
          </div>
          <div className='mt-2 flex gap-2'>
            <h1 className={`text-lg font-semibold ${data.bodyColor ? "text-white" : "text-black"}`}>stock :</h1>
            <h1 className='text-[#414141] font-semibold tracking-wide'>{createProductData?.stock || "Name"}</h1>
          </div>
          <div className='mt-2 flex flex-col gap-2'>
            <h1 className={`text-lg font-semibold ${data.bodyColor ? "text-white" : "text-black"}`}>More Images</h1>
            <div className='flex gap-5 overflow-x-scroll no-scrollbar'>
            {gallery.length > 0 ?
                gallery.map((image, index) => (
                  <img
                    key={index}
                    src={URL.createObjectURL(image)}
                    alt={`upload-${index}`}
                    className='rounded-xl'
                    style={{ width: '80px', height: '80px', objectFit: 'cover', }}
                  />
                )) :""}
            </div>
          </div>
          <div className='mt-2 flex justify-between py-3'>
            <button className='px-3 py-2 bg-amber-500 text-white rounded-lg'>Create Product</button>
            <button className='px-3  py-2 bg-slate-200 rounded-lg'>Cancel</button>
          </div>
        </div>

        {/* compelete product add */}

        <div className={`w-full lg:${data?.width ? "w-[60%]" : "w-[65%]"} flex flex-col`} >
        
          {/* product add Image */}
        
          <div className={`${data.bodyColor ? "bg-[#111111] border-[5px] border-[#232323]" : " bg-white shadow-lg rounded-lg"}   w-full h-[350px] p-2 flex flex-col`}
            onClick={singleImageClick}>
            <div className='w-full h-[15%] flex items-center justify-start border-b md:px-5 border-[#5D5D5D] '>
              <h1 className={`${data.bodyColor ? "text-amber-500" : "text-black"} md:text-xl font-semibold`}>Add Product Photo</h1>
            </div>
            <div className='h-[85%] w-full flex justify-center items-center '>

              <div className='w-[90%] h-[90%] rounded-lg flex-col flex justify-center items-center border-dashed border-2 border-[#5D5D5D] cursor-pointer'>
                <input type="file" id="imgupload" ref={inputFile} className={`hidden appearance-none`} onChange={handleFileChange} />
                {singelFile ?
                  (
                    <div className={`flex  w-32 h-32 bg-slate-200 rounded-xl`}>
                      <img src={URL.createObjectURL(singelFile)} className='w-full h-full rounded-lg' />
                    </div>
                  )
                  :
                  (<div className={`flex flex-col items-center justify-center`}>
                    <WiCloudUp className='text-5xl font-bold text-amber-500' />
                    <h1 className={`${data.width ? "lg:text-2xl" : "lg:text-3xl"} ${data.bodyColor ? "text-white" : "text-black"} text-center  pt-5`}>Drop your images here, or <span className='text-amber-500'>click to browse</span></h1>
                    <h1 className='text-[12px] text-[#414141] font-semibold pt-3 text-center'>1600 x 1200 (4:3) recommended. PNG, JPG and GIF files are allowed</h1>
                  </div>)}
              </div>

            </div>
          </div>

          {/* add more Images */}
        
          <div className={`${data.bodyColor ? "bg-[#111111] border-[5px] border-[#232323]" : " bg-white shadow-lg rounded-lg"} w-full h-[350px] p-2 mt-10 flex flex-col`}
            onClick={multiplyImageClick}>
            <div className='w-full h-[15%] md:px-5 flex items-center justify-start border-b  border-[#414141] '>
              <h1 className={`${data.bodyColor ? "text-amber-500" : "text-black"} md:text-xl font-semibold`}>Add Product More Images</h1>
            </div>
            <div className='h-[85%] w-full flex justify-center items-center '>
              <div className={`w-[90%] h-[90%] rounded-lg flex-col flex justify-center items-center border-dashed  border-2  border-[#414141] cursor-pointer ${gallery.length > 5 ? "overflow-x-scroll" : "overflow-x-hidden "}`}>
                <div >
                  <input
                    type="file"
                    multiple
                    onChange={handelGalleryFileChange}
                    accept="image/*"
                    ref={inputFiles}
                    className='hidden'
                  />
                  <div className='flex gap-3'>
                    {gallery.length > 0 ?
                      gallery.map((image, index) => (
                        <img
                          key={index}
                          src={URL.createObjectURL(image)}
                          alt={`upload-${index}`}
                          className='rounded-xl'
                          style={{ width: '100px', height: '100px', objectFit: 'cover', margin: '10px' }}
                        />
                      )) : <div className={`flex flex-col items-center justify-center`}>
                        <WiCloudUp className='text-5xl font-bold text-amber-500' />
                        <h1 className={`${data.width ? "lg:text-2xl" : "lg:text-3xl"} ${data.bodyColor ? "text-white" : "text-black"} text-center  pt-5`}>Drop your images here, or <span className='text-amber-500'>click to browse</span></h1>
                        <h1 className='text-[12px]  text-[#414141] font-semibold pt-3 text-center'>1600 x 1200 (4:3) recommended. PNG, JPG and GIF files are allowed</h1>
                      </div>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        
          {/* product infromation */}
        
          <div className={`${data.bodyColor ? "bg-[#111111] border-[5px] border-[#232323]" : " bg-white shadow-lg rounded-lg"} w-full h-[1100px] md:h-[750px] mt-10 p-2 flex flex-col`}>
            <div className='w-full h-[5%] md:h-[8%] flex items-center justify-start border-b  border-[#414141]'>
              <h1 className={`${data.bodyColor ? "text-amber-500" : "text-black"} md:text-xl  font-semibold`}>Product Information</h1>
            </div>
            <div className='h-[95%] md:h-[92%] w-full lg:p-5'>
            <div className='flex justify-start items-center gap-4
               '>
                <input type="checkbox" name="" id="" />
               <h1 className='text-white'> Add product in NewArival </h1>
               </div>
              <div className='w-full flex flex-col md:flex-row md:gap-10 mt-5'>
                <div className='w-full md:w-1/2 flex flex-col '>
                  <h1 className={`py-2 ${data.bodyColor ? "text-white" : "text-black"}`}>Product Name</h1>
                  <input type="text" className={`p-2 w-full rounded-md  border ${data.bodyColor ? "text-white" : "text-black"} border-[#414141]  bg-transparent focus:outline-none`} name='name' value={createProductData?.name} onChange={(e) => setCreateProductData({ ...createProductData, [e.target.name]: e.target.value })}
                    placeholder='Name...' />
                </div>
                <div className='w-full md:w-1/2  flex flex-col relative'>
                  <h1 className={`py-2 ${data.bodyColor ? "text-white" : "text-black"}`}>Prduct Category</h1>
                  <select className={`p-2 w-full rounded-md  border ${data.bodyColor ? "text-white" : "text-black"} border-[#414141]  bg-transparent focus:outline-none`} name='categoryId' value={createProductData?.categoryId} onChange={(e) => setCreateProductData({ ...createProductData, [e.target.name]: e.target.value })}>
                    <option value="" className='text-[#414141]'>Choose category</option>
                    {categoryData?.map((item) =>
                      <option value={item._id} className='text-black'>
                        {item?.name}
                      </option>
                    )}
                  </select>
                  <div className='absolute top-[-130px]  md:top-[-60px] lg:top-[-10px] right-0'>
                    <button className='p-2 bg-amber-500 text-white rounded-lg' onClick={() => data.setAddCategoryModal(true)}>Add Category</button>
                  </div>
                </div>
              </div>
              <div className='w-full flex md:mt-5  flex-col md:flex-row md:gap-10 '>
                <div className='w-full md:w-1/3 '>
                  <h1 className={`py-2 ${data.bodyColor ? "text-white" : "text-black"}`}>Brand</h1>
                  <input type="text" className={`p-2 w-full rounded-md  border ${data.bodyColor ? "text-white" : "text-black"} border-[#414141]  bg-transparent focus:outline-none`} placeholder='Brand Name' />
                </div>
                <div className='w-full md:w-1/3'>
                  <h1 className={`py-2 ${data.bodyColor ? "text-white" : "text-black"}`}>review</h1>
                  <input type="number" className={`p-2 w-full rounded-md  border ${data.bodyColor ? "text-white" : "text-black"} border-[#414141]  bg-transparent focus:outline-none`} name='review' placeholder='code...'value={createProductData?.review} onChange={(e) => setCreateProductData({
                    ...createProductData, [e.target.name]:
                      parseInt(e.target.value)
                  })} />
                </div>
                <div className='w-full md:w-1/3 '>
                  <h1 className={`py-2 ${data.bodyColor ? "text-white" : "text-black"}`}>Stock</h1>
                  <input type="number" className={`p-2 w-full rounded-md  border ${data.bodyColor ? "text-white" : "text-black"} border-[#414141]  bg-transparent focus:outline-none`} placeholder='Quantity' name='stock'value={createProductData?.stock} onChange={(e) => setCreateProductData({ ...createProductData, [e.target.name]: parseInt(e.target.value) })} />
                </div>
              </div>
              <div className='md:mt-5'>
                <h1 className={`py-2 ${data.bodyColor ? "text-white" : "text-black"}`}>Description</h1>
                <textarea className={`p-2 h-20 md:h-32 w-full rounded-md  border ${data.bodyColor ? "text-white" : "text-black"} border-[#414141]  bg-transparent focus:outline-none`} placeholder='given this short description about product' name='description' value={createProductData?.description} onChange={(e) => setCreateProductData({ ...createProductData, [e.target.name]: e.target.value })} />
              </div>
              <div className='w-full flex  flex-col md:flex-row md:mt-5 md:gap-10 '>
                <div className='w-full md:w-1/3 '>
                  <h1 className={`py-2 ${data.bodyColor ? "text-white" : "text-black"}`}>Instock</h1>
                  <input
                    type="text"  // or 'checkbox', depending on what you need
                    className={`p-2 w-full rounded-md  border ${data.bodyColor ? "text-white" : "text-black"} border-[#414141]  bg-transparent focus:outline-none`}
                    name='inStock'
                    placeholder='instock'
                    value={createProductData.inStock}  // this assumes you have a state holding the value
                    onChange={(e) => setCreateProductData({
                      ...createProductData,
                      [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : Boolean(e.target.value)
                    })}
                  />
                </div>
                <div className='w-full md:w-1/3  '>
                  <h1 className={`py-2 ${data.bodyColor ? "text-white" : "text-black"}`}>Product Code</h1>
                  <input type="text" className={`p-2 w-full rounded-md  border ${data.bodyColor ? "text-white" : "text-black"} border-[#414141]  bg-transparent focus:outline-none`} placeholder='code...' />
                </div>
                <div className='w-full md:w-1/3 '>
                  <h1 className={`py-2 ${data.bodyColor ? "text-white" : "text-black"}`}>Stock</h1>
                  <input type="text" className='border  text-white border-[#414141]  bg-transparent rounded-md w-full p-2 focus:outline-none' placeholder='Quantity' />
                </div>
              </div>
              <div className='w-full flex  flex-col md:flex-row md:mt-5 md:gap-10 '>
                <div className='w-full md:w-1/3 '>
                  <h1 className={`py-2 ${data.bodyColor ? "text-white" : "text-black"}`}>Brand</h1>
                  <input type="text" className={`p-2 w-full rounded-md  border ${data.bodyColor ? "text-white" : "text-black"} border-[#414141]  bg-transparent focus:outline-none`} placeholder='Brand Name' />
                </div>
                <div className='w-full md:w-1/3  '>
                  <h1 className={`py-2 ${data.bodyColor ? "text-white" : "text-black"}`}>Product Code</h1>
                  <input type="text" className={`p-2 w-full rounded-md  border ${data.bodyColor ? "text-white" : "text-black"} border-[#414141]  bg-transparent focus:outline-none`} placeholder='code...' />
                </div>
                <div className='w-full md:w-1/3 '>
                  <h1 className={`py-2 ${data.bodyColor ? "text-white" : "text-black"}`}>Stock</h1>
                  <input type="text" className={`p-2 w-full rounded-md  border ${data.bodyColor ? "text-white" : "text-black"} border-[#414141]  bg-transparent focus:outline-none`} placeholder='Quantity' />
                </div>
              </div>
            </div>
          </div>

          {/* price infromation */}
         
          <div className={`${data.bodyColor ? "bg-[#111111] border-[5px] border-[#232323]" : " bg-white shadow-lg rounded-lg"} w-full h-[310px] md:h-[200px] p-2 mt-10 flex flex-col`}>
            <div className='w-full h-[15%] md:h-[25%] flex items-center justify-start border-b  border-[#414141] '>
              <h1 className={`${data.bodyColor ? "text-amber-500" : "text-black"} md:text-xl  font-semibold`}>Pricing Details</h1>
            </div>
            <div className='h-[85%] md:h-[75%] w-full md:p-5'>
              <div className='w-full flex flex-col md:flex-row md:gap-10'>
                <div className='w-full md:w-1/3'>
                  <h1 className={`py-2 ${data.bodyColor ? "text-white" : "text-black"}`}>Price</h1>
                  <input type="number" className={`p-2 w-full rounded-md  border ${data.bodyColor ? "text-white" : "text-black"} border-[#414141]  bg-transparent focus:outline-none`} placeholder='price..' name='price' value={createProductData?.price} onChange={(e) => setCreateProductData({ ...createProductData, [e.target.name]: parseInt(e.target.value) })} />
                </div>
                <div className='w-full md:w-1/3 '>
                  <h1 className={`py-2 ${data.bodyColor ? "text-white" : "text-black"}`}>Discount</h1>
                  <input type="text" className={`p-2 w-full rounded-md  border ${data.bodyColor ? "text-white" : "text-black"} border-[#414141]  bg-transparent focus:outline-none`} placeholder='discount...' />
                </div>
                <div className='w-full md:w-1/3'>
                  <h1 className={`py-2 ${data.bodyColor ? "text-white" : "text-black"}`}>Tex</h1>
                  <input type="text" className={`p-2 w-full rounded-md  border ${data.bodyColor ? "text-white" : "text-black"} border-[#414141]  bg-transparent focus:outline-none`} placeholder='tex..' />
                </div>
              </div>
            </div>
          </div>

          <div className='w-full flex justify-center items-center py-5 gap-10'>
            <button className='px-3 py-2 bg-amber-500 text-white rounded-lg' onClick={createProduct}>Create Product</button>
            <button className='px-3  py-2 bg-slate-200 rounded-lg'>Cancel</button>
          </div>
        </div>
      </div>
      <div className='w-full h-full relative'>{data.addCategoryModal && <CategoryModal  />}</div>
    </>
  )
}