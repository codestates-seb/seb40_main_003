import {
  MainCenterWrapper,
  MainContentContainer,
  MainRightWrapper,
  SectionWrapper
} from "../../Components/Wrapper";
import ProductCard from "../../Components/product/ProductCard";
import { ProductPreviewMappingType } from "../../types/productTypes";
import { Link } from "react-router-dom";
import { SigButton } from "../../Components/GlobalComponents";
import  usePageTitle  from "../../Hooks/usePageTitle";
import { FetchByParams } from "../../Hooks/useFetch";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { ErrorMessage } from "../../Components/ErrorHandle";
import { LoadingSkeleton } from "../../Components/Loading";
import { ErrorBoundary } from "react-error-boundary";

// 쿼리클라이언트
const productQueryClient = new QueryClient();

export const ProductMain = () => {
  const { data, isLoading, error,isSuccess } = useQuery(["productQuery"], () => {
    const data = FetchByParams("/deal", { page: 1, size: 5 });
    return data;
    
  });
  if (isLoading) return <LoadingSkeleton />;
  if (error) return <ErrorMessage content="컨텐츠를 불러오지 못했습니다" />;
  if(isSuccess) console.log(data.data.data);
  

  return (
    <>
      {data &&
        data.data.data.map((e: ProductPreviewMappingType) => {
          return (
            <Link key={e.dealId} to={`/product/${e.dealId}`}>
              <ProductCard data={e} />
            </Link>
          );
        })}
    </>
  );
};
const SalesHistory = () => {
  usePageTitle("판매 내역");
  return (
    <MainContentContainer>
      <MainCenterWrapper>
        {/* 쿼리클라이언트로 감쌈 */}
        <ErrorBoundary
          fallback={<ErrorMessage content={"정보를 불러오는데 실패했습니다"} />}
        >
          <QueryClientProvider client={productQueryClient}>
            <ProductMain />
          </QueryClientProvider>
        </ErrorBoundary>
        {/* 쿼리클라이언트로 감쌈 */}
      </MainCenterWrapper>
      <MainRightWrapper>
        <SectionWrapper borderNone={true}>
          <p className="h5 bold font-main mr-16">
            내가 판매한 물품의 거래 글입니다.
          </p>
        </SectionWrapper>

      </MainRightWrapper>
    </MainContentContainer>
  )
};

export default SalesHistory;
