const {
  ApplicationCommandOptionType,
  PermissionFlagsBits,
  EmbedBuilder,
  time,
} = require("discord.js");
const convertCurrency = require("../../utils/currencyConvertor");

module.exports = {
  name: "convert",
  description: "convert a currecncy!",
  options: [
    {
      name: "amount",
      description: "Amount to Convert.",
      required: true,
      type: ApplicationCommandOptionType.Number,
    },
    {
      name: "from-currency",
      description:
        "Currency from you want to convert, make sure to add Abbreviation of Currency e.g USD, EUR",
      required: false,
      type: ApplicationCommandOptionType.String,
      choices: [
        { name: "USD - United States Dollar", value: "USD" },
        { name: "EUR - Euro", value: "EUR" },
        { name: "GBP - British Pound Sterling", value: "GBP" },
      ],
    },
    {
      name: "to-currency",
      description:
        "The currency to convert into, make sure to add Abbreviation of Currency e.g USD, EUR",
      required: false,
      type: ApplicationCommandOptionType.String,
      choices: [
        { name: "USD - United States Dollar", value: "USD" },
        { name: "EUR - Euro", value: "EUR" },
        { name: "GBP - British Pound Sterling", value: "GBP" },
      ],
    },
  ],
  callback: async (client, interaction) => {
    try {
      await interaction.deferReply();
      let fromCurrency =
        interaction.options.get("from-currency")?.value || "USD";
      let toCurrency = interaction.options.get("to-currency")?.value || "GBP";
      const amount = interaction.options.get("amount").value;

      const conversion = await convertCurrency(
        amount,
        fromCurrency.toUpperCase(),
        toCurrency.toUpperCase(),
        interaction
      );
      if (!conversion) {
        return await interaction.editReply(
          `Unable to convert from ${fromCurrency} to ${toCurrency}, the entered currency is not correct please make sure to visit https://www.foreignexchangelive.com/currency-codes-symbols/ and  see the corresponding currency code`
        );
      }
      const embed = new EmbedBuilder()
        .setColor(0x0099ff) // Blue color
        .setTitle("Currency Conversion")
        .setDescription(conversion.message)
        .addFields(
          {
            name: "Amount",
            value: `${conversion.amount} ${conversion.fromCurrency}`,
            inline: true,
          },
          {
            name: "Converted Amount",
            value: `${conversion.convertedAmount} ${conversion.toCurrency}`,
            inline: true,
          }
        );

      await interaction.editReply({ embeds: [embed] });
    } catch (error) {
      console.log(error);
    }
  },
};
