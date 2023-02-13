import React, { SetStateAction, useState } from "react";
import Container from "./Container";
import { repliesType } from "../types/types";
import AddContainer from "./AddContainer";

type replyPropTypes = {
reply:repliesType,
setReplies:React.Dispatch<SetStateAction<repliesType[]>>
handleReplyUpdate: (id:number, value:string) => void
}

export default function Reply({reply, setReplies, handleReplyUpdate}: replyPropTypes) {
  const[isTextBoxOpen, setIsTextBoxOpen] = useState(false)
  const [editing, setEditing] = useState(false)

  function handleEdit(value: boolean){
    setEditing(value)
  }

  async function handleDelete(): Promise<void> {

    setReplies(prev => {
        return prev.filter(item => item.id !== reply.id)
      })

    // const res = await fetch(`http://localhost:3000/replies/${reply.id}`,{
    //   method:"DELETE",
    //   headers:{
    //     "Content-Type": "Application/json"
    //   }
    // })
    // const status = await res.json()
    // if(status) {
    //   setReplies(prev => {
    //     return prev.filter(item => item.id !== reply.id)
    //   })
    // }
  }


  return (
   <div key={reply.id}>
   <Container {...{setIsTextBoxOpen, handleUpdate: handleReplyUpdate, handleDelete,editing, handleEdit, data:reply}} />
     {isTextBoxOpen ? <AddContainer {...{id: reply.commentId, username: reply.user.username,setReplies,setIsTextBoxOpen}} /> : null}
  </div>  
  );
}
