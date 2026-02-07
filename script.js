document.getElementById('terminal').addEventListener('click', ()=> cmdline.focus());
const output = document.getElementById('output');
const cmdline = document.getElementById('cmdline');
const promptChar = '$';
let history = []; let hpos = 0;

const projects = [
  {name: "This portfolio", desc: "Terminal-style portfolio site (this site)", status: 'Live'},
  {name: "Ron", desc: "A small, friendly Discord bot that provides utilities and small fun commands.", status: 'Live, Maintained'},
  {name: "Kevin", desc: "A Discord bot for reminders and periodic messages.", status: 'Live, Maintained'},
  {name: "ClosetHelper", desc: "An app to help choose outfits for the day.", status: 'Uncompleted, Archived'},
  {name: "MindTab", desc: "Modular browser extension that tracks closed tabs visually, analyzes tone, and delivers micro-flashcards.", status: 'Not-Maintained, Archived'},
  {name: "Edio-Rework", desc: "Redesign of a high-school learning platform.", status: 'Completed, Archived'}
];

const skills = [
  'React Native','JavaScript','Java','TypeScript','Python','CSS','HTML','C++','C#',
  'Flutter','Git/GitHub','Portainer','Docker','Kubernetes','Linux','MacOS'
];

const profile = {
  name: 'Wyatt',
  email: 'wyatt@aetherassembly.com',
  github: 'https://github.com/NovaFrame52',
  linkedin: 'https://www.linkedin.com/in/wyatt-b-7b64b8376/'
};

function writeLine(txt, cls){
  const el = document.createElement('div');
  if(cls) el.className = cls;
  el.textContent = txt;
  output.appendChild(el);
  output.scrollTop = output.scrollHeight;
}

function typeLines(lines, i=0, cb){
  if(i>=lines.length){ if(cb) cb(); return; }
  let s = lines[i];
  let cur = '';
  let j=0;
  const t = setInterval(()=>{
    cur += s[j++] || '';
    writeTemp(cur);
    if(j> s.length){ clearInterval(t); commitTemp(); typeLines(lines,i+1,cb); }
  },18);
}

let tempEl=null;
function writeTemp(text){ if(!tempEl){ tempEl=document.createElement('div'); tempEl.className='small'; output.appendChild(tempEl);} tempEl.textContent = text; output.scrollTop = output.scrollHeight; }
function commitTemp(){ tempEl=null }

function showHelp(){
  writeLine('Available commands:','');
    writeLine("help — show this help\nabout — short bio\nskills — list technologies\nprojects — list projects\ncontact — contact info\nresume — alias for projects\nclear — clear terminal",'small');
}

function showAbout(){
  writeLine(`Hi — I'm ${profile.name}. I build web apps and experiments.\nI enjoy UI, tooling, and small delightful interactions.\nOS: Linux, MacOS`, '');
}

function showSkills(){
  writeLine('Skills:','');
  writeLine(skills.join(', '),'small');
}

function showProjects(){
  projects.forEach(p=> writeLine(`${p.name} — ${p.desc} [${p.status}]`,'small'));
}

function showContact(){
  writeLine(`Email: ${profile.email}`,'');
  writeLine(`GitHub: ${profile.github}`,'small');
  writeLine(`LinkedIn: ${profile.linkedin}`,'small');
}

function downloadResume(){
// `resume` is repurposed as an alias for `projects` (no separate resume file)
}

function runCommand(cmd){
  if(!cmd) return;
  writeLine(promptChar+ ' ' + cmd,'cmd');
  const parts = cmd.trim().split(' ');
  const c = parts[0].toLowerCase();
  switch(c){
    case 'help': showHelp(); break;
    case 'about': showAbout(); break;
    case 'skills': showSkills(); break;
    case 'projects': showProjects(); break;
    case 'contact': showContact(); break;
    case 'resume':
      showProjects();
      break;
    case 'clear': output.innerHTML=''; break;
    default: writeLine(`Command not found: ${c} — type 'help'`, 'small');
  }
}

cmdline.addEventListener('keydown', (e)=>{
  if(e.key==='Enter'){
    const val = cmdline.value;
    history.push(val); hpos = history.length; runCommand(val); cmdline.value='';
  } else if(e.key==='ArrowUp'){
    if(history.length && hpos>0) cmdline.value = history[--hpos] || '';
    e.preventDefault();
  } else if(e.key==='ArrowDown'){
    if(history.length && hpos<history.length) cmdline.value = history[++hpos] || '';
    e.preventDefault();
  }
});

// initial display
writeLine('');
typeLines(["\nTerminal Portfolio\n","Type 'help' to begin.\n"],0, ()=>{ cmdline.focus(); });

// focus on click
document.getElementById('terminal').addEventListener('click', ()=> cmdline.focus());

// expose for debugging
window._tp = {runCommand};
