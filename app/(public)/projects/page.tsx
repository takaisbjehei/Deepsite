import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { apiServer } from "@/lib/api";
import MY_TOKEN_KEY from "@/lib/get-cookie-name";
import { MyProjects } from "@/components/my-projects";

async function getMyProjects() {
  const cookieStore = await cookies();
  const token = cookieStore.get(MY_TOKEN_KEY())?.value;
  if (!token) return { redirectUrl: true, projects: [] };
  try {
    const { data } = await apiServer.get("/me/projects", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return {
      projects: data.projects,
    };
  } catch {
    return { projects: [] };
  }
}
export default async function ProjectsPage() {
  const { redirectUrl, projects } = await getMyProjects();
  if (redirectUrl) {
    redirect("/");
  }

  return <MyProjects projects={projects} />;
}
