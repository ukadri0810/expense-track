const STORAGE_KEY='spendwiseDailyV4';
const todayISO=new Date().toISOString().slice(0,10);
const defaultState={salary:0,budget:{needs:50,wants:30,savings:20},recurring:[],expenses:[]};
function loadState(){try{return JSON.parse(localStorage.getItem(STORAGE_KEY))||JSON.parse(localStorage.getItem('spendwiseDailyV3'))||structuredClone(defaultState)}catch(e){return structuredClone(defaultState)}}
let state=loadState();
const rupee=n=>'₹'+Math.round(Number(n||0)).toLocaleString('en-IN');
function persist(){localStorage.setItem(STORAGE_KEY,JSON.stringify(state));}
function dailyLimit(){return state.recurring.reduce((s,i)=>s+Number(i.amount||0),0)}
function todaySpend(){return state.expenses.filter(e=>e.date===todayISO).reduce((s,e)=>s+Number(e.amount||0),0)}
function monthlyRecurring(){return state.recurring.reduce((s,i)=>s+Number(i.amount||0)*(i.frequency==='workdays'?22:30),0)}
function catSpend(c){return state.expenses.filter(e=>e.category===c).reduce((s,e)=>s+Number(e.amount||0),0)}
function setText(id,v){const el=document.getElementById(id);if(el)el.innerHTML=v}
function initCommon(){const d=document.getElementById('date');if(d&&!d.value)d.value=todayISO;setText('salaryText',rupee(state.salary));setText('dailyLimitText',rupee(dailyLimit()));setText('todaySpendText',rupee(todaySpend()));setText('monthlyHabitText',rupee(monthlyRecurring()))}
function resetAll(){if(confirm('Delete all saved data from this phone?')){localStorage.removeItem(STORAGE_KEY);location.href='index.html'}}
function registerPWA(){if('serviceWorker'in navigator){navigator.serviceWorker.register('./service-worker.js').catch(console.error)}}

function loadNav(){fetch('nav.html').then(r=>r.text()).then(h=>{const el=document.getElementById('nav-placeholder');if(el)el.innerHTML=h;document.querySelectorAll('.bottom-nav a').forEach(a=>{if(a.dataset.page===window.PAGE)a.classList.add('active')})}).catch(()=>{})}
