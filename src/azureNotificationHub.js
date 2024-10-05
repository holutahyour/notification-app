import { NotificationHubServiceClient } from '@azure/notification-hubs';

const connectionString = 'Endpoint=sb://Rapha-app.servicebus.windows.net/;SharedAccessKeyName=DefaultFullSharedAccessSignature;SharedAccessKey=VOjhSb2or9COUIzlN8VmXyLBHkl0CHfQkSQRu0nHXTo=';
const hubName = 'Rapha';

const notificationHubClient = new NotificationHubServiceClient(connectionString, hubName);

export { notificationHubClient };
