export default class Statistics {
    money;
    cd;
    cps;
    crit;
    constructor() {
        this.money = 0;
        this.cd = 1;
        this.cps = 0;
        this.crit = 0;
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
    // Setters
    set setCash(num) {
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
}
