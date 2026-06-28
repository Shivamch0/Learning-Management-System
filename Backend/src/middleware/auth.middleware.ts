import type { Request, Response, NextFunction } from "express";
import { clerkClient, getAuth } from "@clerk/express";

export const protectEducator = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = getAuth(req);
    if (!userId)
      return res
        .status(401)
        .json({ status: false, message: "User Id not found" });
    const response = await clerkClient.users.getUser(userId);

    if (response.publicMetadata.role !== "educator") {
      return res.json({ success: false, message: "Unauthorized Access..." });
    }

    next();
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
