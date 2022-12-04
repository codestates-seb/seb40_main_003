
export type profileType = {
  nickname: string;
  image: imageType|null
  memberProfile: {
    content: string;
  };
  memberInformation: {
    address: string;
  };
  plants: ProfilePlantType[];
  deals: ProfileDealType[];
  memberReviews: ProfileMemberReviewType[];
};
// 식물모달 타입
export type ProfilePlantType = {
  plantId: number;
  name: string;
  years: string;
  type: string;
  image: imageType
};

export type ProfileMemberReviewType = {
  dealReviewId: number;
  content: string;
  member: {
    memberId: number;
    nickname: string;
  }
  createdAt: string
  modifiedAt: string
};

export type ProfileDealType = {
  dealId: number;
  title: string;
  view: number;
  price: number;
  likeNum: number;
  state: number;
  images: string[]|string;
  createdAt: string;
  category:number
};

export type imageType = {
    imageId: number;
    imgUrl: string;
    isRepImg: boolean;
}