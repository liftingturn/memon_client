import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';

export default async function savePushToken() {
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS //사전에 동의를 받았는지 체크하는거임.
  );
  let finalStatus = existingStatus;

  // only ask if permissions have not already been determined, because
  // iOS won't necessarily prompt the user a second time.
  if (existingStatus !== 'granted') {
    // Android remote notification permissions are granted during the app
    // install, so this will only ask on iOS
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }

  // Stop here if the user did not grant permissions
  if (finalStatus !== 'granted') {
    return;
  }

  // Get the token that uniquely identifies this device
  return await Notifications.getExpoPushTokenAsync();
}
