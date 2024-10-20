import { addUser, editUser, getUser, getUsers, deleteUser } from "../db/users";
import { IRequest, IResponse, IUser } from "../interfaces";
import { v4 as uuidv4 } from "uuid";
import { checkRequiredUserKeys, isUserKeysValid, uuidRegex } from "../helpers";

export const getUsersController = (res: IResponse) => {
  const users = getUsers();
  res.statusCode = 200;
  res.write(JSON.stringify(users));
  return res;
};

export const getUserController = (req: IRequest, res: IResponse) => {
  try {
    const userId = req.url.slice(7);
    if (userId.match(uuidRegex)) {
      const user = getUser(userId);
      res.statusCode = 200;
      res.write(JSON.stringify(user));
    } else {
      res.statusCode = 400;
      res.write(`It's not the uuid that was given, but something else.`);
    }
    return res;
  } catch (err) {
    res.statusCode = 404;
    res.write(`User with corresponding id doesn't exist`);
    return res;
  }
};

export const addUserController = (res: IResponse, user: IUser) => {
  let areKeysValid = checkRequiredUserKeys(user);
  if (!areKeysValid) {
    res.statusCode = 400;
    res.write(`Not all required data is corresponded or types error.`);
    return res;
  }
  const userToAdd = { ...user, id: uuidv4() };
  addUser(userToAdd);
  res.statusCode = 201;
  res.write(JSON.stringify(userToAdd));
  return res;
};

export const editUserController = (
  req: IRequest,
  res: IResponse,
  user: IUser,
) => {
  try {
    const userId = req.url.slice(7);
    if (isUserKeysValid(user)) {
      editUser(userId, user);
      res.statusCode = 200;
      res.write(JSON.stringify(user));
      return res;
    } else {
      res.statusCode = 400;
      res.write(
        `It's not the uuid that was given, but something else (or types error).`,
      );
    }
  } catch (err) {
    res.statusCode = 404;
    res.write(`User with corresponding id doesn't exist`);
    return res;
  }
};

export const deleteUserController = (req: IRequest, res: IResponse) => {
  try {
    const userId = req.url.slice(7);
    if (userId.match(uuidRegex)) {
      deleteUser(userId);
      res.statusCode = 204;
      res.write("User deleted successfully");
    } else {
      res.statusCode = 400;
      res.write(`It's not the uuid that was given, but something else.`);
    }
    return res;
  } catch (err) {
    res.statusCode = 404;
    res.write(`User with corresponding id doesn't exist`);
    return res;
  }
};
