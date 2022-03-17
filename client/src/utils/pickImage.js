import * as ImagePicker from 'expo-image-picker';

export const openCamera = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      base64: true,
      quality: 1,
    });
    
    if (!result.cancelled) {
      return result.base64;
    }

    return '';
  }