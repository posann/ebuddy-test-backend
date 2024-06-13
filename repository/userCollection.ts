import { db } from "../config/firebaseConfig";

interface User {
  name: string;
  email: string;
  age: number;
}

const addUser = async (userId: string, user: User): Promise<void> => {
  try {
    await db.collection("USERS").doc(userId).set(user);
  } catch (error: any) {
    throw new Error("Error adding user: " + error.message);
  }
};

const updateUser = async (
  userId: string,
  data: Partial<User>
): Promise<void> => {
  try {
    await db.collection("USERS").doc(userId).update(data);
  } catch (error: any) {
    throw new Error("Error updating user: " + error.message);
  }
};

const getUser = async (userId: string): Promise<User | null> => {
  try {
    const userDoc = await db.collection("USERS").doc(userId).get();
    if (!userDoc.exists) {
      return null;
    }
    return userDoc.data() as User;
  } catch (error: any) {
    throw new Error("Error fetching user: " + error.message);
  }
};

const getAllUsers = async (): Promise<User[]> => {
  try {
    const usersSnapshot = await db.collection("USERS").get();
    const users: User[] = [];
    usersSnapshot.forEach((doc) => {
      users.push(doc.data() as User);
    });
    return users;
  } catch (error: any) {
    throw new Error("Error fetching all users: " + error.message);
  }
};

const deleteUser = async (userId: string): Promise<void> => {
  try {
    await db.collection("USERS").doc(userId).delete();
  } catch (error: any) {
    throw new Error("Error deleting user: " + error.message);
  }
};

export { addUser, updateUser, getUser, deleteUser, getAllUsers, User };
