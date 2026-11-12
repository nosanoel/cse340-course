// controllers/projects.js

// This controller gets upcoming project records from the model and renders the projects page.
import { getUpcomingProjects, getProjectDetails } from '../models/projects.js';
import { getCategoriesByProjectId } from '../models/categories.js';

// Show the next five upcoming projects on the main projects page.
const NUMBER_OF_UPCOMING_PROJECTS = 5;

// Render the project listing page with the next upcoming service opportunities.
const showProjectsPage = async (req, res) => {
  const projects = await getUpcomingProjects(NUMBER_OF_UPCOMING_PROJECTS);
  const title = 'Upcoming Service Projects';
  res.render('projects', { title, projects });
};

// Render the details page for one selected project.
const showProjectDetailsPage = async (req, res) => {
  const projectId = req.params.id;
  const project = await getProjectDetails(projectId);
  const categories = await getCategoriesByProjectId(projectId);
  const title = project ? project.title : 'Project Details';

  res.render('project', { title, project, categories });
};

// Export both project controllers so the router can use them.
export { showProjectsPage, showProjectDetailsPage };
