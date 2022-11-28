// 돌봄 프로필 리스트 조회 / 검색
export type caringPreviewTypes = {
  data: [caringPreviewDataTypes],
  pageInfo: {
    page: number,
    size: number,
    totalElements: number,
    totalPages: number
        }
};
export type caringPreviewDataTypes = {
      expertId: number,
      name: string,
      age: number,
      gender: number,
      simpleContent: string,
      address: string,
      likes: number,
      view: number,
      member: 
      {
        memberId: number,
        plants: [
          {
            plantId: number,
            name: string,
            years: number,
            type: string,
            image: {
              imageId: number,
              imgUrl: string,
              isRepImg: string}
            }
          ]
      }, 
      techTags:
      [
        {
        techTagId: number,
        techTagName: string
        }
      ],
      areaTags:
      [
                {
              areaTagId: number,
              ateaTagName: string
                }
            ],
            image: {
              imageId: number,
              imgUrl: string,
              isRepImg: string
            }
}

// 돌봄 프로필 상세 조회
export type CareDetailTypes = {
  expertId: number,
  name: string,
  age: number,
  gender: number,
  simpleContent: string,
  detailContent: string,
  useNum: number,
  price: string,
  address: string,
  extra: string,
  member: {
      memberId: number,
      plants: [
            {
              plantId: number,
              name: string,
              years: number,
              type: string,
              image: {
                  imageId: number,
                  imgUrl: string,
                  isRepImg: string
                }
            }
        ]
    },
  techTags: [
        {
          techTagId: number,
          techTagName: string
        }
    ],
  expertReviews: [
        {
          expertReviewId: number,
          content: string,
          member: {
              memberId: number,
              nickname: string
            },
          createdAt: string,
          modifiedAt: string
        }
    ],
  image: {
      imageId: number,
      imgUrl: string,
      isRepImg: string
    }
  }

// 돌봄 프로필 찜 하기
export type CareLikeAddType = {
  memberLikeExpertId: number,
  member:{
      memberId: number,
      nickname: string
  },
  "expertProfileId": 1
}

// 돌봄 찜 목록 조회
export type CareLikeListType = {
  data: [CareLikeType]
}
export type CareLikeType ={
  memberLikeExpertId: number,
  member:{
      memberId: number,
      nickname: string
  },
  expertProfileId: number
}

// 돌봄 리뷰 작성
export type CareReviewType = {
  experSucessId: number,
    expertId: number
    writer: {
        memberId: number,
        nickname: string
    },
    content: string
}