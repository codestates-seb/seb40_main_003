import { rest } from "msw";
export const handlers = [
  // 로그인 테스트
  rest.post("https://testserver.com/auth/token", async (req, res, ctx) => {
    return res(ctx.status(200));
  }),
  // 기본형
  rest.post("https://testserver.com/login", async (req, res, ctx) => {
      return res(
        ctx.json({ userId: 1, userImage: null, userNickname: "준구짱" })
      );
  }),
  rest.post("https://testserver.com/logout", async (req, res, ctx) => {
    return res(ctx.status(200));
  }),
  // Handles a GET /user request
  rest.get("https://testserver.com/shopping", async (req, res, ctx) => {
    return res(
      ctx.json({
        shopping: [
          {
            dealId: 1,
            title: "예쁜 식물",
            pictures: [
              {
                picture:
                  "https://search.pstatic.net/common/?src=http%3A%2F%2Fshop1.phinf.naver.net%2F20220415_161%2F1650008062753a75gw_JPEG%2F51143890355561342_1063830887.jpg&type=a340​",
              },
              { picture: "https://picsum.photos/seed/picsum/200/300​" },
              { picture: "https://picsum.photos/seed/picsum/400/600​" },
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
              { picture: "https://picsum.photos/seed/picsum/100/150​" },
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
              { picture: "https://picsum.photos/seed/picsum/100/150​" },
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
  }),

  rest.get("https://testserver.com/shopping/1", async (req, res, ctx) => {
    return res(
      ctx.json({
        dealId: 1,
        title: "예쁜 식물",
        content: "예쁜 식물이 싸게싸게 나왔어요 여러분~",
        createdAt: "2022-11-08",
        view: 13,
        price: 5000,
        userInfo: {
          userId: 1,
          nickname: "junguZzang",
        },
        tag: 1,
      })
    );
  }),
  rest.get("https://testserver.com/caring", async (req, res, ctx) => {
    return res(
      ctx.json({
        
        name: "김고수",
        age: 25,
        gender: "여",
        photos: [
          { photo: "https://picsum.photos/seed/picsum/100/150​" },
          { photo: "https://picsum.photos/seed/picsum/200/300​" },
          { photo: "https://picsum.photos/seed/picsum/400/600​" },
        ],
        simpleCotent: "식물을 사랑하는 우리 동네 식물 전문가입니다~",
        detailContent:
          "식물자원학과를 졸업하여 전문 지식이 풍부하답니다. 친절하게 이웃 분들의 소중한 반려식물들을 돌보겠습니다.",
        useNum: 37,
        price: "기본 요금 30분: 9,000원 1시간 15,000원",
        extra: "서비스 1개 추가 시 20%씩 할인",
        address: "연남동",
        plant: [
          {
            plantId: "식물아이디",
            plantPhoto: "식물사진",
            plantName: "율무차",
            plantType: "율마",
            plantAge: "3년차",
          },
        ],
        expertReview: [
          {
            reviewId: "리뷰아이디",
            content: "너무 친절하게 잘 설명해주시고 소중히 다뤄주셨어요. 짱짱!",
            writerInfo: {
              userId: "작성자아이디",
              userNickname: "초보집사",
            },
          },
        ],
        techTag: [
          {
            techId: "기술태그아이디",
            name: "분갈이",
          },
        ],
      })
    );
  }),
];
