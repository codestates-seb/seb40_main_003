// 거래 게시글 리스트 조회 / 검색
export type ProductPreviewType = {
  data: {
    data: [ProductPreviewMappingType];
    pageInfo: {
      page: number;
      size: number;
      totalPages: number;
      totalElements: number;
    };
  };
};
export interface ProductPreviewMappingType {
  dealId: number;
  title: string;
  content: string;
  view: number;
  price: number;
  createdAt: string;
  modifiedAt: string;
  category: number;
  state: number;
  likeNum: number;
  images: [string];
  area: number;
}

// 거래 게시글 상세 조회
export type ProductDetailType = {
  data: [ProductDetailDataType];
};

export type ProductDetailDataType = {
  dealId: number;
  title: string;
  content: string;
  view: number;
  price: number;
  createdAt: string;
  modifiedAt: string;
  state: number;
  likeNum: number;
  images: [string];
  area: number;
  member: {
    memberId: number;
    nickname: string;
    image: {
      imageId: string;
      imgUrl: string;
      isRepImg: string;
    };
  };
};

// 거래 게시글 찜 하기
export type ProductLikeAddType = {
  memberLikeDealId: number;
  dealId: number;
};

//거래 찜 목록 조회
export type ProductLikeListType = {
  data: [ProductLikeType];
  pageInfo: {
    page: number;
    size: number;
    totalPages: number;
    totalElements: number;
  };
};

export type ProductLikeType = {
      dealId: number;
      title: string;
      content: string;
      view: number;
      price: number;
      createdAt: string;
      modifiedAt: string;
      category: number;
      state: number;
      likeNum: number;
      images: [string];
      area: number;
};

// 거래 후기 작성
export type DealReviewType = {
  dealReviewId: number;
  dealId: number;
  buyer: {
    memberId: number;
    nickname: string;
  };
  content: string;
};

// 추가 조회: 구매 내역
export type DealSuccessPreviewType = {
  data : [
    {
      dealId: number,
      title: string,
      photo: string,
      price: number,
      likeNum: number,
      viewNum: number,
      status: number,
      createdAt: string
    }
  ],
  pageInfo: {
    page: number,
    size: number,
    totalPages: number,
    totalElements: number
  }
}