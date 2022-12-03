import { useQuery } from "react-query";
import { FetchByParams, FetchByParamsType } from "./useFetch";
import { LoadingSpinner } from "../Components/Loading";
import { ErrorMessage } from "../Components/ErrorHandle";
import { cannotLoad } from "../Const/message";
import useAxiosPrivate from "./useAxiosPrivate";

export const UseReactQuery = (
  url: string,
  params: FetchByParamsType
  // children: JSX.Element
) => {
  const { data, isLoading, error } = useQuery([url], () => {
    const data = FetchByParams(url, params);
    return data;
  });
  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage content={cannotLoad} />;
  // return <>{children}</>;
};

export const UseReactQueryPrivate = (
  url: string,
  // children: JSX.Element
) => {
  const axiosPrivate = useAxiosPrivate();
  const { data, isLoading, error } = useQuery([url], () => {
    const data = axiosPrivate(url);
    return data;
  });
  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage content={cannotLoad} />;
  // return <>{children}</>;
};
