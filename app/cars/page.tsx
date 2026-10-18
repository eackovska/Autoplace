import { supabase } from "@/lib/supabase";
import { getDictionary } from "@/lib/i18n";
import { translateCarText } from "@/lib/CarTerms";
import "./cars.css";

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
    const { t, locale } = await getDictionary();
    const cp = t.carsPage;
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

    const priceOptions = [1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000, 11000, 12000, 13000, 14000, 15000];
    const currentYear = new Date().getFullYear();
    const yearOptions = Array.from(
        { length: currentYear - 1999 },
        (_, i) => currentYear - i
    );
    
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
                <h1>{cp.title}</h1>
                <p>{cp.available(cars.length)}</p>
            </section>

            <section className="cars-filters-wrapper">
                <form method="get" className="cars-filters">
                    <input type="text" name="search" placeholder={cp.search} defaultValue={search} className="filter-search"/>
                    
                    <select name="brand" defaultValue={brand}>
                        <option value="">{cp.allBrands}</option>
                            {brands.map((b) => (
                                <option key={b} value={b}>
                                    {b}
                                </option>
                            ))}
                    </select>

                    <select name="fuel" defaultValue={fuel}>
                        <option value="">{cp.allFuels}</option>
                            {fuels.map((f) => (
                                <option key={f} value={f}>
                                    {translateCarText(f, locale)}
                                </option>
                            ))}
                    </select>

                    <select name="gearbox" defaultValue={gearbox}>
                        <option value="">{cp.allGearBoxes}</option>
                            {gearboxes.map((g) => (
                                <option key={g} value={g}>
                                    {translateCarText(g, locale)}
                                </option>
                            ))}
                    </select>

                    <div className="filter-range-row">
                        <select name="minPrice" defaultValue={minPrice ?? ""}>
                            <option value="">{cp.priceFrom}</option>
                            {priceOptions.map((p) => (
                                <option key={p} value={p}>
                                    {format(p)} €
                                </option>
                            ))}
                        </select>
                        
                        <select name="maxPrice" defaultValue={maxPrice ?? ""}>
                            <option value="">{cp.priceTo}</option>
                            {priceOptions.map((p) => (
                                <option key={p} value={p}>
                                    {format(p)} €
                                </option>
                            ))}
                        </select>
                        
                        <select name="minYear" defaultValue={minYear ?? ""}>
                            <option value="">{cp.yearFrom}</option>
                            {yearOptions.map((y) => (
                                <option key={y} value={y}>
                                    {y}
                                </option>
                            ))}
                        </select>

                        <select name="maxYear" defaultValue={maxYear ?? ""}>
                            <option value="">{cp.yearTo}</option>
                            {yearOptions.map((y) => (
                                <option key={y} value={y}>
                                    {y}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button type="submit" className="filter-submit">{cp.submit}</button>

                    <select name="sort" defaultValue={sort} className="filter-sort">
                        <option value="newest">{cp.sortNewest}</option>
                        <option value="price_asc">{cp.sortPriceAsc}</option>
                        <option value="price_desc">{cp.sortPriceDesc}</option>
                        <option value="year_desc">{cp.sortYearDesc}</option>
                        <option value="year_asc">{cp.sortYearAsc}</option>
                        <option value="km_asc">{cp.sortKmAsc}</option>
                    </select>

                    {hasActiveFilters && (
                        <a href="/cars" className="filter-clear">
                            {cp.clear}
                        </a>
                    )}
                </form>
            </section>

            <section className="cars-grid-wrapper">
                {cars.length == 0 ? (
                    <p className="cars-empty">{cp.empty}</p>
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
                                        {c.year} · {format(c.kilometers)} km · {translateCarText(c.fuel, locale)}
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