const template = document.createElement('template');
template.innerHTML = `
<style>
    li {
        border: black 1px solid;
        margin-bottom: 0px;
    }
    .over {
        transform: scale(1.1, 1.1);
    }
</style>
<li draggable="true"></li>
`; 

class CustomList extends HTMLElement {
    constructor() {
        super();
        this._key = this.getAttribute('key');

        this.attachShadow({ mode: 'open' });

        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.shadowRoot.querySelector('li').innerText = this.getAttribute('name');

        this.shadowRoot.querySelector('li').addEventListener('dragstart', this.dragStart, false);
        this.shadowRoot.querySelector('li').addEventListener('dragenter', this.dragEnter, false);
        this.shadowRoot.querySelector('li').addEventListener('dragover', this.dragOver, false);
        this.shadowRoot.querySelector('li').addEventListener('dragleave', this.dragLeave, false);
        this.shadowRoot.querySelector('li').addEventListener('drop', this.dragDrop, false);
        this.shadowRoot.querySelector('li').addEventListener('dragend', this.dragEnd, false);
    }

    dragStart(e) {
        this.style.opacity = '0.4';
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', this.innerHTML);
    };
       
    dragEnter(e) {
        e.currentTarget.classList.add('over');
    }
       
    dragLeave(e) {
        e.stopPropagation();
        e.currentTarget.classList.remove('over');
    }

    dragOver(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        return false;
    }

    dragDrop(e) {
        this.dispatchEvent(new CustomEvent('list-dragdrop', e));
    }

    dragEnd(e) {
        this.dispatchEvent(new CustomEvent('list-dragend', e));
        this.style.opacity = '1';
    }
}

customElements.define("custom-list", CustomList);