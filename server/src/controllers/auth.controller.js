import authService from "../services/auth.service.js";

const register = async (req, res) => {
  const user = await authService.registerUser(req.body);

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: user,
  });
};

const login = async (req, res) => {
  const user = await authService.loginUser(req.body);

  res.status(201).json({
    success: true,
    message: "User loggedin successfully",
    data: user,
  });
};

export { register, login };
