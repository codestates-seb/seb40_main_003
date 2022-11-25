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

export type ProductDetailType = {
  data: [ProductDetailDataType];
};

// 프로덕트 디테일의 내용
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

//
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

export type ProductLikeAddType = {
  memberLikeDealId: number;
  dealId: number;
};

export type DealReviewType = {
  dealReviewId: number;
  dealId: number;
  buyer: {
    memberId: number;
    nickname: string;
  };
  content: string;
};
