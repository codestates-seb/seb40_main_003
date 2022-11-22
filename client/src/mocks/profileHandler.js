import { rest } from "msw";

export const Profile = (profileNumber) => {
  return rest.get(
    `https://testserver.com/profile/${profileNumber}`,
    async (req, res, ctx) => {
      return res(
        ctx.json({
          nickname: "정필립",
          photo: "https://cdn.discordapp.com/attachments/1032514339682402359/1040540658865291316/DSC_2737.JPG",
          content: "안녕하세요! 식물을 너무 사랑하는 전교수님입니다. 저는 현재 청와대에서 살고 있습니다.",
          address: "평창동",
          plant: [
            {
              plantId: 1,
              plantPhoto: "https://cdn.pixabay.com/photo/2019/05/28/23/40/foxtail-barley-4236373_1280.jpg",
              plantName: "정폭스",
              plantType: "여우꼬리 보리",
              plantAge: 3,
            },
            {
              plantId: 2,
              plantPhoto: "https://cdn.pixabay.com/photo/2016/08/28/23/24/sunflower-1627193_1280.jpg",
              plantName: "태양",
              plantType: "해바라기",
              plantAge: 4,
            },
            {
              plantId: 3,
              plantPhoto: "https://cdn.pixabay.com/photo/2018/06/12/19/35/daisy-3471286_1280.jpg",
              plantName: "소이지",
              plantType: "데이지",
              plantAge: 5,
            },
          ],
          dealReview: [
            {
              reviewId: "wkd9390",
              content: "너무 친절하게 잘 설명해주시고 소중히 다뤄주셨어요. 짱짱!",
              writerInfo: {
                userId: "skem9403",
                nickname: "저녁노을",
              },
            },
          ],
          deal: [
            {
              dealId: "seg234",
              dealName: "쿨거래 감사합니다.",
              dealPhoto: "https://cdn.pixabay.com/photo/2016/02/10/21/57/heart-1192662_1280.jpg",
              likeNum: 11,
              view: 22,
              price: 9000,
              status: "BEST",
              createdAt: "2022-11-12",
            },
          ],
        })
      );
    }
  );
};
