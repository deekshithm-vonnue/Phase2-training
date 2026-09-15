import mockData from "../../mockdata.json";
import { EmptyState } from "../components/EmptyState";
import ProjectCard from "../components/ProjectCard";

export default function RenderProjectList() {
  if (mockData.projects.length == 0) {
    return (
      <div className="empty-project">
        <EmptyState type="projects" />
      </div>
    );
  }
  return (
    <div className="project-page-layout">
      {mockData.projects.map((project) => (
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
