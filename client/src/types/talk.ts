import { caringPreviewDataTypes } from "./caringTypes";

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
  notReadNum: number,
  state: string,
  expertInfo: caringPreviewDataTypes
}