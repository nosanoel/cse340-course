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
    organization_id INTEGER NOT NULL,
    title VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(255) NOT NULL,
    project_date DATE NOT NULL,
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
-- 5 projects for BrightFuture Builders
INSERT INTO project (organization_id, title, description, location, project_date)
VALUES
(1, 'Park Cleanup Initiative', 'A neighborhood cleanup event to remove litter and improve public green spaces.', 'Riverside Community Park', '2026-11-10'),
(1, 'Senior Meal Delivery Day', 'Preparing and delivering warm meals to senior citizens in our community.', 'Maple Street Center', '2026-11-14'),
(1, 'Youth STEM Workshop', 'Hands-on science and technology activities helping students build confidence and curiosity.', 'Oakview Middle School', '2026-11-21'),
(1, 'Tree Planting Day', 'Planting native trees to improve air quality and reduce urban heat.', 'Lakeside Trail', '2026-12-02'),
(1, 'Holiday Food Drive', 'Collecting and distributing pantry staples for local families during the holidays.', 'Downtown Community Hall', '2026-12-10');

-- 5 projects for GreenHarvest Growers
INSERT INTO project (organization_id, title, description, location, project_date)
VALUES
(2, 'Community Garden Expansion', 'Expanding urban garden beds to increase local food production and education.', 'Northside Urban Farm', '2026-11-15'),
(2, 'Neighborhood Recycling Drive', 'Collecting reusable materials and educating residents on waste reduction.', 'Elm Street Plaza', '2026-11-18'),
(2, 'Free Health Screening Event', 'Partnering with local providers to offer screenings and wellness guidance.', 'Central Community Center', '2026-11-25'),
(2, 'School Nutrition Program', 'Building and maintaining garden plots to support classroom nutrition lessons.', 'Lakeview Academy', '2026-12-03'),
(2, 'Bike Repair Clinic', 'Teaching basic bike maintenance skills and helping residents repair transportation.', 'Old Town Square', '2026-12-09');

-- 5 projects for UnityServe Volunteers
INSERT INTO project (organization_id, title, description, location, project_date)
VALUES
(3, 'After-School Tutoring Program', 'Volunteer tutors help students improve reading, math, and STEM confidence.', 'Westview Learning Center', '2026-11-20'),
(3, 'Shelter Supply Drive', 'Collecting essentials for families and individuals experiencing homelessness.', 'City Rescue Center', '2026-11-27'),
(3, 'Senior Tech Help Sessions', 'Teaching older adults how to use phones, tablets, and online services safely.', 'Cedar Public Library', '2026-12-01'),
(3, 'Volunteer Mentor Match', 'Connecting youth with caring mentors for academic and life support.', 'Lakewood High School', '2026-12-07'),
(3, 'Community Art Day', 'A public art event bringing neighbors together through creative expression and mural work.', 'Old Town Plaza', '2026-12-13');

-- ========================================
-- Associate projects with categories
-- ========================================
INSERT INTO project_category (project_id, category_id)
VALUES
(1, 1), (1, 3),
(2, 3), (2, 4),
(3, 2), (3, 3),
(4, 1),
(5, 3),
(6, 1), (6, 3),
(7, 1), (7, 4),
(8, 1), (8, 3),
(9, 2), (9, 3),
(10, 1), (10, 3),
(11, 2), (11, 3),
(12, 3), (12, 4),
(13, 2), (13, 3),
(14, 2), (14, 3),
(15, 3), (15, 4);
