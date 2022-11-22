import { rest } from "msw";

export const ProductDetailHandler = (pageNumber) => {
  return rest.get(
    `https://testserver.com/shopping/${pageNumber}`,
    async (req, res, ctx) => {
      return res(
        ctx.json({
          dealId: pageNumber,
          title: "예쁜 식물 초저가로 판매합니다 이정도면 떨이에요",
          view: 13,
          price: 5000,
          content: "할지라도 소담스러운 따뜻한 철환하였는가? 가치를 끓는 할지니, 열락의 힘있다. 낙원을 가는 풍부하게 싹이 쓸쓸한 품에 이상을 칼이다. 영원히 것이 눈에 들어 실현에 없으면, 그들은 이것이야말로 살았으며, 사막이다. 생의 피고 있음으로써 우리 않는 목숨이 일월과 피가 동산에는 약동하다. 이는 만천하의 공자는 그와 아니더면, 튼튼하며, 넣는 위하여서. 같이, 물방아 미묘한 굳세게 얼마나 이상의 심장의 듣는다. 청춘의 노래하며 노년에게서 이상은 평화스러운 가진 약동하다. 영원히 대고, 살았으며, 사랑의 영락과 설레는 불러 것이다. 피가 있는 피가 그들은 꽃이 얼마나 무엇을 같지 철환하였는가? 뜨거운지라, 이것이야말로 넣는 부패를 심장의 뜨고, 타오르고 속잎나고, 황금시대다. 힘차게 있을 이는 것은 이성은 같이, 사막이다. 그들은 몸이 굳세게 원질이 이상의 가슴에 구할 자신과 인간의 봄바람이다. 우리의 크고 찾아다녀도, 가치를 이상의 능히 주는 이것이다. 힘차게 피에 바이며, 심장은 풍부하게 돋고, 없는 청춘 황금시대다. 우리 바이며, 물방아 위하여, 사랑의 든 이상을 생의 그리하였는가? 할지라도 이 오아이스도 끓는 공자는 것이다. 공자는 보이는 살 것이다. 품에 있는 대한 얼음과 곳이 사는가 찾아다녀도, 것이다. 뜨거운지라, 얼마나 인생에 것은 인생을 예가 넣는 할지라도 위하여서. 용감하고 청춘의 같은 사막이다. 품에 예가 살 주는 심장의 영원히 교향악이다. 반짝이는 같은 이는 청춘을 새가 같이 위하여, 발휘하기 산야에 위하여서. 가는 때까지 소금이라 기관과 역사를 같은 방황하였으며, 칼이다. 고행을 위하여 지혜는 생의 소금이라 미인을 구할 장식하는 약동하다. 풍부하게 얼마나 품에 시들어 그들은 것이다. 있음으로써 같이 귀는 커다란 것이다. 청춘이 꽃이 지혜는 그들의 칼이다. 뼈 살 얼마나 공자는 인간에 곳으로 얼음에 눈이 말이다. 실로 거선의 가치를 철환하였는가? 굳세게 자신과 인생을 가진 무엇을 철환하였는가? 얼마나 타오르고 이성은 커다란 대한 가슴이 쓸쓸하랴?",
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
            modifiedAt: "2022-11-08",
            state:0,
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
            modifiedAt: "2022-11-08",
            state:2,
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
            modifiedAt: "2022-11-08",
            state:1,
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