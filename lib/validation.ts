import { zfd } from "zod-form-data";
import { z } from "zod";

export const schemaFormAuth = zfd.formData({
  email: zfd.text(
    z.string({ message: "Обязательное поле" }).email("Не верный email адрес")
  ),
});

export const schemaFormProfile = zfd.formData({
  firstname: zfd.text(
    z
      .string({ message: "Обязательное поле" })
      .min(2, "Минимум 2 символов")
      .max(35, "Максимум 35 символовg")
  ),
  patronymic: zfd.text(
    z
      .string({ message: "Обязательное поле" })
      .min(2, "Минимум 2 символов")
      .max(35, "Максимум 35 символовg")
  ),
  lastname: zfd.text(
    z
      .string({ message: "Обязательное поле" })
      .min(2, "Минимум 2 символов")
      .max(35, "Максимум 35 символовg")
  ),
  mobilePhone: zfd.text(
    z
      .string({ message: "Обязательное поле" })
      .length(12, "Не верный формат телефона")
      .refine(
        (tel: string) => /(\+7)(\d{10})/.test(tel),
        "Не верный формат телефона"
      )
  ),
  email: zfd.text(
    z.string({ message: "Обязательное поле" }).email("Не верный email адрес")
  ),
});

export const schemaFormUpd = zfd.formData({
  location: zfd.text(
    z
      .string({ message: "Обязательное поле" })
  ),
  manufacture: zfd.text(
    z
      .string({ message: "Обязательное поле" }).min(1, "Обязательное поле")
  ),
  model: zfd.text(
    z
      .string({ message: "Обязательное поле" })
  ),
  imei: zfd.numeric(
    z.number({ message: "Обязательное поле" }).min(2)
  ),
});