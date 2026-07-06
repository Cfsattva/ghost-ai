import { auth, currentUser } from "@clerk/nextjs/server";
import { notFound, redirect } from "next/navigation";

import { EditorShell } from "@/components/editor/editor-shell";
import {
  getOwnedProjects,
  getSharedProjects,
  getWorkspaceProject,
} from "@/lib/projects";

export default async function ProjectWorkspacePage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const { projectId } = await params;
  const user = await currentUser();
  const email = user?.primaryEmailAddress?.emailAddress ?? null;

  const project = await getWorkspaceProject(projectId, { userId, email });

  if (!project) {
    notFound();
  }

  const [ownedProjects, sharedProjects] = await Promise.all([
    getOwnedProjects(userId),
    getSharedProjects(email),
  ]);

  return (
    <EditorShell ownedProjects={ownedProjects} sharedProjects={sharedProjects}>
      <div className="flex flex-1 flex-col items-center justify-center gap-2 px-4 text-center">
        <h1 className="text-xl font-medium text-copy-primary">
          {project.name}
        </h1>
        <p className="text-sm text-copy-muted">Canvas coming soon.</p>
      </div>
    </EditorShell>
  );
}
