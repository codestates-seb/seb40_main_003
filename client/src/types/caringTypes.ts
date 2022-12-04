import { pageInfo } from "./pageInfoType";
import { imageType, ProfilePlantType } from "./profileType";

// 돌봄 프로필 리스트 조회 / 검색
export type caringPreviewTypes = {
  data: [caringPreviewDataTypes];
  pageInfo: pageInfo
};
export type caringPreviewDataTypes = {
  expertId: number;
  name: string;
  age: number;
  gender: number;
  simpleContent: string;
  address: string;
  likes: number;
  view: number;
  member: {
    memberId: number;
    plants: [
      ProfilePlantType
    ];
  };
  techTags: [
    {
      techTagId: number;
      techTagName: string;
    }
  ];
  areaTags: [
    {
      areaTagId: number;
      areaTagName: string;
    }
  ];
  image: imageType
};

// 돌봄 프로필 상세 조회
export type CareDetailTypes = {
  name: string;
  age: number;
  photo:string;
  gender: number;
  simpleContent: string;
  detailContent: string;
  useNum: number;
  price: string;
  extra: string;
  address: string;
  member:{
    memberId:string
    plants:[ProfilePlantType]|[]
  }
  techTags: [
    {
      techTagId: number;
      techTagName: string;
    }
  ];
  expertReviews: [exportReviewType];
  image: imageType;
};
// 돌봄리뷰타입
export type exportReviewType = {
  expertReviewId: string
  content: string
  member: {
      memberId: number
      nickname: string
  }
  createdAt: string
  modifiedAt: string
};

// 돌봄 프로필 찜 하기
export type CareLikeAddType = {
  memberLikeExpertId: number;
  member: {
    memberId: number;
    nickname: string;
  };
  expertProfileId: number;
};

// 돌봄 찜 목록 조회
export type CareLikeListType = {
  data: [CareLikeType];
  pageInfo: pageInfo
};

export type CareLikeType = {
  memberLikeExpertId: number;
  member: {
    memberId: number;
    nickname: string;
  };
  expertProfileId: number;
};

// 돌봄 리뷰 작성
export type CareReviewType = {
  experSucessId: number;
  expertId: number;
  writer: {
    memberId: number;
    nickname: string;
  };
  content: string;
};
