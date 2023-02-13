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
        <main className="min-h-screen max-w-[780px] mx-auto text-grayBlue py-8 px-4">
          <h1 className="text-center font-bold text-3xl text-darkBlue mb-4">Interactive Comments</h1>
          <section className="mb-2">
            {commmentList}
          </section>
          <section>
            <AddComment setData={setComments}/>
          </section>
        </main>
         {isModalOpen ? <Dialog  /> : null }
      </div >
  );
}
