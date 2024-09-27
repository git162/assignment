const { Router } = require("express");
const {adminMiddleware,validateAdminMiddleware} = require("../middleware/admin");
const { Admin, Course } = require("../db");
const router = Router();

router.post("/signup",validateAdminMiddleware, async (req, res) => {
  const { username, password } = req.body;
  try {
    await Admin.create({ username: username, password: password });
    res.json({
      msg: "Admin created succesfully!!",
    });
  } catch (err) {
      res.status(403).json({
        msg:"Unable to signup"
      })
  }
});

router.post("/courses", adminMiddleware, async (req, res) => {
  const { courseTitle, courseDescription, price, imageLink } = req.body;
  try {
    await Course.create({
      courseTitle: courseTitle,
      courseDescription: courseDescription,
      price: price,
      imageLink: imageLink,
    });
    res.json({
      msg: "course created successfully",
    });
  } catch (err) {
    res.status(403).json({
      msg: "Unable to create course",
      error: err,
    });
  }
});

router.get("/courses", adminMiddleware, async(req, res) => {
  try{
    const allCourses = await Course.find({});
    res.json({
        courses:allCourses
    })
  }catch(err){
    res.status(403).json({
        msg:"Unable to retrieve courses"
    })

  }
});

module.exports = router;
