export function handleError(err) {
  if (err.validation) {
    const { keys, message } = err.validation.body;
    const fieldName = keys[0];
    return { fieldName, errorMessage: message };
  }

  if (err.message) {
    const errorMessages = {
      "Вы ввели неправильный логин или пароль.": "password",
      "При авторизации произошла ошибка. Токен не передан или передан не в том формате.": "token",
      "При авторизации произошла ошибка. Переданный токен некорректен.": "token",
      "Пользователь с таким email уже существует.": "email",
      "При регистрации пользователя произошла ошибка.": "registration",
    };

    const fieldName = errorMessages[err.message] || "";
    return { fieldName, errorMessage: err.message };
  }

  return { fieldName: "", errorMessage: "" };
}
