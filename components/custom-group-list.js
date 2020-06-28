import './custom-list.js';

function array_move(arr, old_index, new_index) {
    if (new_index >= arr.length) {
        var k = new_index - arr.length + 1;
        while (k--) {
            arr.push(undefined);
        }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    return arr; // for testing
};


class CustomGroupList extends HTMLElement {
    get results()
    {
        return this._data;
    }
    set results(data) {
        this._data = data; 
        this._render();
    }

    set addData(data) {
        this._data.push(data);
        this._render();
    }

    constructor() {
        super(); 

        this._pusher = null;
        this._pushed = null;

        this.attachShadow({ mode: 'open' });
    }


    set move(event) {
        debugger;
    }

    _render() {
        console.log('_data', this._data[0].name);
        this.shadowRoot.innerHTML = `<ul>
            ${this._data.map((element, key) => `<custom-list name="${element.name}" key="${key}"></custom-list>`).join('')}
        </ul>`;

        const listItens = this.shadowRoot.querySelectorAll('custom-list');
        [].forEach.call(listItens, item => {
            item.addEventListener('list-dragdrop', event => {
                this._pushed = event.currentTarget;
            });
            item.addEventListener('list-dragend', event => {
                this._pusher = event.currentTarget;

                this.results = array_move(this._data, this._pusher.getAttribute('key'), this._pushed.getAttribute('key'));

                this._pusher = null;
                this._pushed = null;

                this.dispatchEvent(new CustomEvent('list-changed', this));
            });
        });
    }

}

customElements.define("custom-group-list", CustomGroupList);