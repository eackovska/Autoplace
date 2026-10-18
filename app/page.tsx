import { supabase }  from "@/lib/supabase";
import RecommendedCars, { type Car } from "@/components/RecommendedCars"; 
import { getDictionary } from "@/lib/i18n";

export default async function Home() {
  const { t, locale } = await getDictionary();

  const { data, error} = await supabase 
  .from("cars")
  .select("id, brand, model, year, price, kilometers, fuel, car_images(image_url, is_main)")
  .eq("status", "достапен")
  .order("created_at", { ascending: true })
  .limit(8);

  if(error){
    console.error("Грешка при вчитување автомобил",  error.message);
  }

  const h = t.hero;

  const car: Car[] = (data ?? []).map((c) => {
    const images = (c as unknown as {
      car_images: { image_url: string; is_main: boolean}[];
    }).car_images ?? [];

    const mainImage = 
    images.find((img) => img.is_main)?.image_url ??
    images[0]?.image_url ?? null;

    return{
      id: c.id,
      brand: c.brand,
      model: c.model,
      year: c.year,
      price: c.price,
      kilometers: c.kilometers,
      fuel: c.fuel,
      main_image: mainImage,
    };
  });


  return (
    <main>
      <section className="hero">
        <div  className="hero-diagonal"/>
        <div className="hero-content">
          <p className="hero-small">{h.small}</p>
          <h1>{h.title1}<br/><span>{h.title2}</span></h1>

          <p className="hero-text">{h.text}</p>

          <div className="hero-buttons">
            <a href="/cars" className="primary-button">{h.cta}</a>
          </div>
        </div>

        <div className="hero-car-glow"/>
        <img src="/hero-image.png" alt="" className="hero-car-img"/>
      </section>
      <RecommendedCars car={car} title={t.recommended.title} locale={locale}/>
    </main>
  );
}