type caringTypes = 
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
                    isRepImg: number
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

export type {caringTypes}