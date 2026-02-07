document.getElementById('terminal').addEventListener('click', ()=> cmdline.focus());
const output = document.getElementById('output');
const cmdline = document.getElementById('cmdline');
const promptChar = '$';
let history = []; let hpos = 0;

const projects = [
  {name: "This portfolio", desc: "Terminal-style portfolio site (this site)", status: 'Live'},
  {name: "Ron", desc: "A small, friendly Discord bot that provides utilities and small fun commands.", status: 'Live, Maintained'},
  {name: "Kevin", desc: "A Discord bot for reminders and periodic messages.", status: 'Live, Maintained'},
  {name: "Craig", desc: "A Discord bot that responds to messages in the server in the tone of a divorced dad. ", status: 'Live, Maintained'},
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
    writeLine("help — show this help\nabout — short bio\nskills — list technologies\nprojects — list projects\ncontact — contact info\nresume — download resume PDF\nnow — what I'm working on\nclear — clear terminal",'small');
}

function showAbout(){
  writeLine(`Hi — I'm ${profile.name}. I build web apps and experiments.`, '');
  writeLine(`I enjoy UI, tooling, and small delightful interactions.`, '');
  writeLine(`OS: Linux, MacOS`, '');
  
  // Add photo
  const photoEl = document.createElement('div');
  photoEl.style.cssText = 'margin: 16px 0; border-radius: 8px; overflow: hidden; max-width: 120px;';
  const img = document.createElement('img');
  img.src = 'assets/photo.jpg';
  img.alt = profile.name;
  img.style.cssText = 'width: 100%; height: auto; display: block; border: 1px solid rgba(107, 229, 182, 0.3);';
  img.onerror = () => (img.style.display = 'none');
  photoEl.appendChild(img);
  output.appendChild(photoEl);
  output.scrollTop = output.scrollHeight;
}

function showSkills(){
  writeLine('Skills:','');
  writeLine(skills.join(', '),'small');
}

function showProjects(){
  projects.forEach(p=> writeLine(`${p.name} — ${p.desc} [${p.status}]`,'small'));
}

function showContact(){
  // Email
  const emailEl = document.createElement('div');
  emailEl.style.cssText = 'margin: 8px 0; cursor: pointer;';
  emailEl.innerHTML = `<span style="color: var(--muted);">Email: </span><span style="color: var(--accent); text-decoration: underline;">${profile.email}</span>`;
  emailEl.title = 'Click to copy email';
  emailEl.addEventListener('click', (e) => {
    navigator.clipboard.writeText(profile.email).then(() => {
      const orig = emailEl.innerHTML;
      emailEl.innerHTML = `<span style="color: #6be5b6;">✓ Copied!</span>`;
      setTimeout(() => (emailEl.innerHTML = orig), 2000);
    });
  });
  output.appendChild(emailEl);
  
  // GitHub
  const gitEl = document.createElement('div');
  gitEl.style.cssText = 'margin: 8px 0; font-size: 14px; color: var(--muted);';
  gitEl.innerHTML = `GitHub: <a href="${profile.github}" target="_blank" rel="noopener noreferrer" style="color: var(--accent); text-decoration: none;">${profile.github}</a>`;
  output.appendChild(gitEl);
  
  // LinkedIn
  const linkedinEl = document.createElement('div');
  linkedinEl.style.cssText = 'margin: 8px 0; font-size: 14px; color: var(--muted);';
  linkedinEl.innerHTML = `LinkedIn: <a href="${profile.linkedin}" target="_blank" rel="noopener noreferrer" style="color: var(--accent); text-decoration: none;">${profile.linkedin}</a>`;
  output.appendChild(linkedinEl);
  
  output.scrollTop = output.scrollHeight;
}

function showNow(){
  writeLine('Currently working on:','');
  writeLine('Nothing at the moment.','small');
  writeLine('','');
  writeLine('Currently interested in:','');
  const interests = [
    'Docker — container orchestration and deployment',
    'Document Archives — preservation and organization of leaked documents'
  ];
  interests.forEach(i => writeLine(i, 'small'));
}

function downloadResume(){
  const link = document.createElement('a');
  link.href = 'assets/Resume.pdf';
  link.download = 'Resume.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  writeLine('Downloading Resume.pdf...','small');
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
    case 'now': showNow(); break;
    case 'resume':
      downloadResume();
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

// live clock
function updateClock(){
  const now = new Date();
  const timeStr = now.toLocaleTimeString('en-US', {hour: '2-digit', minute:'2-digit', second:'2-digit'});
  const dateStr = now.toLocaleDateString('en-US', {month: 'short', day: 'numeric', year: 'numeric'});
  const clockEl = document.getElementById('clock');
  if(clockEl) clockEl.textContent = `${dateStr} ${timeStr}`;
}
setInterval(updateClock, 1000);
updateClock();

// expose for debugging
window._tp = {runCommand};
