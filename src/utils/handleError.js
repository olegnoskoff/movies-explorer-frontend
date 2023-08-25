export function handleError(err) {
  const errorMappings = {
    "Вы ввели неправильный логин или пароль.": "password",
    "При авторизации произошла ошибка. Токен не передан или передан не в неверном формате.":
      "token",
    "При авторизации произошла ошибка. Переданный токен некорректен.": "token",
    "Пользователь с таким email уже существует.": "email",
    "При регистрации пользователя произошла ошибка.": "registration",
  };

  if (err.validation) {
    const fieldName = err.validation.body.keys[0];
    const errorMessage = err.validation.body.message;
    return { fieldName, errorMessage };
  }

  if (err.message && errorMappings[err.message]) {
    const fieldName = errorMappings[err.message];
    return { fieldName, errorMessage: err.message };
  }

  return { fieldName: "", errorMessage: "" };
}
