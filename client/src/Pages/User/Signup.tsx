import React from 'react';import { FieldErrors, useForm } from "react-hook-form";
import { SigButton } from '../../Components/GlobalComponents';
import { MainContentContainer, MainCenterWrapper, MainRightWrapper } from "../../Components/Wrapper";

type Props = {}

interface SignupForm {
  username: string;
  nickname: string;
  email: string;
  password: string;
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
    <form onSubmit={handleSubmit(onValid, onInValid)}>
      <input 
        {...register("username", { 
          required: "이름을 입력해주세요.",
          minLength: {
            message: "이름은 2글자 이상이어야 합니다.",
            value: 2
          },
          maxLength: {
            message: "이름은 12글자를 넘을 수 없습니다.",
            value: 12
          }
        })} 
        type="Text" 
        placeholder="이름"
      />
      <p>{errors.username?.message}</p>
      <input 
        {...register("nickname", { 
          required: "닉네임을 입력해주세요.",
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
        placeholder="닉네임"
      />
      <p>{errors.nickname?.message}</p>
      <input {...register("email", { 
        required: "이메일을 입력해주세요.",
        validate: {
          dotinclude: (value) =>
        value.includes(".") || "이메일 형식이 아닙니다.",
        },
      })}
      type="email" 
      placeholder="Email"
      />
      <p>{errors.email?.message}</p>
      <input {...register("password", { 
        required: "비밀번호를 입력해주세요",
        minLength: {
          message: "비밀번호는 8자 이상이어야 합니다.",
          value: 8
        },
      })}
      type="password" 
      placeholder="Password"
      />
      <p>{errors.password?.message}</p>
    <SigButton type='submit' value="Create Account"> 계정 생성</SigButton>
  </form>
  </MainCenterWrapper>
  <MainRightWrapper>
  </MainRightWrapper>
  </MainContentContainer>
  )

}

export default Signup;