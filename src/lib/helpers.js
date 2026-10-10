export function toBengaliNumber(number) {
  const englishDigits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const bengaliDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

  let text = number.toLocaleString("en-US");
  let result = "";

  for (let i = 0; i < text.length; i++) {
    const character = text[i];
    const index = englishDigits.indexOf(character);
    if (index === -1) {
      result = result + character;
    } else {
      result = result + bengaliDigits[index];
    }
  }

  return result;
}

export function getUnitText(unit) {
  if (unit === "kg") {
    return "প্রতি কেজি";
  }
  if (unit === "litre") {
    return "প্রতি লিটার";
  }
  if (unit === "dozen") {
    return "প্রতি ডজন";
  }
  if (unit === "piece") {
    return "প্রতি পিস";
  }
  return unit;
}

export function getShortUnitText(unit) {
  if (unit === "kg") {
    return "কেজি";
  }
  if (unit === "litre") {
    return "লিটার";
  }
  if (unit === "dozen") {
    return "ডজন";
  }
  if (unit === "piece") {
    return "পিস";
  }
  return unit;
}

export function getBanglaDate() {
  const today = new Date();

  const weekday = today.toLocaleDateString("bn-BD", { weekday: "long" });
  const day = today.toLocaleDateString("bn-BD", { day: "numeric" });
  const month = today.toLocaleDateString("bn-BD", { month: "long" });
  const year = today.toLocaleDateString("bn-BD", { year: "numeric" });

  const dateText = weekday + ", " + day + " " + month + ", " + year;
  return dateText;
}

export function convertToBengaliDigits(text) {
  const englishDigits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const bengaliDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

  let result = "";

  for (let i = 0; i < text.length; i++) {
    const character = text[i];
    const index = englishDigits.indexOf(character);
    if (index === -1) {
      result = result + character;
    } else {
      result = result + bengaliDigits[index];
    }
  }

  return result;
}

export function formatPercent(pct) {
  const positivePct = Math.abs(pct);
  const fixedText = positivePct.toFixed(1);
  const result = convertToBengaliDigits(fixedText);
  return result;
}