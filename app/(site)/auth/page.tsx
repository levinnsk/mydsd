import { cookies } from "next/headers";
import FormAuth from "@/components/forms/formauth";

export default function Login() {
  const csrfTokenCookies = cookies().get("authjs.csrf-token")?.value;
  const arrayCrsf = csrfTokenCookies?.split("");
  const crsfToken = csrfTokenCookies?.slice(0, arrayCrsf?.indexOf("|"));
  //console.log("crsfToken = ", crsfToken);

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Авторизация
        </h2>
      </div>
      <FormAuth crsfToken={crsfToken} />
    </div>
  );
}
