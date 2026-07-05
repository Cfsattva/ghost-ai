"use client";

import {
  EditorDialog,
  EditorDialogContent,
  EditorDialogDescription,
  EditorDialogFooter,
  EditorDialogHeader,
  EditorDialogTitle,
} from "@/components/editor/editor-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { UseProjectDialogsResult } from "@/hooks/use-project-dialogs";

interface ProjectDialogsProps {
  state: UseProjectDialogsResult;
}

export function ProjectDialogs({ state }: ProjectDialogsProps) {
  const {
    dialog,
    name,
    setName,
    slugPreview,
    isLoading,
    closeDialog,
    createProject,
    renameProject,
    deleteProject,
  } = state;

  return (
    <>
      <EditorDialog
        open={dialog?.type === "create"}
        onOpenChange={(open) => !open && closeDialog()}
      >
        <EditorDialogContent>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              void createProject();
            }}
          >
            <EditorDialogHeader>
              <EditorDialogTitle>New project</EditorDialogTitle>
              <EditorDialogDescription>
                Name your architecture workspace.
              </EditorDialogDescription>
            </EditorDialogHeader>
            <div className="flex flex-col gap-2 py-4">
              <Input
                autoFocus
                placeholder="Project name"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
              <p className="text-sm text-copy-muted">
                /{slugPreview || "project-slug"}
              </p>
            </div>
            <EditorDialogFooter>
              <Button type="submit" disabled={!name.trim() || isLoading}>
                Create project
              </Button>
            </EditorDialogFooter>
          </form>
        </EditorDialogContent>
      </EditorDialog>

      <EditorDialog
        open={dialog?.type === "rename"}
        onOpenChange={(open) => !open && closeDialog()}
      >
        <EditorDialogContent>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              void renameProject();
            }}
          >
            <EditorDialogHeader>
              <EditorDialogTitle>Rename project</EditorDialogTitle>
              <EditorDialogDescription>
                {dialog?.type === "rename"
                  ? `Renaming "${dialog.project.name}"`
                  : null}
              </EditorDialogDescription>
            </EditorDialogHeader>
            <div className="py-4">
              <Input
                autoFocus
                placeholder="Project name"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>
            <EditorDialogFooter>
              <Button type="submit" disabled={!name.trim() || isLoading}>
                Save
              </Button>
            </EditorDialogFooter>
          </form>
        </EditorDialogContent>
      </EditorDialog>

      <EditorDialog
        open={dialog?.type === "delete"}
        onOpenChange={(open) => !open && closeDialog()}
      >
        <EditorDialogContent>
          <EditorDialogHeader>
            <EditorDialogTitle>Delete project</EditorDialogTitle>
            <EditorDialogDescription>
              {dialog?.type === "delete"
                ? `This will permanently delete "${dialog.project.name}". This action cannot be undone.`
                : null}
            </EditorDialogDescription>
          </EditorDialogHeader>
          <EditorDialogFooter>
            <Button
              variant="destructive"
              disabled={isLoading}
              onClick={() => void deleteProject()}
            >
              Delete project
            </Button>
          </EditorDialogFooter>
        </EditorDialogContent>
      </EditorDialog>
    </>
  );
}
