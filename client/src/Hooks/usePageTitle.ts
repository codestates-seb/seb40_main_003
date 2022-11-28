import {useEffect} from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil';
import { currentPage } from '../Recoil/atoms/currentPage';

/**상단 헤더에 페이지 이름을 바꿔주는 훅 */
const usePageTitle=(pageName:string)=>{
  const setTitle = useSetRecoilState(currentPage);
  useEffect(() => {
    setTitle({title:pageName})
    }, [pageName]);
}

export default usePageTitle