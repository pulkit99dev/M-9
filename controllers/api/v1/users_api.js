const User = require("../../../model/user");
const jwt = require("jsonwebtoken");

module.exports.createSession = async function (req, res) {
  try {
    let user = await User.findOne({ email: req.body.email });

    if (!user || user.password != req.body.password) {
      return res.json(422, {
        message: "Invalid user or password",
      });
    }

    return res.json(200, {
      message: "Sign in successful, here is token",
      data: {
        token: jwt.sign(user.toJSON(), "connecttie", { expiresIn: 1000000 }),
      },
    });
  } catch (err) {
    console.log("****", err);
    return res.json(500, {
      message: "internal Server Error",
    });
  }
};
