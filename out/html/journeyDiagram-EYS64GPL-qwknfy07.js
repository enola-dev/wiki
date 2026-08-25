import{jb as Lq}from"./wiki-48eg2f0w.js";import{Fb as Fq,Gb as Cq,Hb as Pq,Kb as e}from"./wiki-zvx4g7b9.js";import"./wiki-4k52963t.js";import{nd as zq,sd as Yq,td as Iq,ud as Mq,vd as Nq,wd as Rq,xd as Wq,yd as Eq,zd as u}from"./wiki-f1txy54q.js";import{Nd as k,je as n}from"./wiki-xvj86xk5.js";import{Ge as J}from"./wiki-fs4np4zx.js";import"./wiki-qy8z9qt9.js";var o=function(){var q=J(function(z,K,X,B){for(X=X||{},B=z.length;B--;X[z[B]]=K);return X},"o"),Q=[6,8,10,11,12,14,16,17,18],U=[1,9],N=[1,10],G=[1,11],Y=[1,12],R=[1,13],Z=[1,14],W={trace:J(function(){},"trace"),yy:{},symbols_:{error:2,start:3,journey:4,document:5,EOF:6,line:7,SPACE:8,statement:9,NEWLINE:10,title:11,acc_title:12,acc_title_value:13,acc_descr:14,acc_descr_value:15,acc_descr_multiline_value:16,section:17,taskName:18,taskData:19,$accept:0,$end:1},terminals_:{2:"error",4:"journey",6:"EOF",8:"SPACE",10:"NEWLINE",11:"title",12:"acc_title",13:"acc_title_value",14:"acc_descr",15:"acc_descr_value",16:"acc_descr_multiline_value",17:"section",18:"taskName",19:"taskData"},productions_:[0,[3,3],[5,0],[5,2],[7,2],[7,1],[7,1],[7,1],[9,1],[9,2],[9,2],[9,1],[9,1],[9,2]],performAction:J(function(K,X,B,I,M,H,L){var C=H.length-1;switch(M){case 1:return H[C-1];case 2:this.$=[];break;case 3:H[C-1].push(H[C]),this.$=H[C-1];break;case 4:case 5:this.$=H[C];break;case 6:case 7:this.$=[];break;case 8:I.setDiagramTitle(H[C].substr(6)),this.$=H[C].substr(6);break;case 9:this.$=H[C].trim(),I.setAccTitle(this.$);break;case 10:case 11:this.$=H[C].trim(),I.setAccDescription(this.$);break;case 12:I.addSection(H[C].substr(8)),this.$=H[C].substr(8);break;case 13:I.addTask(H[C-1],H[C]),this.$="task";break}},"anonymous"),table:[{3:1,4:[1,2]},{1:[3]},q(Q,[2,2],{5:3}),{6:[1,4],7:5,8:[1,6],9:7,10:[1,8],11:U,12:N,14:G,16:Y,17:R,18:Z},q(Q,[2,7],{1:[2,1]}),q(Q,[2,3]),{9:15,11:U,12:N,14:G,16:Y,17:R,18:Z},q(Q,[2,5]),q(Q,[2,6]),q(Q,[2,8]),{13:[1,16]},{15:[1,17]},q(Q,[2,11]),q(Q,[2,12]),{19:[1,18]},q(Q,[2,4]),q(Q,[2,9]),q(Q,[2,10]),q(Q,[2,13])],defaultActions:{},parseError:J(function(K,X){if(X.recoverable)this.trace(K);else{var B=Error(K);throw B.hash=X,B}},"parseError"),parse:J(function(K){var X=this,B=[0],I=[],M=[null],H=[],L=this.table,C="",w=0,Qq=0,Gq=0,jq=2,Kq=1,Sq=H.slice.call(arguments,1),P=Object.create(this.lexer),$={yy:{}};for(var m in this.yy)if(Object.prototype.hasOwnProperty.call(this.yy,m))$.yy[m]=this.yy[m];if(P.setInput(K,$.yy),$.yy.lexer=P,$.yy.parser=this,typeof P.yylloc>"u")P.yylloc={};var l=P.yylloc;H.push(l);var Tq=P.options&&P.options.ranges;if(typeof $.yy.parseError==="function")this.parseError=$.yy.parseError;else this.parseError=Object.getPrototypeOf(this).parseError;function wq(O){B.length=B.length-2*O,M.length=M.length-O,H.length=H.length-O}J(wq,"popStack");function Xq(){var O=I.pop()||P.lex()||Kq;if(typeof O!=="number"){if(O instanceof Array)I=O,O=I.pop();O=X.symbols_[O]||O}return O}J(Xq,"lex");var V,i,b,A,oq,r,g={},_,S,Jq,p;while(!0){if(b=B[B.length-1],this.defaultActions[b])A=this.defaultActions[b];else{if(V===null||typeof V>"u")V=Xq();A=L[b]&&L[b][V]}if(typeof A>"u"||!A.length||!A[0]){var c="";p=[];for(_ in L[b])if(this.terminals_[_]&&_>jq)p.push("'"+this.terminals_[_]+"'");if(P.showPosition)c="Parse error on line "+(w+1)+`:
`+P.showPosition()+`
Expecting `+p.join(", ")+", got '"+(this.terminals_[V]||V)+"'";else c="Parse error on line "+(w+1)+": Unexpected "+(V==Kq?"end of input":"'"+(this.terminals_[V]||V)+"'");this.parseError(c,{text:P.match,token:this.terminals_[V]||V,line:P.yylineno,loc:l,expected:p})}if(A[0]instanceof Array&&A.length>1)throw Error("Parse Error: multiple actions possible at state: "+b+", token: "+V);switch(A[0]){case 1:if(B.push(V),M.push(P.yytext),H.push(P.yylloc),B.push(A[1]),V=null,!i){if(Qq=P.yyleng,C=P.yytext,w=P.yylineno,l=P.yylloc,Gq>0)Gq--}else V=i,i=null;break;case 2:if(S=this.productions_[A[1]][1],g.$=M[M.length-S],g._$={first_line:H[H.length-(S||1)].first_line,last_line:H[H.length-1].last_line,first_column:H[H.length-(S||1)].first_column,last_column:H[H.length-1].last_column},Tq)g._$.range=[H[H.length-(S||1)].range[0],H[H.length-1].range[1]];if(r=this.performAction.apply(g,[C,Qq,w,$.yy,A[1],M,H].concat(Sq)),typeof r<"u")return r;if(S)B=B.slice(0,-1*S*2),M=M.slice(0,-1*S),H=H.slice(0,-1*S);B.push(this.productions_[A[1]][0]),M.push(g.$),H.push(g._$),Jq=L[B[B.length-2]][B[B.length-1]],B.push(Jq);break;case 3:return!0}}return!0},"parse")},E=function(){var z={EOF:1,parseError:J(function(X,B){if(this.yy.parser)this.yy.parser.parseError(X,B);else throw Error(X)},"parseError"),setInput:J(function(K,X){if(this.yy=X||this.yy||{},this._input=K,this._more=this._backtrack=this.done=!1,this.yylineno=this.yyleng=0,this.yytext=this.matched=this.match="",this.conditionStack=["INITIAL"],this.yylloc={first_line:1,first_column:0,last_line:1,last_column:0},this.options.ranges)this.yylloc.range=[0,0];return this.offset=0,this},"setInput"),input:J(function(){var K=this._input[0];this.yytext+=K,this.yyleng++,this.offset++,this.match+=K,this.matched+=K;var X=K.match(/(?:\r\n?|\n).*/g);if(X)this.yylineno++,this.yylloc.last_line++;else this.yylloc.last_column++;if(this.options.ranges)this.yylloc.range[1]++;return this._input=this._input.slice(1),K},"input"),unput:J(function(K){var X=K.length,B=K.split(/(?:\r\n?|\n)/g);this._input=K+this._input,this.yytext=this.yytext.substr(0,this.yytext.length-X),this.offset-=X;var I=this.match.split(/(?:\r\n?|\n)/g);if(this.match=this.match.substr(0,this.match.length-1),this.matched=this.matched.substr(0,this.matched.length-1),B.length-1)this.yylineno-=B.length-1;var M=this.yylloc.range;if(this.yylloc={first_line:this.yylloc.first_line,last_line:this.yylineno+1,first_column:this.yylloc.first_column,last_column:B?(B.length===I.length?this.yylloc.first_column:0)+I[I.length-B.length].length-B[0].length:this.yylloc.first_column-X},this.options.ranges)this.yylloc.range=[M[0],M[0]+this.yyleng-X];return this.yyleng=this.yytext.length,this},"unput"),more:J(function(){return this._more=!0,this},"more"),reject:J(function(){if(this.options.backtrack_lexer)this._backtrack=!0;else return this.parseError("Lexical error on line "+(this.yylineno+1)+`. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).
`+this.showPosition(),{text:"",token:null,line:this.yylineno});return this},"reject"),less:J(function(K){this.unput(this.match.slice(K))},"less"),pastInput:J(function(){var K=this.matched.substr(0,this.matched.length-this.match.length);return(K.length>20?"...":"")+K.substr(-20).replace(/\n/g,"")},"pastInput"),upcomingInput:J(function(){var K=this.match;if(K.length<20)K+=this._input.substr(0,20-K.length);return(K.substr(0,20)+(K.length>20?"...":"")).replace(/\n/g,"")},"upcomingInput"),showPosition:J(function(){var K=this.pastInput(),X=Array(K.length+1).join("-");return K+this.upcomingInput()+`
`+X+"^"},"showPosition"),test_match:J(function(K,X){var B,I,M;if(this.options.backtrack_lexer){if(M={yylineno:this.yylineno,yylloc:{first_line:this.yylloc.first_line,last_line:this.last_line,first_column:this.yylloc.first_column,last_column:this.yylloc.last_column},yytext:this.yytext,match:this.match,matches:this.matches,matched:this.matched,yyleng:this.yyleng,offset:this.offset,_more:this._more,_input:this._input,yy:this.yy,conditionStack:this.conditionStack.slice(0),done:this.done},this.options.ranges)M.yylloc.range=this.yylloc.range.slice(0)}if(I=K[0].match(/(?:\r\n?|\n).*/g),I)this.yylineno+=I.length;if(this.yylloc={first_line:this.yylloc.last_line,last_line:this.yylineno+1,first_column:this.yylloc.last_column,last_column:I?I[I.length-1].length-I[I.length-1].match(/\r?\n?/)[0].length:this.yylloc.last_column+K[0].length},this.yytext+=K[0],this.match+=K[0],this.matches=K,this.yyleng=this.yytext.length,this.options.ranges)this.yylloc.range=[this.offset,this.offset+=this.yyleng];if(this._more=!1,this._backtrack=!1,this._input=this._input.slice(K[0].length),this.matched+=K[0],B=this.performAction.call(this,this.yy,this,X,this.conditionStack[this.conditionStack.length-1]),this.done&&this._input)this.done=!1;if(B)return B;else if(this._backtrack){for(var H in M)this[H]=M[H];return!1}return!1},"test_match"),next:J(function(){if(this.done)return this.EOF;if(!this._input)this.done=!0;var K,X,B,I;if(!this._more)this.yytext="",this.match="";var M=this._currentRules();for(var H=0;H<M.length;H++)if(B=this._input.match(this.rules[M[H]]),B&&(!X||B[0].length>X[0].length)){if(X=B,I=H,this.options.backtrack_lexer)if(K=this.test_match(B,M[H]),K!==!1)return K;else if(this._backtrack){X=!1;continue}else return!1;else if(!this.options.flex)break}if(X){if(K=this.test_match(X,M[I]),K!==!1)return K;return!1}if(this._input==="")return this.EOF;else return this.parseError("Lexical error on line "+(this.yylineno+1)+`. Unrecognized text.
`+this.showPosition(),{text:"",token:null,line:this.yylineno})},"next"),lex:J(function(){var X=this.next();if(X)return X;else return this.lex()},"lex"),begin:J(function(X){this.conditionStack.push(X)},"begin"),popState:J(function(){var X=this.conditionStack.length-1;if(X>0)return this.conditionStack.pop();else return this.conditionStack[0]},"popState"),_currentRules:J(function(){if(this.conditionStack.length&&this.conditionStack[this.conditionStack.length-1])return this.conditions[this.conditionStack[this.conditionStack.length-1]].rules;else return this.conditions.INITIAL.rules},"_currentRules"),topState:J(function(X){if(X=this.conditionStack.length-1-Math.abs(X||0),X>=0)return this.conditionStack[X];else return"INITIAL"},"topState"),pushState:J(function(X){this.begin(X)},"pushState"),stateStackSize:J(function(){return this.conditionStack.length},"stateStackSize"),options:{"case-insensitive":!0},performAction:J(function(X,B,I,M){var H=M;switch(I){case 0:break;case 1:break;case 2:return 10;case 3:break;case 4:break;case 5:return 4;case 6:return 11;case 7:return this.begin("acc_title"),12;break;case 8:return this.popState(),"acc_title_value";break;case 9:return this.begin("acc_descr"),14;break;case 10:return this.popState(),"acc_descr_value";break;case 11:this.begin("acc_descr_multiline");break;case 12:this.popState();break;case 13:return"acc_descr_multiline_value";case 14:return 17;case 15:return 18;case 16:return 19;case 17:return":";case 18:return 6;case 19:return"INVALID"}},"anonymous"),rules:[/^(?:%(?!\{)[^\n]*)/i,/^(?:[^\}]%%[^\n]*)/i,/^(?:[\n]+)/i,/^(?:\s+)/i,/^(?:#[^\n]*)/i,/^(?:journey\b)/i,/^(?:title\s[^#\n;]+)/i,/^(?:accTitle\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*\{\s*)/i,/^(?:[\}])/i,/^(?:[^\}]*)/i,/^(?:section\s[^#:\n;]+)/i,/^(?:[^#:\n;]+)/i,/^(?::[^#\n;]+)/i,/^(?::)/i,/^(?:$)/i,/^(?:.)/i],conditions:{acc_descr_multiline:{rules:[12,13],inclusive:!1},acc_descr:{rules:[10],inclusive:!1},acc_title:{rules:[8],inclusive:!1},INITIAL:{rules:[0,1,2,3,4,5,6,7,9,11,14,15,16,17,18,19],inclusive:!0}}};return z}();W.lexer=E;function F(){this.yy={}}return J(F,"Parser"),F.prototype=W,W.Parser=F,new F}();o.parser=o;var Dq=o,h="",t=[],f=[],y=[],$q=J(function(){t.length=0,f.length=0,h="",y.length=0,Yq()},"clear"),bq=J(function(q){h=q,t.push(q)},"addSection"),uq=J(function(){return t},"getSections"),gq=J(function(){let q=Uq(),Q=100,U=0;while(!q&&U<Q)q=Uq(),U++;return f.push(...y),f},"getTasks"),hq=J(function(){let q=[];return f.forEach((U)=>{if(U.people)q.push(...U.people)}),[...new Set(q)].sort()},"updateActors"),fq=J(function(q,Q){let U=Q.substr(1).split(":"),N=0,G=[];if(U.length===1)N=Number(U[0]),G=[];else N=Number(U[0]),G=U[1].split(",");let Y=G.map((Z)=>Z.trim()),R={section:h,type:h,people:Y,task:q,score:N};y.push(R)},"addTask"),yq=J(function(q){let Q={section:h,type:h,description:q,task:q,classes:[]};f.push(Q)},"addTaskOrg"),Uq=J(function(){let q=J(function(U){return y[U].processed},"compileTask"),Q=!0;for(let[U,N]of y.entries())q(U),Q=Q&&N.processed;return Q},"compileTasks"),xq=J(function(){return hq()},"getActors"),Bq={getConfig:J(()=>u().journey,"getConfig"),clear:$q,setDiagramTitle:Wq,getDiagramTitle:Eq,setAccTitle:Iq,getAccTitle:Mq,setAccDescription:Nq,getAccDescription:Rq,addSection:bq,getSections:uq,getTasks:gq,addTask:fq,addTaskOrg:yq,getActors:xq},_q=J((q)=>`.label {
    font-family: ${q.fontFamily};
    color: ${q.textColor};
  }
  .mouth {
    stroke: #666;
  }

  line {
    stroke: ${q.textColor}
  }

  .legend {
    fill: ${q.textColor};
    font-family: ${q.fontFamily};
  }

  .label text {
    fill: #333;
  }
  .label {
    color: ${q.textColor}
  }

  .face {
    ${q.faceColor?`fill: ${q.faceColor}`:"fill: #FFF8DC"};
    stroke: #999;
  }

  .node rect,
  .node circle,
  .node ellipse,
  .node polygon,
  .node path {
    fill: ${q.mainBkg};
    stroke: ${q.nodeBorder};
    stroke-width: 1px;
  }

  .node .label {
    text-align: center;
  }
  .node.clickable {
    cursor: pointer;
  }

  .arrowheadPath {
    fill: ${q.arrowheadColor};
  }

  .edgePath .path {
    stroke: ${q.lineColor};
    stroke-width: 1.5px;
  }

  .flowchart-link {
    stroke: ${q.lineColor};
    fill: none;
  }

  .edgeLabel {
    background-color: ${q.edgeLabelBackground};
    rect {
      opacity: 0.5;
    }
    text-align: center;
  }

  .cluster rect {
  }

  .cluster text {
    fill: ${q.titleColor};
  }

  div.mermaidTooltip {
    position: absolute;
    text-align: center;
    max-width: 200px;
    padding: 2px;
    font-family: ${q.fontFamily};
    font-size: 12px;
    background: ${q.tertiaryColor};
    border: 1px solid ${q.border2};
    border-radius: 2px;
    pointer-events: none;
    z-index: 100;
  }

  .task-type-0, .section-type-0  {
    ${q.fillType0?`fill: ${q.fillType0}`:""};
  }
  .task-type-1, .section-type-1  {
    ${q.fillType0?`fill: ${q.fillType1}`:""};
  }
  .task-type-2, .section-type-2  {
    ${q.fillType0?`fill: ${q.fillType2}`:""};
  }
  .task-type-3, .section-type-3  {
    ${q.fillType0?`fill: ${q.fillType3}`:""};
  }
  .task-type-4, .section-type-4  {
    ${q.fillType0?`fill: ${q.fillType4}`:""};
  }
  .task-type-5, .section-type-5  {
    ${q.fillType0?`fill: ${q.fillType5}`:""};
  }
  .task-type-6, .section-type-6  {
    ${q.fillType0?`fill: ${q.fillType6}`:""};
  }
  .task-type-7, .section-type-7  {
    ${q.fillType0?`fill: ${q.fillType7}`:""};
  }

  .actor-0 {
    ${q.actor0?`fill: ${q.actor0}`:""};
  }
  .actor-1 {
    ${q.actor1?`fill: ${q.actor1}`:""};
  }
  .actor-2 {
    ${q.actor2?`fill: ${q.actor2}`:""};
  }
  .actor-3 {
    ${q.actor3?`fill: ${q.actor3}`:""};
  }
  .actor-4 {
    ${q.actor4?`fill: ${q.actor4}`:""};
  }
  .actor-5 {
    ${q.actor5?`fill: ${q.actor5}`:""};
  }
  ${Lq()}
`,"getStyles"),pq=_q,qq=J(function(q,Q){return Fq(q,Q)},"drawRect"),kq=J(function(q,Q){let N=q.append("circle").attr("cx",Q.cx).attr("cy",Q.cy).attr("class","face").attr("r",15).attr("stroke-width",2).attr("overflow","visible"),G=q.append("g");G.append("circle").attr("cx",Q.cx-5).attr("cy",Q.cy-5).attr("r",1.5).attr("stroke-width",2).attr("fill","#666").attr("stroke","#666"),G.append("circle").attr("cx",Q.cx+5).attr("cy",Q.cy-5).attr("r",1.5).attr("stroke-width",2).attr("fill","#666").attr("stroke","#666");function Y(W){let E=n().startAngle(Math.PI/2).endAngle(3*(Math.PI/2)).innerRadius(7.5).outerRadius(6.8181818181818175);W.append("path").attr("class","mouth").attr("d",E).attr("transform","translate("+Q.cx+","+(Q.cy+2)+")")}J(Y,"smile");function R(W){let E=n().startAngle(3*Math.PI/2).endAngle(5*(Math.PI/2)).innerRadius(7.5).outerRadius(6.8181818181818175);W.append("path").attr("class","mouth").attr("d",E).attr("transform","translate("+Q.cx+","+(Q.cy+7)+")")}J(R,"sad");function Z(W){W.append("line").attr("class","mouth").attr("stroke",2).attr("x1",Q.cx-5).attr("y1",Q.cy+7).attr("x2",Q.cx+5).attr("y2",Q.cy+7).attr("class","mouth").attr("stroke-width","1px").attr("stroke","#666")}if(J(Z,"ambivalent"),Q.score>3)Y(G);else if(Q.score<3)R(G);else Z(G);return N},"drawFace"),Vq=J(function(q,Q){let U=q.append("circle");if(U.attr("cx",Q.cx),U.attr("cy",Q.cy),U.attr("class","actor-"+Q.pos),U.attr("fill",Q.fill),U.attr("stroke",Q.stroke),U.attr("r",Q.r),U.class!==void 0)U.attr("class",U.class);if(Q.title!==void 0)U.append("title").text(Q.title);return U},"drawCircle"),Aq=J(function(q,Q){return Pq(q,Q)},"drawText"),dq=J(function(q,Q){function U(G,Y,R,Z,W){return G+","+Y+" "+(G+R)+","+Y+" "+(G+R)+","+(Y+Z-W)+" "+(G+R-W*1.2)+","+(Y+Z)+" "+G+","+(Y+Z)}J(U,"genPoints");let N=q.append("polygon");N.attr("points",U(Q.x,Q.y,50,20,7)),N.attr("class","labelBox"),Q.y=Q.y+Q.labelMargin,Q.x=Q.x+0.5*Q.labelMargin,Aq(q,Q)},"drawLabel"),mq=J(function(q,Q,U){let N=q.append("g"),G=e();G.x=Q.x,G.y=Q.y,G.fill=Q.fill,G.width=U.width*Q.taskCount+U.diagramMarginX*(Q.taskCount-1),G.height=U.height,G.class="journey-section section-type-"+Q.num,G.rx=3,G.ry=3,qq(N,G),Oq(U)(Q.text,N,G.x,G.y,G.width,G.height,{class:"journey-section section-type-"+Q.num},U,Q.colour)},"drawSection"),a=-1,lq=J(function(q,Q,U,N){let G=Q.x+U.width/2,Y=q.append("g");a++;let R=450;Y.append("line").attr("id",N+"-task"+a).attr("x1",G).attr("y1",Q.y).attr("x2",G).attr("y2",R).attr("class","task-line").attr("stroke-width","1px").attr("stroke-dasharray","4 2").attr("stroke","#666"),kq(Y,{cx:G,cy:300+(5-Q.score)*30,score:Q.score});let Z=e();Z.x=Q.x,Z.y=Q.y,Z.fill=Q.fill,Z.width=U.width,Z.height=U.height,Z.class="task task-type-"+Q.num,Z.rx=3,Z.ry=3,qq(Y,Z);let W=Q.x+14;Q.people.forEach((E)=>{let F=Q.actors[E].color,z={cx:W,cy:Q.y,r:7,fill:F,stroke:"#000",title:E,pos:Q.actors[E].position};Vq(Y,z),W+=10}),Oq(U)(Q.task,Y,Z.x,Z.y,Z.width,Z.height,{class:"task"},U,Q.colour)},"drawTask"),iq=J(function(q,Q){Cq(q,Q)},"drawBackgroundRect"),Oq=function(){function q(G,Y,R,Z,W,E,F,z){let K=Y.append("text").attr("x",R+W/2).attr("y",Z+E/2+5).style("font-color",z).style("text-anchor","middle").text(G);N(K,F)}J(q,"byText");function Q(G,Y,R,Z,W,E,F,z,K){let{taskFontSize:X,taskFontFamily:B}=z,I=G.split(/<br\s*\/?>/gi);for(let M=0;M<I.length;M++){let H=M*X-X*(I.length-1)/2,L=Y.append("text").attr("x",R+W/2).attr("y",Z).attr("fill",K).style("text-anchor","middle").style("font-size",X).style("font-family",B);L.append("tspan").attr("x",R+W/2).attr("dy",H).text(I[M]),L.attr("y",Z+E/2).attr("dominant-baseline","central").attr("alignment-baseline","central"),N(L,F)}}J(Q,"byTspan");function U(G,Y,R,Z,W,E,F,z){let K=Y.append("switch"),B=K.append("foreignObject").attr("x",R).attr("y",Z).attr("width",W).attr("height",E).attr("position","fixed").append("xhtml:div").style("display","table").style("height","100%").style("width","100%");B.append("div").attr("class","label").style("display","table-cell").style("text-align","center").style("vertical-align","middle").text(G),Q(G,K,R,Z,W,E,F,z),N(B,F)}J(U,"byFo");function N(G,Y){for(let R in Y)if(R in Y)G.attr(R,Y[R])}return J(N,"_setTextAttrs"),function(G){return G.textPlacement==="fo"?U:G.textPlacement==="old"?q:Q}}(),rq=J(function(q,Q){a=-1,q.append("defs").append("marker").attr("id",Q+"-arrowhead").attr("refX",5).attr("refY",2).attr("markerWidth",6).attr("markerHeight",4).attr("orient","auto").append("path").attr("d","M 0,0 V 4 L6,2 Z")},"initGraphics"),x={drawRect:qq,drawCircle:Vq,drawSection:mq,drawText:Aq,drawLabel:dq,drawTask:lq,drawBackgroundRect:iq,initGraphics:rq},cq=J(function(q){Object.keys(q).forEach(function(U){j[U]=q[U]})},"setConf"),T={},d=0;function vq(q){let Q=u().journey,U=Q.maxLabelWidth;d=0;let N=60;Object.keys(T).forEach((G)=>{let Y=T[G].color,R={cx:20,cy:N,r:7,fill:Y,stroke:"#000",pos:T[G].position};x.drawCircle(q,R);let Z=q.append("text").attr("visibility","hidden").text(G),W=Z.node().getBoundingClientRect().width;Z.remove();let E=[];if(W<=U)E=[G];else{let F=G.split(" "),z="";if(Z=q.append("text").attr("visibility","hidden"),F.forEach((K)=>{let X=z?`${z} ${K}`:K;if(Z.text(X),Z.node().getBoundingClientRect().width>U){if(z)E.push(z);if(z=K,Z.text(K),Z.node().getBoundingClientRect().width>U){let I="";for(let M of K)if(I+=M,Z.text(I+"-"),Z.node().getBoundingClientRect().width>U)E.push(I.slice(0,-1)+"-"),I=M;z=I}}else z=X}),z)E.push(z);Z.remove()}E.forEach((F,z)=>{let K={x:40,y:N+7+z*20,fill:"#666",text:F,textMargin:Q.boxTextMargin??5},B=x.drawText(q,K).node().getBoundingClientRect().width;if(B>d&&B>Q.leftMargin-B)d=B}),N+=Math.max(20,E.length*20)})}J(vq,"drawActorLegend");var j=u().journey,D=0,sq=J(function(q,Q,U,N){let G=u(),Y=G.journey.titleColor,R=G.journey.titleFontSize,Z=G.journey.titleFontFamily,W=G.securityLevel,E;if(W==="sandbox")E=k("#i"+Q);let F=W==="sandbox"?k(E.nodes()[0].contentDocument.body):k("body");v.init();let z=F.select("#"+Q);x.initGraphics(z,Q);let K=N.db.getTasks(),X=N.db.getDiagramTitle(),B=N.db.getActors();for(let w in T)delete T[w];let I=0;B.forEach((w)=>{T[w]={color:j.actorColours[I%j.actorColours.length],position:I},I++}),vq(z),D=j.leftMargin+d,v.insert(0,0,D,Object.keys(T).length*50),nq(z,K,0,Q);let M=v.getBounds();if(X)z.append("text").text(X).attr("x",D).attr("font-size",R).attr("font-weight","bold").attr("y",25).attr("fill",Y).attr("font-family",Z);let H=M.stopy-M.starty+2*j.diagramMarginY,L=D+M.stopx+2*j.diagramMarginX;zq(z,H,L,j.useMaxWidth),z.append("line").attr("x1",D).attr("y1",j.height*4).attr("x2",L-D-4).attr("y2",j.height*4).attr("stroke-width",4).attr("stroke","black").attr("marker-end","url(#"+Q+"-arrowhead)");let C=X?70:0;z.attr("viewBox",`${M.startx} -25 ${L} ${H+C}`),z.attr("preserveAspectRatio","xMinYMin meet"),z.attr("height",H+C+25)},"draw"),v={data:{startx:void 0,stopx:void 0,starty:void 0,stopy:void 0},verticalPos:0,sequenceItems:[],init:J(function(){this.sequenceItems=[],this.data={startx:void 0,stopx:void 0,starty:void 0,stopy:void 0},this.verticalPos=0},"init"),updateVal:J(function(q,Q,U,N){if(q[Q]===void 0)q[Q]=U;else q[Q]=N(U,q[Q])},"updateVal"),updateBounds:J(function(q,Q,U,N){let G=u().journey,Y=this,R=0;function Z(W){return J(function(F){R++;let z=Y.sequenceItems.length-R+1;if(Y.updateVal(F,"starty",Q-z*G.boxMargin,Math.min),Y.updateVal(F,"stopy",N+z*G.boxMargin,Math.max),Y.updateVal(v.data,"startx",q-z*G.boxMargin,Math.min),Y.updateVal(v.data,"stopx",U+z*G.boxMargin,Math.max),W!=="activation")Y.updateVal(F,"startx",q-z*G.boxMargin,Math.min),Y.updateVal(F,"stopx",U+z*G.boxMargin,Math.max),Y.updateVal(v.data,"starty",Q-z*G.boxMargin,Math.min),Y.updateVal(v.data,"stopy",N+z*G.boxMargin,Math.max)},"updateItemBounds")}J(Z,"updateFn"),this.sequenceItems.forEach(Z())},"updateBounds"),insert:J(function(q,Q,U,N){let G=Math.min(q,U),Y=Math.max(q,U),R=Math.min(Q,N),Z=Math.max(Q,N);this.updateVal(v.data,"startx",G,Math.min),this.updateVal(v.data,"starty",R,Math.min),this.updateVal(v.data,"stopx",Y,Math.max),this.updateVal(v.data,"stopy",Z,Math.max),this.updateBounds(G,R,Y,Z)},"insert"),bumpVerticalPos:J(function(q){this.verticalPos=this.verticalPos+q,this.data.stopy=this.verticalPos},"bumpVerticalPos"),getVerticalPos:J(function(){return this.verticalPos},"getVerticalPos"),getBounds:J(function(){return this.data},"getBounds")},s=j.sectionFills,Zq=j.sectionColours,nq=J(function(q,Q,U,N){let G=u().journey,Y="",R=G.height*2+G.diagramMarginY,Z=U+R,W=0,E="#CCC",F="black",z=0;for(let[K,X]of Q.entries()){if(Y!==X.section){E=s[W%s.length],z=W%s.length,F=Zq[W%Zq.length];let I=0,M=X.section;for(let L=K;L<Q.length;L++)if(Q[L].section==M)I=I+1;else break;let H={x:K*G.taskMargin+K*G.width+D,y:50,text:X.section,fill:E,num:z,colour:F,taskCount:I};x.drawSection(q,H,G),Y=X.section,W++}let B=X.people.reduce((I,M)=>{if(T[M])I[M]=T[M];return I},{});X.x=K*G.taskMargin+K*G.width+D,X.y=Z,X.width=G.diagramMarginX,X.height=G.diagramMarginY,X.colour=F,X.fill=E,X.num=z,X.actors=B,x.drawTask(q,X,G,N),v.insert(X.x,X.y,X.x+X.width+G.taskMargin,450)}},"drawTasks"),Hq={setConf:cq,draw:sq},XQ={parser:Dq,db:Bq,renderer:Hq,styles:pq,init:J((q)=>{Hq.setConf(q.journey),Bq.clear()},"init")};export{XQ as diagram};
