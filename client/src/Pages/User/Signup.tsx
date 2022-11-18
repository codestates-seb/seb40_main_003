import React from 'react';import { FieldErrors, useForm } from "react-hook-form";
import { SigButton } from '../../Components/GlobalComponents';
import { MainContentContainer, MainCenterWrapper, MainRightWrapper, SectionWrapper } from "../../Components/Wrapper";
import { Link } from "react-router-dom";

type Props = {}

interface SignupForm {
  username: string;
  nickname: string;
  email: string;
  password: string;
  errors?: string;
}

const Signup = (props: Props) => {
  const {register, handleSubmit, formState: { errors },
} = useForm<SignupForm>();
  
  const onValid = (data: SignupForm) => {
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

      <SectionWrapper title="닉네임" borderNone={true}>
      <>
      <input 
        {...register("nickname", { 
          required: "",
          minLength: {
            message: "닉네임은 2글자 이상이어야 합니다.",
            value: 2
          },
          maxLength: {
            message: "닉네임은 12글자를 넘을 수 없습니다.",
            value: 12
          }
        })}
        type="Text" 
        placeholder="닉네임을 입력해주세요."
      />
      <p className='font-alert-red sub'>{errors.nickname?.message}</p>
      </>
      </SectionWrapper>

      <SectionWrapper title={"이메일"} borderNone={true}>
        <>
        <input {...register("email", { 
          required: "",
          validate: {
            dotinclude: (value) =>
          value.includes(".") || "이메일 형식이 아닙니다.",
            },
          })}
          type="email" 
          placeholder="이메일을 입력해주세요."
        />
        <p className='font-alert-red sub'>{errors.email?.message}</p>
      </>
      </SectionWrapper>

      <SectionWrapper title={"비밀번호"} borderNone={true}>
        <>
        <input {...register("password", { 
          required: "",
          minLength: {
            message: "비밀번호는 8자 이상이어야 합니다.",
            value: 8
          },
          })}
          type="password" 
          placeholder="비밀번호를 입력해주세요."
        />        
        <p className='font-alert-red sub'>{errors.password?.message}</p>
        </>
      </SectionWrapper>

      
      <SectionWrapper title={"비밀번호 확인"} borderNone={true}>
        <>
        <input {...register("password", { 
          required: "",
          minLength: {
            message: "비밀번호는 8자 이상이어야 합니다.",
            value: 8
          },
          })}
          type="password" 
          placeholder="비밀번호를 다시 입력해주세요."
        />        
        <p className='font-alert-red sub'>{errors.password?.message}</p>
        </>
      </SectionWrapper> 

      <Link to={`/login/`}>
        <SigButton type='submit' value="Create Account">계정 생성</SigButton>
      </Link>
      </section>
      </MainCenterWrapper>
      <MainRightWrapper>
      </MainRightWrapper>
    </MainContentContainer>
  )

}

export default Signup;