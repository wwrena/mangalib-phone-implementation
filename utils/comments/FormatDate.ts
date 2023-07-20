export function getTimeAgo(timestamp: string): string {
    const currentTime = new Date();
    const previousTime = new Date(timestamp);

    const timeDifferenceInSeconds = Math.floor((currentTime.getTime() - previousTime.getTime()) / 1000);

    // Вычисляем количество лет, месяцев, дней, часов, минут и секунд
    const years = Math.floor(timeDifferenceInSeconds / (3600 * 24 * 365));
    const months = Math.floor(timeDifferenceInSeconds / (3600 * 24 * 30));
    const days = Math.floor(timeDifferenceInSeconds / (3600 * 24));
    const hours = Math.floor(timeDifferenceInSeconds / 3600);
    const minutes = Math.floor((timeDifferenceInSeconds % 3600) / 60);
    const seconds = timeDifferenceInSeconds % 60;

    // Формируем текст о временной разнице
    if (years > 0) {
        return `около ${years} ${getRussianWordForm(years, 'года', 'лет', 'лет')} назад`;
    } else if (months > 0) {
        return `около ${months} ${getRussianWordForm(months, 'месяца', 'месяцев', 'месяцев')} назад`;
    } else if (days > 0) {
        return `около ${days} ${getRussianWordForm(days, 'дня', 'дней', 'дней')} назад`;
    } else if (hours > 0) {
        return `около ${hours} ${getRussianWordForm(hours, 'часа', 'часов', 'часов')} назад`;
    } else if (minutes > 0) {
        return `около ${minutes} ${getRussianWordForm(minutes, 'минута', 'минуты', 'минут')} назад`;
    } else {
        return `около ${seconds} ${getRussianWordForm(seconds, 'секунда', 'секунды', 'секунд')} назад`;
    }
}

// Функция для получения правильной формы русского слова в соответствии с числом
function getRussianWordForm(number: number, form1: string, form2: string, form5: string): string {
    const lastDigit = number % 10;
    const lastTwoDigits = number % 100;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
        return form5;
    }

    if (lastDigit === 1) {
        return form1;
    } else if (lastDigit >= 2 && lastDigit <= 4) {
        return form2;
    } else {
        return form5;
    }
}
