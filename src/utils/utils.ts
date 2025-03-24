export const validateEmail = (email: string): boolean => {
    const result = String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    return result === null ? false : true;
  };

export const validatePassword = (password: string): boolean => {
  let valid = false;
  if (password.match(/[A-Z]/) && password.match(/[a-z].*[a-z]/) && password.match(/[0-9]/) && password.match(/(!|%|#|\$|~|\?|&|:|;|\^|\+|-)/)) {
      valid = true
  }
  return valid
}