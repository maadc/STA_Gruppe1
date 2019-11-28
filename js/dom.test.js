describe('DOM Tests', () => {
    let dom
    let document
    
    //load the DOM
    beforeAll(async () => {
        dom = await initDom('index.html')
        document = dom.window.document
    })

    it(`if spielfeld exists`, () => {
        const spielfeld = document.getElementById("spielfeld");
        expect(spielfeld).toBeDefined();
    })
})