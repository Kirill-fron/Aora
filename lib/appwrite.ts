import { Client, Account, Avatars, Databases, ID } from 'react-native-appwrite';

export const config = {
    endpoint: "https://cloud.appwrite.io/v1",
    platform: "com.jsm.aora",
    projectId: "67b6fdde0005abcd99e9",
    databaseId: "67b70027002c63d79cbe",
    userCollectionId: "67b7005c00022e9e27e9",
    videoCollectionId: "67b700890010a1574a55",
    storageId: "67b7031a0037eadf3c5f",
};

const client = new Client();

client
    .setEndpoint(config.endpoint)
    .setProject(config.projectId)
    .setPlatform(config.platform)
    ;


const account = new Account(client);
const avatars = new Avatars(client);
const database = new Databases(client);

export async function createUser(email, password, username) {
    try {
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        );


        if (!newAccount) throw Error

        const avatarUrl = avatars.getInitials(username);

        await signIn(email, password);

        const newUser = await database.createDocument(
            config.databaseId,
            config.userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email,
                username,
                avatar: avatarUrl,
            }
        );
        return newUser;
    } catch (error) {
        throw new Error(String(error));
    }
}

export async function signIn(email, password) {
    try {
        const session = await account.createSession(email, password);
        return session;
    } catch (error) {
        throw new Error(String(error));
    }
}


