import { useEffect, useState } from "react";
import mockData from "../../mockdata.json";
import { EmptyState } from "../components/EmptyState";
import ProjectCard from "../components/ProjectCard";
import type{ Project } from "../types/project";
import { projectApi } from "../apiclient/projectapi";

export default function RenderProjectList() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true);
        const data = await projectApi.getAll();
        setProjects(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load projects",
        );
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);
  if (mockData.projects.length == 0) {
    return (
      <div className="empty-project">
        <EmptyState type="projects" />
      </div>
    );
  }
  // console.log(projects)
    if (loading) return <div className="loading-state"></div>;
  if (error) return <div className="error-state">UNAVAIL</div>;

  return (
    <div className="project-page-layout">
      {Array.from(projects).map((project) => (
        <ProjectCard
          key={project.id}
          title={project.title}
          description={project.description}
          priority={project.priority as "Urgent" | "High" | "Medium" | "Low"}
          dueDate={project.dueDate ? new Date(project.dueDate) : undefined}
        />
      ))}
    </div>
  );
}
