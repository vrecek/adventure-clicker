import Statistics from './statistics.js';
const CASH = document.querySelector('#cash') as HTMLElement;
const CPS = document.querySelector('#cd')  as HTMLElement;
const CD = document.querySelector('#cps')  as HTMLElement;
const click = document.querySelector('#clck-img');
const stats = new Statistics();

click?.addEventListener('mousedown', (e) => {
   clickAnim(e.target!, 'click');
})

click?.addEventListener('mouseup', (e) => {
   clickAnim(e.target!, 'relase');
})

display();

function display(): void{
   CASH.innerHTML = `${stats.getCash}`;
   CPS.innerHTML = `${stats.getCPS}`;
   CD.innerHTML = `${stats.getCD}`;
}

function clickAnim(target: EventTarget, action: 'click' | 'relase'): void{
   const img = target as HTMLElement;
   
   //action === 'click' ? img.style.transform='scale(.9)' : img.style.transform='scale(1)';
  // action === 'click' ? img.style.width='90%' : img.style.width='100%';
   if(action === 'click'){
      img.style.width='90%';
      img.style.height='90%';
   }else{
      img.style.width='100%';
      img.style.height='100%';
   }
}
