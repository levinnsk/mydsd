import { UserModel } from "@/models";
import { FormProfile } from "@/lib/definitions";
import { getErrorMessage } from "@/utils";

const getCurrentUser = async (id: string) => {
  try {
    const findUser = await UserModel.findById(id);
    console.log("findUser services =", findUser);
    if (!findUser)
      return { isError: true, data: null, message: "Пользователь не найден" };
    return {
      isError: false,
      data: {
        //id: findUser?._id?.toString(),
        firstname: findUser.firstname,
        patronymic: findUser.patronymic,
        lastname: findUser.lastname,
        image: findUser.image,
        email: findUser.email,
        emailVerified: findUser.emailVerified,
        mobilePhone: findUser.mobilePhone,
        mobilePhoneVerify: findUser.mobilePhoneVerify,
      },
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

const updateUser = async (id: string, data: FormProfile) => {
  try {
    const newUser = await UserModel.findByIdAndUpdate(
      id,
      data,
      { runValidators: true, new: true } //, new: true
    );
    console.log("status базы = ", newUser);
    if (!newUser) {
      console.log("сработал ошибка бД");
      // не верно работает
      return {
        isError: true,
        data: null,
        message: "Ошибка обновления пользователя",
      };
    }
    return {
      isError: false,
      data: {
        //id: findUser?._id?.toString(),
        firstname: newUser.firstname,
        patronymic: newUser.patronymic,
        lastname: newUser.lastname,
        image: newUser.image,
        email: newUser.email,
        emailVerified: newUser.emailVerified,
        mobilePhone: newUser.mobilePhone,
      },
      message: "Пользователь обновлен",
    };
  } catch (error) {
    return { isError: true, data: null, message: getErrorMessage(error) };
  }
};
const UserService = { getCurrentUser, updateUser };

export default UserService;
