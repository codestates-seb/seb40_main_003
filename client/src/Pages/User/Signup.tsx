import styled from "@emotion/styled";
import { useState, useEffect, useRef } from "react";
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
import secureLocalStorage from "react-secure-storage";
import { useRecoilState } from "recoil";
import { userState } from "../../Recoil/atoms/user";

interface SignupForm {
  password: string;
  email: string;
  nickname: string;
  passwordCheck: string;
  errors?: string;
}

const Signup = () => {
  // 리코일설정
  const [user, setUser] = useRecoilState(userState);

  // 페이지 이름변경
  useEffect(() => {
    setFocus("nickname");
  }, []);

  // 훅폼 설정
  const {
    watch,
    register,
    formState: { errors },
    handleSubmit,
    setFocus,
  } = useForm<SignupForm>({
    mode: "onChange",
  });

  usePageTitle("회원가입");
  // 첫번째 인풋 연결

  const navigate = useNavigate();
  const [error, setErrMsg] = useState("");
  const password = useRef({});
  password.current = watch("password", "");
  // 버튼 클릭시 동작하는 함수
  const onValid = async (data: SignupForm) => {
    axios
      .post("/signup", {
        email: data.email,
        password: data.password,
        nickname: data.nickname,
      })
      .then((res) => {
        console.log("회원가입 성공, 로그인시도");
      })
      .catch((err) => {
        if (!err?.response) {
          setErrMsg("서버로부터 응답이 없습니다");
        } else if (err.response?.status === 400) {
          setErrMsg("이메일 또는 패스워드를 확인해주세요");
        } else if (err.response?.status === 401) {
          setErrMsg("허가되지않은 접근입니다");
        } else {
          setErrMsg("회원가입에 실패했습니다");
        }
      })
      .then(() => {
        axios
          .post("/login", {
            email: data.email,
            password: data.password,
          })
          .then((res) => {
            const userInfo = {
              memberId: res.data.memberId,
              nickname: res.data.nickname,
              image: res.data.image,
            };
            setUser(userInfo);
            secureLocalStorage.setItem("accessToken", res.data.accessToken);
            secureLocalStorage.setItem("refreshToken", res.data.refreshToken);
          })
          .then(() => {
            window.alert("회원가입에 성공했습니다");
            navigate("/");
          })
          .catch((err) => {
            navigate("/login");
          });
      });
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
                pattern: /^(?=.*[a-zA-z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/,
              })}
            />
            {errors.password && errors.password.type === "required" && (
              <Errormsg> 비밀번호를 입력해주세요</Errormsg>
            )}
            {errors.password && errors.password.type === "pattern" && (
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
                validate: (value) =>
                  value === password.current || "비밀번호가 일치하지 않습니다.",
              })}
            />
            {errors.passwordCheck && (
              <Errormsg>{errors.passwordCheck.message}</Errormsg>
            )}
          </InputContainer>
          <SigButton
            className={
              errors.nickname === undefined &&
              errors.email === undefined &&
              errors.password === undefined &&
              errors.passwordCheck === undefined
                ? "active mt-16"
                : "disable mt-16"
            }
            type="submit"
            value={"Login"}
          >
            가입하기
          </SigButton>
          {error && <Errormsg>{error}</Errormsg>}
        </FormWrapper>
      </MainCenterWrapper>
      <MainRightWrapper></MainRightWrapper>
    </MainContentContainer>
  );
};

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

export default Signup;
