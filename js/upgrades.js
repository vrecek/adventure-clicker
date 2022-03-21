import Statistics from './statistics.js';
export class Upgrades {
    title;
    desc;
    src;
    what;
    power;
    cost;
    owned;
    type;
    costRate;
    powerRate;
    constructor(title, desc, src, what, power, cost, costRate, powRate, type) {
        this.title = title;
        this.desc = desc;
        this.src = src;
        this.what = what;
        this.power = power;
        this.cost = cost;
        this.costRate = costRate;
        this.powerRate = powRate;
        this.type = type;
        this.owned = 0;
    }
    canBuy(cash) {
        if (cash < this.cost)
            return false;
        return true;
    }
}
/* */
export class BasicUpg extends Upgrades {
    constructor(title, desc, src, what, power, cost, costRate, powRate, type) {
        super(title, desc, src, what, power, cost, costRate, powRate, type);
    }
    printText() {
        const text = `
         <h5>${this.title}</h5>
         <div class="it-cont">
            <div>
               <img src="${this.src}" alt="upgImg">
            </div>

            <div>
               <p>${this.desc}</p>
               <p class="desc">${this.what}<span>${Statistics.roundToOne(this.power)}</span> </p>
               <div class="num-info">
                  <h6 class="cost">Cost: $<span>${Statistics.roundToOne(this.cost)}</span></h6>
                  <h6 class="owned">Owned: <span>${this.owned}</span></h6>
               </div>            
            </div>
         </div>
         `;
        return text;
    }
    changeStats() {
        const [cost, power] = [this.cost, this.power];
        this.owned++;
        this.cost *= this.costRate;
        this.power *= this.powerRate;
        return { cost: cost, power: power, type: this.type };
    }
}
/**/
export class CdAndCps extends Upgrades {
    what2;
    power2;
    pow2rate;
    constructor(title, desc, src, what, power, cost, costRate, powRate, type, what2, power2, pow2rate) {
        super(title, desc, src, what, power, cost, costRate, powRate, type);
        this.what2 = what2;
        this.power2 = power2;
        this.pow2rate = pow2rate;
    }
    changeStats() {
        const [cost, power, power2] = [this.cost, this.power, this.power2];
        this.owned++;
        this.cost *= this.costRate;
        this.power *= this.powerRate;
        this.power2 *= this.pow2rate;
        return { cost: cost, power: power, power2: power2, type: this.type };
    }
    printText() {
        const text = `
         <h5>${this.title}</h5>
         <div class="it-cont">
            <div>
               <img src="${this.src}" alt="upgImg">
            </div>

            <div>
               <p>${this.desc}</p>
               <p class="desc">
                  ${this.what} <span>${Statistics.roundToOne(this.power)}</span> 
                  ${this.what2} <span>${Statistics.roundToOne(this.power2)}</span>
               </p>
               <div class="num-info">
                  <h6 class="cost">Cost: $<span>${Statistics.roundToOne(this.cost)}</span></h6>
                  <h6 class="owned">Owned: <span>${this.owned}</span></h6>
               </div>            
            </div>
         </div>
         `;
        return text;
    }
}
