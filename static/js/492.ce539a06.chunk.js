"use strict";(self.webpackChunkrayos_user_pwa=self.webpackChunkrayos_user_pwa||[]).push([[492],{6212:function(e,t,a){a.d(t,{Z:function(){return I}});var o=a(4942),c=a(3366),n=a(7462),r=a(7313),l=a(3061),i=a(1921),s=a(7551),d=a(4750),p=a(6417),u=(0,d.Z)((0,p.jsx)("path",{d:"M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"}),"Cancel"),v=a(6983),f=a(1615),m=a(7999),b=a(7342),Z=a(7592),y=a(2298);function g(e){return(0,y.Z)("MuiChip",e)}var h=(0,a(7430).Z)("MuiChip",["root","sizeSmall","sizeMedium","colorPrimary","colorSecondary","disabled","clickable","clickableColorPrimary","clickableColorSecondary","deletable","deletableColorPrimary","deletableColorSecondary","outlined","filled","outlinedPrimary","outlinedSecondary","avatar","avatarSmall","avatarMedium","avatarColorPrimary","avatarColorSecondary","icon","iconSmall","iconMedium","iconColorPrimary","iconColorSecondary","label","labelSmall","labelMedium","deleteIcon","deleteIconSmall","deleteIconMedium","deleteIconColorPrimary","deleteIconColorSecondary","deleteIconOutlinedColorPrimary","deleteIconOutlinedColorSecondary","focusVisible"]),C=["avatar","className","clickable","color","component","deleteIcon","disabled","icon","label","onClick","onDelete","onKeyDown","onKeyUp","size","variant"],k=(0,Z.ZP)("div",{name:"MuiChip",slot:"Root",overridesResolver:function(e,t){var a=e.ownerState,c=a.color,n=a.clickable,r=a.onDelete,l=a.size,i=a.variant;return[(0,o.Z)({},"& .".concat(h.avatar),t.avatar),(0,o.Z)({},"& .".concat(h.avatar),t["avatar".concat((0,f.Z)(l))]),(0,o.Z)({},"& .".concat(h.avatar),t["avatarColor".concat((0,f.Z)(c))]),(0,o.Z)({},"& .".concat(h.icon),t.icon),(0,o.Z)({},"& .".concat(h.icon),t["icon".concat((0,f.Z)(l))]),(0,o.Z)({},"& .".concat(h.icon),t["iconColor".concat((0,f.Z)(c))]),(0,o.Z)({},"& .".concat(h.deleteIcon),t.deleteIcon),(0,o.Z)({},"& .".concat(h.deleteIcon),t["deleteIcon".concat((0,f.Z)(l))]),(0,o.Z)({},"& .".concat(h.deleteIcon),t["deleteIconColor".concat((0,f.Z)(c))]),(0,o.Z)({},"& .".concat(h.deleteIcon),t["deleteIconOutlinedColor".concat((0,f.Z)(c))]),t.root,t["size".concat((0,f.Z)(l))],t["color".concat((0,f.Z)(c))],n&&t.clickable,n&&"default"!==c&&t["clickableColor".concat((0,f.Z)(c),")")],r&&t.deletable,r&&"default"!==c&&t["deletableColor".concat((0,f.Z)(c))],t[i],"outlined"===i&&t["outlined".concat((0,f.Z)(c))]]}})((function(e){var t,a=e.theme,c=e.ownerState,r=(0,s.Fq)(a.palette.text.primary,.26),l="light"===a.palette.mode?a.palette.grey[700]:a.palette.grey[300];return(0,n.Z)((t={maxWidth:"100%",fontFamily:a.typography.fontFamily,fontSize:a.typography.pxToRem(13),display:"inline-flex",alignItems:"center",justifyContent:"center",height:32,color:(a.vars||a).palette.text.primary,backgroundColor:(a.vars||a).palette.action.selected,borderRadius:16,whiteSpace:"nowrap",transition:a.transitions.create(["background-color","box-shadow"]),cursor:"default",outline:0,textDecoration:"none",border:0,padding:0,verticalAlign:"middle",boxSizing:"border-box"},(0,o.Z)(t,"&.".concat(h.disabled),{opacity:(a.vars||a).palette.action.disabledOpacity,pointerEvents:"none"}),(0,o.Z)(t,"& .".concat(h.avatar),{marginLeft:5,marginRight:-6,width:24,height:24,color:a.vars?a.vars.palette.Chip.defaultAvatarColor:l,fontSize:a.typography.pxToRem(12)}),(0,o.Z)(t,"& .".concat(h.avatarColorPrimary),{color:(a.vars||a).palette.primary.contrastText,backgroundColor:(a.vars||a).palette.primary.dark}),(0,o.Z)(t,"& .".concat(h.avatarColorSecondary),{color:(a.vars||a).palette.secondary.contrastText,backgroundColor:(a.vars||a).palette.secondary.dark}),(0,o.Z)(t,"& .".concat(h.avatarSmall),{marginLeft:4,marginRight:-4,width:18,height:18,fontSize:a.typography.pxToRem(10)}),(0,o.Z)(t,"& .".concat(h.icon),(0,n.Z)({color:a.vars?a.vars.palette.Chip.defaultIconColor:l,marginLeft:5,marginRight:-6},"small"===c.size&&{fontSize:18,marginLeft:4,marginRight:-4},"default"!==c.color&&{color:"inherit"})),(0,o.Z)(t,"& .".concat(h.deleteIcon),(0,n.Z)({WebkitTapHighlightColor:"transparent",color:a.vars?"rgba(".concat(a.vars.palette.text.primaryChannel," / 0.26)"):r,fontSize:22,cursor:"pointer",margin:"0 5px 0 -6px","&:hover":{color:a.vars?"rgba(".concat(a.vars.palette.text.primaryChannel," / 0.4)"):(0,s.Fq)(r,.4)}},"small"===c.size&&{fontSize:16,marginRight:4,marginLeft:-4},"default"!==c.color&&{color:a.vars?"rgba(".concat(a.vars.palette[c.color].contrastTextChannel," / 0.7)"):(0,s.Fq)(a.palette[c.color].contrastText,.7),"&:hover, &:active":{color:(a.vars||a).palette[c.color].contrastText}})),t),"small"===c.size&&{height:24},"default"!==c.color&&{backgroundColor:(a.vars||a).palette[c.color].main,color:(a.vars||a).palette[c.color].contrastText},c.onDelete&&(0,o.Z)({},"&.".concat(h.focusVisible),{backgroundColor:a.vars?"rgba(".concat(a.vars.palette.action.selectedChannel," / calc(").concat(a.vars.palette.action.selectedOpacity+a.vars.palette.action.focusOpacity,"))"):(0,s.Fq)(a.palette.action.selected,a.palette.action.selectedOpacity+a.palette.action.focusOpacity)}),c.onDelete&&"default"!==c.color&&(0,o.Z)({},"&.".concat(h.focusVisible),{backgroundColor:(a.vars||a).palette[c.color].dark}))}),(function(e){var t,a=e.theme,c=e.ownerState;return(0,n.Z)({},c.clickable&&(t={userSelect:"none",WebkitTapHighlightColor:"transparent",cursor:"pointer","&:hover":{backgroundColor:a.vars?"rgba(".concat(a.vars.palette.action.selectedChannel," / calc(").concat(a.vars.palette.action.selectedOpacity+a.vars.palette.action.hoverOpacity,"))"):(0,s.Fq)(a.palette.action.selected,a.palette.action.selectedOpacity+a.palette.action.hoverOpacity)}},(0,o.Z)(t,"&.".concat(h.focusVisible),{backgroundColor:a.vars?"rgba(".concat(a.vars.palette.action.selectedChannel," / calc(").concat(a.vars.palette.action.selectedOpacity+a.vars.palette.action.focusOpacity,"))"):(0,s.Fq)(a.palette.action.selected,a.palette.action.selectedOpacity+a.palette.action.focusOpacity)}),(0,o.Z)(t,"&:active",{boxShadow:(a.vars||a).shadows[1]}),t),c.clickable&&"default"!==c.color&&(0,o.Z)({},"&:hover, &.".concat(h.focusVisible),{backgroundColor:(a.vars||a).palette[c.color].dark}))}),(function(e){var t,a,c=e.theme,r=e.ownerState;return(0,n.Z)({},"outlined"===r.variant&&(t={backgroundColor:"transparent",border:c.vars?"1px solid ".concat(c.vars.palette.Chip.defaultBorder):"1px solid ".concat("light"===c.palette.mode?c.palette.grey[400]:c.palette.grey[700])},(0,o.Z)(t,"&.".concat(h.clickable,":hover"),{backgroundColor:(c.vars||c).palette.action.hover}),(0,o.Z)(t,"&.".concat(h.focusVisible),{backgroundColor:(c.vars||c).palette.action.focus}),(0,o.Z)(t,"& .".concat(h.avatar),{marginLeft:4}),(0,o.Z)(t,"& .".concat(h.avatarSmall),{marginLeft:2}),(0,o.Z)(t,"& .".concat(h.icon),{marginLeft:4}),(0,o.Z)(t,"& .".concat(h.iconSmall),{marginLeft:2}),(0,o.Z)(t,"& .".concat(h.deleteIcon),{marginRight:5}),(0,o.Z)(t,"& .".concat(h.deleteIconSmall),{marginRight:3}),t),"outlined"===r.variant&&"default"!==r.color&&(a={color:(c.vars||c).palette[r.color].main,border:"1px solid ".concat(c.vars?"rgba(".concat(c.vars.palette[r.color].mainChannel," / 0.7)"):(0,s.Fq)(c.palette[r.color].main,.7))},(0,o.Z)(a,"&.".concat(h.clickable,":hover"),{backgroundColor:c.vars?"rgba(".concat(c.vars.palette[r.color].mainChannel," / ").concat(c.vars.palette.action.hoverOpacity,")"):(0,s.Fq)(c.palette[r.color].main,c.palette.action.hoverOpacity)}),(0,o.Z)(a,"&.".concat(h.focusVisible),{backgroundColor:c.vars?"rgba(".concat(c.vars.palette[r.color].mainChannel," / ").concat(c.vars.palette.action.focusOpacity,")"):(0,s.Fq)(c.palette[r.color].main,c.palette.action.focusOpacity)}),(0,o.Z)(a,"& .".concat(h.deleteIcon),{color:c.vars?"rgba(".concat(c.vars.palette[r.color].mainChannel," / 0.7)"):(0,s.Fq)(c.palette[r.color].main,.7),"&:hover, &:active":{color:(c.vars||c).palette[r.color].main}}),a))})),S=(0,Z.ZP)("span",{name:"MuiChip",slot:"Label",overridesResolver:function(e,t){var a=e.ownerState.size;return[t.label,t["label".concat((0,f.Z)(a))]]}})((function(e){var t=e.ownerState;return(0,n.Z)({overflow:"hidden",textOverflow:"ellipsis",paddingLeft:12,paddingRight:12,whiteSpace:"nowrap"},"small"===t.size&&{paddingLeft:8,paddingRight:8})}));function w(e){return"Backspace"===e.key||"Delete"===e.key}var I=r.forwardRef((function(e,t){var a=(0,b.Z)({props:e,name:"MuiChip"}),o=a.avatar,s=a.className,d=a.clickable,Z=a.color,y=void 0===Z?"default":Z,h=a.component,I=a.deleteIcon,x=a.disabled,O=void 0!==x&&x,R=a.icon,z=a.label,P=a.onClick,T=a.onDelete,D=a.onKeyDown,L=a.onKeyUp,j=a.size,F=void 0===j?"medium":j,N=a.variant,V=void 0===N?"filled":N,M=(0,c.Z)(a,C),q=r.useRef(null),E=(0,v.Z)(q,t),_=function(e){e.stopPropagation(),T&&T(e)},K=!(!1===d||!P)||d,B="small"===F,U=K||T?m.Z:h||"div",W=(0,n.Z)({},a,{component:U,disabled:O,size:F,color:y,onDelete:!!T,clickable:K,variant:V}),A=function(e){var t=e.classes,a=e.disabled,o=e.size,c=e.color,n=e.onDelete,r=e.clickable,l=e.variant,s={root:["root",l,a&&"disabled","size".concat((0,f.Z)(o)),"color".concat((0,f.Z)(c)),r&&"clickable",r&&"clickableColor".concat((0,f.Z)(c)),n&&"deletable",n&&"deletableColor".concat((0,f.Z)(c)),"".concat(l).concat((0,f.Z)(c))],label:["label","label".concat((0,f.Z)(o))],avatar:["avatar","avatar".concat((0,f.Z)(o)),"avatarColor".concat((0,f.Z)(c))],icon:["icon","icon".concat((0,f.Z)(o)),"iconColor".concat((0,f.Z)(c))],deleteIcon:["deleteIcon","deleteIcon".concat((0,f.Z)(o)),"deleteIconColor".concat((0,f.Z)(c)),"deleteIconOutlinedColor".concat((0,f.Z)(c))]};return(0,i.Z)(s,g,t)}(W),H=U===m.Z?(0,n.Z)({component:h||"div",focusVisibleClassName:A.focusVisible},T&&{disableRipple:!0}):{},G=null;if(T){var J=(0,l.Z)("default"!==y&&("outlined"===V?A["deleteIconOutlinedColor".concat((0,f.Z)(y))]:A["deleteIconColor".concat((0,f.Z)(y))]),B&&A.deleteIconSmall);G=I&&r.isValidElement(I)?r.cloneElement(I,{className:(0,l.Z)(I.props.className,A.deleteIcon,J),onClick:_}):(0,p.jsx)(u,{className:(0,l.Z)(A.deleteIcon,J),onClick:_})}var Q=null;o&&r.isValidElement(o)&&(Q=r.cloneElement(o,{className:(0,l.Z)(A.avatar,o.props.className)}));var X=null;return R&&r.isValidElement(R)&&(X=r.cloneElement(R,{className:(0,l.Z)(A.icon,R.props.className)})),(0,p.jsxs)(k,(0,n.Z)({as:U,className:(0,l.Z)(A.root,s),disabled:!(!K||!O)||void 0,onClick:P,onKeyDown:function(e){e.currentTarget===e.target&&w(e)&&e.preventDefault(),D&&D(e)},onKeyUp:function(e){e.currentTarget===e.target&&(T&&w(e)?T(e):"Escape"===e.key&&q.current&&q.current.blur()),L&&L(e)},ref:E,ownerState:W},H,M,{children:[Q||X,(0,p.jsx)(S,{className:(0,l.Z)(A.label),ownerState:W,children:z}),G]}))}))},9388:function(e,t,a){a.d(t,{Z:function(){return r}});var o=a(1120),c=a(8814),n=a(2963);function r(e){var t=(0,c.Z)();return function(){var a,c=(0,o.Z)(e);if(t){var r=(0,o.Z)(this).constructor;a=Reflect.construct(c,arguments,r)}else a=c.apply(this,arguments);return(0,n.Z)(this,a)}}},1120:function(e,t,a){function o(e){return o=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},o(e)}a.d(t,{Z:function(){return o}})},136:function(e,t,a){a.d(t,{Z:function(){return c}});var o=a(9611);function c(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&(0,o.Z)(e,t)}},8814:function(e,t,a){function o(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}a.d(t,{Z:function(){return o}})},2963:function(e,t,a){a.d(t,{Z:function(){return n}});var o=a(1002),c=a(7326);function n(e,t){if(t&&("object"===(0,o.Z)(t)||"function"===typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return(0,c.Z)(e)}}}]);