import Api from "@/pages/services/api";
import Cookies from "universal-cookie";
import Users from "./users";

export async function getServerSideProps(context) {
  const { req } = context;
  const cookies = new Cookies(req.headers.cookie);
  if (!cookies.get("access_token")) {
    return {
      redirect: {
        destination: "/user/login",
        permanent: false,
      },
    };
  }
  Api.init(cookies);
  const response = await Api.get(`users-info`);
  const users = response.data;
  const groupsResponse = await Api.get(`groups`);
  const groups = groupsResponse.data;
  return {
    props: {
      users,
      groups,
    },
  };
}

export default function getProfile({ users, groups }) {
  return (
    <div>
      <Users users={users} groups={groups} />
    </div>
  );
}
