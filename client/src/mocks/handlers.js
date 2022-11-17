import { rest } from "msw";
import {ProductDetailHandler,ProductListHandler} from "./productHandler"
import {CaringListHandler, profileExpertDetail, expertProfileDetail} from "./caringHandler"
import { BambooListHandler,BambooDetailHandler } from "./bambooHandler"
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
  expertProfileDetail(2),
  expertProfileDetail(3),
  profileExpertDetail(),


// 커뮤니티 핸들러
BambooListHandler(),
BambooDetailHandler(1),
BambooDetailHandler(2),
BambooDetailHandler(3),

];

  