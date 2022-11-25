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

//거래 찜 목록 조회
export type ProductLikePreviewType = {
  data: [
    {
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
      image: [
        {
          imgUrl: string;
        }
      ];
      area: number;
    }
  ];
  pageInfo: {
    page: number;
    size: number;
    totalPages: number;
    totalElements: number;
  };
};

// 거래 게시글 찜 하기
export type ProductLikeAddType = {
  memberLikeDealId: number;
  dealId: number;
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
