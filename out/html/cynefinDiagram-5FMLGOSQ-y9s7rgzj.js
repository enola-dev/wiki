import{m as IK}from"./wiki-cbe7hd3d.js";import{n as LK}from"./wiki-57pwjp0q.js";import"./wiki-a24gn8sw.js";import{r as EK}from"./wiki-34q0ar26.js";import"./wiki-6dn3rxk8.js";import"./wiki-pjm3zez3.js";import"./wiki-e85pnym7.js";import"./wiki-nnts73pn.js";import"./wiki-qdk3c630.js";import"./wiki-0epw3pnd.js";import"./wiki-5c5j20c3.js";import"./wiki-6gt0fb8r.js";import"./wiki-0n2mhqap.js";import"./wiki-byg9tpvk.js";import"./wiki-mverk9f8.js";import"./wiki-5ep558tj.js";import"./wiki-d80mzbcb.js";import"./wiki-362ky1fy.js";import"./wiki-ahpj2bgc.js";import{uc as d}from"./wiki-4fp686ya.js";import"./wiki-4k52963t.js";import{Jc as i,Lc as zK,Vc as s,nd as UK,sd as ZK,td as BK,ud as VK,vd as FK,wd as jK,xd as PK,yd as RK}from"./wiki-f1txy54q.js";import{Hd as u}from"./wiki-xvj86xk5.js";import{Ge as z}from"./wiki-fs4np4zx.js";import"./wiki-qy8z9qt9.js";var XK=z(()=>({domains:new Map,transitions:[]}),"createDefaultData"),g=XK(),YK=z(()=>g.domains,"getDomains"),CK=z(()=>g.transitions,"getTransitions"),DK=z((K)=>{if(!K)return;for(let Q of K){let $=Q.domain,J=(Q.items??[]).map((B)=>({label:B.label}));g.domains.set($,{name:$,items:J})}},"setDomains"),wK=z((K)=>{if(!K)return;g.transitions=K.filter((Q)=>{if(Q.from===Q.to)return u.warn(`Cynefin: self-loop transition on domain "${Q.from}" is not meaningful and will be skipped.`),!1;return!0}).map((Q)=>({from:Q.from,to:Q.to,label:Q.label||void 0}))},"setTransitions"),_K=z(()=>{return d({...zK.cynefin,...s().cynefin})},"getConfig"),bK=z(()=>{ZK(),g=XK()},"clear"),r={getDomains:YK,getTransitions:CK,setDomains:DK,setTransitions:wK,getConfig:_K,clear:bK,setAccTitle:BK,getAccTitle:VK,setDiagramTitle:PK,getDiagramTitle:RK,getAccDescription:jK,setAccDescription:FK},xK=z((K)=>{IK(K,r),r.setDomains(K.domains),r.setTransitions(K.transitions)},"populate"),fK={parse:z(async(K)=>{let Q=await LK("cynefin",K);u.debug(Q),xK(Q)},"parse")};function l(K){let Q=K+1831565813|0;return Q=Math.imul(Q^Q>>>15,Q|1),Q^=Q+Math.imul(Q^Q>>>7,Q|61),((Q^Q>>>14)>>>0)/4294967296}z(l,"seededRandom");function MK(K){let Q=0;for(let $=0;$<K.length;$++){let J=K.charCodeAt($);Q=(Q<<5)-Q+J,Q|=0}return Q}z(MK,"hashString");function kK(K,Q){if(typeof K==="number"&&Number.isFinite(K)&&K!==0)return K;return MK(Q)}z(kK,"resolveSeed");function GK(K,Q,$,J){let B=K/2,P=J??K*0.015,h=7,x=Q/7,F=[];for(let q=0;q<=7;q++){let R=l($+q*17)*P*2-P;F.push({x:B+R,y:q*x})}let W=`M${F[0].x},${F[0].y}`;for(let q=0;q<F.length-1;q++){let R=F[q],Z=F[q+1],j=(R.y+Z.y)/2,G=q%2===0?1:-1,L=P*1.5*G*l($+q*31+7),f=R.x+L,y=j,p=Z.x-L;W+=` C${f},${y} ${p},${j} ${Z.x},${Z.y}`}return W}z(GK,"generateFoldPath");function OK(K,Q,$,J){let B=Q/2,P=J??Q*0.015,h=7,x=K/7,F=[];for(let q=0;q<=7;q++){let R=l($+q*23)*P*2-P;F.push({x:q*x,y:B+R})}let W=`M${F[0].x},${F[0].y}`;for(let q=0;q<F.length-1;q++){let R=F[q],Z=F[q+1],j=(R.x+Z.x)/2,G=q%2===0?1:-1,L=P*1.5*G*l($+q*37+11),f=j,y=R.y+L,p=j,C=Z.y-L;W+=` C${f},${y} ${p},${C} ${Z.x},${Z.y}`}return W}z(OK,"generateHorizontalBoundary");function HK(K,Q){let $=K/2,J=Q*0.5,B=Q,P=K*0.03;return[`M${$},${J}`,`C${$+P},${J+(B-J)*0.2}`,`${$-P*1.5},${J+(B-J)*0.55}`,`${$+P*0.5},${J+(B-J)*0.75}`,`C${$-P},${J+(B-J)*0.85}`,`${$+P*0.3},${J+(B-J)*0.95}`,`${$},${B}`].join(" ")}z(HK,"generateCliffPath");function WK(K,Q,$,J){return[`M${K-$},${Q}`,`A${$},${J} 0 1,1 ${K+$},${Q}`,`A${$},${J} 0 1,1 ${K-$},${Q}`,"Z"].join(" ")}z(WK,"generateConfusionPath");var qK={complex:{model:"Probe → Sense → Respond",practice:"Emergent Practices"},complicated:{model:"Sense → Analyse → Respond",practice:"Good Practices"},clear:{model:"Sense → Categorise → Respond",practice:"Best Practices"},chaotic:{model:"Act → Sense → Respond",practice:"Novel Practices"},confusion:{model:"",practice:"Disorder"}},yK=z((K,Q)=>{let $=K/2,J=Q/2;return{complex:{cx:$/2,cy:J/2,x:0,y:0,w:$,h:J},complicated:{cx:$+$/2,cy:J/2,x:$,y:0,w:$,h:J},chaotic:{cx:$/2,cy:J+J/2,x:0,y:J,w:$,h:J},clear:{cx:$+$/2,cy:J+J/2,x:$,y:J,w:$,h:J},confusion:{cx:$,cy:J,x:$*0.7,y:J*0.7,w:$*0.6,h:J*0.6}}},"getDomainLayouts"),pK=z(()=>{let K=i(),Q=s();return d(K,Q.themeVariables).cynefin},"getCynefinDomainColors"),o=3,cK=z((K,Q,$,J)=>{let B=J.db,P=B.getDomains(),h=B.getTransitions(),x=B.getDiagramTitle(),F=B.getAccTitle(),W=B.getAccDescription(),q=B.getConfig(),R=pK();u.debug("Rendering Cynefin diagram");let{width:Z,height:j,padding:G,showDomainDescriptions:L,boundaryAmplitude:f}=q,y=Z+G*2,p=j+G*2,C={complex:R.complexBg,complicated:R.complicatedBg,clear:R.clearBg,chaotic:R.chaoticBg,confusion:R.confusionBg},A=EK(Q);if(UK(A,p,y,q.useMaxWidth??!0),A.attr("viewBox",`0 0 ${y} ${p}`),F)A.append("title").text(F);if(W)A.append("desc").text(W);let T=A.append("g").attr("transform",`translate(${G}, ${G})`),c=yK(Z,j),e=kK(q.seed,Q),AK=T.append("g").attr("class","cynefin-backgrounds"),n=["complex","complicated","chaotic","clear"];for(let V of n){let U=c[V];AK.append("rect").attr("class","cynefinDomain").attr("x",U.x).attr("y",U.y).attr("width",U.w).attr("height",U.h).attr("fill",C[V]).attr("fill-opacity",0.4).attr("stroke","none")}let a=T.append("g").attr("class","cynefin-boundaries");a.append("path").attr("class","cynefinBoundary").attr("d",GK(Z,j,e,f)).attr("fill","none"),a.append("path").attr("class","cynefinBoundary").attr("d",OK(Z,j,e+100,f)).attr("fill","none"),a.append("path").attr("class","cynefinCliff").attr("d",HK(Z,j)).attr("fill","none");let TK=Z*0.15,vK=j*0.15;T.append("path").attr("class","cynefinConfusion").attr("d",WK(Z/2,j/2,TK,vK)).attr("fill",C.confusion).attr("fill-opacity",0.5);let t=T.append("g").attr("class","cynefin-labels");for(let V of n){let U=c[V];t.append("text").attr("class","cynefinDomainLabel").attr("x",U.cx).attr("y",L?U.cy-30:U.cy).attr("text-anchor","middle").attr("dominant-baseline","middle").text(V.charAt(0).toUpperCase()+V.slice(1))}if(t.append("text").attr("class","cynefinDomainLabel").attr("x",Z/2).attr("y",L?j/2-10:j/2).attr("text-anchor","middle").attr("dominant-baseline","middle").text("Confusion"),L){let V=T.append("g").attr("class","cynefin-subtitles");for(let U of n){let I=c[U],E=qK[U];V.append("text").attr("class","cynefinSubtitle").attr("x",I.cx).attr("y",I.cy-10).attr("text-anchor","middle").attr("dominant-baseline","middle").text(E.model),V.append("text").attr("class","cynefinSubtitle").attr("x",I.cx).attr("y",I.cy+5).attr("text-anchor","middle").attr("dominant-baseline","middle").text(E.practice)}V.append("text").attr("class","cynefinSubtitle").attr("x",Z/2).attr("y",j/2+8).attr("text-anchor","middle").attr("dominant-baseline","middle").text(qK.confusion.practice)}let KK=T.append("g").attr("class","cynefin-items"),v=26,QK=10,SK=["complex","complicated","chaotic","clear","confusion"];for(let V of SK){let U=P.get(V);if(!U||U.items.length===0)continue;let I=c[V],E=V==="confusion",D=U.items,w=0;if(E&&U.items.length>o)w=U.items.length-o,D=U.items.slice(0,o);let S;if(E){let M=L?22:14;S=I.cy+M}else S=I.cy+(L?25:15);if([...D].forEach((M,N)=>{let O=S+N*(v+4),Y=KK.append("g"),_=Y.append("text").attr("class","cynefinItemText").attr("x",0).attr("y",v/2).attr("text-anchor","middle").attr("dominant-baseline","central").text(M.label),k=M.label.length*7,X=_.node();if(X&&typeof X.getBBox==="function"){let m=X.getBBox();if(m.width>0)k=m.width}let H=k+QK*2,b=I.cx-H/2;Y.attr("transform",`translate(${b}, ${O})`),Y.insert("rect","text").attr("class","cynefinItem").attr("x",0).attr("y",0).attr("width",H).attr("height",v).attr("rx",4).attr("ry",4).attr("fill",C[V]).attr("fill-opacity",0.95),_.attr("x",H/2).attr("y",v/2)}),w>0){let M=S+D.length*(v+4),N=`+${w} more`,O=KK.append("g"),Y=O.append("text").attr("class","cynefinItemText").attr("x",0).attr("y",v/2).attr("text-anchor","middle").attr("dominant-baseline","central").text(N),_=N.length*7,k=Y.node();if(k&&typeof k.getBBox==="function"){let b=k.getBBox();if(b.width>0)_=b.width}let X=_+QK*2,H=I.cx-X/2;O.attr("transform",`translate(${H}, ${M})`),O.insert("rect","text").attr("class","cynefinItemOverflow").attr("x",0).attr("y",0).attr("width",X).attr("height",v).attr("rx",4).attr("ry",4).attr("fill",C[V]).attr("fill-opacity",0.6),Y.attr("x",X/2).attr("y",v/2)}}if(h.length>0){let V=A.select("defs").empty()?A.append("defs"):A.select("defs"),U=`cynefin-arrow-${Q}`;V.append("marker").attr("id",U).attr("viewBox","0 0 10 10").attr("refX",9).attr("refY",5).attr("markerWidth",6).attr("markerHeight",6).attr("orient","auto-start-reverse").append("path").attr("d","M 0 0 L 10 5 L 0 10 z").attr("class","cynefinArrowHead");let I=T.append("g").attr("class","cynefin-arrows");h.forEach((E)=>{let D=c[E.from],w=c[E.to];if(!D||!w)return;if(E.from===E.to){u.warn(`Cynefin renderer: skipping self-loop on domain "${E.from}"`);return}let{cx:S,cy:M}=D,N=w.cx,O=w.cy,Y=(S+N)/2,_=(M+O)/2,k=N-S,X=O-M,H=Math.sqrt(k*k+X*X),b=H*0.15,m=-X/H,NK=k/H,$K=Y+m*b,JK=_+NK*b;if(I.append("path").attr("class","cynefinArrowLine").attr("d",`M${S},${M} Q${$K},${JK} ${N},${O}`).attr("fill","none").attr("marker-end",`url(#${U})`),E.label)I.append("text").attr("class","cynefinArrowLabel").attr("x",$K).attr("y",JK-6).attr("text-anchor","middle").attr("dominant-baseline","auto").text(E.label)})}if(x)T.append("text").attr("class","cynefinTitle").attr("x",Z/2).attr("y",-G/2).attr("text-anchor","middle").attr("dominant-baseline","middle").text(x)},"draw"),uK={draw:cK},lK=z(()=>{let K=i(),Q=s();return d(K,Q.themeVariables).cynefin},"getCynefinTheme"),gK=z(()=>{let K=lK();return`
	.cynefinDomain {
		stroke: none;
	}
	.cynefinDomainLabel {
		font-size: ${K.domainFontSize}px;
		font-weight: bold;
		fill: ${K.labelColor};
	}
	.cynefinSubtitle {
		font-size: ${K.itemFontSize-1}px;
		fill: ${K.textColor};
		font-style: italic;
	}
	.cynefinItem {
		fill-opacity: 0.95;
		stroke: ${K.boundaryColor};
		stroke-width: 1;
	}
	.cynefinItemText {
		font-size: ${K.itemFontSize}px;
		fill: ${K.textColor};
	}
	.cynefinItemOverflow {
		fill-opacity: 0.6;
		stroke: ${K.boundaryColor};
		stroke-width: 1;
		stroke-dasharray: 3 2;
	}
	.cynefinBoundary {
		stroke: ${K.boundaryColor};
		stroke-width: ${K.boundaryWidth};
		stroke-dasharray: 6 3;
	}
	.cynefinCliff {
		stroke: ${K.cliffColor};
		stroke-width: ${K.cliffWidth};
	}
	.cynefinConfusion {
		stroke: ${K.boundaryColor};
		stroke-width: 1.5;
		stroke-dasharray: 4 2;
	}
	.cynefinArrowLine {
		stroke: ${K.arrowColor};
		stroke-width: ${K.arrowWidth};
		fill: none;
	}
	.cynefinArrowHead {
		fill: ${K.arrowColor};
		stroke: none;
	}
	.cynefinArrowLabel {
		font-size: ${K.itemFontSize-1}px;
		fill: ${K.textColor};
	}
	.cynefinTitle {
		font-size: ${K.domainFontSize+2}px;
		font-weight: bold;
		fill: ${K.labelColor};
	}
	`},"styles"),hK=gK,iK={parser:fK,db:r,renderer:uK,styles:hK};export{iK as diagram};
