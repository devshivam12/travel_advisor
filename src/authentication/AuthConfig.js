import { Client, Account } from "appwrite";

const client = new Client();

client.setEndpoint("https://cloud.appwrite.io/v1").setProject("660180666db7eb1434e4");

export const account = new Account(client);

