import { useRecoilValue } from "recoil"
import { userState } from "../Recoil/atoms/user"

/**게시글 작성자 id를 인자로 받아서 게시글 작성자와 현재 로그인 유저의 id가 일치하는지를 리턴하는 함수 */
export const useIsAuthor = ()=>{
    const userInfo= useRecoilValue(userState)
    return (id:string|undefined|number)=>{return String(userInfo?.memberId)===String(id)}
}