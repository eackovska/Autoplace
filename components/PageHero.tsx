import "./PageHero.css";

export default function PageHero({
    title,
    subtitle,
    image,
}: {
    title: string;
    subtitle?: string;
    image?: string;
}) {
    return (
        <section className="page-hero" style={image ? { backgroundImage: `url("${image}")` } : undefined}>
            <div className="page-hero-overlay"/>
            <div className="page-hero-inner">
                <span className="page-hero-bar" aria-hidden="true"/>
                <h1 className="page-hero-title">{title}</h1>
                {subtitle && <p className="page-hero-subtitle">{subtitle}</p>}
            </div>
        </section>
    );
}