import { User } from "../user";

export interface AdminUser {
    docID: string;    // Document ID
    userData: User;   // User data (from the User class)
  }