type bambooTypes = 
{
data: [
    {
        expertProfileId: number,
        simpleContent: string,
        address: string,
        userLikeExpert: number,
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
        
        techTag:[
            {
                techTagId: number,
                techTagName: string
            }
        ],
        areaTag:[
            {
                areaTagId: number,
                ateaTagName: string
            }
        ]
    }
  ]
}
  export type {bambooTypes}