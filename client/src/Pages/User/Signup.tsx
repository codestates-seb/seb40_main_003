import React from 'react';
import { useForm } from "react-hook-form";
import { SigButton } from '../../Components/GlobalComponents';

type Props = {}

const Signup = (props: Props) => {
  const {register, handleSubmit} = useForm();
  const onValid = () => {
    console.log("나 발리드됨")
  };
  // console.log(register("name"));
  // console.log(watch());
  
  return (
    <form onSubmit={handleSubmit(onValid)}>
      <input {...register("username", { required: true })} 
      type="Text" 
      placeholder="Username"
      />
      <input {...register("email", { required: true })}
      type="email" 
      placeholder="Email"
      />
      <input {...register("password", { required: true })}
      type="password" 
      placeholder="Password"
      />
    <SigButton type='submit' value="Create Account"> 계정 생성</SigButton>
  </form>
  )

}

export default Signup