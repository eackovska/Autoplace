import { supabase } from "@/lib/supabase";
import { getDictionary } from "@/lib/i18n";
import PageHero from "@/components/PageHero";
import "./news.css";

function formatDate(dateString: string, locale: "mk" | "en"): string {
    const date = new Date(dateString);
    return date.toLocaleDateString(locale === "en" ? "en-GB" : "mk-MK", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
}

export default async function NewsPage() {
    const { t, locale } = await getDictionary();
    const np = t.newsPage;

    const { data, error } = await supabase
         .from("news")
         .select("id, title, content, title_en, content_en, image_url, created_at")
         .order("created_at", { ascending: true});

    if(error) {
        console.error("Грешка при вчитување новости:", error.message);
    }

    const news = (data ?? []).map((item) => ({
        ...item,
        displayTitle:
           locale === "en" && item.title_en ? item.title_en : item.title,
        displayContent:
           locale === "en" && item.content_en ? item.content_en : item.content,
    }));

    return (
        <main>
            <PageHero title={np.title} subtitle={np.subtitle} image="/page-heroes/news.jpg" />

            <section className="news-list-wrapper">
                {news.length === 0 ? (
                    <p className="news-empty">{np.empty}</p>
                ) : (
                    <div className="news-list">
                        {news.map((item) => (
                            <article key={item.id} className="news-card">
                                {item.image_url && (
                                    <div className="news-card-image">
                                        <img src={item.image_url} alt={item.displayTitle}/>
                                    </div>
                                )}
                                <div className="news-card-body">
                                    <p className="news-card-date">
                                        {formatDate(item.created_at, locale)}
                                    </p>
                                    <h2>{item.displayTitle}</h2>
                                    <p className="news-card-text">{item.displayContent}</p>
                                </div>
                            </article>
                        ))}
                    </div>
                    )}
            </section>
        </main>
    );
}