"use server";
import { FormStateUpd } from "../definitions";
import { auth } from "@/auth";
import { getErrorMessage } from "@/utils";
import { revalidateTag } from "next/cache";

export async function createUpd(
  prevState: FormStateUpd | null,
  data: FormData
) {
  //не верно работает если пользователь не обновится;
  try {
    const session = await auth();
    const location = data.get("location");
    const manufacture = data.get("manufacture");
    const model = data.get("model");
    const type = data.get("type");
    const imei = Number(data.get("imei")); // верно?
    const newUpd = await fetch("http://localhost:3000/api/upd/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        id: session?.user.id,
      },
      next: { tags: ["upds"] },
      body: JSON.stringify({
        location,
        manufacture,
        model,
        type,
        imei,
        owner: session?.user.id,
      }),
    });
    if (!newUpd.ok) {
      return { isError: true, message: "Ошибка сохранения" };
    }
    return { isError: false, message: "Устройство добавлено" };
  } catch (error) {
    return { isError: true, data: null, message: getErrorMessage(error) };
  }
}

export async function getUpds() {
  try {
    const session = await auth();
    const findUpds = await fetch("http://localhost:3000/api/upd/", {
      headers: {
        "Content-Type": "application/json",
        id: session?.user.id,
      },
      next: { tags: ["upds"], revalidate: 120 }, // обновлять каждые 2 мин в действия сервера не работает
    });
    return findUpds.json();
  } catch (error) {
    console.log("error =", error);
  }
}

export async function delUpd(id: string) {
  try {
    const session = await auth();
    await fetch("http://localhost:3000/api/upd/", {
      headers: {
        "Content-Type": "application/json",
        id: session?.user.id,
      },
      next: { tags: ["upds"] },
      body: JSON.stringify({
        id,
      }),
      method: "DELETE",
    });
    revalidateTag("upds");
    return true;
  } catch (error) {
    console.log("error =", error);
  }
}

export async function updateUpd(
  prevState: FormStateUpd | null,
  data: FormData
) {
  //не верно работает если пользователь не обновится;
  try {
    const session = await auth();
    console.log("data =", data);
    const idUpd = data.get("idUpd");
    console.log("idUpd = ", idUpd);
    const location = data.get("location");
    const manufacture = data.get("manufacture");
    const model = data.get("model");
    const imei = Number(data.get("imei")); // верно?
    const updateUpd = await fetch("http://localhost:3000/api/upd/", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        id: session?.user.id,
      },
      next: { tags: ["upds"] },
      body: JSON.stringify({
        location,
        manufacture,
        model,
        imei,
        owner: session?.user.id,
        idUpd,
      }),
    });
    console.log("updateUpd=", updateUpd);
    if (!updateUpd.ok) {
      return { isError: true, message: "Ошибка сохранения" };
    }
    revalidateTag("upds");
    return { isError: false, message: "Устройство обновлено" };
  } catch (error) {
    return { isError: true, data: null, message: getErrorMessage(error) };
  }
}
