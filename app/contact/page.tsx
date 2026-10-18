import { getDictionary } from "@/lib/i18n";
import ContactForm from "@/components/ContactForm";
import PageHero from "@/components/PageHero";
import "./contact.css";

const PHONE_DISPLAY = "078 513 569";
const PHONE_HREF="tel:+38978513569";
const FACEBOOK_URL="https://www.facebook.com/p/TOP-CARS-100026836156246/";
const MAP_QUERY="ул. Шишка бр. 47, Кавадарци, Македонија";

export default async function ContactPage(){
    const { t } = await getDictionary();
    const c = t.contactPage;

    const serviceOptions = (
        Object.keys(c.services) as (keyof typeof c.services)[]
    ).map((key) => ({ value: key, label: c.services[key]}));
    
   const mapSrc =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d805.2295059844317!2d22.018497242629177!3d41.43884918289972!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1356650a1416742b%3A0x910f4098f2084bf5!2sShishka%2047%2C%20Kavadarci!5e0!3m2!1sen!2smk!4v1792103617859!5m2!1sen!2smk";
   const mapLink = "https://maps.app.goo.gl/p8oVrR6xGiTRAiVL9";

   return (
    <main>
        <PageHero title={c.title} subtitle={c.subtitle} image="/page-heroes/contact.jpg" />

        <section className="contact-form-section">
            <div className="contact-form-card">
                <h2>{c.formTitle}</h2>
                <p className="contact-form-sub">{c.formSubTitle}</p>
                <ContactForm services={serviceOptions}
                labels={{
                    firstName: c.firstName,
                    lastName: c.lastName,
                    phone: c.phone,
                    service: c.service,
                    servicePlaceholder: c.servicePlaceholder,
                    message: c.message,
                    messagePlaceholder: c.messagePlaceholder,
                    submit: c.submit,
                    sending: c.sending,
                    success: c.success,
                    error: c.error,
                    required: c.required,
                }} 
                />
            </div>
        </section>

        <section className="contact-info-section">
            <div className="contact-details">
                <h2>{c.detailsTitle}</h2>
                <div className="contact-detail">
                    <span className="contact-detail-label">{c.addressLabel}</span>
                    <p>{c.address}</p>
                    <a href={mapLink} target="_blank" rel="noopener noreferrer">{c.openInMaps}</a>
                </div>
                <div className="contact-detail">
                    <span className="contact-detail-label">{c.phoneLabel}</span>
                    <a href={PHONE_HREF}>{PHONE_DISPLAY}</a>
                </div>
                <div className="contact-detail">
                    <span className="contact-detail-label">{c.hoursLabel}</span>
                    <p>{c.hoursWeekdays}</p>
                    <p>{c.hoursBreak}</p>
                    <p>{c.hoursSaturday}</p>
                </div>
                <div className="contact-detail">
                    <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer">{c.facebookText}</a>
                </div>
            </div>
            <div className="contact-map">
                <iframe title={c.mapTitle} src={mapSrc} loading="lazy" referrerPolicy="no-referrer-when-downgrade"/>
            </div>
        </section>
    </main>
   );
}
