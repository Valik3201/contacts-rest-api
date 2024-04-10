const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../models/user");
const authenticateToken = require("../../middleware/authenticateToken");

const { loginSchema } = require("../../validation/userSchemas");

require("dotenv").config();

router.post("/register", async (req, res) => {
  try {
    // Валидация запроса
    const { error, value } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    // Проверка, не используется ли электронная почта уже другим пользователем
    const existingUser = await User.findOne({ email: value.email });
    if (existingUser) {
      return res.status(409).json({ message: "Email in use" });
    }

    // Хеширование пароля
    const hashedPassword = await bcrypt.hash(value.password, 10);

    // Создание нового пользователя
    const newUser = new User({
      email: value.email,
      password: hashedPassword,
      subscription: "starter", // Здесь можно установить любую дефолтную подписку
    });
    await newUser.save();

    // Отправка успешного ответа
    res.status(201).json({
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    // Валидация запроса
    const { error, value } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    // Поиск пользователя по email
    const user = await User.findOne({ email: value.email });
    if (!user) {
      return res.status(401).json({ message: "Email or password is wrong" });
    }

    // Сравнение пароля
    const passwordMatch = await bcrypt.compare(value.password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Email or password is wrong" });
    }

    // Генерация токена
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

    // Сохранение токена в объекте пользователя (если нужно)
    user.token = token;
    await user.save();

    // Отправка успешного ответа
    res.status(200).json({
      token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/logout", authenticateToken, async (req, res) => {
  try {
    // Получаем id пользователя из запроса
    const userId = req.user._id;

    // Находим пользователя в базе данных по его id
    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    // Удаляем токен у текущего пользователя
    user.token = null;
    await user.save();

    // Отправляем успешный ответ
    res.status(204).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/current", authenticateToken, async (req, res) => {
  try {
    // Получаем id пользователя из токена
    const userId = req.user._id;

    // Находим пользователя в базе данных по его id
    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    // Возвращаем данные пользователя
    res.status(200).json({
      email: user.email,
      subscription: user.subscription,
    });
  } catch (error) {
    console.error("Error getting current user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
