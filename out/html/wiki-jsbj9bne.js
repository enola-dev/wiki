import{r as h}from"./wiki-34q0ar26.js";import{Jc as _,Vc as O,gd as g,nd as R,sd as p,zd as c}from"./wiki-f1txy54q.js";import{Hd as N}from"./wiki-xvj86xk5.js";import{Ge as E}from"./wiki-fs4np4zx.js";var z="",Y="",C="",D=[],A=new Map,y=E((q)=>{return g(q,c())},"sanitizeText"),F=E((q)=>{switch(q.type){case"terminal":return{...q,value:y(q.value)};case"nonterminal":return{...q,name:y(q.name)};case"sequence":return{...q,elements:q.elements.map(F)};case"choice":return{...q,alternatives:q.alternatives.map(F)};case"optional":return{...q,element:F(q.element)};case"repetition":return{...q,element:F(q.element),separator:q.separator?F(q.separator):void 0};case"special":return{...q,text:y(q.text)}}},"sanitizeAstNode"),n=E(()=>{z="",Y="",C="",D.length=0,A.clear(),p(),N.debug("[Railroad] Database cleared")},"clear"),m=E((q)=>{z=y(q),N.debug("[Railroad] Title set:",q)},"setTitle"),u=E(()=>{return z},"getTitle"),l=E((q)=>{let J={...q,name:y(q.name),definition:F(q.definition),comment:q.comment?y(q.comment):void 0};if(N.debug("[Railroad] Adding rule:",J.name),A.has(J.name))N.warn(`[Railroad] Rule '${J.name}' is already defined. Overwriting.`);D.push(J),A.set(J.name,J)},"addRule"),r=E(()=>{return D},"getRules"),i=E((q)=>{return A.get(q)},"getRule"),t=E((q)=>{Y=y(q).replace(/^\s+/g,""),N.debug("[Railroad] Accessibility title set:",q)},"setAccTitle"),a=E(()=>{return Y},"getAccTitle"),e=E((q)=>{C=y(q).replace(/\n\s+/g,`
`),N.debug("[Railroad] Accessibility description set:",q)},"setAccDescription"),qq=E(()=>{return C},"getAccDescription"),Qq=m,$q=u,Jq={clear:n,setTitle:m,getTitle:u,addRule:l,getRules:r,getRule:i,setAccTitle:t,getAccTitle:a,setAccDescription:e,getAccDescription:qq,setDiagramTitle:Qq,getDiagramTitle:$q},k={compactMode:!1,padding:10,verticalSeparation:8,horizontalSeparation:10,arcRadius:10,fontSize:14,fontFamily:"monospace",terminalFill:"#FFFFC0",terminalStroke:"#000000",terminalTextColor:"#000000",nonTerminalFill:"#FFFFFF",nonTerminalStroke:"#000000",nonTerminalTextColor:"#000000",lineColor:"#000000",strokeWidth:2,markerFill:"#000000",commentFill:"#E8E8E8",commentStroke:"#888888",commentTextColor:"#666666",specialFill:"#F0E0FF",specialStroke:"#8800CC",ruleNameColor:"#000066",showMarkers:!0,markerRadius:5},Kq=/^#(?:[\da-f]{3,4}|[\da-f]{6}|[\da-f]{8})$|^(?:rgb|rgba|hsl|hsla|hwb|lab|lch|oklab|oklch)\([\d\s%+,./-]+\)$|^[a-z]+$/i,jq=/^[\w "',.-]+$/,Zq=new Set(["compactMode","padding","verticalSeparation","horizontalSeparation","arcRadius","fontSize","fontFamily","terminalFill","terminalStroke","terminalTextColor","nonTerminalFill","nonTerminalStroke","nonTerminalTextColor","lineColor","strokeWidth","markerFill","commentFill","commentStroke","commentTextColor","specialFill","specialStroke","ruleNameColor","showMarkers","markerRadius"]),d=E((q)=>{if(!q)return!1;return Object.keys(q).every((J)=>J==="railroad"||Zq.has(J))},"isRailroadStyleOptions"),Mq=E((q)=>{if(!q)return{};if("railroad"in q&&q.railroad)return q.railroad;return d(q)?q:{}},"extractRailroadOverrides"),Hq=E((q)=>{if(!q||d(q))return{};let{railroad:J,svgId:j,theme:$,look:Q,...K}=q;return K},"extractThemeOverrides"),X=E((q,J)=>{if(typeof q!=="string")return J;let j=q.trim();return Kq.test(j)?j:J},"sanitizeColorValue"),s=E((q,J)=>{if(typeof q!=="string")return J;let j=q.trim();return jq.test(j)?j:J},"sanitizeFontFamilyValue"),v=E((q,J)=>{let j=typeof q==="number"?q:typeof q==="string"?Number.parseFloat(q):Number.NaN;return Number.isFinite(j)&&j>=0?j:J},"sanitizeNumberValue"),Gq=E((q)=>{let J=typeof q==="number"?q:typeof q==="string"?Number.parseFloat(q):Number.NaN;return Number.isFinite(J)&&J>0?J:void 0},"parseThemeFontSize"),Bq=E((q)=>{let J=s(q.fontFamily,k.fontFamily),j=Gq(q.fontSize)??k.fontSize;return{...k,fontFamily:J,fontSize:j,terminalFill:X(q.secondBkg??q.secondaryColor,k.terminalFill),terminalStroke:X(q.secondaryBorderColor??q.lineColor,k.terminalStroke),terminalTextColor:X(q.secondaryTextColor??q.textColor,k.terminalTextColor),nonTerminalFill:X(q.mainBkg??q.background,k.nonTerminalFill),nonTerminalStroke:X(q.primaryBorderColor??q.lineColor,k.nonTerminalStroke),nonTerminalTextColor:X(q.primaryTextColor??q.textColor,k.nonTerminalTextColor),lineColor:X(q.lineColor,k.lineColor),markerFill:X(q.lineColor,k.markerFill),commentFill:X(q.labelBackground??q.tertiaryColor,k.commentFill),commentStroke:X(q.tertiaryBorderColor??q.lineColor,k.commentStroke),commentTextColor:X(q.tertiaryTextColor??q.textColor,k.commentTextColor),specialFill:X(q.tertiaryColor??q.secondaryColor,k.specialFill),specialStroke:X(q.tertiaryBorderColor??q.secondaryBorderColor,k.specialStroke),ruleNameColor:X(q.titleColor??q.textColor,k.ruleNameColor)}},"buildThemeDefaults"),x=E((q)=>{let J=O(),j={..._(),...J.themeVariables??{},...Hq(q)},$=Bq(j),Q={...J.railroad??{},...Mq(q)};return{compactMode:Q.compactMode??$.compactMode,padding:v(Q.padding,$.padding),verticalSeparation:v(Q.verticalSeparation,$.verticalSeparation),horizontalSeparation:v(Q.horizontalSeparation,$.horizontalSeparation),arcRadius:v(Q.arcRadius,$.arcRadius),fontSize:v(Q.fontSize,$.fontSize),fontFamily:s(Q.fontFamily,$.fontFamily),terminalFill:X(Q.terminalFill,$.terminalFill),terminalStroke:X(Q.terminalStroke,$.terminalStroke),terminalTextColor:X(Q.terminalTextColor,$.terminalTextColor),nonTerminalFill:X(Q.nonTerminalFill,$.nonTerminalFill),nonTerminalStroke:X(Q.nonTerminalStroke,$.nonTerminalStroke),nonTerminalTextColor:X(Q.nonTerminalTextColor,$.nonTerminalTextColor),lineColor:X(Q.lineColor,$.lineColor),strokeWidth:v(Q.strokeWidth,$.strokeWidth),markerFill:X(Q.markerFill,$.markerFill),commentFill:X(Q.commentFill,$.commentFill),commentStroke:X(Q.commentStroke,$.commentStroke),commentTextColor:X(Q.commentTextColor,$.commentTextColor),specialFill:X(Q.specialFill,$.specialFill),specialStroke:X(Q.specialStroke,$.specialStroke),ruleNameColor:X(Q.ruleNameColor,$.ruleNameColor),showMarkers:Q.showMarkers??$.showMarkers,markerRadius:v(Q.markerRadius,$.markerRadius)}},"buildRailroadStyleOptions"),Sq=E((q)=>{let{fontFamily:J,fontSize:j,terminalFill:$,terminalStroke:Q,terminalTextColor:K,nonTerminalFill:w,nonTerminalStroke:H,nonTerminalTextColor:Z,lineColor:U,strokeWidth:B,markerFill:G,commentFill:I,commentStroke:M,commentTextColor:P,specialFill:T,specialStroke:L,ruleNameColor:W}=x(q);return`
  .railroad-diagram {
    font-family: ${J};
    font-size: ${j}px;
  }

  .railroad-terminal rect {
    fill: ${$};
    stroke: ${Q};
    stroke-width: ${B}px;
  }

  .railroad-terminal text {
    fill: ${K};
    font-family: ${J};
    font-size: ${j}px;
    text-anchor: middle;
    dominant-baseline: middle;
  }

  .railroad-nonterminal rect {
    fill: ${w};
    stroke: ${H};
    stroke-width: ${B}px;
  }

  .railroad-nonterminal text {
    fill: ${Z};
    font-family: ${J};
    font-size: ${j}px;
    text-anchor: middle;
    dominant-baseline: middle;
  }

  .railroad-line {
    stroke: ${U};
    stroke-width: ${B}px;
    fill: none;
  }

  .railroad-start circle,
  .railroad-end circle {
    fill: ${G};
  }

  .railroad-comment ellipse {
    fill: ${I};
    stroke: ${M};
    stroke-width: ${B}px;
  }

  .railroad-comment text {
    fill: ${P};
    font-style: italic;
    font-family: ${J};
    font-size: ${j}px;
    text-anchor: middle;
    dominant-baseline: middle;
  }

  .railroad-special rect {
    fill: ${T};
    stroke: ${L};
    stroke-width: ${B}px;
    stroke-dasharray: 5,3;
  }

  .railroad-special text {
    fill: ${Z};
    font-family: ${J};
    font-size: ${j}px;
    text-anchor: middle;
    dominant-baseline: middle;
  }

  .railroad-rule-name {
    font-weight: bold;
    fill: ${W};
    font-family: ${J};
    font-size: ${j}px;
  }

  .railroad-group {
    /* Grouping container, no specific styles */
  }
`},"getStyles"),S=class{constructor(){this.d=""}static{E(this,"PathBuilder")}moveTo(q,J){return this.d+=`M ${q} ${J} `,this}lineTo(q,J){return this.d+=`L ${q} ${J} `,this}horizontalTo(q){return this.d+=`H ${q} `,this}verticalTo(q){return this.d+=`V ${q} `,this}arcTo(q,J,j,$,Q,K,w){return this.d+=`A ${q} ${J} ${j} ${$?1:0} ${Q?1:0} ${K} ${w} `,this}build(){return this.d.trim()}},Xq=class{constructor(q,J=x()){this.textCache=new Map,this.svg=q,this.config=J}static{E(this,"RailroadRenderer")}measureText(q){if(this.textCache.has(q))return this.textCache.get(q);let J=this.svg.append("text").attr("font-family",this.config.fontFamily).attr("font-size",this.config.fontSize).text(q),j=J.node().getBBox(),$={width:j.width,height:j.height};return J.remove(),this.textCache.set(q,$),$}renderTerminal(q,J){let j=this.measureText(J),$=j.width+this.config.padding*2,Q=j.height+this.config.padding*2,K=q.append("g").attr("class","railroad-terminal");return K.append("rect").attr("x",0).attr("y",0).attr("width",$).attr("height",Q).attr("rx",10).attr("ry",10),K.append("text").attr("x",$/2).attr("y",Q/2).text(J),{element:K.node(),dimensions:{width:$,height:Q,up:Q/2,down:Q/2}}}renderNonTerminal(q,J){let j=this.measureText(J),$=j.width+this.config.padding*2,Q=j.height+this.config.padding*2,K=q.append("g").attr("class","railroad-nonterminal");return K.append("rect").attr("x",0).attr("y",0).attr("width",$).attr("height",Q),K.append("text").attr("x",$/2).attr("y",Q/2).text(J),{element:K.node(),dimensions:{width:$,height:Q,up:Q/2,down:Q/2}}}renderSequence(q,J){let j=J.map((Z)=>this.renderExpression(q,Z)),$=0,Q=0,K=0;for(let Z of j)$+=Z.dimensions.width,Q=Math.max(Q,Z.dimensions.up),K=Math.max(K,Z.dimensions.down);$+=(j.length-1)*this.config.horizontalSeparation;let w=q.append("g").attr("class","railroad-sequence"),H=0;for(let Z=0;Z<j.length;Z++){let U=j[Z],B=Q-U.dimensions.up;if(w.node().appendChild(U.element).setAttribute("transform",`translate(${H}, ${B})`),Z<j.length-1){let I=H+U.dimensions.width,M=I+this.config.horizontalSeparation,P=Q;w.append("path").attr("class","railroad-line").attr("d",new S().moveTo(I,P).lineTo(M,P).build())}H+=U.dimensions.width+this.config.horizontalSeparation}return{element:w.node(),dimensions:{width:$,height:Q+K,up:Q,down:K}}}renderChoice(q,J){let j=J.map((G)=>this.renderExpression(q,G)),$=0,Q=0;for(let G of j)$=Math.max($,G.dimensions.width),Q+=G.dimensions.height;Q+=(j.length-1)*this.config.verticalSeparation;let K=this.config.arcRadius,w=K*4,H=$+w,Z=q.append("g").attr("class","railroad-choice"),U=0,B=Q/2;for(let G of j){let I=U,M=I+G.dimensions.up,P=K*2+($-G.dimensions.width)/2;Z.node().appendChild(G.element).setAttribute("transform",`translate(${P}, ${I})`);let L=new S,W=M>B;if(M===B)L.moveTo(0,B).lineTo(P,M);else L.moveTo(0,B).arcTo(K,K,0,!1,W,K,B+(W?K:-K)).lineTo(K,M-(W?K:-K)).arcTo(K,K,0,!1,!W,K*2,M).lineTo(P,M);Z.append("path").attr("class","railroad-line").attr("d",L.build());let f=new S,b=P+G.dimensions.width,o=H-K*2;if(M===B)f.moveTo(b,M).lineTo(H,B);else f.moveTo(b,M).lineTo(o,M).arcTo(K,K,0,!1,!W,H-K,M+(W?-K:K)).lineTo(H-K,B+(W?K:-K)).arcTo(K,K,0,!1,W,H,B);Z.append("path").attr("class","railroad-line").attr("d",f.build()),U+=G.dimensions.height+this.config.verticalSeparation}return{element:Z.node(),dimensions:{width:H,height:Q,up:B,down:Q-B}}}renderOptional(q,J){let j=this.renderExpression(q,J),$=this.config.arcRadius,Q=$*2,K=j.dimensions.width+$*4,w=j.dimensions.height+Q,H=q.append("g").attr("class","railroad-optional"),Z=$*2,U=Q;H.node().appendChild(j.element).setAttribute("transform",`translate(${Z}, ${U})`);let G=U+j.dimensions.up,I=new S().moveTo(0,G).lineTo($*2,G);H.append("path").attr("class","railroad-line").attr("d",I.build());let M=new S().moveTo(Z+j.dimensions.width,G).lineTo(K,G);H.append("path").attr("class","railroad-line").attr("d",M.build());let P=new S().moveTo(0,G).arcTo($,$,0,!1,!1,$,G-$).lineTo($,$).arcTo($,$,0,!1,!0,$*2,0).lineTo(K-$*2,0).arcTo($,$,0,!1,!0,K-$,$).lineTo(K-$,G-$).arcTo($,$,0,!1,!1,K,G);return H.append("path").attr("class","railroad-line").attr("d",P.build()),{element:H.node(),dimensions:{width:K,height:w,up:G,down:w-G}}}renderRepetition(q,J,j){let $=this.renderExpression(q,J),Q=this.config.arcRadius,K=Q*2,w=$.dimensions.width+Q*4,H=j===0,Z=$.dimensions.height+K+(H?K:0),U=q.append("g").attr("class","railroad-repetition"),B=Q*2,G=H?K:0;U.node().appendChild($.element).setAttribute("transform",`translate(${B}, ${G})`);let M=G+$.dimensions.up;U.append("path").attr("class","railroad-line").attr("d",new S().moveTo(0,M).lineTo(Q*2,M).build()),U.append("path").attr("class","railroad-line").attr("d",new S().moveTo(B+$.dimensions.width,M).lineTo(w,M).build());let P=G+$.dimensions.height+Q,T=new S().moveTo(B+$.dimensions.width,M).arcTo(Q,Q,0,!1,!0,B+$.dimensions.width+Q,M+Q).lineTo(B+$.dimensions.width+Q,P).arcTo(Q,Q,0,!1,!0,B+$.dimensions.width,P+Q).lineTo(Q*2,P+Q).arcTo(Q,Q,0,!1,!0,Q,P).lineTo(Q,M+Q).arcTo(Q,Q,0,!1,!0,Q*2,M);if(U.append("path").attr("class","railroad-line").attr("d",T.build()),H){let L=new S().moveTo(0,M).arcTo(Q,Q,0,!1,!1,Q,M-Q).lineTo(Q,Q).arcTo(Q,Q,0,!1,!0,Q*2,0).lineTo(w-Q*2,0).arcTo(Q,Q,0,!1,!0,w-Q,Q).lineTo(w-Q,M-Q).arcTo(Q,Q,0,!1,!1,w,M);U.append("path").attr("class","railroad-line").attr("d",L.build())}return{element:U.node(),dimensions:{width:w,height:Z,up:M,down:Z-M}}}renderSpecial(q,J){let j=this.measureText("? "+J+" ?"),$=j.width+this.config.padding*2,Q=j.height+this.config.padding*2,K=q.append("g").attr("class","railroad-special");return K.append("rect").attr("x",0).attr("y",0).attr("width",$).attr("height",Q),K.append("text").attr("x",$/2).attr("y",Q/2).text("? "+J+" ?"),{element:K.node(),dimensions:{width:$,height:Q,up:Q/2,down:Q/2}}}renderExpression(q,J){switch(J.type){case"terminal":return this.renderTerminal(q,J.value);case"nonterminal":return this.renderNonTerminal(q,J.name);case"sequence":return this.renderSequence(q,J.elements);case"choice":return this.renderChoice(q,J.alternatives);case"optional":return this.renderOptional(q,J.element);case"repetition":return this.renderRepetition(q,J.element,J.min);case"special":return this.renderSpecial(q,J.text);default:throw Error(`Unknown node type: ${J.type}`)}}renderRule(q,J){let j=this.svg.append("g").attr("class","railroad-rule").attr("transform",`translate(0, ${J})`),$=q.name+" =",Q=this.measureText($).width+20,K=Q+20,w=j.append("g"),H=this.renderExpression(w,q.definition),Z=Math.max(20,H.dimensions.up),U=Z-H.dimensions.up;return w.attr("transform",`translate(${K}, ${U})`),j.append("g").attr("class","railroad-rule-name-group").append("text").attr("class","railroad-rule-name").attr("x",0).attr("y",Z).text($),j.append("g").attr("class","railroad-start").append("circle").attr("cx",Q).attr("cy",Z).attr("r",this.config.markerRadius),j.append("g").attr("class","railroad-end").append("circle").attr("cx",K+H.dimensions.width+10).attr("cy",Z).attr("r",this.config.markerRadius),j.append("path").attr("class","railroad-line").attr("d",new S().moveTo(Q+this.config.markerRadius,Z).lineTo(K,Z).build()),j.append("path").attr("class","railroad-line").attr("d",new S().moveTo(K+H.dimensions.width,Z).lineTo(K+H.dimensions.width+10-this.config.markerRadius,Z).build()),{height:Math.max(40,U+H.dimensions.height+this.config.padding*2),width:K+H.dimensions.width+10+this.config.markerRadius}}renderDiagram(q){let J=this.config.padding,j=0;for(let $ of q){let Q=this.renderRule($,J);J+=Q.height+this.config.verticalSeparation,j=Math.max(j,Q.width)}return{width:j+this.config.padding*2,height:J+this.config.padding}}},V=E((q,J,j)=>{R(q,J.height,J.width,j),q.attr("viewBox",`0 0 ${J.width} ${J.height}`)},"configureRailroadSvgSize"),Eq=E((q,J,j)=>{N.debug(`[Railroad] Rendering diagram
`+q);try{let $=h(J);$.attr("class","railroad-diagram");let K=O().railroad?.useMaxWidth??!0,w=Jq.getRules();if(N.debug(`[Railroad] Rendering ${w.length} rules`),w.length===0){N.warn("[Railroad] No rules to render"),V($,{height:100,width:200},K);return}let Z=new Xq($,x()).renderDiagram(w);V($,Z,K),N.debug("[Railroad] Render complete")}catch($){throw N.error("[Railroad] Render error:",$),$}},"draw"),Nq={draw:Eq};
export{Jq as a,Sq as b,Nq as c};
