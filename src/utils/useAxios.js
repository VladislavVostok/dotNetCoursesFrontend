import axios from "axios"; 
import { getRefreshedToken, isAccessTokenExpired, setAuthUser } from "./auth";
import { API_BASE_URL } from "./constant";
import Cookies from "js-cookie";

// Функция-хук для создания настроенного экземпляра Axios с автоматическим обновлением токенов
const useAxios = () => {
  // Получение токенов из Cookies
  const accessToken = Cookies.get("access_token"); // Доступный токен
  const refreshToken = Cookies.get("refresh_token"); // Токен обновления

  // Создание экземпляра Axios с базовым URL и заголовком авторизации
  const axiosInstance = axios.create({
    baseURL: API_BASE_URL, // Базовый URL для всех запросов
    headers: { Authorization: `Bearer ${accessToken}` }, // Установка заголовка авторизации
  });

  // Добавление интерсептора запросов для проверки токена перед выполнением запроса
  axiosInstance.interceptors.request.use(async (req) => {
    // Проверяем, истек ли текущий access-токен
    if (!isAccessTokenExpired) {
      return req; // Если токен валиден, возвращаем запрос без изменений
    }

    // Если токен истек, получаем новый токен через refresh-токен
    const response = await getRefreshedToken(refreshToken);

    // Сохраняем новый access и refresh токены
    setAuthUser(response.access, response.refresh);

    // Обновляем заголовок Authorization в запросе с новым токеном
    req.headers.Authorization = `Bearer ${response.data?.access}`;
    return req; // Возвращаем модифицированный запрос
  });

  return axiosInstance; // Возвращаем настроенный экземпляр Axios
};

export default useAxios; // Экспортируем функцию для использования в других частях приложения