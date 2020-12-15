const Doctor = require("../pageobjects/doctor.page.js");
const addFeature  = require('@wdio/allure-reporter').default

addFeature.addFeature("Testing docdoc.ru/doctor");
describe('docdoc', () => {

    // открытие стайта
    it('open web site', () => {
        addFeature.createStep('open web site', 'open web site');
        Doctor.open();
        expect(browser).toHaveTitle(Doctor.title_page);
    })

    // открытие фильтра
    it('open date filter', () => {
        addFeature.createStep('open date filter', 'open date filter');
        browser.pause(3000);
        Doctor.open_filter()
    })

    // проверка дней в фильтре
    it('assert days in filter', () => {
        addFeature.createStep('assert days in filter', 'assert days in filter');
        browser.pause(3000);
        // Проверка "Сегодня"
        expect(Doctor.get_text_date_element(0, index = true)).toEqual(Doctor.today_name);
        // Проверка "Все дни"
        expect(Doctor.get_text_date_element("all day", index = false)).toEqual(Doctor.all_day_name);
        // Проверка "Выбрать другой день"
        expect(Doctor.get_text_date_element("select day", index = false)).toEqual(Doctor.select_day_name);
        // Проверка "Завтра - +2 дня"
        for (var i = 1; i < 4; i++) {
            expect(Doctor.get_text_date_element(i, index = true)).toEqual(Doctor.get_date_str(i))
        }
    })

    // проверка на название кнопки фильтра "Все дни"
    it('assert active day in filter', () => {
        addFeature.createStep('assert active day in filter', 'assert active day in filter');
        expect(Doctor.check_active(Doctor.all_day_selector, false)).toEqual(true);
    })

    // выбор "Завтра" в фильтре
    it('select day in filter', () => {
        addFeature.createStep('select day in filter', 'select day in filter');
        Doctor.select_tomorrow()
        browser.pause(3000);
    })

    // проверка текста кнопки на "Расписание на завтра"
    it('check button label', () => {
        addFeature.createStep('check button label', 'check button label');
        browser.waitUntil(
            () => Doctor.get_button_filter_label() === Doctor.title_button_filter_tommorow,
            {
                timeout: 5000,
                timeoutMsg: 'button text does not match'
            }
        );
        expect(Doctor.get_button_filter_label()).toEqual(Doctor.title_button_filter_tommorow);
    })

    // получение количества карточек врачей
    it('count doctor searched', () => {
        addFeature.createStep('count doctor searched', 'count doctor searched');
        expect(Doctor.count_doctor()).toEqual(10);
    })

    // проверка текста карточки докторов "Онлайн-расписание на "
    it('check doctor slot', () => {
        addFeature.createStep('check doctor slot', 'check doctor slot');
        expect(Doctor.get_doctor_slot(1)).toEqual(true);
    })
})