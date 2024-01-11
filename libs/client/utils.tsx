import {useFormatter} from 'next-intl';

export function cls(...classnames: string[]) {
    return classnames.join(" ");
}

export function useRelativeTime(dateStr: string) {
    const format = useFormatter();
    const dateTime = new Date(dateStr);

    // At 2020-11-20T10:36:00.000Z,
    // this will render "2 hours ago"
    return format.relativeTime(dateTime);
}