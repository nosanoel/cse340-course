// controllers/categories.js

// This controller fetches all categories from the model and renders the categories page.
import { getAllCategories, getCategoryById, getProjectsByCategoryId } from '../models/categories.js';

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

// Export the categories controllers so the router can use them.
export { showCategoriesPage, showCategoryDetailsPage };
