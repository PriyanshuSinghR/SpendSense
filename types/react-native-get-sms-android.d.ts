declare module "react-native-get-sms-android" {
  interface SmsAndroidStatic {
    list(
      filter: string,
      failCallback: (error: string) => void,
      successCallback: (count: number, smsList: string) => void,
    ): void;
  }

  const SmsAndroid: SmsAndroidStatic;

  export default SmsAndroid;
}
