import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import ProductCard from "../Components/ProductCard";
import { ProductPreviewType } from "../types/productTypes";
import { SigButton } from '../Components/GlobalComponents';

type elemMaps = [ProductPreviewType];

const Product = () => {
  const [data, setData] = useState<elemMaps>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get("https://testserver.com/shopping").then(({ data }) => {
      console.log(data.shopping);
      setData(data.shopping);
      setIsLoading(false);
    });
  }, []);

  return !isLoading && data !== undefined ? (
    <>
      {`날라온 데이타 : ${data[0].title}`}
      {data.map((e) => {
        console.log(e.title)
        return <ProductCard key={e.dealId} data={e} />
      })}
      <input type="text" />
      <SigButton>버튼</SigButton>
      <SigButton className="disable">버튼</SigButton>
      <SigButton className="ghost">버튼</SigButton>
      
    </>
  ) : (
    <>loading...</>
  );
};

export default Product;
