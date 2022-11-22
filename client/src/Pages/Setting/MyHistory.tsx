import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import {
    MainCenterWrapper,
    MainContentContainer,
    MainRightWrapper,
    SectionWrapper,
} from "../../Components/Wrapper";
import { userState } from "../../Recoil/atoms/user";
import { ProductDetailType } from "../../types/productTypes";
import usePageTitle from "../../Hooks/usePageTitle";
import styled from "@emotion/styled";

const MyHistory = () => {
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
    usePageTitle("내 게시물")

    return !isLoading && data !== null ? (
        <MainContentContainer>
        <MainCenterWrapper>
        내 게시물
        </MainCenterWrapper>
        <MainRightWrapper>
        </MainRightWrapper>
        </MainContentContainer>
    ) : (
        <>loading...</>
    );
};

export default MyHistory;
