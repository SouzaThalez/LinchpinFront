import { User } from "../user";

export interface UserDocumentModel{
    docID: string;    // Document ID
    userData: User;   // User data (from the User class)
  }