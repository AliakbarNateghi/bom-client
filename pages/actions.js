"use server";

export default async function testAction(props) {
  setTimeout(() => {
    console.log(props);
  }, 1000);
}
