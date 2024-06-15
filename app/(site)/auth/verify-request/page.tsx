import Link from "next/link";
export default function VerifyRequestPage() {
  return (
    <div>
      <p>Проверьте свою почту.</p>
      <p>На ваш email адрес отправлена ссылка для авторизации.</p>
      <Link className="btn w-40" href={"/"}>
        На главную
      </Link>
    </div>
  );
}
