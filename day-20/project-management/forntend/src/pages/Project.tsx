import { EmptyState } from "../components/EmptyState";
import ProjectCard from "../components/ProjectCard";
import { useProjects } from "../hooks/project.hook";

export default function RenderProjectList() {
  const { projects, isLoading, error, refetch } = useProjects();

  if (isLoading) return <div className="loading-state"></div>;
  if (error)
    return (
      <div className="error-state">
        <p>Error: {error}</p>
        <button onClick={refetch}>Try Again</button>
      </div>
    );

  if (Array.from(projects).length == 0) {
    return (
      <div className="empty-project">
        <EmptyState type="projects" />
      </div>
    );
  }
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
