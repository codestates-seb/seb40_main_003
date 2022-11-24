import { rest } from "msw";

export const CaringListHandler = () => {
  return rest.get("https://testserver.com/caring", async (req, res, ctx) => {
    return res(
      ctx.json(
        {
          data: [
            {
            expertId: 1,
            name: "김고수",
            age: 35,
            gender: 2,
            simpleContent: "믿고 맡겨 주십쇼!",
            address: "망원동",
            likes: 26,
            view: 123,
            member: 
            {
              memberId: 1,
              plants: [
                {
                  plantId: 1,
                  name: "몬식이",
                  years: 3,
                  type: "몬스테라",
                  image: {
                    imageId: 1,
                    imgUrl: "https://cdn.imweb.me/upload/S20200311de8f1a391c78d/7a07e6be9df0f.jpg",
                    isRepImg: ""}
                  }
                ]
            }, 
            techTags:
            [
              {
              techTagId: 1,
              techTagName: "분갈이"
              }
            ],
            areaTags:
            [
                      {
                    areaTagId: 1,
                    ateaTagName: "마포구"
                      }
                  ],
                  image: {
                    imageId: 1,
                    imgUrl: "https://file.mk.co.kr/meet/neds/2020/08/image_readmed_2020_879329_15984246804331560.jpg",
                    isRepImg: ""
                  }
                }
          ],
          pageInfo: {
            page: 1,
            size: 5,
            totalElements: 50,
            totalPages: 10
          }
        }
      )
    );
  });
};

export const expertProfileDetail = (profileNumber) => {
  return rest.get(
    `https://testserver.com/caring/${profileNumber}`,
    async (req, res, ctx) => {
      return res(
        ctx.json(
          {
          expertId: 1,
          name: "김고수",
          age: 35,
          gender: 2,
          simpleContent: "믿고 맡겨 주십쇼!",
          detailContent: "식물자원학과를 졸업한 우리 동네 전문가입니다. 여러분 가정의 반려식물을 다정하게 돌보겠습니다.",
          useNum: 20,
          price: "30분 9,000원 1시간 15,000원",
          address: "망원동",
          extra: "서비스별 추가비용 발생",
          member: {
              memberId: 1,
              plants: [
                    {
                      plantId: 1,
                      name: "몬식이",
                      years: 3,
                      type: "몬스테라",
                      image: {
                          imageId: 1,
                          imgUrl: "https://cdn.imweb.me/upload/S20200311de8f1a391c78d/7a07e6be9df0f.jpg",
                          isRepImg: "string"
                        }
                    }
                ]
            },
          techTags: [
                {
                  techTagId: 1,
                  techTagName: "분갈이"
                }
            ],
          expertReviews: [
                {
                  expertReviewId: 1,
                  content: "어유 너무 잘해주셔서 제가 입양갈 뻔 했어요.",
                  member: {
                      memberId: 1,
                      nickname: "감동받은1인"
                    },
                  createdAt: "2022-11-24",
                  modifiedAt: "2022-11-24"
                }
            ],
            image: {
              imageId: 1,
              imgUrl: "https://file.mk.co.kr/meet/neds/2020/08/image_readmed_2020_879329_15984246804331560.jpg",
              isRepImg: ""
            }
          }
        )
      );
    }
  );
};
