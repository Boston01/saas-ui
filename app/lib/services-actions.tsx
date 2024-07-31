"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getAccessToken } from "../../utils/SessionTokenAccessor";
import { z } from "zod";

const FormSchemaService = z.object({
    region: z.string().min(1, { message: "region is required" }),
    cloudProvider: z.string().min(1, { message: "region is required" }).toLowerCase(),
    projects: z.string().min(1, { message: "region is required" }),
    envName: z.string().min(1, { message: "env name is required" }).max(7).toLowerCase(),
    overrideDns: z.string().max(53),
    reconcile: z.string(),
    clusterSize: z.string().toLowerCase(),
  });

  export type StateService = {
    errors?: {
      region?: string[];
      cloudProvider?: string[];
      projects?: string[];
      envName?: string[];
      overrideDns?: string[];
      reconcile?: string[];
      clusterSize?: string[];
    };
    message?: string | null;
  };
  
const CreateService = FormSchemaService.required({ region: true, cloudProvider: true, clusterSize: true, envName: true, overrideDns: true, projects: true, reconcile: true });

export async function createService(
  prevState: StateService,
  formData: FormData
) {
  const validatedFields = CreateService.safeParse({
    region: formData.get("region"),
    cloudProvider: formData.get("cloudProvider"),
    projects: formData.get("projects"),
    envName: formData.get("envName"),
    overrideDns: formData.get("overrideDns"),
    reconcile: formData.get("reconcile"),
    clusterSize: formData.get("clusterSize"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Service.",
    };
  }

  console.log(validatedFields);

  const {
    region,
    cloudProvider,
    projects,
    envName,
    overrideDns,
    reconcile,
    clusterSize,
  } = validatedFields.data;

  const postBody = {
    provider: {
      cloud_provider: cloudProvider,
      region: region,
      project_id: "opensee-ci",
    },
    project_name: projects,
    env_name: envName,
    cluster_size: clusterSize,
    provisioner_version: "0.4.0",
    reconcile: reconcile,
    override_dns: overrideDns,
    custom_specs: {},
  };

  console.log(postBody);

  const url = `${process.env.BACKEND_URL}/api/v1/resources/cluster`;
  let accessToken = await getAccessToken();

  try {
    const resp = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
      body: JSON.stringify(postBody),
    });

    if (resp.ok) {
      revalidatePath("/dashboard/services");
      redirect("/dashboard/services");
    }
  } catch (err) {
    return {
      message: "Failed to create services" + err,
    };
  }

  revalidatePath("/dashboard/services");
  redirect("/dashboard/services");
}
