module.exports.isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res
      .status(401)
      .json({ msg: "You are not authorized to view this resource" });
  }
};

module.exports.isTeacher = (req, res, next) => {
  if (req.isAuthenticated() && req.user.role === "teacher") {
    next();
  } else {
    res.status(401).json({
      msg: "You are not authorized to view this resource because you are not a teacher.",
    });
  }
};

module.exports.isStudent = (req, res, next) => {
  if (req.isAuthenticated() && req.user.role === "student") {
    next();
  } else {
    res.status(401).json({
      msg: "You are not authorized to view this resource because you are not a student.",
    });
  }
};
