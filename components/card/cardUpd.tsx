"use client";
import styles from "./styles.module.css";
import Tooltip from "@mui/material/Tooltip";
import { Pencil, TrashBin } from "@gravity-ui/icons";
import { TUpd } from "@/lib/definitions";
import Modal from "@/src/shared/modal/modal";
import { useState } from "react";
import { delUpd } from "@/lib/actions/updAction";
import FormUpdUpdate from "../forms/upd/formUpdUpdate";

export default function CardUpd({ upds }: any) {
  // исправить!!!
  const [isOpenCardDelete, setOpenCardDelete] = useState(false);
  const [isOpenCardUpdate, setOpenCardUpdate] = useState(false);

  const [isIdCardDelete, setIdCardDelete] = useState("");
  const [isCurrentCard, setCurrentCard] = useState();

  const clickDeleteCard = (id: string) => {
    setOpenCardDelete(true);
    setIdCardDelete(id);
  };

  const onDeleteCard = async () => {
    const res = await delUpd(isIdCardDelete);
    if (res) {
      setIdCardDelete("");
      setOpenCardDelete(false);
    }
  };

  const DeleteCard = () => {
    return (
      <Modal>
        <p>Удалить карточку?</p>
        <button className="btn mt-2" onClick={() => onDeleteCard()}>
          Да
        </button>
        <button
          className="btn mt-2"
          onClick={() => {
            setOpenCardDelete(false);
            setIdCardDelete("");
          }}
        >
          Нет
        </button>
      </Modal>
    );
  };

  const clickUpdateCard = (upd: TUpd) => {
    console.log("upd =", upd);
    setOpenCardUpdate(true);
    setCurrentCard(upd);
    //setIdCardDelete(id);
  };

  const UpdateCard = () => {
    return (
      <Modal>
        <p>Обновление УПД</p>
        <FormUpdUpdate upd={isCurrentCard} textButton="Обновить" />{" "}
        {/* не понимаю ошибку TS */}
        <button className="btn mt-2" onClick={() => setOpenCardUpdate(false)}>
          Закрыть
        </button>
      </Modal>
    );
  };
  return (
    <>
      {isOpenCardDelete ? <DeleteCard /> : ""}
      {isOpenCardUpdate ? <UpdateCard upd={isCurrentCard} /> : ""}

      {upds.map((upd: TUpd) => {
        return (
          <Tooltip
            key={upd._id}
            title={`${upd.status ? "Online" : "Offline"}`}
            placement="bottom-end"
          >
            <div
              className={`${styles.card} ${upd.status ? styles.online : styles.offline}`}
            >
              <div className={styles.header}>
                <p className={styles.title}>{upd.location}</p>
                <div className={styles.eventBlock}>
                  <button onClick={() => clickUpdateCard(upd)}>
                    <Pencil />
                  </button>
                  <button onClick={() => clickDeleteCard(upd._id)}>
                    <TrashBin />
                  </button>
                </div>
              </div>
              <p className={styles.text}>Производитель {upd.manufacture}</p>

              <p>{upd.model}</p>
              <p>{upd.imei}</p>
            </div>
          </Tooltip>
        );
      })}
    </>
  );
}

/*

{upds.map((upd) => {
            return (
                <div key={upd._id} className={styles.card}>
                <p>Карточка УПД</p>
                <p></p>
            </div>
            )
        }
    )
}*/
