import{a7 as n,r as W,j as e,B as p,P as l,A as E,S as d,a as h,T as m,f as F,L as G,M,W as O}from"./index-00aebc20.js";import{b as R}from"./format-time-3dd02b54.js";import{b as z}from"./format-number-337f61cf.js";import{G as x}from"./Grid2-26de99b5.js";import{C as N}from"./Card-5581d361.js";import{T as f}from"./TextField-0d0d1389.js";import{A as $,a as H}from"./Autocomplete-a861e4c5.js";import{I as U}from"./InputAdornment-c36000c5.js";import{C as V}from"./Container-6fbcd7c5.js";import{B as _}from"./Button-03556603.js";import"./isMuiElement-2ec1e31c.js";import"./Select-2ccfb3b7.js";import"./Menu-8e8bcaa8.js";import"./Popper-95ad79c6.js";import"./usePreviousProps-34b9cb0c.js";const q=["Whiteboard Templates By Industry Leaders","Tesla Cybertruck-inspired camper trailer for Tesla fans who can’t just wait for the truck!","Designify Agency Landing Page Design","✨What is Done is Done ✨","Fresh Prince","Six Socks Studio","vincenzo de cotiis’ crossing over showcases a research on contamination","Simple, Great Looking Animations in Your Project | Video Tutorial","40 Free Serif Fonts for Digital Designers","Examining the Evolution of the Typical Web Design Client","Katie Griffin loves making that homey art","The American Dream retold through mid-century railroad graphics","Illustration System Design","CarZio-Delivery Driver App SignIn/SignUp","How to create a client-serverless Jamstack app using Netlify, Gatsby and Fauna","Tylko Organise effortlessly -3D & Motion Design","RAYO ?? A expanded visual arts festival identity","Anthony Burrill and Wired mag’s Andrew Diprose discuss how they made January’s Change Everything cover","Inside the Mind of Samuel Day","Portfolio Review: Is This Portfolio Too Creative?","Akkers van Margraten","Gradient Ticket icon","Here’s a Dyson motorcycle concept that doesn’t ‘suck’!","How to Animate a SVG with border-image"],g=[...Array(23)].map((o,t)=>({id:n.string.uuid(),cover:`/assets/images/covers/cover_${t+1}.jpg`,title:q[t+1],createdAt:n.date.past(),view:n.number.int(99999),comment:n.number.int(99999),share:n.number.int(99999),favorite:n.number.int(99999),author:{name:n.person.fullName(),avatarUrl:`/assets/images/avatars/avatar_${t+1}.jpg`}})),v=W.forwardRef(({src:o,sx:t,...s},c)=>e.jsx(p,{component:"span",className:"svg-color",ref:c,sx:{width:24,height:24,display:"inline-block",bgcolor:"currentColor",mask:`url(${o}) no-repeat center / contain`,WebkitMask:`url(${o}) no-repeat center / contain`,...t},...s}));v.propTypes={src:l.string,sx:l.object};function b({post:o,index:t}){const{cover:s,title:c,view:w,comment:T,share:I,author:u,createdAt:k}=o,r=t===0,a=t===1||t===2,S=e.jsx(E,{alt:u.name,src:u.avatarUrl,sx:{zIndex:9,width:32,height:32,position:"absolute",left:i=>i.spacing(3),bottom:i=>i.spacing(-2),...(r||a)&&{zIndex:9,top:24,left:24,width:40,height:40}}}),A=e.jsx(G,{color:"inherit",variant:"subtitle2",underline:"hover",sx:{height:44,overflow:"hidden",WebkitLineClamp:2,display:"-webkit-box",WebkitBoxOrient:"vertical",...r&&{typography:"h5",height:60},...(r||a)&&{color:"common.white"}},children:c}),C=e.jsx(d,{direction:"row",flexWrap:"wrap",spacing:1.5,justifyContent:"flex-end",sx:{mt:3,color:"text.disabled"},children:[{number:T,icon:"eva:message-circle-fill"},{number:w,icon:"eva:eye-fill"},{number:I,icon:"eva:share-fill"}].map((i,L)=>e.jsxs(d,{direction:"row",sx:{...(r||a)&&{opacity:.48,color:"common.white"}},children:[e.jsx(h,{width:16,icon:i.icon,sx:{mr:.5}}),e.jsx(m,{variant:"caption",children:z(i.number)})]},L))}),P=e.jsx(p,{component:"img",alt:c,src:s,sx:{top:0,width:1,height:1,objectFit:"cover",position:"absolute"}}),D=e.jsx(m,{variant:"caption",component:"div",sx:{mb:2,color:"text.disabled",...(r||a)&&{opacity:.48,color:"common.white"}},children:R(k)}),B=e.jsx(v,{color:"paper",src:"/assets/icons/shape-avatar.svg",sx:{width:80,height:36,zIndex:9,bottom:-15,position:"absolute",color:"background.paper",...(r||a)&&{display:"none"}}});return e.jsx(x,{xs:12,sm:r?12:6,md:r?6:3,children:e.jsxs(N,{children:[e.jsxs(p,{sx:{position:"relative",pt:"calc(100% * 3 / 4)",...(r||a)&&{pt:"calc(100% * 4 / 3)","&:after":{top:0,content:"''",width:"100%",height:"100%",position:"absolute",bgcolor:i=>F(i.palette.grey[900],.72)}},...r&&{pt:{xs:"calc(100% * 4 / 3)",sm:"calc(100% * 3 / 4.66)"}}},children:[B,S,P]}),e.jsxs(p,{sx:{p:i=>i.spacing(4,3,3,3),...(r||a)&&{width:1,bottom:0,position:"absolute"}},children:[D,A,C]})]})})}b.propTypes={post:l.object.isRequired,index:l.number};y.propTypes={options:l.array,onSort:l.func};function y({options:o,onSort:t}){return e.jsx(f,{select:!0,size:"small",value:"latest",onChange:t,children:o.map(s=>e.jsx(M,{value:s.value,children:s.label},s.value))})}j.propTypes={posts:l.array.isRequired};function j({posts:o}){return e.jsx($,{sx:{width:280},autoHighlight:!0,popupIcon:null,slotProps:{paper:{sx:{width:320,[`& .${H.option}`]:{typography:"body2"}}}},options:o,getOptionLabel:t=>t.title,isOptionEqualToValue:(t,s)=>t.id===s.id,renderInput:t=>e.jsx(f,{...t,placeholder:"Search post...",InputProps:{...t.InputProps,startAdornment:e.jsx(U,{position:"start",children:e.jsx(h,{icon:"eva:search-fill",sx:{ml:1,width:20,height:20,color:"text.disabled"}})})}})})}function J(){return e.jsxs(V,{children:[e.jsxs(d,{direction:"row",alignItems:"center",justifyContent:"space-between",mb:5,children:[e.jsx(m,{variant:"h4",children:"Blog"}),e.jsx(_,{variant:"contained",color:"inherit",startIcon:e.jsx(h,{icon:"eva:plus-fill"}),children:"New Post"})]}),e.jsxs(d,{mb:5,direction:"row",alignItems:"center",justifyContent:"space-between",children:[e.jsx(j,{posts:g}),e.jsx(y,{options:[{value:"latest",label:"Latest"},{value:"popular",label:"Popular"},{value:"oldest",label:"Oldest"}]})]}),e.jsx(x,{container:!0,spacing:3,children:g.map((o,t)=>e.jsx(b,{post:o,index:t},o.id))})]})}function pe(){return e.jsxs(e.Fragment,{children:[e.jsx(O,{children:e.jsx("title",{children:" Blog | Minimal UI "})}),e.jsx(J,{})]})}export{pe as default};