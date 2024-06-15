import { useFormStatus } from "react-dom";

export default function SubmitButton({ isValid, text }: { isValid: boolean, text: string }) {
    const { pending } = useFormStatus();
  
    return (
      <button
        className="btn"
        id="submitButton"
        type="submit"
        disabled={pending || !isValid}
      >
        {pending ? "Выполняется..." : text}
      </button>
    );
  }