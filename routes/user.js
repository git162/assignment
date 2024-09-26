const { Router } = require("express");
const router = Router();
const { User, Course} = require("../db");
const {userMiddleware,validateUserMiddleware} = require("../middleware/user");


router.post("/signup",validateUserMiddleware, async (req, res) => {
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

router.get("/courses", async(req, res) => {
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

router.post("/courses/:courseId", userMiddleware, async(req, res) => {
  // Implement course purchase logic
  const courseId = req.params.courseId;
  const username = req.body.username;
  await User.updateOne({
    username: username
}, {
    "$push": {
        purchasedCourses: courseId
    }
})
res.json({
    message: "Purchase complete!"
})
});

router.get("/purchasedCourses", userMiddleware, (req, res) => {
  // Implement fetching purchased courses logic
});

module.exports = router;
