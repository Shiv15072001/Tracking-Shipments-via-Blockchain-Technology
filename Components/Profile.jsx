import React, {useState, useEffect} from 'react'
import Image from 'next/image'
import { Str1 } from '../Components/index'


//Internal Import
import images from "../Images/index"


export default ({
  openProfile,
  setOpenProfile,
  currentUser,
  getShipmentCount
}) => {
  const [count, setCount]= useState(undefined);

  useEffect(() => {
    const getShipmentData = async () => {
      const allData = await getShipmentCount();
      console.log(allData)
      setCount(allData)
    }

    getShipmentData();
  }, [])


  return openProfile ? (
    <div className="fixed inset-0 z-10 overflow-y-auto">
  <div
    className="fixed inset-0 w-full h-full bg-black opacity-40"
    onClick={() => setOpenProfile(false)}
  ></div>
  <div className="flex items-center min-h-screen px-4 py-8">
    <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
      <div className='flex justify-end'>
      <button
        className="p-2 text-gray-400 rounded-md hover:bg-gray-100"
        onClick={() => setOpenProfile(false)}
      >
        <Str1 />
      </button>
    </div>
    <div className="max-w-sm mx-auto py-3 space-y-4 text-center">
      <div className="flex flex-col items-center pb-4">
        <Image
          className="w-24 h-24 mb-3 rounded-full shadow-lg"
          src={images.avatar}
          alt="Bonnie Image"
        />
        </div>
        <h5 className="mb-1 text-xl font-medium text-gray-900 ">
          Welcome Trader
        </h5>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {currentUser}
        </span>
        <div className="flex flex-col space-y-3 md:flex-row md:space-x-3 md:space-y-0 mt-4">
          <a
            href="#"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-black border-2 rounded-lg"
          >
            Balance : 34
          </a>
          <a
            href="#"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-black border-2 rounded-lg"
          >
            Total Shipment : {count}
          </a>
          </div>
        </div>
      </div>
    </div>
</div>

  ) : (
    ""
  )

}

