"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

import type { ProjectSummary } from "@/lib/projects";

type ProjectDialogState =
  | { type: "create" }
  | { type: "rename"; project: ProjectSummary }
  | { type: "delete"; project: ProjectSummary }
  | null;

function slugify(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function generateSuffix(): string {
  return crypto.randomUUID().replace(/-/g, "").slice(0, 6);
}

export function useProjectActions() {
  const router = useRouter();
  const pathname = usePathname();

  const [dialog, setDialog] = useState<ProjectDialogState>(null);
  const [name, setName] = useState("");
  const [roomSuffix, setRoomSuffix] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function openCreateDialog() {
    setName("");
    setRoomSuffix(generateSuffix());
    setDialog({ type: "create" });
  }

  function openRenameDialog(project: ProjectSummary) {
    setName(project.name);
    setDialog({ type: "rename", project });
  }

  function openDeleteDialog(project: ProjectSummary) {
    setDialog({ type: "delete", project });
  }

  function closeDialog() {
    setDialog(null);
    setName("");
  }

  const slug = slugify(name) || "project";
  const roomIdPreview = `${slug}-${roomSuffix}`;

  async function createProject() {
    const trimmed = name.trim();
    if (!trimmed) return;

    setIsLoading(true);
    try {
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: roomIdPreview, name: trimmed }),
      });
      if (!response.ok) return;

      const project = (await response.json()) as ProjectSummary;
      closeDialog();
      router.push(`/editor/${project.id}`);
    } finally {
      setIsLoading(false);
    }
  }

  async function renameProject() {
    if (dialog?.type !== "rename") return;
    const trimmed = name.trim();
    if (!trimmed) return;

    setIsLoading(true);
    try {
      const response = await fetch(`/api/projects/${dialog.project.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: trimmed }),
      });
      if (!response.ok) return;

      closeDialog();
      router.refresh();
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteProject() {
    if (dialog?.type !== "delete") return;

    setIsLoading(true);
    try {
      const projectId = dialog.project.id;
      const response = await fetch(`/api/projects/${projectId}`, {
        method: "DELETE",
      });
      if (!response.ok) return;

      closeDialog();
      const isActiveWorkspace = pathname === `/editor/${projectId}`;
      if (isActiveWorkspace) {
        router.push("/editor");
      } else {
        router.refresh();
      }
    } finally {
      setIsLoading(false);
    }
  }

  return {
    dialog,
    name,
    setName,
    slugPreview: roomIdPreview,
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

export type UseProjectActionsResult = ReturnType<typeof useProjectActions>;
