// data/users.js

// In-memory mock
const data = [
  { id: 1, name: "Jan Kowalski", email: "jan@example.com" },
  { id: 2, name: "Anna Nowak", email: "anna@example.com" },
];

// Twardo zakodowany user do logowania
const MOCK_USER = {
  id: 1,
  email: "user@example.com",
  password: "user", // w realu: hash
  role: "user",
};

const MOCK_ADMIN = {
  id: 0,
  email: "admin@example.com",
  password: "admin", // w realu: hash
  role: "admin",
};

module.exports = {
  data,
  MOCK_USER,
  MOCK_ADMIN,
};
