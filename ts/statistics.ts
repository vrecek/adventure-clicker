export default class Statistics {
   private money: number;
   private cd: number;
   private cps: number;
   private crit: number;

   constructor(){
      this.money = 0;
      this.cd = 1;
      this.cps = 0;
      this.crit = 0;
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

   // Setters
   public set setCash(num: number){
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
}