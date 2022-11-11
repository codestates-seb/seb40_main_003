import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProductDetailType } from "../../types/productTypes";


const ProductDetail = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<ProductDetailType | null>(null);
  const { id } = useParams();

  useEffect(() => {
    try {
      axios.get(`/shopping/${id}`).then((res) => {
        setData(res.data);
        setIsLoading(false);
      });
    } catch (err) {
      console.log(err);
    }
  });

  return !isLoading && data !== null ? (
    <>
        {data.dealId}
    </>
  ) : (
    <>loading...</>
  );
};

export default ProductDetail;
