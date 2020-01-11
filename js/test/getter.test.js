let getterDOM = require("../getterDOM.js");

describe("function: getterDOM", () => {
    //simuliere die HTML-Struktur unserer Index-HTML
    document.body.innerHTML =
    `<div id="spielfeld"></div>`;

    test("spielfeld", () => {
        expect(getterDOM("spielfeld").id).toBe("spielfeld")
    })
})