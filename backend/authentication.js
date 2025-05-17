const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const db = require("./db");
const verifyToken = require("./verifyToken");
const multer = require("multer");
const sharp = require("sharp"); // Image processing library

const router = express.Router();
///curl -X POST "http://localhost:4000/auth/signup" -H "Content-Type: application/json" -d "{\"name\":\"John Doe\",\"email\":\"tushara@gmail.com\",\"mobile_no\":\"8874546210\",\"dob\":\"2000-05-15\",\"gender\":1,\"password\":\"12345578\"}"
router.post("/signup", async (req, res) => {
  try {
    const { name, email, mobile_no, dob, gender, password } = req.body;

    if (!name || !email || !mobile_no || !dob || gender === undefined || !password) {
      return res.status(400).json({ error: "All fields are required!" });
    }
    const currentDate = new Date();
    const dobDate = new Date(dob);

    if (dobDate > currentDate) {
      return res.status(400).json({ error: "Date of birth cannot be in the future!" });
    }

    if (!/^\d{10}$/.test(mobile_no)) {
      return res.status(400).json({ error: "Mobile number must be exactly 10 digits!" });
    }

    if (![0, 1].includes(Number(gender))) {
      return res.status(400).json({ error: "Gender must be either (Male) or (Female)!" });
    }

    if (password.length < 8) {
      return res.status(400).json({ error: "Password must be at least 8 characters long!" });
    }

    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!gmailRegex.test(email)) {
      return res.status(400).json({ error: "Only valid Gmail addresses are allowed!" });
    }

    db.query("SELECT * FROM users WHERE email = ?", [email], async (err, emailResults) => {
      if (err) {
        console.error("Database Error:", err);
        return res.status(500).json({ error: "Database error occurred!" });
      }

      if (emailResults.length > 0) {
        return res.status(400).json({ error: "Email already exists!" });
      }

      db.query("SELECT * FROM users WHERE mobile_no = ?", [mobile_no], async (err, mobileResults) => {
        if (err) {
          console.error("Database Error:", err);
          return res.status(500).json({ error: "Database error occurred!" });
        }

        if (mobileResults.length > 0) {
          return res.status(400).json({ error: "Mobile number already exists!" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const insertUserSql = "INSERT INTO users (name, email, mobile_no, dob, gender, password) VALUES (?, ?, ?, ?, ?, ?)";
        db.query(insertUserSql, [name, email, mobile_no, dob, gender, hashedPassword], (err, result) => {
          if (err) {
            console.error("Database Error:", err);
            return res.status(500).json({ error: "Database error occurred!" });
          }

          const token = jwt.sign({ userId: result.insertId, email }, process.env.JWT_SECRET, { expiresIn: "7d" });

          res.status(201).json({
            message: "User registered successfully!",
            Name: name,
            token
          });
        });
      });
    });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});



//curl -X POST "http://localhost:4000/auth/login" -H "Content-Type: application/json" -d "{\"email\":\"tusharsaini@gmail.com\",\"password\":\"12345678\"}"


// Login API 
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required!" });
    }

    if (password.length < 8) {
      return res.status(400).json({ error: "Password must be at least 8 characters long!" });
    }

    const sql = "SELECT id,name, email, password FROM users WHERE email = ?";
    db.query(sql, [email], async (err, results) => {
      if (err) {
        console.error("Database Error:", err);
        return res.status(500).json({ error: "Database error occurred!" });
      }

      if (results.length === 0) {
        return res.status(401).json({ error: "Email not found or account does not exist" });
      }

      const user = results[0];
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({ error: "Incorrect password" });
      }

      const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "7d" });

      res.status(200).json({ message: "Login successful!", Name: user.name, token });
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


const calculateAge = (dob) => {
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

///curl -X GET "http://localhost:4000/auth/profile" -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoiam9obmRvZUBleGFtcGxlLmNvbSIsImlhdCI6MTc0MjQ2NDU4OSwiZXhwIjoxNzQzMDY5Mzg5fQ.NDuh8OVqV4kM6woCC8BrzXE40T7rdVBLLauGNyyoOLY"

router.get("/profile", verifyToken, (req, res) => {
  const userId = req.user.userId;

  const sql = "SELECT id, name, email, mobile_no, dob, gender, profile_photo FROM users WHERE id = ?";
  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error("Database Error:", err);
      return res.status(500).json({ error: "Database error occurred!" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const user = results[0];


    user.gender = user.gender === 0 ? "Female" : "Male";


    user.age = calculateAge(user.dob);


    if (user.profile_photo) {
      user.profile_photo = `data:image/jpeg;base64,${user.profile_photo.toString("base64")}`;
    }

    res.status(200).json({
      message: "User profile fetched successfully!",
      profile: user
    });
  });
});




///curl -X PUT "http://localhost:4000/auth/update-profile" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoiam9obmRvZUBleGFtcGxlLmNvbSIsImlhdCI6MTc0MjQ2NDU4OSwiZXhwIjoxNzQzMDY5Mzg5fQ.NDuh8OVqV4kM6woCC8BrzXE40T7rdVBLLauGNyyoOLY" -H "Content-Type: multipart/form-data" -F "name=John Doe" -F "mobile_no=9876543210" -F "gender=1" -F "dob=2000-05-15" -F "password=12345678" -F "image=@C:\Project\CampusEats\backend\images\1737258679786.png"


const storage = multer.memoryStorage();
const upload = multer({ storage });

router.put("/update-profile", verifyToken, upload.single("image"), async (req, res) => {
  try {
    const userId = req.user.userId;
    const { name, mobile_no, gender, dob, password } = req.body;
    let image = req.file ? req.file.buffer : null;

    if (!password) {
      return res.status(400).json({ error: "Password is required to update profile!" });
    }
    // Check if DOB is in the future
    if (dob) {
      const currentDate = new Date();
      const dobDate = new Date(dob);

      if (dobDate > currentDate) {
        return res.status(400).json({ error: "Date of birth cannot be in the future!" });
      }
    }
    const sqlSelect = "SELECT password FROM users WHERE id = ?";
    db.query(sqlSelect, [userId], async (err, results) => {
      if (err) {
        console.error("Database Error:", err);
        return res.status(500).json({ error: "Database error occurred!" });
      }

      if (results.length === 0) {
        return res.status(404).json({ error: "User not found!" });
      }

      const user = results[0];

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: "Incorrect password!" });
      }

      if (image) {
        image = await sharp(image)
          .resize(200, 200)
          .jpeg({ quality: 70 })
          .toBuffer();
      }

      if (mobile_no) {
        if (!/^\d{10}$/.test(mobile_no)) {
          return res.status(400).json({ error: "Mobile number must be 10 digits!" });
        }

        const sqlCheckMobile = "SELECT id FROM users WHERE mobile_no = ? AND id != ?";
        db.query(sqlCheckMobile, [mobile_no, userId], (checkErr, checkResults) => {
          if (checkErr) {
            console.error("Database Error:", checkErr);
            return res.status(500).json({ error: "Database error occurred!" });
          }

          if (checkResults.length > 0) {
            return res.status(400).json({ error: "Mobile number already in use!" });
          }

          updateProfile();
        });
      } else {
        updateProfile();
      }

      function updateProfile() {
        const updateFields = [];
        const updateValues = [];

        if (name) {
          updateFields.push("name = ?");
          updateValues.push(name);
        }
        if (mobile_no) {
          updateFields.push("mobile_no = ?");
          updateValues.push(mobile_no);
        }
        if (gender !== undefined) {
          if (![0, 1].includes(Number(gender))) {
            return res.status(400).json({ error: "Gender must be 0 (Female) or 1 (Male)!" });
          }
          updateFields.push("gender = ?");
          updateValues.push(gender);
        }
        if (dob) {
          updateFields.push("dob = ?");
          updateValues.push(dob);
        }
        if (image) {
          updateFields.push("profile_photo = ?");
          updateValues.push(image);
        }

        if (updateFields.length === 0) {
          return res.status(400).json({ error: "No fields to update!" });
        }

        updateValues.push(userId);
        const sqlUpdate = `UPDATE users SET ${updateFields.join(", ")} WHERE id = ?`;

        db.query(sqlUpdate, updateValues, (updateErr) => {
          if (updateErr) {
            console.error("Database Error:", updateErr);
            return res.status(500).json({ error: "Database error occurred!" });
          }

          res.status(200).json({ message: "Profile updated successfully!" });
        });
      }
    });
  } catch (error) {
    console.error("Update Profile Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


///Get Age and Gender
///curl -X GET "http://localhost:4000/auth/user-info" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoidHVzaGFyc2FpQGdtYWlsLmNvbSIsImlhdCI6MTc0NjcyMjM3NCwiZXhwIjoxNzQ3MzI3MTc0fQ.Y_QiG8dMRdGeRphbxITVN9WICXqmT7TO1DZSnPGddTg"


router.get("/user-info", verifyToken, (req, res) => {
  const userId = req.user.userId;

  const sql = "SELECT dob, gender FROM users WHERE id = ?";
  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error("Database Error:", err);
      return res.status(500).json({ error: "Database error occurred!" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "User not found!" });
    }

    const user = results[0];


    const age = calculateAge(user.dob);

    const gender = user.gender;
    res.status(200).json({
      message: "User info fetched successfully!",
      age,
      gender
    });
  });
});
module.exports = router;
