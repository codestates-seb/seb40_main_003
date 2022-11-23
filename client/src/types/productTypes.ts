export type ProductPreviewType = {
  data: [ProductPreviewMappingType];
  pageInfo: {
    page: number;
    size: number;
    totalPages: number;
    totalElements: number;
  };
};
export interface ProductPreviewMappingType {
  area: number;
  category: number;
  content: string;
  createdAt: string;
  dealId: number;
  images: [string];
  memberLikeNum: number;
  modifiedAt: string;
  price: number;
  state: number;
  title: string;
  view: number;
}

export type ProductDetailType = {
  data:[ProductDetailDataType]
};

// 프로덕트 디테일의 내용
export type ProductDetailDataType = {
  area: number;
  category: number;
  content: string
  createdAt: string
  dealId: number;
  images: [
    string
  ];
  memberLikeNum: number;
  modifiedAt: string;
  price: number;
  state: number;
  title: string
  view: number;
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
