type bambooDetailTypes = 
{
  communityId: number,
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
      nickname: string,
      image: {
          imageId: number,
          imgUrl: string,
          isRepImg: number
          }
  },
  communityLike: [
      {
          likeId: number,
          member: [
              {
                  memberId: number
              }
          ],
          likeNum: number
      }
  ],
  comment: [
      {
          commentId: number,
          content: string,
          createdAt: string,
          modifiedAt: string,
          isModified: number,
          isDeleted: number,
          depth: number,
          parent: number,
          member: {
              memberId: number,
              nickname: string
          }
      }
  ]
}

export type {bambooDetailTypes};