import * as React from "react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

function EditorDialogContent({
  className,
  ...props
}: React.ComponentProps<typeof DialogContent>) {
  return (
    <DialogContent
      className={cn(
        "rounded-3xl border border-surface-border bg-elevated text-copy-primary",
        className
      )}
      {...props}
    />
  );
}

function EditorDialogFooter({
  className,
  ...props
}: React.ComponentProps<typeof DialogFooter>) {
  return (
    <DialogFooter
      className={cn(
        "rounded-b-3xl border-surface-border bg-elevated",
        className
      )}
      {...props}
    />
  );
}

export {
  Dialog as EditorDialog,
  DialogTrigger as EditorDialogTrigger,
  DialogClose as EditorDialogClose,
  EditorDialogContent,
  DialogHeader as EditorDialogHeader,
  DialogTitle as EditorDialogTitle,
  DialogDescription as EditorDialogDescription,
  EditorDialogFooter,
};
