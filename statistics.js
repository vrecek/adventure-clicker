export default class Statistics {
    money;
    cd;
    cps;
    crit;
    critPow;
    static totalMoney = 0;
    constructor() {
        this.money = 0;
        this.cd = 1;
        this.cps = 0;
        this.crit = 0;
        this.critPow = 200;
    }
    // Getters
    get getCash() {
        return this.money;
    }
    get getCD() {
        return this.cd;
    }
    get getCPS() {
        return this.cps;
    }
    get getCrit() {
        return this.crit;
    }
    get getCritPow() {
        return this.critPow;
    }
    // Setters
    set setCash(num) {
        num < 0 ? null : Statistics.totalMoney += num;
        this.money += num;
    }
    set setCD(num) {
        this.cd += num;
    }
    set setCPS(num) {
        this.cps += num;
    }
    set setCrit(num) {
        if (this.crit + num >= 100)
            return;
        this.crit += num;
    }
    set setCritPow(num) {
        this.critPow += num;
    }
    // Funcs
    static roundToOne(num) {
        return Math.round(num * 10) / 10;
    }
    calcCritDmg() {
        return (this.getCD / 100) * this.critPow;
    }
}
