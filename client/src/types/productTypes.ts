type ProductPreviewType = {
  data: [
    {
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
  ],
  pageInfo: {
    page: number;
    size: number;
    totalPages: number;
    totalElements: number;
  };
};
export type ProductPreviewMappingType = {
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
};



type ProductDetailType = {
  dealId: number;
  title: string;
  content: string;
  view: number;
  price: number;
  createdAt: string;
  modifiedAt: string;
  state: number;
  likeNum: number;
  image: [
    {
      imgUrl: string;
    }
  ];
  area: number;
  member: {
    memberId: number;
    nickname: string;
    image: {
      imageId: number;
      imgUrl: string;
      isRepImg: string;
    };
  };
};

type ProductLikePreviewType = {
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

type ProductLikeAddType = {
  memberLikeDealId: number;
  dealId: number;
};

type DealReviewType = {
  dealReviewId: number;
  dealId: number;
  buyer: {
    memberId: number;
    nickname: string;
  };
  content: string;
};
export type {
  ProductPreviewType,
  ProductDetailType,
  ProductLikePreviewType,
  ProductLikeAddType,
  DealReviewType,
};
