exports.getUsers = (req, res) => {
  res.send('User list avaible to admins only');
};

exports.getUserById = (req, res) => {
  res.send(`User with ID ${req.params.userId}`);
};
