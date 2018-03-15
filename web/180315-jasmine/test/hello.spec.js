describe('Hello', () => {
    const hello = new Hello();

    describe('greeting', () => {
        it('returns message', () => {
            const expectedStr = hello.message + ' ' + hello.getName();
            const actualStr = hello.greeting();

            expect(actualStr).toBe(expectedStr);
        });

        it('calls getName()', () => {
            spyOn(hello, 'getName');
            hello.greeting();
            expect(hello.getName).toHaveBeenCalled();
        });
    });

    describe('getName', () => {
        let request;
        let callbackSpy;
        let response;

        beforeEach(() => {
            jasmine.Ajax.install();
            callbackSpy = jasmine.createSpy('callback');
            hello.getName(callbackSpy);
            request = jasmine.Ajax.requests.mostRecent();

            response = {
                status: 200,
                responseText: 'Stella'
            };
            request.respondWith(response);
        });

        afterEach(() => jasmine.Ajax.uninstall());

        it('sends HTTP request', () => {
            const expectedUrl = 'http://name';
            expect(request.url).toBe(expectedUrl);
        });

        it('runs callback if res received', () => {
            expect(callbackSpy).toHaveBeenCalled();
        });

        it('returns name text as callback parameter', () => {
            expect(callbackSpy).toHaveBeenCalledWith(response.responseText);
        });
    });

    describe('print', () => {
        let el;

        beforeEach(() => {
            el = document.createElement('h1');
            document.getElementsByTagName('body')[0].appendChild(el);
        });

        it('throws an error when DOM does not exist in parameters', () => {
            expect(() => hello.print()).toThrowError();
        });

        it('prints hello to the DOM element', () => {
            hello.print(el);
            expect(el.innerHTML).toContain('Hello world');
        });
    });
});
