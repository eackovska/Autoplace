import "./about.css";
import { getDictionary } from "@/lib/i18n";
import PageHero from "@/components/PageHero";

export default async function AboutPage() {
    const { t } = await getDictionary();
    const a = t.aboutPage;

    return (
        <main>
            <PageHero title={a.title} subtitle={a.subtitle} image="/page-heroes/about.jpg"/>

            <section className="about-story">
                <div className="about-story-text">
                    <h2>{a.storyTitle}</h2>
                    <p>
                        {a.storyP1}
                    </p>
                    <p>
                        {a.storyP2}
                    </p>
                </div>
            </section>

            <section className="about-features">
                <div className="about-feature">
                    <div className="about-feature-icon">
                        <img src="checked.png"/>
                    </div>
                    <h3>{a.vehicles.title}</h3>
                    <p>{a.vehicles.text}</p>
                </div>

                <div className="about-feature">
                    <div className="about-feature-icon">
                        <img src="euro.png"/>
                    </div>
                    <h3>{a.prices.title}</h3>
                    <p>{a.prices.text}</p>
                </div>

                <div className="about-feature">
                    <div className="about-feature-icon">
                        <img src="fast-forward.png"/>
                    </div>
                    <h3>{a.process.title}</h3>
                    <p>{a.process.text}</p>
                </div>

                <div className="about-feature">
                    <div className="about-feature-icon">
                        <img src="handshake.png"/>
                    </div>
                    <h3>{a.trust.title}</h3>
                    <p>{a.trust.text}</p>
                </div>
            </section>

            <section className="about-team">
                <h2>{a.team.title}</h2>
                <div className="team-grid">
                    <div className="team-member">
                        <h3>{a.team.employee1.name}</h3>
                        <p>{a.team.employee1.role}</p>
                    </div>
                    <div className="team-member">
                        <h3>{a.team.employee2.name}</h3>
                        <p>{a.team.employee2.role}</p>
                    </div>
                </div>
            </section>

            <section className="about-c">
                <h2>{a.cta.title}</h2>
                <p>{a.cta.text}</p>
                <a href="/contact" className="primary-button">{a.cta.button}</a>
            </section>
        </main>
    );
}