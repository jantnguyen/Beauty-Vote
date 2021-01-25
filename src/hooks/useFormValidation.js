import React from 'react';
import { toast } from '../utils/toast';

function useFormValidation(initialState, validate, action) {
  const [values, setValues] = React.useState(initialState);
  const [errors, setErrors] = React.useState({});
  const [isSubmitting, setSubmitting] = React.useState(false);

  React.useEffect(() => {
    if (isSubmitting) {
      const noErrors = Object.keys(errors).length === 0;
      if(noErrors) {
        action()
        setValues(initialState);
        setSubmitting(false)
      } else{
        toast(Object.values(errors).join(" "))
        setSubmitting(false)
      }
    }
    //eslint-disable-next-line
  }, [errors]);

  function handleChange(event) {
    setValues(previousValues => ({
      ...previousValues,
      [event.target.name]: event.target.value
    }))
  }

  function handleSubmit() {
    console.log(`useformvalidation 32: ${JSON.stringify(values)}`);
    const validationErrors = validate(values);
    setErrors(validationErrors);
    setSubmitting(true);
  }

  return {
    handleSubmit, handleChange, values, setValues, isSubmitting
  }
}

export default useFormValidation;