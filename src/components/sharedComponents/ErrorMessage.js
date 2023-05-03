const ErrorMessage = ({ message }) => {
  return message && <p className="text-red-400">{message}</p>;
};

export default ErrorMessage;
