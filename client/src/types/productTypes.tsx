type ProductPreviewType = 
  {
    dealId: number;
    title: string;
    pictures: [picture: string];
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
export type {ProductPreviewType}