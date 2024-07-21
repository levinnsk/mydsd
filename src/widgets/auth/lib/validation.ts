import { z } from "zod";
import { zfd } from "zod-form-data";

export const schemaFormAuth = zfd.formData({
  email: zfd.text(
    z.string({ message: "Обязательное поле" }).email("Не верный email адрес")
  ),
});
