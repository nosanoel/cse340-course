import db from './db.js'

// Retrieve every category from the database to show the categories listing page.
const getAllCategories = async() => {
    const query = `
        SELECT category_id, name
        FROM public.category
        ORDER BY category_id;
    `;

    const result = await db.query(query);

    return result.rows;
}

// Retrieve one category by its ID for the category details page.
const getCategoryById = async (categoryId) => {
    const query = `
        SELECT
            category_id,
            name
        FROM public.category
        WHERE category_id = $1;
    `;

    const result = await db.query(query, [categoryId]);

    return result.rows.length > 0 ? result.rows[0] : null;
};

// Retrieve all categories associated with a specific service project.
const getCategoriesByProjectId = async (projectId) => {
    const query = `
        SELECT
            c.category_id,
            c.name
        FROM public.project_category pc
        INNER JOIN public.category c ON pc.category_id = c.category_id
        WHERE pc.project_id = $1
        ORDER BY c.name;
    `;

    const result = await db.query(query, [projectId]);

    return result.rows;
};

// Retrieve all service projects associated with a specific category.
const getProjectsByCategoryId = async (categoryId) => {
    const query = `
        SELECT
            p.project_id,
            p.title,
            p.description,
            p.location,
            p.project_date AS date,
            p.organization_id,
            o.name AS organization_name
        FROM public.project p
        INNER JOIN public.organization o ON p.organization_id = o.organization_id
        INNER JOIN public.project_category pc ON p.project_id = pc.project_id
        WHERE pc.category_id = $1
        ORDER BY p.project_date ASC;
    `;

    const result = await db.query(query, [categoryId]);

    return result.rows;
};

// Assign one category to one project in the many-to-many relationship table.
const assignCategoryToProject = async (categoryId, projectId) => {
    const query = `
        INSERT INTO project_category (category_id, project_id)
        VALUES ($1, $2);
    `;

    await db.query(query, [categoryId, projectId]);
};

// Replace all category assignments for a project.
const updateCategoryAssignments = async (projectId, categoryIds) => {
    const deleteQuery = `
        DELETE FROM project_category
        WHERE project_id = $1;
    `;
    await db.query(deleteQuery, [projectId]);

    for (const categoryId of categoryIds) {
        await assignCategoryToProject(categoryId, projectId);
    }
};

// Insert a new category and return its generated ID.
const createCategory = async (name) => {
    const query = `
        INSERT INTO category (name)
        VALUES ($1)
        RETURNING category_id;
    `;

    const result = await db.query(query, [name]);

    if (result.rows.length === 0) {
        throw new Error('Failed to create category');
    }

    if (process.env.ENABLE_SQL_LOGGING === 'true') {
        console.log('Created new category with ID:', result.rows[0].category_id);
    }

    return result.rows[0].category_id;
};

// Update an existing category and return its ID.
const updateCategory = async (categoryId, name) => {
    const query = `
        UPDATE category
        SET name = $1
        WHERE category_id = $2
        RETURNING category_id;
    `;

    const result = await db.query(query, [name, categoryId]);

    if (result.rows.length === 0) {
        throw new Error('Category not found');
    }

    if (process.env.ENABLE_SQL_LOGGING === 'true') {
        console.log('Updated category with ID:', categoryId);
    }

    return result.rows[0].category_id;
};

// Export category model functions so the controllers can use them.
export {
    getAllCategories,
    getCategoryById,
    getCategoriesByProjectId,
    getProjectsByCategoryId,
    updateCategoryAssignments,
    createCategory,
    updateCategory
};
