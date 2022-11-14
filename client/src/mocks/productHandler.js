import { rest } from "msw";

export const ProductDetailHandler = (pageNumber) => {
  return rest.get(
    `https://testserver.com/shopping/${pageNumber}`,
    async (req, res, ctx) => {
      return res(
        ctx.json({
          dealId: pageNumber,
          title: "예쁜 식물",
          view: 13,
          price: 5000,
          content: "예쁜 식물이 싸게싸게 나왔어요 여러분~",
          createdAt: "2022-11-08",
          modifiedAt: "2022-11-08",
          category: 1,
          state: 1,
          memberLikeDeal: 1,
          image: [
            {
              imageId: pageNumber,
              imgUrl: "https://picsum.photos/640/360",
              isRepImg: 1,
            },
            {
              imageId: pageNumber+1,
              imgUrl: "https://www.stevensegallery.com/640/360",
              isRepImg: 0,
            },
            {
              imageId: pageNumber+2,
              imgUrl: "https://placebear.com/640/360",
              isRepImg: 0,
            },
          ],
          areaTag: [
            {
              areaTagId: 1,
              areaTagName: "관악구",
            },
          ],
          member: {
            memberId: 1,
            nickname: "프로플하러",
            image: {
              imageId: 1,
              imgUrl: "https://www.stevensegallery.com/640/360​​",
              isRepImg: 0,
            },
          }
        })
      );
    }
  );
};

export const ProductListHandler = () => {
  return rest.get("https://testserver.com/shopping", async (req, res, ctx) => {
    return res(
      ctx.json({
        shopping: [
          {
            dealId: 1,
            title: "예쁜 식물",
            pictures: [
              { picture: "https://picsum.photos/640/360" },
              { picture: "https://www.stevensegallery.com/640/360​​" },
              { picture: "https://placebear.com/640/360" },
            ],
            createdAt: "2022-11-08",
            view: 13,
            like: 11,
            price: 5000,
            userInfo: {
              userId: 1,
              nickname: "junguZzang",
            },
            tag: 1,
          },
          {
            dealId: 2,
            title: "몬스테라 팔아요~",
            pictures: [
              { picture: "https://www.stevensegallery.com/640/360​​" },
              { picture: "https://picsum.photos/seed/picsum/200/300​" },
              { picture: "https://picsum.photos/seed/picsum/400/600​" },
            ],
            createdAt: "2022-11-07",
            view: 24,
            like: 1,
            price: 15000,
            userInfo: {
              userId: 2,
              nickname: "woosiZzang",
            },
            tag: 0,
          },
          {
            dealId: 3,
            title: "당근마켓 팔아요~",
            pictures: [
              { picture: "https://placebear.com/640/360" },
              { picture: "https://picsum.photos/seed/picsum/200/300​" },
              { picture: "https://picsum.photos/seed/picsum/400/600​" },
            ],
            createdAt: "2022-11-07",
            view: 33,
            like: 113,
            price: 20000,
            userInfo: {
              userId: 3,
              nickname: "sexyYunJeong",
            },
            tag: 2,
          },
        ],
      })
    );
  });
};
