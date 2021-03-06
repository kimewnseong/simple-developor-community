import { url } from "../../config/prodApi.js";
export const resetPassword = async (email) => {
  try {
    const result = await fetch(`${url}/user/password/reset`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email }),
    });

    const res = result.json();

    return res;
  } catch (e) {
    return { status: false, message: "서버 에러입니다." };
  }
};
