import Api from "./services/api";
import Cookies from "universal-cookie";
import DataTable from "./components/layout/table";

export async function getServerSideProps(context) {
  const { req } = context;
  const cookies = new Cookies(req.headers.cookie);

  Api.init(cookies);
  const response = await Api.get("components");
  const components = response.data;
  console.log("components :", components);

  return {
    props: {
      components,
    },
  };
}

export default function Home({ components }) {
  return (
    <div>
      {/* {components && Array.isArray(components)
        ? components.map((component) => (
            <p key={component.id}>{component.revision}</p>
          ))
        : "no data"}
      <br /> */}
      <DataTable components={components} />
    </div>
  );
}
