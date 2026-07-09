"use client";

import Link from "next/link";
import { MoreVertical, Pencil, Plus, Trash2, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { ProjectSummary } from "@/lib/projects";
import { cn } from "@/lib/utils";

interface ProjectSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  ownedProjects: ProjectSummary[];
  sharedProjects: ProjectSummary[];
  onCreateProject: () => void;
  onRenameProject: (project: ProjectSummary) => void;
  onDeleteProject: (project: ProjectSummary) => void;
}

function ProjectListItem({
  project,
  actions,
}: {
  project: ProjectSummary;
  actions?: { onRename: () => void; onDelete: () => void };
}) {
  return (
    <div className="group flex items-center justify-between gap-2 rounded-xl px-2.5 py-1.5 hover:bg-subtle">
      <Link
        href={`/editor/${project.id}`}
        className="truncate text-sm text-copy-primary"
      >
        {project.name}
      </Link>
      {actions && (
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                variant="ghost"
                size="icon-sm"
                aria-label={`Actions for ${project.name}`}
              />
            }
          >
            <MoreVertical className="h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={actions.onRename}>
              <Pencil className="h-4 w-4" />
              Rename
            </DropdownMenuItem>
            <DropdownMenuItem variant="destructive" onClick={actions.onDelete}>
              <Trash2 className="h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
}

export function ProjectSidebar({
  isOpen,
  onClose,
  ownedProjects,
  sharedProjects,
  onCreateProject,
  onRenameProject,
  onDeleteProject,
}: ProjectSidebarProps) {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/60 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      <aside
        inert={!isOpen ? true : undefined}
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-80 flex-col border-r border-surface-border bg-surface transition-transform duration-200 ease-out",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between border-b border-surface-border px-4 py-3">
          <h2 className="text-sm font-medium text-copy-primary">Projects</h2>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={onClose}
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <Tabs
          defaultValue="my-projects"
          className="flex flex-1 flex-col overflow-hidden px-4 pt-3"
        >
          <TabsList className="w-full">
            <TabsTrigger value="my-projects" className="flex-1">
              My Projects
            </TabsTrigger>
            <TabsTrigger value="shared" className="flex-1">
              Shared
            </TabsTrigger>
          </TabsList>
          <TabsContent
            value="my-projects"
            className="flex flex-1 flex-col overflow-y-auto py-2"
          >
            {ownedProjects.length > 0 ? (
              <div className="flex flex-col gap-0.5">
                {ownedProjects.map((project) => (
                  <ProjectListItem
                    key={project.id}
                    project={project}
                    actions={{
                      onRename: () => onRenameProject(project),
                      onDelete: () => onDeleteProject(project),
                    }}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-1 items-center justify-center">
                <p className="text-sm text-copy-muted">No projects yet</p>
              </div>
            )}
          </TabsContent>
          <TabsContent
            value="shared"
            className="flex flex-1 flex-col overflow-y-auto py-2"
          >
            {sharedProjects.length > 0 ? (
              <div className="flex flex-col gap-0.5">
                {sharedProjects.map((project) => (
                  <ProjectListItem key={project.id} project={project} />
                ))}
              </div>
            ) : (
              <div className="flex flex-1 items-center justify-center">
                <p className="text-sm text-copy-muted">No shared projects</p>
              </div>
            )}
          </TabsContent>
        </Tabs>

        <div className="border-t border-surface-border p-4">
          <Button className="w-full" onClick={onCreateProject}>
            <Plus className="h-4 w-4" />
            New Project
          </Button>
        </div>
      </aside>
    </>
  );
}
