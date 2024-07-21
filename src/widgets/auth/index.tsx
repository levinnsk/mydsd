"use client";
import { ErrorMessage } from "@hookform/error-message";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFormStatus } from "react-dom";
import { useForm } from "react-hook-form";
import { FormInputAuth } from "./lib/definations";
import { schemaFormAuth } from "./lib/validation";

function SubmitButtonEmail({ isValid }: { isValid: boolean }) {
  const { pending } = useFormStatus();

  return (
    <button
      className="btn"
      id="submitButton"
      type="submit"
      disabled={pending || !isValid}
    >
      {pending ? "Выполянется..." : "Войти с помощью email"}
    </button>
  );
}

export default function FormAuth({
  crsfToken,
}: {
  crsfToken: string | undefined;
}) {
  const {
    register,
    formState: { isValid, errors },
  } = useForm<FormInputAuth>({
    mode: "all",
    resolver: zodResolver(schemaFormAuth),
  });
  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form
        action="http://localhost:3000/api/auth/signin/nodemailer"
        method="POST"
      >
        <input
          className="input"
          type="hidden"
          name="csrfToken"
          //value={`${crsfToken}ddd`}
          value={crsfToken}
        />
        <label className="label" htmlFor="input-email-for-nodemailer-provider">
          Email
        </label>
        <input
          className="input"
          id="input-email-for-nodemailer-provider"
          autoFocus
          type="email"
          //name="email"
          placeholder="email@example.com"
          required
          {...register("email")}
        />
        <span className="text-error">
          <ErrorMessage name="email" errors={errors} />
        </span>
        <SubmitButtonEmail isValid={isValid} />
        <p>или</p>
      </form>
      <form action="http://localhost:3000/api/auth/signin/github" method="POST">
        <input
          className="input"
          type="hidden"
          name="csrfToken"
          //value={`${crsfToken}ddd`}
          value={crsfToken}
        />
        <button className="btn">Войти с помощью GitHub</button>
      </form>
    </div>
  );
}
