import React from 'react';
import { FieldErrors, useForm } from "react-hook-form";
import { SigButton } from '../../Components/GlobalComponents';
import { MainContentContainer, MainCenterWrapper, MainRightWrapper, SectionWrapper } from "../../Components/Wrapper";
import { Link } from "react-router-dom";

type Props = {}

interface BambooEditorForm {
    title: string;
    content: string;
    email: string;
    password: string;
    errors?: string;
}

const BambooEditor = (props: Props) => {
    const { register, handleSubmit, formState: { errors },
    } = useForm<BambooEditorForm>();

    const onValid = (data: BambooEditorForm) => {
        console.log("나 발리드됨")
    }
    const onInValid = (errors: FieldErrors) => {
    };

    console.log(errors);

    // console.log(register("name"));
    // console.log(watch());

    return (
        <MainContentContainer>
            <MainCenterWrapper>
                <section onSubmit={handleSubmit(onValid, onInValid)}>

                    <SectionWrapper width={100} borderNone={true}>
                        <>
                            <input className='title'
                                {...register("title", {
                                    required: "",
                                    minLength: {
                                        message: "제목은 2글자 이상으로 작성해주세요.",
                                        value: 2
                                    },
                                    maxLength: {
                                        message: "제목",
                                        value: 30
                                    }
                                })}
                                type="Text"
                                placeholder="제목"
                            />
                            <p className='font-alert-red sub'>{errors.title?.message}</p>
                        </>
                    </SectionWrapper>

                    <SectionWrapper width={100} borderNone={true}>
                        <>
                            <input className='content' {...register("content", {
                                required: "",
                            })}
                                type="content"
                                placeholder="귀여운 반려식물을 자랑하거나, 우리 동네의 숨겨진 식물 고수들에게 궁금한 점들을 물어보세요."
                            />
                            <p className='font-alert-red sub'>{errors.email?.message}</p>
                        </>
                    </SectionWrapper>

                    <p>식물처럼 싱그럽고 예쁜 말을 써주세요.
                        <br />욕설이나 선동성 글과 같은 부적절한 내용은 삭제처리될 수 있습니다.</p>
                </section>
            </MainCenterWrapper>
            <MainRightWrapper>
                <SigButton type='submit'>계정 생성</SigButton>
            </MainRightWrapper>
        </MainContentContainer>
    )

}

export default BambooEditor;