import React from 'react';
import { FieldErrors, useForm } from "react-hook-form";
import { SigButton } from '../../Components/GlobalComponents';
import { MainContentContainer, MainCenterWrapper, MainRightWrapper, SectionWrapper } from "../../Components/Wrapper";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import usePageTitle from '../../Hooks/usePageTitle'

const ConfirmWrapper = styled.span`
    display: flex;
    justify-content: row;
`

type Props = {}

interface ProductReviewEditorForm {
    content: string;
    errors?: string;
}

const ProductReviewEditor = (props: Props) => {
    const { register, handleSubmit, formState: { errors },
    } = useForm<ProductReviewEditorForm>();

    const onValid = (data: ProductReviewEditorForm) => {
        console.log("나 발리드됨")
    }
    const onInValid = (errors: FieldErrors) => {
    };
    usePageTitle("거래 후기 글 쓰기")

    console.log(errors);

    // console.log(register("name"));
    // console.log(watch());

    return (
        <MainContentContainer>
            <MainCenterWrapper>
                <section onSubmit={handleSubmit(onValid, onInValid)}>

                    <SectionWrapper>
                        <>
                            거래글
                        </>
                    </SectionWrapper>

                    <SectionWrapper width={100} borderNone={true}>
                        <>
                            <textarea className='content' {...register("content", {
                                required: "",
                            })}
                                placeholder="글쓰기"
                            />
                            <p className='font-alert-red sub'>{errors.content?.message}</p>
                        </>
                    </SectionWrapper>

                    <ConfirmWrapper>
                        <input type="checkbox" className='border-none checkbox-20'></input>
                        <p className='sub font-gray'>식물처럼 싱그럽고 예쁜 말을 써주세요.
                            <br />욕설이나 선동성 글과 같은 부적절한 내용은 삭제 처리될 수 있습니다.</p>
                    </ConfirmWrapper>
                </section>
            </MainCenterWrapper>
            <MainRightWrapper>
                <SectionWrapper borderNone={true}>
                    <p className='h5 bold font-main mr-16'>
                    </p></SectionWrapper>
                <Link to={"/talk"}>
                    <SigButton type='submit' className='disable'>후기 작성 완료</SigButton>
                </Link>
            </MainRightWrapper>


        </MainContentContainer>
    )

}

export default ProductReviewEditor;