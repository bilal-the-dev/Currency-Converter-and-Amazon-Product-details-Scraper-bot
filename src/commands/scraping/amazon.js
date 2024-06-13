const { ApplicationCommandOptionType, EmbedBuilder } = require("discord.js");
// const randomUseragent = require("random-useragent");

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
		if (!interaction.guild)
			return await interaction.reply("Command can ba ran inside server only.");

		let page;
		try {
			await interaction.deferReply();
			const url = interaction.options.get("link").value;

			// if (!isAmazonLink(url))
			// 	return await interaction.editReply("Only Amazon links are allowed");
			page = await client.browser.newPage();

			await page.setViewport({ width: 1280, height: 720 });

			// const userAgent = randomUseragent.getRandom();
			// const UA = userAgent;

			// await page.setUserAgent(UA);

			await page.goto(url);

			// try {
			// 	// Wait for the accept button to appear
			// 	await page.waitForSelector("#sp-cc-accept", { timeout: 2000 });

			// 	// Click the accept button
			// 	await page.click("#sp-cc-accept");

			// 	// Wait for the page to fully load after accepting cookies
			// 	await page.waitForNavigation({ waitUntil: "networkidle2" });
			// } catch (error) {
			// 	console.log("Cookie consent pop-up not found or already accepted.");
			// }
			// await page.screenshot({
			// 	path: "demo.png",
			// });
			// const fs = require("fs");
			// const path = require("path");

			// const pageHTML = await page.content();

			// // Define the output file path
			// // const filePath = path.resolve(__dirname, 'page.js');

			// // Write the HTML content to the file
			// fs.writeFile("page.js", pageHTML, (err) => {
			// 	if (err) {
			// 		console.error("Error writing to file", err);
			// 	} else {
			// 		console.log("HTML content saved to page.html");
			// 	}
			// });
			// await page.waitForSelector(".a-price .a-offscreen", { timeout: 5000 });

			// const p = await page.$(".a-price .a-offscreen");

			// console.log(p);

			const productDetails = await page.evaluate(() => {
				let title = document.querySelector("#productTitle")?.innerText.trim();

				if (!title) title = document.querySelector("#title")?.innerText.trim();

				let price = document
					.querySelector(".a-price .a-offscreen")
					?.innerText.trim();

				if (!price)
					price = document.querySelector(".a-price-whole")?.innerText.trim();
				if (!price)
					price = document.querySelector(".aok-offscreen")?.innerText.trim();

				const rating = document.querySelector(".a-icon-alt")?.innerText.trim();

				let image = document.querySelector("#imgTagWrapperId img")?.src;

				if (!image)
					image = document.querySelector("#landing-image-wrapper img")?.src;
				return {
					title,
					price,
					rating,
					image,
					// spanPrice,
				};
			});
			console.log(productDetails);
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
				.setTitle(productDetails.title ?? "Data found")
				.setURL(url)
				.setDescription(
					`**Original Price**: ${
						productDetails.price
					}\n**Discounted Price**: ${discountedPrice}\n**Rating**: ${
						productDetails.rating ?? "Not found"
					}`
				)
				.setTimestamp();

			productDetails.image && embed.setThumbnail(productDetails.image);

			await interaction.editReply({ embeds: [embed] });
		} catch (error) {
			console.log(error);
		} finally {
			if (page && !page.isClosed()) await page.close();
		}
	},
};

function isAmazonLink(url) {
	const amazonPattern = /^(https:\/\/(amzn|amazon))\.[a-z\.]{2,6}\/.*$/i;
	return amazonPattern.test(url);
}

function applyDiscount(priceString) {
	const priceWithoutSymbols = priceString.replace(/[$€£]/g, "");
	const price = parseFloat(priceWithoutSymbols);
	const discountedPrice = price * 0.25;
	const formattedPrice = `${discountedPrice.toFixed(2)}`;
	return formattedPrice;
}
