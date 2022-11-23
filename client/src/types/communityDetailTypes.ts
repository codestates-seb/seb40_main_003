// type communityDetailTypes = {
//   communityId: number;
//   title: string;
//   content: string;
//   view: number;
//   likeNum: number;
//   createdAt: string;
//   modifiedAt: string;
//   commentNum: number;
//   image: [
//     {
//       imageId: number;
//       imgUrl: string;
//       isRepImg: number;
//     }
//   ];
//   member: {
//     memberId: number;
//     nickname: string;
//     image: {
//       imageId: number;
//       imgUrl: string;
//       isRepImg: number;
//     };
//   };
//   comment: [
//     {
//       commentId: number;
//       content: string;
//       createdAt: string;
//       modifiedAt: string;
//       isModified: number;
//       isDeleted: number;
//       depth: number;
//       parent: number;
//       member: {
//         memberId: number;
//         nickname: string;
//         image: {
//           imageId: string;
//           imgUrl: string;
//           isRepImg: number;
//         };
//       };
//     }
//   ];
// };

// export type { communityDetailTypes };

type communityDetailTypes = {
  communityId: number;
  title: string;
  content: string;
  view: number;
  likes: number;
  commentNum: number;
  createdAt: string;
  modifiedAt: string;
  images: [string];
  comments: [
    {
      commentId: null;
      content: string;
      createdAt: string;
      modifiedAt: string;
      isModified: number;
      isDeleted: number;
      depth: number;
      parent: number;
      writer: {
        memberId: number;
        nickname: string;
        image: string;
      };
    }
  ];
};

export type { communityDetailTypes };