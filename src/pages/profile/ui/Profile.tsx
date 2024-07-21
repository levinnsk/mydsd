import { Profile } from "@widgets/profile";
import { getUser } from "@/lib/actions/userAction";

export default async function ProfilePage() {

    const user = await getUser();
    //const {data, error} = useSWR("http://localhost:3000/api/user/", fetcher);
    console.log("user app page", user)
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