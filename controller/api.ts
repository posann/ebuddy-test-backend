import { Request, Response } from "express";
import {
  addUser,
  updateUser,
  getUser,
  deleteUser,
  User,
  getAllUsers,
} from "../repository/userCollection";

const addUserData = async (req: Request, res: Response) => {
  try {
    const { userId, name, email, age } = req.body;
    const user: User = { name, email, age };
    await addUser(userId, user);
    res.status(200).send("User data added successfully");
  } catch (error: any) {
    res.status(500).send("Error adding user data: " + error.message);
  }
};

const updateUserData = async (req: Request, res: Response) => {
  try {
    const { userId, data } = req.body;
    await updateUser(userId, data);
    res.status(200).send("User data updated successfully");
  } catch (error: any) {
    res.status(500).send("Error updating user data: " + error.message);
  }
};

const fetchUserDataId = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const user = await getUser(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.status(200).send(user);
  } catch (error: any) {
    res.status(500).send("Error fetching user data: " + error.message);
  }
};

const deleteUserData = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    await deleteUser(userId);
    res.status(200).send("User data deleted successfully");
  } catch (error: any) {
    res.status(500).send("Error deleting user data: " + error.message);
  }
};

const fetchAllUserData = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (error: any) {
    res.status(500).send("Error fetching all user data: " + error.message);
  }
};

export {
  addUserData,
  updateUserData,
  fetchUserDataId,
  deleteUserData,
  fetchAllUserData,
};
