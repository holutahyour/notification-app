import * as signalR from "@microsoft/signalr";
import { useEffect, useState } from "react";

const Notification = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:44310/notificationHub") // Update URL as necessary
      .build();

    connection.on("ReceiveNotification", (message) => {
      setNotifications((prev) => [...prev, message]);
    });

    connection.start().catch((err) => console.log("Error establishing connection", err));

    return () => {
      connection.stop();
    };
  }, []);

  return (
    <div>
      <h2>Notifications:</h2>
      <ul>
        {notifications.map((notification, index) => (
          <li key={index}>{notification}</li>
        ))}
      </ul>
    </div>
  );
};

export default Notification;
