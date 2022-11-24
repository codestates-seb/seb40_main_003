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
