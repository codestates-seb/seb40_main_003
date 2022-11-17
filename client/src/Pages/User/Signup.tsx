import React from 'react';import { FieldErrors, useForm } from "react-hook-form";
import { SigButton } from '../../Components/GlobalComponents';

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
    <form onSubmit={handleSubmit(onValid, onInValid)}>
      <input 
        {...register("username", { 
          required: "Username is required",
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
      {errors.username?.message}
      <input 
        {...register("nickname", { 
          required: "Nickname is required",
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

      <input {...register("email", { required: "Email is required" })}
      type="email" 
      placeholder="Email"
      />
      <input {...register("password", { required: "Password is required" })}
      type="password" 
      placeholder="Password"
      />
    <SigButton type='submit' value="Create Account"> 계정 생성</SigButton>
  </form>
  )

}

export default Signup