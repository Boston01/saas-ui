"use server";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { getAccessToken } from "@/utils/SessionTokenAccessor";
import { z } from 'zod';

const FormSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email({
    message: 'Please add your address email'
  }),
  projects: z.string(),
});

const CreateUser = FormSchema.required({email: true});


export type State = {
    errors?: {
      firstName?: string[],
      lastName?: string[],
      projects?: string[],
      email?: string[]
    };
    message?: string | null;
};

export async function createUser(prevState: State, formData: FormData) {
  
    const validatedFields = CreateUser.safeParse({
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        email: formData.get('email'),
        projects: formData.get('projects'),
    })

    if(!validatedFields.success) {
      return {
          errors: validatedFields.error.flatten().fieldErrors,
          message: 'Missing Fields. Failed to Create Users.',
      }
    }

    const { email, projects, lastName, firstName } = validatedFields.data;

    const postBody = {
      first_name: firstName, 
      last_name: lastName, 
      projects: [projects], 
      email: email
    }

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
        redirect('/dashboard/users');
      }
    } catch (err) {
      return {
        message: "Failed to create user. Status" + err,
      }
    }  
    revalidatePath('/dashboard/users');
    redirect('/dashboard/users');
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
        redirect('/dashboard/users');
      }
    } catch (err) {
      return {
        message: "Failed to create user. Status" + err,
      }
    }  
    revalidatePath('/dashboard/users');
    redirect('/dashboard/users');
  }

  