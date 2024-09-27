const { Router } = require("express");
const router = Router();
const { User, Course } = require("../db");
const {
  userMiddleware,
  validateUserMiddleware,
} = require("../middleware/user");

router.post("/signup", validateUserMiddleware, async (req, res) => {
  const { username, password } = req.body;
  try {
    await User.create({ username: username, password: password });
    res.json({
      msg: "User created succesfully!!",
    });
  } catch (err) {
    res.status(403).json({
      msg: "Unable to signup",
    });
  }
});

router.get("/courses", async (req, res) => {
  try {
    const allCourses = await Course.find({});
    res.json({
      courses: allCourses,
    });
  } catch (err) {
    res.status(403).json({
      msg: "Unable to retrieve courses",
    });
  }
});

router.post("/courses/:courseId", userMiddleware, async (req, res) => {
  const courseId = req.params.courseId;
  const username = req.headers.username;
  try {
    await User.updateOne(
      { username: username },
      {
        $push: {
          purchasedCourses: courseId,
        },
      }
    );
    res.json({
      msg: "Purchase Complete",
    });
  } catch (err) {
    res.status(403).json({
      msg:"Unable to purchase course"
    })
  }
});

router.get("/purchasedCourses", userMiddleware, async(req, res) => {
  // Implement fetching purchased courses logic
  const { username } = req.headers;
  try{
    const user = await User.findOne({
      username:username
    });
  
    const courses = await Course.find({
      _id:{
        "$in":user.purchasedCourses
      }
    });

    res.json({
      purchasedCourses:courses
    });

  }catch(err){
    res.status(403).json({
      msg:"Unable to display purchased courses"
    })

  }
  

  
});

module.exports = router;
