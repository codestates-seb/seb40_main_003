import { rest } from "msw";


export const CaringListHandler = ()=>{
  return  rest.get("https://testserver.com/caring", async (req, res, ctx) => {
    return res(
      ctx.json({
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
                          isRepImg: 1
                      },
                  name: "김고수",
                  age: 25,
                  gender: 1
              },
              
              techTag:[
                {
                    techTagId: 1,
                    techTagName: "분갈이"
                },
                {
                  techTagId: 2,
                  techTagName: "물주기"
                },
                {
                  techTagId: 3,
                  techTagName: "병/해충"
                }
            ],
            
              areaTag:[
                  {
                      areaTagId: 1,
                      ateaTagName: "마포구"
                  }
              ]
          }
        ],
        
      },
      {
        data: [
          {
              expertProfileId: 1,
              simpleContent: "식물을 사랑하는 우리 동네 식물 전문가입니다~",
              address: "연남동",
              userLikeExpert: 1,
              member: {
                  memberId: 1,
                  image: {
                          imageId: 1,
                          imgUrl: "https://placebear.com/640/360",
                          isRepImg: 1
                      },
                  name: "김고수",
                  age: 25,
                  gender: 2
              },
              
              techTag:[
                {
                    techTagId: 1,
                    techTagName: "분갈이"
                },
                {
                  techTagId: 2,
                  techTagName: "물주기"
                },
                {
                  techTagId: 3,
                  techTagName: "병/해충"
                }
            ],
              areaTag:[
                  {
                      areaTagId: 1,
                      ateaTagName: "마포구"
                  }
              ]
          }
        ],
        
      },
      {
        data: [
          {
              expertProfileId: 1,
              simpleContent: "식물을 사랑하는 우리 동네 식물 전문가입니다~",
              address: "연남동",
              userLikeExpert: 1,
              member: {
                  memberId: 1,
                  image: {
                          imageId: 1,
                          imgUrl: "https://picsum.photos/seed/picsum/200/300",
                          isRepImg: 1
                      },
                  name: "김고수",
                  age: 25,
                  gender: 2
              },
              
              techTag:[
                {
                    techTagId: 1,
                    techTagName: "분갈이"
                },
                {
                  techTagId: 2,
                  techTagName: "물주기"
                },
                {
                  techTagId: 3,
                  techTagName: "병/해충"
                }
            ],
              areaTag:[
                  {
                      areaTagId: 1,
                      ateaTagName: "마포구"
                  }
              ]
          }
        ],
        
      }),
      );
    })
  
}