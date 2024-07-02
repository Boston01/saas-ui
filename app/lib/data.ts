import { getAccessToken } from "../../utils/SessionTokenAccessor";

export async function getUsers() {
    const url = `${process.env.BACKEND_URL}/api/v1/iam/users`;
    let accessToken = await getAccessToken();
  
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    });
  
    if (response.ok) {
      const data = await response.json();
      console.log(data.data.users);
      return data.data.users;
    }
  
    console.log(response.status);
  
    throw new Error("Failed to fetch users. Status: " + response.status);
  }

  export async function getServices() {
    const url = `${process.env.BACKEND_URL}/api/v1/resources/clusters?project=internal-envs`;
    let accessToken = await getAccessToken();
  
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    });
  
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      return data.data;
    }
  
    console.log(response.status);
  
    throw new Error("Failed to fetch services. Status: " + response.status);
  }