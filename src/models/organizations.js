import db from './db.js'

// Retrieve every organization from the database to show the organizations listing page.
const getAllOrganizations = async() => {
    const query = `
        SELECT organization_id, name, description, contact_email, logo_filename
      FROM public.organization;
    `;

    const result = await db.query(query);

    return result.rows;
}

// Retrieve one organization by its ID for the organization details page.
const getOrganizationDetails = async (organizationId) => {
      const query = `
      SELECT
        organization_id,
        name,
        description,
        contact_email,
        logo_filename
      FROM public.organization
      WHERE organization_id = $1;
    `;

      const queryParams = [organizationId];
      const result = await db.query(query, queryParams);

      // Return the first row of the result set, or null if no rows are found.
      return result.rows.length > 0 ? result.rows[0] : null;
};

// Export organization model functions so the controllers can use them.
export { getAllOrganizations, getOrganizationDetails };