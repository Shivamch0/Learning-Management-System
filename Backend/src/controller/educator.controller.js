import { clerkClient, getAuth } from "@clerk/express";

export const updateRoleEducator = async (req, res) => {
  console.log(req.auth.userId);
  console.log(req.auth);
  console.log(req.headers.authorization);
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    await clerkClient.users.updateUserMetadata(userId, {
      publicMetadata: {
        role: "educator",
      },
    });
    res.json({ success: true, message: "You can publish a course now" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
