const Page = require('./page.js');

class DoctorPage extends Page {

    get title_page() { return "Лучшие врачи в Москве | Запись на прием к врачу через интернет online - DocDoc.ru" }
    get title_button_filter_tommorow() { return "Расписание на завтра" }
    get today_name() { return "Сегодня" }
    get all_day_name() { return "Все дни" }
    get select_day_name() { return "Выбрать другой день" }
    get all_day_selector() { return $('button[data-test-id="date_select"]') }

    constructor() {
        super();
        this.month_rus = {
            "0": "янв",
            "1": "фев",
            "2": "мар",
            "3": "апр",
            "4": "май",
            "5": "июн",
            "6": "июл",
            "7": "авг",
            "8": "сен",
            "9": "окт",
            "10": "ноя",
            "11": "дек"
        };
        this.month_rus_full = {
            "0": "января",
            "1": "февраля",
            "2": "марта",
            "3": "апреля",
            "4": "мая",
            "5": "июня",
            "6": "июля",
            "7": "августа",
            "8": "сентебря",
            "9": "октября",
            "10": "ноября",
            "11": "декабря"
        };
        this.day_rus = {
            "0": "Понедельник",
            "1": "Вторник",
            "2": "Среда",
            "3": "Четверг",
            "4": "Пятница",
            "5": "Суббота",
            "6": "Воскресенье"
        };
        this.date_filter = "";
        this.buf_date_label = "Завтра";
        this.doctor_search = 'div[data-test-id="doctor-card-search-results"]';
        this.doctor_slot = '.clinic-slots__caption';
        this.doctor_slot_text = "Онлайн-расписание на";
        this.date_element = 'button[data-test-id="calendar-item.';
        this.filter_date = 'button[data-test-id="calendar-button"]';
        this.select_day_selector = 'button[data-ga-action="clickCalendarList"]';
        this.active_icon = '.select-box__options-item-active-icon';
    }

    // открытие сайта
    open() {
        return super.open('doctor');
    }

    // открытие фильтра
    open_filter() {
        $(this.filter_date).scrollIntoView();
        browser.pause(3000);
        $(this.filter_date).click({ button: 'left' })
    }

    // получение строки даты
    get_date_str(dayPlus, for_doctor=false) {
        var date = new Date();

        if (dayPlus != 1) {
            this.buf_date_label = this.day_rus[date.getDay() + dayPlus - 1];
        }
        if (for_doctor)
            return date.getDate() + dayPlus + " " + this.month_rus_full[date.getMonth()]
        else 
            return this.buf_date_label + ", " + (date.getDate() + dayPlus) + " " + this.month_rus[date.getMonth()];
    }

    // получение текста элемента фильтра
    get_text_date_element(element, index = false) {
        if (index)
            return $(this.date_element + element + '"]').getText();
        else {
            if (element == "all day")
                return this.all_day_selector.getText();
            else if (element == "select day")
                return $(this.select_day_selector).getText();
        }
    }

    // получение текста кнопки фильтра
    get_button_filter_label() {
        return $(this.filter_date).getText();
    }

    // получение даты работы доктора
    get_doctor_slot(day) {
        for (var i = 0; i < $$(this.doctor_search).length-1; i++) {
            if ($$(this.doctor_search)[i].$(this.doctor_slot).getText() != this.doctor_slot_text + " " + this.get_date_str(day, true)) 
                return false
        }
        return true
    }

    // проверка на наличие активной галочки у элемнета
    check_active() {
        if ((this.all_day_selector.$$(this.active_icon)).length == 1)
            return true
        else return false
    }

    // выбор даты "Завтра"
    select_tomorrow() {
        $(this.date_element + 1 + '"]').click({ button: 'left' })
    }

    // количество докторов
    count_doctor() {
        // $(this.doctor_search).waitForDisplayed({ timeout: 3000 });
        return $$(this.doctor_search).length
    }
}

module.exports = new DoctorPage();