import 'react-notifications/lib/notifications.css';
import { NotificationManager } from 'react-notifications';

export const Notification = (type: string, response: string) => {

    switch (type) {
        case 'info':
            NotificationManager.info(response);
            break;
        case 'success':
            NotificationManager.success(response);
            break;
        case 'warning':
            NotificationManager.warning(response);
            break;
        case 'error':
            console.log(response)
            NotificationManager.error(response);
            break;
    }
}
