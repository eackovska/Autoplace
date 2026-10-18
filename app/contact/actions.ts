"use server";

import { supabase } from "@/lib/supabase";

export type ContactState = {
    status: "idle" | "invalid" | "success" | "error";
    values?: Record<string, string>;
};

const ALLOWED_SERVICES = [
    "importSale",
    "tradeIn",
    "rentacar",
    "testDrive",
    "other",
];

const PHONE_PATTERN = /^\+?[\d\s\-()/]{6,25}$/;

function field(formData: FormData, name: string): string {
    return String(formData.get(name) ?? "").trim();
}

export async function submitContact(
    _prev: ContactState,
    formData: FormData
): Promise<ContactState> {
    if (field(formData, "website")) {
        return {status: "success"};
    }
    const values = {
        firstName: field(formData, "firstName"),
        lastName: field(formData, "lastName"),
        phone: field(formData, "phone"),
        service: field(formData, "service"),
        message: field(formData, "message"),
    };

    const valid =
        values.firstName.length > 0 &&
        values.firstName.length <=80 &&
        values.lastName.length > 0 &&
        values.lastName.length <=80 &&
        PHONE_PATTERN.test(values.phone) &&
        ALLOWED_SERVICES.includes(values.service) &&
        values.message.length > 0 &&
        values.message.length <= 2000;

    if (!valid) {
        return { status: "invalid", values };
    }

    const { error } = await supabase.from("contact_requests").insert(values);

    if (error) {
        console.error("Грешка при зачувување на контакт барањето:", error.message);
        return { status: "error", values };
    }

    return { status: "success" };
}
