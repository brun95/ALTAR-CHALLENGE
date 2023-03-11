import { useState, useEffect } from "react";

type Props = {
  message: string;
  color?: string;
  onRemove: () => void;
};

const Notification: React.FC<Props> = ({
  message,
  color = "green",
  onRemove,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onRemove();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onRemove]);

  return isVisible ? (
    <div style={{ color }}>
      <p>{message}</p>
    </div>
  ) : null;
};

export default Notification;