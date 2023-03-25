import { initializeApp } from "firebase-admin/app";
import { getStorage } from "firebase-admin/storage";

const app = initializeApp();
export const storage = getStorage(app);
