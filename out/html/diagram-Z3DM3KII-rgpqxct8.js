import{m as R}from"./wiki-cbe7hd3d.js";import{n as B}from"./wiki-57pwjp0q.js";import"./wiki-a24gn8sw.js";import{r as v}from"./wiki-34q0ar26.js";import"./wiki-6dn3rxk8.js";import"./wiki-pjm3zez3.js";import"./wiki-e85pnym7.js";import"./wiki-nnts73pn.js";import"./wiki-qdk3c630.js";import"./wiki-0epw3pnd.js";import"./wiki-5c5j20c3.js";import"./wiki-6gt0fb8r.js";import"./wiki-0n2mhqap.js";import"./wiki-byg9tpvk.js";import"./wiki-mverk9f8.js";import"./wiki-5ep558tj.js";import"./wiki-d80mzbcb.js";import"./wiki-362ky1fy.js";import"./wiki-ahpj2bgc.js";import{uc as N}from"./wiki-4fp686ya.js";import"./wiki-4k52963t.js";import{Lc as T,Vc as j,nd as X,sd as A,td as C,ud as D,vd as f,wd as S,xd as W,yd as Y}from"./wiki-f1txy54q.js";import{Hd as F}from"./wiki-xvj86xk5.js";import{Ge as O}from"./wiki-fs4np4zx.js";import"./wiki-qy8z9qt9.js";var m=T.packet,H=class{constructor(){this.packet=[],this.setAccTitle=C,this.getAccTitle=D,this.setDiagramTitle=W,this.getDiagramTitle=Y,this.getAccDescription=S,this.setAccDescription=f}static{O(this,"PacketDB")}getConfig(){let q=N({...m,...j().packet});if(q.showBits)q.paddingY+=10;return q}getPacket(){return this.packet}pushWord(q){if(q.length>0)this.packet.push(q)}clear(){A(),this.packet=[]}},h=1e4,p=O((q,Q)=>{R(q,Q);let K=-1,y=[],I=1,{bitsPerRow:J}=Q.getConfig();for(let{start:$,end:G,bits:U,label:M}of q.blocks){if($!==void 0&&G!==void 0&&G<$)throw Error(`Packet block ${$} - ${G} is invalid. End must be greater than start.`);if($??=K+1,$!==K+1)throw Error(`Packet block ${$} - ${G??$} is not contiguous. It should start from ${K+1}.`);if(U===0)throw Error(`Packet block ${$} is invalid. Cannot have a zero bit field.`);G??=$+(U??1)-1,U??=G-$+1,K=G,F.debug(`Packet block ${$} - ${K} with label ${M}`);while(y.length<=J+1&&Q.getPacket().length<h){let[V,z]=k({start:$,end:G,bits:U,label:M},I,J);if(y.push(V),V.end+1===I*J)Q.pushWord(y),y=[],I++;if(!z)break;({start:$,end:G,bits:U,label:M}=z)}}Q.pushWord(y)},"populate"),k=O((q,Q,K)=>{if(q.start===void 0)throw Error("start should have been set during first phase");if(q.end===void 0)throw Error("end should have been set during first phase");if(q.start>q.end)throw Error(`Block start ${q.start} is greater than block end ${q.end}.`);if(q.end+1<=Q*K)return[q,void 0];let y=Q*K-1,I=Q*K;return[{start:q.start,end:y,label:q.label,bits:y-q.start},{start:I,end:q.end,label:q.label,bits:q.end-I}]},"getNextFittingBlock"),_={parser:{yy:void 0},parse:O(async(q)=>{let Q=await B("packet",q),K=_.parser?.yy;if(!(K instanceof H))throw Error("parser.parser?.yy was not a PacketDB. This is due to a bug within Mermaid, please report this issue at https://github.com/mermaid-js/mermaid/issues.");F.debug(Q),p(Q,K)},"parse")},w=O((q,Q,K,y)=>{let I=y.db,J=I.getConfig(),{rowHeight:$,paddingY:G,bitWidth:U,bitsPerRow:M}=J,V=I.getPacket(),z=I.getDiagramTitle(),x=$+G,L=x*(V.length+1)-(z?0:$),Z=U*M+2,E=v(Q);E.attr("viewBox",`0 0 ${Z} ${L}`),X(E,L,Z,J.useMaxWidth);for(let[P,u]of V.entries())g(E,u,P,J);E.append("text").text(z).attr("x",Z/2).attr("y",L-x/2).attr("dominant-baseline","middle").attr("text-anchor","middle").attr("class","packetTitle")},"draw"),g=O((q,Q,K,{rowHeight:y,paddingX:I,paddingY:J,bitWidth:$,bitsPerRow:G,showBits:U})=>{let M=q.append("g"),V=K*(y+J)+J;for(let z of Q){let x=z.start%G*$+1,L=(z.end-z.start+1)*$-I;if(M.append("rect").attr("x",x).attr("y",V).attr("width",L).attr("height",y).attr("class","packetBlock"),M.append("text").attr("x",x+L/2).attr("y",V+y/2).attr("class","packetLabel").attr("dominant-baseline","middle").attr("text-anchor","middle").text(z.label),!U)continue;let Z=z.end===z.start,E=V-2;if(M.append("text").attr("x",x+(Z?L/2:0)).attr("y",E).attr("class","packetByte start").attr("dominant-baseline","auto").attr("text-anchor",Z?"middle":"start").text(z.start),!Z)M.append("text").attr("x",x+L).attr("y",E).attr("class","packetByte end").attr("dominant-baseline","auto").attr("text-anchor","end").text(z.end)}},"drawWord"),n={draw:w},a={byteFontSize:"10px",startByteColor:"black",endByteColor:"black",labelColor:"black",labelFontSize:"12px",titleColor:"black",titleFontSize:"14px",blockStrokeColor:"black",blockStrokeWidth:"1",blockFillColor:"#efefef"},c=O(({packet:q}={})=>{let Q=N(a,q);return`
	.packetByte {
		font-size: ${Q.byteFontSize};
	}
	.packetByte.start {
		fill: ${Q.startByteColor};
	}
	.packetByte.end {
		fill: ${Q.endByteColor};
	}
	.packetLabel {
		fill: ${Q.labelColor};
		font-size: ${Q.labelFontSize};
	}
	.packetTitle {
		fill: ${Q.titleColor};
		font-size: ${Q.titleFontSize};
	}
	.packetBlock {
		stroke: ${Q.blockStrokeColor};
		stroke-width: ${Q.blockStrokeWidth};
		fill: ${Q.blockFillColor};
	}
	`},"styles"),o={parser:_,get db(){return new H},renderer:n,styles:c};export{o as diagram};
