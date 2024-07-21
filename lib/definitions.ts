export type FormProfile = {
  firstname: string;
  patronymic: string;
  lastname: string;
  mobilePhone: string;
  email: string;
  mobilePhoneVerify?: Date;
  emailVerified?: Date;
};

export type FormStateUserProfile =
  | {
      isError: boolean;
      data?: FormProfile | null;
      message: string;
    }
  | undefined;

export type TFormUpd = {
  location: string;
  manufacture: string;
  model: string;
  imei: number;
  idUpd?: string;
};

export type FormStateUpd =
  | {
      isError: boolean;
      data?: TFormUpd | null;
      message: string;
    }
  | undefined;

export type TUpd = {
  _id: string;
  location: string;
  manufacture: string;
  model: string;
  type: string;
  imei: number;
  owner: string;
  status: boolean;
};
