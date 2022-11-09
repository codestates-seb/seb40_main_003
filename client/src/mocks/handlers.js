import { rest } from "msw";
export const handlers = [
  // 기본형
  rest.post("/login", async (req, res, ctx) => {
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
              {picture:"https://search.pstatic.net/common/?src=http%3A%2F%2Fshop1.phinf.naver.net%2F20220415_161%2F1650008062753a75gw_JPEG%2F51143890355561342_1063830887.jpg&type=a340​"},
              {picture:"https://picsum.photos/seed/picsum/200/300​"},
              {picture:"https://picsum.photos/seed/picsum/400/600​"},
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
            pictures:[
              {picture:"https://picsum.photos/seed/picsum/100/150​"},
              {picture:"https://picsum.photos/seed/picsum/200/300​"},
              {picture:"https://picsum.photos/seed/picsum/400/600​"},
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
            pictures:[
              {picture:"https://picsum.photos/seed/picsum/100/150​"},
              {picture:"https://picsum.photos/seed/picsum/200/300​"},
              {picture:"https://picsum.photos/seed/picsum/400/600​"},
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
  }),

  rest.get("https://testserver.com/shopping/1", async (req, res, ctx) => {
    return res(ctx.json(
      {
        dealId:1,
        title:"예쁜 식물",
        content:"예쁜 식물이 싸게싸게 나왔어요 여러분~",
        createdAt:"2022-11-08",
        view:13,
        price:5000,
        userInfo: {
              userId:1,
              nickname:"junguZzang"
              },
        "tag": 1
      }
    ));
  }),
  rest.get("https://testserver.com/caring", async (req, res, ctx) => {
    return res(ctx.json(
  {
    "name" : "이름",
    "age" : "나이",
    "gender" : "성별",
    "photo" : "프로필사진",
    "simpleCotent" : "간단자기소개",
    "detailContent" : "상세자기소개",
    "useNum" : "고용수",
    "price" : "가격",
    "extra" : "추가사항",
    "address" : "주소",
    "plant" : [
        {
            "plantId" : "식물아이디",
            "plantPhoto" : "식물사진",
            "plantName" : "식물이름",
            "plantType" : "식물 종",
            "plantAge" : "년수"
        }
    ],
    "expertReview" : [
        {
            "reviewId" : "리뷰아이디",
            "content" : "리뷰내용",
            "writerInfo" : {
                "userId" : "작성자아이디",
                "userNickname" : "작성자닉네임"
            }
        }
    ],
    "techTag" : [
        {
            "techId" : "기술태그아이디",
            "name" : "기술태그내용"
        }
      ]
    })
  )}
)];
