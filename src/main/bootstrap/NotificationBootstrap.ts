import { Log } from 'cuakx-express-core/config';
import { NotificationFacade } from 'cuakx-express-core/facade/notification';

import config from '@config/Config';

let notificationFacade: NotificationFacade | null = null;

/**
 * Creates and caches the notification facade so the app reuses one bootstrap instance.
 */
export function registerNotificationChannels(): NotificationFacade {
  if (notificationFacade) {
    return notificationFacade;
  }

  notificationFacade = new NotificationFacade({
    smtp: config.notification.smtp.enable
      ? {
          host: config.notification.smtp.host,
          port: config.notification.smtp.port,
          secure: config.notification.smtp.secure,
          username: config.notification.smtp.username,
          password: config.notification.smtp.password,
          from: config.notification.smtp.from
        }
      : undefined,
    fcm: config.notification.fcm.enable
      ? {
          endpoint: config.notification.fcm.endpoint,
          bearerToken: config.notification.fcm.bearer_token
        }
      : undefined,
    sendinblue: config.notification.sendinblue.enable
      ? {
          apiKey: config.notification.sendinblue.api_key,
          fromEmail: config.notification.sendinblue.from_email,
          fromName: config.notification.sendinblue.from_name
        }
      : undefined,
    sms: config.notification.sms.enable
      ? {
          endpoint: config.notification.sms.endpoint,
          apiKey: config.notification.sms.api_key
        }
      : undefined,
    whatsapp: config.notification.whatsapp.enable
      ? {
          endpoint: config.notification.whatsapp.endpoint,
          apiKey: config.notification.whatsapp.api_key
        }
      : undefined
  });

  Log.i('NOTIFICATION', 'Notification channels are registered and ready.');
  return notificationFacade;
}
