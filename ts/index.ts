import Statistics from './Statistics.js';
import { Upgrades, BasicUpg, CdAndCps } from './Upgrades.js';
import { Chest, Boost } from './Boost.js';

interface objBoost {
   [key:string]:any
}

const maxWidth = 1200 - 1;
const maxHeight = 602 - 1;
if(window.innerWidth <= maxWidth || window.innerHeight <= maxHeight){
   window.location.href='error.html';
}
window.addEventListener('resize', (e:UIEvent) => {
   const targ = e.target as Window;

   if(targ.innerWidth <= maxWidth || targ.innerHeight <= maxHeight){
      window.location.href='error.html';
   }
})

let arts:NodeListOf<Element>;
const CASH = document.querySelector('#cash') as HTMLElement;
const CPS = document.querySelector('#cps')  as HTMLElement;
const CD = document.querySelector('#cd')  as HTMLElement;
const CRIT = document.querySelector('#crit') as HTMLElement;

const section = document.querySelector('.upg-cont section') as HTMLElement;
const infoCont = document.querySelector('.INFO-CONT') as HTMLElement;
const click = document.querySelector('#clck-img');

const menu = document.querySelector('.menu-icon') as HTMLElement;
const sect = document.querySelector('footer section') as HTMLElement;
const spans:NodeListOf<any> = document.querySelectorAll('.menu-icon span');

const stats = new Statistics();

let toggled = false;
menu?.addEventListener('click', () => { // TOGGLE MENU STATS
   spans.forEach(item => {
      if(toggled){
         item.className = 'lines';
         sect.style.left='-50%';
         menu.style.top='50%';
         menu.style.transform='translateY(-50%)';
      }else{
         item.className = 'cross';
         sect.style.left='0';
         menu.style.top='0';
         menu.style.transform='translateY(-100%)';
      }
   })
   toggled = !toggled;
})

const upgObj:Array<Upgrades> = [ // MAIN UPGRADES
   new BasicUpg('Upgrade 1', 'Sharpen your old knife to gain some damage', '../images/upg1.png', 'Incerase your CD by ', 1, 50, 1.2, 1.1, 'CD'),
   new BasicUpg('Upgrade 2', 'Force a peasant to fight on your side', '../images/upg2.png', 'Boost your CPS by ', 1, 500, 1.25, 1.6, 'CPS'),
   new CdAndCps('Upgrade 3', 'Hire a mercenaries with different skills', '../images/upg4.png', 'Incerase your CPS by ', 3, 1000, 1.35, 1.5, 'CDCPS', 'and slightly CD by ', 1, 1.1),
   new BasicUpg('Upgrade 4', 'Visit a blacksmith to enchant your weapon <i>(max 100%)</i>', '../images/upg3.png', 'Increase crit chance by ', 1, 2000, 1.4, 1, 'CRIT'),
   new BasicUpg('Upgrade 5', "You've put your sword in magical fire source", '../images/upg5.png', 'Crit damage incerased by %', 1, 2500, 1.2, 1, 'CRITDMG')
];

// Add new bottom boosts here to obj and array
const boosts:any = {
   'chest': document.querySelector('#chest') as HTMLElement
};
const boostsArr:Array<Boost> = [
   new Chest(boosts['chest'], 120, stats)
];

(function onload():void{ // ONLOAD
   for(const elem of boostsArr){ // BOOSTS CLICK ACTION
      elem.item.addEventListener('click', () => {
         const resArr = elem.clicked();
         if(resArr !== undefined){
            display(undefined, resArr);
         }      
      })
      elem.hoverEvent();
   }
   
   let text = '';

   for(const [ind,item] of upgObj.entries()){ // FILL THE HTML UPGRADES
      text += `<article id='u${ind}' class="upg-item">` + item.printText() + `</article>`;
   }
   section.innerHTML = text;

   arts = document.querySelectorAll('.upg-item'); // QUERY ALL UPGRADES AND ATTACH CLICK EVENT
   arts.forEach((item, ind) => { 
      item.addEventListener('click', () => { // IF YOU HAVE ENOUGH CASH, UPDATE INSTANCE AND DISPLAY
         if( upgObj[ind].canBuy(stats.getCash) ){
            const objStat:objBoost = upgObj[ind].changeStats();
         
            switch(objStat.type){
               case 'CD':
                  stats.setCash = (-objStat.cost);
                  stats.setCD = objStat.power;
               break;

               case 'CPS':
                  stats.setCash = (-objStat.cost);
                  stats.setCPS = objStat.power;
               break;

               case 'CRIT':
                  stats.setCash = (-objStat.cost);
                  stats.setCrit = objStat.power;
               break;

               case 'CDCPS':
                  stats.setCash = (-objStat.cost);
                  stats.setCPS = objStat.power;
                  stats.setCD = objStat.power2;
               break;

               case 'CRITDMG':
                  stats.setCash = (-objStat.cost);
                  stats.setCritPow = objStat.power;
               break;

               default: console.log('err');
            }
         
            display(ind);
         } 
      })
   }); 

   setInterval(() => { // PER SECOND CASH
      stats.setCash = stats.getCPS;
      display();
   }, 1000)

   CPS.innerHTML = `${stats.getCPS}`; // INITIAL STATS SET
   CD.innerHTML = `${stats.getCD}`;
   CRIT.innerHTML = `${stats.getCrit}%`;

   display();
})();

function display(ind?:number, resInfo?:objBoost): void{
   CASH.innerHTML = `${Statistics.roundToOne(stats.getCash)}`;
   fillMenuSect();

   if(ind !== undefined){ // UPDATE THE UPGRADE ARTICLE ( TEXT )
      CPS.innerHTML = `${Statistics.roundToOne(stats.getCPS)}`;
      CD.innerHTML = `${Statistics.roundToOne(stats.getCD)}`;
      CRIT.innerHTML = `${stats.getCrit}%`;

      document.querySelector(`#u${ind}`)!.innerHTML = upgObj[ind].printText();
   }

   if(resInfo !== undefined){ // SHOW INFO AFTER CLICKED BOOST !switch boost!
      let header:string;
      let paragraph:string;

      if(resInfo.win) {
         header = '<div class="chest-res"> <h1 style="color:#51ff01">SUCCESS</h1>';
         paragraph = `<p style="color:#51ff01">You gained: ${resInfo.perc}$</p> </div>`
      }else{
         header = '<div class="chest-res"> <h1 style="color:red">UNLUCKY!</h1>';
         paragraph = `<p style="color:red">You lost: ${resInfo.perc}$</p> </div>`
      }

      infoCont.innerHTML = `
            ${header}
            ${paragraph}
         `

      setTimeout(() => {
         infoCont.style.opacity='0';
         setTimeout(() => {
            infoCont.innerHTML = '';
            infoCont.style.opacity='1'
         }, 1000);
      }, 3000);
   }
}

click?.addEventListener('mousedown', (e) => {
   clickAnim(e.target!, 'click');
})

click?.addEventListener('mouseup', (e) => {
   clickAnim(e.target!, 'relase');

   checkCrit() ? stats.setCash = stats.calcCritDmg() : stats.setCash = stats.getCD;
   
   display();
})

function fillMenuSect():void{
   const text = `<div>
                     <h1>CD & CPS</h1>
                     <p>CD: <span>${Statistics.roundToOne(stats.getCD)}</span></p>
                     <p>CPS <span>${Statistics.roundToOne(stats.getCPS)}</span></p>
                  </div>
                  <div>
                     <h1>Critical hits</h1>
                     <p>Chance: <span>${stats.getCrit}%</span></p>
                     <p>Damage <span>${stats.getCritPow}%</span></p>
                  </div>
                  <div>
                     <h1>Money</h1>
                     <p>Current: <span>${Statistics.roundToOne(stats.getCash)}$</span></p>
                     <p>Total: <span>${Statistics.roundToOne(Statistics.totalMoney)}$</span></p>
                  </div>`;

   sect.innerHTML = text;
}

function checkCrit():boolean{ // CHECK IF PLAYER HAS CRITED
   const x = Math.floor(Math.random() * 100) + 1;
   if(x <= stats.getCrit){
      critAnim();
      return true;
   } 
   return false;
}

function critAnim():void{
   const x = Math.floor(Math.random() * 100) + 1;
   const span = document.createElement('span');
   span.appendChild(document.createTextNode('CRIT!'));
   span.style.left = `${x}%`;  
   document.querySelector('.img-cont')?.appendChild(span);    
      
   setTimeout(() => {
      span.style.bottom = `80%`;
      span.style.opacity = '0';
   },0)
      
   setTimeout(() => {
      span.remove();
   },1500)
}

function clickAnim(target: EventTarget, action: 'click' | 'relase'): void{ // ANIMATE CLICKING
   const img = target as HTMLElement;

   if(action === 'click'){
      img.style.width='90%';
      img.style.height='90%';
   }else{
      img.style.width='100%';
      img.style.height='100%';
   }
}