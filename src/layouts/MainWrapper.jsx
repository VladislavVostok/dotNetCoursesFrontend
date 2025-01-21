import { useEffect, useState } from "react"; // Импорт хуков React
import { setUser } from "../utils/auth"; // Импорт функции для установки данных пользователя

// eslint-disable-next-line react/prop-types
const MainWrapper = ({ children }) => {
  // Состояние для отслеживания состояния загрузки
  const [loading, setLoading] = useState(true); // По умолчанию установлено значение true (загрузка активна)

  useEffect(() => {
    // Асинхронная функция, которая выполняется при монтировании компонента
    const handler = async () => {
      setLoading(true); // Устанавливаем состояние загрузки в true

      await setUser(); // Вызываем функцию для установки данных пользователя (например, получение данных из API или cookies)

      setLoading(false); // Устанавливаем состояние загрузки в false после выполнения setUser
    };

    handler(); // Вызываем асинхронную функцию
  }, []); // Пустой массив зависимостей означает, что эффект выполнится только один раз при монтировании

  // Возвращаем либо null (если загрузка активна), либо дочерние элементы (если загрузка завершена)
  return <>{loading ? null : children}</>;
};

export default MainWrapper; // Экспортируем компонент по умолчанию