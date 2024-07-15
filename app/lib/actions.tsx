"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getAccessToken } from "@/utils/SessionTokenAccessor";
import { z } from "zod";

const FormSchema = z.object({
  firstName: z.string().toLowerCase(),
  lastName: z.string().toLowerCase(),
  email: z.string().email({
    message: "Please add your address email",
  }),
  projects: z.string(),
});

const FormSchemaService = z.object({
  region: z.string().min(1, { message: "region is required" }),
  cloudProvider: z.string().min(1, { message: "region is required" }).toLowerCase(),
  projects: z.string().min(1, { message: "region is required" }),
  envName: z.string().min(1, { message: "env name is required" }).max(7),
  overrideDns: z.string(),
  reconcile: z.string(),
  clusterSize: z.string().toLowerCase(),
});

const CreateUser = FormSchema.required({ email: true });

export type State = {
  errors?: {
    firstName?: string[];
    lastName?: string[];
    projects?: string[];
    email?: string[];
  };
  message?: string | null;
};

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

export async function createUser(prevState: State, formData: FormData) {
  const validatedFields = CreateUser.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    projects: formData.get("projects"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Users.",
    };
  }

  const { email, projects, lastName, firstName } = validatedFields.data;

  const postBody = {
    first_name: firstName,
    last_name: lastName,
    projects: [projects],
    email: email,
  };

  const url = `${process.env.BACKEND_URL}/api/v1/iam/users`;
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
      revalidatePath("/dashboard/users");
      redirect("/dashboard/users");
    }
  } catch (err) {
    return {
      message: "Failed to create user. Status" + err,
    };
  }
  revalidatePath("/dashboard/users");
  redirect("/dashboard/users");
}

export async function deleteUser(id: string) {
  const url = `${process.env.BACKEND_URL}/api/v1/iam/users/${id}`;
  let accessToken = await getAccessToken();
  try {
    const resp = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    });

    if (resp.ok) {
      revalidatePath("/dashboard/users");
      redirect("/dashboard/users");
    }
  } catch (err) {
    return {
      message: "Failed to create user. Status" + err,
    };
  }
  revalidatePath("/dashboard/users");
  redirect("/dashboard/users");
}

export async function createService( prevState: StateService, formData: FormData) {
  
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

  console.log(validatedFields)

  const { region, cloudProvider, projects, envName, overrideDns, reconcile, clusterSize } = validatedFields.data;

  const postBody = {
    
    "provider": {
      "cloud_provider": cloudProvider,
      "region": region,
      "project_id":  "opensee_ci" 
    },
    "project_name": projects,
    "env_name": envName,
    "cluster_size": clusterSize,
	  "provisioner_version": "v0.4.0",
		"reconcile": reconcile,
    "override_dns": overrideDns,
    "custom_specs" : {}
  };

  console.log(postBody);
}
