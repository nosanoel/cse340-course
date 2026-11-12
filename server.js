import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import { testConnection } from './src/models/db.js';
import router from './src/routes.js';

// Set the app environment based on the NODE_ENV variable or default to production.
const NODE_ENV = process.env.NODE_ENV?.toLowerCase() || 'production';

// Choose the port for the server; defaults to 3000 if no environment variable is set.
const PORT = process.env.PORT || 3000;

// Build the root path for this project so static files and views can be served correctly.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create the Express application instance.
const app = express();

/**
  * Configure Express middleware
  */

// Serve static assets (CSS, images, JS) from the public folder.
app.use(express.static(path.join(__dirname, 'public')));

// Tell Express to use EJS as the template engine.
app.set('view engine', 'ejs');

// Tell Express where to find the HTML templates in the src/views folder.
app.set('views', path.join(__dirname, 'src/views'));

// Log the HTTP method and URL during development for debugging and monitoring.
app.use((req, res, next) => {
    if (NODE_ENV === 'development') {
        console.log(`${req.method} ${req.url}`);
    }
    next(); // Pass control to the next middleware or route
});

// Share the current environment with all templates so pages can conditionally render content.
app.use((req, res, next) => {
    res.locals.NODE_ENV = NODE_ENV;
    next();
});

// Use the route definitions from src/routes.js to handle application endpoints.
app.use(router);

// Catch-all route for requests that do not match a known page.
app.use((req, res, next) => {
    const err = new Error('Page Not Found');
    err.status = 404;
    next(err);
});

// Global error handler for application errors and 404s.
app.use((err, req, res, next) => {
    // Log error details for troubleshooting during development.
    console.error('Error occurred:', err.message);
    console.error('Stack trace:', err.stack);
    
    // Determine whether this is a 404 or a general server error.
    const status = err.status || 500;
    const template = status === 404 ? '404' : '500';
    
    // Pass the title and error message to the appropriate EJS error page.
    const context = {
        title: status === 404 ? 'Page Not Found' : 'Server Error',
        error: err.message,
        stack: err.stack
    };
    
    // Render the correct error page with the relevant status code.
    res.status(status).render(`errors/${template}`, context);
});

// Start the server and verify the database connection before continuing.
app.listen(PORT, async () => {
  try {
    await testConnection();
    console.log(`Server is running at http://127.0.0.1:${PORT}`);
    console.log(`Environment: ${NODE_ENV}`);
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
});