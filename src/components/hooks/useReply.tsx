import React, { SetStateAction, useState } from 'react'
import { repliesType } from '../../types/types';
import { useUserContext } from '../context/UserContext';

type setReplyType = React.Dispatch<React.SetStateAction<repliesType[] >>
type setIsTextBoxOpenType= React.Dispatch<SetStateAction<boolean>>

export default function useReply(id:number , replyTo: string, setReplies: setReplyType, setIsTextBoxOpen: setIsTextBoxOpenType) {
     const [reply, setReply] = useState("");
    const {user} = useUserContext()

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setReply(e.target.value);
  }

  function updateReplies(prev: repliesType[],data:repliesType): repliesType[]{
     return ([...prev,data])
  }

  async function handleSubmit(e: React.FormEvent<HTMLButtonElement>) {
    e.preventDefault();

    setReply("")
        setIsTextBoxOpen(false)
        setReplies((prev) => updateReplies(prev, {
        commentId: id,
        id: Math.floor(Math.random() * 100),
        replyingTo: replyTo,
        content: reply,
        score:0,
        user: user,
        createdAt: "just now",
      }))

  //   fetch(`http://localhost:3000${url}`, {
  //     method: "POST",
  //  body: JSON.stringify(),
  //     headers: {
  //       "Content-Type": "Application/json",
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((data:repliesType) => { 
  //       setReply("")
  //       setIsTextBoxOpen(false)
  //       if(Array.isArray(data) || Object.keys(data).length == 0) return
  //       setReplies((prev) => updateReplies(prev, data))
  //   })
  //     .catch(err => console.log(err));
   }

  return {handleChange, handleSubmit,user,reply}
}
