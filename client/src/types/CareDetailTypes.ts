type CareDetailTypes = 
{
    expertProfileId: number,
    simpleContent: string,
    detailContent: string,
    useNum: number,
    price: string,
    address: string,
    extra: string,
    userLikeExpert: number,
    view: number,
    member: {
        memberId: number,
        image: {
                imageId: number,
                imgUrl: string,
                isRepImg: string
            },
        name: string, 
        age: number,
        gender: number
    },
    expertReview: [
        {
            expertReviewId: number,
            writer: {
                memberId: number,
                nickname: string
            },
            content: string
        }
    ],
    techTag:[
        {
            techTagId: number,
            techTagName: string
        }
    ],
    areaTag:[
        {
            areaTagId: number,
            areaTagName: string
        }
    ],
    plant:[
        {   
          plantId: number,
          plantType: string,
          name: string,
          year: number
        }
    ]}
; 
export type {CareDetailTypes}