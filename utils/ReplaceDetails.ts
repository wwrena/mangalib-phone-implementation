export function ReplaceDetails(details: string) {
    const lowerCase = details.toLowerCase();
    if (lowerCase == 'автор') return 'author';
    if (lowerCase == 'тип') return 'type';
    if (lowerCase == 'статус перевода') return 'translation_status';
    if (lowerCase == 'статус тайтла') return 'manga_status';
    if (lowerCase == 'художник') return 'artist';
    if (lowerCase == 'год релиза') return 'release_year';
    if (lowerCase == 'издательство') return 'publisher';
    if (lowerCase == 'загружено глав') return 'chapters';
    if (lowerCase == 'альтернативные названия') return 'alternative_names';
    return details;
}
