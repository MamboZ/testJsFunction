window.addEventListener("load", function(e) {
    testFunc ('https://rapidprod-sendgrid-v1.p.rapidapi.com/alerts/%7Balert_id%7D') // URL Should be defined as parameter
}, false);

class Element {

    newDiv = document.createElement("div");
    _interval;
    _colorResult = null;

    get interval() {
        return this._interval;
    }

    set interval(value) {
        this._interval = value;
    }

    get colorResult() {
        return this._colorResult;
    }

    set colorResult(value) {
        this._colorResult = value;
    }

    set bgColor(color) {
        this.newDiv.style.backgroundColor = color;
    }
    get bgColor() {
        return this.newDiv.style.backgroundColor;
    }

    set leftPosition(position) {
        this.newDiv.style.left = `${position}px`;
    }

    get leftPosition() {
        return this.newDiv.style.left;
    }

    moveRight(limit) {
        let i = 0;
        this.interval = setInterval(() => {
            this.leftPosition = (parseInt(this.leftPosition)) + 100;
            if (i === limit - 1) {
                this.stopMoving();
                if(this.colorResult) {
                    this.bgColor = this.colorResult;
                }
            }
            i++;
        }, 1000);
    }

    stopMoving() {
        clearInterval(this.interval);
    }

    addElement() {
        this.newDiv.id = 'divElement';
        this.newDiv.style.width = '100px';
        this.newDiv.style.height = '100px';
        this.newDiv.style.position = 'absolute';
        this.newDiv.style.left = 0;
        this.newDiv.style.top = 0;
        this.bgColor = 'black';
        document.body.appendChild(this.newDiv);
    }
}

function getRequest(url, element) {
    const fetchPromise = fetch(url);
    fetchPromise.then(response => {
        if (response !== 200) {
            element.colorResult = 'red'
        } else {
            return response.json()
        }})
        .then(result => {
            switch (result) {
                case 0:
                    element.colorResult = 'green';
                    break;
                case 1:
                    element.colorResult = 'blue'
                    break;
            }
            console.log(result);
        })
        .catch(res => {
            element.colorResult = 'red'
        });
}
function testFunc (url = null) {
    if (url) {
        let element = new Element();
        element.addElement();

        setTimeout(() => {
            element.moveRight(1);
            getRequest(url, element);

        }, 1000)
    }
}
