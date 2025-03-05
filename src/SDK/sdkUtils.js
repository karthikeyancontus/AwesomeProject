import {Platform} from 'react-native';
import SDK, {RealmKeyValueStore} from './SDK';
import {callBacks} from './sdkCallBacks';

let currentUserJID = '';

export const mirrorflyInitialize = async (args = {}) => {
  try {
    const {
      apiBaseUrl = 'https://growthaxlllc-api.mirrorfly.com/api/v1',
      licenseKey = 'o3mN05oAgepcbO0noe3T058WC8jkKN',
      isSandbox = false,
      callBack,
    } = args;
    const mfInit = await SDK.initializeSDK({
      apiBaseUrl: apiBaseUrl,
      licenseKey: licenseKey,
      callbackListeners: callBacks,
      isSandbox: isSandbox,
      mediaServiceAutoPause: Platform.OS !== 'android', // if you are setting as flase you have run the foregorund service
    });
    console.log('mfInit ==>', JSON.stringify(mfInit, null, 2));
    return mfInit;
  } catch (error) {
    console.log('mfInit  ==> ', error);
    return error;
  }
};

export const mirrorflyRegister = async ({
  userIdentifier,
  fcmToken = '',
  voipToken = '',
  metadata = {},
}) => {
  try {
    const registerRes = await SDK.register(
      userIdentifier,
      fcmToken,
      voipToken,
      process.env?.NODE_ENV === 'production',
      metadata,
    );
    console.log('registerRes ==>', JSON.stringify(registerRes, null, 2));
    if (registerRes.statusCode === 200) {
      const {data} = registerRes;
      const connect = await SDK.connect(data.username, data.password);
      switch (connect?.statusCode) {
        case 200:
        case 409:
          let jid = await SDK.getCurrentUserJid();
          let userJID = jid.userJid.split('/')[0];
          connect.jid = userJID;
          RealmKeyValueStore.setItem('currentUserJID', userJID);
          currentUserJID = userJID;
          SDK.getArchivedChats(true);
          SDK.getUsersIBlocked();
          SDK.getUsersWhoBlockedMe();
          return connect;
        default:
          return connect;
      }
    } else {
      return registerRes;
    }
  } catch (error) {
    console.log('mirrorflyRegister error ==> ', error);
    return error;
  }
};

export const fetchRecentChats = async () => {
  const {statusCode, data = []} = await SDK.getRecentChats(1, 20);
  console.log('fetchRecentChats ==>', JSON.stringify(data, null, 2));
  return data;
};

export const downloadMediaFile = async msgId => {
  const downloadResponse = await SDK.downloadMedia(msgId);
  console.log(
    'downloadResponse ==>',
    JSON.stringify(downloadResponse, null, 2),
  );
};
