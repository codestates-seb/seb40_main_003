
export type profileType = {
  nickname: string;
  image: {
    imageId: number;
    imgUrl: string;
    isRepImg: boolean;
  };
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

export type ProfilePlantType = {
  plantId: number;
  name: string;
  years: string;
  type: string;
  image: {
    imageId: number;
    imgUrl: string;
    isRepImg?: boolean;
  };
};

export type ProfileMemberReviewType = {
  dealReviewId: number;
  content: string;
  member: {
    memberId: number;
    nickname: string;
  };
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
