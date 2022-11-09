type ProductPreviewType = 
  {
    dealId: number;
    title: string;
    pictures: [picture: string];
    createdAt: string;
    view: number;
    price: number;
    userInfo: {
      userId: number;
      nickname: string;
    };
    tag: number;
  }
;
export type {ProductPreviewType}