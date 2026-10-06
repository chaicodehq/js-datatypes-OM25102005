/**
 * 🚂 Mumbai Local Train Pass Generator
 *
 * Aaj se tu Mumbai local ka digital pass system bana raha hai! Passenger
 * ka data milega aur tujhe ek formatted pass string generate karni hai.
 * Pass mein sab details honi chahiye ek specific format mein.
 *
 * Rules:
 *   - passenger object mein required fields: name, from, to, classType
 *   - classType must be "first" ya "second" (case-insensitive check)
 *   - Pass ID generate karo:
 *     classType ka first char uppercase + from ke pehle 3 letters uppercase
 *     + to ke pehle 3 letters uppercase
 *     Example: "first", "dadar", "andheri" => "F" + "DAD" + "AND" = "FDADAND"
 *   - Output format using template literal:
 *     Line 1: "MUMBAI LOCAL PASS"
 *     Line 2: "---"
 *     Line 3: "Name: <NAME IN UPPERCASE>"
 *     Line 4: "From: <From in Title Case>"
 *     Line 5: "To: <To in Title Case>"
 *     Line 6: "Class: <FIRST or SECOND>"
 *     Line 7: "Pass ID: <PASSID>"
 *   - Title Case = first letter uppercase, rest lowercase
 *   - Lines are separated by \n (newline)
 *   - Hint: Use template literals, slice(), toUpperCase(), toLowerCase(),
 *     charAt(), typeof
 *
 * Validation:
 *   - Agar passenger object nahi hai ya null hai, return "INVALID PASS"
 *   - Agar koi required field (name, from, to, classType) missing hai
 *     ya empty string hai, return "INVALID PASS"
 *   - Agar classType "first" ya "second" nahi hai, return "INVALID PASS"
 *
 * @param {{ name: string, from: string, to: string, classType: string }} passenger
 * @returns {string} Formatted pass or "INVALID PASS"
 *
 * @example
 *   generateLocalPass({ name: "rahul sharma", from: "dadar", to: "andheri", classType: "first" })
 *   // => "MUMBAI LOCAL PASS\n---\nName: RAHUL SHARMA\nFrom: Dadar\nTo: Andheri\nClass: FIRST\nPass ID: FDADAND"
 *
 *   generateLocalPass(null)
 *   // => "INVALID PASS"
 */
export function generateLocalPass(passenger) {
  if (!passenger || typeof passenger !== "object") {
    return "INVALID PASS";
  }
  const { name, from, to, classType } = passenger;
  // 2. Validate all required string fields
  const isValidString = str => typeof str === "string" && str.trim().length > 0;
  if (!isValidString(name) || !isValidString(from) || !isValidString(to) || !isValidString(classType)) {
    return "INVALID PASS";
  }
  const normalizedClass = classType.trim().toLowerCase();
  if (normalizedClass !== "first" && normalizedClass !== "second") {
    return "INVALID PASS";
  }

  // Helper for Title Case
  const toTitleCase = str => {
    const trimmed = str.trim();
    return trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase();
  };
// 4. Generate values
  const formattedName = name.trim().toUpperCase();
  const formattedFrom = toTitleCase(from);
  const formattedTo = toTitleCase(to);
  const formattedClass = normalizedClass.toUpperCase();
// Generate Pass ID: Class 1st letter + from 3 letters + to 3 letters
  const passId = (
    normalizedClass.charAt(0) +
    from.trim().slice(0, 3) +
    to.trim().slice(0, 3)
  ).toUpperCase();

  // 5. Build and return formatted pass string
  return `MUMBAI LOCAL PASS
---
Name: ${formattedName}
From: ${formattedFrom}
To: ${formattedTo}
Class: ${formattedClass}
Pass ID: ${passId}`;
}