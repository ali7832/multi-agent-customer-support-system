import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Activity, Bot, Brain, Clock, FileSearch, Gauge, GitBranch, Headphones, MessageSquare, ShieldAlert, Sparkles, Users } from 'lucide-react';
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import './styles.css';

const pages = ['Overview', 'Routing Lab', 'Agent Cockpit', 'Escalations', 'SLA Analytics', 'Knowledge/RAG', 'Audit Timeline'];
const tickets = [
  ['TCK-9012', 'Billing dispute', 'billing_agent', 'high', 'Escalate to finance specialist'],
  ['TCK-9028', 'Login issue', 'technical_agent', 'medium', 'Send troubleshooting flow'],
  ['TCK-9031', 'Cancel account', 'account_agent', 'high', 'Retention review required'],
  ['TCK-9044', 'General question', 'general_agent', 'low', 'Auto-draft response']
];
const slaTrend = [
  { day: 'Mon', resolved: 82, breached: 9 }, { day: 'Tue', resolved: 88, breached: 7 }, { day: 'Wed', resolved: 91, breached: 6 },
  { day: 'Thu', resolved: 94, breached: 4 }, { day: 'Fri', resolved: 97, breached: 3 }
];
const agentMix = [
  { name: 'Billing', value: 32, color: '#38bdf8' }, { name: 'Technical', value: 29, color: '#a78bfa' },
  { name: 'Account', value: 21, color: '#22c55e' }, { name: 'General', value: 18, color: '#f59e0b' }
];
const audit = [
  ['09:05', 'triage_agent', 'Classified ticket TCK-9012 as billing dispute'],
  ['09:06', 'retrieval_agent', 'Attached policy article REF-221'],
  ['09:07', 'escalation_agent', 'Raised account tier SLA to priority response'],
  ['09:09', 'supervisor', 'Approved final customer response']
];

function routeFallback(form){
  const lower = `${form.subject} ${form.message}`.toLowerCase();
  let agent = 'general_agent';
  let priority = 'low';
  const reasons = [];
  if (lower.includes('invoice') || lower.includes('refund') || lower.includes('billing')) { agent = 'billing_agent'; reasons.push('Billing terms detected in customer message'); }
  if (lower.includes('error') || lower.includes('login') || lower.includes('bug')) { agent = 'technical_agent'; reasons.push('Technical failure signal detected'); }
  if (lower.includes('cancel') || lower.includes('upgrade') || lower.includes('account')) { agent = 'account_agent'; reasons.push('Account lifecycle intent detected'); }
  if (form.account_tier === 'enterprise' || lower.includes('urgent')) { priority = 'high'; reasons.push('Enterprise or urgent ticket requires accelerated SLA'); }
  return { ticket_id: `TCK-${Date.now().toString().slice(-5)}`, assigned_agent: agent, priority, confidence: priority === 'high' ? 0.91 : 0.84, sla: priority === 'high' ? '2 hours' : '8 hours', escalation_required: priority === 'high', recommended_response: 'Draft a concise customer update, attach the relevant knowledge article, and route to the assigned specialist.', reasons: reasons.length ? reasons : ['General support ticket routed to default support agent'] };
}

function App(){
  const [active, setActive] = useState('Overview');
  const [form, setForm] = useState({ subject: 'Urgent invoice refund issue', message: 'Our enterprise account was charged twice and finance needs an update today.', account_tier: 'enterprise' });
  const [result, setResult] = useState(routeFallback(form));
  const metrics = useMemo(() => [
    ['Tickets Routed', '18.4K', '+22%', MessageSquare], ['Automation Rate', '71%', '+9.4%', Bot], ['SLA Compliance', '96.2%', '+3.8%', Clock], ['CSAT Lift', '14.7%', '+5.1%', Sparkles]
  ], []);
  const runRoute = async () => {
    try {
      const response = await fetch('/tickets/route', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(form) });
      if (!response.ok) throw new Error('offline');
      setResult(await response.json());
    } catch { setResult(routeFallback(form)); }
  };
  return <main className="app-shell"><aside className="sidebar"><div className="brand"><Headphones/><div><strong>SupportOps AI</strong><span>Multi-Agent Service Cloud</span></div></div>{pages.map(page => <button className={active===page?'active':''} onClick={()=>setActive(page)} key={page}>{page}</button>)}</aside><section className="workspace"><header className="topbar"><div><p className="eyebrow">Enterprise support orchestration</p><h1>{active}</h1></div><button onClick={runRoute}>Route ticket</button></header>{active==='Overview'&&<Overview metrics={metrics}/>} {active==='Routing Lab'&&<RoutingLab form={form} setForm={setForm} result={result} runRoute={runRoute}/>} {active==='Agent Cockpit'&&<AgentCockpit/>} {active==='Escalations'&&<Escalations/>} {active==='SLA Analytics'&&<SLAAnalytics/>} {active==='Knowledge/RAG'&&<Knowledge/>} {active==='Audit Timeline'&&<AuditTimeline/>}</section></main>;
}
function Overview({metrics}){return <><section className="metrics">{metrics.map(([label,value,delta,Icon])=><article className="card" key={label}><Icon/><span>{label}</span><strong>{value}</strong><small>{delta}</small></article>)}</section><section className="grid"><Panel title="SLA trend" icon={<Activity/>}><ResponsiveContainer width="100%" height={260}><AreaChart data={slaTrend}><CartesianGrid strokeDasharray="3 3" stroke="#26374a"/><XAxis dataKey="day" stroke="#9badc1"/><YAxis stroke="#9badc1"/><Tooltip/><Area dataKey="resolved" stroke="#22c55e" fill="#14532d"/><Area dataKey="breached" stroke="#fb7185" fill="#7f1d1d"/></AreaChart></ResponsiveContainer></Panel><Panel title="Agent distribution" icon={<Users/>}><ResponsiveContainer width="100%" height={260}><PieChart><Pie data={agentMix} dataKey="value" nameKey="name" outerRadius={92}>{agentMix.map(item=><Cell key={item.name} fill={item.color}/>)}</Pie><Tooltip/></PieChart></ResponsiveContainer></Panel></section></>}
function RoutingLab({form,setForm,result,runRoute}){return <section className="grid"><Panel title="Ticket simulator" icon={<Brain/>}>{Object.entries(form).map(([key,value])=><label key={key}>{key.replaceAll('_',' ')}<textarea value={value} onChange={e=>setForm({...form,[key]:e.target.value})}/></label>)}<button onClick={runRoute}>Run multi-agent route</button></Panel><Panel title="Routing decision" icon={<GitBranch/>}><div className="score"><span className={result.priority}>{result.priority}</span><strong>{result.assigned_agent}</strong><p>{Math.round(result.confidence*100)}% confidence · SLA {result.sla}</p><small>{result.ticket_id}</small></div>{(result.reasons||[]).map(reason=><div className="reason" key={reason}>{reason}</div>)}<div className="response">{result.recommended_response}</div></Panel></section>}
function AgentCockpit(){return <section className="grid"><Panel title="Specialized agents" icon={<Bot/>}><div className="agent-grid"><Agent name="Billing Agent" desc="Invoices, refunds, payment disputes"/><Agent name="Technical Agent" desc="Bugs, login, outages, integrations"/><Agent name="Account Agent" desc="Plan changes, cancellations, retention"/><Agent name="General Agent" desc="FAQs and low-risk support"/></div></Panel><Panel title="Priority queue" icon={<MessageSquare/>}><Table rows={tickets}/></Panel></section>}
function Escalations(){return <section className="grid"><Panel title="Escalation queue" icon={<ShieldAlert/>}><div className="reason">Enterprise billing dispute awaiting finance specialist.</div><div className="reason">Account cancellation ticket requires retention approval.</div><div className="reason">Technical incident routed to senior support engineer.</div></Panel><Panel title="Supervisor review" icon={<Gauge/>}><div className="response">AI draft responses are staged for supervisor approval when risk, tone, or account tier requires human review.</div><button>Approve next response</button></Panel></section>}
function SLAAnalytics(){return <section className="grid"><Panel title="Resolution velocity" icon={<Clock/>}><ResponsiveContainer width="100%" height={260}><BarChart data={slaTrend}><XAxis dataKey="day" stroke="#9badc1"/><YAxis stroke="#9badc1"/><Tooltip/><Bar dataKey="resolved" fill="#38bdf8"/><Bar dataKey="breached" fill="#fb7185"/></BarChart></ResponsiveContainer></Panel><Panel title="SLA controls" icon={<Activity/>}><div className="reason">High priority enterprise tickets: 2 hour SLA.</div><div className="reason">Medium priority tickets: 8 hour SLA.</div><div className="reason">Low risk FAQ tickets: automated response eligible.</div></Panel></section>}
function Knowledge(){return <section className="grid"><Panel title="Knowledge retrieval" icon={<FileSearch/>}><div className="reason">REF-221: Refund policy for enterprise invoices.</div><div className="reason">REF-110: Login troubleshooting flow.</div><div className="reason">REF-409: Account cancellation retention playbook.</div></Panel><Panel title="RAG answer card" icon={<Sparkles/>}><div className="response">Retrieved knowledge is attached to AI-drafted responses so support agents can answer faster while keeping responses grounded in approved policy.</div></Panel></section>}
function AuditTimeline(){return <Panel title="Ticket audit trail" icon={<Activity/>}><div className="table audit">{audit.map(row=><div className="row" key={row.join('-')}>{row.map(cell=><span key={cell}>{cell}</span>)}</div>)}</div></Panel>}
function Agent({name,desc}){return <div className="agent"><Bot/><strong>{name}</strong><span>{desc}</span></div>}
function Table({rows}){return <div className="table">{rows.map(row=><div className="row" key={row[0]}>{row.map(cell=><span key={cell}>{cell}</span>)}</div>)}</div>}
function Panel({title,icon,children}){return <article className="panel"><div className="panel-title">{icon}<h2>{title}</h2></div>{children}</article>}

createRoot(document.getElementById('root')).render(<App/>);
