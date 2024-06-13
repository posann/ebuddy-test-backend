import { Router } from "express";
import {
  addUserData,
  updateUserData,
  deleteUserData,
  fetchUserDataId,
  fetchAllUserData,
} from "../controller/api";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.post("/add-user-data", authMiddleware, addUserData);
router.put("/update-user-data", authMiddleware, updateUserData);
router.get("/fetch-user-data/:userId", authMiddleware, fetchUserDataId);
router.get("/fetch-all-user-data", authMiddleware, fetchAllUserData);
router.delete("/delete-user-data/:userId", authMiddleware, deleteUserData);

export default router;
