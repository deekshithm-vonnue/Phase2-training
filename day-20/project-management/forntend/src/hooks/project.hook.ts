import { useEffect, useRef, useState } from "react";
import type { Project } from "../types/project";
import { projectApi } from "../apiclient/projectapi";

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadIndex, setReloadIndex] = useState(0);

  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    abortControllerRef.current?.abort();
    const controller = new AbortController();
    abortControllerRef.current = controller;

    projectApi
      .getAll({ signal: controller.signal })
      .then((data) => {
        if (controller.signal.aborted) return;
        setProjects(data || []);
        setError(null);
      })
      .catch((err: unknown) => {
        const errorObject = err as Record<string, string> | null;
        if (errorObject?.name === "AbortError" || controller.signal.aborted)
          return;
        setError(
          err instanceof Error ? err.message : "Failed to fetch projects",
        );
      })
      .finally(() => {
        if (!controller.signal.aborted) setIsLoading(false);
      });

    return () => controller.abort();
  }, [reloadIndex]);

  const refetch = () => {
    setIsLoading(true);
    setReloadIndex((n) => n + 1);
  };

  return {
    projects,
    isLoading,
    error,
    refetch,
  };
}
