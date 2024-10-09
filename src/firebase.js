import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

// Firebase configuration
const firebaseConfig = {
    apiKey: "apiKey",
    authDomain: "authDomain",
    projectId: "projectId",
    storageBucket: "storageBucket",
    messagingSenderId: "messagingSenderId",
    appId: "appId"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// Check and request notification permissions
const checkNotificationPermission = async () => {

    // Check if the browser supports notifications
    if ('Notification' in window) {
        return Notification.requestPermission()
            .then(permission => {
                if (permission === 'granted') {
                    console.log('Notification permission already granted.');
                    return true;
                } else if (permission === 'denied') {
                    console.log('Notification permission denied.');
                    handleBlockedPermission();
                    return false;
                }
            })
            .catch(err => {
                console.error('Error requesting notification permission:', err);
            });
    } else {
        console.error('This browser does not support notifications.');
    }

};

const handleBlockedPermission = () => {
    alert(
        'Notifications are blocked. Please enable them in your browser settings to receive updates.'
    );
    // Optionally display instructions to manually enable notifications
};

// Function to get the device token for web push notifications
const getDeviceToken = async () => {
    try {
        const permissionGranted = await checkNotificationPermission();
        if (!permissionGranted) {
            console.log('Notification permission was denied or blocked.');
            return null;
        }

        const currentToken = await getToken(messaging, {
            vapidKey: 'BJrflykLTmgln3zpV8y64hIqx9jgbEOcj90HN3BHiUanPQiPRCWy_oWEnDwymaizUPMDe7a-F5Rr3LYK-1dSwIA', // Replace with your actual VAPID key
        });

        if (currentToken) {
            console.log('Device Token:', currentToken);
            return currentToken;
        } else {
            console.log('No registration token available.');
        }
    } catch (error) {
        console.error('An error occurred while retrieving token:', error);
    }
};

// Handle incoming messages (for foreground notifications)
onMessage(messaging, (payload) => {
    console.log('Message received: ', payload);
    new Notification(payload.notification.title, {
        body: payload.notification.body,
    });
});

export { getDeviceToken };
