import "../styles/button.css";

export function Button({ buttonText, onClick, isRound, type = "button" }) {
  let className = "basic_button";

  if (isRound) {
    className += " round_button";
  }

  return (
    <button className={className} type={type} onClick={onClick}>
      {buttonText}
    </button>
  );
}