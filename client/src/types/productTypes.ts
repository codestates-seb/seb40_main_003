type ProductPreviewType = {
  data: [
    {
      dealId: number,
      title: string,
      content : string,
      view: number,
      price: number,
      createdAt: string,
      modifiedAt: string,
      category: number,
      state: number, 
      likeNum: number,
      image: [
        {
          imgUrl: string
        }
          ],
          area: string
        }
      ],
      pageInfo: {
          page: number,
          size: number,
          totalPages: number,
          totalElements: number
      }
  }


type ProductDetailType = {
  dealId: number,
  title: string,
  content: string,
  view: number,
  price: number,
  createdAt: string,
  modifiedAt: string,
  state: number,
  likeNum: number,
  image: [
    {
      imgUrl: string
    }
  ],
  area: number,
  member: {
  memberId: number,
  nickname: string,
  image: {
    imageId: number,
    imgUrl: string,
    isRepImg: string
    }
  }
}

type ProductLikePreviewType = {
  data: [
    {
      dealId: number,
      title: string,
      content : string,
      view: number,
      price: number,
      createdAt: string,
      modifiedAt: string,
      category: number,
      state: number, 
      likeNum: number,
      image: [
        {
          imgUrl: string
        }
      ],
      area: number
    }
  ],
  pageInfo: {
  page: number,
  size: number,
  totalPages: number,
  totalElements: number
  }
}

type ProductLikeAddType = {
  memberLikeDealId : number,
  dealId : number,
}

type DealReviewType = {
  dealReviewId: number,
  dealId: number,
  buyer: {
    memberId: number,
    nickname: string
  },
  content: string
}
export type { 
  ProductPreviewType, 
  ProductDetailType, 
  ProductLikePreviewType, 
  ProductLikeAddType,
  DealReviewType };