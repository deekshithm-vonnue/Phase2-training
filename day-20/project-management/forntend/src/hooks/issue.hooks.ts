import { useEffect, useRef, useState } from "react";
import type{ Issue } from "../types/project";
import { issueApi } from "../apiclient/issueapi";

export function useIssue(issueId: string | undefined) {
  const [issue, setIssue] = useState<Issue | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadIndex, setReloadIndex] = useState(0);

  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (!issueId) {
      return;
    }

    abortControllerRef.current?.abort();
    const controller = new AbortController();
    abortControllerRef.current = controller;

    const loadSingleIssue = async () => {
      try {
        const data = await issueApi.getById(issueId, {
          signal: controller.signal,
        });
        if (controller.signal.aborted) return;

        if (!data) {
          setError("Issue not found");
          return;
        }

        const RawItem = data as unknown as Record<string, unknown>;
        const parsedIssue: Issue = {
          ...RawItem,
          id: String(RawItem.id),
          title: String(RawItem.title || ""),
          description: String(RawItem.description || ""),
          projectId: String(RawItem.projectId || ""),
          priority: RawItem.priority as Issue["priority"],
          status: RawItem.status as Issue["status"],
          assignedTo: String(RawItem.assignedTo || "Unassigned"),
          label: RawItem.label as Issue["label"],
          dueDate: RawItem.dueDate
            ? new Date(String(RawItem.dueDate))
            : new Date(),
        };
        setIssue(parsedIssue);
        setError(null);
      } catch (err: unknown) {
        const errorObject = err as Record<string, string> | null;
        if (errorObject?.name === "AbortError" || controller.signal.aborted) {
          return;
        }
        setError(
          err instanceof Error ? err.message : "Failed to fetch the issue",
        );
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    loadSingleIssue();

    return () => controller.abort();
  }, [issueId, reloadIndex]);

  const refetch = () => {
    setIsLoading(true);
    setReloadIndex((n) => n + 1);
  };

  return {
    issue,
    isLoading,
    error,
    refetch,
  };
}
