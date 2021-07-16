export function validateArticle(title, category, content) {
  let validationErrors = {};
  if (category.trim() === "")
    validationErrors.category = "Please select a category for your article";
  if (title.trim() === "")
    validationErrors.title = "Please provide a title for your article";
  if (content.trim() === "")
    validationErrors.content = "Content cannot be empty";

  return {
    validationErrors,
    valid: Object.keys(validationErrors).length < 1,
  };
}

export function validateSingup(username, email, password, confirmPassword) {
  const errors = {};

  const usernameRegex = /^[a-zA-Z\s]*$/;
  if (!usernameRegex.test(username.trim())) {
    errors.username = "Username should include letters and spaces only";
  }

  const emailRegex = /\S+@\S+\.\S+/;
  if (!emailRegex.test(email)) {
    errors.email = "Please provide a valid email address";
  }

  if (password.length < 6) {
    errors.password = "Password should contain at least six characters";
  }

  if (password !== confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
}

export function validateLogin(email, password) {
  const errors = {};
  const emailRegex = /\S+@\S+\.\S+/;
  if (!emailRegex.test(email)) {
    errors.email = "Please provide a valid email address";
  }
  if (password.length < 6) {
    errors.password = "Password should contain at least six characters";
  }

  return {
    errors,
    valid: Object.keys(errors) < 1,
  };
}
