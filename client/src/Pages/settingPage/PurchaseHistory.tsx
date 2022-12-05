import {
  MainCenterWrapper,
  MainContentContainer,
  MainRightWrapper,
  SectionWrapper
} from "../../Components/Wrapper";
import ProductCard from "../../Components/product/ProductCard";
import { Link } from "react-router-dom";
import  usePageTitle  from "../../Hooks/usePageTitle";
import { FetchByParams } from "../../Hooks/useFetch";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { ErrorMessage } from "../../Components/ErrorHandle";
import { LoadingSkeleton } from "../../Components/Loading";
import { ErrorBoundary } from "react-error-boundary";
import { ProfileDealType } from "../../types/profileType";
import { cannotLoad } from "../../Const/message";

// 쿼리클라이언트
const purchaseHistoryQueryClient = new QueryClient();

export const PurchaseHistoryMain = () => {
  const { data, isLoading, error,isSuccess } = useQuery(["purchaseHistoryQuery"], () => {
    const data = FetchByParams("/deal/success", { page: 1, size: 5 });
    return data;
    
  });
  if (isLoading) return <LoadingSkeleton />;
  if (error) return <ErrorMessage content={cannotLoad} />;

  return (
    <>
      {data &&
        data.data.data.map((e: ProfileDealType) => {
          return (
            <Link key={e.dealId} to={`/product/${e.dealId}`}>
              <ProductCard data={e} />
            </Link>
          );
        })}
    </>
  );
};
const PurchaseHistory = () => {
  usePageTitle("구매 내역");
  return (
    <MainContentContainer>
      <MainCenterWrapper>
        {/* 쿼리클라이언트로 감쌈 */}
        <ErrorBoundary
          fallback={<ErrorMessage content={cannotLoad} />}
        >
          <QueryClientProvider client={purchaseHistoryQueryClient}>
            <PurchaseHistoryMain />
          </QueryClientProvider>
        </ErrorBoundary>
        {/* 쿼리클라이언트로 감쌈 */}
      </MainCenterWrapper>
      <MainRightWrapper>
        <SectionWrapper borderNone={true}>
          <p className="h5 bold font-main mr-16">
            내가 구매한 물품의 거래 글입니다.
          </p>
        </SectionWrapper>
      </MainRightWrapper>
    </MainContentContainer>
  )
};

export default PurchaseHistory;
