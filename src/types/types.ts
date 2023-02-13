export type imageType = {
  png: string;
  webp: string;
};

export type userType = {
  image: imageType;
  username: string;
};

export type repliesType = {
  commentId: number;
  content: string;
  createdAt: string;
  id: number;
  replyingTo: string;
  score: number;
  user: userType;
};

export type commentType = {
  id: number;
  content: string;
  createdAt: string;
  score: number;
  user: userType;
};


