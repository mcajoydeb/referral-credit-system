import { Request, Response } from "express";
import { User } from "../models";

export const getDashboard = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Total referred users
    const totalReferred = user.referredUsers.length;

    // Converted users (those who made first purchase)
    const convertedUsers = await User.countDocuments({
      referredBy: user.referralCode,
      hasMadeFirstPurchase: true
    });

    const response = {
      referralCode: user.referralCode,
      referralLink: `http://localhost:3000/register?r=${user.referralCode}`,
      totalReferred,
      convertedUsers,
      totalCredits: user.credits
    };

    return res.json(response);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
