# Discord Utility Bot

A versatile Discord bot offering multiple functionalities, including currency conversion, Amazon product price checking, and user reminders.

## Features

- **Currency Converter**: Convert amounts between various currencies using the `/convert` command.
- **Amazon Price Checker**: Check the price of Amazon products using the `/amazon` command.
- **Reminder System**: Send reminders to users with custom messages using the `/reminder` command.

## Commands

### Currency Converter

Use the `/convert` command to convert amounts between different currencies.

**Command Structure**:

```
/convert [amount] [from-currency] [to-currency]
```

**Parameters**:

- `amount` (required): Amount to convert.
- `from-currency` (optional): Currency from which you want to convert (e.g., USD, EUR, GBP). Defaults to USD if not specified.
- `to-currency` (optional): Currency to which you want to convert (e.g., USD, EUR, GBP). Defaults to GBP if not specified.

### Amazon Price Checker

Use the `/amazon` command to check the price of a product on Amazon.

**Command Structure**:

```
/amazon [link]
```

**Parameters**:

- `link` (required): The URL of the Amazon product.

**Example Response**:

- Product Title
- Original Price
- Discounted Price (if available)
- Rating
- Thumbnail Image

### Reminder System

Use the `/reminder` command to send a reminder to a user.

**Command Structure**:

```
/reminder [target-user] [message]
```

**Parameters**:

- `target-user` (required): The user to whom the reminder will be sent.
- `message` (optional): The custom reminder message.

## Configuration

To configure the bot, set the following environment variables:

```bash
TOKEN ='TOKEN HERE'
CLIENT_ID = 'BOT ID'
GUILD_ID = 'SERVER ID'
```

## Example Usage

1. **Currency Converter**:

   - Command: `/convert 100 USD EUR`
   - Bot Response: `100 USD is approximately 85 EUR.`

2. **Amazon Price Checker**:

   - Command: `/amazon https://www.amazon.com/dp/B08N5WRWNW`
   - Bot Response:
     ```
     Product Title: Example Product
     Original Price: $50.00
     Discounted Price: $45.00
     Rating: 4.5/5
     ```

3. **Reminder System**:
   - Command: `/reminder @user Don't forget the meeting at 3 PM!`
   - Bot Response: `Reminder set for @user: "Don't forget the meeting at 3 PM!"`

## Social Media Links

For more information and updates, follow my posts on:

- [Twitter](https://twitter.com/bilal_the_dev/status/1768520539155427707)
- [LinkedIn](https://www.linkedin.com/feed/update/urn:li:share:7174285804301651968/)
- [Facebook](https://www.facebook.com/permalink.php?story_fbid=pfbid02mXhoPTEx5YKmfP7Rzrnc2UbN12bufduivhfZSwm3Bp2A68gN3fKsDDpanCw3hL3Ul&id=61556182875591&__cft__[0]=AZXUVu8H3vFm8-mKrqog67-gftIXT58S3ewE0NZ0to1UuNNz7gmxc26Af8y_IaQYQVcxkORN1NFp0tRndFczCW55M7hv7gp5YWWIJKX9OZK_Ww&__tn__=%2CO%2CP-R)

## Installation

To get started with the bot, follow the general guide on how to run my Discord bots [here](https://github.com/bilal-the-dev/How-to-run-my-discord-bots). If you encounter any issues, please open an issue on GitHub.
The start command in this case is `node src/index.js`.
