import db from './db.js'

// Retrieve every project from the database, along with the organization name and category names.
const getAllProjects = async() => {
    const query = `
        SELECT
            p.project_id,
            p.title,
            p.description,
            p.location,
            p.project_date,
            o.name AS organization_name,
            STRING_AGG(c.name, ', ' ORDER BY c.name) AS category_names
        FROM public.project p
        INNER JOIN public.organization o ON p.organization_id = o.organization_id
        LEFT JOIN public.project_category pc ON p.project_id = pc.project_id
        LEFT JOIN public.category c ON pc.category_id = c.category_id
        GROUP BY p.project_id, p.title, p.description, p.location, p.project_date, o.name
        ORDER BY p.project_date;
    `;

    const result = await db.query(query);

    return result.rows;
}

// Get all projects for a specific organization so the organization details page can list them.
const getProjectsByOrganizationId = async (organizationId) => {
      const query = `
        SELECT
          project_id,
          organization_id,
          title,
          description,
          location,
          project_date AS date
        FROM public.project
        WHERE organization_id = $1
        ORDER BY project_date;
      `;
      
      const queryParams = [organizationId];
      const result = await db.query(query, queryParams);

      return result.rows;
};

// Fetch the next N upcoming projects from today forward, ordered from nearest to farthest in the future.
const getUpcomingProjects = async (number_of_projects) => {
    const query = `
        SELECT
            p.project_id,
            p.title,
            p.description,
            p.project_date AS date,
            p.location,
            p.organization_id,
            o.name AS organization_name
        FROM public.project p
        INNER JOIN public.organization o ON p.organization_id = o.organization_id
        WHERE p.project_date >= CURRENT_DATE
        ORDER BY p.project_date ASC
        LIMIT $1;
    `;

    const result = await db.query(query, [number_of_projects]);
    return result.rows;
};

// Retrieve a single project by its primary key so the project details page can display it.
const getProjectDetails = async (id) => {
    const query = `
        SELECT
            p.project_id,
            p.title,
            p.description,
            p.project_date AS date,
            p.location,
            p.organization_id,
            o.name AS organization_name
        FROM public.project p
        INNER JOIN public.organization o ON p.organization_id = o.organization_id
        WHERE p.project_id = $1;
    `;

    const result = await db.query(query, [id]);
    return result.rows.length > 0 ? result.rows[0] : null;
};

// Insert a new service project and return the generated project ID.
const createProject = async (title, description, location, date, organizationId) => {
    const query = `
        INSERT INTO project (title, description, location, project_date, organization_id)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING project_id;
    `;

    const queryParams = [title, description, location, date, organizationId];
    const result = await db.query(query, queryParams);

    if (result.rows.length === 0) {
        throw new Error('Failed to create project');
    }

    if (process.env.ENABLE_SQL_LOGGING === 'true') {
        console.log('Created new project with ID:', result.rows[0].project_id);
    }

    return result.rows[0].project_id;
};

// Update an existing service project and return its project ID.
const updateProject = async (projectId, title, description, location, date, organizationId) => {
    const query = `
        UPDATE project
        SET title = $1,
            description = $2,
            location = $3,
            project_date = $4,
            organization_id = $5
        WHERE project_id = $6
        RETURNING project_id;
    `;

    const queryParams = [title, description, location, date, organizationId, projectId];
    const result = await db.query(query, queryParams);

    if (result.rows.length === 0) {
        throw new Error('Project not found');
    }

    if (process.env.ENABLE_SQL_LOGGING === 'true') {
        console.log('Updated project with ID:', projectId);
    }

    return result.rows[0].project_id;
};

// Export all project-related model functions so controllers can use them.
export { getAllProjects, getProjectsByOrganizationId, getUpcomingProjects, getProjectDetails, createProject, updateProject };
