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

const ContentContainer = styled.div`
    
`

const ContentWrapper = styled.div`
    margin-left: 18px;
`

const Setting = () => {
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
    usePageTitle("설정")

    return !isLoading && data !== null ? (
        <MainContentContainer>
        <MainCenterWrapper>
            <ContentContainer>
                <SectionWrapper title="찜 목록">
                    <>
                    
                    </>
                </SectionWrapper>
            </ContentContainer>

            <ContentContainer>
                    <SectionWrapper title="내역">
                        <>
                        
                        </>
                    </SectionWrapper>
                <ContentWrapper>
                    <SectionWrapper>
                        <>
                        판매 내역(3)
                        </>
                    </SectionWrapper>
                    <SectionWrapper>
                        <>
                        구매 내역(3)
                        </>
                    </SectionWrapper>
                    <SectionWrapper>
                        <>
                        돌봄 기록(3)
                        </>
                    </SectionWrapper>
                    <SectionWrapper>
                        <>
                        내 게시물(3)
                        </>
                    </SectionWrapper>
                </ContentWrapper>
            </ContentContainer>
            <ContentContainer>
                    <SectionWrapper title="계정">
                        <>
                        
                        </>
                    </SectionWrapper>

                <ContentWrapper>
                    <SectionWrapper>
                        <>
                        회원 정보 수정(2)
                        </>
                    </SectionWrapper>
                    <SectionWrapper>
                        <>
                        로그아웃(1)
                        </>
                    </SectionWrapper>
                    <SectionWrapper>
                        <>
                        탈퇴하기(1)
                        </>
                    </SectionWrapper>
                </ContentWrapper>
            </ContentContainer>
        </MainCenterWrapper>
        <MainRightWrapper>
        </MainRightWrapper>
        </MainContentContainer>
    ) : (
        <>loading...</>
    );
};

export default Setting;
