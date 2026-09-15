import { useEffect, useRef, useState } from "react";
import type { Issue } from "../types/project";
import { issueApi } from "../apiclient/issueapi";

export function useIssues() {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadIndex, setReloadIndex] = useState(0);

  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    abortControllerRef.current?.abort();
    const controller = new AbortController();
    abortControllerRef.current = controller;
    const loadIssues = async () => {
      try {
        const data = await issueApi.getAll({ signal: controller.signal });
        if (controller.signal.aborted) return;
        const rawItems = ((data as unknown) || []) as Record<string, unknown>[];

        const parsedIssues: Issue[] = rawItems.map((item) => ({
          ...item,
          id: String(item.id),
          title: String(item.title || ""),
          description: String(item.description || ""),
          projectId: String(item.projectId || ""),
          priority: item.priority as Issue["priority"],
          status: item.status as Issue["status"],
          assignedTo: String(item.assignedTo || "Unassigned"),
          label: item.label as Issue["label"],
          dueDate: item.dueDate ? new Date(String(item.dueDate)) : new Date(),
        }));
        
        setIssues(parsedIssues);
        setError(null);
      } catch (err: unknown) {
        const errorObject = err as Record<string, string> | null;
        if (errorObject?.name === "AbortError" || controller.signal.aborted)
          return;
        setError(
          err instanceof Error ? err.message : "Failed to fetch projects",
        );
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    };
    loadIssues();

    return () => controller.abort();
  }, [reloadIndex]);

  const refetch = () => {
    setIsLoading(true);
    setReloadIndex((n) => n + 1);
  };

  return {
    issues,
    isLoading,
    error,
    refetch,
  };
}
