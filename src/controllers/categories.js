// controllers/categories.js

// This controller fetches all categories from the model and renders the categories page.
import {
  getAllCategories,
  getCategoryById,
  getProjectsByCategoryId,
  getCategoriesByProjectId,
  updateCategoryAssignments,
  createCategory,
  updateCategory
} from '../models/categories.js';
import { getProjectDetails } from '../models/projects.js';
import { body, validationResult } from 'express-validator';

// Render the page that lists all available categories.
const showCategoriesPage = async (req, res) => {
  const categories = await getAllCategories();
  const title = 'Categories';
  res.render('categories', { title, categories });
};

// Render the details page for a single category and the projects in that category.
const showCategoryDetailsPage = async (req, res) => {
  const categoryId = req.params.id;
  const category = await getCategoryById(categoryId);
  const projects = await getProjectsByCategoryId(categoryId);
  const title = category ? category.name : 'Category Details';

  res.render('category', { title, category, projects });
};

// Render the form for assigning categories to a project.
const showAssignCategoriesForm = async (req, res) => {
  const projectId = req.params.projectId;

  const projectDetails = await getProjectDetails(projectId);
  const categories = await getAllCategories();
  const assignedCategories = await getCategoriesByProjectId(projectId);

  const title = 'Assign Categories to Project';
  res.render('assign-categories', { title, projectId, projectDetails, categories, assignedCategories });
};

// Process submitted category assignments for a project.
const processAssignCategoriesForm = async (req, res) => {
  const projectId = req.params.projectId;
  const selectedCategoryIds = req.body.categoryIds || [];
  const categoryIdsArray = Array.isArray(selectedCategoryIds) ? selectedCategoryIds : [selectedCategoryIds];

  await updateCategoryAssignments(projectId, categoryIdsArray);
  req.flash('success', 'Categories updated successfully.');
  res.redirect(`/project/${projectId}`);
};

// Validation and sanitization rules for create and edit category forms.
const categoryValidation = [
  body('name')
    .trim()
    .notEmpty().withMessage('Category name is required')
    .isLength({ min: 3, max: 100 }).withMessage('Category name must be between 3 and 100 characters')
    .escape()
];

// Render the form for creating a category.
const showNewCategoryForm = async (req, res) => {
  const title = 'Add New Category';
  res.render('new-category', { title });
};

// Process submission of the create category form.
const processNewCategoryForm = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errors.array().forEach((error) => req.flash('error', error.msg));
    return res.redirect('/new-category');
  }

  await createCategory(req.body.name);
  req.flash('success', 'Category created successfully!');
  res.redirect('/categories');
};

// Render the form for editing an existing category.
const showEditCategoryForm = async (req, res) => {
  const categoryId = req.params.id;
  const category = await getCategoryById(categoryId);
  const title = 'Edit Category';

  res.render('edit-category', { title, category, categoryId });
};

// Process submission of the edit category form.
const processEditCategoryForm = async (req, res) => {
  const categoryId = req.params.id;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    errors.array().forEach((error) => req.flash('error', error.msg));
    return res.redirect(`/edit-category/${categoryId}`);
  }

  await updateCategory(categoryId, req.body.name);
  req.flash('success', 'Category updated successfully!');
  res.redirect(`/category/${categoryId}`);
};

// Export the categories controllers so the router can use them.
export {
  showCategoriesPage,
  showCategoryDetailsPage,
  showAssignCategoriesForm,
  processAssignCategoriesForm,
  showNewCategoryForm,
  processNewCategoryForm,
  showEditCategoryForm,
  processEditCategoryForm,
  categoryValidation
};
