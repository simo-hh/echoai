"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const Page = () => {

  const { data: session } = authClient.useSession();
  const router = useRouter();

  if (!session) {
    return (
      <p>Loading ...</p>
    );
  }

  return (
    <div className="flex flex-col p-4 gap-y-4">
        <h1 className="text-2xl">Welcome, {session.user.name}!</h1>
        <Button onClick={() => authClient.signOut({fetchOptions: {onSuccess: () => router.push("/sign-in")}})}>Sign Out</Button>
      </div>
  )
}

export default Page;