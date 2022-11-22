import {useEffect} from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil';
import { currentPage } from '../Recoil/atoms/currentPage';


function usePageTitle(pageName:string) {
  const setTitle = useSetRecoilState(currentPage);
  useEffect(() => {
    setTitle({title:pageName})
    }, []);
}

export default usePageTitle