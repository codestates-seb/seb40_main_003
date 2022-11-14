import { rest } from "msw";
import {ProductDetailHandler,ProductListHandler} from "./productHandler"
import {CaringListHandler, expertProfileDetail} from "./caringHandler"
import { BambooListHandler } from "./bambooHandler"
export const handlers = [
  // 로그인 테스트
  rest.post("https://testserver.com/auth/token", async (req, res, ctx) => {
    return res(ctx.status(200));
  }),
  // 기본형
  rest.post("https://testserver.com/login", async (req, res, ctx) => {
    return res(
      ctx.json({
        userId: 1,
        userImage:
          "https://learnenglish.britishcouncil.org/sites/podcasts/files/2021-10/RS6715_492969113-hig.jpg",
        userNickname: "준구짱",
      })
    );
  }),
  rest.post("https://testserver.com/logout", async (req, res, ctx) => {
    return res(ctx.status(200));
  }),
  // Handles a GET /user request

  ProductListHandler(),
  ProductDetailHandler(1),
  ProductDetailHandler(2),
  ProductDetailHandler(3),

// 캐어링 핸들러
  CaringListHandler(),
  expertProfileDetail(1),


// 커뮤니티 핸들러
BambooListHandler(),

  rest.get("https://testserver.com/profile-expert", async (req, res, ctx) => {
    return res(
      ctx.json(
        {
        name: "김고수",
        age: 25,
        gender: 2,
        photos: [
          {
            photo: "https://picsum.photos/seed/picsum/200/300​" },
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
        ],})
      
    );
  }),
];

  