import React, { useState } from "react";

function App() {
  const [formInfo, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formInfo.username) {
      newErrors.username = "Имя пользователя обязательно";
    }

    if (!formInfo.email) {
      newErrors.email = "Электронная почта обязательна";
    } else if (!isValidEmail(formInfo.email)) {
      newErrors.email = "Введите корректный адрес электронной почты";
    }

    if (formInfo.password.length < 6) {
      newErrors.password = "Пароль должен содержать 8 символов";
    }

    if (formInfo.password !== formInfo.confirmPassword) {
      newErrors.confirmPassword = "Пароли не совпадают";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log("Данные из формы:", formInfo);
      setSubmitted(true);
      setFormData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    }
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Имя пользователя:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formInfo.username}
            onChange={(e) =>
              setFormData({ ...formInfo, username: e.target.value })
            }
            required
          />
          {errors.username && <p className="error">{errors.username}</p>}
        </div>
        <div>
          <label htmlFor="email">Электронная почта:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formInfo.email}
            onChange={(e) =>
              setFormData({ ...formInfo, email: e.target.value })
            }
            required
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="password">Пароль:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formInfo.password}
            onChange={(e) =>
              setFormData({ ...formInfo, password: e.target.value })
            }
            required
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>
        <div>
          <label htmlFor="confirmPassword">Подтверждение пароля:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formInfo.confirmPassword}
            onChange={(e) =>
              setFormData({ ...formInfo, confirmPassword: e.target.value })
            }
            required
          />
          {errors.confirmPassword && (
            <p className="error">{errors.confirmPassword}</p>
          )}
        </div>
        <button type="submit">Отправить</button>
      </form>
      {submitted && <p className="success">Форма отправлена успешно!</p>}
    </div>
  );
}

export default App;
