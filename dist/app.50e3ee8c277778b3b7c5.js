webpackJsonp([0],[,,,function(e,t){e.exports=function(e,t,n,o,r,a){var s,c=e=e||{},l=typeof e.default;"object"!==l&&"function"!==l||(s=e,c=e.default);var u="function"==typeof c?c.options:c;t&&(u.render=t.render,u.staticRenderFns=t.staticRenderFns,u._compiled=!0),n&&(u.functional=!0),r&&(u._scopeId=r);var i;if(a?(i=function(e){(e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),o&&o.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(a)},u._ssrRegister=i):o&&(i=o),i){var d=u.functional,f=d?u.render:u.beforeCreate;d?(u._injectStyles=i,u.render=function(e,t){return i.call(t),f(e,t)}):u.beforeCreate=f?[].concat(f,i):[i]}return{esModule:s,exports:c,options:u}}},function(e,t,n){n(5),e.exports=n(14)},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}var r=o(n(0)),a=o(n(8));r.default.component("todo-list",a.default);new r.default({el:"#container"})},,,function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(9),r=n.n(o),a=n(13),s=n(3)(r.a,a.a,!1,null,null,null);t.default=s.exports},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=function(e){return e&&e.__esModule?e:{default:e}}(n(10));t.default={components:{TodoItem:o.default},data:function(){return{tasks:[{name:"Go to grocery",completed:!0},{name:"Go to school",completed:!1},{name:"Go to landuary",completed:!1},{name:"Go to Meetting",completed:!1},{name:"Go to Party",completed:!1}]}}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(11),r=n.n(o),a=n(12),s=n(3)(r.a,a.a,!1,null,null,null);t.default=s.exports},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={props:{task:{type:Object,required:!0}}}},function(e,t,n){"use strict";var o={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("li",[n("input",{directives:[{name:"model",rawName:"v-model",value:e.task.completed,expression:"task.completed"}],attrs:{type:"checkbox",id:"checkbox"},domProps:{checked:Array.isArray(e.task.completed)?e._i(e.task.completed,null)>-1:e.task.completed},on:{change:function(t){var n=e.task.completed,o=t.target,r=!!o.checked;if(Array.isArray(n)){var a=e._i(n,null);o.checked?a<0&&(e.task.completed=n.concat([null])):a>-1&&(e.task.completed=n.slice(0,a).concat(n.slice(a+1)))}else e.$set(e.task,"completed",r)}}}),e._v(" "),n("label",{attrs:{for:"checkbox"}},[e._v(e._s(e.task.name))])])},staticRenderFns:[]};t.a=o},function(e,t,n){"use strict";var o={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("u",e._l(e.tasks,function(e,t){return n("todo-item",{key:t,attrs:{task:e}})}))},staticRenderFns:[]};t.a=o},function(e,t){}],[4]);