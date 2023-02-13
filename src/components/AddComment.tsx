import React, { useEffect, useState } from "react";
import { commentType, userType } from "../types/types";
import { currentUser as user} from "../data";

type addCommentPropType = {
  setData:React.Dispatch<React.SetStateAction<commentType[] >>
}

export default function AddComment({setData}:addCommentPropType) {
  //const [user, setUser] = useState<userType>(currentUser);
  const [comment, setComment] = useState(" ");

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setComment(e.target.value);
  }

  async function handleSubmit(e: React.FormEvent<HTMLButtonElement>) {
    e.preventDefault();

    setComment("")
    setData(prev => ([
      ...prev,
      {
        id: Math.floor(Math.random() * 100),
        content: comment,
         score: 0,
        replies: [],
        user: user,
        createdAt: "just now",
       }
    ]))

    // fetch("http://localhost:3000/comments", {
    //   method: "POST",
    //   body: JSON.stringify({
    //     "content": comment,
    //     "score": 0,
    //     "replies": [],
    //     "user": user,
    //     "createdAt": "just now",
    //   }),
    //   headers: {
    //     "Content-Type": "Application/json",
    //   },
    // })
    // .then((res) => res.json())
    // .then((data) => {
    //   setComment("")
    //   setData(prev => ([...prev, data]))
    // })
  }

  // useEffect(() => {
  //   fetch("http://localhost:3000/currentUser")
  //     .then((res) => res.json())
  //     .then((data) => setUser(data));
  // }, []);

  return (
    <div className='cta bg-white p-6 rounded-lg mb-4'>
      <img className='cta__img w-10' src={user.image.png} alt={user.username} />
      <label htmlFor="add-comment" className="hidden">Add comment</label>
      <textarea 
        id="add-comment"
        className='cta__textarea border rounded-lg border-vlGray placeholder:text-grayBlue h-24 px-6 p-3 focus:outline-0 focus:border-darkBlue' 
        value={comment} onChange={handleChange}></textarea>
      <button 
        onClick={handleSubmit}
        className='cta__btn py-3 px-7 bg-modBlue text-white rounded-lg hover:bg-lgBlue'
        type="submit" 
      >
        SEND
      </button>
    </div>
  );
}
