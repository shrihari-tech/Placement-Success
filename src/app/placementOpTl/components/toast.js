// placementOpTl/components/toast.js
import { notification } from "antd";

const Toast = {
  success: (message, description, options = {}) => {
    notification.success({
      message: message || "Success",
      description: description || "Operation completed successfully",
      placement: "topRight",
      duration: 3,
      ...options,
    });
  },

  error: (message, description, options = {}) => {
    notification.error({
      message: message || "Error",
      description: description || "Something went wrong",
      placement: "topRight",
      duration: 3,
      ...options,
    });
  },

  warning: (message, description, options = {}) => {
    notification.warning({
      message: message || "Warning",
      description: description || "Please check your input",
      placement: "topRight",
      duration: 3,
      ...options,
    });
  },

  info: (message, description, options = {}) => {
    notification.info({
      message: message || "Information",
      description: description || "Here's some information",
      placement: "topRight",
      duration: 3,
      ...options,
    });
  },
};

export default Toast;