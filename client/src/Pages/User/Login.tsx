import styled from "@emotion/styled";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { userState } from "../../Recoil/atoms/user";
import { SigButton } from "../../Components/GlobalComponents";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  MainContentContainer,
  MainCenterWrapper,
  MainRightWrapper,
} from "../../Components/Wrapper";
import usePageTitle from "../../Hooks/usePageTitle";
import { axiosPrivate } from "../../Hooks/api";
import { Input } from "./Signup";

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
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
  color: var(--alert-red);
  margin: 3px;
  font-size: 13px;
`;

const Label = styled.label`
  font-size: 15px;
  font-weight: 500;
  margin-bottom: 3px;
`;

interface LoginForm {
  password: string;
  email: string;
  errors?: string;
}

function Login() {
  const [error, setErrMsg] = useState("");
  const [user, setUser] = useRecoilState(userState);

  const {
    register,
    formState: { errors },
    handleSubmit,
    setFocus,
  } = useForm<LoginForm>({
    mode: "onChange",
  });
  usePageTitle("로그인");
  useEffect(() => {
    setFocus("email");
  }, []);

  // 원래있던 페이지로 되돌리는 기능
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  // 로그인버튼 클릭시 동작하는 함수
  const onLogin = async (data: LoginForm) => {
    axiosPrivate
      .post("/login", {
        email: data.email,
        password: data.password,
      })
      .then((res) => {
        // 전역상태로 로그인 관련정보, 토큰 받아야함
        setUser(res.data);
        localStorage.setItem("accessToken", res.data.accessToken);
        localStorage.setItem("refreshToken", res.data.refreshToken);
      })
      .then(() => {
        // 원래있던 페이지로 되돌림
        navigate(from, { replace: true });
      })
      .catch((err) => {
        if (!err?.response) {
          setErrMsg("서버로부터 응답이 없습니다");
        } else if (err.response?.status === 400) {
          setErrMsg("이메일 또는 패스워드를 확인해주세요");
          console.log(err);
        } else if (err.response?.status === 401) {
          setErrMsg("허가되지않은 접근입니다");
        } else {
          setErrMsg("로그인에 실패했습니다");
        }
      });
  };

  return (
    <MainContentContainer>
      <MainCenterWrapper>
        <FormWrapper onSubmit={handleSubmit(onLogin)}>
          <InputContainer>
            <Label htmlFor={"Email"}>이메일</Label>
            <Input
              type={"email"}
              id="Email"
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
            {error && <Errormsg>{error}</Errormsg>}
          </InputContainer>

          <Link to={`/signup`} className={"sub mb-10"}>
              <span className="font-main bold sub">회원 가입</span>하고
              식물전문가가 되어보세요!
          </Link>

          <SigButton
            className={
              errors?.email === undefined && errors.password === undefined
                ? "active"
                : "disable"
            }
            type="submit"
            value={"Login"}
          >
            로그인
          </SigButton>
        </FormWrapper>
      </MainCenterWrapper>
      <MainRightWrapper></MainRightWrapper>
    </MainContentContainer>
  );
}

export default Login;
