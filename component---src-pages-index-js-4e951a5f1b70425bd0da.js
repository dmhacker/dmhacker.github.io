(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{"0mN4":function(e,t,r){"use strict";r("OGtf")("fixed",(function(e){return function(){return e(this,"tt","","")}}))},"9eSz":function(e,t,r){"use strict";r("rGqo"),r("yt8O"),r("Btvt"),r("XfO3"),r("EK0E"),r("0mN4");var a=r("TqRt");t.__esModule=!0,t.default=void 0;var n,o=a(r("PJYZ")),i=a(r("VbXa")),l=a(r("8OQS")),s=a(r("pVnL")),c=a(r("q1tI")),d=a(r("17x9")),u=function(e){var t=(0,s.default)({},e),r=t.resolutions,a=t.sizes,n=t.critical;return r&&(t.fixed=r,delete t.resolutions),a&&(t.fluid=a,delete t.sizes),n&&(t.loading="eager"),t.fluid&&(t.fluid=w([].concat(t.fluid))),t.fixed&&(t.fixed=w([].concat(t.fixed))),t},f=function(e){var t=e.fluid,r=e.fixed;return(t&&t[0]||r&&r[0]).src},p=Object.create({}),m=function(e){var t=u(e),r=f(t);return p[r]||!1},h="undefined"!=typeof HTMLImageElement&&"loading"in HTMLImageElement.prototype,g="undefined"!=typeof window,b=g&&window.IntersectionObserver,v=new WeakMap;function y(e){return e.map((function(e){var t=e.src,r=e.srcSet,a=e.srcSetWebp,n=e.media,o=e.sizes;return c.default.createElement(c.default.Fragment,{key:t},a&&c.default.createElement("source",{type:"image/webp",media:n,srcSet:a,sizes:o}),c.default.createElement("source",{media:n,srcSet:r,sizes:o}))}))}function w(e){var t=[],r=[];return e.forEach((function(e){return(e.media?t:r).push(e)})),[].concat(t,r)}function E(e){return e.map((function(e){var t=e.src,r=e.media,a=e.tracedSVG;return c.default.createElement("source",{key:t,media:r,srcSet:a})}))}function k(e){return e.map((function(e){var t=e.src,r=e.media,a=e.base64;return c.default.createElement("source",{key:t,media:r,srcSet:a})}))}function S(e,t){var r=e.srcSet,a=e.srcSetWebp,n=e.media,o=e.sizes;return"<source "+(t?"type='image/webp' ":"")+(n?'media="'+n+'" ':"")+'srcset="'+(t?a:r)+'" '+(o?'sizes="'+o+'" ':"")+"/>"}var x=function(e,t){var r=(void 0===n&&"undefined"!=typeof window&&window.IntersectionObserver&&(n=new window.IntersectionObserver((function(e){e.forEach((function(e){if(v.has(e.target)){var t=v.get(e.target);(e.isIntersecting||e.intersectionRatio>0)&&(n.unobserve(e.target),v.delete(e.target),t())}}))}),{rootMargin:"200px"})),n);return r&&(r.observe(e),v.set(e,t)),function(){r.unobserve(e),v.delete(e)}},C=function(e){var t=e.src?'src="'+e.src+'" ':'src="" ',r=e.sizes?'sizes="'+e.sizes+'" ':"",a=e.srcSet?'srcset="'+e.srcSet+'" ':"",n=e.title?'title="'+e.title+'" ':"",o=e.alt?'alt="'+e.alt+'" ':'alt="" ',i=e.width?'width="'+e.width+'" ':"",l=e.height?'height="'+e.height+'" ':"",s=e.crossOrigin?'crossorigin="'+e.crossOrigin+'" ':"",c=e.loading?'loading="'+e.loading+'" ':"",d=e.draggable?'draggable="'+e.draggable+'" ':"";return"<picture>"+e.imageVariants.map((function(e){return(e.srcSetWebp?S(e,!0):"")+S(e)})).join("")+"<img "+c+i+l+r+a+t+o+n+s+d+'style="position:absolute;top:0;left:0;opacity:1;width:100%;height:100%;object-fit:cover;object-position:center"/></picture>'},O=function(e){var t=e.src,r=e.imageVariants,a=e.generateSources,n=e.spreadProps,o=c.default.createElement(L,(0,s.default)({src:t},n));return r.length>1?c.default.createElement("picture",null,a(r),o):o},L=c.default.forwardRef((function(e,t){var r=e.sizes,a=e.srcSet,n=e.src,o=e.style,i=e.onLoad,d=e.onError,u=e.loading,f=e.draggable,p=(0,l.default)(e,["sizes","srcSet","src","style","onLoad","onError","loading","draggable"]);return c.default.createElement("img",(0,s.default)({sizes:r,srcSet:a,src:n},p,{onLoad:i,onError:d,ref:t,loading:u,draggable:f,style:(0,s.default)({position:"absolute",top:0,left:0,width:"100%",height:"100%",objectFit:"cover",objectPosition:"center"},o)}))}));L.propTypes={style:d.default.object,onError:d.default.func,onLoad:d.default.func};var z=function(e){function t(t){var r;(r=e.call(this,t)||this).seenBefore=g&&m(t),r.isCritical="eager"===t.loading||t.critical,r.addNoScript=!(r.isCritical&&!t.fadeIn),r.useIOSupport=!h&&b&&!r.isCritical&&!r.seenBefore;var a=r.isCritical||g&&(h||!r.useIOSupport);return r.state={isVisible:a,imgLoaded:!1,imgCached:!1,fadeIn:!r.seenBefore&&t.fadeIn},r.imageRef=c.default.createRef(),r.handleImageLoaded=r.handleImageLoaded.bind((0,o.default)(r)),r.handleRef=r.handleRef.bind((0,o.default)(r)),r}(0,i.default)(t,e);var r=t.prototype;return r.componentDidMount=function(){if(this.state.isVisible&&"function"==typeof this.props.onStartLoad&&this.props.onStartLoad({wasCached:m(this.props)}),this.isCritical){var e=this.imageRef.current;e&&e.complete&&this.handleImageLoaded()}},r.componentWillUnmount=function(){this.cleanUpListeners&&this.cleanUpListeners()},r.handleRef=function(e){var t=this;this.useIOSupport&&e&&(this.cleanUpListeners=x(e,(function(){var e=m(t.props);t.state.isVisible||"function"!=typeof t.props.onStartLoad||t.props.onStartLoad({wasCached:e}),t.setState({isVisible:!0},(function(){return t.setState({imgLoaded:e,imgCached:!!t.imageRef.current.currentSrc})}))})))},r.handleImageLoaded=function(){var e,t,r;e=this.props,t=u(e),r=f(t),p[r]=!0,this.setState({imgLoaded:!0}),this.props.onLoad&&this.props.onLoad()},r.render=function(){var e=u(this.props),t=e.title,r=e.alt,a=e.className,n=e.style,o=void 0===n?{}:n,i=e.imgStyle,l=void 0===i?{}:i,d=e.placeholderStyle,f=void 0===d?{}:d,p=e.placeholderClassName,m=e.fluid,h=e.fixed,g=e.backgroundColor,b=e.durationFadeIn,v=e.Tag,w=e.itemProp,S=e.loading,x=e.draggable,z=!1===this.state.fadeIn||this.state.imgLoaded,N=!0===this.state.fadeIn&&!this.state.imgCached,I=(0,s.default)({opacity:z?1:0,transition:N?"opacity "+b+"ms":"none"},l),F="boolean"==typeof g?"lightgray":g,_={transitionDelay:b+"ms"},j=(0,s.default)({opacity:this.state.imgLoaded?0:1},N&&_,{},l,{},f),R={title:t,alt:this.state.isVisible?"":r,style:j,className:p,itemProp:w};if(m){var P=m,V=P[0];return c.default.createElement(v,{className:(a||"")+" gatsby-image-wrapper",style:(0,s.default)({position:"relative",overflow:"hidden"},o),ref:this.handleRef,key:"fluid-"+JSON.stringify(V.srcSet)},c.default.createElement(v,{style:{width:"100%",paddingBottom:100/V.aspectRatio+"%"}}),F&&c.default.createElement(v,{title:t,style:(0,s.default)({backgroundColor:F,position:"absolute",top:0,bottom:0,opacity:this.state.imgLoaded?0:1,right:0,left:0},N&&_)}),V.base64&&c.default.createElement(O,{src:V.base64,spreadProps:R,imageVariants:P,generateSources:k}),V.tracedSVG&&c.default.createElement(O,{src:V.tracedSVG,spreadProps:R,imageVariants:P,generateSources:E}),this.state.isVisible&&c.default.createElement("picture",null,y(P),c.default.createElement(L,{alt:r,title:t,sizes:V.sizes,src:V.src,crossOrigin:this.props.crossOrigin,srcSet:V.srcSet,style:I,ref:this.imageRef,onLoad:this.handleImageLoaded,onError:this.props.onError,itemProp:w,loading:S,draggable:x})),this.addNoScript&&c.default.createElement("noscript",{dangerouslySetInnerHTML:{__html:C((0,s.default)({alt:r,title:t,loading:S},V,{imageVariants:P}))}}))}if(h){var T=h,D=T[0],G=(0,s.default)({position:"relative",overflow:"hidden",display:"inline-block",width:D.width,height:D.height},o);return"inherit"===o.display&&delete G.display,c.default.createElement(v,{className:(a||"")+" gatsby-image-wrapper",style:G,ref:this.handleRef,key:"fixed-"+JSON.stringify(D.srcSet)},F&&c.default.createElement(v,{title:t,style:(0,s.default)({backgroundColor:F,width:D.width,opacity:this.state.imgLoaded?0:1,height:D.height},N&&_)}),D.base64&&c.default.createElement(O,{src:D.base64,spreadProps:R,imageVariants:T,generateSources:k}),D.tracedSVG&&c.default.createElement(O,{src:D.tracedSVG,spreadProps:R,imageVariants:T,generateSources:E}),this.state.isVisible&&c.default.createElement("picture",null,y(T),c.default.createElement(L,{alt:r,title:t,width:D.width,height:D.height,sizes:D.sizes,src:D.src,crossOrigin:this.props.crossOrigin,srcSet:D.srcSet,style:I,ref:this.imageRef,onLoad:this.handleImageLoaded,onError:this.props.onError,itemProp:w,loading:S,draggable:x})),this.addNoScript&&c.default.createElement("noscript",{dangerouslySetInnerHTML:{__html:C((0,s.default)({alt:r,title:t,loading:S},D,{imageVariants:T}))}}))}return null},t}(c.default.Component);z.defaultProps={fadeIn:!0,durationFadeIn:500,alt:"",Tag:"div",loading:"lazy"};var N=d.default.shape({width:d.default.number.isRequired,height:d.default.number.isRequired,src:d.default.string.isRequired,srcSet:d.default.string.isRequired,base64:d.default.string,tracedSVG:d.default.string,srcWebp:d.default.string,srcSetWebp:d.default.string,media:d.default.string}),I=d.default.shape({aspectRatio:d.default.number.isRequired,src:d.default.string.isRequired,srcSet:d.default.string.isRequired,sizes:d.default.string.isRequired,base64:d.default.string,tracedSVG:d.default.string,srcWebp:d.default.string,srcSetWebp:d.default.string,media:d.default.string});z.propTypes={resolutions:N,sizes:I,fixed:d.default.oneOfType([N,d.default.arrayOf(N)]),fluid:d.default.oneOfType([I,d.default.arrayOf(I)]),fadeIn:d.default.bool,durationFadeIn:d.default.number,title:d.default.string,alt:d.default.string,className:d.default.oneOfType([d.default.string,d.default.object]),critical:d.default.bool,crossOrigin:d.default.oneOfType([d.default.string,d.default.bool]),style:d.default.object,imgStyle:d.default.object,placeholderStyle:d.default.object,placeholderClassName:d.default.string,backgroundColor:d.default.oneOfType([d.default.string,d.default.bool]),onLoad:d.default.func,onError:d.default.func,onStartLoad:d.default.func,Tag:d.default.string,itemProp:d.default.string,loading:d.default.oneOf(["auto","lazy","eager"]),draggable:d.default.bool};var F=z;t.default=F},OGtf:function(e,t,r){var a=r("XKFU"),n=r("eeVq"),o=r("vhPU"),i=/"/g,l=function(e,t,r,a){var n=String(o(e)),l="<"+t;return""!==r&&(l+=" "+r+'="'+String(a).replace(i,"&quot;")+'"'),l+">"+n+"</"+t+">"};e.exports=function(e,t){var r={};r[e]=t(l),a(a.P+a.F*n((function(){var t=""[e]('"');return t!==t.toLowerCase()||t.split('"').length>3})),"String",r)}},RXBc:function(e,t,r){"use strict";r.r(t);var a=r("q1tI"),n=r.n(a),o=r("Wbzz"),i=r("9eSz"),l=r.n(i);r("HAE/"),r("WLL4"),r("jm62"),r("8+KV"),r("0l/t"),r("ioFf"),r("rGqo"),r("yt8O"),r("Btvt"),r("RW0V");function s(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function c(e,t){for(var r=0;r<t.length;r++){var a=t[r];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function d(e){return(d="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function u(e){return(u="function"==typeof Symbol&&"symbol"===d(Symbol.iterator)?function(e){return d(e)}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":d(e)})(e)}function f(e,t){return!t||"object"!==u(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function p(e){return(p=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function m(e,t){return(m=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function h(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}var g=function(e){function t(e){var r;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),(r=f(this,p(t).call(this,e))).$=n.a.createRef(),r._=n.a.createRef(),r}var a,o,i;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&m(e,t)}(t,e),a=t,(o=[{key:"render",value:function(){return n.a.createElement("span",{ref:this.$},n.a.createElement("a",function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?h(Object(r),!0).forEach((function(t){s(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):h(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}({},this.props,{ref:this._}),this.props.children))}},{key:"componentDidMount",value:function(){this.paint()}},{key:"getSnapshotBeforeUpdate",value:function(){return this.reset(),null}},{key:"componentDidUpdate",value:function(){this.paint()}},{key:"componentWillUnmount",value:function(){this.reset()}},{key:"paint",value:function(){var e=this,t=this.$.current.appendChild(document.createElement("span"));Promise.resolve().then(r.bind(null,"q01k")).then((function(r){(0,r.render)(t.appendChild(e._.current),(function(e){try{t.parentNode.replaceChild(e,t)}catch(t){}}))}))}},{key:"reset",value:function(){this.$.current.replaceChild(this._.current,this.$.current.lastChild)}}])&&c(a.prototype,o),i&&c(a,i),t}(a.PureComponent),b=r("vrFN"),v=r("He4Z");r("CgLU"),r("SJKF"),r("vg9a");r.d(t,"FluidImage",(function(){return w})),r.d(t,"query",(function(){return E}));var y=function(e){var t,r;function a(){return e.apply(this,arguments)||this}return r=e,(t=a).prototype=Object.create(r.prototype),t.prototype.constructor=t,t.__proto__=r,a.prototype.render=function(){var e=this.props.data,t=[{key:"dmhacker/arch-linux-surface",title:"Arch Linux Kernel Patcher for Surface Devices",description:n.a.createElement("span",{className:"small-text"},"Autogenerates PKGBUILDs and setup scripts for ",n.a.createElement("a",{href:"https://github.com/jakeday/linux-surface"},"jakeday's patched kernel"),", so that you can run Arch Linux comfortably on a Microsoft Surface device.")},{key:"dmhacker/alexa-youtube-skill",title:"Alexa YouTube Skill",description:n.a.createElement("span",{className:"small-text"},"Enables Alexa to play audio from YouTube. The project wiki has detailed instructions that walk you through the setup process.")},{key:"dmhacker/dual-ec-drbg",title:"Dual_EC_DRBG Backdoor Demonstration",description:n.a.createElement("span",{className:"small-text"},"Demonstrates how a ",n.a.createElement("a",{href:"http://rump2007.cr.yp.to/15-shumow.pdf"},"Shumlow-Ferguson attack")," could be used to recover the internal state of any Dual_EC_DRBG pseudorandom number generator.")},{key:"dmhacker/rlwe",title:"Ring Learning with Errors Cryptography",description:n.a.createElement("span",{className:"small-text"},"Implements several cryptographic schemes that are based off of the security of the RLWE problem: the ",n.a.createElement("a",{href:"https://eprint.iacr.org/2012/144.pdf"},"Fan-Vercauteren homomorphic cryptosystem"),", the ",n.a.createElement("a",{href:"https://eprint.iacr.org/2016/030.pdf"},"Ring-TESLA digital signature")," algorithm, etc.")}],r=[{key:"/sim/tsp",title:"TSP Approximation Algorithms",description:n.a.createElement("span",{className:"small-text"},"A visual comparison of simulated annealing and hill climbing algorithms. ",n.a.createElement("a",{href:"https://www.reddit.com/r/InternetIsBeautiful/comments/5rqirw/3d_visualization_of_the_travelling_salesman/"},"Shared")," on /r/InternetIsBeautiful.")},{key:"/sim/nnet",title:"2D Feedforward Neural Network",description:n.a.createElement("span",{className:"small-text"},"Watch as a neural network is trained in your browser. Optionally supply your own training set.")},{key:"/sim/lant",title:"3D Adaptation of Langton's Ant",description:n.a.createElement("span",{className:"small-text"},"Based off of ",n.a.createElement("a",{href:"https://pdfs.semanticscholar.org/5738/247ce6f97ab59317f7a27ef9b03781c6d79b.pdf"},"this research paper"),". Configure what path it generates using your own ruleset.")},{key:"/sim/geometric-plotter",title:"3D Function Plotter & Grapher",description:n.a.createElement("span",{className:"small-text"},"3D graphing tool to help with visualizing volumes of solids of revolution (calculus I).")}];return n.a.createElement("div",null,n.a.createElement(b.a,{title:"Home",keywords:[]}),n.a.createElement("div",{className:"container"},n.a.createElement("div",{className:"row medium-separation"},n.a.createElement("div",{className:"twelve columns"},n.a.createElement(l.a,{fluid:e.profile.childImageSharp.fluid,className:"profile-image"}))),n.a.createElement("div",{className:"row small-separation"},n.a.createElement("div",{className:"twelve columns"},n.a.createElement("h2",{className:"profile-heading"},"David Hacker"))),n.a.createElement("div",{className:"row small-separation"},n.a.createElement("div",{className:"twelve columns"},n.a.createElement("p",null,"Hello! I'm an undergraduate at the University of California San Diego (UCSD), and I am pursuing a B.S in computer science with a minor in mathematics, likely graduating 2021. I am particularly interested in cryptography, distributed computing, program synthesis, and natural language processing. I also enjoy learning about and working with graphics & data visualization techniques."),n.a.createElement("p",null,"Last summer, I worked at ",n.a.createElement("a",{href:"https://www.linkedin.com/in/dmhacker/"},"Bloomberg")," as a software engineering intern. I was part of their market data infrastructure team, which manages the systems that relay equities data from various stock exchanges to applications on the Bloomberg Terminal. This summer, I'll be a software engineering intern at ",n.a.createElement("a",{href:"https://www.citadel.com/"},"Citadel"),"."),n.a.createElement("p",null,"I'm a big fan of the Unix philosophy, *nix systems in general, vim and zsh. You can find my dotfiles ",n.a.createElement("a",{href:"https://github.com/dmhacker/dotfiles"},"here"),"."))),n.a.createElement("hr",null),n.a.createElement("div",{className:"row small-separation"},n.a.createElement("div",{className:"twelve columns"},n.a.createElement("div",{className:"row"},n.a.createElement("h4",null,"My Blog"),n.a.createElement("p",null,"I enjoy writing about topics that interest me, covering a broad spectrum of fields but mostly focusing on issues related to computer science, engineering, programming, and system design."),n.a.createElement(v.a,{posts:e.allMarkdownRemark.edges}))),n.a.createElement("div",{className:"twelve columns"},n.a.createElement("div",{className:"row center"},n.a.createElement(o.Link,{to:"/blog"},"View All Posts ...")))),n.a.createElement("hr",null),n.a.createElement("div",{className:"row small-separation"},n.a.createElement("div",{className:"six columns"},n.a.createElement("div",{className:"row"},n.a.createElement("h4",null,"Some Projects"),t.map((function(e){return n.a.createElement("p",null,n.a.createElement("span",{className:"subtitle-text"},e.title),n.a.createElement("br",null),n.a.createElement(g,{href:"https://github.com/"+e.key,"data-icon":"octicon-star","data-show-count":"true","aria-label":"Star "+e.tag+" on GitHub"},"Star"),n.a.createElement("br",null),e.description,n.a.createElement("br",null))})),n.a.createElement("p",null,"And more on GitHub ...",n.a.createElement("br",null),n.a.createElement(g,{href:"https://github.com/dmhacker","aria-label":"Follow @dmhacker on GitHub"},"Follow @dmhacker")))),n.a.createElement("div",{className:"six columns"},n.a.createElement("div",{className:"row"},n.a.createElement("h4",null,"Cool Visualizations"),r.map((function(e){return n.a.createElement("p",null,n.a.createElement("a",{className:"subtitle-text",href:e.key},e.title),n.a.createElement("br",null),e.description)})))))))},a}(n.a.Component),w=(t.default=y,"2332592788"),E="86808321"},WLL4:function(e,t,r){var a=r("XKFU");a(a.S+a.F*!r("nh4g"),"Object",{defineProperties:r("FJW5")})},jm62:function(e,t,r){var a=r("XKFU"),n=r("mQtv"),o=r("aCFj"),i=r("EemH"),l=r("8a7r");a(a.S,"Object",{getOwnPropertyDescriptors:function(e){for(var t,r,a=o(e),s=i.f,c=n(a),d={},u=0;c.length>u;)void 0!==(r=s(a,t=c[u++]))&&l(d,t,r);return d}})},mQtv:function(e,t,r){var a=r("kJMx"),n=r("JiEa"),o=r("y3w9"),i=r("dyZX").Reflect;e.exports=i&&i.ownKeys||function(e){var t=a.f(o(e)),r=n.f;return r?t.concat(r(e)):t}},q01k:function(e,t,r){"use strict";r.r(t),r.d(t,"render",(function(){return x}));r("f3/d"),r("pIFo"),r("KKXr");var a=window.document,n=window.Math,o=window.HTMLElement,i=window.XMLHttpRequest,l=function(e){return function(t,r,a){var n=e.createElement(t);if(r)for(var o in r){var i=r[o];null!=i&&(null!=n[o]?n[o]=i:n.setAttribute(o,i))}if(a)for(var l=0,s=a.length;l<s;l++){var c=a[l];n.appendChild("string"==typeof c?e.createTextNode(c):c)}return n}},s=l(a),c=function(e,t){return{}.hasOwnProperty.call(e,t)},d=i&&i.prototype&&"withCredentials"in i.prototype,u=d&&o&&o.prototype.attachShadow&&!o.prototype.attachShadow.prototype,f=function(e,t,r){e.addEventListener?e.addEventListener(t,r,!1):e.attachEvent("on"+t,r)},p=function(e,t,r){e.removeEventListener?e.removeEventListener(t,r,!1):e.detachEvent("on"+t,r)},m={light:".btn{color:#24292e;background-color:#eff3f6;background-image:url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg'%3e%3clinearGradient id='o' x2='0' y2='1'%3e%3cstop stop-color='%23fafbfc'/%3e%3cstop offset='90%25' stop-color='%23eff3f6'/%3e%3c/linearGradient%3e%3crect width='100%25' height='100%25' fill='url(%23o)'/%3e%3c/svg%3e\");background-image:-moz-linear-gradient(top, #fafbfc, #eff3f6 90%);background-image:linear-gradient(180deg, #fafbfc, #eff3f6 90%);filter:progid:DXImageTransform.Microsoft.Gradient(startColorstr='#FFFAFBFC', endColorstr='#FFEEF2F5');border-color:#cdcfd1;border-color:rgba(27,31,35,.2)}:root .btn{filter:none}.btn:focus,.btn:hover{background-color:#e6ebf1;background-image:url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg'%3e%3clinearGradient id='o' x2='0' y2='1'%3e%3cstop stop-color='%23f0f3f6'/%3e%3cstop offset='90%25' stop-color='%23e6ebf1'/%3e%3c/linearGradient%3e%3crect width='100%25' height='100%25' fill='url(%23o)'/%3e%3c/svg%3e\");background-image:-moz-linear-gradient(top, #f0f3f6, #e6ebf1 90%);background-image:linear-gradient(180deg, #f0f3f6, #e6ebf1 90%);filter:progid:DXImageTransform.Microsoft.Gradient(startColorstr='#FFF0F3F6', endColorstr='#FFE5EAF0');background-position:-0.5em;border-color:#acaeb0;border-color:rgba(27,31,35,.35)}:root .btn:focus,:root .btn:hover{filter:none}.btn:active{background-color:#e9ecef;background-image:none;border-color:#acaeb0;border-color:rgba(27,31,35,.35);box-shadow:inset 0 .15em .3em rgba(27,31,35,.15);filter:none}.social-count{color:#24292e;background-color:#fff;border-color:#d1d2d3;border-color:rgba(27,31,35,.2)}.social-count:focus,.social-count:hover{color:#0366d6}.octicon-heart{color:#ea4aaa}",dark:".btn{color:#fafbfc;background-color:#202428;background-image:url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg'%3e%3clinearGradient id='o' x2='0' y2='1'%3e%3cstop stop-color='%232f363d'/%3e%3cstop offset='90%25' stop-color='%23202428'/%3e%3c/linearGradient%3e%3crect width='100%25' height='100%25' fill='url(%23o)'/%3e%3c/svg%3e\");background-image:-moz-linear-gradient(top, #2f363d, #202428 90%);background-image:linear-gradient(180deg, #2f363d, #202428 90%);filter:progid:DXImageTransform.Microsoft.Gradient(startColorstr='#FF2F363D', endColorstr='#FF1E2226');border-color:#2b3138;border-color:rgba(27,31,35,.2)}:root .btn{filter:none}.btn:focus,.btn:hover{background-color:#1b1f23;background-image:url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg'%3e%3clinearGradient id='o' x2='0' y2='1'%3e%3cstop stop-color='%232b3137'/%3e%3cstop offset='90%25' stop-color='%231b1f23'/%3e%3c/linearGradient%3e%3crect width='100%25' height='100%25' fill='url(%23o)'/%3e%3c/svg%3e\");background-image:-moz-linear-gradient(top, #2b3137, #1b1f23 90%);background-image:linear-gradient(180deg, #2b3137, #1b1f23 90%);filter:progid:DXImageTransform.Microsoft.Gradient(startColorstr='#FF2B3137', endColorstr='#FF191D21');background-position:-0.5em;border-color:#252b30;border-color:rgba(27,31,35,.5)}:root .btn:focus,:root .btn:hover{filter:none}.btn:active{background-color:#181b1f;background-image:none;border-color:#252b30;border-color:rgba(27,31,35,.5);box-shadow:inset 0 .15em .3em rgba(27,31,35,.15);filter:none}.social-count{color:#fafbfc;background-color:#1b1f23;border-color:#1b1f23;border-color:rgba(27,31,35,.2)}.social-count:focus,.social-count:hover{color:#2188ff}.octicon-heart{color:#ec6cb9}"},h=function(e,t){return"@media(prefers-color-scheme:"+e+"){"+m[c(m,t)?t:e]+"}"},g=function(e){if(null==e)return m.light;var t=function(e,t,r,a){null==t&&(t="&"),null==r&&(r="="),null==a&&(a=window.decodeURIComponent);for(var n={},o=e.split(t),i=0,l=o.length;i<l;++i){var s=o[i];if(""!==s){var c=s.split(r);n[a(c[0])]=null!=c[1]?a(c.slice(1).join(r)):void 0}}return n}(e,";",":",(function(e){return e.replace(/^[ \t\n\f\r]+|[ \t\n\f\r]+$/g,"")}));return m[c(m,t["no-preference"])?t["no-preference"]:"light"]+h("light",t.light)+h("dark",t.dark)},b={"mark-github":{width:16,height:16,path:'<path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>'},heart:{width:12,height:16,path:'<path fill-rule="evenodd" d="M9 2c-.97 0-1.69.42-2.2 1-.51.58-.78.92-.8 1-.02-.08-.28-.42-.8-1-.52-.58-1.17-1-2.2-1-1.632.086-2.954 1.333-3 3 0 .52.09 1.52.67 2.67C1.25 8.82 3.01 10.61 6 13c2.98-2.39 4.77-4.17 5.34-5.33C11.91 6.51 12 5.5 12 5c-.047-1.69-1.342-2.913-3-3z"/>'},eye:{width:16,height:16,path:'<path fill-rule="evenodd" d="M8.06 2C3 2 0 8 0 8s3 6 8.06 6C13 14 16 8 16 8s-3-6-7.94-6zM8 12c-2.2 0-4-1.78-4-4 0-2.2 1.8-4 4-4 2.22 0 4 1.8 4 4 0 2.22-1.78 4-4 4zm2-4c0 1.11-.89 2-2 2-1.11 0-2-.89-2-2 0-1.11.89-2 2-2 1.11 0 2 .89 2 2z"/>'},star:{width:14,height:16,path:'<path fill-rule="evenodd" d="M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74L14 6z"/>'},"repo-forked":{width:10,height:16,path:'<path fill-rule="evenodd" d="M8 1a1.993 1.993 0 00-1 3.72V6L5 8 3 6V4.72A1.993 1.993 0 002 1a1.993 1.993 0 00-1 3.72V6.5l3 3v1.78A1.993 1.993 0 005 15a1.993 1.993 0 001-3.72V9.5l3-3V4.72A1.993 1.993 0 008 1zM2 4.2C1.34 4.2.8 3.65.8 3c0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3 10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3-10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2z"/>'},"issue-opened":{width:14,height:16,path:'<path fill-rule="evenodd" d="M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 011.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"/>'},"cloud-download":{width:16,height:16,path:'<path fill-rule="evenodd" d="M9 12h2l-3 3-3-3h2V7h2v5zm3-8c0-.44-.91-3-4.5-3C5.08 1 3 2.92 3 5 1.02 5 0 6.52 0 8c0 1.53 1 3 3 3h3V9.7H3C1.38 9.7 1.3 8.28 1.3 8c0-.17.05-1.7 1.7-1.7h1.3V5c0-1.39 1.56-2.7 3.2-2.7 2.55 0 3.13 1.55 3.2 1.8v1.2H12c.81 0 2.7.22 2.7 2.2 0 2.09-2.25 2.2-2.7 2.2h-2V11h2c2.08 0 4-1.16 4-3.5C16 5.06 14.08 4 12 4z"/>'}},v={},y=function(e,t){var r=v[e]||(v[e]=[]);if(!(r.push(t)>1)){var a=function(e){var t;return function(){t||(t=1,e.apply(this,arguments))}}((function(){for(delete v[e];t=r.shift();)t.apply(null,arguments)}));if(d){var n=new i;f(n,"abort",a),f(n,"error",a),f(n,"load",(function(){var e;try{e=JSON.parse(n.responseText)}catch(t){return void a(t)}a(200!==n.status,e)})),n.open("GET",e),n.send()}else{var o=this||window;o._=function(e){o._=null,a(200!==e.meta.status,e.data)};var s=l(o.document)("script",{async:!0,src:e+(/\?/.test(e)?"&":"?")+"callback=_"}),c=function(){o._&&o._({meta:{}})};f(s,"load",c),f(s,"error",c),s.readyState&&function(e,t,r){f(e,"readystatechange",(function a(n){if(t.test(e.readyState))return p(e,"readystatechange",a),r(n)}))}(s,/de|m/,c),o.document.getElementsByTagName("head")[0].appendChild(s)}}},w=function(e,t,r){var a=l(e.ownerDocument),n=e.appendChild(a("style",{type:"text/css"})),o="body{margin:0}a{text-decoration:none;outline:0}.widget{display:inline-block;overflow:hidden;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif;font-size:0;white-space:nowrap}.btn,.social-count{position:relative;display:inline-block;height:14px;padding:2px 5px;font-size:11px;font-weight:600;line-height:14px;vertical-align:bottom;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;background-repeat:repeat-x;background-position:-1px -1px;background-size:110% 110%;border:1px solid}.btn{border-radius:.25em}.btn:not(:last-child){border-radius:.25em 0 0 .25em}.social-count{border-left:0;border-radius:0 .25em .25em 0}.widget-lg .btn,.widget-lg .social-count{height:20px;padding:3px 10px;font-size:12px;line-height:20px}.octicon{display:inline-block;vertical-align:text-top;fill:currentColor}"+g(t["data-color-scheme"]);n.styleSheet?n.styleSheet.cssText=o:n.appendChild(e.ownerDocument.createTextNode(o));var i,s,d=a("a",{className:"btn",href:t.href,target:"_blank",rel:"noopener",innerHTML:(i=t["data-icon"],s=/^large$/i.test(t["data-size"])?16:14,i=(""+i).toLowerCase().replace(/^octicon-/,""),c(b,i)||(i="mark-github"),'<svg viewBox="0 0 '+b[i].width+" "+b[i].height+'" class="octicon octicon-'+i+'" style="width: '+s*b[i].width/b[i].height+"px; height: "+s+'px;" aria-hidden="true">'+b[i].path+"</svg>"),"aria-label":t["aria-label"]||void 0},[" ",a("span",{},[t["data-text"]||""])]),u=e.appendChild(a("div",{className:"widget"+(/^large$/i.test(t["data-size"])?" widget-lg":"")},[d])),f=d.hostname.split(".").reverse();if(""===f[0]&&f.shift(),"com"!==f[0]||"github"!==f[1])return d.href="#",d.target="_self",void r(u);var p=f.length,m=(" /"+d.pathname).split(/\/+/);if(((2===p||3===p&&"gist"===f[2])&&"archive"===m[3]||2===p&&"releases"===m[3]&&"download"===m[4]||3===p&&"codeload"===f[2])&&(d.target="_top"),/^true$/i.test(t["data-show-count"])&&2===p){var h,v;if(!m[2]&&m[1])h=v="followers";else if(!m[3]&&m[2])v="stargazers_count",h="stargazers";else if(m[4]||"subscription"!==m[3])if(m[4]||"fork"!==m[3]){if("issues"!==m[3])return void r(u);v="open_issues_count",h="issues"}else v="forks_count",h="network/members";else v="subscribers_count",h="watchers";var w=m[2]?"/repos/"+m[1]+"/"+m[2]:"/users/"+m[1];y.call(this,"https://api.github.com"+w,(function(e,t){if(!e){var n=t[v];u.appendChild(a("a",{className:"social-count",href:t.html_url+"/"+h,target:"_blank",rel:"noopener","aria-label":n+" "+v.replace(/_count$/,"").replace("_"," ").slice(0,n<2?-1:void 0)+" on GitHub"},[(""+n).replace(/\B(?=(\d{3})+(?!\d))/g,",")]))}r(u)}))}else r(u)},E=window.devicePixelRatio||1,k=function(e){return(E>1?n.ceil(n.round(e*E)/E*2)/2:n.ceil(e))||0},S=function(e,t){e.style.width=t[0]+"px",e.style.height=t[1]+"px"},x=function(e,t){if(null!=e&&null!=t)if(e.getAttribute&&(e=function(e){for(var t={href:e.href,title:e.title,"aria-label":e.getAttribute("aria-label")},r=["icon","color-scheme","text","size","show-count"],a=0,n=r.length;a<n;a++){var o="data-"+r[a];t[o]=e.getAttribute(o)}return null==t["data-text"]&&(t["data-text"]=e.textContent||e.innerText),t}(e)),u){var r=s("span",{title:e.title||void 0});w(r.attachShadow({mode:"closed"}),e,(function(){t(r)}))}else{var o=s("iframe",{src:"javascript:0",title:e.title||void 0,allowtransparency:!0,scrolling:"no",frameBorder:0});S(o,[0,0]),o.style.border="none";f(o,"load",(function r(){var i,l=o.contentWindow;try{i=l.document.body}catch(s){return void a.body.appendChild(o.parentNode.removeChild(o))}p(o,"load",r),w.call(l,i,e,(function(r){var a=function(e){var t=e.offsetWidth,r=e.offsetHeight;if(e.getBoundingClientRect){var a=e.getBoundingClientRect();t=n.max(t,k(a.width)),r=n.max(r,k(a.height))}return[t,r]}(r);o.parentNode.removeChild(o),function(e,t,r){f(e,t,(function a(n){return p(e,t,a),r(n)}))}(o,"load",(function(){S(o,a)})),o.src="https://unpkg.com/github-buttons@2.6.0/dist/buttons.html#"+(o.name=function(e,t,r,a){null==t&&(t="&"),null==r&&(r="="),null==a&&(a=window.encodeURIComponent);var n=[];for(var o in e){var i=e[o];null!=i&&n.push(a(o)+r+a(i))}return n.join(t)}(e)),t(o)}))})),a.body.appendChild(o)}}}}]);
//# sourceMappingURL=component---src-pages-index-js-4e951a5f1b70425bd0da.js.map