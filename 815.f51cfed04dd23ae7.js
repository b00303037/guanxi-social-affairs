"use strict";(self.webpackChunkguanxi_social_affairs=self.webpackChunkguanxi_social_affairs||[]).push([[815],{7815:(qt,S,s)=>{s.r(S),s.d(S,{GovtModule:()=>Ht});var m=s(9808),w=s(7423),b=s(9224),D=s(5245),N=s(4449),v=s(2181),x=s(6087),M=s(773),T=s(2638),Q=s(2368),L=s(4847),l=s(4999),U=s(4594),O=s(7087),u=s(6157),Z=s(5113),t=s(5e3);const B=function(){return{exact:!0}};function J(e,i){if(1&e){const n=t.EpF();t.TgZ(0,"mat-list-item",17,18),t.NdJ("click",function(){return t.CHM(n),t.oxw(),t.MAs(21).close()}),t.TgZ(2,"button",19)(3,"mat-icon"),t._uU(4),t.qZA()(),t.TgZ(5,"span"),t._uU(6),t.qZA()()}if(2&e){const n=i.$implicit,o=t.MAs(1);t.ekj("text-teal-600",o.isActive),t.Q6J("routerLink",n.routerLink)("routerLinkActiveOptions",t.DdM(6,B)),t.xp6(4),t.Oqu(n.icon),t.xp6(2),t.Oqu(n.label)}}let R=(()=>{class e{constructor(n,o,a){this.media=n,this.changeDetectorRef=o,this.router=a,this._mobileQueryListener=()=>this.changeDetectorRef.detectChanges(),this.mobileQuery=this.media.matchMedia(Z.u3.XSmall),this.navListItems=[{icon:"home",label:"\u9996\u9801",routerLink:"/home"},{icon:"view_list",label:"\u7533\u8acb\u55ae\u5217\u8868",routerLink:"/govt/govt-appl-list"},{icon:"analytics",label:"\u7533\u8acb\u4ef6\u6578\u7d71\u8a08",routerLink:"/govt/appl-statistics"},{icon:"feed",label:"\u6700\u65b0\u6d88\u606f\u7dad\u8b77",routerLink:"/govt/news-mgmt"},{icon:"notifications_active",label:"\u767c\u9001\u901a\u77e5",routerLink:"/govt/notification"}],this.mobileQuery.addEventListener("change",this._mobileQueryListener)}ngOnInit(){}logout(){this.router.navigate(["/home"])}ngOnDestroy(){this.mobileQuery.removeEventListener("change",this._mobileQueryListener)}}return e.\u0275fac=function(n){return new(n||e)(t.Y36(Z.vx),t.Y36(t.sBO),t.Y36(u.F0))},e.\u0275cmp=t.Xpm({type:e,selectors:[["app-govt-layouts"]],decls:28,vars:8,consts:[[1,"flex","flex-col","absolute","top-0","right-0","bottom-0","left-0"],[1,"shadow"],[1,"bg-teal-600","text-white"],[1,"w-page","flex"],["type","menu","mat-icon-button","",3,"click"],[1,"grow"],["routerLink","/home",1,"hidden","sm:flex","sm:items-center"],["src","assets/logo.png","width","40","height","40","alt","logo",1,"mr-2"],[1,"text-sm"],[1,"text-base"],[1,"actions-box"],["type","button","mat-button","",3,"click"],[3,"ngClass"],["fixedTopGap","56",1,"w-60","bg-teal-100",3,"mode","fixedInViewport"],["sidenav",""],["routerLinkActive","",3,"routerLink","routerLinkActiveOptions","text-teal-600","click",4,"ngFor","ngForOf"],[1,"w-page","py-4"],["routerLinkActive","",3,"routerLink","routerLinkActiveOptions","click"],["rla","routerLinkActive"],["type","button","mat-icon-button",""]],template:function(n,o){if(1&n){const a=t.EpF();t.TgZ(0,"div",0)(1,"header",1)(2,"mat-toolbar",2)(3,"div",3)(4,"button",4),t.NdJ("click",function(){return t.CHM(a),t.MAs(21).toggle()}),t.TgZ(5,"mat-icon"),t._uU(6,"menu"),t.qZA()(),t._UZ(7,"span",5),t.TgZ(8,"a",6),t._UZ(9,"img",7),t.TgZ(10,"div")(11,"div",8),t._uU(12,"\u65b0\u7af9\u7e23\u95dc\u897f\u93ae\u516c\u6240"),t.qZA(),t.TgZ(13,"div",9),t._uU(14,"Guanxi Township Office"),t.qZA()()(),t._UZ(15,"span",5),t.TgZ(16,"div",10)(17,"button",11),t.NdJ("click",function(){return o.logout()}),t._uU(18," \u793e\u6703\u8ab2\u767b\u51fa "),t.qZA()()()()(),t.TgZ(19,"mat-sidenav-container",12)(20,"mat-sidenav",13,14)(22,"mat-nav-list"),t.YNc(23,J,7,7,"mat-list-item",15),t.qZA()(),t.TgZ(24,"mat-sidenav-content")(25,"main")(26,"div",16),t._UZ(27,"router-outlet"),t.qZA()()()()()}2&n&&(t.xp6(2),t.ekj("fixed",o.mobileQuery.matches),t.xp6(17),t.Udp("margin-top",o.mobileQuery.matches?56:0,"px"),t.Q6J("ngClass",o.mobileQuery.matches?"grow shrink-0 basis-auto":"grow shrink basis-0"),t.xp6(1),t.Q6J("mode",o.mobileQuery.matches?"over":"side")("fixedInViewport",o.mobileQuery.matches),t.xp6(3),t.Q6J("ngForOf",o.navListItems))},directives:[U.Ye,w.lW,D.Hw,u.yS,T.TM,m.mk,T.JX,N.Hk,m.sg,N.Tg,u.Od,u.rH,T.Rh,u.lC],styles:[""]}),e})();var F=s(3166);let $=(()=>{class e{constructor(){}ngOnInit(){}}return e.\u0275fac=function(n){return new(n||e)},e.\u0275cmp=t.Xpm({type:e,selectors:[["app-appl-statistics"]],decls:2,vars:0,consts:[[1,"page-title"]],template:function(n,o){1&n&&(t.TgZ(0,"div",0),t._uU(1,"\u7533\u8acb\u4ef6\u6578\u7d71\u8a08"),t.qZA())},styles:[""]}),e})();var d=s(1777),I=s(7579),g=s(2722),h=s(8746),f=s(4004),_=s(262),j=s(9300),H=s(8505),G=s(515),Y=s(7660),q=s(6681),z=s(9077),X=s(4293),C=s(9577),A=s(3358),K=s(8966),k=s(2803),E=s(2359),P=s(6600);function W(e,i){1&e&&t._UZ(0,"tr",20)}function V(e,i){1&e&&t._UZ(0,"tr",21)}function tt(e,i){1&e&&t._UZ(0,"tr",22)}function et(e,i){1&e&&(t.TgZ(0,"th",23),t._uU(1,"\u7533\u8acb\u55ae\u865f"),t.qZA())}function nt(e,i){if(1&e){const n=t.EpF();t.TgZ(0,"td",24)(1,"span",25),t.NdJ("click",function(){const p=t.CHM(n).$implicit;return t.oxw().onGetAppl(p.applicationID)}),t._uU(2),t.qZA()()}if(2&e){const n=i.$implicit,o=t.oxw();t.xp6(1),t.ekj("text-amber-400",o.expandingApplID===n.applicationID||(null==o.expandedAppl?null:o.expandedAppl.applicationID)===n.applicationID),t.xp6(1),t.Oqu(n.applicationID)}}function ot(e,i){1&e&&(t.TgZ(0,"th",23),t._uU(1,"\u7533\u8acb\u65e5\u671f"),t.qZA())}function it(e,i){if(1&e&&(t.TgZ(0,"td",24)(1,"span"),t._uU(2),t.ALo(3,"date"),t.qZA()()),2&e){const n=i.$implicit;t.xp6(2),t.hij(" ",t.xi3(3,1,n.createDatetime,"yyyy/MM/dd")," ")}}function at(e,i){1&e&&(t.TgZ(0,"th",23),t._uU(1,"\u59d3\u540d"),t.qZA())}function st(e,i){if(1&e&&(t.TgZ(0,"td",24)(1,"span"),t._uU(2),t.qZA()()),2&e){const n=i.$implicit;t.xp6(2),t.Oqu(n.name)}}function pt(e,i){1&e&&(t.TgZ(0,"th",23),t._uU(1,"\u7533\u8acb\u72c0\u614b"),t.qZA())}function lt(e,i){if(1&e&&(t.TgZ(0,"td",24)(1,"span"),t._uU(2),t.ALo(3,"i18nSelect"),t.qZA()()),2&e){const n=i.$implicit,o=t.oxw();t.xp6(2),t.Oqu(t.xi3(3,1,n.status,o.applStatusMap))}}function ct(e,i){1&e&&(t.TgZ(0,"th",23),t._uU(1,"\u64cd\u4f5c"),t.qZA())}const rt=function(e){return{appl:e}};function mt(e,i){if(1&e&&(t.TgZ(0,"button",27)(1,"mat-icon"),t._uU(2,"more_vert"),t.qZA()()),2&e){const n=t.oxw().$implicit;t.oxw();const o=t.MAs(29);t.Q6J("matMenuTriggerFor",o)("matMenuTriggerData",t.VKq(2,rt,n))}}function ut(e,i){if(1&e&&(t.TgZ(0,"td",24),t.YNc(1,mt,3,4,"button",26),t.qZA()),2&e){const n=i.$implicit,o=t.oxw();t.xp6(1),t.Q6J("ngIf",n.status===o.applStatusObj.Unreviewed||n.status===o.applStatusObj.N)}}function dt(e,i){if(1&e&&t._UZ(0,"app-expanded-appl",32),2&e){const n=t.oxw().$implicit,o=t.oxw();t.Q6J("appl",n)("expandedAppl",o.expandedAppl)}}function gt(e,i){1&e&&(t.TgZ(0,"div",33),t._UZ(1,"mat-spinner"),t.qZA())}function ht(e,i){if(1&e&&(t.TgZ(0,"td",28)(1,"div",29)(2,"div",30),t.YNc(3,dt,1,2,"app-expanded-appl",31),t.YNc(4,gt,2,0,"div",17),t.qZA()()()),2&e){const n=i.$implicit,o=t.oxw();t.uIk("colspan",(o.gtMDQuery.matches?o.displayedColumnsMD:o.displayedColumns).length),t.xp6(1),t.Q6J("@detailExpand",o.expandingApplID===n.applicationID||(null==o.expandedAppl?null:o.expandedAppl.applicationID)===n.applicationID?"expanded":"collapsed"),t.xp6(2),t.Q6J("ngIf",(null==o.expandedAppl?null:o.expandedAppl.applicationID)===n.applicationID),t.xp6(1),t.Q6J("ngIf",o.getting&&o.expandingApplID===n.applicationID)}}function ft(e,i){1&e&&(t.TgZ(0,"div",33),t._UZ(1,"mat-spinner"),t.qZA())}function _t(e,i){if(1&e){const n=t.EpF();t.TgZ(0,"button",36),t.NdJ("click",function(){t.CHM(n);const a=t.oxw().appl,p=t.oxw();return p.onConfirmReviewAppl(a.applicationID,p.applStatusObj.Y)}),t.TgZ(1,"mat-icon",37),t._uU(2,"check_circle"),t.qZA(),t.TgZ(3,"span"),t._uU(4,"\u5be9\u6838\u901a\u904e"),t.qZA()()}}function vt(e,i){if(1&e){const n=t.EpF();t.TgZ(0,"button",36),t.NdJ("click",function(){t.CHM(n);const a=t.oxw().appl,p=t.oxw();return p.onConfirmReviewAppl(a.applicationID,p.applStatusObj.N)}),t.TgZ(1,"mat-icon",37),t._uU(2,"error"),t.qZA(),t.TgZ(3,"span"),t._uU(4,"\u9000\u56de\u88dc\u6b63"),t.qZA()()}}function xt(e,i){if(1&e){const n=t.EpF();t.TgZ(0,"button",38),t.NdJ("click",function(){t.CHM(n);const a=t.oxw().appl;return t.oxw().onConfirmCancelAppl(a.applicationID)}),t.TgZ(1,"mat-icon",39),t._uU(2,"cancel"),t.qZA(),t.TgZ(3,"span"),t._uU(4,"\u53d6\u6d88\u7533\u8acb"),t.qZA()()}}function Ct(e,i){if(1&e&&(t.YNc(0,_t,5,0,"button",34),t.YNc(1,vt,5,0,"button",34),t.YNc(2,xt,5,0,"button",35)),2&e){const n=i.appl,o=t.oxw();t.Q6J("ngIf",n.status===o.applStatusObj.Unreviewed),t.xp6(1),t.Q6J("ngIf",n.status===o.applStatusObj.Unreviewed),t.xp6(1),t.Q6J("ngIf",n.status===o.applStatusObj.Unreviewed||n.status===o.applStatusObj.N)}}const At=function(){return["expandedDetail"]};let yt=(()=>{class e{constructor(n,o,a,p,c,r){this.media=n,this.changeDetectorRef=o,this.route=a,this.matDialog=p,this.snackBarService=c,this.gsaService=r,this.destroy$=new I.x,this._gtMDQueryListener=()=>this.changeDetectorRef.detectChanges(),this.gtMDQuery=this.media.matchMedia("(min-width: 960px)"),this.dataSource=new l.by([]),this.displayedColumns=["applicationID","actions"],this.displayedColumnsMD=["applicationID","createDatetime","name","status","actions"],this.expandedAppl=null,this.applStatusObj=Y.Q5,this.applStatusMap=Y.Lg,this.gettingList=!1,this.getting=!1,this.cancelling=!1,this.gtMDQuery.addEventListener("change",this._gtMDQueryListener)}ngOnInit(){this.onGetApplList()}ngAfterViewInit(){this.dataSource.paginator=this.paginator,this.dataSource.sort=this.sort}onGetApplList(){this.gettingList||(this.expandedAppl=null,this.gettingList=!0,this.gsaService.GetApplList({}).pipe((0,g.R)(this.destroy$),(0,h.x)(()=>this.gettingList=!1),(0,f.U)(n=>{this.dataSource.data=n.content}),(0,_.K)(n=>this.onError(n))).subscribe())}onGetAppl(n){var o;this.getting||(null===(o=this.expandedAppl)||void 0===o?void 0:o.applicationID)===n||(this.expandingApplID=n,this.expandedAppl=null,this.getting=!0,this.gsaService.GetAppl({applicationID:n}).pipe((0,g.R)(this.destroy$),(0,h.x)(()=>this.getting=!1),(0,f.U)(p=>{var c;const{hospData:r}=null===(c=this.route.parent)||void 0===c?void 0:c.snapshot.data;this.expandingApplID=void 0,this.expandedAppl=(0,q.tB)(p.content,r)}),(0,_.K)(p=>this.onError(p))).subscribe())}onConfirmCancelAppl(n){const o=new X.g({title:"\u662f\u5426\u53d6\u6d88\u7533\u8acb\uff1f"});this.matDialog.open(z.$,{data:o}).afterClosed().pipe((0,g.R)(this.destroy$),(0,j.h)(a=>!0===a),(0,H.b)(()=>this.onCancelAppl(n))).subscribe()}onCancelAppl(n){this.cancelling||(this.cancelling=!0,this.gsaService.CancelAppl({applicationID:n}).pipe((0,g.R)(this.destroy$),(0,h.x)(()=>this.cancelling=!1),(0,f.U)(a=>{const p=new A.r({message:a.message,type:C.p.Success});this.snackBarService.add(p),this.onGetApplList()}),(0,_.K)(a=>this.onError(a))).subscribe())}onConfirmReviewAppl(n,o){}onError(n){const o=new A.r({message:n,type:C.p.Error});return this.snackBarService.add(o),G.E}ngOnDestroy(){this.destroy$.next(null),this.destroy$.complete(),this.gtMDQuery.removeEventListener("change",this._gtMDQueryListener)}}return e.\u0275fac=function(n){return new(n||e)(t.Y36(Z.vx),t.Y36(t.sBO),t.Y36(u.gz),t.Y36(K.uw),t.Y36(k.c),t.Y36(E.S))},e.\u0275cmp=t.Xpm({type:e,selectors:[["app-govt-appl-list"]],viewQuery:function(n,o){if(1&n&&(t.Gf(x.NW,5),t.Gf(L.YE,5)),2&n){let a;t.iGM(a=t.CRH())&&(o.paginator=a.first),t.iGM(a=t.CRH())&&(o.sort=a.first)}},decls:31,vars:6,consts:[[1,"page-title"],[1,"spinner-box"],[1,"overflow-auto"],["mat-table","","multiTemplateDataRows","",1,"w-full",3,"dataSource"],["mat-header-row","",4,"matHeaderRowDef"],["mat-row","",4,"matRowDef","matRowDefColumns"],["mat-row","","class","h-0",4,"matRowDef","matRowDefColumns"],["matColumnDef","applicationID"],["mat-header-cell","",4,"matHeaderCellDef"],["mat-cell","","class","border-b-0",4,"matCellDef"],["matColumnDef","createDatetime"],["matColumnDef","name"],["matColumnDef","status"],["matColumnDef","actions"],["matColumnDef","expandedDetail"],["mat-cell","",4,"matCellDef"],["pageSize","10","hidePageSize","",1,"w-full"],["class","spinner",4,"ngIf"],["actionMenu","matMenu"],["matMenuContent",""],["mat-header-row",""],["mat-row",""],["mat-row","",1,"h-0"],["mat-header-cell",""],["mat-cell","",1,"border-b-0"],[1,"block","text-base","clickable-text","py-2",3,"click"],["mat-icon-button","","color","primary",3,"matMenuTriggerFor","matMenuTriggerData",4,"ngIf"],["mat-icon-button","","color","primary",3,"matMenuTriggerFor","matMenuTriggerData"],["mat-cell",""],[1,"overflow-hidden","flex"],[1,"w-full","spinner-box","appl","detail-col"],[3,"appl","expandedAppl",4,"ngIf"],[3,"appl","expandedAppl"],[1,"spinner"],["mat-menu-item","","class","color-primary",3,"click",4,"ngIf"],["mat-menu-item","","class","color-warn",3,"click",4,"ngIf"],["mat-menu-item","",1,"color-primary",3,"click"],[1,"color-primary"],["mat-menu-item","",1,"color-warn",3,"click"],[1,"color-warn"]],template:function(n,o){1&n&&(t.TgZ(0,"div",0),t._uU(1,"\u7533\u8acb\u55ae\u5217\u8868"),t.qZA(),t.TgZ(2,"mat-card")(3,"div",1)(4,"div",2)(5,"table",3),t.YNc(6,W,1,0,"tr",4),t.YNc(7,V,1,0,"tr",5),t.YNc(8,tt,1,0,"tr",6),t.ynx(9,7),t.YNc(10,et,2,0,"th",8),t.YNc(11,nt,3,3,"td",9),t.BQk(),t.ynx(12,10),t.YNc(13,ot,2,0,"th",8),t.YNc(14,it,4,4,"td",9),t.BQk(),t.ynx(15,11),t.YNc(16,at,2,0,"th",8),t.YNc(17,st,3,1,"td",9),t.BQk(),t.ynx(18,12),t.YNc(19,pt,2,0,"th",8),t.YNc(20,lt,4,4,"td",9),t.BQk(),t.ynx(21,13),t.YNc(22,ct,2,0,"th",8),t.YNc(23,ut,2,1,"td",9),t.BQk(),t.ynx(24,14),t.YNc(25,ht,5,4,"td",15),t.BQk(),t.qZA()(),t._UZ(26,"mat-paginator",16),t.YNc(27,ft,2,0,"div",17),t.qZA()(),t.TgZ(28,"mat-menu",null,18),t.YNc(30,Ct,3,3,"ng-template",19),t.qZA()),2&n&&(t.xp6(5),t.Q6J("dataSource",o.dataSource),t.xp6(1),t.Q6J("matHeaderRowDef",o.gtMDQuery.matches?o.displayedColumnsMD:o.displayedColumns),t.xp6(1),t.Q6J("matRowDefColumns",o.gtMDQuery.matches?o.displayedColumnsMD:o.displayedColumns),t.xp6(1),t.Q6J("matRowDefColumns",t.DdM(5,At)),t.xp6(19),t.Q6J("ngIf",o.gettingList))},directives:[b.a8,l.BZ,l.as,l.XQ,l.nj,l.Gk,l.w1,l.fO,l.ge,l.Dz,l.ev,m.O5,w.lW,v.p6,D.Hw,P.C,M.Ou,x.NW,v.VK,v.KA,v.OP],pipes:[m.uU,m._K],styles:[""],data:{animation:[(0,d.X$)("detailExpand",[(0,d.SB)("collapsed",(0,d.oB)({height:"0px",minHeight:"0"})),(0,d.SB)("expanded",(0,d.oB)({height:"*"})),(0,d.eR)("expanded <=> collapsed",(0,d.jt)("225ms cubic-bezier(0.4, 0.0, 0.2, 1)"))])]}}),e})();var y=s(4605),wt=s(7238),Dt=s(4369);function Tt(e,i){1&e&&t._UZ(0,"tr",18)}function Zt(e,i){1&e&&t._UZ(0,"tr",19)}function bt(e,i){1&e&&t._UZ(0,"tr",20)}function Nt(e,i){1&e&&(t.TgZ(0,"th",21),t._uU(1,"\u555f\u7528"),t.qZA())}function Mt(e,i){if(1&e){const n=t.EpF();t.TgZ(0,"td",22)(1,"mat-slide-toggle",23),t.NdJ("change",function(a){const c=t.CHM(n).$implicit;return t.oxw().onNewsEnabledChange(a,c.newsID)}),t.ALo(2,"isInSet"),t.qZA()()}if(2&e){const n=i.$implicit,o=t.oxw();t.xp6(1),t.Q6J("checked",n.enabled===o.ynObj.Y)("disabled",t.xi3(2,2,n.newsID,o.updatingIDs))}}function Lt(e,i){1&e&&(t.TgZ(0,"th",21),t._uU(1,"\u9996\u9801\u8f2a\u64ad"),t.qZA())}function St(e,i){if(1&e){const n=t.EpF();t.TgZ(0,"td",22)(1,"mat-slide-toggle",23),t.NdJ("change",function(a){const c=t.CHM(n).$implicit;return t.oxw().onNewsPinnedChange(a,c.newsID)}),t.ALo(2,"isInSet"),t.qZA()()}if(2&e){const n=i.$implicit,o=t.oxw();t.xp6(1),t.Q6J("checked",n.pinned===o.ynObj.Y)("disabled",t.xi3(2,2,n.newsID,o.updatingIDs))}}function Qt(e,i){1&e&&(t.TgZ(0,"th",21),t._uU(1,"\u6a19\u984c"),t.qZA())}function Ut(e,i){if(1&e&&(t.TgZ(0,"td",22)(1,"span",24),t._uU(2),t.qZA()()),2&e){const n=i.$implicit;t.xp6(2),t.Oqu(n.title)}}function It(e,i){1&e&&(t.TgZ(0,"th",21),t._uU(1,"\u65e5\u671f"),t.qZA())}function Gt(e,i){if(1&e&&(t.TgZ(0,"td",22)(1,"span"),t._uU(2),t.ALo(3,"date"),t.qZA()()),2&e){const n=i.$implicit;t.xp6(2),t.hij(" ",t.xi3(3,1,n.date,"yyyy/MM/dd")," ")}}function Yt(e,i){1&e&&(t.TgZ(0,"th",21),t._uU(1,"\u64cd\u4f5c"),t.qZA())}function kt(e,i){if(1&e){const n=t.EpF();t.TgZ(0,"td",22)(1,"button",25),t.NdJ("click",function(){const p=t.CHM(n).$implicit;return t.oxw().openUpdateNewsDialog(p.newsID)}),t.TgZ(2,"mat-icon"),t._uU(3,"edit"),t.qZA()()()}}function Et(e,i){if(1&e){const n=t.EpF();t.TgZ(0,"div",29)(1,"table",30)(2,"tr")(3,"td")(4,"label"),t._uU(5,"\u555f\u7528"),t.qZA()(),t.TgZ(6,"td")(7,"mat-slide-toggle",23),t.NdJ("change",function(a){t.CHM(n);const p=t.oxw().$implicit;return t.oxw().onNewsEnabledChange(a,p.newsID)}),t.ALo(8,"isInSet"),t.qZA()()(),t.TgZ(9,"tr")(10,"td")(11,"label"),t._uU(12,"\u9996\u9801\u8f2a\u64ad"),t.qZA()(),t.TgZ(13,"td")(14,"mat-slide-toggle",23),t.NdJ("change",function(a){t.CHM(n);const p=t.oxw().$implicit;return t.oxw().onNewsPinnedChange(a,p.newsID)}),t.ALo(15,"isInSet"),t.qZA()()()()()}if(2&e){const n=t.oxw().$implicit,o=t.oxw();t.xp6(7),t.Q6J("checked",n.enabled===o.ynObj.Y)("disabled",t.xi3(8,4,n.newsID,o.updatingIDs)),t.xp6(7),t.Q6J("checked",n.pinned===o.ynObj.Y)("disabled",t.xi3(15,7,n.newsID,o.updatingIDs))}}function Ot(e,i){if(1&e&&(t.TgZ(0,"td",26)(1,"div",27),t.YNc(2,Et,16,10,"div",28),t.qZA()()),2&e){const n=t.oxw();t.uIk("colspan",(n.gtSMQuery.matches?n.displayedColumnsSM:n.displayedColumns).length),t.xp6(2),t.Q6J("ngIf",!n.gtSMQuery.matches)}}function Bt(e,i){1&e&&(t.TgZ(0,"div",31),t._UZ(1,"mat-spinner"),t.qZA())}const Jt=function(){return["expandedDetail"]},$t=[{path:"",component:R,resolve:{hospData:F.v},children:[{path:"",pathMatch:"full",redirectTo:"govt-appl-list"},{path:"govt-appl-list",component:yt},{path:"appl-statistics",component:$},{path:"news-mgmt",component:(()=>{class e{constructor(n,o,a,p){this.media=n,this.changeDetectorRef=o,this.snackBarService=a,this.gsaService=p,this.destroy$=new I.x,this._gtSMQueryListener=()=>this.changeDetectorRef.detectChanges(),this.gtSMQuery=this.media.matchMedia("(min-width: 600px)"),this.dataSource=new l.by([]),this.displayedColumns=["title","date","actions"],this.displayedColumnsSM=["enabled","pinned","title","date","actions"],this.ynObj=y.mN,this.getting=!1,this.updatingIDs=new Set,this.gtSMQuery.addEventListener("change",this._gtSMQueryListener)}ngOnInit(){this.onGetNewsList()}ngAfterViewInit(){this.dataSource.paginator=this.paginator,this.dataSource.sort=this.sort}onGetNewsList(){this.getting||(this.getting=!0,this.gsaService.GetNewsList({}).pipe((0,g.R)(this.destroy$),(0,h.x)(()=>this.getting=!1),(0,f.U)(n=>{this.dataSource.data=n.content}),(0,_.K)(n=>this.onError(n))).subscribe())}onNewsEnabledChange(n,o){if(this.updatingIDs.has(o))return;this.updatingIDs.add(o);const a={newsID:o,enabled:n.checked?y.YN.Y:y.YN.N};this.gsaService.UpdateNews(a).pipe((0,g.R)(this.destroy$),(0,h.x)(()=>this.updatingIDs.delete(o)),(0,f.U)(p=>{const c=new A.r({message:p.message,type:C.p.Success});this.snackBarService.add(c),this.dataSource.data=this.dataSource.data.map(r=>r.newsID===o?Object.assign(Object.assign({},r),{enabled:a.enabled}):r)}),(0,_.K)(p=>this.onError(p))).subscribe()}onNewsPinnedChange(n,o){if(this.updatingIDs.has(o))return;this.updatingIDs.add(o);const a={newsID:o,pinned:n.checked?y.YN.Y:y.YN.N};this.gsaService.UpdateNews(a).pipe((0,g.R)(this.destroy$),(0,h.x)(()=>this.updatingIDs.delete(o)),(0,f.U)(p=>{const c=new A.r({message:p.message,type:C.p.Success});this.snackBarService.add(c),this.dataSource.data=this.dataSource.data.map(r=>r.newsID===o?Object.assign(Object.assign({},r),{pinned:a.enabled}):r)}),(0,_.K)(p=>this.onError(p))).subscribe()}openUpdateNewsDialog(n){}onError(n){const o=new A.r({message:n,type:C.p.Error});return this.snackBarService.add(o),G.E}ngOnDestroy(){this.destroy$.next(null),this.destroy$.complete(),this.gtSMQuery.removeEventListener("change",this._gtSMQueryListener)}}return e.\u0275fac=function(n){return new(n||e)(t.Y36(Z.vx),t.Y36(t.sBO),t.Y36(k.c),t.Y36(E.S))},e.\u0275cmp=t.Xpm({type:e,selectors:[["app-news-mgmt"]],viewQuery:function(n,o){if(1&n&&(t.Gf(x.NW,5),t.Gf(L.YE,5)),2&n){let a;t.iGM(a=t.CRH())&&(o.paginator=a.first),t.iGM(a=t.CRH())&&(o.sort=a.first)}},decls:28,vars:6,consts:[[1,"page-title"],[1,"spinner-box"],[1,"overflow-auto"],["mat-table","","multiTemplateDataRows","",1,"w-full",3,"dataSource"],["mat-header-row","",4,"matHeaderRowDef"],["mat-row","",4,"matRowDef","matRowDefColumns"],["mat-row","","class","h-0",4,"matRowDef","matRowDefColumns"],["matColumnDef","enabled"],["mat-header-cell","",4,"matHeaderCellDef"],["mat-cell","","class","border-b-0",4,"matCellDef"],["matColumnDef","pinned"],["matColumnDef","title"],["matColumnDef","date"],["matColumnDef","actions"],["matColumnDef","expandedDetail"],["mat-cell","",4,"matCellDef"],["pageSize","10","hidePageSize","",1,"w-full"],["class","spinner",4,"ngIf"],["mat-header-row",""],["mat-row",""],["mat-row","",1,"h-0"],["mat-header-cell",""],["mat-cell","",1,"border-b-0"],["color","primary",3,"checked","disabled","change"],[1,"block","text-base","py-2"],["mat-icon-button","","color","primary","matTooltip","\u7de8\u8f2f\u6700\u65b0\u6d88\u606f",3,"click"],["mat-cell",""],[1,"w-full","news","detail-col"],["class","grid grid-cols-1 border-t border-black border-opacity-6",4,"ngIf"],[1,"grid","grid-cols-1","border-t","border-black","border-opacity-6"],[1,"col-span-1"],[1,"spinner"]],template:function(n,o){1&n&&(t.TgZ(0,"div",0),t._uU(1,"\u6700\u65b0\u6d88\u606f\u7dad\u8b77"),t.qZA(),t.TgZ(2,"mat-card")(3,"div",1)(4,"div",2)(5,"table",3),t.YNc(6,Tt,1,0,"tr",4),t.YNc(7,Zt,1,0,"tr",5),t.YNc(8,bt,1,0,"tr",6),t.ynx(9,7),t.YNc(10,Nt,2,0,"th",8),t.YNc(11,Mt,3,5,"td",9),t.BQk(),t.ynx(12,10),t.YNc(13,Lt,2,0,"th",8),t.YNc(14,St,3,5,"td",9),t.BQk(),t.ynx(15,11),t.YNc(16,Qt,2,0,"th",8),t.YNc(17,Ut,3,1,"td",9),t.BQk(),t.ynx(18,12),t.YNc(19,It,2,0,"th",8),t.YNc(20,Gt,4,4,"td",9),t.BQk(),t.ynx(21,13),t.YNc(22,Yt,2,0,"th",8),t.YNc(23,kt,4,0,"td",9),t.BQk(),t.ynx(24,14),t.YNc(25,Ot,3,2,"td",15),t.BQk(),t.qZA()(),t._UZ(26,"mat-paginator",16),t.YNc(27,Bt,2,0,"div",17),t.qZA()()),2&n&&(t.xp6(5),t.Q6J("dataSource",o.dataSource),t.xp6(1),t.Q6J("matHeaderRowDef",o.gtSMQuery.matches?o.displayedColumnsSM:o.displayedColumns),t.xp6(1),t.Q6J("matRowDefColumns",o.gtSMQuery.matches?o.displayedColumnsSM:o.displayedColumns),t.xp6(1),t.Q6J("matRowDefColumns",t.DdM(5,Jt)),t.xp6(19),t.Q6J("ngIf",o.getting))},directives:[b.a8,l.BZ,l.as,l.XQ,l.nj,l.Gk,l.w1,l.fO,l.ge,l.Dz,l.ev,Q.Rr,w.lW,wt.gM,D.Hw,m.O5,x.NW,M.Ou],pipes:[Dt.Z,m.uU],styles:[""]}),e})()},{path:"notification",component:(()=>{class e{constructor(){}ngOnInit(){}}return e.\u0275fac=function(n){return new(n||e)},e.\u0275cmp=t.Xpm({type:e,selectors:[["app-notification"]],decls:2,vars:0,consts:[[1,"page-title"]],template:function(n,o){1&n&&(t.TgZ(0,"div",0),t._uU(1,"\u767c\u9001\u901a\u77e5"),t.qZA())},styles:[""]}),e})()}]}];let jt=(()=>{class e{}return e.\u0275fac=function(n){return new(n||e)},e.\u0275mod=t.oAB({type:e}),e.\u0275inj=t.cJS({imports:[[u.Bz.forChild($t)],u.Bz]}),e})(),Ht=(()=>{class e{}return e.\u0275fac=function(n){return new(n||e)},e.\u0275mod=t.oAB({type:e}),e.\u0275inj=t.cJS({imports:[[m.ez,jt,w.ot,b.QW,D.Ps,N.ie,v.Tx,x.TU,M.Cq,T.SJ,Q.rP,L.JX,l.p0,U.g0,O.m]]}),e})()}}]);