import Api from "../services/api";

export default async function Page() {
  console.log("TEST");
  Api.init();
  const components = await Api.get("components");
  console.log("components :", components);
  return (
    <div className="bg-white">
      {components?.length
        ? components.map((component) => <p key={component.id}>{component}</p>)
        : "no data"}
    </div>
  );
}
