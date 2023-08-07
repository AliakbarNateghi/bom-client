import Api from "./services/api";
import Cookies from "universal-cookie";
import DataTable from "./components/layout/table";

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
  const response = await Api.get("components");
  const components = response.data;
  return {
    props: {
      components,
    },
  };
}

export default function Home({ components }) {
  return (
    <div>
      <DataTable components={components} />
    </div>
  );
}
