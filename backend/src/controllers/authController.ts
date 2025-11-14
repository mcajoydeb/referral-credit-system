import { Request, Response } from "express";
import { User } from "../models";
import { generateReferralCode } from "../utils/generateReferralCode";
import { hashPassword, comparePassword } from "../utils/hashPassword";
import { generateToken } from "../utils/jwt";

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, referralCode } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Hash password
    const hashed = await hashPassword(password);

    // Generate referral code for user
    const userReferralCode = generateReferralCode(name);

    // Create user object
    const newUser = new User({
      name,
      email,
      password: hashed,
      referralCode: userReferralCode,
    });

    // If user signed up with a referral link: /register?r=CODE
    if (referralCode) {
      const referrer = await User.findOne({ referralCode });

      if (referrer) {
        newUser.referredBy = referralCode;
        referrer.referredUsers.push(newUser._id.toString());
        await referrer.save();
      }
    }

    await newUser.save();

    return res.status(201).json({
      message: "User registered successfully",
      user: newUser
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    return res.json({
      message: "Login successful",
      token: generateToken(user._id.toString()),
      referralCode: user.referralCode,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
};
