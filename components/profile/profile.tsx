"use client";
import { useFormStatus, useFormState } from "react-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorMessage } from "@hookform/error-message";
import { FormProfile } from "@/lib/definitions";
import { schemaFormProfile } from "@/lib/validation";
import { updateUser } from "@/lib/actions/userAction";
import { ShieldCheck } from "@gravity-ui/icons";
import { getSmsCode, onVerifedMobile } from "@/lib/actions/userAction";
import { useState } from "react";
import Modal from "@/ui/modal/modal";

// сделать: контроль номера телефона при обновлении профиля,
// чтобы не было возмождности подвтердить номер телефона, а потом его изменить на другой любой
function SubmitButton({ isValid }: { isValid: boolean }) {
  const { pending } = useFormStatus();

  return (
    <button
      className="btn"
      id="submitButton"
      type="submit"
      disabled={pending || !isValid}
    >
      {pending ? "Выполянется..." : "Обновить"}
    </button>
  );
}

export default function Profile({
  firstname,
  patronymic,
  lastname,
  mobilePhone,
  email,
  mobilePhoneVerify,
  emailVerified,
}: FormProfile) {
  const {
    register,
    formState: { isValid, errors },
    getValues,
  } = useForm<FormProfile>({
    mode: "all",
    resolver: zodResolver(schemaFormProfile),
  });
  const [stateForm, formAction] = useFormState(updateUser, undefined);
  const [isMobileTel, setMobileTel] = useState(""); // сохранение номера телефона
  const [isOpenModalSms, setOpenModalSms] = useState(false); // открытие модалки смс кода

  const [isCodeRing, setCodeRing] = useState("");
  const [isStateValidCode, setStateValidCode] = useState(false);
  //const {update} = useSession()

  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form action={formAction}>
        <div>
          <label className="label" htmlFor="firstname">
            Имя
          </label>
          <input
            defaultValue={firstname}
            className="input"
            id="firstname"
            autoFocus
            type="text"
            placeholder="Имя"
            required
            {...register("firstname")}
          />
          <span className="text-error">
            <ErrorMessage name="firstname" errors={errors} />
          </span>
        </div>
        <div>
          <label className="label " htmlFor="patronymic">
            Отчество
          </label>
          <input
            defaultValue={patronymic}
            className="input"
            id="patronymic"
            autoFocus
            type="text"
            placeholder="Отчество"
            required
            {...register("patronymic")}
          />
          <span className="text-error">
            <ErrorMessage name="patronymic" errors={errors} />
          </span>
        </div>
        <div>
          <label className="label" htmlFor="lastname">
            Фамилия
          </label>
          <input
            defaultValue={lastname}
            className="input"
            id="lastname"
            autoFocus
            type="lastname"
            placeholder="Фамилия"
            required
            {...register("lastname")}
          />
          <span className="text-error">
            <ErrorMessage name="lastname" errors={errors} />
          </span>
        </div>
        <div>
          <div className="flex justify-between">
            <label className="label" htmlFor="mobilePhone">
              Мобильный телефон
            </label>
            {mobilePhoneVerify ? (
              <ShieldCheck />
            ) : (
              <p className="text-error ml-4">Требуется подтверждение</p>
            )}
          </div>

          <div className="flex">
            <input
              defaultValue={mobilePhone}
              className="input max-w-40"
              type="text"
              id="mobilePhone"
              placeholder="+79990001122"
              autoComplete="mobilePhone"
              {...register("mobilePhone")}
            />
            {!mobilePhoneVerify ? (
              <>
                <button
                  type="button"
                  className="ml-2"
                  onClick={async () => {
                    const tel = getValues("mobilePhone");
                    const req = await getSmsCode(tel);
                    if (req.status === "OK") {
                      setCodeRing(req.code.toString());
                      setMobileTel(tel);
                      setOpenModalSms(true);
                    } // сделать вывод ошибки status_text
                  }}
                >
                  Подвтвердить
                </button>
              </>
            ) : (
              ""
            )}
          </div>
          {isOpenModalSms ? (
            <Modal>
              <div>
                <p>Подтверждение номера телефона</p>
                <p>На ваш номер {isMobileTel} поступит звонок</p>
                <p>введите последние четыре цифры</p>
                <input
                  className="input max-w-40 ml-2"
                  type="text"
                  onChange={async (evt) => {
                    //console.log("inputCode=", evt.target.value);
                    if (
                      evt.target.value.length === 4 &&
                      isCodeRing === isCodeRing
                    ) {
                      const req = await onVerifedMobile(isMobileTel);

                      if (!req.isError) {
                        setStateValidCode(true);
                      }
                    } else if (
                      evt.target.value.length === 4 &&
                      isCodeRing !== isCodeRing
                    ) {
                      console.log("не верный код");
                    }
                  }}
                />
                {isStateValidCode ? (
                  <>
                    <p>Код принят</p>{" "}
                    <button
                      type="button"
                      onClick={() => setOpenModalSms(false)}
                    >
                      закрыть окно
                    </button>
                  </>
                ) : (
                  <p>Не верный код</p>
                )}
              </div>
            </Modal>
          ) : (
            ""
          )}
          <span className="text-error">
            <ErrorMessage name="mobilePhone" errors={errors} />
          </span>
        </div>
        <div>
          <div className="flex justify-between">
            <label className="label" htmlFor="email">
              Email
            </label>
            {emailVerified ? (
              <ShieldCheck />
            ) : (
              <p className="text-error ml-4">Требуется подтверждение</p>
            )}
          </div>
          <input
            //disabled
            readOnly
            value={email}
            className="input"
            id="email"
            autoFocus
            type="email"
            //name="email"
            placeholder="email@example.com"
            required
            {...register("email")}
          />
        </div>
        <SubmitButton isValid={isValid} />
      </form>
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
    </div>
  );
}
