import express from 'express';

// Import the controller functions that respond to each page request.
import { showHomePage } from './controllers/index.js';
import { showOrganizationsPage, showOrganizationDetailsPage } from './controllers/organizations.js';
import { showProjectsPage, showProjectDetailsPage } from './controllers/projects.js';
import { showCategoriesPage, showCategoryDetailsPage } from './controllers/categories.js';
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

// Route that intentionally triggers an application error for testing.
router.get('/test-error', testErrorPage);

// Export the router so server.js can mount it for the app.
export default router;
