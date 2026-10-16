/* Saf iş kuralları: tarayıcıda ve Node.js doğrulamasında aynı kod kullanılır. */
(function(root) {
  'use strict';
  const fresh = () => ({name:'Minik kaşif',completed:[],activityLog:[],sound:true,dailyGoal:3});
  function validId(id, content) {
    if(typeof id !== 'string') return false;
    if(/^write:[ABCÇDEFGĞHIİJKLMNOÖPRSŞTUÜVYZ](:lower)?$/.test(id)) return true;
    const match=/^(syllable|word|sentence|listen|visual|speak|practice):(\d+)$/.exec(id);
    if(!match) return false;
    const count=content.reading[match[1]]?.length ?? content.listening.length;
    return Number(match[2]) < count;
  }
  function normalizeState(raw, content) {
    if(!raw || typeof raw !== 'object' || !Array.isArray(raw.completed)) throw new Error('Geçerli bir Novarge yedeği seçin.');
    const base=fresh();
    base.name=typeof raw.name==='string' ? raw.name.trim().slice(0,22)||base.name : base.name;
    base.completed=[...new Set(raw.completed.filter(id=>validId(id,content)))].slice(0,1000);
    base.sound=typeof raw.sound==='boolean'?raw.sound:true;
    base.dailyGoal=[2,3,5].includes(raw.dailyGoal)?raw.dailyGoal:3;
    base.activityLog=Array.isArray(raw.activityLog) ? raw.activityLog.filter(x=>x&&/^\d{4}-\d{2}-\d{2}$/.test(x.date)&&['write','syllable','word','sentence','listen','visual','speak','practice'].includes(x.type)).slice(-500).map(x=>({date:x.date,type:x.type})) : [];
    return base;
  }
  function readBackup(raw,content) {
    if(raw?.uygulama!=='Novarge Okuma Yazma') throw new Error('Bu dosya bir Novarge ilerleme yedeği değil.');
    const candidate=raw.state||{name:raw.takmaAd,completed:raw.tamamlananEtkinlikler,activityLog:raw.oyunGecmisi};
    if(!Array.isArray(candidate.completed)||candidate.completed.some(id=>!validId(id,content))) throw new Error('Yedekte geçersiz veya bu sürümde bulunmayan etkinlikler var.');
    return normalizeState(candidate,content);
  }
  const normalizeSpeech = text => String(text).normalize('NFC').toLocaleLowerCase('tr-TR').replace(/[^a-zçğıöşü]/g,'');
  function evaluateTrace({points,distance,mask,width,height,cells}) {
    if(distance<70||points.length<10) return {accepted:false,reason:'empty',coverage:0,precision:0};
    const covered=new Set();let inside=0;
    for(const p of points){let near=false;
      for(let dy=-17;dy<=17;dy+=8)for(let dx=-17;dx<=17;dx+=8){
        const x=Math.round(p.x+dx),y=Math.round(p.y+dy);
        if(x<0||x>=width||y<0||y>=height)continue;
        if(mask[(y*width+x)*4+3]>70){near=true;covered.add(`${Math.floor(x/12)},${Math.floor(y/12)}`);}
      }
      if(near)inside++;
    }
    const coverage=[...cells].filter(c=>covered.has(c)).length/Math.max(cells.size,1),precision=inside/points.length;
    return {accepted:coverage>=.53&&precision>=.57,reason:precision<.57?'outside':'incomplete',coverage,precision};
  }
  const api={fresh,normalizeState,readBackup,normalizeSpeech,evaluateTrace,validId};
  if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.NovargeCore=api;
})(typeof globalThis!=='undefined'?globalThis:this);
