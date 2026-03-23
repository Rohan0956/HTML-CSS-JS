const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const fromDropDown = document.getElementById("from-currency-select");
const toDropDown = document.getElementById("to-currency-select");
// let fromName = document.getElementById("name");


// Currency list (can be dynamically fetched too)
let currencyCodes = [
  "usd", // United States
  "inr", // India
  "eur", // European Union
  "gbp", // United Kingdom
  "jpy", // Japan
  "cad", // Canada
  "aud", // Australia
  "chf", // Switzerland

  // Additional commonly used currencies:
 
  "cny", // China
  "rub", // Russia
  "hkd", // Hong Kong
  "sgd", // Singapore
  "zar", // South Africa
  "krw", // South Korea
  "brl", // Brazil
  "mxn", // Mexico
  "nzd", // New Zealand
  "sek", // Sweden
  "nok", // Norway
  "dkk", // Denmark
  "aed", // United Arab Emirates
  "myr", // Malaysia
  "thb", // Thailand
  "idr", // Indonesia
  "pln", // Poland
];

// let currencyCodes = [
// "usd : United States",
//    "ind : India",
//    " eur :European Union",
//    " doll : United Kingdom",
//    " yun : Japan"];

currencyCodes.forEach(code => {
  const option1 = document.createElement("option");
  option1.value = code;
  option1.text = code.toUpperCase();
  fromDropDown.add(option1);

  const option2 = document.createElement("option");
  option2.value = code;
  option2.text = code.toUpperCase();
  toDropDown.add(option2);
});


// Default selections
fromDropDown.value = "usd";
toDropDown.value = "inr";

document.querySelector("button").addEventListener("click", async () => {
  const amount = parseFloat(document.getElementById("amount").value);
  const fromCurrency = fromDropDown.value;
  const toCurrency = toDropDown.value;

  if (!amount || amount <= 0) {
    document.getElementById("result").innerText = "Please enter a valid amount.";
    return;
  }

  const url = `${BASE_URL}/${fromCurrency}.min.json`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    
    const data = await res.json();
    const rate = data[fromCurrency][toCurrency];

    if (!rate) {
      document.getElementById("result").innerText = "Conversion rate not available.";
      return;
    }

    const converted = (amount * rate).toFixed(2);
    document.getElementById("result").innerText = `${amount} ${fromCurrency.toUpperCase()} = ${converted} ${toCurrency.toUpperCase()}`;
  } catch (err) {
    console.error("Error fetching data:", err);
    document.getElementById("result").innerText = "Failed to fetch exchange rate.";
  }
})