// src/utils/authUtils.js
export const login = (email, password) => {
  // fake check: just look in sessionStorage "users"
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  const user = users.find((u) => u.email === email && u.password === password);

  if (user) {
    sessionStorage.setItem("user", JSON.stringify(user));
    return user;
  }
  return null;
};

export const register = (name, email, password) => {
  const users = JSON.parse(localStorage.getItem("users") || "[]");

  if (users.find((u) => u.email === email)) {
    return { success: false, message: "User already exists!" };
  }

  const newUser = { name, email, password, role: "User" };
  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));
  return { success: true, message: "User registered successfully!" };
};

export const logout = () => {
  sessionStorage.removeItem("user");
};
