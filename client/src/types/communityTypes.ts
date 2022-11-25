// 커뮤니티 게시글 조회
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
      createdAt: string;
      modifiedAt: string;
      commentNum: number;
      likeNum : number;
      images: [
        {
          imgUrl: string;
        }
      ];
      member: {
        memberId: number;
        nickname: string;
        image: string;
      }
};

// 커뮤니티 게시글 상세 조회
export type communityDetailTypes = {
  communityId: number;
  title: string;
  content: string;
  view: number;
  createdAt: string;
  modifiedAt: string;
  commentNum: number;
  likeNum : number;
  images: [
    {
      imgUrl: string;
    }
  ];
  member: {
    memberId: number;
    nickname: string;
    image: {
      imgUrl: string;
    }
  }
  comments: [
    {
      commentId: number;
      content: string;
      createdAt: string;
      modifiedAt: string;
      isModified: number;
      isDeleted: number;
      depth: number;
      parent: number;
      member: {
        memberId: number;
        nickname: string;
        image: {
          imgUrl: string;
        }
      };
    }
  ];
};


// 추가 조회: 내 게시글
export type CommunityMyPreviewType = {
  data : [
    {
      postId: number,
      title: string,
      photo: string,
      content: string,
      likeNum: number,
      commentNum: number,
      viewNum: number,
      createdAt: string
    }
  ],
  pageInfo: {
    page: number,
    size: number,
    totalPages: number,
    totalElements: number
  }
}