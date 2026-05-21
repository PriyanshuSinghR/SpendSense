export function parseTransactionMessage(message: string, sender?: string) {
  const cleanMessage = message.replace(/\n/g, " ").trim();

  const lower = cleanMessage.toLowerCase();

  // ======================
  // IGNORE PROMOTIONAL SMS
  // ======================

  const promoWords = [
    "offer",
    "sale",
    "discount",
    "cashback offer",
    "apply now",
    "loan approved",
    "win reward",
  ];

  const isPromo = promoWords.some((word) => lower.includes(word));

  if (
    isPromo &&
    !lower.includes("credited") &&
    !lower.includes("debited") &&
    !lower.includes("sent") &&
    !lower.includes("spent")
  ) {
    return null;
  }

  // ======================
  // AMOUNT
  // ======================

  const amountMatch = cleanMessage.match(
    /(?:rs\.?|inr|₹)\s?([\d,]+(?:\.\d{1,2})?)/i,
  );

  const amount = amountMatch ? Number(amountMatch[1].replace(/,/g, "")) : 0;

  // ======================
  // MERCHANT EXTRACTION
  // ======================

  const merchantPatterns = [
    // Sent to someone
    /to\s+([a-zA-Z0-9\s.&@_-]{2,50}?)(?:\s+on|\s+ref|\s+upi|\s+from|$)/i,

    // Received from someone
    /from\s+([a-zA-Z0-9\s.&@_-]{2,50}?)(?:\s+on|\s+ref|\s+upi|\s+credited|$)/i,

    // Paid to
    /paid to\s+([a-zA-Z0-9\s.&@_-]{2,50})/i,

    // txn to
    /txn to\s+([a-zA-Z0-9\s.&@_-]{2,50})/i,

    // credited by
    /credited by\s+([a-zA-Z0-9\s.&@_-]{2,50})/i,

    // debited for
    /debited for\s+([a-zA-Z0-9\s.&@_-]{2,50})/i,

    // VPA
    /vpa\s([a-zA-Z0-9._-]+@[a-zA-Z]+)/i,

    // spent at
    /at\s+([a-zA-Z0-9\s.&@_-]{2,50}?)\s*\./i,

    // has requested payment
    /([a-zA-Z0-9\s.&_-]{3,60}?)\s+has requested payment/i,

    // merchant using
    /using\s([a-zA-Z0-9\s.&@_-]{2,50})/i,
  ];

  let merchant = "Unknown";

  for (const pattern of merchantPatterns) {
    const match = cleanMessage.match(pattern);

    if (match?.[1]) {
      merchant = match[1];
      break;
    }
  }

  // ======================
  // CLEANUP
  // ======================

  merchant = merchant
    .replace(/\s+/g, " ")
    .replace(/[^a-zA-Z0-9@.&\s_-]/g, "")
    .trim();

  // ======================
  // SPECIAL CASES
  // ONLY IF UNKNOWN
  // ======================

  if (merchant === "Unknown") {
    // Insurance

    if (lower.includes("pmsby")) {
      merchant = "PMSBY Insurance";
    }

    // Spotify
    else if (lower.includes("spotify")) {
      merchant = "Spotify";
    }

    // Amazon
    else if (lower.includes("amazon")) {
      merchant = "Amazon";
    }

    // Swiggy
    else if (lower.includes("swiggy")) {
      merchant = "Swiggy";
    }

    // Zomato
    else if (lower.includes("zomato")) {
      merchant = "Zomato";
    }

    // PharmEasy
    else if (lower.includes("pharmeasy")) {
      merchant = "PharmEasy";
    }

    // CRED exact only
    else if (
      lower.includes("cred club") ||
      lower.includes("to cred") ||
      lower.includes("from cred") ||
      lower.includes("by cred")
    ) {
      merchant = "CRED";
    }

    // Axis credit card
    else if (lower.includes("axis bank credit card")) {
      merchant = "Axis Credit Card";
    }

    // Paytm request
    else if (lower.includes("paytm") && lower.includes("requested payment")) {
      merchant = "Paytm Merchant";
    }

    // fallback sender name
    else if (sender) {
      merchant = sender
        .replace(/^[A-Z]{2}-/i, "")
        .replace(/-[A-Z]$/i, "")
        .replace(/[^a-zA-Z0-9]/g, " ")
        .trim();
    }
  }

  // ======================
  // TYPE DETECTION
  // ======================

  let type: "income" | "expense" = "expense";

  const expenseWords = [
    "sent",
    "debited",
    "spent",
    "paid",
    "withdrawn",
    "purchase",
    "upi txn",
    "payment",
    "requested payment",
  ];

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

  if (isIncome) {
    type = "income";
  } else if (isExpense) {
    type = "expense";
  }

  // ======================
  // FINAL SAFETY
  // ======================

  if (amount <= 0) {
    return null;
  }

  return {
    amount,
    merchant,
    type,
  };
}
