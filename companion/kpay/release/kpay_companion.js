/*
* K·Pay Integration Library - v3.0.0 - Copyright Kiezel 2020
* Last Modified: 2020-08-07
*
* BECAUSE THE LIBRARY IS LICENSED FREE OF CHARGE, THERE IS NO 
* WARRANTY FOR THE LIBRARY, TO THE EXTENT PERMITTED BY APPLICABLE 
* LAW. EXCEPT WHEN OTHERWISE STATED IN WRITING THE COPYRIGHT 
* HOLDERS AND/OR OTHER PARTIES PROVIDE THE LIBRARY "AS IS" 
* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESSED OR IMPLIED, 
* INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF 
* MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE. THE ENTIRE
* RISK AS TO THE QUALITY AND PERFORMANCE OF THE LIBRARY IS WITH YOU.
* SHOULD THE LIBRARY PROVE DEFECTIVE, YOU ASSUME THE COST OF ALL 
* NECESSARY SERVICING, REPAIR OR CORRECTION.
* 
* IN NO EVENT UNLESS REQUIRED BY APPLICABLE LAW OR AGREED TO IN 
* WRITING WILL ANY COPYRIGHT HOLDER, OR ANY OTHER PARTY WHO MAY 
* MODIFY AND/OR REDISTRIBUTE THE LIBRARY AS PERMITTED ABOVE, BE 
* LIABLE TO YOU FOR DAMAGES, INCLUDING ANY GENERAL, SPECIAL, 
* INCIDENTAL OR CONSEQUENTIAL DAMAGES ARISING OUT OF THE USE OR 
* INABILITY TO USE THE LIBRARY (INCLUDING BUT NOT LIMITED TO LOSS
* OF DATA OR DATA BEING RENDERED INACCURATE OR LOSSES SUSTAINED BY 
* YOU OR THIRD PARTIES OR A FAILURE OF THE LIBRARY TO OPERATE WITH
* ANY OTHER SOFTWARE), EVEN IF SUCH HOLDER OR OTHER PARTY HAS BEEN 
* ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
*/

/*****************************************************************************************/
/*                 GENERATED CODE BELOW THIS LINE - DO NOT MODIFY!                       */
/*****************************************************************************************/

//import { localStorage } from "local-storage"
var localStorageModule = require('local-storage').localStorage;    //because normal import currently doesn't work on Android
import { device } from "peer";
import * as messaging from 'messaging';
import { outbox } from "file-transfer";
import * as cbor from 'cbor';
import * as kcm from '../../../common/kpay/kpay_common.js';
import { me } from "companion";
import * as appClusterStorage from "app-cluster-storage";
var e="fb3.0.0",n=3e3,t=5e3,u=25e3,o=1e4,a=864e5,s=null,f=null,m=null,p=null,v=null,x=null,T="kpay_nextRecheckTimeLocalstorageKey",g="kpay_lastStatusResultLocalstorageKey",y="kpay_flagsLocalstorageKey",k="kpay_appIdLocalstorageKey",h="kpay_accountTokenLocalstorageKey",S=null,_=null,w=null,b=!1,N=!1,D=0,I=0,R=!1,C=!1,M=0,U=null,K=null,L=function(){},J=de,O=appClusterStorage.get("there.wolf.484");export function initialize(){de(),messaging.peerSocket.addEventListener("open",E),messaging.peerSocket.addEventListener("message",W),messaging.peerSocket.addEventListener("error",H),messaging.peerSocket.addEventListener("closed",Q),setTimeout(ee,6e4)}export function setEventHandler(e){L=e}export function setAccountTokenGenerator(e){J=e}export function startPurchase(){P(kcm.purchaseMessageFilename,{purchase:"start"})}export function cancelPurchase(){P(kcm.purchaseMessageFilename,{purchase:"cancel"})}function P(e,n,t,u){var o=function(){t&&t()},a=function(e){u&&u()};if((null==_||z())&&outbox.enqueue(e,cbor.encode(n)).then(o).catch(a),null==_||A())try{0===messaging.peerSocket.readyState?(messaging.peerSocket.send(n),o()):a("PeerSocket closed")}catch(e){a(e)}}function z(){return!A()}function A(){return 0==(64&_)}function F(){return 0!=(2&_)}function B(){return 0!=(4&_)}function E(){null!==xe()&&"licensed"!==xe().status&&pe()}function W(e){var n=e.data;if(kcm.isKPayMessage(n))if(j(n)){if(b&&S===n.appId&&_===n.flags){var o=(new Date).getTime();if(R&&!C&&o-I<u)return;if(o-D<t)return}S=n.appId,_=n.flags,null!==xe()&&"unlicensed"!==xe().status&&pe(),V(),f&&(clearTimeout(f),f=null),f=setTimeout(Z,15e3)}else q(n)&&(b=!1,pe(),s&&(clearTimeout(s),s=null),f&&(clearTimeout(f),f=null),R&&se())}function j(e){return kcm.isKPayMessage(e)&&0===e.type}function q(e){return kcm.isKPayMessage(e)&&3===e.type}function G(e){return{isKpayMsg:!0,type:1,serverResponse:e}}function H(e){}function Q(e){}function V(){b=!0;var t=(new Date).getTime(),u=J(),o=ge(),a="https://api.kiezelpay.com/api/v2/status?";a+="appid="+encodeURIComponent(S),a+="&accounttoken="+encodeURIComponent(u),a+="&platform=fitbit",a+="&device="+encodeURIComponent(o),F()&&(a+="&test=true"),B()&&(a+="&skiptrial=true"),a+="&nocache="+encodeURIComponent(t),a+="&libv="+encodeURIComponent(e),fetch(a).then(function(e){return e.json()}).then(function(e){N=!1,D=(new Date).getTime(),e&&e.hasOwnProperty("status")&&X(e)}).catch(function(e){D=(new Date).getTime(),N||!b||null!==xe()&&"licensed"===xe().status||(s&&(clearTimeout(s),s=null),s=setTimeout(V,n)),N=!1})}function X(e){"unlicensed"===e.status&&(M=Number(e.paymentCode)),null!==xe()&&xe().status===e.status&&("unlicensed"!==xe().status||xe().purchaseStatus===e.purchaseStatus&&xe().paymentCode===e.paymentCode&&xe().checksum===e.checksum)||P(kcm.statusMessageFilename,G(e),function(){if("licensed"===e.status)Y(7,null,!1);else if("trial"===e.status){var n=Math.round((new Date).getTime()/1e3)+Number(e.trialDurationInSeconds),t=new Date;t.setTime(1e3*n),Y(3,t,!1)}else if("unlicensed"===e.status){var u=Number(e.paymentCode),o=null==xe()||u!==xe().paymentCode;"waitForUser"==e.purchaseStatus?Y(5,u,o):"inProgress"==e.purchaseStatus&&Y(6,u,o)}ve(e)},function(){}),"licensed"===e.status||"trial"===e.status?("licensed"===e.status?$(e):ue(),b=!1,f&&(clearTimeout(f),f=null),se()):(ue(),C||R?C&&(s&&(clearTimeout(s),s=null),s=setTimeout(V,n)):ie())}function Y(e,n,t){if(K!==e||t){K=e;try{L(e,n)}catch(e){}}}function Z(){var e=(new Date).getTime();b&&(R&&!C&&e-I>=u||(!R||C)&&e-D>=15e3)&&(null===xe()||"licensed"!==xe().status&&"trial"!==xe().status)&&(s&&(clearTimeout(s),s=null),s=setTimeout(V,0)),f&&(clearTimeout(f),f=null),f=setTimeout(Z,15e3)}function $(e){e&&"licensed"===e.status&&ne(86400*e.validityPeriodInDays*1e3,!1)}function ee(){var e=ye(T,null);null!==e&&ne(e-(new Date).getTime(),!0)}function ne(e,n){n||(ke(y,_),ke(k,S)),e<0?le():te(e)}function te(e){ue();var n=new Date,t=e/1e3;n.setSeconds(n.getSeconds()+t),ke(T,n.getTime()),m&&(clearTimeout(m),m=null),m=setTimeout(le,e)}function ue(){m&&(clearTimeout(m),m=null),he(T)}function le(){_=ye(y,_),S=ye(k,S),te(a),b||(N=!0,V())}function ie(){if(!C&&!R&&null===U){var n=J(),t=ge(),o={type:"register.v2",purchaseCode:M,data:{appid:S,accounttoken:n,platform:"fitbit",t:t,test:F(),u:B(),libv:e}},a="wss://socket.kiezelpay.com";v&&(clearTimeout(v),v=null),v=setTimeout(function(){R||(C=!0,V(),ce())},3e3);try{(U=new WebSocket(a)).onopen=function(e){R=!0,C=!1,ae(U,o)},U.onmessage=function(e){if(R){I=(new Date).getTime();var n=JSON.parse(e.data);if(n&&"registerReponse"==n.type&&n.keepAliveTimeout)u=n.keepAliveTimeout,p&&(clearTimeout(p),p=null),p=setTimeout(function(){oe(U)},u);else if(n&&"statusUpdate"==n.type){if(!n.data||!n.data.hasOwnProperty("status"))return;X(n.data)}}else try{U.close()}catch(e){}},U.onerror=function(e){R=!1,C=!0;try{U.close()}catch(e){}U=null,ce(),V()},U.onclose=function(e){if(R){if(R=!1,null!==U)try{U.close()}catch(e){}U=null,C=!0,ce(),V()}}}catch(e){}}}function oe(e){C||(ae(e,{type:"keepAlive"}),null!==p&&(clearTimeout(p),p=null),p=setTimeout(function(){oe(e)},u))}function ce(){x&&(clearTimeout(x),x=null),x=setTimeout(function(){C=!1},o)}function ae(e,n){try{if(1===e.readyState){var t=JSON.stringify(n);e.send(t)}else re()}catch(e){re()}}function re(){R=!1,C=!0;try{U.close()}catch(e){}U=null,ce(),V()}function se(){if(null!==v&&(clearTimeout(v),v=null),null!==p&&(clearTimeout(p),p=null),R=!1,null!==U)try{U.close()}catch(e){}U=null,b=!1}function fe(e){for(var n=[],i=0;i<e.length;i+=2)n.push(parseInt(e.substr(i,2),16));return n}function de(){var e=null;return me.permissions.granted("access_app_cluster_storage")&&null!==O&&(e=O.getItem(h)),null!==e&&void 0!==e&&"undefined"!==e||(null!==(e=localStorageModule.getItem(h))&&void 0!==e&&"undefined"!==e||(e=Te(),ke(h,e)),me.permissions.granted("access_app_cluster_storage")&&null!==O&&O.setItem(h,e)),e}function pe(){w=null,he(g)}function ve(e){w=e,ke(g,JSON.stringify(w))}function xe(){if(null===w){var e=localStorageModule.getItem(g);null!==e&&void 0!==e&&"undefined"!==e&&(w=JSON.parse(e))}return w}function Te(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(c){var r=16*Math.random()|0;return("x"==c?r:3&r|8).toString(16)})}function ge(){return device.modelName.toLowerCase()}function ye(e,n){var t=localStorageModule.getItem(e);if(null!==t&&void 0!==t&&"undefined"!==t&&!isNaN(t)){var u=Number(t);if(!isNaN(u))return u}return n}function ke(e,n){null!==n&&void 0!==n&&localStorageModule.setItem(e,n.toString())}function he(e){localStorageModule.removeItem(e)}