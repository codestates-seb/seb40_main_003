import styled from "@emotion/styled";
import { useState, useEffect } from "react";
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { userState } from "../../Recoil/atoms/user";
import { SigButton } from "../../Components/GlobalComponents";

const Container = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 10px;
  align-items: center;
  background-color: #f1f2f3;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 10px 24px 0px,
    rgba(0, 0, 0, 0.05) 0px 20px 48px 0px, rgba(0, 0, 0, 0.1) 0px 1px 4px 0px;
  border-radius: 10px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  height: 100%;
  width: 100%;
  padding: 10px;
`;

const InputContainer = styled.div`
  margin: 10px 0;
  display: flex;
  flex-direction: column;
  align-self: center;
`;

const Errormsg = styled.p`
  color:  var(--alert-red);
  margin: 3px;
  font-size: 13px;
`;

const Label = styled.label`
  font-size: 15px;
  font-weight: 500;
  margin-bottom: 3px;
`;

const Input = styled.input`
  width: 260px;
  height: 35px;
  padding: 0;
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 90px);
`;

interface LoginForm {
  password: string;
  email: string;
  errors?: string;
}

function Login() {
  // const url = 'https://testserver.com/';
  const [error, setErrMsg] = useState('');
  const [user, setUser] = useRecoilState(userState);
  const {
    register,
    formState: { errors },
    handleSubmit,
    setFocus,
  } = useForm<LoginForm>({ 
    mode: "onChange", });

    useEffect(() => {
      setFocus('email');
    }, [setFocus]);

  const onLogin = async (data: LoginForm) => {
    try {
    axios.post('/auth/token', {
      headers: {
        'Content-Type': 'application/json'
    },
      email: data.email,
      password : data.password,

    }).then((res)=>{
      console.log(res);
    })
  } catch (err:any) {
    console.log(err);
    if (!err?.response) {
      setErrMsg("서버로부터 응답이 없습니다");
    } else if (err.response?.status === 400) {
      setErrMsg("이메일 또는 패스워드를 확인해주세요");
      console.log(error);
    } else if (err.response?.status === 401) {
      setErrMsg("허가되지않은 접근입니다");
    } else {
      setErrMsg("Login Failed");
    }
    }
  };

  return (
    <MainContainer>
      <Container>
        <Form onSubmit={handleSubmit(onLogin)}>
          <InputContainer>
            <Label htmlFor={'Email'}>Email</Label>
            <Input
              type={'email'}
              id="Email"
              {...register('email', {
                required: true,
                pattern: /^\S+@\S+$/i,
                maxLength: 50,
              })}
            />
            {errors.email && errors.email.type === 'required' && (
              <Errormsg> 이메일을 입력해주세요.</Errormsg>
            )}
            {errors.email && errors.email.type === 'pattern' && (
              <Errormsg> 이메일 형식이여야 합니다.</Errormsg>
            )}
            {errors.email && errors.email.type === 'maxLength' && (
              <Errormsg> 최대 길이는 50자 이하여야 합니다</Errormsg>
            )}
          </InputContainer>
          <InputContainer>
            <Label htmlFor={'password'}>Password</Label>
            <Input
              type={'password'}
              id="password"
              {...register('password', {
                required: true,
                minLength: 8,
              })}
            />
            {errors.password && errors.password.type === 'required' && (
              <Errormsg> 패스워드를 입력해주세요</Errormsg>
            )}
            {errors.password && errors.password.type === 'minLength' && (
              <Errormsg> 최소 길이는 8자 이상이여야 합니다</Errormsg>
            )}
          </InputContainer>
          
          <button className="font-gray sub">ID / PW 찾기</button>
          <button className="font-main sub bold">회원 가입</button>
          <SigButton className="disable" type="submit" value={'Login'}>로그인</SigButton>
          {error && <Errormsg> {error}</Errormsg>}
        </Form>
      </Container>
    </MainContainer>
  );
}

export default Login;