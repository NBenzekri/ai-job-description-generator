import { Metadata } from "next";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { PreviousGenerations } from "@/components/previous-generations";
import { UserProfile } from "@/components/user-profile";

export const metadata: Metadata = {
  title: "Dashboard | AI Job Description Generator",
  description: "View your previous generations and profile information",
};

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <div className="container mx-auto p-4 space-y-8">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <div className="grid gap-8 md:grid-cols-2">
        <PreviousGenerations />
        <UserProfile user={session.user} />
      </div>
    </div>
  );
}
