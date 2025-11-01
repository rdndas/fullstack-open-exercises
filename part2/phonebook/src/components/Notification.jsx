const Notification = ({ message, clsName }) => {
  if (message === null) {
    return null;
  }

  return <div className={clsName}>{message}</div>;
};

export default Notification;