const createProject = (req, res) => {
  res.status(201).json({
    success: true,
    message: "Project validation passed",
    data: req.body,
  });
};

export default createProject;
