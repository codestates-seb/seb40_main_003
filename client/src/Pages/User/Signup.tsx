import styled from "@emotion/styled";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { SigButton } from "../../Components/GlobalComponents";
import { useNavigate } from "react-router-dom";
import {
  MainContentContainer,
  MainCenterWrapper,
  MainRightWrapper,
} from "../../Components/Wrapper";
import usePageTitle from "../../Hooks/usePageTitle";
import axios from "../../Hooks/api";

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
  padding: 10px;
`;

export const Input = styled.input`
  width: 250px;
  height: 35px;
`;

const InputContainer = styled.div`
  margin: 10px 0;
  display: flex;
  flex-direction: column;
  align-self: center;
`;

const Errormsg = styled.p`
  color: var(--alert-red);
  margin: 3px;
  font-size: 13px;
`;

const Label = styled.label`
  font-size: 15px;
  font-weight: 500;
  margin-bottom: 3px;
`;

interface SignupForm {
  password: string;
  email: string;
  nickname: string;
  passwordCheck: string;
  errors?: string;
}

const Signup = () => {
  const navigate = useNavigate();
  const [error, setErrMsg] = useState("");
  const {
    register,
    formState: { errors },
    handleSubmit,
    setFocus,
  } = useForm<SignupForm>({
    mode: "onChange",
  });
  usePageTitle("회원가입");
  useEffect(() => {
    setFocus("nickname");
  }, []);
  // 버튼 클릭시 동작하는 함수
  const onValid = async (data: SignupForm) => {
    try {
      axios
        .post("/signup", {
          email: data.email,
          password: data.password,
          nickname: data.nickname,
        })
        .then((response) => {
          console.log(response);
          navigate("/login");
        });
    } catch (err: any) {
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
    <MainContentContainer>
      <MainCenterWrapper>
        <FormWrapper onSubmit={handleSubmit(onValid)}>
          <InputContainer>
            <Label htmlFor={"nickname"}>닉네임</Label>
            <Input
              type={"nickname"}
              id="nickname"
              {...register("nickname", {
                required: true,
                minLength: 2,
              })}
            />
            {errors.nickname && errors.nickname.type === "required" && (
              <Errormsg> 닉네임을 입력해주세요</Errormsg>
            )}
            {errors.nickname && errors.nickname.type === "minLength" && (
              <Errormsg> 최소 길이는 2자 이상이여야 합니다</Errormsg>
            )}
          </InputContainer>
          <InputContainer>
            <Label htmlFor={"Email"}>이메일</Label>
            <Input
              type={"email"}
              id="email"
              {...register("email", {
                required: true,
                pattern: /^\S+@\S+$/i,
                maxLength: 20,
              })}
            />
            {errors.email && errors.email.type === "required" && (
              <Errormsg> 이메일을 입력해주세요.</Errormsg>
            )}
            {errors.email && errors.email.type === "pattern" && (
              <Errormsg> 이메일 형식이여야 합니다.</Errormsg>
            )}
            {errors.email && errors.email.type === "maxLength" && (
              <Errormsg> 최대 길이는 20자 이하여야 합니다</Errormsg>
            )}
          </InputContainer>
          <InputContainer>
            <Label htmlFor={"password"}>비밀번호</Label>
            <Input
              type={"password"}
              id="password"
              {...register("password", {
                required: true,
                minLength: 8,
              })}
            />
            {errors.password && errors.password.type === "required" && (
              <Errormsg> 패스워드를 입력해주세요</Errormsg>
            )}
            {errors.password && errors.password.type === "minLength" && (
              <Errormsg>8자 이상, 영문, 숫자, 특수문자를 사용하세요.</Errormsg>
            )}
          </InputContainer>
          <InputContainer>
            <Label htmlFor={"passwordCheck"}>비밀번호 재확인</Label>
            <Input
              type={"password"}
              id="passwordCheck"
              {...register("passwordCheck", {
                required: true,
                minLength: 8,
              })}
            />
            {errors.passwordCheck &&
              errors.passwordCheck.type === "required" && (
                <Errormsg> 패스워드를 다시 확인해주세요</Errormsg>
              )}
            {errors.passwordCheck &&
              errors.passwordCheck.type === "minLength" && (
                <Errormsg>
                  8자 이상, 영문, 숫자, 특수문자를 사용하세요.
                </Errormsg>
              )}
          </InputContainer>
          <SigButton
            className={
              errors.nickname === undefined &&
              errors.email === undefined &&
              errors.password === undefined
                ? "active mt-16"
                : "disable mt-16"
            }
            type="submit"
            value={"Login"}
          >
            계정생성
          </SigButton>
          {error && <Errormsg>{error}</Errormsg>}
        </FormWrapper>
      </MainCenterWrapper>
      <MainRightWrapper></MainRightWrapper>
    </MainContentContainer>
  );
};

export default Signup;
