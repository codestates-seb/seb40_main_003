type bambooTypes = 
    {
data:[
    {   communityId: number,
        title: string,
        content: string,
        view: number,
        createdAt: string,
        modifiedAt: string,
        commentNum: number,
        image: [
            {
                imageId: number,
                imgUrl: string,
                isRepImg: number
            }
        ],
        member: {
            memberId: number,
            nickname: string
        }}]
    }
  export type {bambooTypes}