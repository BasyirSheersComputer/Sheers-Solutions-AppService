const { CosmosClient } = require("@azure/cosmos");

const client = new CosmosClient({
    endpoint: process.env.COSMOS_DB_ENDPOINT,  // Cosmos DB endpoint in Azure Static Web App settings
    key: process.env.COSMOS_DB_KEY             // Cosmos DB primary key in Azure Static Web App settings
});
const database = client.database("SheersDigital-Website");
const container = database.container("WebsiteForm");

module.exports = async function (context, req) {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !phone || !message) {
        context.res = {
            status: 400,
            body: "All fields are required."
        };
        return;
    }

    try {
        // Insert data into Cosmos DB
        const { resource: newItem } = await container.items.create({
            name: name,
            email: email,
            phone: phone,
            message: message,
            timestamp: new Date().toISOString()
        });
        context.res = {
            status: 201,
            body: { message: "Data saved successfully", newItem }
        };
    } catch (error) {
        console.error("Error writing to Cosmos DB", error);
        context.res = {
            status: 500,
            body: "An error occurred while saving data"
        };
    }
};
