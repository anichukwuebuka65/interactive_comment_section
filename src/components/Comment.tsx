import React, { SetStateAction, useEffect, useState } from "react";
import { commentType, repliesType, userType } from "../types/types";
import { arrangeReplies } from "../utilities/functions";
import AddContainer from "./AddContainer";
import Container from "./Container";
import Reply from "./Reply";
import {replies as data} from "../data"

type commentPropType = {
  comment: commentType;
  setComments: React.Dispatch<SetStateAction<commentType[]>>
  handleCommentUpdate: (id:number, value:string) => void
};


export default function Comments({comment, setComments, handleCommentUpdate}: commentPropType) {
  const [replies, setReplies] = useState<repliesType[]>(data)
  const [isTextBoxOpen, setIsTextBoxOpen] = useState(false)
  const [editing, setEditing] = useState(false)

  const repliesList =  arrangeReplies(replies).map((reply:repliesType) => (
    <Reply key={reply.id} reply={reply } setReplies={setReplies} handleReplyUpdate={handleReplyUpdate}/>
  ));

  function handleReplyUpdate(id: number, value: string) {
   const newReplies = replies.map(reply => {
      if(reply.id === id) return {...reply, content: value}
      return reply
    })

    setReplies(newReplies)
  }

  async function handleDelete(): Promise<void> {

    setComments(prev => {
      return prev.filter(item => item.id !== comment.id)
    })
    
    // const res = await fetch(`http://localhost:3000/comments/${comment.id}`,{
    //   method:"DELETE",
    //   headers:{
    //     "Content-Type": "Application/json"
    //   }
    // })
    // const status = await res.json()
    // if(status) {
    //   setComments(prev => {
    //     return prev.filter(item => item.id !== comment.id)
    //   })
    // }
    
  }

  function handleEdit(value: boolean){
    setEditing(value)
  }

  // useEffect(()=>{
  //       fetchData(`/comments/${comment.id}/replies`)
  //       .then(data => {if (Array.isArray(data)) setReplies(data)})
  //   },[])

  return (
    <div>
     <Container
     handleDelete={handleDelete}
     handleUpdate={handleCommentUpdate}
     editing={editing} 
     handleEdit={handleEdit} 
     setIsTextBoxOpen={setIsTextBoxOpen} 
     data={comment} 
     />
    {
    isTextBoxOpen ? 
    <AddContainer {...{id: comment.id, username: comment.user.username,setReplies,setIsTextBoxOpen}} /> : 
    null
    } 
      <div className="pl-4 border-l-2 border-l-lightGray">{repliesList}</div>
    </div>
  );
}


export async function fetchData(endpoint: string):Promise<repliesType[] | userType>{
   return fetch(`http://localhost:3000${endpoint}`)
        .then(res => res.json())
        .then(data =>  data)
        .catch(err => console.log(err))
}