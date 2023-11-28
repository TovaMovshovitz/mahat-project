const veriryAdmin = (req, res, next) => {
  if (req.user.email === process.env.ADMIN_EMAIL) {
    next()

  } else {
    res.status(401).send("Admin permission required")
  }

}

module.exports = veriryAdmin