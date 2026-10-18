export type Locale = "mk" | "en";

const carTermTranslations: [string, string][] = [
    ["Дизел (1.6 TDI)", "Diesel (1.6 TDI)"],
    ["Дизел (1.3 MultiJet)", "Diesel (1.3 MultiJet)"],
    ["Дизел (1.3 Multijet EcoFLEX)", "Diesel (1.3 Multijet EcoFLEX)"],
    ["Дизел (1.5 dCi)", "Diesel (1.5 dCi)"],
    ["Дизел (1.6 e-HDi)", "Diesel (1.6 e-HDi)"],
    ["Дизел (1.6 BlueHDi)", "Diesel (1.6 BlueHDi)"],
    ["Дизел (1.6 TDCi)", "Diesel (1.6 TDCi)"],
    ["Дизел (1.9 TDI)", "Diesel (1.9 TDI)"],
    ["Дизел (1.4 TDI)", "Diesel (1.4 TDI)"],
    ["Дизел (2.0 TDCi)", "Diesel (2.0 TDCi)"],
    ["Дизел (2.0 HDi)", "Diesel (2.0 HDi)"],
    ["Дизел (1.4 e-HDi)", "Diesel (1.4 e-HDi)"],
    ["Дизел (1.7 CRDi)", "Diesel (1.7 CRDi)"],
    ["Дизел (1.5 dCi)", "Diesel (1.5 dCi)"],
    ["Дизел (1.4 MZ-CD / HDi)", "Diesel (1.4 MZ-CD / HDi)"],
    ["Рачен, 5 брзини", "Manual, 5-speed"],
    ["Рачен, 6 брзини", "Manual, 6-speed"],
    ["Рачен", "Manual"],
    ["Автоматски", "Automatic"],
    ["Темно сива", "Dark grey"],
    ["Бела", "White"],
    ["Црвена", "Red"],
    ["Перла боја камелеон", "Pearl color chameleon"],
    ["Сива", "Grey"],
    ["Црна", "Black"],
    ["Кафеава", "Brown"],
    ["Зелена", "Green"],
    ["Сина", "Blue"],
    ["Хечбек", "Hatchback"],
    ["Моноволумен / Миниван", "MPV / Minivan"],
    ["SUV / Кросовер", "SUV / Crossover"],
    ["Лимузина / седан", "Limousine / Sedan"],
    ["Перфектна, сервисирана", "Perfect, serviced"],
];

export function translateCarText (
    text: string | null | undefined,
    locale: Locale
): string {
    if (text == null || text == "") return "-";
    if(locale == "mk") return text;

    let result = text;
    for (const [mk, en] of carTermTranslations) {
        result = result.replaceAll(mk, en);
    }

    return result;
}