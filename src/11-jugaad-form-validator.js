/**
 * 📋 Jugaad Form Validator - Indian Style!
 *
 * India mein form bharna ek art hai! College admission ka form validate
 * karna hai. Har field ke apne rules hain. Tujhe ek errors object return
 * karna hai jisme galat fields ke error messages hain. Agar sab sahi hai
 * toh empty errors object aur isValid = true.
 *
 * formData object:
 *   { name, email, phone, age, pincode, state, agreeTerms }
 *
 * Validation Rules:
 *   1. name: must be a non-empty trimmed string, min 2 chars, max 50 chars
 *      Error: "Name must be 2-50 characters"
 *
 *   2. email: must be a string containing exactly one "@" and at least one "."
 *      after the "@". Use indexOf(), lastIndexOf(), includes().
 *      Error: "Invalid email format"
 *
 *   3. phone: must be a string of exactly 10 digits, starting with 6, 7, 8, or 9
 *      (Indian mobile numbers). Check each char is a digit.
 *      Error: "Invalid Indian phone number"
 *
 *   4. age: must be a number between 16 and 100 inclusive, and an integer.
 *      JUGAAD: Agar string mein number diya hai (e.g., "22"), toh parseInt()
 *      se convert karo. Agar convert nahi ho paya (isNaN), toh error.
 *      Error: "Age must be an integer between 16 and 100"
 *
 *   5. pincode: must be a string of exactly 6 digits, NOT starting with "0"
 *      Error: "Invalid Indian pincode"
 *
 *   6. state: Use optional chaining (?.) and nullish coalescing (??) -
 *      if state is null/undefined, treat as "". Must be a non-empty string.
 *      Error: "State is required"
 *
 *   7. agreeTerms: must be truthy (Boolean(agreeTerms) === true).
 *      Falsy values: 0, "", null, undefined, NaN, false
 *      Error: "Must agree to terms"
 *
 * Return:
 *   { isValid: boolean, errors: { fieldName: "error message", ... } }
 *   - isValid is true ONLY when errors object has zero keys
 *
 * Hint: Use typeof, Boolean(), parseInt(), isNaN(), Number.isInteger(),
 *   ?. (optional chaining), ?? (nullish coalescing), Object.keys(),
 *   startsWith(), trim(), length
 *
 * @param {object} formData - Form fields to validate
 * @returns {{ isValid: boolean, errors: object }}
 *
 * @example
 *   validateForm({
 *     name: "Rahul Sharma", email: "rahul@gmail.com", phone: "9876543210",
 *     age: 20, pincode: "400001", state: "Maharashtra", agreeTerms: true
 *   })
 *   // => { isValid: true, errors: {} }
 *
 *   validateForm({
 *     name: "", email: "bad-email", phone: "12345", age: 10,
 *     pincode: "0123", state: null, agreeTerms: false
 *   })
 *   // => { isValid: false, errors: { name: "...", email: "...", ... } }
 */
/**
 * 📋 Jugaad Form Validator - Indian Style!
 *
 * @param {object} formData - Form fields to validate
 * @returns {{ isValid: boolean, errors: object }}
 */
export function validateForm(formData) {
  const errors = {};
  const data = formData ?? {};

  // 1. name: non-empty trimmed string, 2-50 chars
  const name = typeof data.name === "string" ? data.name.trim() : "";
  if (name.length < 2 || name.length > 50) {
    errors.name = "Name must be 2-50 characters";
  }

  // 2. email: exactly one "@" and at least one "." after the "@"
  const email = data.email;
  const isValidEmail = () => {
    if (typeof email !== "string") return false;
    const firstAt = email.indexOf("@");
    const lastAt = email.lastIndexOf("@");
    if (firstAt === -1 || firstAt !== lastAt) return false;
    const dotAfterAt = email.indexOf(".", firstAt + 1);
    return dotAfterAt !== -1;
  };
  if (!isValidEmail()) {
    errors.email = "Invalid email format";
  }

  // 3. phone: exactly 10 digits, starts with 6, 7, 8, or 9
  const phone = data.phone;
  const isValidPhone = () => {
    if (typeof phone !== "string" || phone.length !== 10) return false;
    if (!["6", "7", "8", "9"].includes(phone[0])) return false;
    for (let i = 0; i < phone.length; i++) {
      if (phone[i] < "0" || phone[i] > "9") return false;
    }
    return true;
  };
  if (!isValidPhone()) {
    errors.phone = "Invalid Indian phone number";
  }

  // 4. age: integer between 16 and 100 inclusive (handles string conversion)
  const isValidAge = () => {
    let ageVal = data.age;
    if (typeof ageVal === "string") {
      const trimmed = ageVal.trim();
      if (trimmed === "") return false;
      ageVal = Number(trimmed);
    }
    if (typeof ageVal !== "number" || isNaN(ageVal) || !Number.isInteger(ageVal)) {
      return false;
    }
    return ageVal >= 16 && ageVal <= 100;
  };
  if (!isValidAge()) {
    errors.age = "Age must be an integer between 16 and 100";
  }

  // 5. pincode: exactly 6 digits, NOT starting with "0"
  const pincode = data.pincode;
  const isValidPincode = () => {
    if (typeof pincode !== "string" || pincode.length !== 6) return false;
    if (pincode[0] === "0") return false;
    for (let i = 0; i < pincode.length; i++) {
      if (pincode[i] < "0" || pincode[i] > "9") return false;
    }
    return true;
  };
  if (!isValidPincode()) {
    errors.pincode = "Invalid Indian pincode";
  }

  // 6. state: optional chaining + nullish coalescing, must be non-empty string
  const state = data?.state ?? "";
  if (typeof state !== "string" || state.trim() === "") {
    errors.state = "State is required";
  }

  // 7. agreeTerms: must be truthy
  if (!Boolean(data.agreeTerms)) {
    errors.agreeTerms = "Must agree to terms";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}