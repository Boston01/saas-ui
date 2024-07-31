
import { getAccessToken } from "../../utils/SessionTokenAccessor";

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
  
  throw new Error("Failed to fetch services. Status: " + response.status);
}

export async function getService(service_name: string) {
  const url = `${process.env.BACKEND_URL}/api/v1/resources/clusters/${service_name}?project=internal-envs`;
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


  throw new Error("Failed to fetch services. Status: " + response.status);
}
