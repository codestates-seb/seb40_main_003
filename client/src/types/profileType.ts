export const MockData:profileType = {
  nickname: "닉네임입니다",
  image: {
    imageId: 3,
    imgUrl: "https://placebear.com/640/360",
    isRepImg: true,
  },
  memberProfile: {
    content: "안녕하세요~",
  },
  memberInformation: {
    address: "부평구",
  },
  plants: [
    {
      plantId: 1,
      name: "몬식이",
      years: 2,
      type: "몬스테라",
      image: {
        imageId: 2,
        imgUrl:"https://placebear.com/640/360",
        isRepImg: false,
      },
    },
    {
      plantId: 2,
      name: "광식이",
      years: 130,
      type: "광해군",
      image: {
        imageId: 2,
        imgUrl:"https://placebear.com/640/360",
        isRepImg: false,
      },
    },
  ],
  deals: [
    {
      dealId: 1,
      title: "식물 팔아요~",
      view: 0,
      price: 1000,
      likes: 0,
      state: 1,
      images: [
        {
          imageId: 2,
          imgUrl:"https://placebear.com/640/360",
          isRepImg: false,
        },
      ],
      createdAt: "2022-11-10T01:59:43.726594",
    },
    {
      dealId: 2,
      title: "식물 팔아요~",
      view: 13,
      price: 10000,
      likes: 13,
      state: 2,
      images: [
        {
          imageId: 2,
          imgUrl:"https://placebear.com/640/360",
          isRepImg: false,
        },
      ],
      createdAt: "2022-11-10T01:59:43.726594",
    },
    {
      dealId: 3,
      title: "식물 팔아요~",
      view: 13,
      price: 10000,
      likes: 13,
      state: 0,
      images: [
        {
          imageId: 2,
          imgUrl:"https://placebear.com/640/360",
          isRepImg: false,
        },
      ],
      createdAt: "2022-11-10T01:59:43.726594",
    },
  ],
  memberReviews: [
    {
      dealReviewId: 1,
      content: "정말 좋은 거래였어요",
      member: {
        memberId: 1,
        nickname: "몬식이 주인",
      },
    },
    {
      dealReviewId: 2,
      content: "거래짱짱맨",
      member: {
        memberId: 2,
        nickname: "몬식쓰",
      },
    },
  ],
};

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
  years: number;
  type:number|string;
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
  likes: number;
  state: number;
  images: [
    {
      imageId: number;
      imgUrl: string;
      isRepImg: boolean;
    }
  ];
  createdAt: string;
};
