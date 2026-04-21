export function parseTransactionMessage(message: string) {
	const amountMatch = message.match(/(rs\.?|inr)\s?([\d,]+(\.\d{1,2})?)/i);

	const merchantMatch =
		message.match(/at\s([a-zA-Z0-9\s]+)/i) ||
		message.match(/to\s([a-zA-Z0-9\s]+)/i);

	const isExpense =
		message.toLowerCase().includes("debited") ||
		message.toLowerCase().includes("spent");

	return {
		amount: amountMatch ? Number(amountMatch[2].replace(/,/g, "")) : 0,
		merchant: merchantMatch ? merchantMatch[1].trim() : "Unknown",
		type: isExpense ? "expense" : "income",
	};
}
