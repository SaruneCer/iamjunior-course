import { Button } from "../components/Button";
import "../styles/alert_modal.css";

export function AlertModal({ isOpen, message, onClose, buttons }) {
  if (!isOpen) return null;

  return (
    <div className="alert-modal-overlay">
      <div className="alert-modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <p>{message}</p>
        {buttons && buttons.length > 0 && (
          <div className="modal-buttons">
            {buttons.map((button, index) => (
              <Button
                key={index}
                className={button.className}
                onClick={button.onClick}
                buttonText={button.label}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
