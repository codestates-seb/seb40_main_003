export type talkDetail = talkElem[]

export type talkElem = {
  messageId: string;
  message: string;
  messageSender: {
    memberId: string;
    // nickname: string;
    // image: talkDetailImage;
  };
};

export type talkDetailImage = {
  imgUrl: string;
};

export type talkPreview = {
  buyerId:string,
  notReadNum:string,
  roomId:string,
  roomName:string,
  sellerId:string
}