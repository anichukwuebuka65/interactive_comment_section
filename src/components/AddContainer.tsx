import React, { SetStateAction } from 'react'
import { repliesType } from '../types/types';
import useReply from './hooks/useReply';

type addContainerPropTypes = {
  id: number;
  username: string;
  setReplies: React.Dispatch<SetStateAction<repliesType[]>>;
  setIsTextBoxOpen: React.Dispatch<SetStateAction<boolean>>
}

export default function AddContainer({id, username, setReplies, setIsTextBoxOpen}:addContainerPropTypes) {
  const {handleChange,handleSubmit,user,reply:value} = useReply(id,username, setReplies,setIsTextBoxOpen)
  

  return (
    <div className='cta bg-white p-6 rounded-lg mb-4'>
      <img className='cta__img w-10' src={user.image.png} alt={user.username} />
      <textarea className='cta__textarea border rounded-lg border-lightGray placeholder:text-grayBlue h-24 px-6 p-3 focus:outline-0 focus:border-darkBlue ' value={value} onChange={handleChange} placeholder="Add a comment..."></textarea>
      <button onClick={handleSubmit} className='cta__btn py-3 px-7 bg-modBlue text-white rounded-lg hover:bg-lgBlue' type="button">REPLY</button>
    </div>
  )
}
