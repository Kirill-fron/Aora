import { Client, Account, Avatars, Databases, ID } from 'react-native-appwrite';


export const config = {
    endpoint: "https://cloud.appwrite.io/v1",
    platform: "com.jsm.aora",
    projectId: "67b7e67f0012bb7406ca",
    databaseId: "67b7e7e1002d87be154d",
    userCollectionId: "67b7e7ff001e2b038a23",
    videoCollectionId: "67b7e81d00236c4ed3d3",
    storageId: "67b7ea510018a286b1af",
}

const client = new Client();

client
    .setEndpoint(config.endpoint)
    .setProject(config.projectId)
    .setPlatform(config.platform)
    ;


const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);


export const createUser = async (email: string, password: string, username: string) => {
    try {
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        )

        if (!newAccount) throw Error


        const avatarUrl = avatars.getInitials(username)

        await signIn(email, password)

        const newUser = await  databases.createDocument(
            config.databaseId,
            config.userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email,
                username,
                avatar: avatarUrl
            }
        )

        return newUser
    } catch (error) {
        console.log(error);
        throw new Error(String(error));
    }
}

export async function signIn(email: string, password: string) {
    try {
        const session = await account.createEmailPasswordSession(email, password)
        return session
    } catch (error) {
        throw new Error(String(error));
    }
}
