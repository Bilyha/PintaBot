const getUserInfoById = (users, id) => {
  return users.find(user => user.id === id);
};

const getUserName = (users, id) => {
  const user = getUserInfoById(users, id);

  return user ? `${user.first_name} ${user.last_name}` : "New User";
};

module.exports = {
  getUserInfoById,
  getUserName
};
