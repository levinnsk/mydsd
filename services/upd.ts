import { UpdModel } from "@/models";
import { TFormUpd } from "@/lib/definitions";
import { getErrorMessage } from "@/utils";

const createUpd = async (data: TFormUpd) => {
  try {
    // сделать проверку на уникальность!!!
    const newUpd = await UpdModel.create(data);
    console.log("status базы = ", newUpd);
    if (!newUpd) {
      console.log("сработал ошибка бД");
      // не верно работает
      return {
        isError: true,
        data: null,
        message: "Ошибка создания устройства",
      };
    }
    return {
      isError: false,
      data: {
        //id: findUser?._id?.toString(),
        location: newUpd.location,
        manufacture: newUpd.manufacture,
        model: newUpd.model,
        type: newUpd.type,
        imei: newUpd.imei,
        status: newUpd.status,
      },
      message: "Устройство создано",
    };
  } catch (error) {
    return { isError: true, data: null, message: getErrorMessage(error) };
  }
};

const getUpds = async (id: string) => {
  try {
    const findUpds = await UpdModel.find({ owner: id });
    if (!findUpds)
      return { isError: true, data: null, message: "устройства не найдены" };
    return {
      isError: false,
      data: findUpds,
      message: "Success",
    };
  } catch (error) {
    return {
      isError: true,
      data: null,
      message: "Наш сервер устал, попробуйте позже",
    };
  }
};

const delUpd = async (id: string) => {
  console.log("id services =", id);
  try {
    const result = await UpdModel.findByIdAndDelete(id);
    if (!result)
      return { isError: true, data: null, message: "Устройство не найдено" };
    return {
      isError: false,
      data: null,
      message: "Success",
    };
  } catch (error) {
    return {
      isError: true,
      data: null,
      message: "Наш сервер устал, попробуйте позже",
    };
  }
};

const updateUpd = async (id: string, data: TFormUpd) => {
  try {
    const updateUpd = await UpdModel.findByIdAndUpdate(id, data, {
      runValidators: true,
      new: true,
    });
    console.log("status базы = ", updateUpd);
    if (!updateUpd) {
      console.log("сработал ошибка бД");
      // не верно работает
      return {
        isError: true,
        data: null,
        message: "Ошибка обновления устройства",
      };
    }
    return {
      isError: false,
      data: {
        location: updateUpd.location,
        manufacture: updateUpd.manufacture,
        model: updateUpd.model,
        imei: updateUpd.imei,
        status: updateUpd.status,
      },
      message: "Устройство обновлено",
    };
  } catch (error) {
    return { isError: true, data: null, message: getErrorMessage(error) };
  }
};

const UpdService = { createUpd, getUpds, delUpd, updateUpd };

export default UpdService;
