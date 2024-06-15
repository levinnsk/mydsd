import Link from "next/link";

export default function MenuLeft() {

    return (
        <menu>
            <li><Link href={"/upd"}>УПД</Link></li>
        </menu>
    )
}