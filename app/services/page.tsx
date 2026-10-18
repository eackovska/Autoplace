import { getDictionary } from "@/lib/i18n";
import PageHero from "@/components/PageHero";
import "./services.css";

export default async function ServicesPage(){
    const { t } = await getDictionary();
    const s = t.servicesPage;

    return (
        <main>
            <PageHero title={s.title} subtitle={s.subtitle} image="/page-heroes/services.jpg"/>

            <section className="services-grid">
                <div className="service-card">
                    <img src="uvoz.png" alt="" className="service-icon-img"/>
                    <h3>{s.importSale.title}</h3>
                    <p>{s.importSale.text}</p>
                </div>

                <div className="service-card">
                    <img src="zamena.png" alt="" className="service-icon-img"/>
                    <h3>{s.tradeIn.title}</h3>
                    <p>{s.tradeIn.text}</p>
                </div>

                <div className="service-card">
                    <img src="rent.png" alt="" className="service-icon-img"/>
                    <h3>{s.rentacar.title}</h3>
                    <p>{s.rentacar.text}</p>
                </div>

                <div className="service-card">
                    <img src="raci.png" alt="" className="service-icon-img"/>
                    <h3>{s.warranty.title}</h3>
                    <p>{s.warranty.text}</p>
                </div>

                <div className="service-card">
                    <img src="steering-wheel.png" alt="" className="service-icon-img"/>
                    <h3>{s.testDrive.title}</h3>
                    <p>{s.testDrive.text}</p>
                </div>
            </section>

            <section className="services-cta">
                <h2>{s.ctaTitle}</h2>
                <a href="/contact" className="primary-button">
                    {s.ctaButton}
                </a>
            </section>
        </main>
    );
}