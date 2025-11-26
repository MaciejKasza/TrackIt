const { data } = require("../data/db");

function getUsers(req, res) {
  res.status(200).json({
    success: true,
    data: users,
  });
}

function getUserById(req, res) {
  const id = Number(req.params.id);
  const user = users.find((u) => u.id === id);

  if (!user) {
    return res.status(404).json({
      success: false,
      error: "User not found",
    });
  }

  res.status(200).json({
    success: true,
    data: user,
  });
}

function createUser(req, res) {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({
      success: false,
      error: "Missing 'name' or 'email' in body",
    });
  }

  const newId = users.length ? users[users.length - 1].id + 1 : 1;

  const newUser = {
    id: newId,
    name,
    email,
  };

  users.push(newUser);

  res.status(201).json({
    success: true,
    data: newUser,
  });
}

function updateUser(req, res) {
  const id = Number(req.params.id);
  const { name, email } = req.body;

  const index = users.findIndex((u) => u.id === id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      error: "User not found",
    });
  }

  users[index] = {
    ...users[index],
    name: name ?? users[index].name,
    email: email ?? users[index].email,
  };

  res.status(200).json({
    success: true,
    data: users[index],
  });
}

function deleteUser(req, res) {
  const id = Number(req.params.id);
  const index = users.findIndex((u) => u.id === id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      error: "User not found",
    });
  }

  users.splice(index, 1); // usuwamy z tablicy

  res.status(204).send();
}

// profil aktualnie zalogowanego usera z tokena
function getProfile(req, res) {
  res.status(200).json({
    success: true,
    user: req.user,
  });
}

// jakieś mockowe statystyki admina
function getAdminStats(req, res) {
  res.status(200).json({
    success: true,
    data: {
      usersCount: users.length,
      revenue: 12345,
    },
  });
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getProfile,
  getAdminStats,
};
