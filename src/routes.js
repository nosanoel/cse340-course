import express from 'express';

// Import the controller functions that respond to each page request.
import { showHomePage } from './controllers/index.js';
import {
    showOrganizationsPage,
    showOrganizationDetailsPage,
    showNewOrganizationForm,
    processNewOrganizationForm,
    showEditOrganizationForm,
    processEditOrganizationForm,
    organizationValidation
} from './controllers/organizations.js';
import {
    showProjectsPage,
    showProjectDetailsPage,
    showNewProjectForm,
    processNewProjectForm,
    showEditProjectForm,
    processEditProjectForm,
    projectValidation
} from './controllers/projects.js';
import {
    showCategoriesPage,
    showCategoryDetailsPage,
    showAssignCategoriesForm,
    processAssignCategoriesForm,
    showNewCategoryForm,
    processNewCategoryForm,
    showEditCategoryForm,
    processEditCategoryForm,
    categoryValidation
} from './controllers/categories.js';
import { testErrorPage } from './controllers/errors.js';

// Create a router to group all the application's route definitions.
const router = express.Router();

// Route for the home page.
router.get('/', showHomePage);

// Routes for the main listing pages.
router.get('/organizations', showOrganizationsPage);
router.get('/projects', showProjectsPage);
router.get('/categories', showCategoriesPage);
router.get('/organization/:id', showOrganizationDetailsPage);
router.get('/project/:id', showProjectDetailsPage);
router.get('/category/:id', showCategoryDetailsPage);

// Route for new organization page
router.get('/new-organization', showNewOrganizationForm);

// Route to handle new organization form submission
router.post('/new-organization', organizationValidation, processNewOrganizationForm);

// Route for the edit organization page
router.get('/edit-organization/:id', showEditOrganizationForm);

// Route to handle the edit organization form submission
router.post('/edit-organization/:id', organizationValidation, processEditOrganizationForm);

// Route for new project page
router.get('/new-project', showNewProjectForm);

// Route to handle new project form submission
router.post('/new-project', projectValidation, processNewProjectForm);

// Route for the edit project page
router.get('/edit-project/:id', showEditProjectForm);

// Route to handle edit project form submission
router.post('/edit-project/:id', projectValidation, processEditProjectForm);

// Routes to handle assigning categories to projects
router.get('/assign-categories/:projectId', showAssignCategoriesForm);
router.post('/assign-categories/:projectId', processAssignCategoriesForm);
router.get('/project/:projectId/assign-categories', showAssignCategoriesForm);
router.post('/project/:projectId/assign-categories', processAssignCategoriesForm);

// Route for the new category page
router.get('/new-category', showNewCategoryForm);

// Route to handle new category form submission
router.post('/new-category', categoryValidation, processNewCategoryForm);

// Route for the edit category page
router.get('/edit-category/:id', showEditCategoryForm);

// Route to handle edit category form submission
router.post('/edit-category/:id', categoryValidation, processEditCategoryForm);

// Route that intentionally triggers an application error for testing.
router.get('/test-error', testErrorPage);

// Export the router so server.js can mount it for the app.
export default router;
