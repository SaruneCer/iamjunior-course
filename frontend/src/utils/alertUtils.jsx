import { ROUTES } from "../router/pageRoutes";

export const createAlertConfig = (message, buttons) => ({
    isOpen: true,
    message,
    buttons,
  });
  
  export const createLoginAlertConfig = (navigate, bookingDetails, closeAlert) => ({
    isOpen: true,
    message: "Please log in to make a booking.",
    buttons: [
      {
        label: "Log In",
        onClick: () => {
          navigate(ROUTES.LOGIN, {
            state: { fromBookingModal: true, bookingDetails },
          });
          closeAlert();
        },
      },
      {
        label: "Cancel",
        className: "cancel_button",
        onClick: closeAlert,
      },
    ],
  });
  
  export const createSuccessAlertConfig = (onClose) => ({
    isOpen: true,
    message: "Booking successful!",
    buttons: [
      {
        label: "OK",
        onClick: () => {
          onClose();
        },
      },
    ],
  });
  
  export const createErrorAlertConfig = (message) => ({
    isOpen: true,
    message: message || "Failed to create booking. Please try again.",
    buttons: [
      {
        label: "OK",
        onClick: () => {},
      },
    ],
  });
  