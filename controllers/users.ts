import { addUser, getUser, getUsers } from "../db/users";
import { IUser, IUserInfo } from "../interfaces";
import { v4 as uuidv4 } from "uuid";

const getUsersController = (req, res) => {
  const users = getUsers();
  res.statusCode = 200;
  res.write(users.toString());
  return res;
};

const getUserController = (req, res) => {
  try {
    const userId = req.url.slice(6);
    const user = getUser(userId);
    res.statusCode = 200;
    res.write(user.toString());
    return res;
  } catch (err) {
    res.statusCode = 400;
    res.write(`User with corresponding id doesn't exist`);
    return res;
  }
};

const addUserController = (req, res, user: IUserInfo) => {
  try {
    const userToAdd = { ...user, id: uuidv4() };
    const users = addUser(userToAdd);
    res.statusCode = 200;
    res.write(users.toString());
    return res;
  } catch (err) {
    res.statusCode = 400;
    res.write(`Not all required data is corresponded`);
    return res;
  }
};
export { getUsersController, getUserController, addUserController };
