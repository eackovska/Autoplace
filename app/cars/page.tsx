import { supabase } from "@/lib/supabase";
import "./cars.css";
import Link from "next/link";

type Car = {
    id: number;
    brand: string;
    model: string;
    year: number;
    price: number;
    kilometers: number;
    fuel: string;
    main_image: string | null;
};

function format(number: number): string {
    if(number == null){
        return "-";
    }
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

type SearchParams = { [key: string]: string | string[] | undefined };

export default async function CarsPage({
    searchParams,
}: {
    searchParams: Promise<SearchParams>;
}) {
    const params = await searchParams;

    const search = typeof params.search == "string" ? params.search : "";
    const brand = typeof params.brand == "string" ? params.brand : "";
    const fuel = typeof params.fuel == "string" ? params.fuel : "";
    const gearbox = typeof params.gearbox == "string" ? params.gearbox : "";
    const minPrice = params.minPrice ? Number(params.minPrice) : undefined;
    const maxPrice = params.maxPrice ? Number(params.maxPrice) : undefined;
    const minYear = params.minYear ? Number(params.minYear) : undefined;
    const maxYear = params.maxYear ? Number(params.maxYear) : undefined;
    const sort = typeof params.sort == "string" ? params.sort : "newest";

    const { data: allCars } = await supabase
    .from("cars")
    .select("brand, fuel, gearbox")
    .eq("status", "достапен");

    const brands = [...new Set((allCars ?? []).map((c) => c.brand))].sort();
    const fuels = [...new Set((allCars ?? []).map((c) => c.fuel))].sort();
    const gearboxes = [...new Set((allCars ?? []).map((c) => c.gearbox))].sort();

    let query = supabase
        .from("cars")
        .select("id, brand, model, year, price, kilometers, fuel, car_images(image_url,is_main)")
        .eq("status", "достапен")

    if (search) {
        query = query.or(`brand.ilike.%${search}%,model.ilike.%${search}%`);
    }
    if (brand) query = query.eq("brand", brand);
    if (fuel) query = query.eq("fuel", fuel);
    if (gearbox) query = query.eq("gearbox", gearbox);
    if (minPrice != null) query = query.gte("price", minPrice);
    if (maxPrice != null) query = query.lte("price", maxPrice);
    if (minYear != null) query = query.gte("year", minYear);
    if (maxYear != null) query = query.lte("year", maxYear);

    const sortOptions: Record<string, { column: string; ascending: boolean }> = {
        newest: { column: "created_at", ascending: false },
        price_asc: { column: "price", ascending: true },
        price_desc: { column: "price", ascending: false },
        year_asc: { column: "year", ascending: true },
        year_desc: { column: "year", ascending: false },
        km_asc: { column: "kilometers", ascending: true },
    };

    const chosenSort = sortOptions[sort] ?? sortOptions.newest;

    const { data, error } = await query.order(chosenSort.column, {
        ascending: chosenSort.ascending,
    });

    if(error){
        console.error("Грешка при вчитување автомобил", error.message);
    }

    const cars: Car[] = (data ?? []).map((c) => {

        const images = (c as unknown as {
            car_images: { image_url: string; is_main: boolean }[];
        }).car_images ?? [];

        const mainImage = 
        images.find((img) => img.is_main)?.image_url ??
        images[0]?.image_url ?? null;

        return {
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

    const hasActiveFilters = search || brand || fuel || gearbox || minPrice || maxPrice || minYear || maxYear;

    return (
        <main>
            <section className="cars-page-header">
                <h1>Достапни автомобили</h1>
                <p>{cars.length} автомобили се моментално достапни</p>
            </section>

            <section className="cars-filters-wrapper">
                <form method="get" className="cars-filters">
                    <input type="text" name="search" placeholder="Пребарај марка или модел..." defaultValue={search} className="filter-search"/>
                    
                    <select name="brand" defaultValue={brand}>
                        <option value="">Сите марки</option>
                            {brands.map((b) => (
                                <option key={b} value={b}>
                                    {b}
                                </option>
                            ))}
                    </select>

                    <select name="fuel" defaultValue={fuel}>
                        <option value="">Сите горива</option>
                            {fuels.map((f) => (
                                <option key={f} value={f}>
                                    {f}
                                </option>
                            ))}
                    </select>

                    <select name="gearbox" defaultValue={gearbox}>
                        <option value="">Сите менувачи</option>
                            {gearboxes.map((g) => (
                                <option key={g} value={g}>
                                    {g}
                                </option>
                            ))}
                    </select>

                    <input type="number" name="minPrice" placeholder="Цена од (€)" defaultValue={minPrice ?? ""}/>
                    <input type="number" name="maxPrice" placeholder="Цена до (€)" defaultValue={maxPrice ?? ""}/>
                    <input type="number" name="minYear" placeholder="Година од" defaultValue={minYear ?? ""}/>
                    <input type="number" name="maxYear" placeholder="Година до" defaultValue={maxYear ?? ""}/>

                    <button type="submit" className="filter-submit">Пребрај</button>

                    <select name="sort" defaultValue={sort} className="filter-sort">
                        <option value="newest">Најново прво</option>
                        <option value="price_asc">Цена: Најниска прво</option>
                        <option value="price_desc">Цена: Највисока прво</option>
                        <option value="year_desc">Година: Најнова прво</option>
                        <option value="year_asc">Година: Најстара прво</option>
                        <option value="km_asc">Најмалку километри</option>
                    </select>

                    {hasActiveFilters && (
                        <a href="/cars" className="filter-clear">
                            Исчисти филтри
                        </a>
                    )}
                </form>
            </section>

            <section className="cars-grid-wrapper">
                {cars.length == 0 ? (
                    <p className="cars-empty">Нема автомобили што се совпаѓаат со твоето пребарување.</p>
                 ) : (
                    <div className="cars-grid">
                        {cars.map((c) => (
                            <a href={`/cars/${c.id}`} key={c.id} className="grid-card">
                                <div className="grid-card-image">
                                    <img src={c.main_image ?? "/cars/placeholder.jpg"} alt={`${c.brand} ${c.model}`}/>
                                </div>
                                <div className="grid-card-body">
                                    <h3>
                                        {c.brand} {c.model}
                                    </h3>
                                    <p className="grid-card-meta">
                                        {c.year} · {format(c.kilometers)} km · {c.fuel}
                                    </p>
                                    <p className="grid-card-price">
                                        {format(c.price)} €
                                    </p>
                                </div>
                            </a>
                        ))}
                    </div>
                 )}
            </section>
        </main>
    );
}