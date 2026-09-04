import{m as v}from"./wiki-cbe7hd3d.js";import{n as _}from"./wiki-57pwjp0q.js";import"./wiki-a24gn8sw.js";import{r as A}from"./wiki-34q0ar26.js";import"./wiki-6dn3rxk8.js";import"./wiki-pjm3zez3.js";import"./wiki-e85pnym7.js";import"./wiki-nnts73pn.js";import"./wiki-qdk3c630.js";import"./wiki-0epw3pnd.js";import"./wiki-5c5j20c3.js";import"./wiki-6gt0fb8r.js";import"./wiki-0n2mhqap.js";import"./wiki-byg9tpvk.js";import"./wiki-mverk9f8.js";import"./wiki-5ep558tj.js";import"./wiki-d80mzbcb.js";import"./wiki-362ky1fy.js";import"./wiki-ahpj2bgc.js";import{uc as R}from"./wiki-4fp686ya.js";import"./wiki-4k52963t.js";import{Jc as S,Lc as T,Vc as D,nd as M,sd as y,td as k,ud as h,vd as b,wd as C,xd as O,yd as V}from"./wiki-f1txy54q.js";import{Hd as w}from"./wiki-xvj86xk5.js";import{Ge as U}from"./wiki-fs4np4zx.js";import"./wiki-qy8z9qt9.js";var F={showLegend:!0,ticks:5,max:null,min:0,graticule:"circle"},j=32,x={axes:[],curves:[],options:F},Z=structuredClone(x),c=T.radar,r=U(()=>{return R({...c,...D().radar})},"getConfig"),f=U(()=>Z.axes,"getAxes"),o=U(()=>Z.curves,"getCurves"),t=U(()=>Z.options,"getOptions"),s=U(($)=>{Z.axes=$.map((q)=>{return{name:q.name,label:q.label??q.name}})},"setAxes"),n=U(($)=>{Z.curves=$.map((q)=>{return{name:q.name,label:q.label??q.name,entries:a(q.entries)}})},"setCurves"),a=U(($)=>{if($[0].axis==null)return $.map((Q)=>Q.value);let q=f();if(q.length===0)throw Error("Axes must be populated before curves for reference entries");return q.map((Q)=>{let z=$.find((B)=>B.axis?.$refText===Q.name);if(z===void 0)throw Error("Missing entry for axis "+Q.label);return z.value})},"computeCurveEntries"),i=U(($)=>{let q=$.reduce((Q,z)=>{return Q[z.name]=z,Q},{});if(Z.options={showLegend:q.showLegend?.value??F.showLegend,ticks:q.ticks?.value??F.ticks,max:q.max?.value??F.max,min:q.min?.value??F.min,graticule:q.graticule?.value??F.graticule},Z.options.ticks>j)w.warn(`Radar diagram ticks (${Z.options.ticks}) exceeds maximum allowed (${j}). Using ${j} instead.`),Z.options.ticks=j},"setOptions"),e=U(()=>{y(),Z=structuredClone(x)},"clear"),X={getAxes:f,getCurves:o,getOptions:t,setAxes:s,setCurves:n,setOptions:i,getConfig:r,clear:e,setAccTitle:k,getAccTitle:h,setDiagramTitle:O,getDiagramTitle:V,getAccDescription:C,setAccDescription:b},qq=U(($)=>{v($,X);let{axes:q,curves:Q,options:z}=$;X.setAxes(q),X.setCurves(Q),X.setOptions(z)},"populate"),Qq={parse:U(async($)=>{let q=await _("radar",$);w.debug(q),qq(q)},"parse")},$q=U(($,q,Q,z)=>{let B=z.db,E=B.getAxes(),K=B.getCurves(),N=B.getOptions(),J=B.getConfig(),Y=B.getDiagramTitle(),H=A(q),G=zq(H,J),W=N.max??Math.max(...K.map((P)=>Math.max(...P.entries))),I=N.min,L=Math.min(J.width,J.height)/2;Bq(G,E,L,N.ticks,N.graticule),Nq(G,E,L,J),m(G,E,K,I,W,N.graticule,J),u(G,K,N.showLegend,J),G.append("text").attr("class","radarTitle").text(Y).attr("x",0).attr("y",-J.height/2-J.marginTop)},"draw"),zq=U(($,q)=>{let Q=q.width+q.marginLeft+q.marginRight,z=q.height+q.marginTop+q.marginBottom,B={x:q.marginLeft+q.width/2,y:q.marginTop+q.height/2};return M($,z,Q,q.useMaxWidth??!0),$.attr("viewBox",`0 0 ${Q} ${z}`).attr("overflow","visible"),$.append("g").attr("transform",`translate(${B.x}, ${B.y})`)},"drawFrame"),Bq=U(($,q,Q,z,B)=>{if(B==="circle")for(let E=0;E<z;E++){let K=Q*(E+1)/z;$.append("circle").attr("r",K).attr("class","radarGraticule")}else if(B==="polygon"){let E=q.length;for(let K=0;K<z;K++){let N=Q*(K+1)/z,J=q.map((Y,H)=>{let G=2*H*Math.PI/E-Math.PI/2,W=N*Math.cos(G),I=N*Math.sin(G);return`${W},${I}`}).join(" ");$.append("polygon").attr("points",J).attr("class","radarGraticule")}}},"drawGraticule"),Nq=U(($,q,Q,z)=>{let B=q.length;for(let E=0;E<B;E++){let K=q[E].label,N=2*E*Math.PI/B-Math.PI/2,J=Math.cos(N),Y=Math.sin(N);$.append("line").attr("x1",0).attr("y1",0).attr("x2",Q*z.axisScaleFactor*J).attr("y2",Q*z.axisScaleFactor*Y).attr("class","radarAxisLine");let H=J>0.01?"start":J<-0.01?"end":"middle",G=Y>0.01?"hanging":Y<-0.01?"auto":"central",W=4;$.append("text").text(K).attr("x",Q*z.axisLabelFactor*J+W*J).attr("y",Q*z.axisLabelFactor*Y+W*Y).attr("text-anchor",H).attr("dominant-baseline",G).attr("class","radarAxisLabel")}},"drawAxes");function m($,q,Q,z,B,E,K){let N=q.length,J=Math.min(K.width,K.height)/2;Q.forEach((Y,H)=>{if(Y.entries.length!==N)return;let G=Y.entries.map((W,I)=>{let L=2*Math.PI*I/N-Math.PI/2,P=l(W,z,B,J),d=P*Math.cos(L),g=P*Math.sin(L);return{x:d,y:g}});if(E==="circle")$.append("path").attr("d",p(G,K.curveTension)).attr("class",`radarCurve-${H}`);else if(E==="polygon")$.append("polygon").attr("points",G.map((W)=>`${W.x},${W.y}`).join(" ")).attr("class",`radarCurve-${H}`)})}U(m,"drawCurves");function l($,q,Q,z){let B=Math.min(Math.max($,q),Q);return z*(B-q)/(Q-q)}U(l,"relativeRadius");function p($,q){let Q=$.length,z=`M${$[0].x},${$[0].y}`;for(let B=0;B<Q;B++){let E=$[(B-1+Q)%Q],K=$[B],N=$[(B+1)%Q],J=$[(B+2)%Q],Y={x:K.x+(N.x-E.x)*q,y:K.y+(N.y-E.y)*q},H={x:N.x-(J.x-K.x)*q,y:N.y-(J.y-K.y)*q};z+=` C${Y.x},${Y.y} ${H.x},${H.y} ${N.x},${N.y}`}return`${z} Z`}U(p,"closedRoundCurve");function u($,q,Q,z){if(!Q)return;let B=(z.width/2+z.marginRight)*3/4,E=-(z.height/2+z.marginTop)*3/4,K=20;q.forEach((N,J)=>{let Y=$.append("g").attr("transform",`translate(${B}, ${E+J*K})`);Y.append("rect").attr("width",12).attr("height",12).attr("class",`radarLegendBox-${J}`),Y.append("text").attr("x",16).attr("y",0).attr("class","radarLegendText").text(N.label)})}U(u,"drawLegend");var Jq={draw:$q},Uq=U(($,q)=>{let Q="";for(let z=0;z<$.THEME_COLOR_LIMIT;z++){let B=$[`cScale${z}`];Q+=`
		.radarCurve-${z} {
			color: ${B};
			fill: ${B};
			fill-opacity: ${q.curveOpacity};
			stroke: ${B};
			stroke-width: ${q.curveStrokeWidth};
		}
		.radarLegendBox-${z} {
			fill: ${B};
			fill-opacity: ${q.curveOpacity};
			stroke: ${B};
		}
		`}return Q},"genIndexStyles"),Eq=U(($)=>{let q=S(),Q=D(),z=R(q,Q.themeVariables),B=R(z.radar,$);return{themeVariables:z,radarOptions:B}},"buildRadarStyleOptions"),Kq=U(({radar:$}={})=>{let{themeVariables:q,radarOptions:Q}=Eq($);return`
	.radarTitle {
		font-size: ${q.fontSize};
		color: ${q.titleColor};
		dominant-baseline: hanging;
		text-anchor: middle;
	}
	.radarAxisLine {
		stroke: ${Q.axisColor};
		stroke-width: ${Q.axisStrokeWidth};
	}
	.radarAxisLabel {
		font-size: ${Q.axisLabelFontSize}px;
		color: ${Q.axisColor};
	}
	.radarGraticule {
		fill: ${Q.graticuleColor};
		fill-opacity: ${Q.graticuleOpacity};
		stroke: ${Q.graticuleColor};
		stroke-width: ${Q.graticuleStrokeWidth};
	}
	.radarLegendText {
		text-anchor: start;
		font-size: ${Q.legendFontSize}px;
		dominant-baseline: hanging;
	}
	${Uq(q,Q)}
	`},"styles"),Lq={parser:Qq,db:X,renderer:Jq,styles:Kq};export{Lq as diagram};
