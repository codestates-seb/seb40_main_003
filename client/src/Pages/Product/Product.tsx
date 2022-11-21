import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import ProductCard, {
  ProductPlaceHolder,
} from "../../Components/product/ProductCard";
import { ProductPreviewType } from "../../types/productTypes";
import { Link } from "react-router-dom";
import {
  MainCenterWrapper,
  MainContentContainer,
  MainRightWrapper,
  SectionWrapper
} from "../../Components/Wrapper";
import { SigButton } from "../../Components/GlobalComponents";
import usePageTitle from "../../Hooks/usePageTitle";

type elemMaps = [ProductPreviewType];

type ProductMainType = {
  data: elemMaps | undefined;
  hidingTime: boolean;
  isLoading: boolean;
};

export const ProductMain = ({
  isLoading,
  data,
  hidingTime,
}: ProductMainType) => {
  return !isLoading && data !== undefined ? (
    <MainContentContainer>
      <MainCenterWrapper>
        {data.map((e) => {
          return (
            <Link to={`/product/${e.dealId}`} key={e.dealId}>
              <ProductCard data={e} />
            </Link>
          );
        })}
      </MainCenterWrapper>
      <MainRightWrapper>
        <SectionWrapper borderNone={true}>
            <p className='h5 bold font-main mr-16'>애지중지 키운 식물을 우리 동네 식집사에게 분양하세요. 더 이상 쓰지 않는 원예 용품도 판매해보세요.🌿
            </p>
        </SectionWrapper>
        <span className="h4 bold"></span>
        <Link to={"/product/write"}>
          <SigButton type='submit'>새 글쓰기</SigButton>
        </Link>
      </MainRightWrapper>
    </MainContentContainer>
  ) : (
    <div className={hidingTime ? "display-none" : ""}>
      <ProductPlaceHolder />
      <ProductPlaceHolder />
      <ProductPlaceHolder />
    </div>
  );
};

const Product = () => {
  const [data, setData] = useState<elemMaps>();
  const [isLoading, setIsLoading] = useState(true);
  const [hidingTime, setHidingTime] = useState(true);
  // 초기 로딩
  usePageTitle("거래")
  useEffect(() => {
    setTimeout(() => {
      setHidingTime(false);
    }, 200);

    axios.get("/shopping").then(({ data }) => {
      setData(data.shopping);
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      <ProductMain data={data} hidingTime={hidingTime} isLoading={isLoading} />
    </>
  );
};

export default Product;
