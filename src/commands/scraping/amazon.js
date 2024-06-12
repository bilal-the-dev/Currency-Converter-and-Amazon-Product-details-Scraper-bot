const {
  ApplicationCommandOptionType,
  PermissionFlagsBits,
  EmbedBuilder,
} = require("discord.js");
const randomUseragent = require("random-useragent");

module.exports = {
  name: "amazon",
  description: "checks from the amazon price product",
  options: [
    {
      name: "link",
      description: "the link of amazon product",
      required: true,
      type: ApplicationCommandOptionType.String,
    },
  ],
  callback: async (client, interaction) => {
    let page;
    try {
      await interaction.deferReply();
      const url = interaction.options.get("link").value;

      if (!isAmazonLink(url))
        return await interaction.editReply("Only Amazon links are allowed");
      page = await client.browser.newPage();

      // await page.setViewport({ width: 1280, height: 720 });

      const userAgent = randomUseragent.getRandom();
      const UA = userAgent;

      await page.setUserAgent(UA);

      await page.goto(url);
      // await page.screenshot({
      //   path: "demo.png",
      // });

      const productDetails = await page.evaluate(() => {
        let title = document.querySelector("#productTitle")?.innerText.trim();

        if (!title) title = document.querySelector("#title")?.innerText.trim();

        const price = document
          .querySelector(".a-price .a-offscreen")
          ?.innerText.trim();

        const rating = document.querySelector(".a-icon-alt")?.innerText.trim();

        let image = document.querySelector("#imgTagWrapperId img")?.src;

        if (!image)
          image = document.querySelector("#landing-image-wrapper img")?.src;
        return {
          title,
          price,
          rating,
          image,
        };
      });

      // const TEST_DATA = {
      //   title: "test title",
      //   price: "$100",
      //   rating: "5",
      //   image: "ddd",
      // };

      if (!productDetails["price"])
        return await interaction.editReply(
          "Something went wrong with fetching the product details, please try again."
        );

      const discountedPrice = applyDiscount(productDetails["price"]);

      const embed = new EmbedBuilder()
        .setColor("#0099ff")
        .setTitle(productDetails.title)
        .setDescription(
          `**Original Price**: ${productDetails.price}\n**Discounted Price**: ${discountedPrice}\n**Rating**: ${productDetails.rating}`
        )
        .setThumbnail(productDetails.image)
        .setTimestamp();

      await interaction.editReply({ embeds: [embed] });
    } catch (error) {
      console.log(error);
    } finally {
      if (page && !page.isClosed()) await page.close();
    }
  },
};

function isAmazonLink(url) {
  const amazonPattern = /^(https?:\/\/)?(www\.)?amazon\.[a-z\.]{2,6}\/.*$/i;
  return amazonPattern.test(url);
}

function applyDiscount(priceString) {
  const priceWithoutDollar = priceString.replace("$", "");
  const price = parseFloat(priceWithoutDollar);
  const discountedPrice = price * 0.25;
  const formattedPrice = `$${discountedPrice.toFixed(2)}`;
  return formattedPrice;
}
