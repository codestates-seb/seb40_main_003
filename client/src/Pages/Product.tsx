import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import ProductCard from "../Components/product/ProductCard";
import { ProductPreviewType } from "../types/productTypes";

type elemMaps = [ProductPreviewType];

const Product = () => {
  const [data, setData] = useState<elemMaps>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get("https://testserver.com/shopping")
    .then(({ data }) => {
      setData(data.shopping);
      setIsLoading(false);
    });
  }, []);

  return !isLoading && data !== undefined ? (
    <>
      {data.map((e) => {
        return <ProductCard key={e.dealId} data={e} />
      })}
    </>
  ) : (
    <>loading...</>
  );
};

export default Product;
