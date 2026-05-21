import SmsAndroid from "react-native-get-sms-android";

import { SmsMessage } from "@/types/sms";

export function getBankSms(): Promise<SmsMessage[]> {
  return new Promise((resolve, reject) => {
    const filter = {
      box: "inbox",
      maxCount: 200,
    };

    SmsAndroid.list(
      JSON.stringify(filter),
      (fail: string) => {
        reject(fail);
      },
      (_count: number, smsList: string) => {
        const parsed: SmsMessage[] = JSON.parse(smsList);

        resolve(parsed);
      },
    );
  });
}
