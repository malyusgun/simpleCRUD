import { IUser } from "../interfaces";

let users: IUser[] = [];

export const getUsers = () => {
  return users;
};
export const getUser = (userId: string) => {
  return users.find((user) => user.id === userId)!;
};
export const addUser = (user: IUser) => {
  users.push(user);
};
export const editUser = (userId: string, user: IUser) => {
  users = users.map((item) => {
    if (item.id !== userId) return item;
    return { ...user, id: user.id ?? item.id };
  });
  return user;
};
export const deleteUser = (id: string) => {
  users = users.filter((item) => item.id !== id);
};
