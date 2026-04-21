import SmsAndroid from "react-native-get-sms-android";

export async function getBankSms() {
	return new Promise((resolve, reject) => {
		const filter = {
			box: "inbox",
			maxCount: 50,
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
					const message = sms.body?.toLowerCase() || "";

					return (
						message.includes("debited") ||
						message.includes("credited") ||
						message.includes("spent") ||
						message.includes("txn") ||
						message.includes("upi")
					);
				});

				resolve(bankSms);
			},
		);
	});
}
