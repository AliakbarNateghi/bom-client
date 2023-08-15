import Api from "@/pages/services/api";
import Cookies from "universal-cookie";
import Profile from "./profile";

export async function getServerSideProps(context) {
  const { req } = context;
  const cookies = new Cookies(req.headers.cookie);
  if (!cookies.get("access_token")) {
    return {
      redirect: {
        destination: "/user/login",
        permanent: false, // Set to true if the redirect is permanent
      },
    };
  }
  Api.init(cookies);
  //   const page = context.query.page || context.params?.page
  const response = await Api.get(`user-info`);
  const user = response.data;
  return {
    props: {
      user,
    },
  };
}

export default function getProfile({ user }) {
  return (
    <div>
      <Profile user={user[0]} />
    </div>
  );
}
