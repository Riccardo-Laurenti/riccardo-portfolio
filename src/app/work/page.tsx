import ProjectsGrid from "./ProjectsGrid";
import { fetchProjects } from "../sanity/queries/fetchProjects";

export const revalidate = 60; 

export default async function WorkPage() {
  const projects = await fetchProjects();
  return <ProjectsGrid projects={projects} />;
}
