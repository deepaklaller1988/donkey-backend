import { Request, Response } from "express";
import User from "../../models/user.model";
import { checkAccessToken, generateTokens } from "../../util/auth";
import * as bcrypt from "bcrypt";
import * as crypto from "crypto";
import hash from "../../util/hash";
import jwt from "jsonwebtoken";

import UserToken from "../../models/user-token.model";
import { sendForgotEmail } from "../../provider/send-mail";

const createUser = async (req: Request, res: Response) => {
  try {
    const emailExists = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (emailExists) {
      return res.sendError(res, "ERR_AUTH_USERNAME_OR_EMAIL_ALREADY_EXIST");
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const usernameExists = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (usernameExists) {
      return res.sendError(res, "Username already exists");
    }
    const userCreated = {
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    };
    const user = await User.create(userCreated);
    var { accessToken } = await generateTokens(user.dataValues.id);
    return res.sendSuccess(res, { user, accessToken });
  } catch (error: any) {
    console.log(error);
    return res.sendError(res, "ERR_INTERNAL_SERVER_ERROR");
  }
};

const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      where: {
        email: email,
      },
    });

    if (!user) {
      return res.sendError(res, "Email Not Found");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.sendError(res, "Password Not Matched");
    }
    var { accessToken } = await generateTokens(user.dataValues.id);
    return res.sendSuccess(res, { user, accessToken });
  } catch (error: any) {
    console.error(error);
    return res.sendError(res, "ERR_INTERNAL_SERVER_ERROR");
  }
};

const forgotPassword = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) {
      return res.sendError(res, "ERR_AUTH_WRONG_USERNAME_OR_PASSWORD");
    }

    let resetToken = crypto.randomBytes(32).toString("hex");
    let token = await UserToken.findOne({ where: { user_id: user.id } });
    if (!token) {
      await UserToken.create({
        user_id: user.id,
        token: resetToken,
        createdAt: Date.now(),
      });
    } else {
      await UserToken.update(
        { token: resetToken },
        {
          where: {
            id: token.id,
          },
        }
      );
    }
    const link = `${process.env.ADMIN_URL}/auth/reset-password?token=${resetToken}`;

    sendForgotEmail(link, user.email);
    return res.send({
      success: true,
      message: "Forgot password email has been send",
    });
  } catch (error: any) {
    console.error(error);
    return res.sendError(res, error.message);
  }
};

const resetPassword = async (req: Request, res: Response) => {
  try {
    const userToken = await UserToken.findOne({
      where: { token: req.body.token },
    });
    if (!userToken) {
      return res.sendError(res, "ERR_AUTH_WRONG_TOKEN");
    }
    await UserToken.destroy({ where: { id: userToken.id } });
    await User.update(
      {
        password: await hash.generate(req.body.password),
      },
      {
        where: {
          id: userToken.user_id,
        },
      }
    );
    return res.send({ status: true, message: "Password changed successfully" });
  } catch (error: any) {
    console.error(error);
    return res.sendError(res, error.message);
  }
};

const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.findAll();
    res.sendSuccess(res, users);
  } catch (error: any) {
    console.error(error);
    return res.sendError(res, "ERR_INTERNAL_SERVER_ERROR");
  }
};

const myDetails = async (req: Request, res: Response) => {
  try {
    const authorizationHeader = req.header("Authorization");
    if (!authorizationHeader) {
      return res.sendError(res, "Token is Required");
    }

    const token = authorizationHeader.replace("Bearer ", "");
    if (!token) {
      return res.sendError(res, "Token is Required");
    }

    const decoded: any = await checkAccessToken(token);
    if (!decoded) {
      return res.sendError(res, "Invalid Token");
    }

    const userId = decoded.data?.user?._id;
    if (!userId) {
      return res.sendError(res, "Invalid Token");
    }

    const user = await User.findOne({
      where: { id: userId },
      attributes: { exclude: ["password", "createdAt", "updatedAt"] },
    });

    if (!user) {
      return res.sendError(res, "User not found");
    }

    return res.sendSuccess(res, {
      user,
      message: "User details fetched successfully",
    });
  } catch (error: any) {
    return res.sendError(res, "ERR_INTERNAL_SERVER_ERROR");
  }
};

export {
  createUser,
  getUsers,
  loginUser,
  forgotPassword,
  resetPassword,
  myDetails,
};
