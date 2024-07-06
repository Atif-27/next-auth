import React from "react";
import toast from "react-hot-toast";
async function getUserData() {
  try {
    const res = await fetch("http://localhost:3000/api/users/profile", {
      method: "GET",
    });
    const data = await res.json();
    console.log(data);
  } catch (error: any) {
    console.log(error);
    toast.error(error.message);
  }
}
const Page = async () => {
  const user = await getUserData();
  return <div>Profile Page</div>;
};

export default Page;
