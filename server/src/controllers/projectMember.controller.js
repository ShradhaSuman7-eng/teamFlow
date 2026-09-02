import projectMemberService from "../services/projectMember.service.js";

const addMember = async (req, res) => {
  console.log("REQ BODY:", req.body);

  const { userId, role } = req.body;

  const { id: projectId } = req.params;

  const project = await projectMemberService.addMember(projectId, userId, role);

  res.status(201).json({
    success: true,
    message: "Member added successfully",
    data: project,
  });
};
const getMembers = async (req, res) => {
  const { id: projectId } = req.params;

  const members = await projectMemberService.getMembers(projectId);

  res.status(200).json({
    success: true,
    message: "Project members fetched successfully",
    data: members,
  });
};

const removeMember = async (req, res) => {
  const { id: projectId, userId } = req.params;

  const project = await projectMemberService.removeMember(projectId, userId);

  res.status(200).json({
    success: true,
    message: "Member removed successfully",
    data: project,
  });
};

export { addMember, getMembers, removeMember };
