export default function validateCreateProduct(values) {
  let errors = {};

  //Title Errors
  if (!values.title) {
    errors.title = "A title is required.";
  }
  // Description Errors
  if (!values.description) {
    errors.description = "Your description is required.";
  } else if (values.description.length < 10) {
    errors.description = "Your description is must be at least 10 characters.";
  }
  // URL Errors
  if (!values.url) {
    errors.url = "A URL is required.";
  } else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(values.url)) {
    errors.url = "Your URL must be valid.";
  }

  return errors;
}