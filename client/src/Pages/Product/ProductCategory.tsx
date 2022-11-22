import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import {
    ProfileCard,
    SigButton,
    ViewCounter,
    CategoryButton,
    CategoryWrapper
} from "../../Components/GlobalComponents";
import {
    MainCenterWrapper,
    MainContentContainer,
    MainRightWrapper,
} from "../../Components/Wrapper";
import { userState } from "../../Recoil/atoms/user";
import { ProductDetailType } from "../../types/productTypes";
import usePageTitle from "../../Hooks/usePageTitle";
import styled from "@emotion/styled";


const ProductCategory = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState<ProductDetailType | null>(null);
    const { id } = useParams();
    const isLogin = useRecoilValue(userState);

    useEffect(() => {
        try {
        axios.get(`/shopping/`).then((res) => {
            setData(res.data);
            setIsLoading(false);
        });
        } catch (err) {
        console.log(err);
        }
    }, []);
    usePageTitle("거래 카테고리")

    return !isLoading && data !== null ? (
        <MainContentContainer>
        <MainCenterWrapper>
            <CategoryWrapper>
                <CategoryButton className="ghost">
                    <img src=""></img>
                </CategoryButton>
                <CategoryButton className="ghost">
                    <img src=""></img>
                </CategoryButton>
                <CategoryButton className="ghost">
                    <img src=""></img>
                </CategoryButton>
                <CategoryButton className="ghost">
                    <img src=""></img>
                </CategoryButton>
            </CategoryWrapper>
        </MainCenterWrapper>

        <MainRightWrapper>
        </MainRightWrapper>
        </MainContentContainer>
    ) : (
        <>loading...</>
    );
};

export default ProductCategory;
