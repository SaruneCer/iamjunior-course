import "../styles/button.css";

export function Button({ buttonText, onClick, isRound }) {
  let className = "basic_button";

  if (isRound) {
    className += " round_button";
  }

  return (
    <button className={className} type="button" onClick={onClick}>
      {buttonText}
    </button>
  );
}
