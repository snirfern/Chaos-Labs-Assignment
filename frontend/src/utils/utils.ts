interface DateRange {
    from: Date | null;
    to: Date | null;
}


export function filterByDateRange<T>(
    data: T[],
    dateRange: DateRange,
    dateField: keyof T
): T[] {
    const from = dateRange.from?.getTime();
    const to = dateRange.to?.getTime();

    if (!from && !to) {
        return data;
    }

    const currentFrom = from ?? Date.now();
    const currentTo = to ?? Date.now();

    return data.filter(item => {
        const value = item[dateField];
        const dateValue = new Date(value as string | Date).getTime();
        return dateValue >= currentFrom && dateValue <= currentTo;
    });
}
