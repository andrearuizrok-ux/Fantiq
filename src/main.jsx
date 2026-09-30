import React,{useMemo,useState} from 'react';
import {createRoot} from 'react-dom/client';
import {Home,Users,Radio,Trophy,Menu,ChevronRight,Sparkles,ArrowLeft,Search,MessageCircle,TrendingUp,Bell,Clock,Shield,Star,Send,Coins} from 'lucide-react';
import './styles.css';

const players=[
 {name:'Lautaro',team:'Inter',role:'ATT',score:91,pts:7.3,status:'Titolare 94%',emoji:'⚫🔵'},
 {name:'Leão',team:'Milan',role:'ATT',score:84,pts:5.9,status:'Titolare 76%',emoji:'🔴⚫'},
 {name:'Yildiz',team:'Juventus',role:'ATT',score:86,pts:6.8,status:'Titolare 89%',emoji:'⚪⚫'},
 {name:'Dimarco',team:'Inter',role:'DIF',score:88,pts:6.9,status:'Titolare 92%',emoji:'⚫🔵'},
 {name:'Barella',team:'Inter',role:'CEN',score:87,pts:6.7,status:'Titolare 95%',emoji:'⚫🔵'},
 {name:'Pulisic',team:'Milan',role:'CEN',score:89,pts:7.1,status:'Titolare 82%',emoji:'🔴⚫'},
 {name:'Bellanova',team:'Atalanta',role:'DIF',score:81,pts:6.2,status:'Titolare 90%',emoji:'🔵⚫'},
 {name:'Bastoni',team:'Inter',role:'DIF',score:83,pts:6.3,status:'Titolare 96%',emoji:'⚫🔵'},
 {name:'Bremer',team:'Juventus',role:'DIF',score:85,pts:6.5,status:'Titolare 91%',emoji:'⚪⚫'},
 {name:'Buongiorno',team:'Napoli',role:'DIF',score:82,pts:6.2,status:'Titolare 88%',emoji:'🔵'},
 {name:'Sommer',team:'Inter',role:'POR',score:86,pts:6.6,status:'Titolare 99%',emoji:'⚫🔵'},
]

function App(){
 const [tab,setTab]=useState('home');
 const [selected,setSelected]=useState(null);
 const [coachOpen,setCoachOpen]=useState(false);
 const [messages,setMessages]=useState([{from:'ai',text:'Ciao Andrea. Posso confrontare giocatori, analizzare la tua rosa o suggerire la formazione.'}]);
 const [input,setInput]=useState('');
 const send=()=>{if(!input.trim())return; const q=input; setMessages(m=>[...m,{from:'me',text:q},{from:'ai',text:'Per questa demo ti suggerisco Pulisic: ha più probabilità di partire titolare e un matchup migliore. Nella versione reale useremo dati live e il regolamento della tua lega.'}]); setInput('')}
 return <div className="app-shell">
   <div className="topbar"><div><div className="brand">FANTIQ</div><div className="sub">Fantasy football, smarter.</div></div><div className="top-actions"><Bell size={20}/><div className="avatar">AR</div></div></div>
   <main>
   {tab==='home'&&<HomePage onPlayer={setSelected} onCoach={()=>setCoachOpen(true)}/>} 
   {tab==='team'&&<TeamPage onPlayer={setSelected}/>} 
   {tab==='live'&&<LivePage/>}
   {tab==='league'&&<LeaguePage/>}
   {tab==='market'&&<MarketPage onPlayer={setSelected}/>} 
   </main>
   <nav className="bottom-nav">
    <Nav icon={Home} label="Home" active={tab==='home'} onClick={()=>setTab('home')}/>
    <Nav icon={Users} label="Squadra" active={tab==='team'} onClick={()=>setTab('team')}/>
    <Nav icon={Radio} label="Live" active={tab==='live'} onClick={()=>setTab('live')} special/>
    <Nav icon={Trophy} label="Lega" active={tab==='league'} onClick={()=>setTab('league')}/>
    <Nav icon={Menu} label="Mercato" active={tab==='market'} onClick={()=>setTab('market')}/>
   </nav>
   {selected&&<PlayerSheet p={selected} close={()=>setSelected(null)}/>} 
   {coachOpen&&<Coach messages={messages} input={input} setInput={setInput} send={send} close={()=>setCoachOpen(false)}/>} 
 </div>
}

const Nav=({icon:Icon,label,active,onClick,special})=><button className={`nav-btn ${active?'active':''} ${special?'special':''}`} onClick={onClick}><Icon size={20}/><span>{label}</span></button>

function HomePage({onPlayer,onCoach}){return <div className="page">
 <div className="hello"><div><div className="eyebrow">Buongiorno Andrea 👋</div><h1>Fanta Criminals</h1></div><div className="pill">Giornata 7</div></div>
 <section className="hero-card"><div className="live-label">● LIVE</div><div className="score-row"><div><span className="teamname">Andrea FC</span><strong>72.5</strong><small>7/11 giocati</small></div><div className="vs">VS</div><div className="right"><span className="teamname">Simone FC</span><strong>69.0</strong><small>8/11 giocati</small></div></div><div className="delta">+3.5 LIVE</div></section>
 <section className="ai-card" onClick={onCoach}><div className="ai-icon"><Sparkles size={18}/></div><div><span className="section-kicker">CONSIGLIO AI</span><h3>Orsolini potrebbe partire dalla panchina.</h3><p>Valuta Castro: +1.4 punti attesi.</p></div><ChevronRight/></section>
 <div className="section-head"><h2>Eventi live</h2><button>Vedi tutti</button></div>
 <div className="events"><Event icon="⚽" title="Lautaro Martínez" sub="Gol · +3" time="23'"/><Event icon="🟨" title="Barella" sub="Ammonizione · -0.5" time="41'"/><Event icon="⬆️" title="Andrea FC" sub="sale temporaneamente al 2° posto" time="48'"/></div>
 <div className="section-head"><h2>La tua squadra</h2><button onClick={()=>onPlayer(players[0])}>Apri</button></div>
 <div className="mini-players">{players.slice(0,4).map(p=><button key={p.name} onClick={()=>onPlayer(p)} className="mini-player"><div className="player-badge">{p.emoji}</div><b>{p.name}</b><span>{p.pts} pt</span></button>)}</div>
 </div>}

const Event=({icon,title,sub,time})=><div className="event"><div className="event-icon">{icon}</div><div className="grow"><b>{title}</b><span>{sub}</span></div><time>{time}</time></div>

function TeamPage({onPlayer}){return <div className="page"><div className="page-title"><div><span className="eyebrow">Andrea FC</span><h1>La mia squadra</h1></div><div className="pill">3-4-3</div></div><div className="stats-line"><Stat label="Valore rosa" value="486 cr"/><Stat label="Rank" value="#2"/><Stat label="Forma" value="W W D W"/></div><div className="pitch">
 <div className="line forwards">{players.slice(0,3).map(p=><PlayerDot p={p} onClick={()=>onPlayer(p)}/>)}</div>
 <div className="line mids">{players.slice(3,7).map(p=><PlayerDot p={p} onClick={()=>onPlayer(p)}/>)}</div>
 <div className="line defs">{players.slice(7,10).map(p=><PlayerDot p={p} onClick={()=>onPlayer(p)}/>)}</div>
 <div className="line gk"><PlayerDot p={players[10]} onClick={()=>onPlayer(players[10])}/></div>
 </div><button className="primary"><Sparkles size={18}/> Ottimizza XI</button><h2 className="bench-title">Panchina</h2><div className="mini-players">{['Castro','Orsolini','Zaccagni','Lucca'].map((n,i)=><div className="mini-player" key={n}><div className="player-badge">{['🔴🔵','🔴🔵','🦅','⚪⚫'][i]}</div><b>{n}</b><span>6.{i+1} pt</span></div>)}</div></div>}
const Stat=({label,value})=><div className="stat"><span>{label}</span><b>{value}</b></div>
const PlayerDot=({p,onClick})=><button className="player-dot" onClick={onClick}><div className="shirt">{p.emoji}</div><b>{p.name}</b><span>{p.role}</span></button>

function LivePage(){return <div className="page"><div className="page-title"><div><span className="eyebrow">● LIVE</span><h1>Matchday</h1></div></div><section className="hero-card compact"><div className="score-row"><div><span className="teamname">Andrea FC</span><strong>73.0</strong><small>7/11</small></div><div className="vs">VS</div><div className="right"><span className="teamname">Simone FC</span><strong>71.5</strong><small>8/11</small></div></div><div className="delta">+1.5</div></section><h2>Eventi decisivi</h2><div className="events"><Event icon="⚽" title="Pulisic" sub="Gol · +3" time="32'"/><Event icon="🟨" title="Mancini" sub="Ammonizione · -0.5" time="54'"/><Event icon="🧤" title="Sommer" sub="Clean sheet · +1" time="67'"/></div><section className="scenario"><span className="section-kicker">COSA MI SERVE?</span><h3>Sei avanti di 1.5.</h3><p>A Simone restano Lautaro + Dimarco. A te resta Sommer.</p><div className="scenario-row"><span>Sommer clean sheet</span><b>favorevole</b></div><div className="scenario-row danger"><span>Lautaro segna</span><b>rischio sorpasso</b></div></section></div>}

function LeaguePage(){return <div className="page"><div className="page-title"><div><span className="eyebrow">10 manager · Serie A</span><h1>Fanta Criminals</h1></div><div className="crest">FC</div></div><div className="tabs"><button className="selected">Classifica</button><button>Partite</button><button>Mercato</button><button>Chat</button></div><div className="table"><div className="tr head"><span>#</span><span>Squadra</span><span>W-D-L</span><span>Pt</span></div>{[['1','Marco FC','6-1-1','19'],['2','Andrea FC','5-2-1','17'],['3','Simone FC','5-0-3','15'],['4','Luca FC','4-2-2','14'],['5','Gianmarco FC','4-1-3','13']].map(r=><div className={`tr ${r[1]==='Andrea FC'?'me':''}`} key={r[0]}>{r.map(x=><span>{x}</span>)}</div>)}</div><h2>Trend della lega</h2><div className="events"><Event icon="🔥" title="Andrea" sub="4 partite senza perdere" time=""/><Event icon="📉" title="Luca" sub="3 sconfitte consecutive" time=""/><Event icon="💀" title="Simone" sub="peggior panchina della giornata" time=""/></div></div>}

function MarketPage({onPlayer}){return <div className="page"><div className="page-title"><div><span className="eyebrow">Scout & mercato</span><h1>Mercato</h1></div><Coins/></div><div className="search"><Search size={18}/><input placeholder="Cerca un giocatore..."/></div><div className="chips"><span className="on">Tutti</span><span>ATT</span><span>CEN</span><span>DIF</span><span>POR</span></div>{players.slice(0,7).map(p=><button className="market-row" onClick={()=>onPlayer(p)} key={p.name}><div className="player-badge">{p.emoji}</div><div className="grow"><b>{p.name}</b><span>{p.role} · {p.team}</span></div><div className="market-score">{p.score}</div><ChevronRight size={18}/></button>)}</div>}

function PlayerSheet({p,close}){return <div className="overlay"><div className="sheet"><button className="close" onClick={close}><ArrowLeft/></button><div className="player-hero"><div className="big-badge">{p.emoji}</div><span>{p.team} · {p.role}</span><h2>{p.name}</h2></div><div className="player-grid"><Stat label="FANTIQ score" value={p.score}/><Stat label="Punti attesi" value={p.pts}/><Stat label="Titolarità" value={p.status.split(' ')[1]}/></div><div className="analysis"><span className="section-kicker">ANALISI AI</span><h3>Matchup favorevole</h3><p>Buona combinazione di titolarità, forma recente e coinvolgimento offensivo. Nella versione reale questa analisi userà dati live.</p></div><button className="primary">Confronta giocatore</button></div></div>}

function Coach({messages,input,setInput,send,close}){return <div className="overlay"><div className="sheet coach-sheet"><div className="coach-head"><button className="icon-btn" onClick={close}><ArrowLeft/></button><div><b>FANTIQ Coach</b><span>Il tuo assistente fantasy</span></div></div><div className="chat">{messages.map((m,i)=><div key={i} className={`bubble ${m.from}`}>{m.text}</div>)}</div><div className="quick"><button onClick={()=>setInput('Metto Pulisic o Zaccagni?')}>Pulisic o Zaccagni?</button><button onClick={()=>setInput('Analizza il mio avversario')}>Analizza avversario</button></div><div className="composer"><input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&send()} placeholder="Scrivi una domanda..."/><button onClick={send}><Send size={18}/></button></div></div></div>}

createRoot(document.getElementById('root')).render(<App/>)
