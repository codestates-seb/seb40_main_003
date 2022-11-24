// -------------- API 명세서
// type communityTypes = {
//   data: [
//     {
//       communityId: number;
//       title: string;
//       content: string;
//       view: number;
//       createdAt: number;
//       modifiedAt: string;
//       commentNum: string;
//       likeNum: string;
//       image: [
//         {
//           imgUrl: string;
//         }
//       ];
//       member: {
//         memberId: string;
//         nickname: string;
//         image: string;
//       };
//     }
//   ];
// };
// export type { communityTypes };
// -------------------------------
export type CommunityPreviewType = {
  data: [communityPreviewDataTypes];
  pageInfo: {
    page: number;
    size: number;
    totalPages: number;
    totalElements: number;
  };
};

export type communityPreviewDataTypes = {
      communityId: number;
      title: string;
      content: string;
      view: number;
      likes: number;
      commentNum: number;
      createdAt: string;
      modifiedAt: string;
      images: [string];
      comments: null;
};
