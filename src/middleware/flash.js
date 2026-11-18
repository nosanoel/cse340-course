/**
 * Flash Message Middleware
 *
 * Provides temporary message storage that survives redirects but is consumed on render.
 * Messages are stored in the session and organized by type (success, error, warning, info).
 */

// Initialize flash message storage and provide access methods.
const flashMiddleware = (req, res, next) => {
    req.flash = function(type, message) {
        // Initialize flash storage if it does not exist.
        if (!req.session.flash) {
            req.session.flash = {
                success: [],
                error: [],
                warning: [],
                info: []
            };
        }

        // Store a message when both a type and message are provided.
        if (type && message) {
            if (!req.session.flash[type]) {
                req.session.flash[type] = [];
            }
            req.session.flash[type].push(message);
            return;
        }

        // Retrieve and clear messages for one type.
        if (type && !message) {
            const messages = req.session.flash[type] || [];
            req.session.flash[type] = [];
            return messages;
        }

        // Retrieve and clear every message type.
        const allMessages = req.session.flash || {
            success: [],
            error: [],
            warning: [],
            info: []
        };

        req.session.flash = {
            success: [],
            error: [],
            warning: [],
            info: []
        };

        return allMessages;
    };

    next();
};

// Make flash messages available to EJS templates through res.locals.
const flashLocals = (req, res, next) => {
    res.locals.flash = req.flash;
    next();
};

// Run flash setup and template-local setup in the correct order.
const flash = (req, res, next) => {
    flashMiddleware(req, res, () => {
        flashLocals(req, res, next);
    });
};

export default flash;
