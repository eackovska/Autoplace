import { supabase } from "@/lib/supabase";
import CarGallery from "@/components/CarGallery";
import "./car-detail.css";
import { getDictionary } from "@/lib/i18n";
import { translateCarText } from "@/lib/CarTerms";

function format(number: number | null | undefined): string {
    if (number == null) return "-";
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export default async function CarDetailPage({
    params,
}: {
    params: Promise<{id: string }>;
}) {
    const { id } = await params;
    const { t, locale } = await getDictionary();
    const cd = t.carDetail;

    const { data: car, error } = await supabase
    .from("cars")
    .select("id, brand, model, year, price, fuel, capacity, power, gearbox, kilometers, color, carbody, condition, car_images(image_url, is_main)")
    .eq("id",id)
    .single();

    if(error || !car) {
        return (
            <main className="car-detail-notfound">
                <h1>{cd.notFoundTitle}.</h1>
                <p>{cd.notFoundText}</p>
                <a href="/cars" className="primary-button">{cd.notFoundButton}</a>
            </main>
        );
    }

    const images = 
    (
        car as unknown as {
            car_images: { image_url: string; is_main: boolean}[];
        }
    ).car_images ?? [];

    const sortedImages = [...images].sort((a,b) => 
        a.is_main == b.is_main ? 0 : a.is_main ? -1 : 1
    );

    return (
        <main className="car-detail">
            <div className="car-detail-top">
                <CarGallery images={sortedImages} alt={`${car.brand} ${car.model}`}/>
                <div className="car-detail-info">
                    <h1>
                        {car.brand} {car.model}
                    </h1>
                    <p className="car-detail-price">{format(car.price)} €</p>
                    <div className="car-detail-specs">
                        <div className="spec">
                            <span className="spec-label">{cd.year}</span>
                            <span className="spec-value">{car.year ?? "-"}</span>
                        </div>
                        <div className="spec">
                            <span className="spec-label">{cd.km}</span>
                            <span className="spec-value">{format(car.kilometers)} km</span>
                        </div>
                        <div className="spec">
                            <span className="spec-label">{cd.fuel}</span>
                            <span className="spec-value">{translateCarText(car.fuel, locale)}</span>
                        </div>
                        <div className="spec">
                            <span className="spec-label">{cd.capacity}</span>
                            <span className="spec-value">{car.capacity ? `${format(car.capacity)} L` : "-"}</span>
                        </div>
                        <div className="spec">
                            <span className="spec-label">{cd.power}</span>
                            <span className="spec-value">{car.power ? `${car.power} KS` : "-"}</span>
                        </div>
                        <div className="spec">
                            <span className="spec-label">{cd.gearbox}</span>
                            <span className="spec-value">{translateCarText(car.gearbox, locale)}</span>
                        </div>
                        <div className="spec">
                            <span className="spec-label">{cd.color}</span>
                            <span className="spec-value">{translateCarText(car.color, locale)}</span>
                        </div>
                        <div className="spec">
                            <span className="spec-label">{cd.carbody}</span>
                            <span className="spec-value">{translateCarText(car.carbody, locale)}</span>
                        </div>
                        <div className="spec">
                            <span className="spec-label">{cd.condition}</span>
                            <span className="spec-value">{translateCarText(car.condition, locale)}</span>
                        </div>
                    </div>
                    <a href="/contact" className="primary-button car-detail-c">{cd.ctaButton}</a>
                </div>
            </div>
            <a href="/cars" className="car-detail-back">{cd.back}</a>
        </main>
    );
}