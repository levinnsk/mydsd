"use server";
import { revalidateTag } from "next/cache";
import { auth } from "@/auth";
import { getErrorMessage } from "@/utils";
import { FormStateUserProfile } from "../definitions";

//новое
export async function getSmsCode(tel: string) {
  // получение ip пользователя
  /*const FALLBACK_IP_ADDRESS = '0.0.0.0'
  const forwardedFor = headers().get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0] ?? FALLBACK_IP_ADDRESS
  }
  console.log(forwardedFor ? "true" : "false")*/

  const rezult = await fetch(
    `https://sms.ru/code/call?phone=${tel}&ip=-1&api_id=${process.env.API_ID_SMS_RU}`,
    { method: "GET" }
  );
  return rezult.json();
}

export async function onVerifedMobile(tel: string) {
  try {
    const session = await auth();
    const date = new Date();
    const newUser = await fetch("http://localhost:3000/api/user/", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        id: session?.user.id,
      },
      next: { tags: ["user"] },
      body: JSON.stringify({ mobilePhoneVerify: date, mobilePhone: tel }),
    });
    if (!newUser.ok) {
      return { isError: true, message: "Ошибка сохранения подверждения" };
    }
    revalidateTag("user");
    return { isError: false, message: "Номер подтвержден" };
  } catch (error) {
    return { isError: true, data: null, message: getErrorMessage(error) };
  }
}

//новый


//новый
export async function updateUser(
  prevState: FormStateUserProfile | null,
  data: FormData
) {
  //не верно работает если пользователь не обновится;
  try {
    const session = await auth();
    const firstname = data.get("firstname");
    const patronymic = data.get("patronymic");
    const lastname = data.get("lastname");
    const mobilePhone = data.get("mobilePhone");

    const newUser = await fetch("http://localhost:3000/api/user/", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        id: session?.user.id,
      },
      next: { tags: ["user"] },
      body: JSON.stringify({ firstname, patronymic, lastname, mobilePhone }),
    });
    if (!newUser.ok) {
      return { isError: true, message: "Ошибка обновления пользователя" };
    }
    revalidateTag("user");

    return { isError: false, message: "Профиль обновлен" };
  } catch (error) {
    return { isError: true, data: null, message: getErrorMessage(error) };
  }
}

