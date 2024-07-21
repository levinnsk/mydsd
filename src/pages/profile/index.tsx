import { Profile } from "@widgets/profile";
import { getUser } from "./api";

async function ProfilePage() {
  const user = await getUser();
  return (
    <div>
      <p>Страница профиля FSD</p>
      <Profile
        firstname={user?.firstname}
        patronymic={user?.patronymic}
        lastname={user?.lastname}
        mobilePhone={user?.mobilePhone}
        email={user?.email}
        mobilePhoneVerify={user?.mobilePhoneVerify}
        emailVerified={user?.emailVerified}
      />
    </div>
  );
}

export { ProfilePage };
