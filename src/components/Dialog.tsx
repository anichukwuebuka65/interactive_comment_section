import React from 'react'
import { useModalContext } from './context/ModalContext'

function Dialog() {
  const {setIsModalOpen, modalFn} = useModalContext() 
  const context = useModalContext() 

  return (
    <div className="fixed flex items-center inset-0 bg-[#8a8784] bg-opacity-60 px-4">
      <div role="dialog" className=" mx-auto max-w-[400px] p-8 bg-white rounded-lg">
          <h1 className="font-bold text-darkBlue text-2xl mb-6">Delete comment</h1>
          <p className="mb-4">Are sure you want to delete this comment? This will remove the comment and can't be done</p>
          <div className="flex justify-between">
            <button
              onClick={() => setIsModalOpen(false)} 
              className="bg-grayBlue text-white rounded-lg py-3 px-5 sm:px-8 ">NO, CANCEL</button>
            <button onClick={() => {modalFn.func().then(() => setIsModalOpen(false))}} className="bg-softRed text-white rounded-lg py-3 px-5 sm:px-8">YES, DELETE</button>
          </div>   
      </div>
    </div>
  )
}

export default Dialog