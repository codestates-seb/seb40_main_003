
import {useQuery} from 'react-query'
import { FetchByParams } from './useFetch';
import { LoadingSpinner } from '../Components/Loading';
import { ErrorMessage } from '../Components/ErrorHandle';


export const UseReactQuery = (
  url: string,
  parpams: object,
  children: JSX.Element
) => {
  const { data, isLoading, error } = useQuery([url], () => {
    const data = FetchByParams(url, { parpams });
    return data;
  });
  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage content="컨텐츠를 불러오지 못했습니다" />;
  return <>{children}</>;
};
