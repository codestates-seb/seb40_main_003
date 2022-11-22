import { rest } from "msw";

export const CommunityListHandler = () => {
  return rest.get("https://testserver.com/community", async (req, res, ctx) => {
    return res(
      ctx.json({
        data: [
          {
            communityId: 1,
            title: "우리 식물 좀 보세요! 얼마나 이쁘게요🤍",
            content:
              "이번에 갑조네에서 아스파라거스를 샀는데요 너무 예쁘지않나요?? 여러분들은 어떤 식물을 키우시나요?",
            view: 22,
            createdAt: "2022-11-14",
            modifiedAt: "2022-11-15",
            commentNum: 1,
            likes: 1,
            image: [
              {
                imageId: 1,
                imgUrl: "https://placebear.com/640/360",
                isRepImg: 1,
              },
            ],
            member: {
              memberId: 1,
              nickname: "Jane Woo",
            },
          },
          {
            communityId: 2,
            title: "우리 식물이 오늘 하늘나라로 갔어요 ㅠ^ㅠ",
            content:
              "제가 13년동안 키우던 식물이 오늘 ㅠㅠㅠㅠ 세상을 떠났습니다.. 제가 잘 못 키운 탓일까요 괜히 마음이 아프네요 안그래도 식물 죽여먹기로 유명한 전데 이번에는 마음이 좀 아프네요ㅠ",
            view: 20,
            createdAt: "2022-11-14",
            modifiedAt: "2022-11-15",
            commentNum: 2,
            likes: 2,
            image: [],
            member: {
              memberId: 2,
              nickname: "Jane Woo",
            },
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
                imgUrl:
                  "https://cdn.mhns.co.kr/news/photo/202102/427833_564830_06.jpg",
                isRepImg: 3,
              },
            ],
            member: {
              memberId: 3,
              nickname: "Jane Woo",
            },
          },
        ],
      })
    );
  });
};

export const CommunityDetailHandler = (pageNumber) => {
  return rest.get(
    `https://testserver.com/community/${pageNumber}`,
    async (req, res, ctx) => {
      return res(
        ctx.json({
          communityId: pageNumber,
          title: "우리 식물 좀 보세요! 얼마나 이쁘게요🤍",
          content:
            "할지라도 소담스러운 따뜻한 철환하였는가? 가치를 끓는 할지니, 열락의 힘있다.",
          view: 11,
          createdAt: "2022-11-14",
          modifiedAt: "2022-11-15",
          commentNum: 1,
          likeNum: 16,
          image: [
            {
              imageId: 1,
              imgUrl:
                "https://cdn.pixabay.com/photo/2015/10/22/17/45/leaf-1001679_1280.jpg",
              isRepImg: 1,
            },
          ],
          member: {
            memberId: 1,
            nickname: "나태주",
            image: {
              imageId: 1,
              imgUrl:
                "https://cdn.discordapp.com/attachments/1032514339682402359/1040541403249397860/DSC_3003.JPG",
              isRepImg: 1,
            },
          },
          comment: [
            {
              commentId: 1,
              content: "좋은 서비스를 저렴한 가격에 제공해주셨어요!",
              createdAt: "2022-11-14",
              modifiedAt: "2022-11-15",
              isModified: 1,
              isDeleted: 0,
              depth: 2,
              parent: 0,
              member: {
                memberId: 1,
                nickname: "전교수님",
                image: {
                  imageId: "sdf2344",
                  imgUrl:
                    "https://cdn.discordapp.com/attachments/1032514339682402359/1040541403249397860/DSC_3003.JPG",
                  isRepImg: 1,
                },
              },
            },
          ],
        })
      );
    }
  );
};
