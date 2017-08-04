module.exports = (statusCode, msg) => {
  const err = {'output':{'statusCode': statusCode},'message': msg}
  return err;
}
