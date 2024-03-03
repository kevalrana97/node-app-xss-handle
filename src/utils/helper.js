const handleDatabaseResponse = (err, result, successMessage, failureMessage, res) => {
  if (err) {
    const message = err.code === "ER_DUP_ENTRY" ? "Duplicate data, try again" : "Something went wrong, try later";
    return res.status(400).json({ meta: { code: 0, message } });
  }
  if (result && ((result?.affectedRows && result?.affectedRows !== 0) || result.length > 0)) {
    return res.json({ meta: { code: 1, message: successMessage }, data: Array.isArray(result) ? result : [] });
  }
  return res.status(400).json({ meta: { code: 0, message: failureMessage } });
};

const handleErrorResponse = (errors, res) => {
  const errorMessage = errors?.errors?.[0]?.msg ?? errors ?? 'Something went wrong, try later';
  return res.status(400).json({ meta: { code: 0, message: errorMessage }, data: [] });
};

module.exports = {
  handleDatabaseResponse,
  handleErrorResponse
};