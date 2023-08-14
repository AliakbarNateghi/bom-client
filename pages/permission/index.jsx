import Api from "../services/api";
import Cookies from "universal-cookie";
import PermissionTable from "./permissiontable";
import { DataGrid } from "@mui/x-data-grid";

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
  const page = context.query.page || context.params?.page;
  const group = context.query.group || context.params?.group;
  console.log("page :", page);
  console.log("group :", group);
  //   const response = await Api.get(`components/?page=${page}`);
  const response = await Api.get(
    `field-permission/?page=${page}&group=${group}`
  );
  const permissions = response.data;
  console.log("permissions :", permissions);
  const groupsResponse = await Api.get(`groups`);
  const groups = groupsResponse.data;
  return {
    props: {
      permissions,
      groups,
      page,
      group,
    },
  };
}

export default function Permission({ permissions, groups, page, group }) {
  return (
    <div>
      <PermissionTable permissions={permissions} groups={groups} page={page} group={group} />
    </div>
  );
}
