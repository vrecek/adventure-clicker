import Statistics from './Statistics.js'

export abstract class Upgrades {
   protected title:string;
   protected desc:string;
   protected src:string;
   protected what:string;
   protected power:number;
   protected cost:number;
   protected owned:number;
   protected type:string;
   protected costRate:number;
   protected powerRate:number;

   constructor(title:string, desc:string, src:string, what:string, power:number, cost:number, costRate:number, powRate:number, type:string){
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

   public canBuy(cash:number):boolean{
      if(cash < this.cost) return false;
      return true;
   }
   public abstract changeStats():any
   public abstract printText():string;
   
}

/* */

export class BasicUpg extends Upgrades{
   constructor(title:string, desc:string, src:string, what:string, power:number, cost:number, costRate:number, powRate:number, type:string){
      super(title,desc,src,what,power,cost,costRate,powRate,type);
   }

   public printText(){
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

   public changeStats(){
      const [cost, power] = [this.cost, this.power];

      this.owned++;
      this.cost *= this.costRate;
      this.power *= this.powerRate;

      return {cost: cost, power: power, type:this.type}
   }
}

/**/

export class CdAndCps extends Upgrades{
   private what2:string;
   private power2:number;
   private pow2rate:number;

   constructor(title:string, desc:string, src:string, what:string, power:number, cost:number, costRate:number, powRate:number, type:string, what2:string, power2:number, pow2rate:number){
      super(title,desc,src,what,power,cost,costRate,powRate,type);
      this.what2 = what2;
      this.power2 = power2;
      this.pow2rate = pow2rate;
   }

   public changeStats(){
      const [cost,power,power2] = [this.cost, this.power, this.power2];

      this.owned++;
      this.cost *= this.costRate;
      this.power *= this.powerRate;
      this.power2 *= this.pow2rate;

      return {cost: cost, power:power, power2:power2, type:this.type}
   }

   public printText(){
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
