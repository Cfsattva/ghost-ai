import { prisma } from "@/lib/prisma";

export interface ProjectSummary {
  id: string;
  name: string;
}

const ROOM_ID_PATTERN = /^[a-z0-9]+(-[a-z0-9]+)*$/;

export function parseProjectName(body: unknown): string | null {
  if (body && typeof body === "object" && "name" in body) {
    const value = (body as { name?: unknown }).name;
    if (typeof value === "string") {
      const trimmed = value.trim();
      return trimmed.length > 0 ? trimmed : null;
    }
  }

  return null;
}

export function parseProjectId(body: unknown): string | null {
  if (body && typeof body === "object" && "id" in body) {
    const value = (body as { id?: unknown }).id;
    if (typeof value === "string" && value.length <= 128 && ROOM_ID_PATTERN.test(value)) {
      return value;
    }
  }

  return null;
}

export function getOwnedProjects(userId: string): Promise<ProjectSummary[]> {
  return prisma.project.findMany({
    where: { ownerId: userId },
    orderBy: { createdAt: "desc" },
    select: { id: true, name: true },
  });
}

export function getSharedProjects(email: string | null): Promise<ProjectSummary[]> {
  if (!email) return Promise.resolve([]);

  return prisma.project.findMany({
    where: { collaborators: { some: { email } } },
    orderBy: { createdAt: "desc" },
    select: { id: true, name: true },
  });
}

export async function getWorkspaceProject(
  projectId: string,
  { userId, email }: { userId: string; email: string | null }
): Promise<ProjectSummary | null> {
  const project = await prisma.project.findUnique({
    where: { id: projectId },
    select: {
      id: true,
      name: true,
      ownerId: true,
      collaborators: { where: { email: email ?? "" }, select: { id: true } },
    },
  });

  if (!project) return null;

  const isOwner = project.ownerId === userId;
  const isCollaborator = project.collaborators.length > 0;
  if (!isOwner && !isCollaborator) return null;

  return { id: project.id, name: project.name };
}
