type ProductPreviewType = 
  {
    dealId: number;
    title: string;
    pictures: [{picture: string}];
    createdAt: string;
    view: number;
    like: number;
    price: number;
    userInfo: {
      userId: number;
      nickname: string;
    };
    tag: number;
  }
;
type ProductDetailType = {
  
    dealId: number
    title: string
    content: string
    view: number
    price: number
    createdAt: string
    modifiedAt: string
    category: number
    state: number
    memberLikeDeal: number
    image: [
        {
            imageId: number
            imgUrl:string
            isRepImg: number
        }
    ],
    areaTag:[
        {
            areaTagId: number
            areaTagName: string
        }
    ],
    member: {
        memberId: number
        nickname: string
        image: {
            imageId: number
            imgUrl: string
            isRepImg: number
        }
    }
}

export type {ProductPreviewType, ProductDetailType}