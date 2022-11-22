type profileTypes = 
{
  nickname: string,
  photo: string,
  content: string,
  address: string,
  plant: [
    {
      plantId: number,
      plantPhoto: string,
      plantName: string,
      plantType: string,
      plantAge: number,
    },
  ],
  dealReview: [
    {
      reviewId: string,
      content: string,
      writerInfo: {
        userId: string,
        nickname: string,
      },
    },
  ],
  deal: [
    {
      dealId: string,
      dealName: string,
      dealPhoto: string,
      likeNum: number,
      view: number,
      price: number,
      status: string,
      createdAt: string,
    },
  ],
};
  export type {profileTypes}