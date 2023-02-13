import React, { RefObject, SetStateAction, useEffect, useRef, useState } from "react";
import { repliesType, userType } from "../types/types";
import { useModalContext } from "./context/ModalContext";
import { useUserContext } from "./context/UserContext";

type containerPropType = {
  data: {
    content: string;
    createdAt: string;
    id: number;
    replyingTo?: string;
    commentId?: number;
    score: number;
    user: userType;
  };
  editing: boolean;
  handleEdit:(value: boolean) => void;
  handleDelete : () => Promise<void>;
  handleUpdate: (id:number, value:string) => void;
  setIsTextBoxOpen: React.Dispatch<SetStateAction<boolean>>
};


export default function Container ({ data,
  editing,
  handleEdit,
  handleUpdate,
  handleDelete,
  setIsTextBoxOpen }: containerPropType) {

  const {
    id,
    content,
    createdAt,
    score,
    user: { username, image },
  } = data;
  const[editedReply, setEditedReply] = useState(content.trim())
  const {user: loggedinUser} = useUserContext()
  const {setIsModalOpen, modalFn} = useModalContext()
  const [isRefAttached, setIsRefAttached] = useState(false)
  const editRef = useRef<HTMLTextAreaElement>(null)

  function setCaretPos(){
    if (editRef.current ){
      const textarea = editRef.current
      textarea.setSelectionRange(textarea.value.length, textarea.value.length)
      textarea.focus()
    } 
  }
   
  const canEdit = username === loggedinUser.username;
  
  const canEditBtns = (
    <div className="comment__cta relative font-medium">
      <button onClick={() => {setIsModalOpen(true); modalFn.func = handleDelete}}
        className="comment__btn comment__btn--delete  text-softRed relative mr-11 cursor-pointer hover:text-paleRed">Delete</button>
      <button onClick={() => handleEdit(true)} 
        className=" comment__btn comment__btn--edit text-modBlue relative cursor-pointer hover:text-lgBlue">Edit</button>
    </div>
  )

  const cta = canEdit ? 
  canEditBtns : 
  (<button 
    className="comment__cta comment__cta--reply relative pl-6 ml-4 text-modBlue font-medium hover:text-lgBlue " 
    onClick={() => setIsTextBoxOpen(true)}><span></span>Reply</button>)

  useEffect(() => {
    editing && setIsRefAttached(true)
  },[editing])

  useEffect(() => {
    isRefAttached && setCaretPos()
  },[isRefAttached])

  return (
    <div>
      <div className="comment bg-white mb-4 p-6 rounded-md">
        <div className="comment__title flex items-center space-x-4">
          <img className="w-8" src={image.png} alt={username} />
          <p className="font-bold text-darkBlue">{username} {canEdit? <span className="bg-modBlue py-px px-1.5 ml-1 rounded-[2px] text-white font-normal text-sm">you</span>: null}</p>
          <p>{createdAt}</p>
        </div>
        {editing ?
        (<div className="comment__body">
          <textarea
            ref={editRef} 
            className='block w-full mb-4 border rounded-lg border-lightGray px-6 p-3 focus:outline-0 focus:border-darkBlue ' 
            value={editedReply} 
            onChange={(e) => setEditedReply(e.target.value)}
          ></textarea>
          <button
          onClick={() => { handleUpdate(id, editedReply); handleEdit(false)}}
          className='cta__btn float-right py-3 px-7 bg-modBlue text-white rounded-lg hover:bg-lgBlue' type="submit" >UPDATE</button>

        </div>
        )
         : 
        (<p className="comment__body">
          <span className="text-modBlue font-bold ">{data.replyingTo && `@${data.replyingTo}`}</span> {content}
        </p>)
        }
        
        <div className="comment__score inline-block bg-vlGray px-3 py-1.5 rounded-xl">
          <button className=" text-grayBlue font-bold opacity-40 text-lg ">+</button>
          <span className=" font-bold text-modBlue">{score}</span>
          <button className=" text-grayBlue font-bold opacity-40 text-lg ">-</button>
        </div>
        {cta}
      </div>
    </div>
  );
}
