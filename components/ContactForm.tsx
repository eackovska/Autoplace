"use client";

import {  useActionState } from "react";
import {  submitContact, type ContactState } from "@/app/contact/actions";

type Labels = {
    firstName: string;
    lastName: string;
    phone: string;
    service: string;
    servicePlaceholder: string;
    message: string;
    messagePlaceholder: string;
    submit: string;
    sending: string;
    success: string;
    error: string;
    required: string;
};

const initialState: ContactState = { status: "idle" };

export default function ContactForm({
    labels,
    services,
}: {
    labels: Labels;
    services: {value: string; label: string}[];
}) {
    const [state, formAction, pending] = useActionState(submitContact, initialState);

    const v = state.values ?? {};

    return (
        <form action={formAction} className="contact-form">
            <div className="contact-form-row">
                <label className="contact-field">
                    <span>{labels.firstName} *</span>
                    <input
                        type="text" 
                        name="firstName"
                        required
                        maxLength={80}
                        autoComplete="given-name"
                        defaultValue={v.firstName ?? ""}
                        />
                </label>
                <label className="contact-field">
                    <span>{labels.lastName} *</span>
                    <input
                        type="text" 
                        name="lastName"
                        required
                        maxLength={80}
                        autoComplete="family-name"
                        defaultValue={v.lastName ?? ""}
                        />
                </label>
                <label className="contact-field">
                    <span>{labels.phone} *</span>
                    <input
                        type="tel" 
                        name="phone"
                        required
                        maxLength={25}
                        autoComplete="tel"
                        placeholder="07X XXX XXX"
                        defaultValue={v.phone ?? ""}
                        />
                </label>
                <label className="contact-field">
                    <span>{labels.service} *</span>
                    <select name="service" required defaultValue={v.service ?? ""}>
                        <option value="" disabled>{labels.servicePlaceholder}</option>
                    {services.map((s) => (
                        <option key={s.value} value={s.value}>{s.label}</option>
                    ))}
                    </select>
                </label>
            </div>
            <label className="contact-field">
                    <span>{labels.message} *</span>
                    <textarea
                        name="message"
                        required
                        maxLength={2000}
                        placeholder={labels.messagePlaceholder}
                        defaultValue={v.message ?? ""}
                    />
            </label>

            <input
               type="text"
               name="website"
               tabIndex={-1}
               autoComplete="off"
               aria-hidden="true"
               className="contact-hp"
            />

            <button type="submit" className="contact-submit" disabled={pending}>
                {pending ? labels.sending : labels.submit}
            </button>

            {state.status === "success" && (
                <p className="contact-alert contact-alert-success" role="status">{labels.success}</p>
            )}

            {state.status === "invalid" && (
                <p className="contact-alert contact-alert-error" role="alert">{labels.required}</p>
            )}

            {state.status === "error" && (
                <p className="contact-alert contact-alert-error" role="alert">{labels.error}</p>
            )}

            </form>

        );
    }