"use server";

export async function testAction(props) {
  setTimeout(() => {
    console.log(props);
  }, 1000);
}
