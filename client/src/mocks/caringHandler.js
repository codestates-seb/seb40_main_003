import { rest } from "msw";

export const CaringListHandler = (number) => {
  return rest.get(`https://testserver.com/experts?page=${number}&size=5`, async (req, res, ctx) => {
    return res(
      ctx.json(
        {
          data: [
            {
              view: 123,
              like: 56,
              expertProfileId: 1,
              simpleContent: "식물을 사랑하는 우리 동네 식물 전문가입니다~",
              address: "연남동",
              userLikeExpert: 1,
              member: {
                memberId: 1,
                image: {
                  imageId: 1,
                  imgUrl: "https://placebear.com/640/360",
                  isRepImg: 1,
                },
                name: "김고수",
                age: 25,
                gender: 1,
              },

              techTag: [
                {
                  techTagId: 1,
                  techTagName: "분갈이",
                },
                {
                  techTagId: 2,
                  techTagName: "병/해충",
                },
                {
                  techTagId: 3,
                  techTagName: "가지치기",
                },
                {
                  techTagId: 4,
                  techTagName: "화병관리",
                },
                {
                  techTagId: 5,
                  techTagName: "잎 솎기",
                },
                {
                  techTagId: 6,
                  techTagName: "물 주기",
                },                
                {
                  techTagId: 7,
                  techTagName: "잎 닦기",
                },                {
                  techTagId: 8,
                  techTagName: "수형관리",
                },
              ],

              areaTag: [
                {
                  areaTagId: 1,
                  ateaTagName: "마포구",
                },
              ],
            },
            {
              view: 123,
              like: 56,
              expertProfileId: 2,
              simpleContent: "식물을 사랑하는 우리 동네 식물 전문가입니다~",
              address: "연남동",
              userLikeExpert: 1,
              member: {
                memberId: 1,
                image: {
                  imageId: 1,
                  imgUrl: "https://placebear.com/640/360",
                  isRepImg: 1,
                },
                name: "박고수",
                age: 25,
                gender: 1,
              },

              techTag: [
                {
                  techTagId: 1,
                  techTagName: "분갈이",
                },
                {
                  techTagId: 2,
                  techTagName: "병/해충",
                },
                {
                  techTagId: 3,
                  techTagName: "가지치기",
                },
                {
                  techTagId: 4,
                  techTagName: "화병관리",
                },
                {
                  techTagId: 5,
                  techTagName: "잎 솎기",
                },
                {
                  techTagId: 6,
                  techTagName: "물 주기",
                },                
                {
                  techTagId: 7,
                  techTagName: "잎 닦기",
                },                {
                  techTagId: 8,
                  techTagName: "수형관리",
                },
              ],

              areaTag: [
                {
                  areaTagId: 1,
                  ateaTagName: "마포구",
                },
              ],
            },
            {
              view: 123,
              like: 56,
              expertProfileId: 3,
              simpleContent: "식물을 사랑하는 우리 동네 식물 전문가입니다~",
              address: "연남동",
              userLikeExpert: 1,
              member: {
                memberId: 1,
                image: {
                  imageId: 1,
                  imgUrl: "https://placebear.com/640/360",
                  isRepImg: 1,
                },
                name: "최고수",
                age: 25,
                gender: 1,
              },

              techTag: [
                {
                  techTagId: 1,
                  techTagName: "분갈이",
                },
                {
                  techTagId: 2,
                  techTagName: "병/해충",
                },
                {
                  techTagId: 3,
                  techTagName: "가지치기",
                },
                {
                  techTagId: 4,
                  techTagName: "화병관리",
                },
                {
                  techTagId: 5,
                  techTagName: "잎 솎기",
                },
                {
                  techTagId: 6,
                  techTagName: "물 주기",
                },                
                {
                  techTagId: 7,
                  techTagName: "잎 닦기",
                },                {
                  techTagId: 8,
                  techTagName: "수형관리",
                },
              ],

              areaTag: [
                {
                  areaTagId: 1,
                  ateaTagName: "마포구",
                },
              ],
            },
          ],
        },
      )
    );
  });
};

export const expertProfileHandler = () => {
return rest.post("https://testserver.com/experts", async (req, res, ctx) => {
  return res(
    ctx.json({
      name : "이름",
      age : "나이",
      gender : "성별",
      photo : "프로필사진",
      simpleCotent : "간단자기소개",
      detailContent : "상세자기소개",
      useNum : "고용수",
      price : "가격",
      extra : "추가사항",
      address : "주소",
      plant : [
          {
              plantId : "식물아이디",
              plantPhoto : "식물사진",
              plantName : "식물이름",
              plantType : "식물 종",
              plantAge : "년수"
          }
      ],
      expertReview : [
          {
              reviewId : "리뷰아이디",
              content : "리뷰내용",
              writerInfo : {
                  userId : "작성자아이디",
                  userNickname : "작성자닉네임",
                  createdAt: "작성날짜",
                  modifiedAt: "수정날짜"
              }
          }
      ],
      techTag : [
          {
              techId : "기술태그아이디",
              name : "기술태그내용"
          }
      ]
  }
    )
  );
});
}


export const expertProfileDetail = (profileNumber) => {
  return rest.get(
    `https://testserver.com/caring/${profileNumber}`,
    async (req, res, ctx) => {
      return res(
        ctx.json({
          expertProfileId: profileNumber,
          simpleContent: "식물을 사랑하는 우리 동네 식물 전문가입니다~",
          detailContent: "식물자원학과를 졸업하여 전문 지식이 풍부하답니다. 친절하게 이웃 분들의 소중한 반려식물들을 돌보겠습니다.",
          useNum: 20,
          price: "30분 9,000원 \n\r1시간 15,000원",
          address: "연남동",
          extra: "서비스별 추가비용 발생 \n약제 비용 별도 \n서비스 당 20% 할인",
          userLikeExpert: 1,
          view: 1,
          member: {
            memberId: 1,
            image: {
              imageId: 1,
              imgUrl: "https://placebear.com/640/360",
              isRepImg: "",
            },
            name: "김고수",
            age: 1,
            gender: 1,
          },
          expertReview: [
            {
              expertReviewId: 1,
              writer: {
                memberId: 1,
                nickname: "식물쪼아",
              },
              content: "고수님 최고예요^^",
            },
            {
              expertReviewId: 2,
              writer: {
                memberId: 2,
                nickname: "식물씨러",
              },
              content: "너무 친절하게 잘 설명해주시고 소중히 다뤄주셨어요. 짱짱!",
            },
            {
              expertReviewId: 3,
              writer: {
                memberId: 1,
                nickname: "식물노잼",
              },
              content: "너무 친절하게 잘 설명해주시고 소중히 다뤄주셨어요. 짱짱!",
            },
            
          ],
          techTag: [
            {
              techTagId: 1,
              techTagName: "분갈이",
            },            
            {
              techTagId: 2,
              techTagName: "병/해충",
            },            
            {
              techTagId: 3,
              techTagName: "가지치기",
            },            
            {
              techTagId: 4,
              techTagName: "수형관리",
            },
          ],
          areaTag: [
            {
              areaTagId: 1,
              areaTagName: "마포구",
            },
          ],
          plant: [
            {
              plantId: 1,
              plantType: "몬스테라",
              name: "몬식이",
              year: 137,
            },
            {
              plantId: 2,
              plantType: "율마",
              name: "율무차",
              year: 56,
            },
            {
              plantId: 3,
              plantType: "스투키",
              name: "통키",
              year: 7,
            },
          ],
        },
        )
      );
    }
  );
};
