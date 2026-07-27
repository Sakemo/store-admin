"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function signUpAction(formData: FormData) {
const number = formData.get("number") as string;
const password = formData.get("password") as string;
const name = formData.get("name") as string;

const dummyEmail = `${number}@store.com`;

await auth.api.signUpEmail({
    body: {
        email: dummyEmail,
        name: name,
        password: password,
        phoneNumber: number
    },
    headers: await headers()
});
redirect("/");
}

export async function signInAction(formData: FormData) {
const number = formData.get("number") as string;
const password = formData.get("password") as string;

const dummyEmail = `${number}@store.com`

await auth.api.signInEmail({
    body: {
        email: dummyEmail,
        password: password,
    },
    headers: await headers()
});
redirect("/");
}

export async function signOutAction() {
await auth.api.signOut({
    headers: await headers()
});
redirect("/login")
}