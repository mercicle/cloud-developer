(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{190:function(e,t,n){e.exports=n(336)},195:function(e,t,n){},336:function(e,t,n){"use strict";n.r(t);var a=n(46),r=n.n(a);n(195),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));n(196);var o=n(0),i=n.n(o),c=n(18),s=n(19),l=n(159),u="https://".concat("vvmqjunhnj",".execute-api.").concat("us-east-2",".amazonaws.com/dev"),p={domain:"dev-aqymclse.us.auth0.com",clientId:"tGQeMM5L1qHMeRDa4c55OayQKSC8SAjS",callbackUrl:"http://localhost:3000/callback",returnTo:"http://localhost:3000"},h=function(){function e(t){Object(c.a)(this,e),this.auth0=new l.a.WebAuth({domain:p.domain,clientID:p.clientId,redirectUri:p.callbackUrl,responseType:"token id_token",scope:"openid"}),this.history=t,this.login=this.login.bind(this),this.logout=this.logout.bind(this),this.handleAuthentication=this.handleAuthentication.bind(this),this.isAuthenticated=this.isAuthenticated.bind(this),this.getAccessToken=this.getAccessToken.bind(this),this.getIdToken=this.getIdToken.bind(this),this.renewSession=this.renewSession.bind(this)}return Object(s.a)(e,[{key:"login",value:function(){this.auth0.authorize()}},{key:"handleAuthentication",value:function(){var e=this;this.auth0.parseHash(function(t,n){n&&n.accessToken&&n.idToken?(console.log("Access token: ",n.accessToken),console.log("id token: ",n.idToken),e.setSession(n)):t&&(e.history.replace("/"),console.log(t),alert("Error: ".concat(t.error,". Check the console for further details.")))})}},{key:"getAccessToken",value:function(){return this.accessToken}},{key:"getIdToken",value:function(){return this.idToken}},{key:"setSession",value:function(e){localStorage.setItem("isLoggedIn","true");var t=1e3*e.expiresIn+(new Date).getTime();this.accessToken=e.accessToken,this.idToken=e.idToken,this.expiresAt=t,this.history.replace("/")}},{key:"renewSession",value:function(){var e=this;this.auth0.checkSession({},function(t,n){n&&n.accessToken&&n.idToken?e.setSession(n):t&&(e.logout(),console.log(t),alert("Could not get a new token (".concat(t.error,": ").concat(t.error_description,").")))})}},{key:"logout",value:function(){this.accessToken=null,this.idToken=null,this.expiresAt=0,localStorage.removeItem("isLoggedIn"),this.auth0.logout({return_to:window.location.origin}),this.history.replace("/")}},{key:"isAuthenticated",value:function(){var e=this.expiresAt;return(new Date).getTime()<e}}]),e}(),d=n(41),m=n(347),g=n(343);var f=function(){return i.a.createElement(m.a,{active:!0},i.a.createElement(g.a,{content:"Loading"}))},v=n(178),b=n.n(v),k=n(24),y=n(23),E=n(25),j=n(48),O=n(15),w=n.n(O),C=n(26),S=n(346),x=n(67),I=function(e){function t(){return Object(c.a)(this,t),Object(k.a)(this,Object(y.a)(t).apply(this,arguments))}return Object(E.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return o.createElement(S.a,null,o.createElement(S.a.Content,null,o.createElement(S.a.Header,null,o.createElement(x.a,{to:"/images/".concat(this.props.group.groupId)},this.props.group.name)),o.createElement(S.a.Description,null,this.props.group.description)))}}]),t}(o.PureComponent);function T(){return U.apply(this,arguments)}function U(){return(U=Object(C.a)(w.a.mark(function e(){var t,n;return w.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("Fetching groups"),e.next=3,fetch("".concat(u,"/groups"));case 3:return t=e.sent,e.next=6,t.json();case 6:return n=e.sent,e.abrupt("return",n.items);case 8:case"end":return e.stop()}},e)}))).apply(this,arguments)}function A(e,t){return D.apply(this,arguments)}function D(){return(D=Object(C.a)(w.a.mark(function e(t,n){var a,r;return w.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat(u,"/groups"),{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(t)},body:JSON.stringify({name:n.name,description:n.description})});case 2:return a=e.sent,e.next=5,a.json();case 5:return r=e.sent,e.abrupt("return",r.newItem);case 7:case"end":return e.stop()}},e)}))).apply(this,arguments)}var F=n(348),L=n(344),N=function(e){function t(){var e,n;Object(c.a)(this,t);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(n=Object(k.a)(this,(e=Object(y.a)(t)).call.apply(e,[this].concat(r)))).state={groups:[]},n.handleCreateGroup=function(){n.props.history.push("/groups/create")},n}return Object(E.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){var e=Object(C.a)(w.a.mark(function e(){var t;return w.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,T();case 3:t=e.sent,this.setState({groups:t}),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),alert("Failed to fetch groups: ".concat(e.t0.message));case 10:case"end":return e.stop()}},e,this,[[0,7]])}));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){return o.createElement("div",null,o.createElement("h1",null,"Groups"),o.createElement(F.a,{primary:!0,size:"huge",className:"add-button",onClick:this.handleCreateGroup},"Create new group"),o.createElement(L.a,{clearing:!0}),o.createElement(S.a.Group,null,this.state.groups.map(function(e){return o.createElement(I,{key:e.groupId,group:e})})))}}]),t}(o.PureComponent),G=n(351),P=n(352),B=n(349);function M(e){return z.apply(this,arguments)}function z(){return(z=Object(C.a)(w.a.mark(function e(t){var n,a;return w.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("Fetching images"),e.next=3,fetch("".concat(u,"/groups/").concat(t,"/images"));case 3:return n=e.sent,e.next=6,n.json();case 6:return a=e.sent,e.abrupt("return",a.items);case 8:case"end":return e.stop()}},e)}))).apply(this,arguments)}function H(e,t){return _.apply(this,arguments)}function _(){return(_=Object(C.a)(w.a.mark(function e(t,n){var a;return w.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat(u,"/groups/").concat(n.groupId,"/images"),{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(t)},body:JSON.stringify({title:n.title})});case 2:return a=e.sent,e.next=5,a.json();case 5:return e.abrupt("return",e.sent);case 6:case"end":return e.stop()}},e)}))).apply(this,arguments)}function J(e,t){return q.apply(this,arguments)}function q(){return(q=Object(C.a)(w.a.mark(function e(t,n){return w.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(t,{method:"PUT",body:n});case 2:case"end":return e.stop()}},e)}))).apply(this,arguments)}var W,Q=n(179),R=function(e){function t(){return Object(c.a)(this,t),Object(k.a)(this,Object(y.a)(t).apply(this,arguments))}return Object(E.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return o.createElement(S.a,{fluid:!0,color:"red"},o.createElement(S.a.Content,null,o.createElement(S.a.Header,null,this.props.image.title),o.createElement(S.a.Description,null,this.props.image.timestamp),this.props.image.imageUrl&&o.createElement(Q.a,{src:this.props.image.imageUrl})))}}]),t}(o.PureComponent),K=function(e){function t(){var e,n;Object(c.a)(this,t);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(n=Object(k.a)(this,(e=Object(y.a)(t)).call.apply(e,[this].concat(r)))).state={images:[]},n.handleCreateImage=function(){n.props.history.push("/images/".concat(n.props.match.params.groupId,"/create"))},n}return Object(E.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){var e=Object(C.a)(w.a.mark(function e(){var t;return w.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,M(this.props.match.params.groupId);case 3:t=e.sent,this.setState({images:t}),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),alert("Failed to fetch images for group : ".concat(e.t0.message));case 10:case"end":return e.stop()}},e,this,[[0,7]])}));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){return o.createElement("div",null,o.createElement("h1",null,"Images"),o.createElement(F.a,{primary:!0,size:"huge",className:"add-button",onClick:this.handleCreateImage},"Upload new image"),o.createElement(L.a,{clearing:!0}),o.createElement(S.a.Group,null,this.state.images.map(function(e){return o.createElement(R,{key:e.imageId,image:e})})))}}]),t}(o.PureComponent),$=function(e){function t(){return Object(c.a)(this,t),Object(k.a)(this,Object(y.a)(t).apply(this,arguments))}return Object(E.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return o.createElement("h1",null,"Not Found")}}]),t}(o.PureComponent),V=n(345);!function(e){e[e.NoUpload=0]="NoUpload",e[e.UploadingData=1]="UploadingData",e[e.UploadingFile=2]="UploadingFile"}(W||(W={}));var X=function(e){function t(){var e,n;Object(c.a)(this,t);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(n=Object(k.a)(this,(e=Object(y.a)(t)).call.apply(e,[this].concat(r)))).state={title:"",file:void 0,uploadState:W.NoUpload},n.handleTitleChange=function(e){n.setState({title:e.target.value})},n.handleFileChange=function(e){var t=e.target.files;t&&(console.log("File change",t),n.setState({file:t[0]}))},n.handleSubmit=function(){var e=Object(C.a)(w.a.mark(function e(t){var a;return w.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(t.preventDefault(),e.prev=1,n.state.file){e.next=5;break}return alert("File should be selected"),e.abrupt("return");case 5:return n.setUploadState(W.UploadingData),e.next=8,H(n.props.auth.getIdToken(),{groupId:n.props.match.params.groupId,title:n.state.title});case 8:return a=e.sent,console.log("Created image",a),n.setUploadState(W.UploadingFile),e.next=13,J(a.uploadUrl,n.state.file);case 13:alert("Image was uploaded!"),e.next=19;break;case 16:e.prev=16,e.t0=e.catch(1),alert("Could not upload an image: "+e.t0.message);case 19:return e.prev=19,n.setUploadState(W.NoUpload),e.finish(19);case 22:case"end":return e.stop()}},e,null,[[1,16,19,22]])}));return function(t){return e.apply(this,arguments)}}(),n}return Object(E.a)(t,e),Object(s.a)(t,[{key:"setUploadState",value:function(e){this.setState({uploadState:e})}},{key:"render",value:function(){return o.createElement("div",null,o.createElement("h1",null,"Upload new image"),o.createElement(V.a,{onSubmit:this.handleSubmit},o.createElement(V.a.Field,null,o.createElement("label",null,"Title"),o.createElement("input",{placeholder:"Image title",value:this.state.title,onChange:this.handleTitleChange})),o.createElement(V.a.Field,null,o.createElement("label",null,"Image"),o.createElement("input",{type:"file",accept:"image/*",placeholder:"Image to upload",onChange:this.handleFileChange})),this.renderButton()))}},{key:"renderButton",value:function(){return o.createElement("div",null,this.state.uploadState===W.UploadingData&&o.createElement("p",null,"Uploading image metadata"),this.state.uploadState===W.UploadingFile&&o.createElement("p",null,"Uploading file"),o.createElement(F.a,{loading:this.state.uploadState!==W.NoUpload,type:"submit"},"Upload"))}}]),t}(o.PureComponent),Y=function(e){function t(){var e,n;Object(c.a)(this,t);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(n=Object(k.a)(this,(e=Object(y.a)(t)).call.apply(e,[this].concat(r)))).state={name:"",description:"",uploadingGroup:!1},n.handleNameChange=function(e){n.setState({name:e.target.value})},n.handleDescriptionChange=function(e){n.setState({description:e.target.value})},n.handleSubmit=function(){var e=Object(C.a)(w.a.mark(function e(t){var a;return w.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(t.preventDefault(),e.prev=1,n.state.name&&n.state.description){e.next=5;break}return alert("Name and description should be provided"),e.abrupt("return");case 5:return n.setUploadState(!0),e.next=8,A(n.props.auth.getIdToken(),{name:n.state.name,description:n.state.description});case 8:a=e.sent,console.log("Created description",a),alert("Group was created!"),e.next=16;break;case 13:e.prev=13,e.t0=e.catch(1),alert("Could not upload an image: "+e.t0.message);case 16:return e.prev=16,n.setUploadState(!1),e.finish(16);case 19:case"end":return e.stop()}},e,null,[[1,13,16,19]])}));return function(t){return e.apply(this,arguments)}}(),n}return Object(E.a)(t,e),Object(s.a)(t,[{key:"setUploadState",value:function(e){this.setState({uploadingGroup:e})}},{key:"render",value:function(){return o.createElement("div",null,o.createElement("h1",null,"Upload new group"),o.createElement(V.a,{onSubmit:this.handleSubmit},o.createElement(V.a.Field,null,o.createElement("label",null,"Name"),o.createElement("input",{placeholder:"Group name",value:this.state.name,onChange:this.handleNameChange})),o.createElement(V.a.Field,null,o.createElement("label",null,"Description"),o.createElement("input",{placeholder:"Group description",value:this.state.description,onChange:this.handleDescriptionChange})),this.renderButton()))}},{key:"renderButton",value:function(){return o.createElement(F.a,{loading:this.state.uploadingGroup,type:"submit"},"Create")}}]),t}(o.PureComponent),Z=function(e){function t(e){var n;return Object(c.a)(this,t),(n=Object(k.a)(this,Object(y.a)(t).call(this,e))).handleLogin=n.handleLogin.bind(Object(j.a)(Object(j.a)(n))),n.handleLogout=n.handleLogout.bind(Object(j.a)(Object(j.a)(n))),n}return Object(E.a)(t,e),Object(s.a)(t,[{key:"handleLogin",value:function(){this.props.auth.login()}},{key:"handleLogout",value:function(){this.props.auth.logout()}},{key:"render",value:function(){return i.a.createElement("div",null,i.a.createElement(G.a,{style:{padding:"8em 0em"},vertical:!0},i.a.createElement(P.a,{container:!0,stackable:!0,verticalAlign:"middle"},i.a.createElement(P.a.Row,null,i.a.createElement(P.a.Column,{width:16},i.a.createElement(d.b,{history:this.props.history},this.generateMenu(),this.generateCurrentPage()))))))}},{key:"generateMenu",value:function(){return i.a.createElement(B.a,null,i.a.createElement(B.a.Item,{name:"home"},i.a.createElement(x.a,{to:"/"},"Home")),i.a.createElement(B.a.Menu,{position:"right"},this.logInLogOutButton()))}},{key:"logInLogOutButton",value:function(){return this.props.auth.isAuthenticated()?i.a.createElement(B.a.Item,{name:"logout",onClick:this.handleLogout},"Log Out"):i.a.createElement(B.a.Item,{name:"login",onClick:this.handleLogin},"Log In")}},{key:"generateCurrentPage",value:function(){var e=this;return i.a.createElement(d.c,null,i.a.createElement(d.a,{path:"/groups/create",exact:!0,render:function(t){return i.a.createElement(Y,Object.assign({},t,{auth:e.props.auth}))}}),i.a.createElement(d.a,{path:"/images/:groupId",exact:!0,component:K}),i.a.createElement(d.a,{path:"/images/:groupId/create",exact:!0,render:function(t){return i.a.createElement(X,Object.assign({},t,{auth:e.props.auth}))}}),i.a.createElement(d.a,{path:"/",exact:!0,component:N}),i.a.createElement(d.a,{component:$}))}}]),t}(o.Component),ee=b()(),te=new h(ee);r.a.render(i.a.createElement(d.b,{history:ee},i.a.createElement("div",null,i.a.createElement(d.a,{path:"/callback",render:function(e){return function(e){var t=e.location;/access_token|id_token|error/.test(t.hash)&&te.handleAuthentication()}(e),i.a.createElement(f,null)}}),i.a.createElement(d.a,{render:function(e){return i.a.createElement(Z,Object.assign({auth:te},e))}}))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[190,1,2]]]);
//# sourceMappingURL=main.da47207a.chunk.js.map