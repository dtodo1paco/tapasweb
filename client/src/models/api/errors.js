export const buildError = (response) => {
  console.log("Buildinf error from: " + JSON.stringify(response));
  let errors = [];
  let errorSum = {}
  if (response.status === 401 || response.status === 403) {
    errorSum.forceLogout = true;
    errors.push('Your session has expired or is not active.');
  } else {
    errors.push('Try again in a minute and if it is still failing, call @dtodo1paco');
  }
  if (errors.length > 0) {
    errorSum['summary'] = 'Ooops! something went wrong.';
    errorSum['errors'] = errors;
  }
  return errorSum;
}