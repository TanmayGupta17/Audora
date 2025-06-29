const PORT = 8000;
require("dotenv").config();
const express = require("express");
const { connectDB } = require("./connect");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("./models/user");
//Routers
const userRouter = require("./routes/user");
const uploadRouter = require("./routes/upload");

connectDB(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch(() => {
    console.log("Error Connecting to the server");
  });

const app = express();

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/`);
});
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(session({ secret: "secret", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("LernWise Server is up and running");
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `http://localhost:${PORT}/auth/google/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;
        console.log("Email: ", email);
        const name = profile.displayName;
        console.log("name: ", name);
        let user = await User.findOne({ googleId: profile.id });
        if (!user) {
          user = await User.create({
            googleId: profile.id,
            email,
            name,
          });
        }
        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/Authentication" }),
  (req, res) => {
    // <-- fix parameter order here
    res.redirect("http://localhost:3000/HomePage");
  }
);

// app.get("/", (req, res) => {
//   res.send("<a href='/auth/google'>Login with Google</a>");
// });

app.use("/user", userRouter);

app.use("/upload", uploadRouter);
