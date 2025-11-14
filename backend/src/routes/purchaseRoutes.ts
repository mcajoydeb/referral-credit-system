import express from "express";
import User from "../models/User";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { userId } = req.body;

    // Check user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Prevent double-crediting
    if (user.hasMadeFirstPurchase) {
      return res.status(400).json({ message: "Purchase already completed earlier. No credits added." });
    }

    // Mark purchase
    user.hasMadeFirstPurchase = true;

    // If referred → reward both
    if (user.referredBy) {
      const referrer = await User.findOne({ referralCode: user.referredBy });

      if (referrer) {
        // Add credits
        user.credits += 2;
        referrer.credits += 2;

        await referrer.save();
      }
    }

    await user.save();

    return res.status(200).json({
      message: "Purchase successful",
      creditsAwarded: user.referredBy ? 2 : 0,
    });
  } catch (err) {
    console.error("Purchase error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

export default router;
