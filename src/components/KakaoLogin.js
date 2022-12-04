import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { REDIRECT_URI, REST_API_KEY } from "./KakaoLoginData";

function KakaoLogin() {
  const location = useLocation();
  const navigate = useNavigate();
  const KAKAO_CODE = location.search.split("=")[1];

  // 액세스 토큰 저장
  const getKakaoToken = () => {
    fetch(`https://kauth.kakao.com/oauth/token`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `grant_type=authorization_code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${KAKAO_CODE}`,
    })
      .then((res) => res.json())
      .then((data) => {
        // 인가코드 넘겨서 토큰 가져오기
        if (data.access_token) {
          console.log("########TOKEN : ", data.access_token);
          localStorage.setItem("token", data.access_token); // session 유지 방법
        } else {
          navigate("/"); // 토근 못 받아오면 로그인 실패이기 때문에 다시 홈으로 돌려보냄
        }
      });
  };

  // 회원 정보 가져오기
  const getKakaoUserInfo = () => {
    fetch(`https://kapi.kakao.com/v2/user/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setProperties(data.properties);
        setKakaoAccount(data.kakao_account);
        console.log(data);
      });
  };

  const [properties, setProperties] = useState({});
  const [kakaoAccount, setKakaoAccount] = useState({});

  useEffect(() => {
    if (!location.search) return;
    getKakaoToken();
    getKakaoUserInfo();
  }, []);

  console.log(`PRINT : ${properties.nickname}`);
  return (
    <div>
      <h1>KakaoLogin</h1>
      <div>Name : {properties.nickname}</div>
      <div>profile_image : {properties.profile_image}</div>
      <div>age_range : {kakaoAccount.age_range}</div>
      <div>email : {kakaoAccount.email}</div>
      <div>gender : {kakaoAccount.gender}</div>
    </div>
  );
}

export default KakaoLogin;
