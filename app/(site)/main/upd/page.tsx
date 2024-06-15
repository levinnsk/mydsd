//import TableUpd from "@/components/table/tableUpd";
import { getUpds } from "@/lib/actions/updAction";
import CardUpd from "@/components/card/cardUpd";
import styles from "./styles.module.css";
import Link from "next/link";
type Upds = {
  _id: string;
  location: string;
  manufacture: string;
  model: string;
  type: string;
  imei: number;
  owner: string;
  status: boolean;
};

export default async function Upd() {
  const upds: Array<Upds> = await getUpds();
  return (
    <div>
      <div className="">
        <h1>Установленные устройства (модемы, терминалы)</h1>
        <div className="w-24 mb-2">
          <Link className="btn" href={"/main/upd/create"}>
            Добавить
          </Link>
        </div>
      </div>
      <div className={styles.cards}>
        <CardUpd upds={upds} />
      </div>
    </div>
  );
}
