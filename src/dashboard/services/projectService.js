const projectService = {
  getProjects: async () => [],
  getProjectById: async (id) => ({ id, name: "Projet exemple" }),
  createProject: async (data) => {
    console.log("Création du projet...", data);
    return { success: true };
  }
};
export default projectService;
