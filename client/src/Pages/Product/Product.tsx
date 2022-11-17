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
} from "../../Components/Wrapper";
import { SigButton } from "../../Components/GlobalComponents";

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
        <span className="h4 bold"></span>
        <SigButton>새글 쓰기</SigButton>
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
