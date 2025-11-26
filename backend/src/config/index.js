require("dotenv").config();

const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || "super_tajny_klucz";

module.exports = {
  PORT,
  JWT_SECRET,
};
