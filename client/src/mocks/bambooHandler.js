import { rest } from "msw";

export const BambooListHandler = () => {
return rest.get("https://testserver.com/bamboo", async (req, res, ctx) => {
    return res(
      ctx.json({
        data: [
          {
              communityId: 1,
              title: "우리 식물 좀 보세요! 얼마나 이쁘게요🤍",
              content: "이번에 갑조네에서 아스파라거스를 샀는데요...",
              view: 22,
              createdAt: "2022-11-14",
              modifiedAt: "2022-11-15",
              commentNum: 1,
              likes: 1,
              image: [
                  {
                      imageId: 1,
                      imgUrl: "https://placebear.com/640/360",
                      isRepImg: 1
                  }
              ],
              member: {
                  memberId: 1,
                  nickname: "Jane Woo"
              }
          },
          {
            communityId: 2,
            title: "우리 식물이 오늘 하늘나라로 갔어요 ㅠ^ㅠ",
            content: "제가 13년동안 키우던 식물이 오늘 ㅠㅠㅠㅠ...",
            view: 20,
            createdAt: "2022-11-14",
            modifiedAt: "2022-11-15",
            commentNum: 2,
            likes: 2,
            image: [],
            member: {
                memberId: 2,
                nickname: "Jane Woo"
            }
        },
        {
          communityId: 3,
          title: "오늘 쿨거래 했습니다. 플랜트하이커 화이팅",
          content: "플랜트하이커 어플 너무 좋네요 성공하세요~!",
          view: 15,
          createdAt: "2022-11-14",
          modifiedAt: "2022-11-15",
          commentNum: 3,
          likes: 3,
          image: [
            {
              imageId: 3,
              imgUrl: "https://cdn.mhns.co.kr/news/photo/202102/427833_564830_06.jpg",
              isRepImg: 3
          }
          ],
          member: {
              memberId: 3,
              nickname: "Jane Woo"
          }
      },
        ]
      })
    )
  })
};

export const BambooDetailHandler = (pageNumber) => {
  return rest.get(`https://testserver.com/bamboo/${pageNumber}`, async (req, res, ctx) => {
      return res(
        ctx.json({
            communityId: pageNumber,
            title: "우리 식물 좀 보세요! 얼마나 이쁘게요🤍",
            content: "할지라도 소담스러운 따뜻한 철환하였는가? 가치를 끓는 할지니, 열락의 힘있다.",
            view: 11,
            createdAt: "2022-11-14",
            modifiedAt: "2022-11-15",
            commentNum: 1,
            likeNum: 16,
            image: [
                {
                    imageId: 1,
                    imgUrl: "https://cdn.pixabay.com/photo/2015/10/22/17/45/leaf-1001679_1280.jpg",
                    isRepImg: 1
                }
            ],
            member: {
                memberId: 1,
                nickname: "Phillip Chung",
                image: {
                    imageId: 1,
                    imgUrl: "https://velog.velcdn.com/images/wusi-hub/profile/19ef6227-58fe-47e7-a9d4-79a0e857079f/image.jpeg",
                    isRepImg: 1
                    }
            },
            comment: [
                {
                    commentId: 1,
                    content: "플랜트하이커 번창하세욤!",
                    createdAt: "2022-11-14",
                    modifiedAt: "2022-11-15",
                    isModified: 1,
                    isDeleted: 0,
                    depth: 2,
                    parent: 0,
                    member: {
                        memberId: 1,
                        nickname: "Phillip Jeong"
                    }
                }
            ]
          
        })
      )
    })
  };











