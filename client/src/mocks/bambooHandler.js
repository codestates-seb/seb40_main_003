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
          }
        ]
      })
    )
  })
};