DROP TABLE IF EXISTS project_category;
DROP TABLE IF EXISTS project;
DROP TABLE IF EXISTS category;
DROP TABLE IF EXISTS organization;

-- ========================================
-- Organization Table
-- ========================================
CREATE TABLE organization (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    logo_filename VARCHAR(255) NOT NULL
);

-- ========================================
-- Category Table
-- ========================================
CREATE TABLE category (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

-- ========================================
-- Project Table
-- ========================================
CREATE TABLE project (
    project_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE,
    organization_id INTEGER NOT NULL,
    CONSTRAINT fk_project_organization
        FOREIGN KEY (organization_id)
        REFERENCES organization(organization_id)
        ON DELETE CASCADE
);

-- ========================================
-- Project-Category Association Table
-- ========================================
CREATE TABLE project_category (
    project_id INTEGER NOT NULL,
    category_id INTEGER NOT NULL,
    PRIMARY KEY (project_id, category_id),
    CONSTRAINT fk_project_category_project
        FOREIGN KEY (project_id)
        REFERENCES project(project_id)
        ON DELETE CASCADE,
    CONSTRAINT fk_project_category_category
        FOREIGN KEY (category_id)
        REFERENCES category(category_id)
        ON DELETE RESTRICT
);

-- ========================================
-- Insert sample data: Organizations
-- ========================================
INSERT INTO organization (name, description, contact_email, logo_filename)
VALUES
('BrightFuture Builders', 'A nonprofit focused on improving community infrastructure through sustainable construction projects.', 'info@brightfuturebuilders.org', 'brightfuture-logo.png'),
('GreenHarvest Growers', 'An urban farming collective promoting food sustainability and education in local neighborhoods.', 'contact@greenharvest.org', 'greenharvest-logo.png'),
('UnityServe Volunteers', 'A volunteer coordination group supporting local charities and service initiatives.', 'hello@unityserve.org', 'unityserve-logo.png');

-- ========================================
-- Insert sample data: Categories
-- ========================================
INSERT INTO category (name)
VALUES
('Environmental'),
('Educational'),
('Community Service'),
('Health and Wellness');

-- ========================================
-- Insert sample data: Projects
-- ========================================
INSERT INTO project (name, description, start_date, end_date, organization_id)
VALUES
('Park Cleanup Initiative', 'A neighborhood cleanup event to remove litter and improve public green spaces.', '2026-11-10', '2026-11-12', 1),
('Community Garden Expansion', 'A hands-on urban gardening effort to grow fresh produce and teach sustainable farming.', '2026-11-15', '2026-12-10', 2),
('After-School Tutoring Program', 'Volunteer tutors help students improve reading, math, and STEM confidence.', '2026-11-20', '2027-05-15', 3),
('Winter Food Drive', 'Collecting and distributing essential food items for families in need.', '2026-12-01', '2026-12-20', 3),
('Wellness Fair Outreach', 'Supporting local health education and wellness screenings for underserved residents.', '2026-11-30', '2026-12-05', 1),
('Youth Leadership Workshop', 'A community-based leadership workshop designed to build confidence and civic engagement.', '2026-12-08', '2026-12-18', 2);

-- ========================================
-- Associate projects with categories
-- ========================================
INSERT INTO project_category (project_id, category_id)
VALUES
(1, 1),
(1, 3),
(2, 1),
(3, 2),
(4, 3),
(5, 4),
(6, 2),
(6, 3);
