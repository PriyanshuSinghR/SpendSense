import SmsAndroid from "react-native-get-sms-android";

export async function getBankSms() {
  return new Promise((resolve, reject) => {
    const filter = {
      box: "inbox",
      maxCount: 100,
    };

    SmsAndroid.list(
      JSON.stringify(filter),
      (fail: string) => {
        console.log("SMS Read Failed:", fail);
        reject(fail);
      },
      (_count: number, smsList: string) => {
        const parsedSms = JSON.parse(smsList);

        const bankSms = parsedSms.filter((sms: any) => {
          const sender = sms.address?.toLowerCase() || "";

          const body = sms.body?.toLowerCase() || "";

          return (
            sender.includes("hdfc") ||
            sender.includes("sbi") ||
            sender.includes("icici") ||
            sender.includes("axis") ||
            sender.includes("kotak") ||
            sender.includes("paytm") ||
            sender.includes("upi") ||
            body.includes("debited") ||
            body.includes("credited") ||
            body.includes("sent rs") ||
            body.includes("received rs") ||
            body.includes("spent")
          );
        });

        resolve(bankSms);
      },
    );
  });
}
