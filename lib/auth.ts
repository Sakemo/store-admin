import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { phoneNumber } from "better-auth/plugins";
import Database from "better-sqlite3";

export const auth = betterAuth({
    emailAndPassword: {
        enabled:true
    },
    plugins: [
        nextCookies(),
        phoneNumber({
            sendOTP:({phoneNumber, code}, ctx) => {
                console.log(`Send ${code} to ${phoneNumber} - CTX:[${ctx}]`)
            },
        })
    ],
    database: new Database("./sqlite.db"),
})