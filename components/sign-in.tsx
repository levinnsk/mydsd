import { signIn } from "../auth"
 
export function SignIn() {
  return (
    <form
      action={async () => {
        "use server"
        await signIn()
      }}
    >
      <button className="btn" type="submit">Кнопка войти /api/auth/</button>
    </form>
  )
}