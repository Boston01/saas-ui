'use client';

import { useEffect } from 'react';
import { redirect } from "next/navigation";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error
    console.error(error);
  }, [error]);

  return (
    <main className="flex h-full flex-col items-center justify-center">
      <h2 className='text-center'>Cannot list users in Keycloak!</h2>
      <button
        className='mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400'
        onClick={
        
            () => { 
              redirect("/dashboard/users")
            }
        }
      >
        Try again
      </button>
    </main>
  );
}