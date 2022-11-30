import { confirmDelete } from "../Const/message";
import useAxiosPrivate from "./useAxiosPrivate";


/** url을 받아 게시물을 삭제하는 훅입니다 */
export const useDelete = (url:string) => {
    const axiosPrivate= useAxiosPrivate()
    const deleteItem = () => {    
        if (window.confirm(confirmDelete)) {
            axiosPrivate.delete(url).then((res)=>{
                alert("삭제되었습니다")
				window.location.reload()
            })
        }}
    return(deleteItem)
    }