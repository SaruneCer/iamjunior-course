import "../styles/button.css";

export function Button({
  buttonText,
  onClick,
  isRound,
  type = "button",
  className = "",
}) {
  let baseClassName = "basic_button";

  if (isRound) {
    baseClassName += " round_button";
  }

  const combinedClassName = `${baseClassName} ${className}`.trim();

  return (
    <button className={combinedClassName} type={type} onClick={onClick}>
      {buttonText}
    </button>
  );
}
