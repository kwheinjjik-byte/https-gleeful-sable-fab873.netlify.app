var Q={v:[
{t:"أي كلمة تنتمي إلى المجموعة التالية؟ كتاب – قلم – دفتر – …",o:["ممحاة","سيارة","جبل","بحر"],a:0,e:"كلها أدوات دراسية، والممحاة منها."},
{t:"التناظر اللفظي: قلم : كتابة :: مفتاح : ؟",o:["باب","فتح","حديد","قفل"],a:1,e:"القلم أداته الكتابة، والمفتاح أداته الفتح."},
{t:"أكمل الجملة: العلم نور والجهل …",o:["ضوء","ظلام","علم","بعد"],a:1,e:"ضد النور الظلام."},
{t:"المفردة الشاذة: أسد، نمر، فهد، حصان",o:["أسد","نمر","فهد","حصان"],a:3,e:"الحصان عاشب والبقية من السباع."},
{t:"التناظر اللفظي: طبيب : مستشفى :: معلم : ؟",o:["كتاب","مدرسة","طالب","سبورة"],a:1,e:"مكان عمل كل منهما."},
{t:"ما مرادف كلمة «يَسْتَنْبِط»؟",o:["يُخفي","يَستخرج","يَكتب","يَنسى"],a:1,e:"الاستنباط هو الاستخراج."}],
q:[
{t:"إذا كان 3س + 5 = 20، فما قيمة س؟",o:["3","4","5","6"],a:2,e:"3س = 15، إذن س = 5."},
{t:"ما ناتج 25% من العدد 240؟",o:["40","50","60","80"],a:2,e:"25% = ربع، و240 ÷ 4 = 60."},
{t:"سيارة قطعت 180 كم في ساعتين ونصف، فما سرعتها؟",o:["60 كم/س","72 كم/س","75 كم/س","90 كم/س"],a:1,e:"180 ÷ 2.5 = 72 كم/س."},
{t:"ما العدد التالي: 2، 6، 12، 20، ؟",o:["28","30","32","36"],a:1,e:"الفروق 4، 6، 8، 10، فالتالي 30."},
{t:"مستطيل طوله 8 وعرضه 5، ما محيطه؟",o:["13","26","40","30"],a:1,e:"المحيط = 2 × (8 + 5) = 26."},
{t:"ما قيمة: 0.5 × 40؟",o:["10","15","20","25"],a:2,e:"نصف 40 يساوي 20."}]};
var cur="v",S,tmr,left,DAY=["أحد","اثنين","ثلاثاء","أربعاء","خميس","جمعة","سبت"];
var D={att:0,ok:0,tot:0,last:0,sn:0,sl:"",days:[]};
try{var r=JSON.parse(localStorage.getItem("bliz2"));if(r)D=r}catch(e){}
function save(){try{localStorage.setItem("bliz2",JSON.stringify(D))}catch(e){}}
function $(i){return document.getElementById(i)}
function key(d){return d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate()}
function sec(k){cur=k;$("tv").className="tab"+(k=="v"?" on":"");$("tq").className="tab"+(k=="q"?" on":"");
S={i:0,s:0,a:0};clearInterval(tmr);left=1200;tick();tmr=setInterval(function(){left--;tick();if(left<=0)finish()},1000);draw()}
function tick(){var m=Math.floor(left/60),s=left%60;$("tm").textContent=(m<10?"0":"")+m+":"+(s<10?"0":"")+s}
function draw(){var L=Q[cur];if(S.i>=L.length)return finish();var q=L[S.i],h='<span class="cnt">السؤال '+(S.i+1)+' من '+L.length+'</span><p class="q">'+q.t+'</p>';
q.o.forEach(function(o,j){h+='<button class="opt" onclick="pick('+j+')">'+o+'</button>'});
$("qa").innerHTML=h+'<div class="ex" id="ex"></div><button class="btn nx" id="nx" style="display:none" onclick="S.i++;draw()">السؤال التالي ←</button>'}
function pick(j){var q=Q[cur][S.i],b=document.querySelectorAll(".opt");
b.forEach(function(x,n){x.disabled=true;if(n==q.a)x.className="opt ok";else if(n==j)x.className="opt bad"});
D.tot++;if(j==q.a){S.s++;D.ok++}S.a++;streak();save();stats();
$("ex").style.display="block";$("ex").textContent=(j==q.a?"إجابة صحيحة ✓ — ":"إجابة خاطئة — ")+q.e;$("nx").style.display="inline-flex"}
function finish(){clearInterval(tmr);D.att++;D.last=Date.now();save();stats();var L=Q[cur];
$("qa").innerHTML='<h2 style="color:var(--p)">نتيجتك: '+S.s+' من '+L.length+'</h2><p style="color:var(--mut)">'+(S.s==L.length?"ممتاز! استمر بنفس المستوى.":"أحسنت! كرّر المحاولة لتحسين نتيجتك.")+'</p><button class="btn" onclick="sec(cur)">⟳ محاولة جديدة</button> <button class="btn o" onclick="sec(cur=="v"?"q":"v")">القسم الآخر</button>'}
function streak(){var t=new Date(),k=key(t);if(D.sl==k)return;var y=new Date(t);y.setDate(t.getDate()-1);
D.sn=(D.sl==key(y))?D.sn+1:1;D.sl=k;D.days.push(k);D.days=D.days.slice(-14)}
function stats(){var p=D.tot?Math.round(D.ok/D.tot*100):0;$("pct").textContent=p+"%";
$("ring").style.background="conic-gradient(var(--p) "+p+"%,var(--line) 0)";$("att").textContent=D.att;
var d=D.last?Math.floor((Date.now()-D.last)/864e5):-1;$("lastA").textContent=d<0?"—":(d==0?"اليوم":"منذ "+d+" يوم");
var t=new Date(),y=new Date(t);y.setDate(t.getDate()-1),k=key(t),alive=(D.sl==k||D.sl==key(y));
var n=alive?D.sn:0;$("sn").textContent=n;$("smsg").textContent=D.sl==k?"أحسنت! أنجزت هدف اليوم 🎉":(alive?"حل سؤالًا اليوم لتحافظ على الستريك!":"حل سؤالًا واحدًا اليوم لتبدأ الستريك!");
var h="";for(var i=6;i>=0;i--){var x=new Date(t);x.setDate(t.getDate()-i);h+='<div class="'+(D.days.indexOf(key(x))>-1?"on":"")+'">'+DAY[x.getDay()]+'<i>'+(D.days.indexOf(key(x))>-1?"🔥":"")+'</i></div>'}
$("wk").innerHTML=h}
function openPay(){$("pm").className="modal on"}function cp(){try{navigator.clipboard.writeText($("ib").textContent.replace(/\s/g,""));$("cpb").textContent="تم النسخ ✓"}catch(e){}}
var mb;function openM(t,b){$("mt").textContent=t;$("mgo").textContent=b;$("m").className="modal on"}
function closeM(){$("m").className="modal"}
function done(){var n=$("nm").value.trim();if(!n||!$("em").value.trim()){alert("فضلاً أدخل الاسم والبريد");return}
$("mb").innerHTML='<p>تم بنجاح 🎉 أهلًا '+n.replace(/[<>&]/g,"")+'!</p><button class="btn" style="width:100%;justify-content:center" onclick="closeM()">متابعة</button>'}
stats();sec("v");
