import { url } from "../../config/prodApi.js";
export const onSignup = async ({ email, password, nickname, birth, gender, tags, github }) => {
  try {
    const result = await fetch(`${url}/user/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email, password, nickname, birth, gender, tags, github }),
    });
    const res = result.json();
    return res;
  } catch (e) {
    return { status: false, message: "서버 에러입니다." };
  }
};
