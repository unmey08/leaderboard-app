const Alert = ({ alertMessage }) => {
  const textColor =
    alertMessage.type === "success"
      ? "dark:text-green-400"
      : alertMessage.type === "info"
      ? "dark:text-blue-400"
      : alertMessage.type === "danger"
      ? "dark:text-red-400"
      : "";
  return (
    <div
      className={`flex items-center p-4 mt-8 text-md text-neutral-800 rounded-lg dark:bg-neutral-800 ${textColor} font-bold`}
      role="alert"
    >
      <svg
        className="shrink-0 inline w-4 h-4 me-3"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
      </svg>
      <div>
        {alertMessage.type === "danger" && (
          <span className="font-medium">
            User{" "}
            <span className="font-extrabold">{`${alertMessage.name}`}</span> has
            been deleted.
          </span>
        )}
        {alertMessage.type === "success" && (
          <span className="font-medium">
            Success! New user{" "}
            <span className="font-extrabold">{`${alertMessage.name}`}</span> has
            been added.
          </span>
        )}
        {alertMessage.type === "info" && (
          <span className="font-medium">
            All users have been reset to 0 points.
          </span>
        )}
      </div>
    </div>
  );
};
export default Alert;
