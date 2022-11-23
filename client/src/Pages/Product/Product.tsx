import ProductCard from "../../Components/product/ProductCard";
import {
  ProductPreviewMappingType,
} from "../../types/productTypes";
import { Link } from "react-router-dom";
import {
  MainCenterWrapper,
  MainContentContainer,
  MainRightWrapper,
  SectionWrapper,
} from "../../Components/Wrapper";
import { SigButton } from "../../Components/GlobalComponents";
import usePageTitle from "../../Hooks/usePageTitle";
import { FetchByParams } from "../../Hooks/useFetch";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";

import { ErrorMessage } from "../../Components/ErrorHandle";
import { LoadingSkeleton } from "../../Components/Loading";


// 쿼리클라이언트
const productQueryClient = new QueryClient();

const ProductMain = () => {
  const { data, isLoading, error } = useQuery(
    ["productQuery"],
    () => {
      const data = FetchByParams("/deal", { page: 1, size: 5 });
      return data;
    }
  );
  if (isLoading) return <LoadingSkeleton/>;
  if (error) return <ErrorMessage content="컨텐츠를 불러오지 못했습니다" />;
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



// 전체 페이지
const Product = () => {
  usePageTitle("거래");
  return (
    <MainContentContainer>
      <MainCenterWrapper>
        {/* 쿼리클라이언트로 감쌈 */}
        <QueryClientProvider client={productQueryClient}>
          <ProductMain />
        </QueryClientProvider>
        {/* 쿼리클라이언트로 감쌈 */}
      </MainCenterWrapper>
      <MainRightWrapper>
        <SectionWrapper borderNone={true}>
          <p className="h5 bold font-main mr-16">
            반려식물을 분양하고 원예 용품을 판매해보세요.🌿
          </p>
        </SectionWrapper>
        <span className="h4 bold"></span>
        <Link to={"/product/write"}>
          <SigButton type="submit">새 글쓰기</SigButton>
        </Link>
        <Link to={"/product/category"}>
          <SigButton>거래 카테고리</SigButton>
        </Link>
      </MainRightWrapper>
    </MainContentContainer>
  );
};

export default Product;
