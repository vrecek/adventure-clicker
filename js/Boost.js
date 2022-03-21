export class Boost {
    item;
    parent;
    active;
    cooldownSec;
    constructor(element, cdown) {
        this.item = element;
        this.active = true;
        this.cooldownSec = cdown * 1000;
        this.parent = this.item.parentElement;
    }
}
/* */
export class Chest extends Boost {
    plrInfo;
    constructor(element, cdown, stats) {
        super(element, cdown);
        this.plrInfo = stats;
    }
    action() {
        const x = Math.floor(Math.random() * 100) + 1;
        let perc;
        let win;
        if (x <= 15) {
            win = false;
            const y = Math.floor(Math.random() * 10000) + 1;
            const sqrt = Math.sqrt(y);
            perc = Math.floor((this.plrInfo.getCash / 100) * sqrt) + 1;
            perc === 1 ? perc-- : null; // if has 0 money ; fixed -1 money
            this.plrInfo.setCash = -perc;
        }
        else {
            win = true;
            //( 3√money ) * (cd / 2)   +   (x * x) / (x * 1.5)
            const scnd = Math.pow(x, 2) / (x * 1.5);
            const frst = Math.cbrt(this.plrInfo.getCash) * (this.plrInfo.getCD + this.plrInfo.getCPS) / 2;
            const res = Math.round(frst + scnd);
            perc = res;
            this.plrInfo.setCash = perc;
        }
        return { win: win, perc: perc };
    }
    hoverEvent() {
        let section;
        this.item.addEventListener('mouseover', () => {
            section = document.createElement('section');
            section.appendChild(document.createTextNode(`Gives you random cash based on your actual CD. \n BE AWARE! There's a 15% chance of losing 0% to 100% actual money \n Cooldown: ${this.cooldownSec / 1000} seconds`));
            section.className = 'boostDesc';
            this.parent.appendChild(section);
            setTimeout(() => {
                section.style.opacity = '1';
            }, 0);
        });
        this.item.addEventListener('mouseout', () => {
            section.style.opacity = '0';
            setTimeout(() => {
                section.remove();
            }, 500);
        });
    }
    clicked() {
        if (!this.active)
            return;
        this.active = false;
        this.item.src = './images/openChest.png';
        let intervalName;
        let cd = this.cooldownSec / 1000;
        let parent = this.parent;
        let disp = this.countDisplayer;
        function initInterval(cd, parent, displayer) {
            function startInt() {
                displayer(parent, cd); //
                cd--; //
            } //
            startInt(); //
            intervalName = setInterval(startInt, 1000); //  <--
        } //  <-- ONLY CONTROLS COOLDOWN TIMER
        initInterval(cd, parent, disp); //  <--
        setTimeout(() => {
            clearInterval(intervalName); //
            this.active = true; //
            this.CDTIMER()[0].remove(); //
            this.item.src = './images/closedChest.png'; //
        }, this.cooldownSec); //
        const action = this.action();
        return action;
    }
    countDisplayer(parent, cdLeft) {
        const children = [...parent.childNodes];
        const oldTimer = children.filter((elem) => elem.className === 'cdDiv');
        if (oldTimer.length !== 0)
            oldTimer[0].remove();
        const div = document.createElement('div');
        div.className = 'cdDiv';
        div.appendChild(document.createTextNode(`${cdLeft}`));
        parent.appendChild(div);
    }
    CDTIMER() {
        const children = [...this.parent.childNodes];
        const oldTimer = children.filter((elem) => elem.className === 'cdDiv');
        return oldTimer;
    }
}
