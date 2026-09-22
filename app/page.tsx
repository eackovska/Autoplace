import { supabase }  from "@/lib/supabase";
import RecommendedCars, { type Car } from "@/components/RecommendedCars"; 
import Link from "next/link";

export default async function Home() {
  const { data, error} = await supabase 
  .from("cars")
  .select("id, brand, model, year, price, kilometers, fuel, car_images(image_url, is_main)")
  .eq("status", "достапен")
  .order("created_at", { ascending: true })
  .limit(8);

  if(error){
    console.error("Грешка при вчитување автомобил",  error.message);
  }

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
        <div  className="hero-content">
          <p className="hero-small">НАЈДЕТЕ ГО ВАШИОТ СОВРШЕН АВТОМОБИЛ</p>
          <h1>Проверени возила.<br/><span>Најдобри цени.</span></h1>

          <p className="hero-text">Голем избор на квалитетни половни автомобили по најдобри цени. Безбедно, брзо и лесно!</p>

          <div className="hero-buttons">
            <a href="/cars" className="primary-button">Прегледај возила</a>
          </div>
        </div>
      </section>
      <RecommendedCars car={car}></RecommendedCars>
    </main>
  );
}