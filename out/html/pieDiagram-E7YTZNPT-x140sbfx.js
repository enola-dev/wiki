import{m as yq}from"./wiki-cbe7hd3d.js";import{n as Mq}from"./wiki-57pwjp0q.js";import"./wiki-a24gn8sw.js";import{r as Qq}from"./wiki-34q0ar26.js";import"./wiki-6dn3rxk8.js";import"./wiki-pjm3zez3.js";import"./wiki-e85pnym7.js";import"./wiki-nnts73pn.js";import"./wiki-qdk3c630.js";import"./wiki-0epw3pnd.js";import"./wiki-5c5j20c3.js";import"./wiki-6gt0fb8r.js";import"./wiki-0n2mhqap.js";import"./wiki-byg9tpvk.js";import"./wiki-mverk9f8.js";import"./wiki-5ep558tj.js";import"./wiki-d80mzbcb.js";import"./wiki-362ky1fy.js";import"./wiki-ahpj2bgc.js";import{tc as $q,uc as Jq}from"./wiki-4fp686ya.js";import"./wiki-4k52963t.js";import{Lc as g,nd as d,sd as s,td as l,ud as n,vd as o,wd as a,xd as i,yd as t,zd as e}from"./wiki-f1txy54q.js";import{Hd as f,Sd as qq,je as S,me as Kq}from"./wiki-xvj86xk5.js";import{Ge as Y}from"./wiki-fs4np4zx.js";import"./wiki-qy8z9qt9.js";var Yq=g.pie,b={sections:new Map,showData:!1,config:Yq},T=b.sections,C=b.showData,Rq=structuredClone(Yq),Zq=Y(()=>structuredClone(Rq),"getConfig"),Pq=Y(()=>{T=new Map,C=b.showData,s()},"clear"),Hq=Y(({label:q,value:Q})=>{if(Q<0)throw Error(`"${q}" has invalid value: ${Q}. Negative values are not allowed in pie charts. All slice values must be >= 0.`);if(!T.has(q))T.set(q,Q),f.debug(`added new section: ${q}, with value: ${Q}`)},"addSection"),xq=Y(()=>T,"getSections"),Wq=Y((q)=>{C=q},"setShowData"),vq=Y(()=>C,"getShowData"),Xq={getConfig:Zq,clear:Pq,setDiagramTitle:i,getDiagramTitle:t,setAccTitle:l,getAccTitle:n,setAccDescription:o,getAccDescription:a,addSection:Hq,getSections:xq,setShowData:Wq,getShowData:vq},Tq=Y((q,Q)=>{yq(q,Q),Q.setShowData(q.showData),q.sections.map(Q.addSection)},"populateDb"),fq={parse:Y(async(q)=>{let Q=await Mq("pie",q);f.debug(Q),Tq(Q,Xq)},"parse")},Iq=Y((q)=>`
  .pieCircle{
    stroke: ${q.pieStrokeColor};
    stroke-width : ${q.pieStrokeWidth};
    opacity : ${q.pieOpacity};
  }
  .pieCircle.highlighted{
    scale: 1.05;
    opacity: 1;
  }
  .pieCircle.highlightedOnHover:hover{
    transition-duration: 250ms;
    scale: 1.05;
    opacity: 1;
  }
  .pieOuterCircle{
    stroke: ${q.pieOuterStrokeColor};
    stroke-width: ${q.pieOuterStrokeWidth};
    fill: none;
  }
  .pieTitleText {
    text-anchor: middle;
    font-size: ${q.pieTitleTextSize};
    fill: ${q.pieTitleTextColor};
    font-family: ${q.fontFamily};
  }
  .slice {
    font-family: ${q.fontFamily};
    fill: ${q.pieSectionTextColor};
    font-size:${q.pieSectionTextSize};
    // fill: white;
  }
  .legend text {
    fill: ${q.pieLegendTextColor};
    font-family: ${q.fontFamily};
    font-size: ${q.pieLegendTextSize};
  }
`,"getStyles"),Aq=Iq,Nq=Y((q)=>{let Q=[...q.values()].reduce((M,F)=>M+F,0),D=[...q.entries()].map(([M,F])=>({label:M,value:F})).filter((M)=>M.value/Q*100>=1);return Kq().value((M)=>M.value).sort(null)(D)},"createPieArcs"),Gq=Y((q,Q,D,u)=>{f.debug(`rendering pie chart
`+q);let M=u.db,F=e(),k=Jq(M.getConfig(),F.pie),m=40,J=18,B=4,R=450,Z=R,I=Qq(Q),x=I.append("g");x.attr("transform","translate("+Z/2+","+R/2+")");let{themeVariables:y}=F,[p]=$q(y.pieOuterStrokeWidth);p??=2;let{legendPosition:Bq,textPosition:_}=k,Oq=k.donutHole>0&&k.donutHole<=0.9?k.donutHole:0,w=Math.min(Z,R)/2-m,Uq=S().innerRadius(Oq*w).outerRadius(w),zq=S().innerRadius(w*_).outerRadius(w*_),P=x.append("g");P.append("circle").attr("cx",0).attr("cy",0).attr("r",w+p/2).attr("class","pieOuterCircle");let W=M.getSections(),kq=Nq(W),wq=[y.pie1,y.pie2,y.pie3,y.pie4,y.pie5,y.pie6,y.pie7,y.pie8,y.pie9,y.pie10,y.pie11,y.pie12],A=0;W.forEach((K)=>{A+=K});let c=kq.filter((K)=>(K.data.value/A*100).toFixed(0)!=="0"),N=qq(wq).domain([...W.keys()]);P.selectAll("mySlices").data(c).enter().append("path").attr("d",Uq).attr("fill",(K)=>{return N(K.data.label)}).attr("class",(K)=>{let $="pieCircle";if(k.highlightSlice==="hover")$+=" highlightedOnHover";else if(k.highlightSlice===K.data.label)$+=" highlighted";return $}),P.selectAll("mySlices").data(c).enter().append("text").text((K)=>{return(K.data.value/A*100).toFixed(0)+"%"}).attr("transform",(K)=>{return"translate("+zq.centroid(K)+")"}).style("text-anchor","middle").attr("class","slice");let jq=x.append("text").text(M.getDiagramTitle()).attr("x",0).attr("y",-(R-50)/2).attr("class","pieTitleText"),H=[...W.entries()].map(([K,$])=>({label:K,value:$})),j=x.selectAll(".legend").data(H).enter().append("g").attr("class","legend");j.append("rect").attr("width",J).attr("height",J).style("fill",(K)=>N(K.label)).style("stroke",(K)=>N(K.label)),j.append("text").attr("x",J+B).attr("y",J-B).text((K)=>{if(M.getShowData())return`${K.label} [${K.value}]`;return K.label});let V=Math.max(...j.selectAll("text").nodes().map((K)=>K?.getBoundingClientRect().width??0)),v=R,G=Z+m,X=J+B,L=H.length*X;switch(Bq){case"center":j.attr("transform",(K,$)=>{let O=X*H.length/2,U=-V/2-(J+B),z=$*X-O;return"translate("+U+","+z+")"});break;case"top":v+=L,j.attr("transform",(K,$)=>{let O=w,U=-V/2-(J+B),z=$*X-O;return`translate(${U}, ${z})`}),P.attr("transform",()=>{return`translate(0, ${L+X})`});break;case"bottom":v+=L,j.attr("transform",(K,$)=>{let O=-w-X,U=-V/2-(J+B),z=$*X-O;return"translate("+U+","+z+")"});break;case"left":G+=J+B+V,j.attr("transform",(K,$)=>{let O=X*H.length/2,U=-w-(J+B),z=$*X-O;return"translate("+U+","+z+")"}),P.attr("transform",()=>{return`translate(${V+J+B}, 0)`});break;case"right":default:G+=J+B+V,j.attr("transform",(K,$)=>{let O=X*H.length/2,U=12*J,z=$*X-O;return"translate("+U+","+z+")"});break}let E=jq.node()?.getBoundingClientRect().width??0,Fq=Z/2-E/2,Vq=Z/2+E/2,h=Math.min(0,Fq),r=Math.max(G,Vq)-h;I.attr("viewBox",`${h} 0 ${r} ${v}`),d(I,v,r,k.useMaxWidth)},"draw"),Lq={draw:Gq},Eq={parser:fq,db:Xq,renderer:Lq,styles:Aq};export{Eq as diagram};
