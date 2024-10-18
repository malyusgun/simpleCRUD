import { IUser } from "../interfaces";

let users: IUser[] = [];

const getUsers = () => {
  return users;
};
const getUser = (userId: string) => {
  return users.find((user) => user.id === userId)!;
};
const addUser = (user: IUser) => {
  users.push(user);
  return user;
};
const editUser = (user: IUser) => {
  users = users.map((item) => {
    if (item.id !== user.id) return item;
    return user;
  });
  return user;
};
const removeUser = (id: string) => {
  users = users.filter((item) => item.id !== id);
};
export { getUsers, getUser, addUser, editUser, removeUser };
