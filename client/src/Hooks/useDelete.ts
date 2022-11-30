import { confirmDelete } from "../Const/message";
import useAxiosPrivate from "./useAxiosPrivate";


/** 로그아웃을 하는 함수를 반환하는 훅입니다. (accessToken, refreshToken, recoil의 userInfo를 삭제합니다.) */
export const useDelete = (url:string) => {
    const axiosPrivate= useAxiosPrivate()
	const deleteItem = () => {	
		if (window.confirm(confirmDelete)) {
            axiosPrivate.delete(url).then((res)=>{
                alert("삭제되었습니다")
            })
		}}
	return(deleteItem)
	}