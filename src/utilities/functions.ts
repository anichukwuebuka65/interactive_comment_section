import { repliesType } from "../types/types";


export function arrangeReplies(replies:repliesType[]): repliesType[]{
    if(replies.length == 0) return []
 const newArr = []
 const newArrItemsId: number[] = []

 

 for (let i = 0; i < replies.length  ; i++) {
    if (checked(replies[i].id)){
        continue;
    }
        newArr.push(replies[i])
        newArrItemsId.push(replies[i].id)
    for(let j = i + 1; j < replies.length ; j++) {
        if(areTheSame(j,i) && !checked(replies[j].id)) {
            newArrItemsId.push(replies[j].id)
            newArr.push(replies[j])
        }
    }
 }

return newArr

function areTheSame(a: number, b:number){
  return  replies[a].replyingTo === replies[b].user.username
}

function checked(id: number){
   return newArrItemsId.includes(id)
 }

}