import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { getDeviceToken } from './firebase';
import Notification from './Notification';
//import { generateRandomString } from './utils';


function App() {
  const [deviceToken, setToken] = useState("");

  const registerDevice = () => {
    // Get the timezone of the user's device
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone; // Africa/Lagos

    // Send the device token and timezone to the backend
    fetch('https://localhost:7915/api/v1/device-registrations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        deviceToken: deviceToken,
        timezone: timezone,
        userId: "643b4c87ec578103bba0078a"
      }),
    })
      .then(response => response.json())
      .then(data => console.log('Device registered:', data))
      .catch(error => console.error('Error registering device:', error));
  }

  useEffect(() => {
    const registerDeviceWithAzure = async () => {
      const token = await getDeviceToken();
      if (token) {
        setToken(token);
      };
    }
    // Request permission and register the device
    registerDeviceWithAzure();
  }, []);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Notification Demo App</h1>
      <p>{deviceToken}</p>
      <button onClick={registerDevice}>Save Token</button>
      <Notification />
    </>
  )
}

export default App
