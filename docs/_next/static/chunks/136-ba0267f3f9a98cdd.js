(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[136],{1786:(e,o,t)=>{"use strict";t.d(o,{rO:()=>a,Pu:()=>n,Nb:()=>s,kW:()=>l,Bg:()=>i,FQ:()=>c});let a={google:{measurementId:"G-Z1YPSLR2LR"}},n={name:"Skillet'z Cafe",branding:{welcome:"Welcome to",tagline:"Serving delicious American breakfast & lunch in historic Niles, Fremont, California",slogan:"Ol' Country Cookin' - Home cooked meals in Historic Niles, Fremont, California"},founding:{year:2025},location:{address:"37378 Niles Blvd",city:"Fremont",state:"CA",zip:"94536",neighborhood:"Niles",fullAddress:"37378 Niles Blvd, Fremont, CA 94536",phone:"(510) 793-8161"},contact:{email:"hello@skilletz.cafe"},hours:{weekday:{days:"Monday-Friday",open:"8am",close:"2pm"},weekend:{days:"Saturday-Sunday",open:"8am",close:"3pm"}}},s={home:{path:"/",name:"Home",showInNav:!0},menu:{path:"/menu",name:"Menu",showInNav:!0},catering:{path:"/catering",name:"Catering",showInNav:!0,openInNewTab:!0},contact:{path:"/contact",name:"Contact",showInNav:!0}},l={formatTitle:e=>e?"".concat(e," | ").concat(n.name," in ").concat(n.location.neighborhood," | ").concat(n.location.city,", ").concat(n.location.state):"".concat(n.name," | ").concat(n.location.neighborhood,", ").concat(n.location.city," ").concat(n.location.state),description:{default:"Traditional American Breakfast & Everyday Specials! Open weekdays ".concat(n.hours.weekday.open,"-").concat(n.hours.weekday.close,", weekends ").concat(n.hours.weekend.open,"-").concat(n.hours.weekend.close," in historic ").concat(n.location.neighborhood,", ").concat(n.location.city," ").concat(n.location.state)}};var r=t(8614);let c={facebook:{url:"https://www.facebook.com/SkilletzCafe",label:"Facebook",icon:r.aUl,title:"Follow us on Facebook for updates and events"},instagram:{url:"https://www.instagram.com/skilletz.cafe",label:"Instagram",icon:r.QV6,title:"See our latest food photos on Instagram"},yelp:{url:"https://www.yelp.com/biz/skilletz-cafe-fremont",label:"Yelp",icon:r.ka4,title:"Read our reviews on Yelp"},googleBusiness:{url:"https://g.co/kgs/W2fYt7s",label:"Google Business",icon:r.FjH,title:"Find us on Google Business"},youtube:{url:"https://www.youtube.com/@SkilletzCafe",label:"YouTube",icon:r.B4m,title:"Watch our videos on YouTube"},twitter:{url:"https://x.com/SkilletzCafe",label:"X (Twitter)",icon:r.NLt,title:"Follow us on X (Twitter)"}},i={doordash:{url:"https://www.doordash.com/store/skillet'z-cafe-fremont-31854517/",label:"Order on DoorDash"},careers:{url:"https://www.zippyapp.com/biz/skilletz",label:"Careers"},tripadvisor:{url:"https://www.tripadvisor.com/Restaurant_Review-g32411-d14979469-Reviews-Skillet_z_Cafe-Fremont_California.html",label:"TripAdvisor"},catering:{url:"https://docs.google.com/document/d/16e_c_6yw3ibc7KPSYJYKBUj1eIw74LM1YBLEFLdrb2A/preview",label:"Catering"}}},5430:e=>{e.exports={overlay:"MobileMenu_overlay__S_wBG",fadeIn:"MobileMenu_fadeIn__rLQIv",menu:"MobileMenu_menu__6UD6o",slideIn:"MobileMenu_slideIn___Cbim",closeButton:"MobileMenu_closeButton__t7IYQ",nav:"MobileMenu_nav__UaGSt",info:"MobileMenu_info__pjVho",infoSection:"MobileMenu_infoSection__02uD3",infoItem:"MobileMenu_infoItem__u_EaU",socialLinks:"MobileMenu_socialLinks__2HbKq"}},5905:(e,o,t)=>{"use strict";t.d(o,{G:()=>n,k:()=>a});let a=(e,o)=>{let t="".concat(e,", ").concat(o).replace(/ /g,"+");return"https://google.com/maps?q=".concat(t)},n=e=>{let o=e.replace(/\D/g,"");return"tel:+1".concat(o)}},6136:(e,o,t)=>{"use strict";t.d(o,{A:()=>M});var a=t(7876),n=t(7328),s=t.n(n),l=t(1786),r=t(4232);let c=(0,r.createContext)(void 0);function i(e){let{children:o}=e,[t,n]=(0,r.useState)("dark");return(0,r.useEffect)(()=>{let e=localStorage.getItem("theme");e?(n(e),document.documentElement.setAttribute("data-theme",e)):(n("dark"),document.documentElement.setAttribute("data-theme","dark"))},[]),(0,a.jsx)(c.Provider,{value:{theme:t,toggleTheme:()=>{let e="light"===t?"dark":"light";n(e),localStorage.setItem("theme",e),document.documentElement.setAttribute("data-theme",e)}},children:o})}function d(){let e=(0,r.useContext)(c);if(void 0===e)throw Error("useTheme must be used within a ThemeProvider");return e}var u=t(463),h=t.n(u),m=t(7789),g=t.n(m),_=t(1772),p=t(9139),f=t.n(p),b=t(5905);function j(){let{theme:e,toggleTheme:o}=d(),t=new Date().getFullYear(),n=t>l.Pu.founding.year?"".concat(l.Pu.founding.year,"–").concat(t):t,s=Object.entries(l.FQ),r=Object.entries(l.Bg);return(0,a.jsxs)("footer",{className:g().footer,children:[(0,a.jsxs)("div",{className:g().footerContent,children:[(0,a.jsxs)("div",{className:g().footerSection,children:[(0,a.jsx)("h3",{className:f().className,children:"Location & Hours"}),(0,a.jsxs)("p",{children:[(0,a.jsx)("a",{href:(0,b.k)(l.Pu.name,l.Pu.location.fullAddress),target:"_blank",rel:"noopener noreferrer",children:l.Pu.location.fullAddress}),(0,a.jsx)("br",{}),l.Pu.hours.weekday.days,": ",l.Pu.hours.weekday.open," -"," ",l.Pu.hours.weekday.close,(0,a.jsx)("br",{}),l.Pu.hours.weekend.days,": ",l.Pu.hours.weekend.open," -"," ",l.Pu.hours.weekend.close]})]}),(0,a.jsxs)("div",{className:g().footerSection,children:[(0,a.jsx)("h3",{className:f().className,children:"Connect With Us"}),(0,a.jsx)("div",{className:g().socialLinks,children:s.map(e=>{let[o,{url:t,label:n,icon:s,title:l}]=e;return(0,a.jsx)("a",{href:t,target:"_blank",rel:"noopener noreferrer","aria-label":n,title:l,children:(0,a.jsx)(_.g,{icon:s})},o)})})]}),(0,a.jsxs)("div",{className:g().footerSection,children:[(0,a.jsx)("h3",{className:f().className,children:"Quick Links"}),r.map(e=>{let[o,{url:t,label:n}]=e;return(0,a.jsx)("a",{href:t,target:"_blank",rel:"noopener noreferrer",children:n},o)})]})]}),(0,a.jsxs)("div",{className:g().copyright,children:["\xa9 ",n," ",l.Pu.name,". All rights reserved.",(0,a.jsx)("button",{onClick:o,className:g().themeToggle,"aria-label":"Switch to ".concat("light"===e?"dark":"light"," mode"),children:"light"===e?"\uD83C\uDF19":"☀️"})]})]})}var k=t(5105),w=t.n(k);function x(){return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(w(),{src:"https://www.googletagmanager.com/gtag/js?id=".concat(l.rO.google.measurementId),strategy:"afterInteractive"}),(0,a.jsx)(w(),{id:"google-analytics",strategy:"afterInteractive",children:"\n          window.dataLayer = window.dataLayer || [];\n          function gtag(){dataLayer.push(arguments);}\n          gtag('js', new Date());\n          gtag('config', '".concat(l.rO.google.measurementId,"');\n        ")})]})}var y=t(4587),v=t.n(y),N=t(8230),L=t.n(N),P=t(1041),C=t(5430),I=t.n(C);function S(e){let{isOpen:o,onClose:t}=e;return((0,r.useEffect)(()=>{let e=e=>{let o=document.getElementById("mobile-menu");o&&!o.contains(e.target)&&t()};return o&&(document.addEventListener("mousedown",e),document.body.style.overflow="hidden"),()=>{document.removeEventListener("mousedown",e),document.body.style.overflow=""}},[o,t]),o)?(0,a.jsx)("div",{className:I().overlay,children:(0,a.jsxs)("div",{id:"mobile-menu",className:I().menu,children:[(0,a.jsx)("button",{className:I().closeButton,onClick:t,children:"\xd7"}),(0,a.jsx)("nav",{className:"".concat(I().nav," ").concat(f().className),children:Object.values(l.Nb).filter(e=>e.showInNav).map(e=>(0,a.jsx)(L(),{href:e.path,onClick:t,...e.openInNewTab&&{target:"_blank",rel:"noopener noreferrer"},children:e.name},e.path))}),(0,a.jsxs)("div",{className:"".concat(I().info," ").concat(h().className),children:[(0,a.jsxs)("div",{className:I().infoSection,children:[(0,a.jsxs)("div",{className:I().infoItem,children:[(0,a.jsx)(_.g,{icon:P.gKm}),(0,a.jsx)("a",{href:(0,b.k)(l.Pu.name,l.Pu.location.fullAddress),target:"_blank",rel:"noopener noreferrer",className:I().infoItem,children:(0,a.jsxs)("address",{children:[l.Pu.location.address,(0,a.jsx)("br",{}),l.Pu.location.city,", ",l.Pu.location.state," ",l.Pu.location.zip]})})]}),(0,a.jsxs)("div",{className:I().infoItem,children:[(0,a.jsx)(_.g,{icon:P.a$}),(0,a.jsxs)("div",{children:[(0,a.jsx)("p",{children:l.Pu.hours.weekday.days}),(0,a.jsxs)("p",{children:[l.Pu.hours.weekday.open," - ",l.Pu.hours.weekday.close]}),(0,a.jsx)("p",{children:l.Pu.hours.weekend.days}),(0,a.jsxs)("p",{children:[l.Pu.hours.weekend.open," - ",l.Pu.hours.weekend.close]})]})]}),(0,a.jsxs)("a",{href:(0,b.G)(l.Pu.location.phone),className:I().infoItem,children:[(0,a.jsx)(_.g,{icon:P.KKr}),(0,a.jsx)("span",{children:l.Pu.location.phone})]}),(0,a.jsxs)("a",{href:"mailto:".concat(l.Pu.contact.email),className:I().infoItem,children:[(0,a.jsx)(_.g,{icon:P.y_8}),(0,a.jsx)("span",{children:l.Pu.contact.email})]})]}),(0,a.jsx)("div",{className:I().socialLinks,children:Object.values(l.FQ).map(e=>(0,a.jsx)("a",{href:e.url,target:"_blank",rel:"noopener noreferrer",title:e.title,children:(0,a.jsx)(_.g,{icon:e.icon})},e.label))})]})]})}):null}function B(){let{theme:e,toggleTheme:o}=d(),[t,n]=(0,r.useState)(!1);return(0,a.jsxs)("header",{className:g().header,children:[(0,a.jsxs)("div",{className:g().headerContent,children:[(0,a.jsx)(L(),{href:l.Nb.home.path,className:g().logo,"aria-label":"".concat(l.Pu.name," - Return to Home"),children:(0,a.jsx)(v(),{src:"dark"===e?"/images/logos/skilletz_logo_dark_mode_blue_flame_transparent.png":"/images/logos/skilletz_logo_colored_flames.png",alt:"".concat(l.Pu.name," Logo"),title:"".concat(l.Pu.name," - ").concat(l.Pu.branding.slogan),width:200,height:60,priority:!0,loading:"eager",quality:100,loader:e=>{let{src:o}=e;return o}})}),(0,a.jsx)("nav",{className:"".concat(g().nav," ").concat(f().className," ").concat(g().desktopNav),children:Object.values(l.Nb).filter(e=>e.showInNav).map(e=>(0,a.jsx)(L(),{href:e.path,...e.openInNewTab&&{target:"_blank",rel:"noopener noreferrer"},children:e.name},e.path))}),(0,a.jsxs)("div",{className:"".concat(g().headerActions," ").concat(h().className),children:[(0,a.jsx)("div",{className:g().phone,children:(0,a.jsx)("a",{href:(0,b.G)(l.Pu.location.phone),children:l.Pu.location.phone})}),(0,a.jsx)("a",{href:l.Bg.doordash.url,target:"_blank",rel:"noopener noreferrer",className:g().orderButton,children:"Order Online"}),(0,a.jsxs)("button",{className:g().hamburgerButton,onClick:()=>n(!0),"aria-label":"Open menu",children:[(0,a.jsx)("span",{}),(0,a.jsx)("span",{}),(0,a.jsx)("span",{})]})]})]}),(0,a.jsx)(S,{isOpen:t,onClose:()=>n(!1)})]})}function M(e){let{children:o,title:t,description:n=l.kW.description.default}=e;return(0,a.jsxs)(i,{children:[(0,a.jsxs)(s(),{children:[(0,a.jsx)("title",{children:l.kW.formatTitle(t)}),(0,a.jsx)("meta",{name:"description",content:n}),(0,a.jsx)("meta",{name:"viewport",content:"width=device-width, initial-scale=1"}),(0,a.jsx)("link",{rel:"icon",href:"/favicon.ico"})]}),(0,a.jsx)(x,{}),(0,a.jsxs)("div",{className:"".concat(h().className," ").concat(g().layout),children:[(0,a.jsx)(B,{}),(0,a.jsx)("main",{className:g().main,children:o}),(0,a.jsx)(j,{})]})]})}},7789:e=>{e.exports={layout:"Layout_layout__8m3IW",header:"Layout_header__SXwWG",headerContent:"Layout_headerContent__W5FMz",logo:"Layout_logo__A8yk9",nav:"Layout_nav__BY5_j",desktopNav:"Layout_desktopNav__R3tNl",hamburgerButton:"Layout_hamburgerButton__aGuRC",headerActions:"Layout_headerActions__T03LU",themeToggle:"Layout_themeToggle__0tILV",phone:"Layout_phone__7r9xr",orderButton:"Layout_orderButton__EHPa3",main:"Layout_main__65zHd",footer:"Layout_footer__2AN9N",footerContent:"Layout_footerContent__lMnSk",footerSection:"Layout_footerSection__lZbxN",socialLinks:"Layout_socialLinks__HynkC",copyright:"Layout_copyright__dhB_o"}}}]);