export default class Statistics {
   private money: number;
   private cd: number;
   private cps: number;
   private crit: number;
   private critPow: number;
   public static totalMoney:number = 0;

   constructor(){
      this.money = 0;
      this.cd = 1;
      this.cps = 0;
      this.crit = 0;
      this.critPow = 200;
   }

   // Getters
   public get getCash(): number{
      return this.money;
   }
   public get getCD(): number{
      return this.cd;
   }
   public get getCPS(): number{
      return this.cps;
   }
   public get getCrit(): number{
      return this.crit;
   }
   public get getCritPow(): number{
      return this.critPow;
   }

   // Setters
   public set setCash(num: number){
      num < 0 ? null : Statistics.totalMoney += num;
      this.money += num;
   }
   public set setCD(num: number){
      this.cd += num;
   }
   public set setCPS(num: number){
      this.cps += num;
   }
   public set setCrit(num: number){
      if(this.crit + num >= 100) return;

      this.crit += num;
   }
   public set setCritPow(num: number){
      this.critPow += num;
   }

   // Funcs
   public static roundToOne(num: number):number{
      return Math.round(num * 10) / 10;
   }

   public calcCritDmg():number{
      return (this.getCD / 100) * this.critPow;
   }
}
