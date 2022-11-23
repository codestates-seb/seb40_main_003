type communityTypes = {
  data: [
    {
      communityId: string;
      title: string;
      content: string;
      view: string;
      createdAt: string;
      modifiedAt: string;
      commentNum: string;
      likeNum: string;
      image: [
        {
          imgUrl: string;
        }
      ];
      member: {
        memberId: string;
        nickname: string;
        image: string;
      };
    }
  ];
};
export type { communityTypes };
