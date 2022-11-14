import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import ProductCard, {
  ProductPlaceHolder,
} from "../Components/product/ProductCard";
import { ProductPreviewType } from "../types/productTypes";
import { Link } from "react-router-dom";

type elemMaps = [ProductPreviewType];

const Product = () => {
  const [data, setData] = useState<elemMaps>();
  const [isLoading, setIsLoading] = useState(true);
  const [hidingTime, setHidingTime] = useState(true);

  useEffect(() => {
    setTimeout(() =>{setHidingTime(false)},200)
    axios.get("/shopping").then(({ data }) => {
      setData(data.shopping);
      setIsLoading(false);
    });
  }, []);

  return !isLoading && data !== undefined ? (
    <>
      {data.map((e) => {
        return <Link to={`/product/${e.dealId}`}><ProductCard key={e.dealId} data={e} /></Link>;
      })}
    </>
  ) : (
    <div className={hidingTime ?"display-none":""}>
      <ProductPlaceHolder />
      <ProductPlaceHolder />
      <ProductPlaceHolder />
    </div>
  );
};

export default Product;
