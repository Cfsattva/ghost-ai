"use client";

import { useState } from "react";

export interface Project {
  id: string;
  name: string;
  slug: string;
  isOwner: boolean;
}

const MOCK_PROJECTS: Project[] = [
  { id: "1", name: "Checkout Redesign", slug: "checkout-redesign", isOwner: true },
  { id: "2", name: "Notification Service", slug: "notification-service", isOwner: true },
  { id: "3", name: "Payments Platform", slug: "payments-platform", isOwner: false },
];

type ProjectDialogState =
  | { type: "create" }
  | { type: "rename"; project: Project }
  | { type: "delete"; project: Project }
  | null;

function slugify(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function useProjectDialogs() {
  const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS);
  const [dialog, setDialog] = useState<ProjectDialogState>(null);
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function openCreateDialog() {
    setName("");
    setDialog({ type: "create" });
  }

  function openRenameDialog(project: Project) {
    setName(project.name);
    setDialog({ type: "rename", project });
  }

  function openDeleteDialog(project: Project) {
    setDialog({ type: "delete", project });
  }

  function closeDialog() {
    setDialog(null);
    setName("");
  }

  async function createProject() {
    const trimmed = name.trim();
    if (!trimmed) return;

    setIsLoading(true);
    setProjects((prev) => [
      ...prev,
      { id: crypto.randomUUID(), name: trimmed, slug: slugify(trimmed), isOwner: true },
    ]);
    setIsLoading(false);
    closeDialog();
  }

  async function renameProject() {
    if (dialog?.type !== "rename") return;
    const trimmed = name.trim();
    if (!trimmed) return;

    setIsLoading(true);
    const projectId = dialog.project.id;
    setProjects((prev) =>
      prev.map((project) =>
        project.id === projectId
          ? { ...project, name: trimmed, slug: slugify(trimmed) }
          : project
      )
    );
    setIsLoading(false);
    closeDialog();
  }

  async function deleteProject() {
    if (dialog?.type !== "delete") return;

    setIsLoading(true);
    const projectId = dialog.project.id;
    setProjects((prev) => prev.filter((project) => project.id !== projectId));
    setIsLoading(false);
    closeDialog();
  }

  return {
    projects,
    dialog,
    name,
    setName,
    slugPreview: slugify(name),
    isLoading,
    openCreateDialog,
    openRenameDialog,
    openDeleteDialog,
    closeDialog,
    createProject,
    renameProject,
    deleteProject,
  };
}

export type UseProjectDialogsResult = ReturnType<typeof useProjectDialogs>;
