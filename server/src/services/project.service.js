const createProject = async (projectData) => {
  return {
    id: "temporary-id",
    ...projectData,
  };
};

export default { createProject };
