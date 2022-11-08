import { rest } from "msw";
export const handlers = [
  // 기본형
  rest.post("/login", async (res, req, ctx) => {
    return res(ctx.json("뱉어줄정보들!"));
  }),

  // Handles a GET /user request
  rest.get("https://testserver.com/shopping", async (req, res, ctx) => {
    return res(
      ctx.json({
        shopping: [
          {
            dealId: 1,
            title: "예쁜 식물",
            pictures:[
              {picture:"https://picsum.photos/200/300​"},
              {picture:"https://picsum.photos/seed/picsum/200/300​"},
              {picture:"https://picsum.photos/seed/picsum/400/600​"},
            ],
            createdAt: "2022-11-08",
            view: 13,
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
            pictures:[
              {picture:"https://picsum.photos/seed/picsum/100/150​"},
              {picture:"https://picsum.photos/seed/picsum/200/300​"},
              {picture:"https://picsum.photos/seed/picsum/400/600​"},
            ],
            createdAt: "2022-11-07",
            view: 24,
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
            pictures:[
              {picture:"https://picsum.photos/seed/picsum/100/150​"},
              {picture:"https://picsum.photos/seed/picsum/200/300​"},
              {picture:"https://picsum.photos/seed/picsum/400/600​"},
            ],
            createdAt: "2022-11-07",
            view: 33,
            price: 20000,
            userInfo: {
              userId: 3,
              nickname: "sexyYounJeong",
            },
            tag: 2,
          },
        ],
      })
    );
  }),
];
