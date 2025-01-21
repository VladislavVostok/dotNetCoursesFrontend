import { Navigate } from "react-router-dom"; // Импорт компонента для перенаправления
import { useAuthStore } from "../store/auth"; // Импорт хранилища аутентификации

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ children }) => {
  // Проверяем, авторизован ли пользователь с помощью Zustand-хранилища
  const loggedIn = useAuthStore((state) => state.isLoggedIn)(); 
  // Вызов метода isLoggedIn() из хранилища для проверки состояния авторизации

  // Если пользователь авторизован, рендерим дочерние элементы, иначе перенаправляем на страницу логина
  return loggedIn ? <>{children}</> : <Navigate to="Auth/login/" />;
};

export default PrivateRoute; // Экспортируем компонент по умолчанию