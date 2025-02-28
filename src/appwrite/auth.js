import { Client, Account, ID } from "appwrite";
import conf from "../envImport/conf.js";
// FOLLOW DOCUMENTATION OF APPWRITE
// Improved code
// make a class
export class AuthService {
  client = new Client();
  account;
  constructor() {
    this.client
      .setEndpoint(conf.appwriteEndpoint) // Your API Endpoint
      .setProject(conf.appwriteProjectId); // Your project ID

    this.account = new Account(this.client);
  }

  // making a wrapper function
  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );

      if (userAccount) {
        // calling another function
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      const result = await this.account.createEmailPasswordSession(
        email,
        password
      );
      console.log(result);
      return result;
    } catch (error) {
      throw error;
    }
  }

  // get current user / check authentication state
  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      throw error;
    }

    return null;
  }

  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      throw error;
    }
  }
}

const authService = new AuthService();
export default authService;
/*
const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
    .setProject('<PROJECT_ID>');                 // Your project ID

const account = new Account(client);

const promise = account.updatePrefs({darkTheme: true, language: 'en'});

promise.then(function (response) {
    console.log(response); // Success
}, function (error) {
    console.log(error); // Failure
});
*/
