type caringTypes = {
  data: [
    {
      expertProfileId: number,
      name: string,
      age: number,
      gender: number,
      simpleContent: string,
      address: string,
      userLikeExpert: number,
      view: number,
      member: 
      {
        memberId: number,
        image: {
          imageId: number,
          imgUrl: string,
          isRepImg: string}
      }, 
      techTag:
      [
        {
        techTagId: number,
        techTagName: string
        }
      ],
      areaTag:
      [
                {
              areaTagId: number,
              ateaTagName: string
                }
            ]
        }
    ],

  pageInfo: {
  page: number,
  size: number,
  totalPages: number,
  totalElements: number
        }
};


type CareDetailTypes = {
  expertId: number,
  name: string,
  age: number,
  gender: number,
  simpleContent: string,
  detailContent: string,
  useNum: number,
  price: number,
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
            }
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
export type { caringTypes, CareDetailTypes };
