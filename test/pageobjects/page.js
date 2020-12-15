module.exports = class Page {
    open(path) {
        return browser.url(`https://docdoc.ru/${path}`)
    }
}