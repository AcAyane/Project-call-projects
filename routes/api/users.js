const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

const path = require("path");
const multer = require("multer");

// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
// Load User model
const PDP = require("../../models/PDP");
const CV = require("../../models/CV");
const Inv = require("../../models/Investisseur");



// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/registerP", (req, res) => {
  // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  PDP.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newUser = new PDP({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        region: req.body.region.value,
        country: req.body.country.value
      });
      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .then(console.log(newUser))
            .then(res.redirect('/user'))
            .catch(err => console.log(err));

        });
      });
    }
  });
});
router.post("/registerI", (req, res) => {
  // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  Inv.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newUser = new Inv({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        region: req.body.region.value,
        country: req.body.country.value
      });
      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .then(console.log(newUser))
            .then(res.redirect('/user/homepage'))
            .catch(err => console.log(err));

        });
      });
    }
  });
});


// @route GET api/users
// @desc Get User
// @access Public
router.get("/", (req, res) => {
  PDP.findOne().then(user => res.send(user));
});
router.post("/login", (req, res) => {
  // Form validation
  const { errors, isValid } = validateLoginInput(req.body);
  const typeUser = "";
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;
  // Find user by email
  PDP.findOne({ email }).then(user => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }
    // else if(user.email=="achraf.ayane@um5s.net.ma") const typeUser="CV";
    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          name: user.name
        };
        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926 // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              name: user.name,
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});
// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/loginP", (req, res) => {
  // Form validation
  const { errors, isValid } = validateLoginInput(req.body);
  const typeUser = "";
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;
  // Find user by email
  PDP.findOne({ email }).then(user => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }
    // else if(user.email=="achraf.ayane@um5s.net.ma") const typeUser="CV";
    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          name: user.name,
          email: user.email,
          region: user.region,
          country: user.country,
          typeUser: false
        };
        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926 // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              name: user.name,
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});

router.post("/loginI", (req, res) => {
  // Form validation
  const { errors, isValid } = validateLoginInput(req.body);
  const typeUser = "";
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;
  // Find user by email
  Inv.findOne({ email }).then(user => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }
    // else if(user.email=="achraf.ayane@um5s.net.ma") const typeUser="CV";
    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          name: user.name,
          inv: true
        };
        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926 // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              name: user.name,
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});
// @route POST api/users/update
// @desc Update user
// @access Public
router.post("/update", (req, res) => {
  PDP.findOneAndUpdate({ name: req.body.oldname }, {
    $set: {
      name: req.body.name,
      email: req.body.email,
      region: req.body.region,
      country: req.body.country
    }
  }, function (err, data) {
    if (err) { throw err; }
    else { console.log("Updated"); }
  })
});

module.exports = router;