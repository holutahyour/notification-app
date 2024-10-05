importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
    apiKey: "AIzaSyAjfgwBXG4s_TrZrVgSp36hrbItGifTSb4",
    authDomain: "notification-project-376be.firebaseapp.com",
    projectId: "notification-project-376be",
    storageBucket: "notification-project-376be.appspot.com",
    messagingSenderId: "257809984305",
    appId: "1:257809984305:web:b0df0e75ae956a7e14de10"
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
    console.log("Received background message ", payload);

});