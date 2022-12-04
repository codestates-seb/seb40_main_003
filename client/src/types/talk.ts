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
  roomId: string,
  roomName: string,
  sellerId: string,
  buyerId: string,
  notReadNum: string,
  state: string,
  expertInfo: {
      expertId: string,
      name: string,
      age: string,
      gender: string,
      simpleContent: string,
      address: string,
      likes: string,
      view: string,
      techTags: [
          {
              techTagId: string,
              techTagName: string
          }
      ],
      areaTags: [
          {
              areaTagId: string,
              areaTagName: string,
          }
      ],
      image: {
          imageId: string,
          imgUrl: string,
          isRepImg: string
      }
  }
}