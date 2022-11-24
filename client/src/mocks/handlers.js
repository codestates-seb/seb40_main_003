import { rest } from "msw";
import {ProductDetailHandler,ProductListHandler} from "./productHandler"
import {CaringListHandler, expertProfileHandler, expertProfileDetail} from "./caringHandler"
import { CommunityListHandler,CommunityDetailHandler } from "./communityHandler"
import { Profile } from './profileHandler';
export const handlers = [
  // 로그인 테스트
  rest.post("https://testserver.com/auth/token", async (req, res, ctx) => {
    return res(ctx.status(200));
  }),
  // 기본형
  rest.post("https://testserver.com/login", async (req, res, ctx) => {
    return res(
      ctx.json({
        memberId: 1,
        image:
          "https://learnenglish.britishcouncil.org/sites/podcasts/files/2021-10/RS6715_492969113-hig.jpg",
        nickname: "준구짱",
        accessToken:"이거슨 토큰입니다abcd",
        refreshToken : "이거슨 리후레시 토큰입니다.abcd",
      })
    );
  }),
  rest.post("https://testserver.com/users/refresh", async (req, res, ctx) => {
    return res(
      ctx.json({
        accessToken:"이거슨 새로운 토큰입니다abcd",
        refreshToken : "이거슨 새로운 리후레시 토큰입니다.abcd",
      })
    );
  }),
  rest.post("https://testserver.com/logout", async (req, res, ctx) => {
    return res(ctx.status(200));
  }),
  // Handles a GET /user request

  ProductListHandler(1),
  ProductListHandler(2),
  ProductDetailHandler(1),
  ProductDetailHandler(2),
  ProductDetailHandler(3),

// 캐어링 핸들러
  CaringListHandler(),
  expertProfileDetail(1),
  expertProfileDetail(2),
  expertProfileDetail(3),


// 커뮤니티 핸들러
CommunityListHandler(),
CommunityDetailHandler(1),
CommunityDetailHandler(2),
CommunityDetailHandler(3),

// 일반 유저 프로필 핸들러
Profile(1),
Profile(2),
Profile(3),

];