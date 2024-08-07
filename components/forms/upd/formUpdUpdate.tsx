"use client";
import { schemaFormUpd } from "@/lib/validation";
import { useForm } from "react-hook-form";
import { TFormUpd } from "@/lib/definitions";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorMessage } from "@hookform/error-message";
import { useFormState } from "react-dom"; //переименован в useActionState 
import { updateUpd } from "@/lib/actions/updAction";
import { UPD_MANUFACTURE, UPD_MODEL } from "@/utils/constants";
import SubmitButton from "../../../src/shared/button/submitButton";
import { TUpd } from "@/lib/definitions";

export default function FormUpdUpdate({ upd, textButton }: { upd: TUpd, textButton: string }) {
  const {
    register,
    formState: { isValid, errors },
  } = useForm<TFormUpd>({
    mode: "all",
    resolver: zodResolver(schemaFormUpd),
  });
  const [stateForm, formAction] = useFormState(updateUpd, undefined);

  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form action={formAction}>
        <input className="input" id="idUpd" type="hidden" value={upd._id} {...register("idUpd")}/>
        <div>
          <label className="label" htmlFor="location">
            Место установки
          </label>
          <input
            className="input"
            type="text"
            id="location"
            placeholder="место установки"
            autoComplete="location"
            defaultValue={upd.location}
            {...register("location")}
          />
          <span className="text-error">
            <ErrorMessage name="location" errors={errors} />
          </span>
        </div>
        <div>
          <label className="label" htmlFor="manufacture">
            Производитель
          </label>
          <select className="input" {...register("manufacture")} defaultValue={upd.manufacture}>
            <option value="">Выбери производителя</option>
            {UPD_MANUFACTURE.map((manuf, i) => {
              return <option key={i}>{manuf}</option>;
            })}
          </select>
          <span className="text-error">
            <ErrorMessage name="manufacture" errors={errors} />
          </span>
        </div>
        <div>
          <label className="label" htmlFor="model">
            Модель
          </label>
          <select className="input" {...register("model")} defaultValue={upd.model}>
            <option value="">Выбери модель</option>
            {UPD_MODEL.map((model, i) => {
              return <option key={i}>{model}</option>;
            })}
          </select>
          <span className="text-error">
            <ErrorMessage name="model" errors={errors} />
          </span>
        </div>
        <div>
          <label className="label" htmlFor="imei">
            imei
          </label>
          <input
            className="input"
            type="number"
            id="imei"
            placeholder="imei"
            autoComplete="imei"
            {...register("imei")}
            defaultValue={upd.imei}
          />
          <span className="text-error">
            <ErrorMessage name="imei" errors={errors} />
          </span>
        </div>
        <SubmitButton isValid={isValid} text={textButton} />
        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          <p
            className={`text-sm ${stateForm?.isError ? "text-red-500" : "text-green-500"}`}
          >
            {stateForm?.message}
          </p>
        </div>
      </form>
    </div>
  );
}
