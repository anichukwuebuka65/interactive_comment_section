import React, { useEffect, useState } from "react";
import AddComment from "./components/AddComment";
import Comment from "./components/Comment";
import { commentType } from "./types/types";
import Dialog from "./components/Dialog";
import { useModalContext } from "./components/context/ModalContext";
import {comments as data} from "./data"


export default function App() {
  const [comments, setComments] = useState<commentType[]>(data);
  //const [err , setErr] = useState("")
  const {isModalOpen} = useModalContext() 


  function handleCommentUpdate(id: number, value: string) {
   const newReplies = comments.map(reply => {
      if(reply.id === id) return {...reply, content: value}
      return reply
    })

    setComments(newReplies)
  }


  // useEffect(() => {
  //   fetch("http://localhost:3000/comments")
  //     .then((res) => res.json())
  //     .then((data) => Array.isArray(data) && setComments(data))
  //     .catch(() => setErr("something went wrong"));
  // }, []);


  const commmentList = comments.map((comment) => (
    <Comment setComments={setComments} key={comment.id} comment={comment} handleCommentUpdate={handleCommentUpdate} />
  ));

  return (
      <div className=" bg-vlGray ">
        <div className="min-h-screen max-w-[780px] mx-auto text-grayBlue py-8 px-4">
          <section className="mb-2">
            {commmentList}
          </section>
          <section>
            <AddComment setData={setComments}/>
          </section>
        </div>
         {isModalOpen ? <Dialog  /> : null }
      </div >
  );
}
