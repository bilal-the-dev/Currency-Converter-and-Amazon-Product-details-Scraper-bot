const axios = require("axios");

const API_KEY = "77430ba114a03f91ad75e33f";
const API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/`;

async function convertCurrency(amount, fromCurrency, toCurrency) {
  try {
    const response = await axios.get(`${API_URL}${fromCurrency}`);
    const rates = response.data.conversion_rates;
    const rate = rates[toCurrency];
    if (!rate) {
      return;
    }
    const convertedAmount = (amount * rate).toFixed(2);
    const message = `${amount} ${fromCurrency} is equal to ${convertedAmount} ${toCurrency}`;

    return {
      amount,
      fromCurrency,
      toCurrency,
      convertedAmount,
      message,
    };
  } catch (error) {
    await interaction.editReply(
      `Unable to convert from ${fromCurrency} to ${toCurrency}, the entered currency is not correct please make sure to visit https://www.foreignexchangelive.com/currency-codes-symbols/ and  see the corresponding currency code`
    );
  }
}

module.exports = convertCurrency;
