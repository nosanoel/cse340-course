// controllers/index.js

// This controller renders the home page for the application.
const showHomePage = async (req, res) => {
  const title = 'Home';
  res.render('home', { title });
};

export { showHomePage };
