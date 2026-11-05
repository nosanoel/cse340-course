import db from './db.js'

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

export { getAllProjects };
