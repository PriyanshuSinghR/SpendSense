export function parseTransactionMessage(message: string) {
  const cleanMessage = message.replace(/\n/g, " ");

  const lower = cleanMessage.toLowerCase();

  // ======================
  // AMOUNT
  // ======================

  const amountMatch = cleanMessage.match(
    /(?:rs\.?|inr|₹)\s?([\d,]+(?:\.\d{1,2})?)/i,
  );

  const amount = amountMatch ? Number(amountMatch[1].replace(/,/g, "")) : 0;

  // ======================
  // MERCHANT
  // ======================

  const merchantMatch =
    cleanMessage.match(/to\s([a-zA-Z\s.&]+?)\s(on|ref|upi|from)/i) ||
    cleanMessage.match(/at\s([a-zA-Z\s.&]+?)\s(on|ref|upi|from|using)/i) ||
    cleanMessage.match(/from\s([a-zA-Z\s.&]+?)\s(on|ref|upi)/i);

  const merchant = merchantMatch ? merchantMatch[1].trim() : "Unknown";

  // ======================
  // TYPE DETECTION
  // ======================

  let type: "income" | "expense" = "expense";

  // EXPENSE WORDS

  const expenseWords = [
    "sent",
    "debited",
    "spent",
    "paid",
    "withdrawn",
    "purchase",
    "upi txn",
    "payment",
  ];

  // INCOME WORDS

  const incomeWords = [
    "credited",
    "received",
    "deposited",
    "refund",
    "cashback",
    "salary",
    "added to your account",
  ];

  const isExpense = expenseWords.some((word) => lower.includes(word));

  const isIncome = incomeWords.some((word) => lower.includes(word));

  // PRIORITY

  if (isIncome) {
    type = "income";
  } else if (isExpense) {
    type = "expense";
  }

  return {
    amount,
    merchant,
    type,
  };
}
