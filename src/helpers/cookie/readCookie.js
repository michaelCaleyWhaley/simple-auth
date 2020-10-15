export default (cookie, cookieName) => {
  var b = cookie.match("(^|;)\\s*" + cookieName + "\\s*=\\s*([^;]+)");
  return b ? b.pop() : "";
};
