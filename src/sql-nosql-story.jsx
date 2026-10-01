import React from 'react';
import {AbsoluteFill, Audio, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {sceneTimeline} from './project.js';
import {EditorialBackground, resolveTheme} from './editorial-style.jsx';

const C={bg:'#20232B',panel:'#2B303B',line:'#536070',white:'#F2F3F5',muted:'#B5BAC1',purple:'#8992FF',mint:'#64E0B6',amber:'#FFD084',blue:'#89CFFF',red:'#FF8A91'};
const opts={extrapolateLeft:'clamp',extrapolateRight:'clamp'};
const tween=(f,a,b,x,y)=>interpolate(f,[a,b],[x,y],opts);
const clamp=(n)=>Math.max(0,Math.min(1,n));
const wave=(f,s=11,a=1)=>Math.sin(f/s)*a;
function Txt({x,y,children,size=26,color=C.white,weight=700,anchor='start',opacity=1,family='Avenir Next, Arial, sans-serif'}){return <text x={x} y={y} fill={color} fontSize={size} fontWeight={weight} textAnchor={anchor} opacity={opacity} fontFamily={family}>{children}</text>}
function Panel({x,y,w,h,stroke=C.purple,fill=C.panel,r=22,children,opacity=1}){return <g opacity={opacity}><rect x={x} y={y} width={w} height={h} rx={r} fill={fill} stroke={stroke} strokeWidth="3"/>{children}</g>}
function Link({x1,y1,x2,y2,color=C.line,width=4,dash}){return <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={width} strokeDasharray={dash} strokeLinecap="round"/>}
function Dot({x,y,color=C.mint,r=10}){return <circle cx={x} cy={y} r={r} fill={color}/>}
function Label({x,y,children,color=C.mint}){return <Txt x={x} y={y} size={21} color={color} weight={900}>{children}</Txt>}
function Table({x,y,title,columns,rows,color=C.purple,frame=60,w=650,selected=-1,compact=false}){
 const colW=(w-36)/columns.length, header=compact?56:64, rowH=compact?58:65, h=72+header+rows.length*rowH+24;
 return <Panel x={x} y={y} w={w} h={h} stroke={color} fill={C.bg}>
  <rect x={x} y={y} width={w} height="71" rx="20" fill={color} opacity=".16"/>
  <Txt x={x+25} y={y+47} size={27} color={color} weight={900}>{title}</Txt>
  {columns.map((c,i)=><g key={c} opacity={tween(frame,6+i*5,18+i*5,0,1)}><Txt x={x+18+i*colW} y={y+112} size={compact?21:24} color={color} weight={900}>{c}</Txt></g>)}
  <Link x1={x+18} x2={x+w-18} y1={y+72+header} y2={y+72+header}/>
  {rows.map((row,j)=><g key={j} opacity={tween(frame,18+j*10,31+j*10,0,1)} transform={`translate(${tween(frame,18+j*10,31+j*10,-18,0)} 0)`}>
   {selected===j&&<rect x={x+11} y={y+80+header+j*rowH} width={w-22} height={rowH-5} rx="9" fill={color} opacity=".16"/>}
   {row.map((cell,i)=><Txt key={i} x={x+18+i*colW} y={y+113+header+j*rowH} size={compact?20:24} color={i===0?color:C.white} family="Menlo, monospace" weight={i===0?800:500}>{cell}</Txt>)}
   {j<rows.length-1&&<Link x1={x+18} x2={x+w-18} y1={y+129+header+j*rowH} y2={y+129+header+j*rowH} color="#3D4654" width={2}/>}
  </g>)}
 </Panel>
}
function Document({x,y,fields,frame=60,color=C.mint,w=480,title='user.json',active=-1}){
 const h=190+fields.length*65;
 return <Panel x={x} y={y} w={w} h={h} stroke={color} fill={C.bg}>
  <circle cx={x+27} cy={y+30} r="7" fill={C.red}/><circle cx={x+50} cy={y+30} r="7" fill={C.amber}/><circle cx={x+73} cy={y+30} r="7" fill={C.mint}/>
  <Txt x={x+24} y={y+81} size={26} color={color} weight={900}>{title}</Txt>
  <Txt x={x+25} y={y+123} size={25} color={C.muted} family="Menlo, monospace">{'{'}</Txt>
  {fields.map(([k,val],i)=><g key={k} opacity={tween(frame,8+i*9,22+i*9,0,1)} transform={`translate(${tween(frame,8+i*9,22+i*9,0,0)} ${tween(frame,8+i*9,22+i*9,12,0)})`}>
   {active===i&&<rect x={x+22} y={y+132+i*65} width={w-44} height="53" rx="9" fill={color} opacity=".13"/>}
   <Txt x={x+43} y={y+172+i*65} size={22} color={C.blue} family="Menlo, monospace">"{k}"</Txt>
   <Txt x={x+43+Math.min(k.length*13+43,205)} y={y+172+i*65} size={22} color={C.white} family="Menlo, monospace">: {val}</Txt>
  </g>)}
  <Txt x={x+25} y={y+h-18} size={25} color={C.muted} family="Menlo, monospace">{'}'}</Txt>
 </Panel>
}
const userFields=[['id','101'],['name','"Alya"'],['email','"a@web.id"']];
const orderFields=[['id','501'],['user_id','101'],['total','125k']];
const docA=[['name','"Alya"'],['email','"a@web.id"'],['alamat','"Jakarta"']];
const docB=[['name','"Bima"'],['email','"b@web.id"'],['foto','"bima.png"'],['sosial','"@bima"'],['preferensi','"dark"']];
function Database({x,y,color=C.purple,frame=0,label='DATABASE',scale=1}){return <g transform={`translate(${x} ${y+wave(frame,17,4)}) scale(${scale})`}><ellipse cx="0" cy="-78" rx="92" ry="31" fill={color}/><path d="M-92 -78 V85 Q0 140 92 85 V-78" fill={C.panel} stroke={color} strokeWidth="5"/><ellipse cx="0" cy="-12" rx="92" ry="31" fill="none" stroke={color} strokeWidth="4"/><ellipse cx="0" cy="57" rx="92" ry="31" fill="none" stroke={color} strokeWidth="4"/><Dot x={52} y={-10} color={C.mint} r={7}/><Dot x={52} y={59} color={C.mint} r={7}/><Txt x={0} y={157} size={25} anchor="middle" color={color} weight={900}>{label}</Txt></g>}
function MovingParticle({x1,y1,x2,y2,frame,color=C.mint,period=68,offset=0}){const p=((frame+offset)%period)/period;return <Dot x={x1+(x2-x1)*p} y={y1+(y2-y1)*p} r={10} color={color}/>}
function Hero({frame,variant}){const both=variant==='intro', sql=variant==='sql-title', question=variant==='question', final=variant==='final';return <g>
 {both||sql||question||final?<Database x={both?248:question?255:final?250:450} y={320} frame={frame} label="SQL" color={C.purple} scale={both||question||final?1:.9}/>:null}
 {both||question||final?<g><g transform={`translate(650 ${320+wave(frame,14,6)})`}><rect x="-98" y="-92" width="195" height="183" rx="24" fill={C.panel} stroke={C.mint} strokeWidth="5"/><Txt x={0} y={-28} anchor="middle" color={C.mint} size={31} weight={900}>{'{ }'}</Txt><Link x1={-55} y1={0} x2={55} y2={0} color={C.line}/><Link x1={-55} y1={39} x2={35} y2={39} color={C.line}/><Txt x={0} y={150} anchor="middle" color={C.mint} size={25} weight={900}>NoSQL</Txt></g></g>:null}
 {question&&<Txt x={450} y={626} size={70} anchor="middle" color={C.amber}>?</Txt>}
 {final&&<g><path d="M405 600 l35 36 70 -80" fill="none" stroke={C.mint} strokeWidth="18" strokeLinecap="round" strokeLinejoin="round"/></g>}
 {sql&&<g><Table x={135} y={535} w={630} title="users" columns={['id','name','email']} rows={[[101,'Alya','a@web.id']]} frame={frame} compact/></g>}
 {both&&<g><Txt x={450} y={660} size={28} color={C.muted} anchor="middle">DUA MODEL · SATU TUJUAN: MENGELOLA DATA</Txt></g>}
 </g>}
function Relational({frame,mode}){const rel=mode==='relational'||mode==='relation';const onlyUser=mode==='users';const onlyOrder=mode==='orders';return <g>
 {rel?<g><Table x={35} y={115} w={395} title="users" columns={['id','name']} rows={[[101,'Alya'],[102,'Bima']]} frame={frame} compact selected={mode==='relation'?0:-1}/><Table x={470} y={115} w={395} title="orders" columns={['id','user_id']} rows={[[501,101],[502,102]]} frame={frame} color={C.mint} compact selected={mode==='relation'?0:-1}/><path d="M95 652 H805" stroke={C.line} strokeWidth="3" strokeDasharray="12 12"/><Txt x={450} y={700} anchor="middle" size={25} color={C.muted}>dua tabel, satu hubungan</Txt>{mode==='relation'&&<g><path d="M178 386 C300 545 570 545 655 386" fill="none" stroke={C.amber} strokeWidth="5" strokeDasharray="12 9"/><MovingParticle x1={200} y1={398} x2={644} y2={398} frame={frame} color={C.amber}/><Txt x={450} y={567} size={27} color={C.amber} anchor="middle" weight={900}>users.id = orders.user_id</Txt></g>}</g>:null}
 {mode==='table-build'&&<g><Table x={105} y={145} w={690} title="users" columns={['id','name','email']} rows={[[101,'Alya','a@web.id'],[102,'Bima','b@web.id'],[103,'Citra','c@web.id']]} frame={frame} selected={Math.floor(frame/25)%3}/><Txt x={450} y={640} size={26} anchor="middle" color={C.muted}>KOLOM ↓  ·  BARIS →</Txt></g>}
 {onlyUser&&<Table x={93} y={170} w={714} title="users" columns={['id','name','email']} rows={[[101,'Alya','a@web.id'],[102,'Bima','b@web.id']]} frame={frame} selected={Math.floor(frame/26)%2}/>}
 {onlyOrder&&<Table x={93} y={170} w={714} title="orders" columns={['id','user_id','total']} rows={[[501,101,'125k'],[502,102,'89k']]} frame={frame} color={C.mint} selected={Math.floor(frame/26)%2}/>}
 </g>}
function Cabinet({frame,mode}){let open=mode==='drawer';return <g><Panel x={155} y={75} w={590} h={615} stroke={C.purple} fill="#242A35" r={16}>
 <rect x="180" y="94" width="540" height="562" rx="8" fill="#313949"/>
 {['users','orders','payments'].map((name,i)=>{const y=145+i*170,slide=open&&i===Math.floor(frame/35)%3?tween(frame%35,0,18,0,76):0;return <g key={name} transform={`translate(${slide} 0)`}><rect x="195" y={y} width="510" height="138" rx="8" fill="#3C4658" stroke={i===0?C.purple:i===1?C.mint:C.amber} strokeWidth="3"/><rect x="404" y={y+20} width="92" height="20" rx="9" fill={C.line}/><Txt x={450} y={y+92} size={29} anchor="middle" weight={900}>{name.toUpperCase()}</Txt></g>})}
 </Panel><Txt x={450} y={741} size={26} color={C.muted} anchor="middle">setiap jenis data punya laci sendiri</Txt></g>}
function Form({frame,mode}){const schema=mode==='schema';return <g><Panel x={185} y={83} w={530} h={590} stroke={C.purple} fill={C.bg}><Txt x={235} y={155} size={30} color={C.purple} weight={900}>FORM USER</Txt>{['nama','email','telepon'].map((field,i)=>{const active=Math.floor(frame/30)%3===i;return <g key={field}><Txt x={235} y={231+i*132} size={23} color={C.muted}>{field.toUpperCase()}</Txt><rect x={235} y={249+i*132} width="430" height="68" rx="11" fill="#394354" stroke={active?C.mint:C.line} strokeWidth={active?4:2}/><Txt x={258} y={292+i*132} size={25} color={C.white} opacity={tween(frame,12+i*17,25+i*17,0,1)}>{['Alya','alya@web.id','0812-xxxx'][i]}</Txt>{schema&&<Dot x={633} y={284+i*132} color={C.mint} r={10}/>}</g>})}</Panel>{schema&&<g><Txt x={450} y={744} size={25} color={C.mint} anchor="middle" weight={900}>3 FIELD WAJIB · FORMAT KONSISTEN</Txt></g>}</g>}
function BrandNames({frame,sql=true}){const items=sql?['PostgreSQL','MySQL','SQL Server']:['MongoDB'];return <g>{items.map((name,i)=>{const y=sql?128+i*180:260;return <g key={name} opacity={tween(frame,i*12,i*12+14,0,1)} transform={`translate(${tween(frame,i*12,i*12+14,-50,0)} 0)`}><Panel x={sql?132:200} y={y} w={sql?636:500} h={125} stroke={sql?C.purple:C.mint}><Database x={sql?220:286} y={y+68} scale={.24} color={sql?C.purple:C.mint} frame={frame} label=""/><Txt x={sql?305:375} y={y+78} size={sql?31:39} weight={900}>{name}</Txt></Panel></g>})}</g>}
function NoSqlVisual({frame,mode}){if(mode==='nosql-title')return <g><Document x={195} y={135} w={510} title="document.json" fields={docA} frame={frame}/><Txt x={450} y={691} size={30} color={C.mint} anchor="middle" weight={900}>NoSQL</Txt></g>;
 if(mode==='nosql-model')return <g>{['DOCUMENT','KEY–VALUE','GRAPH'].map((name,i)=>{let x=30+i*290,dy=wave(frame+i*9,14,5);return <g key={name} transform={`translate(0 ${dy})`} opacity={tween(frame,i*10,i*10+17,0,1)}><Panel x={x} y={240} w={260} h={245} stroke={[C.mint,C.amber,C.blue][i]}><Txt x={x+130} y={310} size={23} anchor="middle" color={[C.mint,C.amber,C.blue][i]} weight={900}>{name}</Txt><Txt x={x+130} y={402} size={55} anchor="middle" color={C.white}>{['{ }','A:B','◯—◯'][i]}</Txt></Panel></g>})}<Txt x={450} y={610} size={25} color={C.muted} anchor="middle">NoSQL bukan satu bentuk data saja</Txt></g>;
 if(mode==='document')return <g><Document x={210} y={95} w={480} fields={docA} frame={frame}/><Txt x={450} y={676} size={27} anchor="middle" color={C.mint}>1 dokumen = 1 objek data</Txt></g>;
 if(mode==='json')return <Document x={162} y={75} w={576} fields={docA} frame={frame} active={Math.floor(frame/28)%3}/>;
 if(mode==='user-a')return <Document x={162} y={75} w={576} fields={docA} frame={frame} title="user_A.json"/>;
 if(mode==='user-b')return <Document x={130} y={50} w={640} fields={docB} frame={frame} title="user_B.json" active={2+Math.floor(frame/28)%3}/>;
 if(mode==='flex')return <g><Document x={25} y={143} w={405} fields={docA} frame={frame} title="A.json"/><Document x={470} y={75} w={405} fields={docB} frame={frame} title="B.json"/><path d="M445 236 v380" stroke={C.amber} strokeWidth="5" strokeDasharray="13 11"/><Txt x={450} y={716} anchor="middle" size={26} color={C.mint}>field berbeda, tetap valid</Txt></g>;
 return null}
function Boxes({frame,mode}){let varied=mode==='box-variety';return <g>{['NAMA','FOTO','SOSIAL'].map((name,i)=>{const x=100+i*245,y=245+wave(frame+i*10,11,10);return <g key={name} transform={`translate(0 ${y-245})`} opacity={tween(frame,i*10,i*10+15,0,1)}><rect x={x} y="265" width="215" height={varied?215+i*50:245} rx="15" fill={C.panel} stroke={[C.purple,C.mint,C.amber][i]} strokeWidth="4"/><path d={`M${x} 300 L${x+107} 240 L${x+215} 300`} fill={C.bg} stroke={[C.purple,C.mint,C.amber][i]} strokeWidth="4"/><Txt x={x+107} y={390} size={26} anchor="middle" color={[C.purple,C.mint,C.amber][i]} weight={900}>{name}</Txt>{Array.from({length:varied?i+1:2},(_,k)=><rect key={k} x={x+38} y={420+k*43} width={137-k*20} height="15" rx="7" fill={C.line}/>)}</g>})}<Txt x={450} y={688} size={26} color={C.muted} anchor="middle">kotaknya menyesuaikan isi</Txt></g>}
function Criteria({frame,mode}){const sql=mode==='sql-criteria'||mode==='sql-choice',chosen=mode.endsWith('choice');const items=sql?['STRUKTUR JELAS','BANYAK RELASI','TRANSAKSI KUAT']:mode==='distributed'?['BEBAN TERSEBAR','AKSES LINTAS NODE','DESAIN SISTEM']:['FIELD FLEKSIBEL','POLA AKSES COCOK','MODEL DOKUMEN'];return <g>{items.map((item,i)=>{const y=125+i*152;return <g key={item} opacity={tween(frame,i*12,i*12+16,0,1)}><Panel x={78} y={y} w={744} h={108} stroke={sql?C.purple:C.mint} fill={C.panel}><circle cx={138} cy={y+54} r="22" fill={sql?C.purple:C.mint} opacity=".22"/><Txt x={138} y={y+63} size={26} color={sql?C.purple:C.mint} anchor="middle">✓</Txt><Txt x={185} y={y+65} size={26} weight={900}>{item}</Txt></Panel></g>})}<Link x1={450} y1={570} x2={450} y2={615} color={sql?C.purple:C.mint}/><MovingParticle x1={450} y1={570} x2={450} y2={615} frame={frame} color={sql?C.purple:C.mint} period={38}/><Txt x={450} y={684} size={chosen?39:31} anchor="middle" color={sql?C.purple:C.mint} weight={900}>{chosen?sql?'→ SQL':'→ NoSQL':sql?'SQL cocok dipertimbangkan':'Lihat kebutuhan sistem'}</Txt></g>}
function Comparison({frame}){return <g><Panel x={53} y={160} w={365} h={392} stroke={C.purple}><Database x={235} y={325} frame={frame} label="SQL" color={C.purple} scale={.7}/></Panel><Panel x={482} y={160} w={365} h={392} stroke={C.mint}><Document x={525} y={220} w={280} fields={docA.slice(0,2)} frame={frame} title="NoSQL"/></Panel><Txt x={450} y={649} size={26} color={C.amber} anchor="middle" weight={900}>KEBUTUHAN APLIKASI</Txt><MovingParticle x1={420} y1={620} x2={480} y2={620} frame={frame} color={C.amber} period={50}/></g>}
function Visual({mode,frame}){return <svg width="900" height="790" viewBox="0 0 900 790" style={{display:'block',margin:'0 auto',overflow:'visible'}}>
 {['intro','sql-title','question','final'].includes(mode)?<Hero frame={frame} variant={mode}/>:null}
 {['relational','table-build','users','orders','relation'].includes(mode)?<Relational frame={frame} mode={mode}/>:null}
 {['cabinet','drawer'].includes(mode)?<Cabinet frame={frame} mode={mode}/>:null}
 {['form','schema'].includes(mode)?<Form frame={frame} mode={mode}/>:null}
 {mode==='sql-logos'?<BrandNames frame={frame}/>:null}
 {['nosql-title','nosql-model','document','json','user-a','user-b','flex'].includes(mode)?<NoSqlVisual frame={frame} mode={mode}/>:null}
 {['boxes','box-variety'].includes(mode)?<Boxes frame={frame} mode={mode}/>:null}
 {mode==='mongo'?<BrandNames frame={frame} sql={false}/>:null}
 {mode==='fit'?<Comparison frame={frame}/>:null}
 {['sql-criteria','sql-choice','nosql-criteria','distributed','nosql-choice'].includes(mode)?<Criteria frame={frame} mode={mode}/>:null}
 </svg>}
function Scene({scene,frame,total}){const local=frame-scene.from;if(local<0||local>=scene.duration)return null;const fade=tween(local,scene.duration-8,scene.duration,1,0);return <AbsoluteFill style={{color:C.white,fontFamily:'Avenir Next, Arial, sans-serif',opacity:fade}}>
 <div style={{position:'absolute',left:90,top:150,right:90,color:C.mint,fontSize:25,fontWeight:900,letterSpacing:3,opacity:tween(local,0,12,0,1)}}>{scene.visual.kicker}</div>
 <div style={{position:'absolute',left:90,top:230,right:90,fontSize:scene.text.length>23?56:68,lineHeight:1.09,letterSpacing:'-.045em',fontWeight:900,opacity:tween(local,1,15,0,1),transform:`translateY(${tween(local,0,19,36,0)}px)`}}>{scene.text}</div>
 <div style={{position:'absolute',top:575,left:0,right:0}}><Visual mode={scene.visual.mode} frame={local}/></div>
 <div style={{position:'absolute',left:90,right:90,top:1510,color:C.muted,fontSize:30,lineHeight:1.35,opacity:tween(local,16,31,0,1)}}>{scene.visual.caption}</div>
 <div style={{position:'absolute',right:90,bottom:110,color:C.muted,fontSize:21,fontFamily:'Menlo, monospace'}}>{String(scene.index+1).padStart(2,'0')} / {total}</div>
 </AbsoluteFill>}
export function SqlNosqlStoryVideo({project}){const frame=useCurrentFrame(),timeline=sceneTimeline(project),total=timeline.at(-1).from+timeline.at(-1).duration;return <AbsoluteFill style={{overflow:'hidden'}}><EditorialBackground frame={frame} theme={resolveTheme(project.theme)}/>{timeline.map(s=><Scene key={s.index} scene={s} frame={frame} total={timeline.length}/>)}<Audio src={staticFile(project.audio.slice(1))}/><div style={{position:'absolute',left:90,right:90,bottom:75,height:5,borderRadius:5,background:C.line}}><div style={{width:`${frame/total*100}%`,height:'100%',borderRadius:5,background:C.mint}}/></div></AbsoluteFill>}
