export const formatCurrency = (value: number, locale: string = 'pt-BR', currency: string = 'BRL'): string => {
    return value.toLocaleString(locale, { style: 'currency', currency });
}

export const formatDate = (dateString: string, locale: string = 'pt-BR', options?: Intl.DateTimeFormatOptions): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString(locale, options);
}