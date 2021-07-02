export default function validate(title, category, content) {
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
