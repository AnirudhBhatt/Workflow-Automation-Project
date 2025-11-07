// src/middleware/roleMiddleware.js
// Role-Based Access Control (RBAC) middleware

// authorizeRoles("Admin"), authorizeRoles("Admin","Manager")
export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ message: "Not authenticated" });
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied: insufficient permissions" });
    }
    next();
  };
};
