const jwt = require("jsonwebtoken");
const User = require("../models/user");

const authenticateToken = async (req, res, next) => {
  try {
    // Получаем токен из заголовков Authorization
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Not authorized" });
    }

    // Проверяем токен на валидность
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Получаем id пользователя из токена
    const userId = decoded.userId;

    // Находим пользователя в базе данных
    const user = await User.findById(userId);
    if (!user || user.token !== token) {
      return res.status(401).json({ message: "Not authorized" });
    }

    // Записываем данные пользователя в req.user и вызываем метод next()
    req.user = user;
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(401).json({ message: "Not authorized" });
  }
};

module.exports = authenticateToken;
