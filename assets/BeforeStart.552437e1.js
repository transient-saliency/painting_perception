import{_ as d,u,r as m,o as x,c,b as i,d as t,a as l,w as n}from"./index.9a7a3a1a.js";const h={data(){return{relax_time:30,show_time:2,gap_relax_time:10,group_num:10,fig_num:0}},components:{},computed:{},mounted(){},methods:{jumpTo(){const p=u();p.setting={group_num:this.group_num,relax_time:this.relax_time,show_time:this.show_time,gap_relax_time:this.gap_relax_time},this.$router.push("/test")}}},g={style:{height:"100%",width:"100%",display:"flex","align-items":"center","justify-content":"center"}},f={style:{"font-size":"16px"}},y=i("h1",{style:{"margin-bottom":"20px","font-size":"35px"}},"\u8BBE\u7F6E",-1),V={style:{"margin-top":"20px",display:"flex","align-items":"center"}},w={style:{"margin-top":"20px",display:"flex","align-items":"center"}},v={style:{"margin-top":"20px",display:"flex","align-items":"center"}},S={style:{"margin-top":"50px"}};function b(p,e,B,j,o,r){const a=m("el-input"),_=m("el-button");return x(),c("div",g,[i("div",f,[y,i("div",V,[t("\u4F11\u606F\u65F6\u957F: \xA0\xA0\xA0 "),l(a,{modelValue:o.gap_relax_time,"onUpdate:modelValue":e[0]||(e[0]=s=>o.gap_relax_time=s),style:{width:"240px"},placeholder:"Please input"},{append:n(()=>[t("S/\u7EC4")]),_:1},8,["modelValue"])]),i("div",w,[t("\u5927\u7EC4\u4F11\u606F: \xA0\xA0\xA0 "),l(a,{modelValue:o.relax_time,"onUpdate:modelValue":e[1]||(e[1]=s=>o.relax_time=s),style:{width:"240px"},placeholder:"Please input"},{append:n(()=>[t("S/\u7EC4")]),_:1},8,["modelValue"])]),i("div",v,[t("\u5C55\u793A\u65F6\u957F: \xA0\xA0\xA0 "),l(a,{modelValue:o.show_time,"onUpdate:modelValue":e[2]||(e[2]=s=>o.show_time=s),style:{width:"240px"},placeholder:"Please input"},{append:n(()=>[t("S/\u5F20")]),_:1},8,["modelValue"])]),i("div",S,[l(_,{onClick:e[3]||(e[3]=s=>r.jumpTo())},{default:n(()=>[t("\u5F00\u59CB\u5B9E\u9A8C")]),_:1})])])])}const C=d(h,[["render",b]]);export{C as default};
