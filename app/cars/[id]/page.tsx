import { supabase } from "@/lib/supabase";
import CarGallery from "@/components/CarGallery";
import "./car-detail.css";

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

    const { data: car, error } = await supabase
    .from("cars")
    .select("id, brand, model, year, price, fuel, capacity, power, gearbox, kilometers, color, carbody, condition, car_images(image_url, is_main)")
    .eq("id",id)
    .single();

    if(error || !car) {
        return (
            <main className="car-detail-notfound">
                <h1>Автомобилот не е пронајден.</h1>
                <p>Можеби е продаден или линкот е погрешен.</p>
                <a href="/cars" className="primary-button">Назад кон сите автомобили</a>
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
                            <span className="spec-label">Година</span>
                            <span className="spec-value">{car.year ?? "-"}</span>
                        </div>
                        <div className="spec">
                            <span className="spec-label">Километри</span>
                            <span className="spec-value">{format(car.kilometers)} km</span>
                        </div>
                        <div className="spec">
                            <span className="spec-label">Гориво</span>
                            <span className="spec-value">{car.fuel ?? "-"}</span>
                        </div>
                        <div className="spec">
                            <span className="spec-label">Кубикажа</span>
                            <span className="spec-value">{car.capacity ? `${format(car.capacity)} cm³` : "-"}</span>
                        </div>
                        <div className="spec">
                            <span className="spec-label">Моќност</span>
                            <span className="spec-value">{car.power ? `${car.power} KS` : "-"}</span>
                        </div>
                        <div className="spec">
                            <span className="spec-label">Менувач</span>
                            <span className="spec-value">{car.gearbox ?? "-"}</span>
                        </div>
                        <div className="spec">
                            <span className="spec-label">Боја</span>
                            <span className="spec-value">{car.color ?? "-"}</span>
                        </div>
                        <div className="spec">
                            <span className="spec-label">Каросерија</span>
                            <span className="spec-value">{car.carbody ?? "-"}</span>
                        </div>
                        <div className="spec">
                            <span className="spec-label">Состојба</span>
                            <span className="spec-value">{car.condition ?? "-"}</span>
                        </div>
                    </div>
                    <a href="/contact" className="primary-button car-detail-c">Контактирај нè за овој автомобил</a>
                </div>
            </div>
            <a href="/cars" className="car-detail-back">← Назад кон сите автомобили</a>
        </main>
    );
}