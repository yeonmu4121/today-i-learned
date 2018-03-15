class Hello {
    constructor() {
        this.message = 'Hello';
    }

    getName(callback) {
        const req = new XMLHttpRequest();
        req.onreadystatechange = function(args) {
            if(req.readyState == req.DONE && callback != null) {
                if(req.status == 200) {
                    callback(req.responseText);
                } else {
                    callback('Error occurred');
                }
            }
        };

        req.open('GET', 'http://name', true);
        req.send(null);

        return 'world';
    }

    greeting() {
        return `${this.message} ${this.getName()}`;
    }

    print(el) {
        if(!(el instanceof HTMLElement)) {
            throw new Error('el should be HTMLElement');
        }
        el.innerHTML = this.greeting();
    }
}
