
import { Suspense } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import ProfileForm from "./ProfileForm";

async function ProfileContent() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/signin");
  }

  return <ProfileForm user={session.user} />;
}

export default function ProfilePage() {
  return (
    <Suspense
      fallback={
        <div className="p-10 text-center">Loading profile...</div>
      }
    >
      <ProfileContent />
    </Suspense>
  );
}
