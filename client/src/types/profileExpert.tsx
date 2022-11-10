type profileExpert = 
  {
    dealId: number,
    name : string,
    age : number,
    gender : string,
    photo : [picture: string],
    simpleCotent : string,
    detailContent : string,
    useNum : number,
    price : number,
    extra : string,
    address : string,
    plant : [
        {
            plantId : number,
            plantPhoto : [picture: string],
            plantName : string,
            plantType : string,
            plantAge : number
        }
    ],
    expertReview : [
        {
            reviewId : number,
            content : string,
            writerInfo : {
                userId : number,
                userNickname : string
            }
        }
    ],
    techTag : [
        {
            techId : number,
            name : string
  }]
}
;
export type {profileExpert}