import axios from "axios";

export const axiosAPI = axios.create({
  baseURL : "http://localhost",
  // headers : {"Content-Type" : "application/json"}

  // withCredentials : true // 쿠키 포함 설정
  // 서버에서도 클라이언트가 보낸 쿠키를 받아줄 준비 해야함
  // credential 허용 설정 필요함
  // -> JWT(토큰) 사용시 중요


});