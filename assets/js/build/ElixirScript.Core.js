/* @flow */class Variable{constructor(e=null,t=Symbol.for('tailored.no_value')){this.name=e,this.default_value=t}}class Wildcard{constructor(){}}class StartsWith{constructor(e){this.prefix=e}}class Capture{constructor(e){this.value=e}}class HeadTail{constructor(e,t){this.head=e,this.tail=t}}class Type{constructor(e,t={}){this.type=e,this.objPattern=t}}class Bound{constructor(e){this.value=e}}class BitStringMatch{constructor(...e){this.values=e}length(){return values.length}bit_size(){return 8*this.byte_size()}byte_size(){let e=0;for(let t of this.values)e+=t.unit*t.size/8;return e}getValue(e){return this.values(e)}getSizeOfValue(e){let t=this.getValue(e);return t.unit*t.size}getTypeOfValue(e){return this.getValue(e).type}}class NamedVariableResult{constructor(e,t){this.name=e,this.value=t}}function variable(e=null,t=Symbol.for('tailored.no_value')){return new Variable(e,t)}function wildcard(){return new Wildcard}function startsWith(e){return new StartsWith(e)}function capture(e){return new Capture(e)}function headTail(e,t){return new HeadTail(e,t)}function type(e,t={}){return new Type(e,t)}function bound(e){return new Bound(e)}function bitStringMatch(...e){return new BitStringMatch(...e)}function namedVariableResult(e,t){return new NamedVariableResult(e,t)}class Tuple{constructor(...e){this.values=Object.freeze(e),this.length=this.values.length}get(e){return this.values[e]}count(){return this.values.length}[Symbol.iterator](){return this.values[Symbol.iterator]()}toString(){let e,t='';for(e=0;e<this.values.length;e++){''!=t&&(t+=', ');const n=this.values[e]?this.values[e].toString():'';t+=n}return'{'+t+'}'}put_elem(e,t){if(e===this.length){let e=this.values.concat([t]);return new Tuple(...e)}let n=this.values.concat([]);return n.splice(e,0,t),new Tuple(...n)}remove_elem(e){let t=this.values.concat([]);return t.splice(e,1),new Tuple(...t)}}let process_counter=-1;class PID{constructor(){++process_counter,this.id=process_counter}toString(){return'PID#<0.'+this.id+'.0>'}}let ref_counter=-1;class Reference{constructor(){++ref_counter,this.id=ref_counter,this.ref=Symbol()}toString(){return'Ref#<0.0.0.'+this.id+'>'}}class BitString$1{constructor(...e){this.value=Object.freeze(this.process(e)),this.length=this.value.length,this.bit_size=8*this.length,this.byte_size=this.length}get(e){return this.value[e]}count(){return this.value.length}slice(e,t=null){let n=this.value.slice(e,t),i=n.map((e)=>BitString$1.integer(e));return new BitString$1(...i)}[Symbol.iterator](){return this.value[Symbol.iterator]()}toString(){var e,t='';for(e=0;e<this.count();e++)''!=t&&(t+=', '),t+=this.get(e).toString();return'<<'+t+'>>'}process(e){let t=[];var n;for(n=0;n<e.length;n++){let i=this['process_'+e[n].type](e[n]);for(let t of e[n].attributes)i=this['process_'+t](i);t=t.concat(i)}return t}process_integer(e){return e.value}process_float(e){if(64===e.size)return BitString$1.float64ToBytes(e.value);if(32===e.size)return BitString$1.float32ToBytes(e.value);throw new Error('Invalid size for float')}process_bitstring(e){return e.value.value}process_binary(e){return BitString$1.toUTF8Array(e.value)}process_utf8(e){return BitString$1.toUTF8Array(e.value)}process_utf16(e){return BitString$1.toUTF16Array(e.value)}process_utf32(e){return BitString$1.toUTF32Array(e.value)}process_signed(e){return new Uint8Array([e])[0]}process_unsigned(e){return e}process_native(e){return e}process_big(e){return e}process_little(e){return e.reverse()}process_size(e){return e}process_unit(e){return e}static integer(e){return BitString$1.wrap(e,{type:'integer',unit:1,size:8})}static float(e){return BitString$1.wrap(e,{type:'float',unit:1,size:64})}static bitstring(e){return BitString$1.wrap(e,{type:'bitstring',unit:1,size:e.bit_size})}static bits(e){return BitString$1.bitstring(e)}static binary(e){return BitString$1.wrap(e,{type:'binary',unit:8,size:e.length})}static bytes(e){return BitString$1.binary(e)}static utf8(e){return BitString$1.wrap(e,{type:'utf8',unit:1,size:e.length})}static utf16(e){return BitString$1.wrap(e,{type:'utf16',unit:1,size:2*e.length})}static utf32(e){return BitString$1.wrap(e,{type:'utf32',unit:1,size:4*e.length})}static signed(e){return BitString$1.wrap(e,{},'signed')}static unsigned(e){return BitString$1.wrap(e,{},'unsigned')}static native(e){return BitString$1.wrap(e,{},'native')}static big(e){return BitString$1.wrap(e,{},'big')}static little(e){return BitString$1.wrap(e,{},'little')}static size(e,t){return BitString$1.wrap(e,{size:t})}static unit(e,t){return BitString$1.wrap(e,{unit:t})}static wrap(e,t,n=null){let i=e;return e instanceof Object||(i={value:e,attributes:[]}),i=Object.assign(i,t),n&&i.attributes.push(n),i}static toUTF8Array(e){for(var t,n=[],r=0;r<e.length;r++)t=e.charCodeAt(r),128>t?n.push(t):2048>t?n.push(192|t>>6,128|63&t):55296>t||57344<=t?n.push(224|t>>12,128|63&t>>6,128|63&t):(r++,t=65536+((1023&t)<<10|1023&e.charCodeAt(r)),n.push(240|t>>18,128|63&t>>12,128|63&t>>6,128|63&t));return n}static toUTF16Array(e){for(var t,n=[],r=0;r<e.length;r++)t=e.codePointAt(r),255>=t?(n.push(0),n.push(t)):(n.push(255&t>>8),n.push(255&t));return n}static toUTF32Array(e){for(var t,n=[],r=0;r<e.length;r++)t=e.codePointAt(r),255>=t?(n.push(0),n.push(0),n.push(0),n.push(t)):(n.push(0),n.push(0),n.push(255&t>>8),n.push(255&t));return n}//http://stackoverflow.com/questions/2003493/javascript-float-from-to-bits
static float32ToBytes(e){var t=[],n=new ArrayBuffer(4);new Float32Array(n)[0]=e;let i=new Uint32Array(n)[0];return t.push(255&i>>24),t.push(255&i>>16),t.push(255&i>>8),t.push(255&i),t}static float64ToBytes(e){var t=[],n=new ArrayBuffer(8);new Float64Array(n)[0]=e;var i=new Uint32Array(n)[0],r=new Uint32Array(n)[1];return t.push(255&r>>24),t.push(255&r>>16),t.push(255&r>>8),t.push(255&r),t.push(255&i>>24),t.push(255&i>>16),t.push(255&i>>8),t.push(255&i),t}}var ErlangTypes={Tuple,PID,Reference,BitString:BitString$1};/* @flow */function is_number(e){return'number'==typeof e}function is_string(e){return'string'==typeof e}function is_boolean(e){return'boolean'==typeof e}function is_symbol(e){return'symbol'==typeof e}function is_object(e){return'object'==typeof e}function is_variable(e){return e instanceof Variable}function is_bitstring(e){return e instanceof BitStringMatch}function is_null(e){return null===e}function is_array(e){return Array.isArray(e)}function is_function(e){return'function'==typeof e||e instanceof Function}function is_map(e){return e instanceof Map}function is_pid(e){return e instanceof ErlangTypes.PID}function is_tuple(e){return e instanceof ErlangTypes.Tuple}function is_reference(e){return e instanceof ErlangTypes.Reference}function arrayEquals(e,t){if(!Array.isArray(t))return!1;if(e.length!==t.length)return!1;for(let n=0;n<e.length;n++)if(!1===equals(e[n],t[n]))return!1;return!0}function tupleEquals(e,t){return!1!=t instanceof ErlangTypes.Tuple&&!(e.length!==t.length)&&arrayEquals(e.values,t.values)}function bitstringEquals(e,t){return!1!=t instanceof ErlangTypes.BitString&&!(e.length!==t.length)&&arrayEquals(e.value,t.value)}function pidEquals(e,t){return!1!=t instanceof ErlangTypes.PID&&e.id===t.id}function referenceEquals(e,t){return!1!=t instanceof ErlangTypes.Reference&&e.id===t.id}function mapEquals(e,t){if(!1==t instanceof Map)return!1;const n=Array.from(e.entries()),i=Array.from(t.entries());return arrayEquals(n,i)}function equals(e,t){return Array.isArray(e)?arrayEquals(e,t):e instanceof ErlangTypes.Tuple?tupleEquals(e,t):e instanceof ErlangTypes.PID?pidEquals(e,t):e instanceof ErlangTypes.BitString?bitstringEquals(e,t):e instanceof ErlangTypes.Reference?referenceEquals(e,t):e instanceof Map?mapEquals(e,t):e===t}function is_non_primitive(e){return is_array(e)||is_map(e)||is_pid(e)||is_reference(e)||is_bitstring(e)||is_tuple(e)}function has(e,t){if(is_non_primitive(t)){for(const n of e.keys())if(equals(n,t))return!0;return!1}return e.has(t)}function get(e,t){if(is_non_primitive(t)){for(const n of e.keys())if(equals(n,t))return e.get(n);return null}return e.get(t)}var Utils={get,has,equals};/* @flow */const BitString=ErlangTypes.BitString;function resolveSymbol(e){return function(t){return is_symbol(t)&&t===e}}function resolveString(e){return function(t){return is_string(t)&&t===e}}function resolveNumber(e){return function(t){return is_number(t)&&t===e}}function resolveBoolean(e){return function(t){return is_boolean(t)&&t===e}}function resolveFunction(e){return function(t){return is_function(t)&&t===e}}function resolveNull(){return function(e){return is_null(e)}}function resolveBound(e){return function(t){return typeof t==typeof e.value&&t===e.value}}function resolveWildcard(){return function(){return!0}}function resolveVariable(e){return function(t,n){return null===e.name?n.push(t):'_'!==e.name&&n.push(namedVariableResult(e.name,t)),!0}}function resolveHeadTail(e){const t=buildMatch(e.head),n=buildMatch(e.tail);return function(e,i){if(!is_array(e)||0===e.length)return!1;const r=e[0],a=e.slice(1);return t(r,i)&&n(a,i)}}function resolveCapture(e){const t=buildMatch(e.value);return function(e,n){return!!t(e,n)&&(n.push(e),!0)}}function resolveStartsWith(e){const t=e.prefix;return function(e,n){return is_string(e)&&e.startsWith(t)&&(n.push(e.substring(t.length)),!0)}}function resolveType(e){return function(t,n){if(t instanceof e.type){const i=buildMatch(e.objPattern);return i(t,n)}return!1}}function resolveArray(e){const t=e.map((e)=>buildMatch(e));return function(n,r){return is_array(n)&&n.length==e.length&&n.every(function(e,a){return t[a](n[a],r)})}}function resolveMap(e){let t=new Map;const n=Array.from(e.keys());for(let i of n)t.set(i,buildMatch(e.get(i)));return function(i,r){if(!is_map(i)||e.size>i.size)return!1;for(const e of n)if(!Utils.has(i,e)||!Utils.get(t,e)(Utils.get(i,e),r))return!1;return!0}}function resolveObject(e){let t={};const n=Object.keys(e).concat(Object.getOwnPropertySymbols(e));for(let i of n)t[i]=buildMatch(e[i]);return function(i,r){if(!is_object(i)||e.length>i.length)return!1;for(let e of n)if(!(e in i)||!t[e](i[e],r))return!1;return!0}}function resolveBitString(e){let t=[];for(let n of e.values)if(is_variable(n.value)){let e=getSize(n.unit,n.size);fillArray(t,e)}else t=t.concat(new BitString(n).value);let n=e.values;return function(e,i){var r=String.fromCharCode;let a=null;if(!is_string(e)&&!(e instanceof BitString))return!1;a=is_string(e)?new BitString(BitString.binary(e)):e;let s=0;for(let l,o=0;o<n.length;o++){if(l=n[o],is_variable(l.value)&&'binary'==l.type&&void 0===l.size&&o<n.length-1)throw new Error('a binary field without size is only allowed at the end of a binary pattern');let e=0,u=[],p=[];if(e=getSize(l.unit,l.size),o===n.length-1?(u=a.value.slice(s),p=t.slice(s)):(u=a.value.slice(s,s+e),p=t.slice(s,s+e)),is_variable(l.value))switch(l.type){case'integer':l.attributes&&-1!=l.attributes.indexOf('signed')?i.push(new Int8Array([u[0]])[0]):i.push(new Uint8Array([u[0]])[0]);break;case'float':if(64===e)i.push(Float64Array.from(u)[0]);else if(32===e)i.push(Float32Array.from(u)[0]);else return!1;break;case'bitstring':i.push(createBitString(u));break;case'binary':i.push(r.apply(null,new Uint8Array(u)));break;case'utf8':i.push(r.apply(null,new Uint8Array(u)));break;case'utf16':i.push(r.apply(null,new Uint16Array(u)));break;case'utf32':i.push(r.apply(null,new Uint32Array(u)));break;default:return!1;}else if(!arraysEqual(u,p))return!1;s+=e}return!0}}function getSize(e,t){return e*t/8}function arraysEqual(e,t){if(e===t)return!0;if(null==e||null==t)return!1;if(e.length!=t.length)return!1;for(var n=0;n<e.length;++n)if(e[n]!==t[n])return!1;return!0}function fillArray(e,t){for(let n=0;n<t;n++)e.push(0)}function createBitString(e){let t=e.map((e)=>BitString.integer(e));return new BitString(...t)}function resolveNoMatch(){return function(){return!1}}const patternMap=new Map;patternMap.set(Variable.prototype,resolveVariable),patternMap.set(Wildcard.prototype,resolveWildcard),patternMap.set(HeadTail.prototype,resolveHeadTail),patternMap.set(StartsWith.prototype,resolveStartsWith),patternMap.set(Capture.prototype,resolveCapture),patternMap.set(Bound.prototype,resolveBound),patternMap.set(Type.prototype,resolveType),patternMap.set(BitStringMatch.prototype,resolveBitString),patternMap.set(Number.prototype,resolveNumber),patternMap.set(Symbol.prototype,resolveSymbol),patternMap.set(Map.prototype,resolveMap),patternMap.set(Array.prototype,resolveArray),patternMap.set(String.prototype,resolveString),patternMap.set(Boolean.prototype,resolveBoolean),patternMap.set(Function.prototype,resolveFunction),patternMap.set(Object.prototype,resolveObject);function buildMatch(e){if(null===e)return resolveNull(e);if('undefined'==typeof e)return resolveWildcard(e);if('function'==typeof e)return resolveFunction(e);const t=e.constructor.prototype,n=patternMap.get(t);return n?n(e):'object'==typeof e?resolveObject(e):resolveNoMatch()}class MatchError extends Error{constructor(e){if(super(),'symbol'==typeof e)this.message='No match for: '+e.toString();else if(Array.isArray(e)){let t=e.map((e)=>null===e?'null':'undefined'==typeof e?'undefined':e.toString());this.message='No match for: '+t}else this.message='No match for: '+e;this.name=this.constructor.name}}class Clause{constructor(e,t,n=()=>!0){this.pattern=buildMatch(e),this.arity=e.length,this.optionals=getOptionalValues(e),this.fn=t,this.guard=n}}function clause(e,t,n=()=>!0){return new Clause(e,t,n)}function defmatch(...e){const t=getArityMap(e);return function(...e){let[n,i]=findMatchingFunction(e,t);return n.apply(this,i)}}function defmatchgen(...e){const t=getArityMap(e);return function*(...e){let[n,i]=findMatchingFunction(e,t);return yield*n.apply(this,i)}}function defmatchGen(...e){return defmatchgen(...e)}function defmatchAsync(...e){const t=getArityMap(e);return async function(...e){if(t.has(e.length)){const n=t.get(e.length);let i=null,r=null;for(let t of n){let n=[];e=fillInOptionalValues(e,t.arity,t.optionals);const a=t.pattern(e,n),[s,l]=checkNamedVariables(n);if(a&&l&&(await t.guard.apply(this,s))){i=t.fn,r=s;break}}if(!i)throw console.error('No match for:',e),new MatchError(e);return i.apply(this,r)}throw console.error('Arity of',e.length,'not found. No match for:',e),new MatchError(e)}}function findMatchingFunction(e,t){if(t.has(e.length)){const n=t.get(e.length);let i=null,r=null;for(let t of n){let n=[];e=fillInOptionalValues(e,t.arity,t.optionals);const a=t.pattern(e,n),[s,l]=checkNamedVariables(n);if(a&&l&&t.guard.apply(this,s)){i=t.fn,r=s;break}}if(!i)throw console.error('No match for:',e),new MatchError(e);return[i,r]}throw console.error('Arity of',e.length,'not found. No match for:',e),new MatchError(e)}function getArityMap(e){let t=new Map;for(const n of e){const e=getArityRange(n);for(const i of e){let e=[];t.has(i)&&(e=t.get(i)),e.push(n),t.set(i,e)}}return t}function getArityRange(e){const t=e.arity-e.optionals.length,n=e.arity;let i=[t];for(;i[i.length-1]!=n;)i.push(i[i.length-1]+1);return i}function getOptionalValues(e){let t=[];for(let n=0;n<e.length;n++)e[n]instanceof Variable&&e[n].default_value!=Symbol.for('tailored.no_value')&&t.push([n,e[n].default_value]);return t}function fillInOptionalValues(e,t,n){if(e.length===t||0===n.length)return e;if(e.length+n.length<t)return e;let i=t-e.length,r=n.length-i,a=n.slice(r);for(let[i,r]of a)if(e.splice(i,0,r),e.length===t)break;return e}function match(e,t,n=()=>!0){let i=[],r=buildMatch(e);const a=r(t,i),[s,l]=checkNamedVariables(i);if(a&&l&&n.apply(this,s))return s;throw console.error('No match for:',t),new MatchError(t)}function checkNamedVariables(e){const t={},n=[];for(let r=0;r<e.length;r++){const i=e[r];if(i instanceof NamedVariableResult){if(t[i.name]&&t[i.name]!==i.value)return[e,!1];t[i.name]&&t[i.name]===i.value?n.push(i.value):(t[i.name]=i.value,n.push(i.value))}else n.push(i)}return[n,!0]}function match_or_default(e,t,n=()=>!0,i=null){let r=[],a=buildMatch(e);const s=a(t,r),[l,o]=checkNamedVariables(r);return s&&o&&n.apply(this,l)?l:i}function*match_or_default_gen(e,t,n=function*(){return!0},i=null){let r=[],a=buildMatch(e);const s=a(t,r),[l,o]=checkNamedVariables(r);return s&&o&&(yield*n.apply(this,l))?l:i}async function match_or_default_async(e,t,n=async()=>!0,i=null){let r=[],a=buildMatch(e);const s=a(t,r),[l,o]=checkNamedVariables(r);return s&&o&&(await n.apply(this,l))?l:i}const NO_MATCH=Symbol();function bitstring_generator(e,t){return function(){let n=[],r=t.slice(0,e.byte_size()),a=1;for(;r.byte_size==e.byte_size();){const i=match_or_default(e,r,()=>!0,NO_MATCH);i!=NO_MATCH&&n.push(i),r=t.slice(e.byte_size()*a,e.byte_size()*(a+1)),a++}return n}}function list_generator(e,t){return function(){let n=[];for(let r of t){const t=match_or_default(e,r,()=>!0,NO_MATCH);if(t!=NO_MATCH){const[e]=t;n.push(e)}}return n}}function list_comprehension(e,t){const n=run_generators(t.pop()(),t);let i=[];for(let r of n)e.guard.apply(this,r)&&i.push(e.fn.apply(this,r));return i}function run_generators(e,t){if(0==t.length)return e.map((e)=>Array.isArray(e)?e:[e]);else{const n=t.pop();let r=[];for(let t of n())for(let n of e)r.push([t].concat(n));return run_generators(r,t)}}function bitstring_comprehension(e,t){const n=run_generators(t.pop()(),t);let i=[];for(let r of n)e.guard.apply(this,r)&&i.push(e.fn.apply(this,r));return i=i.map((e)=>ErlangTypes.BitString.integer(e)),new ErlangTypes.BitString(...i)}var Patterns={defmatch,match,MatchError,variable,wildcard,startsWith,capture,headTail,type,bound,Clause,clause,bitStringMatch,match_or_default,match_or_default_gen,match_or_default_async,defmatchgen,list_comprehension,list_generator,bitstring_generator,bitstring_comprehension,defmatchGen,defmatchAsync};/*
Breaks a Javascript string into individual user-perceived "characters" 
called extended grapheme clusters by implementing the Unicode UAX-29 standard, version 10.0.0

Usage:
var splitter = new GraphemeSplitter();
//returns an array of strings, one string for each grapheme cluster
var graphemes = splitter.splitGraphemes(string); 

*/function GraphemeSplitter(){function isSurrogate(e,t){return 55296<=e.charCodeAt(t)&&56319>=e.charCodeAt(t)&&56320<=e.charCodeAt(t+1)&&57343>=e.charCodeAt(t+1)}// Private function, gets a Unicode code point from a JavaScript UTF-16 string
// handling surrogate pairs appropriately
function codePointAt(e,t){void 0===t&&(t=0);var n=e.charCodeAt(t);// if a high surrogate
if(55296<=n&&56319>=n&&t<e.length-1){var i=n,r=e.charCodeAt(t+1);return 56320<=r&&57343>=r?1024*(i-55296)+(r-56320)+65536:i}// if a low surrogate
if(56320<=n&&57343>=n&&1<=t){var i=e.charCodeAt(t-1),r=n;return 55296<=i&&56319>=i?1024*(i-55296)+(r-56320)+65536:r}//just return the char if an unmatched surrogate half or a 
//single-char codepoint
return n}// Private function, returns whether a break is allowed between the 
// two given grapheme breaking classes
function shouldBreak(d,k,z){var A=[d].concat(k).concat([z]),I=A[A.length-2],w=z,S=A.lastIndexOf(g);// Lookahead termintor for:
// GB10. (E_Base | EBG) Extend* ?	E_Modifier
if(1<S&&A.slice(1,S).every(function(e){return e==i})&&-1==[i,_,y].indexOf(d))return v;// Lookahead termintor for:
// GB12. ^ (RI RI)* RI	?	RI
// GB13. [^RI] (RI RI)* RI	?	RI
var P=A.lastIndexOf(r);if(0<P&&A.slice(1,P).every(function(e){return e==r})&&-1==[f,r].indexOf(I))return 1==A.filter(function(e){return e==r}).length%2?T:x;// GB3. CR X LF
if(I==e&&w==t)return m;// GB4. (Control|CR|LF) ÷
// GB10. (E_Base | EBG) Extend* ?	E_Modifier
if(I==n||I==e||I==t)return w==g&&k.every(function(e){return e==i})?v:b;// GB5. ÷ (Control|CR|LF)
if(w==n||w==e||w==t)return b;// GB6. L X (L|V|LV|LVT)
if(I==s&&(w==s||w==l||w==u||w==p))return m;// GB7. (LV|V) X (V|T)
if((I==u||I==l)&&(w==l||w==o))return m;// GB8. (LVT|T) X (T)
if((I==p||I==o)&&w==o)return m;// GB9. X (Extend|ZWJ)
if(w==i||w==h)return m;// GB9a. X SpacingMark
if(w==a)return m;// GB9b. Prepend X
if(I==f)return m;var B=-1==A.indexOf(i)?A.length-2:A.lastIndexOf(i)-1;// GB12. ^ (RI RI)* RI ? RI
// GB13. [^RI] (RI RI)* RI ? RI
// GB999. Any ? Any
return-1!=[_,y].indexOf(A[B])&&A.slice(B+1,-1).every(function(e){return e==i})&&w==g?m:I==h&&-1!=[c,y].indexOf(w)?m:-1==k.indexOf(r)?I==r&&w==r?m:b:v;// GB11. ZWJ ? (Glue_After_Zwj | EBG)
}// Returns the next grapheme break in the string after the given index
//given a Unicode code point, determines this symbol's grapheme break property
function getGraphemeBreakProperty(m){//grapheme break property for Unicode 10.0.0, 
//taken from http://www.unicode.org/Public/10.0.0/ucd/auxiliary/GraphemeBreakProperty.txt
//and adapted to JavaScript rules
return 1536<=m&&1541>=m||// Cf   [6] ARABIC NUMBER SIGN..ARABIC NUMBER MARK ABOVE
1757==m||// Cf       ARABIC END OF AYAH
1807==m||// Cf       SYRIAC ABBREVIATION MARK
2274==m||// Cf       ARABIC DISPUTED END OF AYAH
3406==m||// Lo       MALAYALAM LETTER DOT REPH
69821==m||// Cf       KAITHI NUMBER SIGN
70082<=m&&70083>=m||// Lo   [2] SHARADA SIGN JIHVAMULIYA..SHARADA SIGN UPADHMANIYA
72250==m||// Lo       ZANABAZAR SQUARE CLUSTER-INITIAL LETTER RA
72326<=m&&72329>=m||// Lo   [4] SOYOMBO CLUSTER-INITIAL LETTER RA..SOYOMBO CLUSTER-INITIAL LETTER SA
73030==m// Lo       MASARAM GONDI REPHA
?f:13==m// Cc       <control-000D>
?e:10==m// Cc       <control-000A>
?t:0<=m&&9>=m||// Cc  [10] <control-0000>..<control-0009>
11<=m&&12>=m||// Cc   [2] <control-000B>..<control-000C>
14<=m&&31>=m||// Cc  [18] <control-000E>..<control-001F>
127<=m&&159>=m||// Cc  [33] <control-007F>..<control-009F>
173==m||// Cf       SOFT HYPHEN
1564==m||// Cf       ARABIC LETTER MARK
6158==m||// Cf       MONGOLIAN VOWEL SEPARATOR
8203==m||// Cf       ZERO WIDTH SPACE
8206<=m&&8207>=m||// Cf   [2] LEFT-TO-RIGHT MARK..RIGHT-TO-LEFT MARK
8232==m||// Zl       LINE SEPARATOR
8233==m||// Zp       PARAGRAPH SEPARATOR
8234<=m&&8238>=m||// Cf   [5] LEFT-TO-RIGHT EMBEDDING..RIGHT-TO-LEFT OVERRIDE
8288<=m&&8292>=m||// Cf   [5] WORD JOINER..INVISIBLE PLUS
8293==m||// Cn       <reserved-2065>
8294<=m&&8303>=m||// Cf  [10] LEFT-TO-RIGHT ISOLATE..NOMINAL DIGIT SHAPES
55296<=m&&57343>=m||// Cs [2048] <surrogate-D800>..<surrogate-DFFF>
65279==m||// Cf       ZERO WIDTH NO-BREAK SPACE
65520<=m&&65528>=m||// Cn   [9] <reserved-FFF0>..<reserved-FFF8>
65529<=m&&65531>=m||// Cf   [3] INTERLINEAR ANNOTATION ANCHOR..INTERLINEAR ANNOTATION TERMINATOR
113824<=m&&113827>=m||// Cf   [4] SHORTHAND FORMAT LETTER OVERLAP..SHORTHAND FORMAT UP STEP
119155<=m&&119162>=m||// Cf   [8] MUSICAL SYMBOL BEGIN BEAM..MUSICAL SYMBOL END PHRASE
917504==m||// Cn       <reserved-E0000>
917505==m||// Cf       LANGUAGE TAG
917506<=m&&917535>=m||// Cn  [30] <reserved-E0002>..<reserved-E001F>
917632<=m&&917759>=m||// Cn [128] <reserved-E0080>..<reserved-E00FF>
918000<=m&&921599>=m// Cn [3600] <reserved-E01F0>..<reserved-E0FFF>
?n:768<=m&&879>=m||// Mn [112] COMBINING GRAVE ACCENT..COMBINING LATIN SMALL LETTER X
1155<=m&&1159>=m||// Mn   [5] COMBINING CYRILLIC TITLO..COMBINING CYRILLIC POKRYTIE
1160<=m&&1161>=m||// Me   [2] COMBINING CYRILLIC HUNDRED THOUSANDS SIGN..COMBINING CYRILLIC MILLIONS SIGN
1425<=m&&1469>=m||// Mn  [45] HEBREW ACCENT ETNAHTA..HEBREW POINT METEG
1471==m||// Mn       HEBREW POINT RAFE
1473<=m&&1474>=m||// Mn   [2] HEBREW POINT SHIN DOT..HEBREW POINT SIN DOT
1476<=m&&1477>=m||// Mn   [2] HEBREW MARK UPPER DOT..HEBREW MARK LOWER DOT
1479==m||// Mn       HEBREW POINT QAMATS QATAN
1552<=m&&1562>=m||// Mn  [11] ARABIC SIGN SALLALLAHOU ALAYHE WASSALLAM..ARABIC SMALL KASRA
1611<=m&&1631>=m||// Mn  [21] ARABIC FATHATAN..ARABIC WAVY HAMZA BELOW
1648==m||// Mn       ARABIC LETTER SUPERSCRIPT ALEF
1750<=m&&1756>=m||// Mn   [7] ARABIC SMALL HIGH LIGATURE SAD WITH LAM WITH ALEF MAKSURA..ARABIC SMALL HIGH SEEN
1759<=m&&1764>=m||// Mn   [6] ARABIC SMALL HIGH ROUNDED ZERO..ARABIC SMALL HIGH MADDA
1767<=m&&1768>=m||// Mn   [2] ARABIC SMALL HIGH YEH..ARABIC SMALL HIGH NOON
1770<=m&&1773>=m||// Mn   [4] ARABIC EMPTY CENTRE LOW STOP..ARABIC SMALL LOW MEEM
1809==m||// Mn       SYRIAC LETTER SUPERSCRIPT ALAPH
1840<=m&&1866>=m||// Mn  [27] SYRIAC PTHAHA ABOVE..SYRIAC BARREKH
1958<=m&&1968>=m||// Mn  [11] THAANA ABAFILI..THAANA SUKUN
2027<=m&&2035>=m||// Mn   [9] NKO COMBINING SHORT HIGH TONE..NKO COMBINING DOUBLE DOT ABOVE
2070<=m&&2073>=m||// Mn   [4] SAMARITAN MARK IN..SAMARITAN MARK DAGESH
2075<=m&&2083>=m||// Mn   [9] SAMARITAN MARK EPENTHETIC YUT..SAMARITAN VOWEL SIGN A
2085<=m&&2087>=m||// Mn   [3] SAMARITAN VOWEL SIGN SHORT A..SAMARITAN VOWEL SIGN U
2089<=m&&2093>=m||// Mn   [5] SAMARITAN VOWEL SIGN LONG I..SAMARITAN MARK NEQUDAA
2137<=m&&2139>=m||// Mn   [3] MANDAIC AFFRICATION MARK..MANDAIC GEMINATION MARK
2260<=m&&2273>=m||// Mn  [14] ARABIC SMALL HIGH WORD AR-RUB..ARABIC SMALL HIGH SIGN SAFHA
2275<=m&&2306>=m||// Mn  [32] ARABIC TURNED DAMMA BELOW..DEVANAGARI SIGN ANUSVARA
2362==m||// Mn       DEVANAGARI VOWEL SIGN OE
2364==m||// Mn       DEVANAGARI SIGN NUKTA
2369<=m&&2376>=m||// Mn   [8] DEVANAGARI VOWEL SIGN U..DEVANAGARI VOWEL SIGN AI
2381==m||// Mn       DEVANAGARI SIGN VIRAMA
2385<=m&&2391>=m||// Mn   [7] DEVANAGARI STRESS SIGN UDATTA..DEVANAGARI VOWEL SIGN UUE
2402<=m&&2403>=m||// Mn   [2] DEVANAGARI VOWEL SIGN VOCALIC L..DEVANAGARI VOWEL SIGN VOCALIC LL
2433==m||// Mn       BENGALI SIGN CANDRABINDU
2492==m||// Mn       BENGALI SIGN NUKTA
2494==m||// Mc       BENGALI VOWEL SIGN AA
2497<=m&&2500>=m||// Mn   [4] BENGALI VOWEL SIGN U..BENGALI VOWEL SIGN VOCALIC RR
2509==m||// Mn       BENGALI SIGN VIRAMA
2519==m||// Mc       BENGALI AU LENGTH MARK
2530<=m&&2531>=m||// Mn   [2] BENGALI VOWEL SIGN VOCALIC L..BENGALI VOWEL SIGN VOCALIC LL
2561<=m&&2562>=m||// Mn   [2] GURMUKHI SIGN ADAK BINDI..GURMUKHI SIGN BINDI
2620==m||// Mn       GURMUKHI SIGN NUKTA
2625<=m&&2626>=m||// Mn   [2] GURMUKHI VOWEL SIGN U..GURMUKHI VOWEL SIGN UU
2631<=m&&2632>=m||// Mn   [2] GURMUKHI VOWEL SIGN EE..GURMUKHI VOWEL SIGN AI
2635<=m&&2637>=m||// Mn   [3] GURMUKHI VOWEL SIGN OO..GURMUKHI SIGN VIRAMA
2641==m||// Mn       GURMUKHI SIGN UDAAT
2672<=m&&2673>=m||// Mn   [2] GURMUKHI TIPPI..GURMUKHI ADDAK
2677==m||// Mn       GURMUKHI SIGN YAKASH
2689<=m&&2690>=m||// Mn   [2] GUJARATI SIGN CANDRABINDU..GUJARATI SIGN ANUSVARA
2748==m||// Mn       GUJARATI SIGN NUKTA
2753<=m&&2757>=m||// Mn   [5] GUJARATI VOWEL SIGN U..GUJARATI VOWEL SIGN CANDRA E
2759<=m&&2760>=m||// Mn   [2] GUJARATI VOWEL SIGN E..GUJARATI VOWEL SIGN AI
2765==m||// Mn       GUJARATI SIGN VIRAMA
2786<=m&&2787>=m||// Mn   [2] GUJARATI VOWEL SIGN VOCALIC L..GUJARATI VOWEL SIGN VOCALIC LL
2810<=m&&2815>=m||// Mn   [6] GUJARATI SIGN SUKUN..GUJARATI SIGN TWO-CIRCLE NUKTA ABOVE
2817==m||// Mn       ORIYA SIGN CANDRABINDU
2876==m||// Mn       ORIYA SIGN NUKTA
2878==m||// Mc       ORIYA VOWEL SIGN AA
2879==m||// Mn       ORIYA VOWEL SIGN I
2881<=m&&2884>=m||// Mn   [4] ORIYA VOWEL SIGN U..ORIYA VOWEL SIGN VOCALIC RR
2893==m||// Mn       ORIYA SIGN VIRAMA
2902==m||// Mn       ORIYA AI LENGTH MARK
2903==m||// Mc       ORIYA AU LENGTH MARK
2914<=m&&2915>=m||// Mn   [2] ORIYA VOWEL SIGN VOCALIC L..ORIYA VOWEL SIGN VOCALIC LL
2946==m||// Mn       TAMIL SIGN ANUSVARA
3006==m||// Mc       TAMIL VOWEL SIGN AA
3008==m||// Mn       TAMIL VOWEL SIGN II
3021==m||// Mn       TAMIL SIGN VIRAMA
3031==m||// Mc       TAMIL AU LENGTH MARK
3072==m||// Mn       TELUGU SIGN COMBINING CANDRABINDU ABOVE
3134<=m&&3136>=m||// Mn   [3] TELUGU VOWEL SIGN AA..TELUGU VOWEL SIGN II
3142<=m&&3144>=m||// Mn   [3] TELUGU VOWEL SIGN E..TELUGU VOWEL SIGN AI
3146<=m&&3149>=m||// Mn   [4] TELUGU VOWEL SIGN O..TELUGU SIGN VIRAMA
3157<=m&&3158>=m||// Mn   [2] TELUGU LENGTH MARK..TELUGU AI LENGTH MARK
3170<=m&&3171>=m||// Mn   [2] TELUGU VOWEL SIGN VOCALIC L..TELUGU VOWEL SIGN VOCALIC LL
3201==m||// Mn       KANNADA SIGN CANDRABINDU
3260==m||// Mn       KANNADA SIGN NUKTA
3263==m||// Mn       KANNADA VOWEL SIGN I
3266==m||// Mc       KANNADA VOWEL SIGN UU
3270==m||// Mn       KANNADA VOWEL SIGN E
3276<=m&&3277>=m||// Mn   [2] KANNADA VOWEL SIGN AU..KANNADA SIGN VIRAMA
3285<=m&&3286>=m||// Mc   [2] KANNADA LENGTH MARK..KANNADA AI LENGTH MARK
3298<=m&&3299>=m||// Mn   [2] KANNADA VOWEL SIGN VOCALIC L..KANNADA VOWEL SIGN VOCALIC LL
3328<=m&&3329>=m||// Mn   [2] MALAYALAM SIGN COMBINING ANUSVARA ABOVE..MALAYALAM SIGN CANDRABINDU
3387<=m&&3388>=m||// Mn   [2] MALAYALAM SIGN VERTICAL BAR VIRAMA..MALAYALAM SIGN CIRCULAR VIRAMA
3390==m||// Mc       MALAYALAM VOWEL SIGN AA
3393<=m&&3396>=m||// Mn   [4] MALAYALAM VOWEL SIGN U..MALAYALAM VOWEL SIGN VOCALIC RR
3405==m||// Mn       MALAYALAM SIGN VIRAMA
3415==m||// Mc       MALAYALAM AU LENGTH MARK
3426<=m&&3427>=m||// Mn   [2] MALAYALAM VOWEL SIGN VOCALIC L..MALAYALAM VOWEL SIGN VOCALIC LL
3530==m||// Mn       SINHALA SIGN AL-LAKUNA
3535==m||// Mc       SINHALA VOWEL SIGN AELA-PILLA
3538<=m&&3540>=m||// Mn   [3] SINHALA VOWEL SIGN KETTI IS-PILLA..SINHALA VOWEL SIGN KETTI PAA-PILLA
3542==m||// Mn       SINHALA VOWEL SIGN DIGA PAA-PILLA
3551==m||// Mc       SINHALA VOWEL SIGN GAYANUKITTA
3633==m||// Mn       THAI CHARACTER MAI HAN-AKAT
3636<=m&&3642>=m||// Mn   [7] THAI CHARACTER SARA I..THAI CHARACTER PHINTHU
3655<=m&&3662>=m||// Mn   [8] THAI CHARACTER MAITAIKHU..THAI CHARACTER YAMAKKAN
3761==m||// Mn       LAO VOWEL SIGN MAI KAN
3764<=m&&3769>=m||// Mn   [6] LAO VOWEL SIGN I..LAO VOWEL SIGN UU
3771<=m&&3772>=m||// Mn   [2] LAO VOWEL SIGN MAI KON..LAO SEMIVOWEL SIGN LO
3784<=m&&3789>=m||// Mn   [6] LAO TONE MAI EK..LAO NIGGAHITA
3864<=m&&3865>=m||// Mn   [2] TIBETAN ASTROLOGICAL SIGN -KHYUD PA..TIBETAN ASTROLOGICAL SIGN SDONG TSHUGS
3893==m||// Mn       TIBETAN MARK NGAS BZUNG NYI ZLA
3895==m||// Mn       TIBETAN MARK NGAS BZUNG SGOR RTAGS
3897==m||// Mn       TIBETAN MARK TSA -PHRU
3953<=m&&3966>=m||// Mn  [14] TIBETAN VOWEL SIGN AA..TIBETAN SIGN RJES SU NGA RO
3968<=m&&3972>=m||// Mn   [5] TIBETAN VOWEL SIGN REVERSED I..TIBETAN MARK HALANTA
3974<=m&&3975>=m||// Mn   [2] TIBETAN SIGN LCI RTAGS..TIBETAN SIGN YANG RTAGS
3981<=m&&3991>=m||// Mn  [11] TIBETAN SUBJOINED SIGN LCE TSA CAN..TIBETAN SUBJOINED LETTER JA
3993<=m&&4028>=m||// Mn  [36] TIBETAN SUBJOINED LETTER NYA..TIBETAN SUBJOINED LETTER FIXED-FORM RA
4038==m||// Mn       TIBETAN SYMBOL PADMA GDAN
4141<=m&&4144>=m||// Mn   [4] MYANMAR VOWEL SIGN I..MYANMAR VOWEL SIGN UU
4146<=m&&4151>=m||// Mn   [6] MYANMAR VOWEL SIGN AI..MYANMAR SIGN DOT BELOW
4153<=m&&4154>=m||// Mn   [2] MYANMAR SIGN VIRAMA..MYANMAR SIGN ASAT
4157<=m&&4158>=m||// Mn   [2] MYANMAR CONSONANT SIGN MEDIAL WA..MYANMAR CONSONANT SIGN MEDIAL HA
4184<=m&&4185>=m||// Mn   [2] MYANMAR VOWEL SIGN VOCALIC L..MYANMAR VOWEL SIGN VOCALIC LL
4190<=m&&4192>=m||// Mn   [3] MYANMAR CONSONANT SIGN MON MEDIAL NA..MYANMAR CONSONANT SIGN MON MEDIAL LA
4209<=m&&4212>=m||// Mn   [4] MYANMAR VOWEL SIGN GEBA KAREN I..MYANMAR VOWEL SIGN KAYAH EE
4226==m||// Mn       MYANMAR CONSONANT SIGN SHAN MEDIAL WA
4229<=m&&4230>=m||// Mn   [2] MYANMAR VOWEL SIGN SHAN E ABOVE..MYANMAR VOWEL SIGN SHAN FINAL Y
4237==m||// Mn       MYANMAR SIGN SHAN COUNCIL EMPHATIC TONE
4253==m||// Mn       MYANMAR VOWEL SIGN AITON AI
4957<=m&&4959>=m||// Mn   [3] ETHIOPIC COMBINING GEMINATION AND VOWEL LENGTH MARK..ETHIOPIC COMBINING GEMINATION MARK
5906<=m&&5908>=m||// Mn   [3] TAGALOG VOWEL SIGN I..TAGALOG SIGN VIRAMA
5938<=m&&5940>=m||// Mn   [3] HANUNOO VOWEL SIGN I..HANUNOO SIGN PAMUDPOD
5970<=m&&5971>=m||// Mn   [2] BUHID VOWEL SIGN I..BUHID VOWEL SIGN U
6002<=m&&6003>=m||// Mn   [2] TAGBANWA VOWEL SIGN I..TAGBANWA VOWEL SIGN U
6068<=m&&6069>=m||// Mn   [2] KHMER VOWEL INHERENT AQ..KHMER VOWEL INHERENT AA
6071<=m&&6077>=m||// Mn   [7] KHMER VOWEL SIGN I..KHMER VOWEL SIGN UA
6086==m||// Mn       KHMER SIGN NIKAHIT
6089<=m&&6099>=m||// Mn  [11] KHMER SIGN MUUSIKATOAN..KHMER SIGN BATHAMASAT
6109==m||// Mn       KHMER SIGN ATTHACAN
6155<=m&&6157>=m||// Mn   [3] MONGOLIAN FREE VARIATION SELECTOR ONE..MONGOLIAN FREE VARIATION SELECTOR THREE
6277<=m&&6278>=m||// Mn   [2] MONGOLIAN LETTER ALI GALI BALUDA..MONGOLIAN LETTER ALI GALI THREE BALUDA
6313==m||// Mn       MONGOLIAN LETTER ALI GALI DAGALGA
6432<=m&&6434>=m||// Mn   [3] LIMBU VOWEL SIGN A..LIMBU VOWEL SIGN U
6439<=m&&6440>=m||// Mn   [2] LIMBU VOWEL SIGN E..LIMBU VOWEL SIGN O
6450==m||// Mn       LIMBU SMALL LETTER ANUSVARA
6457<=m&&6459>=m||// Mn   [3] LIMBU SIGN MUKPHRENG..LIMBU SIGN SA-I
6679<=m&&6680>=m||// Mn   [2] BUGINESE VOWEL SIGN I..BUGINESE VOWEL SIGN U
6683==m||// Mn       BUGINESE VOWEL SIGN AE
6742==m||// Mn       TAI THAM CONSONANT SIGN MEDIAL LA
6744<=m&&6750>=m||// Mn   [7] TAI THAM SIGN MAI KANG LAI..TAI THAM CONSONANT SIGN SA
6752==m||// Mn       TAI THAM SIGN SAKOT
6754==m||// Mn       TAI THAM VOWEL SIGN MAI SAT
6757<=m&&6764>=m||// Mn   [8] TAI THAM VOWEL SIGN I..TAI THAM VOWEL SIGN OA BELOW
6771<=m&&6780>=m||// Mn  [10] TAI THAM VOWEL SIGN OA ABOVE..TAI THAM SIGN KHUEN-LUE KARAN
6783==m||// Mn       TAI THAM COMBINING CRYPTOGRAMMIC DOT
6832<=m&&6845>=m||// Mn  [14] COMBINING DOUBLED CIRCUMFLEX ACCENT..COMBINING PARENTHESES BELOW
6846==m||// Me       COMBINING PARENTHESES OVERLAY
6912<=m&&6915>=m||// Mn   [4] BALINESE SIGN ULU RICEM..BALINESE SIGN SURANG
6964==m||// Mn       BALINESE SIGN REREKAN
6966<=m&&6970>=m||// Mn   [5] BALINESE VOWEL SIGN ULU..BALINESE VOWEL SIGN RA REPA
6972==m||// Mn       BALINESE VOWEL SIGN LA LENGA
6978==m||// Mn       BALINESE VOWEL SIGN PEPET
7019<=m&&7027>=m||// Mn   [9] BALINESE MUSICAL SYMBOL COMBINING TEGEH..BALINESE MUSICAL SYMBOL COMBINING GONG
7040<=m&&7041>=m||// Mn   [2] SUNDANESE SIGN PANYECEK..SUNDANESE SIGN PANGLAYAR
7074<=m&&7077>=m||// Mn   [4] SUNDANESE CONSONANT SIGN PANYAKRA..SUNDANESE VOWEL SIGN PANYUKU
7080<=m&&7081>=m||// Mn   [2] SUNDANESE VOWEL SIGN PAMEPET..SUNDANESE VOWEL SIGN PANEULEUNG
7083<=m&&7085>=m||// Mn   [3] SUNDANESE SIGN VIRAMA..SUNDANESE CONSONANT SIGN PASANGAN WA
7142==m||// Mn       BATAK SIGN TOMPI
7144<=m&&7145>=m||// Mn   [2] BATAK VOWEL SIGN PAKPAK E..BATAK VOWEL SIGN EE
7149==m||// Mn       BATAK VOWEL SIGN KARO O
7151<=m&&7153>=m||// Mn   [3] BATAK VOWEL SIGN U FOR SIMALUNGUN SA..BATAK CONSONANT SIGN H
7212<=m&&7219>=m||// Mn   [8] LEPCHA VOWEL SIGN E..LEPCHA CONSONANT SIGN T
7222<=m&&7223>=m||// Mn   [2] LEPCHA SIGN RAN..LEPCHA SIGN NUKTA
7376<=m&&7378>=m||// Mn   [3] VEDIC TONE KARSHANA..VEDIC TONE PRENKHA
7380<=m&&7392>=m||// Mn  [13] VEDIC SIGN YAJURVEDIC MIDLINE SVARITA..VEDIC TONE RIGVEDIC KASHMIRI INDEPENDENT SVARITA
7394<=m&&7400>=m||// Mn   [7] VEDIC SIGN VISARGA SVARITA..VEDIC SIGN VISARGA ANUDATTA WITH TAIL
7405==m||// Mn       VEDIC SIGN TIRYAK
7412==m||// Mn       VEDIC TONE CANDRA ABOVE
7416<=m&&7417>=m||// Mn   [2] VEDIC TONE RING ABOVE..VEDIC TONE DOUBLE RING ABOVE
7616<=m&&7673>=m||// Mn  [58] COMBINING DOTTED GRAVE ACCENT..COMBINING WIDE INVERTED BRIDGE BELOW
7675<=m&&7679>=m||// Mn   [5] COMBINING DELETION MARK..COMBINING RIGHT ARROWHEAD AND DOWN ARROWHEAD BELOW
8204==m||// Cf       ZERO WIDTH NON-JOINER
8400<=m&&8412>=m||// Mn  [13] COMBINING LEFT HARPOON ABOVE..COMBINING FOUR DOTS ABOVE
8413<=m&&8416>=m||// Me   [4] COMBINING ENCLOSING CIRCLE..COMBINING ENCLOSING CIRCLE BACKSLASH
8417==m||// Mn       COMBINING LEFT RIGHT ARROW ABOVE
8418<=m&&8420>=m||// Me   [3] COMBINING ENCLOSING SCREEN..COMBINING ENCLOSING UPWARD POINTING TRIANGLE
8421<=m&&8432>=m||// Mn  [12] COMBINING REVERSE SOLIDUS OVERLAY..COMBINING ASTERISK ABOVE
11503<=m&&11505>=m||// Mn   [3] COPTIC COMBINING NI ABOVE..COPTIC COMBINING SPIRITUS LENIS
11647==m||// Mn       TIFINAGH CONSONANT JOINER
11744<=m&&11775>=m||// Mn  [32] COMBINING CYRILLIC LETTER BE..COMBINING CYRILLIC LETTER IOTIFIED BIG YUS
12330<=m&&12333>=m||// Mn   [4] IDEOGRAPHIC LEVEL TONE MARK..IDEOGRAPHIC ENTERING TONE MARK
12334<=m&&12335>=m||// Mc   [2] HANGUL SINGLE DOT TONE MARK..HANGUL DOUBLE DOT TONE MARK
12441<=m&&12442>=m||// Mn   [2] COMBINING KATAKANA-HIRAGANA VOICED SOUND MARK..COMBINING KATAKANA-HIRAGANA SEMI-VOICED SOUND MARK
42607==m||// Mn       COMBINING CYRILLIC VZMET
42608<=m&&42610>=m||// Me   [3] COMBINING CYRILLIC TEN MILLIONS SIGN..COMBINING CYRILLIC THOUSAND MILLIONS SIGN
42612<=m&&42621>=m||// Mn  [10] COMBINING CYRILLIC LETTER UKRAINIAN IE..COMBINING CYRILLIC PAYEROK
42654<=m&&42655>=m||// Mn   [2] COMBINING CYRILLIC LETTER EF..COMBINING CYRILLIC LETTER IOTIFIED E
42736<=m&&42737>=m||// Mn   [2] BAMUM COMBINING MARK KOQNDON..BAMUM COMBINING MARK TUKWENTIS
43010==m||// Mn       SYLOTI NAGRI SIGN DVISVARA
43014==m||// Mn       SYLOTI NAGRI SIGN HASANTA
43019==m||// Mn       SYLOTI NAGRI SIGN ANUSVARA
43045<=m&&43046>=m||// Mn   [2] SYLOTI NAGRI VOWEL SIGN U..SYLOTI NAGRI VOWEL SIGN E
43204<=m&&43205>=m||// Mn   [2] SAURASHTRA SIGN VIRAMA..SAURASHTRA SIGN CANDRABINDU
43232<=m&&43249>=m||// Mn  [18] COMBINING DEVANAGARI DIGIT ZERO..COMBINING DEVANAGARI SIGN AVAGRAHA
43302<=m&&43309>=m||// Mn   [8] KAYAH LI VOWEL UE..KAYAH LI TONE CALYA PLOPHU
43335<=m&&43345>=m||// Mn  [11] REJANG VOWEL SIGN I..REJANG CONSONANT SIGN R
43392<=m&&43394>=m||// Mn   [3] JAVANESE SIGN PANYANGGA..JAVANESE SIGN LAYAR
43443==m||// Mn       JAVANESE SIGN CECAK TELU
43446<=m&&43449>=m||// Mn   [4] JAVANESE VOWEL SIGN WULU..JAVANESE VOWEL SIGN SUKU MENDUT
43452==m||// Mn       JAVANESE VOWEL SIGN PEPET
43493==m||// Mn       MYANMAR SIGN SHAN SAW
43561<=m&&43566>=m||// Mn   [6] CHAM VOWEL SIGN AA..CHAM VOWEL SIGN OE
43569<=m&&43570>=m||// Mn   [2] CHAM VOWEL SIGN AU..CHAM VOWEL SIGN UE
43573<=m&&43574>=m||// Mn   [2] CHAM CONSONANT SIGN LA..CHAM CONSONANT SIGN WA
43587==m||// Mn       CHAM CONSONANT SIGN FINAL NG
43596==m||// Mn       CHAM CONSONANT SIGN FINAL M
43644==m||// Mn       MYANMAR SIGN TAI LAING TONE-2
43696==m||// Mn       TAI VIET MAI KANG
43698<=m&&43700>=m||// Mn   [3] TAI VIET VOWEL I..TAI VIET VOWEL U
43703<=m&&43704>=m||// Mn   [2] TAI VIET MAI KHIT..TAI VIET VOWEL IA
43710<=m&&43711>=m||// Mn   [2] TAI VIET VOWEL AM..TAI VIET TONE MAI EK
43713==m||// Mn       TAI VIET TONE MAI THO
43756<=m&&43757>=m||// Mn   [2] MEETEI MAYEK VOWEL SIGN UU..MEETEI MAYEK VOWEL SIGN AAI
43766==m||// Mn       MEETEI MAYEK VIRAMA
44005==m||// Mn       MEETEI MAYEK VOWEL SIGN ANAP
44008==m||// Mn       MEETEI MAYEK VOWEL SIGN UNAP
44013==m||// Mn       MEETEI MAYEK APUN IYEK
64286==m||// Mn       HEBREW POINT JUDEO-SPANISH VARIKA
65024<=m&&65039>=m||// Mn  [16] VARIATION SELECTOR-1..VARIATION SELECTOR-16
65056<=m&&65071>=m||// Mn  [16] COMBINING LIGATURE LEFT HALF..COMBINING CYRILLIC TITLO RIGHT HALF
65438<=m&&65439>=m||// Lm   [2] HALFWIDTH KATAKANA VOICED SOUND MARK..HALFWIDTH KATAKANA SEMI-VOICED SOUND MARK
66045==m||// Mn       PHAISTOS DISC SIGN COMBINING OBLIQUE STROKE
66272==m||// Mn       COPTIC EPACT THOUSANDS MARK
66422<=m&&66426>=m||// Mn   [5] COMBINING OLD PERMIC LETTER AN..COMBINING OLD PERMIC LETTER SII
68097<=m&&68099>=m||// Mn   [3] KHAROSHTHI VOWEL SIGN I..KHAROSHTHI VOWEL SIGN VOCALIC R
68101<=m&&68102>=m||// Mn   [2] KHAROSHTHI VOWEL SIGN E..KHAROSHTHI VOWEL SIGN O
68108<=m&&68111>=m||// Mn   [4] KHAROSHTHI VOWEL LENGTH MARK..KHAROSHTHI SIGN VISARGA
68152<=m&&68154>=m||// Mn   [3] KHAROSHTHI SIGN BAR ABOVE..KHAROSHTHI SIGN DOT BELOW
68159==m||// Mn       KHAROSHTHI VIRAMA
68325<=m&&68326>=m||// Mn   [2] MANICHAEAN ABBREVIATION MARK ABOVE..MANICHAEAN ABBREVIATION MARK BELOW
69633==m||// Mn       BRAHMI SIGN ANUSVARA
69688<=m&&69702>=m||// Mn  [15] BRAHMI VOWEL SIGN AA..BRAHMI VIRAMA
69759<=m&&69761>=m||// Mn   [3] BRAHMI NUMBER JOINER..KAITHI SIGN ANUSVARA
69811<=m&&69814>=m||// Mn   [4] KAITHI VOWEL SIGN U..KAITHI VOWEL SIGN AI
69817<=m&&69818>=m||// Mn   [2] KAITHI SIGN VIRAMA..KAITHI SIGN NUKTA
69888<=m&&69890>=m||// Mn   [3] CHAKMA SIGN CANDRABINDU..CHAKMA SIGN VISARGA
69927<=m&&69931>=m||// Mn   [5] CHAKMA VOWEL SIGN A..CHAKMA VOWEL SIGN UU
69933<=m&&69940>=m||// Mn   [8] CHAKMA VOWEL SIGN AI..CHAKMA MAAYYAA
70003==m||// Mn       MAHAJANI SIGN NUKTA
70016<=m&&70017>=m||// Mn   [2] SHARADA SIGN CANDRABINDU..SHARADA SIGN ANUSVARA
70070<=m&&70078>=m||// Mn   [9] SHARADA VOWEL SIGN U..SHARADA VOWEL SIGN O
70090<=m&&70092>=m||// Mn   [3] SHARADA SIGN NUKTA..SHARADA EXTRA SHORT VOWEL MARK
70191<=m&&70193>=m||// Mn   [3] KHOJKI VOWEL SIGN U..KHOJKI VOWEL SIGN AI
70196==m||// Mn       KHOJKI SIGN ANUSVARA
70198<=m&&70199>=m||// Mn   [2] KHOJKI SIGN NUKTA..KHOJKI SIGN SHADDA
70206==m||// Mn       KHOJKI SIGN SUKUN
70367==m||// Mn       KHUDAWADI SIGN ANUSVARA
70371<=m&&70378>=m||// Mn   [8] KHUDAWADI VOWEL SIGN U..KHUDAWADI SIGN VIRAMA
70400<=m&&70401>=m||// Mn   [2] GRANTHA SIGN COMBINING ANUSVARA ABOVE..GRANTHA SIGN CANDRABINDU
70460==m||// Mn       GRANTHA SIGN NUKTA
70462==m||// Mc       GRANTHA VOWEL SIGN AA
70464==m||// Mn       GRANTHA VOWEL SIGN II
70487==m||// Mc       GRANTHA AU LENGTH MARK
70502<=m&&70508>=m||// Mn   [7] COMBINING GRANTHA DIGIT ZERO..COMBINING GRANTHA DIGIT SIX
70512<=m&&70516>=m||// Mn   [5] COMBINING GRANTHA LETTER A..COMBINING GRANTHA LETTER PA
70712<=m&&70719>=m||// Mn   [8] NEWA VOWEL SIGN U..NEWA VOWEL SIGN AI
70722<=m&&70724>=m||// Mn   [3] NEWA SIGN VIRAMA..NEWA SIGN ANUSVARA
70726==m||// Mn       NEWA SIGN NUKTA
70832==m||// Mc       TIRHUTA VOWEL SIGN AA
70835<=m&&70840>=m||// Mn   [6] TIRHUTA VOWEL SIGN U..TIRHUTA VOWEL SIGN VOCALIC LL
70842==m||// Mn       TIRHUTA VOWEL SIGN SHORT E
70845==m||// Mc       TIRHUTA VOWEL SIGN SHORT O
70847<=m&&70848>=m||// Mn   [2] TIRHUTA SIGN CANDRABINDU..TIRHUTA SIGN ANUSVARA
70850<=m&&70851>=m||// Mn   [2] TIRHUTA SIGN VIRAMA..TIRHUTA SIGN NUKTA
71087==m||// Mc       SIDDHAM VOWEL SIGN AA
71090<=m&&71093>=m||// Mn   [4] SIDDHAM VOWEL SIGN U..SIDDHAM VOWEL SIGN VOCALIC RR
71100<=m&&71101>=m||// Mn   [2] SIDDHAM SIGN CANDRABINDU..SIDDHAM SIGN ANUSVARA
71103<=m&&71104>=m||// Mn   [2] SIDDHAM SIGN VIRAMA..SIDDHAM SIGN NUKTA
71132<=m&&71133>=m||// Mn   [2] SIDDHAM VOWEL SIGN ALTERNATE U..SIDDHAM VOWEL SIGN ALTERNATE UU
71219<=m&&71226>=m||// Mn   [8] MODI VOWEL SIGN U..MODI VOWEL SIGN AI
71229==m||// Mn       MODI SIGN ANUSVARA
71231<=m&&71232>=m||// Mn   [2] MODI SIGN VIRAMA..MODI SIGN ARDHACANDRA
71339==m||// Mn       TAKRI SIGN ANUSVARA
71341==m||// Mn       TAKRI VOWEL SIGN AA
71344<=m&&71349>=m||// Mn   [6] TAKRI VOWEL SIGN U..TAKRI VOWEL SIGN AU
71351==m||// Mn       TAKRI SIGN NUKTA
71453<=m&&71455>=m||// Mn   [3] AHOM CONSONANT SIGN MEDIAL LA..AHOM CONSONANT SIGN MEDIAL LIGATING RA
71458<=m&&71461>=m||// Mn   [4] AHOM VOWEL SIGN I..AHOM VOWEL SIGN UU
71463<=m&&71467>=m||// Mn   [5] AHOM VOWEL SIGN AW..AHOM SIGN KILLER
72193<=m&&72198>=m||// Mn   [6] ZANABAZAR SQUARE VOWEL SIGN I..ZANABAZAR SQUARE VOWEL SIGN O
72201<=m&&72202>=m||// Mn   [2] ZANABAZAR SQUARE VOWEL SIGN REVERSED I..ZANABAZAR SQUARE VOWEL LENGTH MARK
72243<=m&&72248>=m||// Mn   [6] ZANABAZAR SQUARE FINAL CONSONANT MARK..ZANABAZAR SQUARE SIGN ANUSVARA
72251<=m&&72254>=m||// Mn   [4] ZANABAZAR SQUARE CLUSTER-FINAL LETTER YA..ZANABAZAR SQUARE CLUSTER-FINAL LETTER VA
72263==m||// Mn       ZANABAZAR SQUARE SUBJOINER
72273<=m&&72278>=m||// Mn   [6] SOYOMBO VOWEL SIGN I..SOYOMBO VOWEL SIGN OE
72281<=m&&72283>=m||// Mn   [3] SOYOMBO VOWEL SIGN VOCALIC R..SOYOMBO VOWEL LENGTH MARK
72330<=m&&72342>=m||// Mn  [13] SOYOMBO FINAL CONSONANT SIGN G..SOYOMBO SIGN ANUSVARA
72344<=m&&72345>=m||// Mn   [2] SOYOMBO GEMINATION MARK..SOYOMBO SUBJOINER
72752<=m&&72758>=m||// Mn   [7] BHAIKSUKI VOWEL SIGN I..BHAIKSUKI VOWEL SIGN VOCALIC L
72760<=m&&72765>=m||// Mn   [6] BHAIKSUKI VOWEL SIGN E..BHAIKSUKI SIGN ANUSVARA
72767==m||// Mn       BHAIKSUKI SIGN VIRAMA
72850<=m&&72871>=m||// Mn  [22] MARCHEN SUBJOINED LETTER KA..MARCHEN SUBJOINED LETTER ZA
72874<=m&&72880>=m||// Mn   [7] MARCHEN SUBJOINED LETTER RA..MARCHEN VOWEL SIGN AA
72882<=m&&72883>=m||// Mn   [2] MARCHEN VOWEL SIGN U..MARCHEN VOWEL SIGN E
72885<=m&&72886>=m||// Mn   [2] MARCHEN SIGN ANUSVARA..MARCHEN SIGN CANDRABINDU
73009<=m&&73014>=m||// Mn   [6] MASARAM GONDI VOWEL SIGN AA..MASARAM GONDI VOWEL SIGN VOCALIC R
73018==m||// Mn       MASARAM GONDI VOWEL SIGN E
73020<=m&&73021>=m||// Mn   [2] MASARAM GONDI VOWEL SIGN AI..MASARAM GONDI VOWEL SIGN O
73023<=m&&73029>=m||// Mn   [7] MASARAM GONDI VOWEL SIGN AU..MASARAM GONDI VIRAMA
73031==m||// Mn       MASARAM GONDI RA-KARA
92912<=m&&92916>=m||// Mn   [5] BASSA VAH COMBINING HIGH TONE..BASSA VAH COMBINING HIGH-LOW TONE
92976<=m&&92982>=m||// Mn   [7] PAHAWH HMONG MARK CIM TUB..PAHAWH HMONG MARK CIM TAUM
94095<=m&&94098>=m||// Mn   [4] MIAO TONE RIGHT..MIAO TONE BELOW
113821<=m&&113822>=m||// Mn   [2] DUPLOYAN THICK LETTER SELECTOR..DUPLOYAN DOUBLE MARK
119141==m||// Mc       MUSICAL SYMBOL COMBINING STEM
119143<=m&&119145>=m||// Mn   [3] MUSICAL SYMBOL COMBINING TREMOLO-1..MUSICAL SYMBOL COMBINING TREMOLO-3
119150<=m&&119154>=m||// Mc   [5] MUSICAL SYMBOL COMBINING FLAG-1..MUSICAL SYMBOL COMBINING FLAG-5
119163<=m&&119170>=m||// Mn   [8] MUSICAL SYMBOL COMBINING ACCENT..MUSICAL SYMBOL COMBINING LOURE
119173<=m&&119179>=m||// Mn   [7] MUSICAL SYMBOL COMBINING DOIT..MUSICAL SYMBOL COMBINING TRIPLE TONGUE
119210<=m&&119213>=m||// Mn   [4] MUSICAL SYMBOL COMBINING DOWN BOW..MUSICAL SYMBOL COMBINING SNAP PIZZICATO
119362<=m&&119364>=m||// Mn   [3] COMBINING GREEK MUSICAL TRISEME..COMBINING GREEK MUSICAL PENTASEME
121344<=m&&121398>=m||// Mn  [55] SIGNWRITING HEAD RIM..SIGNWRITING AIR SUCKING IN
121403<=m&&121452>=m||// Mn  [50] SIGNWRITING MOUTH CLOSED NEUTRAL..SIGNWRITING EXCITEMENT
121461==m||// Mn       SIGNWRITING UPPER BODY TILTING FROM HIP JOINTS
121476==m||// Mn       SIGNWRITING LOCATION HEAD NECK
121499<=m&&121503>=m||// Mn   [5] SIGNWRITING FILL MODIFIER-2..SIGNWRITING FILL MODIFIER-6
121505<=m&&121519>=m||// Mn  [15] SIGNWRITING ROTATION MODIFIER-2..SIGNWRITING ROTATION MODIFIER-16
122880<=m&&122886>=m||// Mn   [7] COMBINING GLAGOLITIC LETTER AZU..COMBINING GLAGOLITIC LETTER ZHIVETE
122888<=m&&122904>=m||// Mn  [17] COMBINING GLAGOLITIC LETTER ZEMLJA..COMBINING GLAGOLITIC LETTER HERU
122907<=m&&122913>=m||// Mn   [7] COMBINING GLAGOLITIC LETTER SHTA..COMBINING GLAGOLITIC LETTER YATI
122915<=m&&122916>=m||// Mn   [2] COMBINING GLAGOLITIC LETTER YU..COMBINING GLAGOLITIC LETTER SMALL YUS
122918<=m&&122922>=m||// Mn   [5] COMBINING GLAGOLITIC LETTER YO..COMBINING GLAGOLITIC LETTER FITA
125136<=m&&125142>=m||// Mn   [7] MENDE KIKAKUI COMBINING NUMBER TEENS..MENDE KIKAKUI COMBINING NUMBER MILLIONS
125252<=m&&125258>=m||// Mn   [7] ADLAM ALIF LENGTHENER..ADLAM NUKTA
917536<=m&&917631>=m||// Cf  [96] TAG SPACE..CANCEL TAG
917760<=m&&917999>=m// Mn [240] VARIATION SELECTOR-17..VARIATION SELECTOR-256
?i:127462<=m&&127487>=m?r:2307==m||// Mc       DEVANAGARI SIGN VISARGA
2363==m||// Mc       DEVANAGARI VOWEL SIGN OOE
2366<=m&&2368>=m||// Mc   [3] DEVANAGARI VOWEL SIGN AA..DEVANAGARI VOWEL SIGN II
2377<=m&&2380>=m||// Mc   [4] DEVANAGARI VOWEL SIGN CANDRA O..DEVANAGARI VOWEL SIGN AU
2382<=m&&2383>=m||// Mc   [2] DEVANAGARI VOWEL SIGN PRISHTHAMATRA E..DEVANAGARI VOWEL SIGN AW
2434<=m&&2435>=m||// Mc   [2] BENGALI SIGN ANUSVARA..BENGALI SIGN VISARGA
2495<=m&&2496>=m||// Mc   [2] BENGALI VOWEL SIGN I..BENGALI VOWEL SIGN II
2503<=m&&2504>=m||// Mc   [2] BENGALI VOWEL SIGN E..BENGALI VOWEL SIGN AI
2507<=m&&2508>=m||// Mc   [2] BENGALI VOWEL SIGN O..BENGALI VOWEL SIGN AU
2563==m||// Mc       GURMUKHI SIGN VISARGA
2622<=m&&2624>=m||// Mc   [3] GURMUKHI VOWEL SIGN AA..GURMUKHI VOWEL SIGN II
2691==m||// Mc       GUJARATI SIGN VISARGA
2750<=m&&2752>=m||// Mc   [3] GUJARATI VOWEL SIGN AA..GUJARATI VOWEL SIGN II
2761==m||// Mc       GUJARATI VOWEL SIGN CANDRA O
2763<=m&&2764>=m||// Mc   [2] GUJARATI VOWEL SIGN O..GUJARATI VOWEL SIGN AU
2818<=m&&2819>=m||// Mc   [2] ORIYA SIGN ANUSVARA..ORIYA SIGN VISARGA
2880==m||// Mc       ORIYA VOWEL SIGN II
2887<=m&&2888>=m||// Mc   [2] ORIYA VOWEL SIGN E..ORIYA VOWEL SIGN AI
2891<=m&&2892>=m||// Mc   [2] ORIYA VOWEL SIGN O..ORIYA VOWEL SIGN AU
3007==m||// Mc       TAMIL VOWEL SIGN I
3009<=m&&3010>=m||// Mc   [2] TAMIL VOWEL SIGN U..TAMIL VOWEL SIGN UU
3014<=m&&3016>=m||// Mc   [3] TAMIL VOWEL SIGN E..TAMIL VOWEL SIGN AI
3018<=m&&3020>=m||// Mc   [3] TAMIL VOWEL SIGN O..TAMIL VOWEL SIGN AU
3073<=m&&3075>=m||// Mc   [3] TELUGU SIGN CANDRABINDU..TELUGU SIGN VISARGA
3137<=m&&3140>=m||// Mc   [4] TELUGU VOWEL SIGN U..TELUGU VOWEL SIGN VOCALIC RR
3202<=m&&3203>=m||// Mc   [2] KANNADA SIGN ANUSVARA..KANNADA SIGN VISARGA
3262==m||// Mc       KANNADA VOWEL SIGN AA
3264<=m&&3265>=m||// Mc   [2] KANNADA VOWEL SIGN II..KANNADA VOWEL SIGN U
3267<=m&&3268>=m||// Mc   [2] KANNADA VOWEL SIGN VOCALIC R..KANNADA VOWEL SIGN VOCALIC RR
3271<=m&&3272>=m||// Mc   [2] KANNADA VOWEL SIGN EE..KANNADA VOWEL SIGN AI
3274<=m&&3275>=m||// Mc   [2] KANNADA VOWEL SIGN O..KANNADA VOWEL SIGN OO
3330<=m&&3331>=m||// Mc   [2] MALAYALAM SIGN ANUSVARA..MALAYALAM SIGN VISARGA
3391<=m&&3392>=m||// Mc   [2] MALAYALAM VOWEL SIGN I..MALAYALAM VOWEL SIGN II
3398<=m&&3400>=m||// Mc   [3] MALAYALAM VOWEL SIGN E..MALAYALAM VOWEL SIGN AI
3402<=m&&3404>=m||// Mc   [3] MALAYALAM VOWEL SIGN O..MALAYALAM VOWEL SIGN AU
3458<=m&&3459>=m||// Mc   [2] SINHALA SIGN ANUSVARAYA..SINHALA SIGN VISARGAYA
3536<=m&&3537>=m||// Mc   [2] SINHALA VOWEL SIGN KETTI AEDA-PILLA..SINHALA VOWEL SIGN DIGA AEDA-PILLA
3544<=m&&3550>=m||// Mc   [7] SINHALA VOWEL SIGN GAETTA-PILLA..SINHALA VOWEL SIGN KOMBUVA HAA GAYANUKITTA
3570<=m&&3571>=m||// Mc   [2] SINHALA VOWEL SIGN DIGA GAETTA-PILLA..SINHALA VOWEL SIGN DIGA GAYANUKITTA
3635==m||// Lo       THAI CHARACTER SARA AM
3763==m||// Lo       LAO VOWEL SIGN AM
3902<=m&&3903>=m||// Mc   [2] TIBETAN SIGN YAR TSHES..TIBETAN SIGN MAR TSHES
3967==m||// Mc       TIBETAN SIGN RNAM BCAD
4145==m||// Mc       MYANMAR VOWEL SIGN E
4155<=m&&4156>=m||// Mc   [2] MYANMAR CONSONANT SIGN MEDIAL YA..MYANMAR CONSONANT SIGN MEDIAL RA
4182<=m&&4183>=m||// Mc   [2] MYANMAR VOWEL SIGN VOCALIC R..MYANMAR VOWEL SIGN VOCALIC RR
4228==m||// Mc       MYANMAR VOWEL SIGN SHAN E
6070==m||// Mc       KHMER VOWEL SIGN AA
6078<=m&&6085>=m||// Mc   [8] KHMER VOWEL SIGN OE..KHMER VOWEL SIGN AU
6087<=m&&6088>=m||// Mc   [2] KHMER SIGN REAHMUK..KHMER SIGN YUUKALEAPINTU
6435<=m&&6438>=m||// Mc   [4] LIMBU VOWEL SIGN EE..LIMBU VOWEL SIGN AU
6441<=m&&6443>=m||// Mc   [3] LIMBU SUBJOINED LETTER YA..LIMBU SUBJOINED LETTER WA
6448<=m&&6449>=m||// Mc   [2] LIMBU SMALL LETTER KA..LIMBU SMALL LETTER NGA
6451<=m&&6456>=m||// Mc   [6] LIMBU SMALL LETTER TA..LIMBU SMALL LETTER LA
6681<=m&&6682>=m||// Mc   [2] BUGINESE VOWEL SIGN E..BUGINESE VOWEL SIGN O
6741==m||// Mc       TAI THAM CONSONANT SIGN MEDIAL RA
6743==m||// Mc       TAI THAM CONSONANT SIGN LA TANG LAI
6765<=m&&6770>=m||// Mc   [6] TAI THAM VOWEL SIGN OY..TAI THAM VOWEL SIGN THAM AI
6916==m||// Mc       BALINESE SIGN BISAH
6965==m||// Mc       BALINESE VOWEL SIGN TEDUNG
6971==m||// Mc       BALINESE VOWEL SIGN RA REPA TEDUNG
6973<=m&&6977>=m||// Mc   [5] BALINESE VOWEL SIGN LA LENGA TEDUNG..BALINESE VOWEL SIGN TALING REPA TEDUNG
6979<=m&&6980>=m||// Mc   [2] BALINESE VOWEL SIGN PEPET TEDUNG..BALINESE ADEG ADEG
7042==m||// Mc       SUNDANESE SIGN PANGWISAD
7073==m||// Mc       SUNDANESE CONSONANT SIGN PAMINGKAL
7078<=m&&7079>=m||// Mc   [2] SUNDANESE VOWEL SIGN PANAELAENG..SUNDANESE VOWEL SIGN PANOLONG
7082==m||// Mc       SUNDANESE SIGN PAMAAEH
7143==m||// Mc       BATAK VOWEL SIGN E
7146<=m&&7148>=m||// Mc   [3] BATAK VOWEL SIGN I..BATAK VOWEL SIGN O
7150==m||// Mc       BATAK VOWEL SIGN U
7154<=m&&7155>=m||// Mc   [2] BATAK PANGOLAT..BATAK PANONGONAN
7204<=m&&7211>=m||// Mc   [8] LEPCHA SUBJOINED LETTER YA..LEPCHA VOWEL SIGN UU
7220<=m&&7221>=m||// Mc   [2] LEPCHA CONSONANT SIGN NYIN-DO..LEPCHA CONSONANT SIGN KANG
7393==m||// Mc       VEDIC TONE ATHARVAVEDIC INDEPENDENT SVARITA
7410<=m&&7411>=m||// Mc   [2] VEDIC SIGN ARDHAVISARGA..VEDIC SIGN ROTATED ARDHAVISARGA
7415==m||// Mc       VEDIC SIGN ATIKRAMA
43043<=m&&43044>=m||// Mc   [2] SYLOTI NAGRI VOWEL SIGN A..SYLOTI NAGRI VOWEL SIGN I
43047==m||// Mc       SYLOTI NAGRI VOWEL SIGN OO
43136<=m&&43137>=m||// Mc   [2] SAURASHTRA SIGN ANUSVARA..SAURASHTRA SIGN VISARGA
43188<=m&&43203>=m||// Mc  [16] SAURASHTRA CONSONANT SIGN HAARU..SAURASHTRA VOWEL SIGN AU
43346<=m&&43347>=m||// Mc   [2] REJANG CONSONANT SIGN H..REJANG VIRAMA
43395==m||// Mc       JAVANESE SIGN WIGNYAN
43444<=m&&43445>=m||// Mc   [2] JAVANESE VOWEL SIGN TARUNG..JAVANESE VOWEL SIGN TOLONG
43450<=m&&43451>=m||// Mc   [2] JAVANESE VOWEL SIGN TALING..JAVANESE VOWEL SIGN DIRGA MURE
43453<=m&&43456>=m||// Mc   [4] JAVANESE CONSONANT SIGN KERET..JAVANESE PANGKON
43567<=m&&43568>=m||// Mc   [2] CHAM VOWEL SIGN O..CHAM VOWEL SIGN AI
43571<=m&&43572>=m||// Mc   [2] CHAM CONSONANT SIGN YA..CHAM CONSONANT SIGN RA
43597==m||// Mc       CHAM CONSONANT SIGN FINAL H
43755==m||// Mc       MEETEI MAYEK VOWEL SIGN II
43758<=m&&43759>=m||// Mc   [2] MEETEI MAYEK VOWEL SIGN AU..MEETEI MAYEK VOWEL SIGN AAU
43765==m||// Mc       MEETEI MAYEK VOWEL SIGN VISARGA
44003<=m&&44004>=m||// Mc   [2] MEETEI MAYEK VOWEL SIGN ONAP..MEETEI MAYEK VOWEL SIGN INAP
44006<=m&&44007>=m||// Mc   [2] MEETEI MAYEK VOWEL SIGN YENAP..MEETEI MAYEK VOWEL SIGN SOUNAP
44009<=m&&44010>=m||// Mc   [2] MEETEI MAYEK VOWEL SIGN CHEINAP..MEETEI MAYEK VOWEL SIGN NUNG
44012==m||// Mc       MEETEI MAYEK LUM IYEK
69632==m||// Mc       BRAHMI SIGN CANDRABINDU
69634==m||// Mc       BRAHMI SIGN VISARGA
69762==m||// Mc       KAITHI SIGN VISARGA
69808<=m&&69810>=m||// Mc   [3] KAITHI VOWEL SIGN AA..KAITHI VOWEL SIGN II
69815<=m&&69816>=m||// Mc   [2] KAITHI VOWEL SIGN O..KAITHI VOWEL SIGN AU
69932==m||// Mc       CHAKMA VOWEL SIGN E
70018==m||// Mc       SHARADA SIGN VISARGA
70067<=m&&70069>=m||// Mc   [3] SHARADA VOWEL SIGN AA..SHARADA VOWEL SIGN II
70079<=m&&70080>=m||// Mc   [2] SHARADA VOWEL SIGN AU..SHARADA SIGN VIRAMA
70188<=m&&70190>=m||// Mc   [3] KHOJKI VOWEL SIGN AA..KHOJKI VOWEL SIGN II
70194<=m&&70195>=m||// Mc   [2] KHOJKI VOWEL SIGN O..KHOJKI VOWEL SIGN AU
70197==m||// Mc       KHOJKI SIGN VIRAMA
70368<=m&&70370>=m||// Mc   [3] KHUDAWADI VOWEL SIGN AA..KHUDAWADI VOWEL SIGN II
70402<=m&&70403>=m||// Mc   [2] GRANTHA SIGN ANUSVARA..GRANTHA SIGN VISARGA
70463==m||// Mc       GRANTHA VOWEL SIGN I
70465<=m&&70468>=m||// Mc   [4] GRANTHA VOWEL SIGN U..GRANTHA VOWEL SIGN VOCALIC RR
70471<=m&&70472>=m||// Mc   [2] GRANTHA VOWEL SIGN EE..GRANTHA VOWEL SIGN AI
70475<=m&&70477>=m||// Mc   [3] GRANTHA VOWEL SIGN OO..GRANTHA SIGN VIRAMA
70498<=m&&70499>=m||// Mc   [2] GRANTHA VOWEL SIGN VOCALIC L..GRANTHA VOWEL SIGN VOCALIC LL
70709<=m&&70711>=m||// Mc   [3] NEWA VOWEL SIGN AA..NEWA VOWEL SIGN II
70720<=m&&70721>=m||// Mc   [2] NEWA VOWEL SIGN O..NEWA VOWEL SIGN AU
70725==m||// Mc       NEWA SIGN VISARGA
70833<=m&&70834>=m||// Mc   [2] TIRHUTA VOWEL SIGN I..TIRHUTA VOWEL SIGN II
70841==m||// Mc       TIRHUTA VOWEL SIGN E
70843<=m&&70844>=m||// Mc   [2] TIRHUTA VOWEL SIGN AI..TIRHUTA VOWEL SIGN O
70846==m||// Mc       TIRHUTA VOWEL SIGN AU
70849==m||// Mc       TIRHUTA SIGN VISARGA
71088<=m&&71089>=m||// Mc   [2] SIDDHAM VOWEL SIGN I..SIDDHAM VOWEL SIGN II
71096<=m&&71099>=m||// Mc   [4] SIDDHAM VOWEL SIGN E..SIDDHAM VOWEL SIGN AU
71102==m||// Mc       SIDDHAM SIGN VISARGA
71216<=m&&71218>=m||// Mc   [3] MODI VOWEL SIGN AA..MODI VOWEL SIGN II
71227<=m&&71228>=m||// Mc   [2] MODI VOWEL SIGN O..MODI VOWEL SIGN AU
71230==m||// Mc       MODI SIGN VISARGA
71340==m||// Mc       TAKRI SIGN VISARGA
71342<=m&&71343>=m||// Mc   [2] TAKRI VOWEL SIGN I..TAKRI VOWEL SIGN II
71350==m||// Mc       TAKRI SIGN VIRAMA
71456<=m&&71457>=m||// Mc   [2] AHOM VOWEL SIGN A..AHOM VOWEL SIGN AA
71462==m||// Mc       AHOM VOWEL SIGN E
72199<=m&&72200>=m||// Mc   [2] ZANABAZAR SQUARE VOWEL SIGN AI..ZANABAZAR SQUARE VOWEL SIGN AU
72249==m||// Mc       ZANABAZAR SQUARE SIGN VISARGA
72279<=m&&72280>=m||// Mc   [2] SOYOMBO VOWEL SIGN AI..SOYOMBO VOWEL SIGN AU
72343==m||// Mc       SOYOMBO SIGN VISARGA
72751==m||// Mc       BHAIKSUKI VOWEL SIGN AA
72766==m||// Mc       BHAIKSUKI SIGN VISARGA
72873==m||// Mc       MARCHEN SUBJOINED LETTER YA
72881==m||// Mc       MARCHEN VOWEL SIGN I
72884==m||// Mc       MARCHEN VOWEL SIGN O
94033<=m&&94078>=m||// Mc  [46] MIAO SIGN ASPIRATION..MIAO VOWEL SIGN NG
119142==m||// Mc       MUSICAL SYMBOL COMBINING SPRECHGESANG STEM
119149==m// Mc       MUSICAL SYMBOL COMBINING AUGMENTATION DOT
?a:4352<=m&&4447>=m||// Lo  [96] HANGUL CHOSEONG KIYEOK..HANGUL CHOSEONG FILLER
43360<=m&&43388>=m// Lo  [29] HANGUL CHOSEONG TIKEUT-MIEUM..HANGUL CHOSEONG SSANGYEORINHIEUH
?s:4448<=m&&4519>=m||// Lo  [72] HANGUL JUNGSEONG FILLER..HANGUL JUNGSEONG O-YAE
55216<=m&&55238>=m// Lo  [23] HANGUL JUNGSEONG O-YEO..HANGUL JUNGSEONG ARAEA-E
?l:4520<=m&&4607>=m||// Lo  [88] HANGUL JONGSEONG KIYEOK..HANGUL JONGSEONG SSANGNIEUN
55243<=m&&55291>=m// Lo  [49] HANGUL JONGSEONG NIEUN-RIEUL..HANGUL JONGSEONG PHIEUPH-THIEUTH
?o:44032==m||// Lo       HANGUL SYLLABLE GA
44060==m||// Lo       HANGUL SYLLABLE GAE
44088==m||// Lo       HANGUL SYLLABLE GYA
44116==m||// Lo       HANGUL SYLLABLE GYAE
44144==m||// Lo       HANGUL SYLLABLE GEO
44172==m||// Lo       HANGUL SYLLABLE GE
44200==m||// Lo       HANGUL SYLLABLE GYEO
44228==m||// Lo       HANGUL SYLLABLE GYE
44256==m||// Lo       HANGUL SYLLABLE GO
44284==m||// Lo       HANGUL SYLLABLE GWA
44312==m||// Lo       HANGUL SYLLABLE GWAE
44340==m||// Lo       HANGUL SYLLABLE GOE
44368==m||// Lo       HANGUL SYLLABLE GYO
44396==m||// Lo       HANGUL SYLLABLE GU
44424==m||// Lo       HANGUL SYLLABLE GWEO
44452==m||// Lo       HANGUL SYLLABLE GWE
44480==m||// Lo       HANGUL SYLLABLE GWI
44508==m||// Lo       HANGUL SYLLABLE GYU
44536==m||// Lo       HANGUL SYLLABLE GEU
44564==m||// Lo       HANGUL SYLLABLE GYI
44592==m||// Lo       HANGUL SYLLABLE GI
44620==m||// Lo       HANGUL SYLLABLE GGA
44648==m||// Lo       HANGUL SYLLABLE GGAE
44676==m||// Lo       HANGUL SYLLABLE GGYA
44704==m||// Lo       HANGUL SYLLABLE GGYAE
44732==m||// Lo       HANGUL SYLLABLE GGEO
44760==m||// Lo       HANGUL SYLLABLE GGE
44788==m||// Lo       HANGUL SYLLABLE GGYEO
44816==m||// Lo       HANGUL SYLLABLE GGYE
44844==m||// Lo       HANGUL SYLLABLE GGO
44872==m||// Lo       HANGUL SYLLABLE GGWA
44900==m||// Lo       HANGUL SYLLABLE GGWAE
44928==m||// Lo       HANGUL SYLLABLE GGOE
44956==m||// Lo       HANGUL SYLLABLE GGYO
44984==m||// Lo       HANGUL SYLLABLE GGU
45012==m||// Lo       HANGUL SYLLABLE GGWEO
45040==m||// Lo       HANGUL SYLLABLE GGWE
45068==m||// Lo       HANGUL SYLLABLE GGWI
45096==m||// Lo       HANGUL SYLLABLE GGYU
45124==m||// Lo       HANGUL SYLLABLE GGEU
45152==m||// Lo       HANGUL SYLLABLE GGYI
45180==m||// Lo       HANGUL SYLLABLE GGI
45208==m||// Lo       HANGUL SYLLABLE NA
45236==m||// Lo       HANGUL SYLLABLE NAE
45264==m||// Lo       HANGUL SYLLABLE NYA
45292==m||// Lo       HANGUL SYLLABLE NYAE
45320==m||// Lo       HANGUL SYLLABLE NEO
45348==m||// Lo       HANGUL SYLLABLE NE
45376==m||// Lo       HANGUL SYLLABLE NYEO
45404==m||// Lo       HANGUL SYLLABLE NYE
45432==m||// Lo       HANGUL SYLLABLE NO
45460==m||// Lo       HANGUL SYLLABLE NWA
45488==m||// Lo       HANGUL SYLLABLE NWAE
45516==m||// Lo       HANGUL SYLLABLE NOE
45544==m||// Lo       HANGUL SYLLABLE NYO
45572==m||// Lo       HANGUL SYLLABLE NU
45600==m||// Lo       HANGUL SYLLABLE NWEO
45628==m||// Lo       HANGUL SYLLABLE NWE
45656==m||// Lo       HANGUL SYLLABLE NWI
45684==m||// Lo       HANGUL SYLLABLE NYU
45712==m||// Lo       HANGUL SYLLABLE NEU
45740==m||// Lo       HANGUL SYLLABLE NYI
45768==m||// Lo       HANGUL SYLLABLE NI
45796==m||// Lo       HANGUL SYLLABLE DA
45824==m||// Lo       HANGUL SYLLABLE DAE
45852==m||// Lo       HANGUL SYLLABLE DYA
45880==m||// Lo       HANGUL SYLLABLE DYAE
45908==m||// Lo       HANGUL SYLLABLE DEO
45936==m||// Lo       HANGUL SYLLABLE DE
45964==m||// Lo       HANGUL SYLLABLE DYEO
45992==m||// Lo       HANGUL SYLLABLE DYE
46020==m||// Lo       HANGUL SYLLABLE DO
46048==m||// Lo       HANGUL SYLLABLE DWA
46076==m||// Lo       HANGUL SYLLABLE DWAE
46104==m||// Lo       HANGUL SYLLABLE DOE
46132==m||// Lo       HANGUL SYLLABLE DYO
46160==m||// Lo       HANGUL SYLLABLE DU
46188==m||// Lo       HANGUL SYLLABLE DWEO
46216==m||// Lo       HANGUL SYLLABLE DWE
46244==m||// Lo       HANGUL SYLLABLE DWI
46272==m||// Lo       HANGUL SYLLABLE DYU
46300==m||// Lo       HANGUL SYLLABLE DEU
46328==m||// Lo       HANGUL SYLLABLE DYI
46356==m||// Lo       HANGUL SYLLABLE DI
46384==m||// Lo       HANGUL SYLLABLE DDA
46412==m||// Lo       HANGUL SYLLABLE DDAE
46440==m||// Lo       HANGUL SYLLABLE DDYA
46468==m||// Lo       HANGUL SYLLABLE DDYAE
46496==m||// Lo       HANGUL SYLLABLE DDEO
46524==m||// Lo       HANGUL SYLLABLE DDE
46552==m||// Lo       HANGUL SYLLABLE DDYEO
46580==m||// Lo       HANGUL SYLLABLE DDYE
46608==m||// Lo       HANGUL SYLLABLE DDO
46636==m||// Lo       HANGUL SYLLABLE DDWA
46664==m||// Lo       HANGUL SYLLABLE DDWAE
46692==m||// Lo       HANGUL SYLLABLE DDOE
46720==m||// Lo       HANGUL SYLLABLE DDYO
46748==m||// Lo       HANGUL SYLLABLE DDU
46776==m||// Lo       HANGUL SYLLABLE DDWEO
46804==m||// Lo       HANGUL SYLLABLE DDWE
46832==m||// Lo       HANGUL SYLLABLE DDWI
46860==m||// Lo       HANGUL SYLLABLE DDYU
46888==m||// Lo       HANGUL SYLLABLE DDEU
46916==m||// Lo       HANGUL SYLLABLE DDYI
46944==m||// Lo       HANGUL SYLLABLE DDI
46972==m||// Lo       HANGUL SYLLABLE RA
47000==m||// Lo       HANGUL SYLLABLE RAE
47028==m||// Lo       HANGUL SYLLABLE RYA
47056==m||// Lo       HANGUL SYLLABLE RYAE
47084==m||// Lo       HANGUL SYLLABLE REO
47112==m||// Lo       HANGUL SYLLABLE RE
47140==m||// Lo       HANGUL SYLLABLE RYEO
47168==m||// Lo       HANGUL SYLLABLE RYE
47196==m||// Lo       HANGUL SYLLABLE RO
47224==m||// Lo       HANGUL SYLLABLE RWA
47252==m||// Lo       HANGUL SYLLABLE RWAE
47280==m||// Lo       HANGUL SYLLABLE ROE
47308==m||// Lo       HANGUL SYLLABLE RYO
47336==m||// Lo       HANGUL SYLLABLE RU
47364==m||// Lo       HANGUL SYLLABLE RWEO
47392==m||// Lo       HANGUL SYLLABLE RWE
47420==m||// Lo       HANGUL SYLLABLE RWI
47448==m||// Lo       HANGUL SYLLABLE RYU
47476==m||// Lo       HANGUL SYLLABLE REU
47504==m||// Lo       HANGUL SYLLABLE RYI
47532==m||// Lo       HANGUL SYLLABLE RI
47560==m||// Lo       HANGUL SYLLABLE MA
47588==m||// Lo       HANGUL SYLLABLE MAE
47616==m||// Lo       HANGUL SYLLABLE MYA
47644==m||// Lo       HANGUL SYLLABLE MYAE
47672==m||// Lo       HANGUL SYLLABLE MEO
47700==m||// Lo       HANGUL SYLLABLE ME
47728==m||// Lo       HANGUL SYLLABLE MYEO
47756==m||// Lo       HANGUL SYLLABLE MYE
47784==m||// Lo       HANGUL SYLLABLE MO
47812==m||// Lo       HANGUL SYLLABLE MWA
47840==m||// Lo       HANGUL SYLLABLE MWAE
47868==m||// Lo       HANGUL SYLLABLE MOE
47896==m||// Lo       HANGUL SYLLABLE MYO
47924==m||// Lo       HANGUL SYLLABLE MU
47952==m||// Lo       HANGUL SYLLABLE MWEO
47980==m||// Lo       HANGUL SYLLABLE MWE
48008==m||// Lo       HANGUL SYLLABLE MWI
48036==m||// Lo       HANGUL SYLLABLE MYU
48064==m||// Lo       HANGUL SYLLABLE MEU
48092==m||// Lo       HANGUL SYLLABLE MYI
48120==m||// Lo       HANGUL SYLLABLE MI
48148==m||// Lo       HANGUL SYLLABLE BA
48176==m||// Lo       HANGUL SYLLABLE BAE
48204==m||// Lo       HANGUL SYLLABLE BYA
48232==m||// Lo       HANGUL SYLLABLE BYAE
48260==m||// Lo       HANGUL SYLLABLE BEO
48288==m||// Lo       HANGUL SYLLABLE BE
48316==m||// Lo       HANGUL SYLLABLE BYEO
48344==m||// Lo       HANGUL SYLLABLE BYE
48372==m||// Lo       HANGUL SYLLABLE BO
48400==m||// Lo       HANGUL SYLLABLE BWA
48428==m||// Lo       HANGUL SYLLABLE BWAE
48456==m||// Lo       HANGUL SYLLABLE BOE
48484==m||// Lo       HANGUL SYLLABLE BYO
48512==m||// Lo       HANGUL SYLLABLE BU
48540==m||// Lo       HANGUL SYLLABLE BWEO
48568==m||// Lo       HANGUL SYLLABLE BWE
48596==m||// Lo       HANGUL SYLLABLE BWI
48624==m||// Lo       HANGUL SYLLABLE BYU
48652==m||// Lo       HANGUL SYLLABLE BEU
48680==m||// Lo       HANGUL SYLLABLE BYI
48708==m||// Lo       HANGUL SYLLABLE BI
48736==m||// Lo       HANGUL SYLLABLE BBA
48764==m||// Lo       HANGUL SYLLABLE BBAE
48792==m||// Lo       HANGUL SYLLABLE BBYA
48820==m||// Lo       HANGUL SYLLABLE BBYAE
48848==m||// Lo       HANGUL SYLLABLE BBEO
48876==m||// Lo       HANGUL SYLLABLE BBE
48904==m||// Lo       HANGUL SYLLABLE BBYEO
48932==m||// Lo       HANGUL SYLLABLE BBYE
48960==m||// Lo       HANGUL SYLLABLE BBO
48988==m||// Lo       HANGUL SYLLABLE BBWA
49016==m||// Lo       HANGUL SYLLABLE BBWAE
49044==m||// Lo       HANGUL SYLLABLE BBOE
49072==m||// Lo       HANGUL SYLLABLE BBYO
49100==m||// Lo       HANGUL SYLLABLE BBU
49128==m||// Lo       HANGUL SYLLABLE BBWEO
49156==m||// Lo       HANGUL SYLLABLE BBWE
49184==m||// Lo       HANGUL SYLLABLE BBWI
49212==m||// Lo       HANGUL SYLLABLE BBYU
49240==m||// Lo       HANGUL SYLLABLE BBEU
49268==m||// Lo       HANGUL SYLLABLE BBYI
49296==m||// Lo       HANGUL SYLLABLE BBI
49324==m||// Lo       HANGUL SYLLABLE SA
49352==m||// Lo       HANGUL SYLLABLE SAE
49380==m||// Lo       HANGUL SYLLABLE SYA
49408==m||// Lo       HANGUL SYLLABLE SYAE
49436==m||// Lo       HANGUL SYLLABLE SEO
49464==m||// Lo       HANGUL SYLLABLE SE
49492==m||// Lo       HANGUL SYLLABLE SYEO
49520==m||// Lo       HANGUL SYLLABLE SYE
49548==m||// Lo       HANGUL SYLLABLE SO
49576==m||// Lo       HANGUL SYLLABLE SWA
49604==m||// Lo       HANGUL SYLLABLE SWAE
49632==m||// Lo       HANGUL SYLLABLE SOE
49660==m||// Lo       HANGUL SYLLABLE SYO
49688==m||// Lo       HANGUL SYLLABLE SU
49716==m||// Lo       HANGUL SYLLABLE SWEO
49744==m||// Lo       HANGUL SYLLABLE SWE
49772==m||// Lo       HANGUL SYLLABLE SWI
49800==m||// Lo       HANGUL SYLLABLE SYU
49828==m||// Lo       HANGUL SYLLABLE SEU
49856==m||// Lo       HANGUL SYLLABLE SYI
49884==m||// Lo       HANGUL SYLLABLE SI
49912==m||// Lo       HANGUL SYLLABLE SSA
49940==m||// Lo       HANGUL SYLLABLE SSAE
49968==m||// Lo       HANGUL SYLLABLE SSYA
49996==m||// Lo       HANGUL SYLLABLE SSYAE
50024==m||// Lo       HANGUL SYLLABLE SSEO
50052==m||// Lo       HANGUL SYLLABLE SSE
50080==m||// Lo       HANGUL SYLLABLE SSYEO
50108==m||// Lo       HANGUL SYLLABLE SSYE
50136==m||// Lo       HANGUL SYLLABLE SSO
50164==m||// Lo       HANGUL SYLLABLE SSWA
50192==m||// Lo       HANGUL SYLLABLE SSWAE
50220==m||// Lo       HANGUL SYLLABLE SSOE
50248==m||// Lo       HANGUL SYLLABLE SSYO
50276==m||// Lo       HANGUL SYLLABLE SSU
50304==m||// Lo       HANGUL SYLLABLE SSWEO
50332==m||// Lo       HANGUL SYLLABLE SSWE
50360==m||// Lo       HANGUL SYLLABLE SSWI
50388==m||// Lo       HANGUL SYLLABLE SSYU
50416==m||// Lo       HANGUL SYLLABLE SSEU
50444==m||// Lo       HANGUL SYLLABLE SSYI
50472==m||// Lo       HANGUL SYLLABLE SSI
50500==m||// Lo       HANGUL SYLLABLE A
50528==m||// Lo       HANGUL SYLLABLE AE
50556==m||// Lo       HANGUL SYLLABLE YA
50584==m||// Lo       HANGUL SYLLABLE YAE
50612==m||// Lo       HANGUL SYLLABLE EO
50640==m||// Lo       HANGUL SYLLABLE E
50668==m||// Lo       HANGUL SYLLABLE YEO
50696==m||// Lo       HANGUL SYLLABLE YE
50724==m||// Lo       HANGUL SYLLABLE O
50752==m||// Lo       HANGUL SYLLABLE WA
50780==m||// Lo       HANGUL SYLLABLE WAE
50808==m||// Lo       HANGUL SYLLABLE OE
50836==m||// Lo       HANGUL SYLLABLE YO
50864==m||// Lo       HANGUL SYLLABLE U
50892==m||// Lo       HANGUL SYLLABLE WEO
50920==m||// Lo       HANGUL SYLLABLE WE
50948==m||// Lo       HANGUL SYLLABLE WI
50976==m||// Lo       HANGUL SYLLABLE YU
51004==m||// Lo       HANGUL SYLLABLE EU
51032==m||// Lo       HANGUL SYLLABLE YI
51060==m||// Lo       HANGUL SYLLABLE I
51088==m||// Lo       HANGUL SYLLABLE JA
51116==m||// Lo       HANGUL SYLLABLE JAE
51144==m||// Lo       HANGUL SYLLABLE JYA
51172==m||// Lo       HANGUL SYLLABLE JYAE
51200==m||// Lo       HANGUL SYLLABLE JEO
51228==m||// Lo       HANGUL SYLLABLE JE
51256==m||// Lo       HANGUL SYLLABLE JYEO
51284==m||// Lo       HANGUL SYLLABLE JYE
51312==m||// Lo       HANGUL SYLLABLE JO
51340==m||// Lo       HANGUL SYLLABLE JWA
51368==m||// Lo       HANGUL SYLLABLE JWAE
51396==m||// Lo       HANGUL SYLLABLE JOE
51424==m||// Lo       HANGUL SYLLABLE JYO
51452==m||// Lo       HANGUL SYLLABLE JU
51480==m||// Lo       HANGUL SYLLABLE JWEO
51508==m||// Lo       HANGUL SYLLABLE JWE
51536==m||// Lo       HANGUL SYLLABLE JWI
51564==m||// Lo       HANGUL SYLLABLE JYU
51592==m||// Lo       HANGUL SYLLABLE JEU
51620==m||// Lo       HANGUL SYLLABLE JYI
51648==m||// Lo       HANGUL SYLLABLE JI
51676==m||// Lo       HANGUL SYLLABLE JJA
51704==m||// Lo       HANGUL SYLLABLE JJAE
51732==m||// Lo       HANGUL SYLLABLE JJYA
51760==m||// Lo       HANGUL SYLLABLE JJYAE
51788==m||// Lo       HANGUL SYLLABLE JJEO
51816==m||// Lo       HANGUL SYLLABLE JJE
51844==m||// Lo       HANGUL SYLLABLE JJYEO
51872==m||// Lo       HANGUL SYLLABLE JJYE
51900==m||// Lo       HANGUL SYLLABLE JJO
51928==m||// Lo       HANGUL SYLLABLE JJWA
51956==m||// Lo       HANGUL SYLLABLE JJWAE
51984==m||// Lo       HANGUL SYLLABLE JJOE
52012==m||// Lo       HANGUL SYLLABLE JJYO
52040==m||// Lo       HANGUL SYLLABLE JJU
52068==m||// Lo       HANGUL SYLLABLE JJWEO
52096==m||// Lo       HANGUL SYLLABLE JJWE
52124==m||// Lo       HANGUL SYLLABLE JJWI
52152==m||// Lo       HANGUL SYLLABLE JJYU
52180==m||// Lo       HANGUL SYLLABLE JJEU
52208==m||// Lo       HANGUL SYLLABLE JJYI
52236==m||// Lo       HANGUL SYLLABLE JJI
52264==m||// Lo       HANGUL SYLLABLE CA
52292==m||// Lo       HANGUL SYLLABLE CAE
52320==m||// Lo       HANGUL SYLLABLE CYA
52348==m||// Lo       HANGUL SYLLABLE CYAE
52376==m||// Lo       HANGUL SYLLABLE CEO
52404==m||// Lo       HANGUL SYLLABLE CE
52432==m||// Lo       HANGUL SYLLABLE CYEO
52460==m||// Lo       HANGUL SYLLABLE CYE
52488==m||// Lo       HANGUL SYLLABLE CO
52516==m||// Lo       HANGUL SYLLABLE CWA
52544==m||// Lo       HANGUL SYLLABLE CWAE
52572==m||// Lo       HANGUL SYLLABLE COE
52600==m||// Lo       HANGUL SYLLABLE CYO
52628==m||// Lo       HANGUL SYLLABLE CU
52656==m||// Lo       HANGUL SYLLABLE CWEO
52684==m||// Lo       HANGUL SYLLABLE CWE
52712==m||// Lo       HANGUL SYLLABLE CWI
52740==m||// Lo       HANGUL SYLLABLE CYU
52768==m||// Lo       HANGUL SYLLABLE CEU
52796==m||// Lo       HANGUL SYLLABLE CYI
52824==m||// Lo       HANGUL SYLLABLE CI
52852==m||// Lo       HANGUL SYLLABLE KA
52880==m||// Lo       HANGUL SYLLABLE KAE
52908==m||// Lo       HANGUL SYLLABLE KYA
52936==m||// Lo       HANGUL SYLLABLE KYAE
52964==m||// Lo       HANGUL SYLLABLE KEO
52992==m||// Lo       HANGUL SYLLABLE KE
53020==m||// Lo       HANGUL SYLLABLE KYEO
53048==m||// Lo       HANGUL SYLLABLE KYE
53076==m||// Lo       HANGUL SYLLABLE KO
53104==m||// Lo       HANGUL SYLLABLE KWA
53132==m||// Lo       HANGUL SYLLABLE KWAE
53160==m||// Lo       HANGUL SYLLABLE KOE
53188==m||// Lo       HANGUL SYLLABLE KYO
53216==m||// Lo       HANGUL SYLLABLE KU
53244==m||// Lo       HANGUL SYLLABLE KWEO
53272==m||// Lo       HANGUL SYLLABLE KWE
53300==m||// Lo       HANGUL SYLLABLE KWI
53328==m||// Lo       HANGUL SYLLABLE KYU
53356==m||// Lo       HANGUL SYLLABLE KEU
53384==m||// Lo       HANGUL SYLLABLE KYI
53412==m||// Lo       HANGUL SYLLABLE KI
53440==m||// Lo       HANGUL SYLLABLE TA
53468==m||// Lo       HANGUL SYLLABLE TAE
53496==m||// Lo       HANGUL SYLLABLE TYA
53524==m||// Lo       HANGUL SYLLABLE TYAE
53552==m||// Lo       HANGUL SYLLABLE TEO
53580==m||// Lo       HANGUL SYLLABLE TE
53608==m||// Lo       HANGUL SYLLABLE TYEO
53636==m||// Lo       HANGUL SYLLABLE TYE
53664==m||// Lo       HANGUL SYLLABLE TO
53692==m||// Lo       HANGUL SYLLABLE TWA
53720==m||// Lo       HANGUL SYLLABLE TWAE
53748==m||// Lo       HANGUL SYLLABLE TOE
53776==m||// Lo       HANGUL SYLLABLE TYO
53804==m||// Lo       HANGUL SYLLABLE TU
53832==m||// Lo       HANGUL SYLLABLE TWEO
53860==m||// Lo       HANGUL SYLLABLE TWE
53888==m||// Lo       HANGUL SYLLABLE TWI
53916==m||// Lo       HANGUL SYLLABLE TYU
53944==m||// Lo       HANGUL SYLLABLE TEU
53972==m||// Lo       HANGUL SYLLABLE TYI
54000==m||// Lo       HANGUL SYLLABLE TI
54028==m||// Lo       HANGUL SYLLABLE PA
54056==m||// Lo       HANGUL SYLLABLE PAE
54084==m||// Lo       HANGUL SYLLABLE PYA
54112==m||// Lo       HANGUL SYLLABLE PYAE
54140==m||// Lo       HANGUL SYLLABLE PEO
54168==m||// Lo       HANGUL SYLLABLE PE
54196==m||// Lo       HANGUL SYLLABLE PYEO
54224==m||// Lo       HANGUL SYLLABLE PYE
54252==m||// Lo       HANGUL SYLLABLE PO
54280==m||// Lo       HANGUL SYLLABLE PWA
54308==m||// Lo       HANGUL SYLLABLE PWAE
54336==m||// Lo       HANGUL SYLLABLE POE
54364==m||// Lo       HANGUL SYLLABLE PYO
54392==m||// Lo       HANGUL SYLLABLE PU
54420==m||// Lo       HANGUL SYLLABLE PWEO
54448==m||// Lo       HANGUL SYLLABLE PWE
54476==m||// Lo       HANGUL SYLLABLE PWI
54504==m||// Lo       HANGUL SYLLABLE PYU
54532==m||// Lo       HANGUL SYLLABLE PEU
54560==m||// Lo       HANGUL SYLLABLE PYI
54588==m||// Lo       HANGUL SYLLABLE PI
54616==m||// Lo       HANGUL SYLLABLE HA
54644==m||// Lo       HANGUL SYLLABLE HAE
54672==m||// Lo       HANGUL SYLLABLE HYA
54700==m||// Lo       HANGUL SYLLABLE HYAE
54728==m||// Lo       HANGUL SYLLABLE HEO
54756==m||// Lo       HANGUL SYLLABLE HE
54784==m||// Lo       HANGUL SYLLABLE HYEO
54812==m||// Lo       HANGUL SYLLABLE HYE
54840==m||// Lo       HANGUL SYLLABLE HO
54868==m||// Lo       HANGUL SYLLABLE HWA
54896==m||// Lo       HANGUL SYLLABLE HWAE
54924==m||// Lo       HANGUL SYLLABLE HOE
54952==m||// Lo       HANGUL SYLLABLE HYO
54980==m||// Lo       HANGUL SYLLABLE HU
55008==m||// Lo       HANGUL SYLLABLE HWEO
55036==m||// Lo       HANGUL SYLLABLE HWE
55064==m||// Lo       HANGUL SYLLABLE HWI
55092==m||// Lo       HANGUL SYLLABLE HYU
55120==m||// Lo       HANGUL SYLLABLE HEU
55148==m||// Lo       HANGUL SYLLABLE HYI
55176==m// Lo       HANGUL SYLLABLE HI
?u:44033<=m&&44059>=m||// Lo  [27] HANGUL SYLLABLE GAG..HANGUL SYLLABLE GAH
44061<=m&&44087>=m||// Lo  [27] HANGUL SYLLABLE GAEG..HANGUL SYLLABLE GAEH
44089<=m&&44115>=m||// Lo  [27] HANGUL SYLLABLE GYAG..HANGUL SYLLABLE GYAH
44117<=m&&44143>=m||// Lo  [27] HANGUL SYLLABLE GYAEG..HANGUL SYLLABLE GYAEH
44145<=m&&44171>=m||// Lo  [27] HANGUL SYLLABLE GEOG..HANGUL SYLLABLE GEOH
44173<=m&&44199>=m||// Lo  [27] HANGUL SYLLABLE GEG..HANGUL SYLLABLE GEH
44201<=m&&44227>=m||// Lo  [27] HANGUL SYLLABLE GYEOG..HANGUL SYLLABLE GYEOH
44229<=m&&44255>=m||// Lo  [27] HANGUL SYLLABLE GYEG..HANGUL SYLLABLE GYEH
44257<=m&&44283>=m||// Lo  [27] HANGUL SYLLABLE GOG..HANGUL SYLLABLE GOH
44285<=m&&44311>=m||// Lo  [27] HANGUL SYLLABLE GWAG..HANGUL SYLLABLE GWAH
44313<=m&&44339>=m||// Lo  [27] HANGUL SYLLABLE GWAEG..HANGUL SYLLABLE GWAEH
44341<=m&&44367>=m||// Lo  [27] HANGUL SYLLABLE GOEG..HANGUL SYLLABLE GOEH
44369<=m&&44395>=m||// Lo  [27] HANGUL SYLLABLE GYOG..HANGUL SYLLABLE GYOH
44397<=m&&44423>=m||// Lo  [27] HANGUL SYLLABLE GUG..HANGUL SYLLABLE GUH
44425<=m&&44451>=m||// Lo  [27] HANGUL SYLLABLE GWEOG..HANGUL SYLLABLE GWEOH
44453<=m&&44479>=m||// Lo  [27] HANGUL SYLLABLE GWEG..HANGUL SYLLABLE GWEH
44481<=m&&44507>=m||// Lo  [27] HANGUL SYLLABLE GWIG..HANGUL SYLLABLE GWIH
44509<=m&&44535>=m||// Lo  [27] HANGUL SYLLABLE GYUG..HANGUL SYLLABLE GYUH
44537<=m&&44563>=m||// Lo  [27] HANGUL SYLLABLE GEUG..HANGUL SYLLABLE GEUH
44565<=m&&44591>=m||// Lo  [27] HANGUL SYLLABLE GYIG..HANGUL SYLLABLE GYIH
44593<=m&&44619>=m||// Lo  [27] HANGUL SYLLABLE GIG..HANGUL SYLLABLE GIH
44621<=m&&44647>=m||// Lo  [27] HANGUL SYLLABLE GGAG..HANGUL SYLLABLE GGAH
44649<=m&&44675>=m||// Lo  [27] HANGUL SYLLABLE GGAEG..HANGUL SYLLABLE GGAEH
44677<=m&&44703>=m||// Lo  [27] HANGUL SYLLABLE GGYAG..HANGUL SYLLABLE GGYAH
44705<=m&&44731>=m||// Lo  [27] HANGUL SYLLABLE GGYAEG..HANGUL SYLLABLE GGYAEH
44733<=m&&44759>=m||// Lo  [27] HANGUL SYLLABLE GGEOG..HANGUL SYLLABLE GGEOH
44761<=m&&44787>=m||// Lo  [27] HANGUL SYLLABLE GGEG..HANGUL SYLLABLE GGEH
44789<=m&&44815>=m||// Lo  [27] HANGUL SYLLABLE GGYEOG..HANGUL SYLLABLE GGYEOH
44817<=m&&44843>=m||// Lo  [27] HANGUL SYLLABLE GGYEG..HANGUL SYLLABLE GGYEH
44845<=m&&44871>=m||// Lo  [27] HANGUL SYLLABLE GGOG..HANGUL SYLLABLE GGOH
44873<=m&&44899>=m||// Lo  [27] HANGUL SYLLABLE GGWAG..HANGUL SYLLABLE GGWAH
44901<=m&&44927>=m||// Lo  [27] HANGUL SYLLABLE GGWAEG..HANGUL SYLLABLE GGWAEH
44929<=m&&44955>=m||// Lo  [27] HANGUL SYLLABLE GGOEG..HANGUL SYLLABLE GGOEH
44957<=m&&44983>=m||// Lo  [27] HANGUL SYLLABLE GGYOG..HANGUL SYLLABLE GGYOH
44985<=m&&45011>=m||// Lo  [27] HANGUL SYLLABLE GGUG..HANGUL SYLLABLE GGUH
45013<=m&&45039>=m||// Lo  [27] HANGUL SYLLABLE GGWEOG..HANGUL SYLLABLE GGWEOH
45041<=m&&45067>=m||// Lo  [27] HANGUL SYLLABLE GGWEG..HANGUL SYLLABLE GGWEH
45069<=m&&45095>=m||// Lo  [27] HANGUL SYLLABLE GGWIG..HANGUL SYLLABLE GGWIH
45097<=m&&45123>=m||// Lo  [27] HANGUL SYLLABLE GGYUG..HANGUL SYLLABLE GGYUH
45125<=m&&45151>=m||// Lo  [27] HANGUL SYLLABLE GGEUG..HANGUL SYLLABLE GGEUH
45153<=m&&45179>=m||// Lo  [27] HANGUL SYLLABLE GGYIG..HANGUL SYLLABLE GGYIH
45181<=m&&45207>=m||// Lo  [27] HANGUL SYLLABLE GGIG..HANGUL SYLLABLE GGIH
45209<=m&&45235>=m||// Lo  [27] HANGUL SYLLABLE NAG..HANGUL SYLLABLE NAH
45237<=m&&45263>=m||// Lo  [27] HANGUL SYLLABLE NAEG..HANGUL SYLLABLE NAEH
45265<=m&&45291>=m||// Lo  [27] HANGUL SYLLABLE NYAG..HANGUL SYLLABLE NYAH
45293<=m&&45319>=m||// Lo  [27] HANGUL SYLLABLE NYAEG..HANGUL SYLLABLE NYAEH
45321<=m&&45347>=m||// Lo  [27] HANGUL SYLLABLE NEOG..HANGUL SYLLABLE NEOH
45349<=m&&45375>=m||// Lo  [27] HANGUL SYLLABLE NEG..HANGUL SYLLABLE NEH
45377<=m&&45403>=m||// Lo  [27] HANGUL SYLLABLE NYEOG..HANGUL SYLLABLE NYEOH
45405<=m&&45431>=m||// Lo  [27] HANGUL SYLLABLE NYEG..HANGUL SYLLABLE NYEH
45433<=m&&45459>=m||// Lo  [27] HANGUL SYLLABLE NOG..HANGUL SYLLABLE NOH
45461<=m&&45487>=m||// Lo  [27] HANGUL SYLLABLE NWAG..HANGUL SYLLABLE NWAH
45489<=m&&45515>=m||// Lo  [27] HANGUL SYLLABLE NWAEG..HANGUL SYLLABLE NWAEH
45517<=m&&45543>=m||// Lo  [27] HANGUL SYLLABLE NOEG..HANGUL SYLLABLE NOEH
45545<=m&&45571>=m||// Lo  [27] HANGUL SYLLABLE NYOG..HANGUL SYLLABLE NYOH
45573<=m&&45599>=m||// Lo  [27] HANGUL SYLLABLE NUG..HANGUL SYLLABLE NUH
45601<=m&&45627>=m||// Lo  [27] HANGUL SYLLABLE NWEOG..HANGUL SYLLABLE NWEOH
45629<=m&&45655>=m||// Lo  [27] HANGUL SYLLABLE NWEG..HANGUL SYLLABLE NWEH
45657<=m&&45683>=m||// Lo  [27] HANGUL SYLLABLE NWIG..HANGUL SYLLABLE NWIH
45685<=m&&45711>=m||// Lo  [27] HANGUL SYLLABLE NYUG..HANGUL SYLLABLE NYUH
45713<=m&&45739>=m||// Lo  [27] HANGUL SYLLABLE NEUG..HANGUL SYLLABLE NEUH
45741<=m&&45767>=m||// Lo  [27] HANGUL SYLLABLE NYIG..HANGUL SYLLABLE NYIH
45769<=m&&45795>=m||// Lo  [27] HANGUL SYLLABLE NIG..HANGUL SYLLABLE NIH
45797<=m&&45823>=m||// Lo  [27] HANGUL SYLLABLE DAG..HANGUL SYLLABLE DAH
45825<=m&&45851>=m||// Lo  [27] HANGUL SYLLABLE DAEG..HANGUL SYLLABLE DAEH
45853<=m&&45879>=m||// Lo  [27] HANGUL SYLLABLE DYAG..HANGUL SYLLABLE DYAH
45881<=m&&45907>=m||// Lo  [27] HANGUL SYLLABLE DYAEG..HANGUL SYLLABLE DYAEH
45909<=m&&45935>=m||// Lo  [27] HANGUL SYLLABLE DEOG..HANGUL SYLLABLE DEOH
45937<=m&&45963>=m||// Lo  [27] HANGUL SYLLABLE DEG..HANGUL SYLLABLE DEH
45965<=m&&45991>=m||// Lo  [27] HANGUL SYLLABLE DYEOG..HANGUL SYLLABLE DYEOH
45993<=m&&46019>=m||// Lo  [27] HANGUL SYLLABLE DYEG..HANGUL SYLLABLE DYEH
46021<=m&&46047>=m||// Lo  [27] HANGUL SYLLABLE DOG..HANGUL SYLLABLE DOH
46049<=m&&46075>=m||// Lo  [27] HANGUL SYLLABLE DWAG..HANGUL SYLLABLE DWAH
46077<=m&&46103>=m||// Lo  [27] HANGUL SYLLABLE DWAEG..HANGUL SYLLABLE DWAEH
46105<=m&&46131>=m||// Lo  [27] HANGUL SYLLABLE DOEG..HANGUL SYLLABLE DOEH
46133<=m&&46159>=m||// Lo  [27] HANGUL SYLLABLE DYOG..HANGUL SYLLABLE DYOH
46161<=m&&46187>=m||// Lo  [27] HANGUL SYLLABLE DUG..HANGUL SYLLABLE DUH
46189<=m&&46215>=m||// Lo  [27] HANGUL SYLLABLE DWEOG..HANGUL SYLLABLE DWEOH
46217<=m&&46243>=m||// Lo  [27] HANGUL SYLLABLE DWEG..HANGUL SYLLABLE DWEH
46245<=m&&46271>=m||// Lo  [27] HANGUL SYLLABLE DWIG..HANGUL SYLLABLE DWIH
46273<=m&&46299>=m||// Lo  [27] HANGUL SYLLABLE DYUG..HANGUL SYLLABLE DYUH
46301<=m&&46327>=m||// Lo  [27] HANGUL SYLLABLE DEUG..HANGUL SYLLABLE DEUH
46329<=m&&46355>=m||// Lo  [27] HANGUL SYLLABLE DYIG..HANGUL SYLLABLE DYIH
46357<=m&&46383>=m||// Lo  [27] HANGUL SYLLABLE DIG..HANGUL SYLLABLE DIH
46385<=m&&46411>=m||// Lo  [27] HANGUL SYLLABLE DDAG..HANGUL SYLLABLE DDAH
46413<=m&&46439>=m||// Lo  [27] HANGUL SYLLABLE DDAEG..HANGUL SYLLABLE DDAEH
46441<=m&&46467>=m||// Lo  [27] HANGUL SYLLABLE DDYAG..HANGUL SYLLABLE DDYAH
46469<=m&&46495>=m||// Lo  [27] HANGUL SYLLABLE DDYAEG..HANGUL SYLLABLE DDYAEH
46497<=m&&46523>=m||// Lo  [27] HANGUL SYLLABLE DDEOG..HANGUL SYLLABLE DDEOH
46525<=m&&46551>=m||// Lo  [27] HANGUL SYLLABLE DDEG..HANGUL SYLLABLE DDEH
46553<=m&&46579>=m||// Lo  [27] HANGUL SYLLABLE DDYEOG..HANGUL SYLLABLE DDYEOH
46581<=m&&46607>=m||// Lo  [27] HANGUL SYLLABLE DDYEG..HANGUL SYLLABLE DDYEH
46609<=m&&46635>=m||// Lo  [27] HANGUL SYLLABLE DDOG..HANGUL SYLLABLE DDOH
46637<=m&&46663>=m||// Lo  [27] HANGUL SYLLABLE DDWAG..HANGUL SYLLABLE DDWAH
46665<=m&&46691>=m||// Lo  [27] HANGUL SYLLABLE DDWAEG..HANGUL SYLLABLE DDWAEH
46693<=m&&46719>=m||// Lo  [27] HANGUL SYLLABLE DDOEG..HANGUL SYLLABLE DDOEH
46721<=m&&46747>=m||// Lo  [27] HANGUL SYLLABLE DDYOG..HANGUL SYLLABLE DDYOH
46749<=m&&46775>=m||// Lo  [27] HANGUL SYLLABLE DDUG..HANGUL SYLLABLE DDUH
46777<=m&&46803>=m||// Lo  [27] HANGUL SYLLABLE DDWEOG..HANGUL SYLLABLE DDWEOH
46805<=m&&46831>=m||// Lo  [27] HANGUL SYLLABLE DDWEG..HANGUL SYLLABLE DDWEH
46833<=m&&46859>=m||// Lo  [27] HANGUL SYLLABLE DDWIG..HANGUL SYLLABLE DDWIH
46861<=m&&46887>=m||// Lo  [27] HANGUL SYLLABLE DDYUG..HANGUL SYLLABLE DDYUH
46889<=m&&46915>=m||// Lo  [27] HANGUL SYLLABLE DDEUG..HANGUL SYLLABLE DDEUH
46917<=m&&46943>=m||// Lo  [27] HANGUL SYLLABLE DDYIG..HANGUL SYLLABLE DDYIH
46945<=m&&46971>=m||// Lo  [27] HANGUL SYLLABLE DDIG..HANGUL SYLLABLE DDIH
46973<=m&&46999>=m||// Lo  [27] HANGUL SYLLABLE RAG..HANGUL SYLLABLE RAH
47001<=m&&47027>=m||// Lo  [27] HANGUL SYLLABLE RAEG..HANGUL SYLLABLE RAEH
47029<=m&&47055>=m||// Lo  [27] HANGUL SYLLABLE RYAG..HANGUL SYLLABLE RYAH
47057<=m&&47083>=m||// Lo  [27] HANGUL SYLLABLE RYAEG..HANGUL SYLLABLE RYAEH
47085<=m&&47111>=m||// Lo  [27] HANGUL SYLLABLE REOG..HANGUL SYLLABLE REOH
47113<=m&&47139>=m||// Lo  [27] HANGUL SYLLABLE REG..HANGUL SYLLABLE REH
47141<=m&&47167>=m||// Lo  [27] HANGUL SYLLABLE RYEOG..HANGUL SYLLABLE RYEOH
47169<=m&&47195>=m||// Lo  [27] HANGUL SYLLABLE RYEG..HANGUL SYLLABLE RYEH
47197<=m&&47223>=m||// Lo  [27] HANGUL SYLLABLE ROG..HANGUL SYLLABLE ROH
47225<=m&&47251>=m||// Lo  [27] HANGUL SYLLABLE RWAG..HANGUL SYLLABLE RWAH
47253<=m&&47279>=m||// Lo  [27] HANGUL SYLLABLE RWAEG..HANGUL SYLLABLE RWAEH
47281<=m&&47307>=m||// Lo  [27] HANGUL SYLLABLE ROEG..HANGUL SYLLABLE ROEH
47309<=m&&47335>=m||// Lo  [27] HANGUL SYLLABLE RYOG..HANGUL SYLLABLE RYOH
47337<=m&&47363>=m||// Lo  [27] HANGUL SYLLABLE RUG..HANGUL SYLLABLE RUH
47365<=m&&47391>=m||// Lo  [27] HANGUL SYLLABLE RWEOG..HANGUL SYLLABLE RWEOH
47393<=m&&47419>=m||// Lo  [27] HANGUL SYLLABLE RWEG..HANGUL SYLLABLE RWEH
47421<=m&&47447>=m||// Lo  [27] HANGUL SYLLABLE RWIG..HANGUL SYLLABLE RWIH
47449<=m&&47475>=m||// Lo  [27] HANGUL SYLLABLE RYUG..HANGUL SYLLABLE RYUH
47477<=m&&47503>=m||// Lo  [27] HANGUL SYLLABLE REUG..HANGUL SYLLABLE REUH
47505<=m&&47531>=m||// Lo  [27] HANGUL SYLLABLE RYIG..HANGUL SYLLABLE RYIH
47533<=m&&47559>=m||// Lo  [27] HANGUL SYLLABLE RIG..HANGUL SYLLABLE RIH
47561<=m&&47587>=m||// Lo  [27] HANGUL SYLLABLE MAG..HANGUL SYLLABLE MAH
47589<=m&&47615>=m||// Lo  [27] HANGUL SYLLABLE MAEG..HANGUL SYLLABLE MAEH
47617<=m&&47643>=m||// Lo  [27] HANGUL SYLLABLE MYAG..HANGUL SYLLABLE MYAH
47645<=m&&47671>=m||// Lo  [27] HANGUL SYLLABLE MYAEG..HANGUL SYLLABLE MYAEH
47673<=m&&47699>=m||// Lo  [27] HANGUL SYLLABLE MEOG..HANGUL SYLLABLE MEOH
47701<=m&&47727>=m||// Lo  [27] HANGUL SYLLABLE MEG..HANGUL SYLLABLE MEH
47729<=m&&47755>=m||// Lo  [27] HANGUL SYLLABLE MYEOG..HANGUL SYLLABLE MYEOH
47757<=m&&47783>=m||// Lo  [27] HANGUL SYLLABLE MYEG..HANGUL SYLLABLE MYEH
47785<=m&&47811>=m||// Lo  [27] HANGUL SYLLABLE MOG..HANGUL SYLLABLE MOH
47813<=m&&47839>=m||// Lo  [27] HANGUL SYLLABLE MWAG..HANGUL SYLLABLE MWAH
47841<=m&&47867>=m||// Lo  [27] HANGUL SYLLABLE MWAEG..HANGUL SYLLABLE MWAEH
47869<=m&&47895>=m||// Lo  [27] HANGUL SYLLABLE MOEG..HANGUL SYLLABLE MOEH
47897<=m&&47923>=m||// Lo  [27] HANGUL SYLLABLE MYOG..HANGUL SYLLABLE MYOH
47925<=m&&47951>=m||// Lo  [27] HANGUL SYLLABLE MUG..HANGUL SYLLABLE MUH
47953<=m&&47979>=m||// Lo  [27] HANGUL SYLLABLE MWEOG..HANGUL SYLLABLE MWEOH
47981<=m&&48007>=m||// Lo  [27] HANGUL SYLLABLE MWEG..HANGUL SYLLABLE MWEH
48009<=m&&48035>=m||// Lo  [27] HANGUL SYLLABLE MWIG..HANGUL SYLLABLE MWIH
48037<=m&&48063>=m||// Lo  [27] HANGUL SYLLABLE MYUG..HANGUL SYLLABLE MYUH
48065<=m&&48091>=m||// Lo  [27] HANGUL SYLLABLE MEUG..HANGUL SYLLABLE MEUH
48093<=m&&48119>=m||// Lo  [27] HANGUL SYLLABLE MYIG..HANGUL SYLLABLE MYIH
48121<=m&&48147>=m||// Lo  [27] HANGUL SYLLABLE MIG..HANGUL SYLLABLE MIH
48149<=m&&48175>=m||// Lo  [27] HANGUL SYLLABLE BAG..HANGUL SYLLABLE BAH
48177<=m&&48203>=m||// Lo  [27] HANGUL SYLLABLE BAEG..HANGUL SYLLABLE BAEH
48205<=m&&48231>=m||// Lo  [27] HANGUL SYLLABLE BYAG..HANGUL SYLLABLE BYAH
48233<=m&&48259>=m||// Lo  [27] HANGUL SYLLABLE BYAEG..HANGUL SYLLABLE BYAEH
48261<=m&&48287>=m||// Lo  [27] HANGUL SYLLABLE BEOG..HANGUL SYLLABLE BEOH
48289<=m&&48315>=m||// Lo  [27] HANGUL SYLLABLE BEG..HANGUL SYLLABLE BEH
48317<=m&&48343>=m||// Lo  [27] HANGUL SYLLABLE BYEOG..HANGUL SYLLABLE BYEOH
48345<=m&&48371>=m||// Lo  [27] HANGUL SYLLABLE BYEG..HANGUL SYLLABLE BYEH
48373<=m&&48399>=m||// Lo  [27] HANGUL SYLLABLE BOG..HANGUL SYLLABLE BOH
48401<=m&&48427>=m||// Lo  [27] HANGUL SYLLABLE BWAG..HANGUL SYLLABLE BWAH
48429<=m&&48455>=m||// Lo  [27] HANGUL SYLLABLE BWAEG..HANGUL SYLLABLE BWAEH
48457<=m&&48483>=m||// Lo  [27] HANGUL SYLLABLE BOEG..HANGUL SYLLABLE BOEH
48485<=m&&48511>=m||// Lo  [27] HANGUL SYLLABLE BYOG..HANGUL SYLLABLE BYOH
48513<=m&&48539>=m||// Lo  [27] HANGUL SYLLABLE BUG..HANGUL SYLLABLE BUH
48541<=m&&48567>=m||// Lo  [27] HANGUL SYLLABLE BWEOG..HANGUL SYLLABLE BWEOH
48569<=m&&48595>=m||// Lo  [27] HANGUL SYLLABLE BWEG..HANGUL SYLLABLE BWEH
48597<=m&&48623>=m||// Lo  [27] HANGUL SYLLABLE BWIG..HANGUL SYLLABLE BWIH
48625<=m&&48651>=m||// Lo  [27] HANGUL SYLLABLE BYUG..HANGUL SYLLABLE BYUH
48653<=m&&48679>=m||// Lo  [27] HANGUL SYLLABLE BEUG..HANGUL SYLLABLE BEUH
48681<=m&&48707>=m||// Lo  [27] HANGUL SYLLABLE BYIG..HANGUL SYLLABLE BYIH
48709<=m&&48735>=m||// Lo  [27] HANGUL SYLLABLE BIG..HANGUL SYLLABLE BIH
48737<=m&&48763>=m||// Lo  [27] HANGUL SYLLABLE BBAG..HANGUL SYLLABLE BBAH
48765<=m&&48791>=m||// Lo  [27] HANGUL SYLLABLE BBAEG..HANGUL SYLLABLE BBAEH
48793<=m&&48819>=m||// Lo  [27] HANGUL SYLLABLE BBYAG..HANGUL SYLLABLE BBYAH
48821<=m&&48847>=m||// Lo  [27] HANGUL SYLLABLE BBYAEG..HANGUL SYLLABLE BBYAEH
48849<=m&&48875>=m||// Lo  [27] HANGUL SYLLABLE BBEOG..HANGUL SYLLABLE BBEOH
48877<=m&&48903>=m||// Lo  [27] HANGUL SYLLABLE BBEG..HANGUL SYLLABLE BBEH
48905<=m&&48931>=m||// Lo  [27] HANGUL SYLLABLE BBYEOG..HANGUL SYLLABLE BBYEOH
48933<=m&&48959>=m||// Lo  [27] HANGUL SYLLABLE BBYEG..HANGUL SYLLABLE BBYEH
48961<=m&&48987>=m||// Lo  [27] HANGUL SYLLABLE BBOG..HANGUL SYLLABLE BBOH
48989<=m&&49015>=m||// Lo  [27] HANGUL SYLLABLE BBWAG..HANGUL SYLLABLE BBWAH
49017<=m&&49043>=m||// Lo  [27] HANGUL SYLLABLE BBWAEG..HANGUL SYLLABLE BBWAEH
49045<=m&&49071>=m||// Lo  [27] HANGUL SYLLABLE BBOEG..HANGUL SYLLABLE BBOEH
49073<=m&&49099>=m||// Lo  [27] HANGUL SYLLABLE BBYOG..HANGUL SYLLABLE BBYOH
49101<=m&&49127>=m||// Lo  [27] HANGUL SYLLABLE BBUG..HANGUL SYLLABLE BBUH
49129<=m&&49155>=m||// Lo  [27] HANGUL SYLLABLE BBWEOG..HANGUL SYLLABLE BBWEOH
49157<=m&&49183>=m||// Lo  [27] HANGUL SYLLABLE BBWEG..HANGUL SYLLABLE BBWEH
49185<=m&&49211>=m||// Lo  [27] HANGUL SYLLABLE BBWIG..HANGUL SYLLABLE BBWIH
49213<=m&&49239>=m||// Lo  [27] HANGUL SYLLABLE BBYUG..HANGUL SYLLABLE BBYUH
49241<=m&&49267>=m||// Lo  [27] HANGUL SYLLABLE BBEUG..HANGUL SYLLABLE BBEUH
49269<=m&&49295>=m||// Lo  [27] HANGUL SYLLABLE BBYIG..HANGUL SYLLABLE BBYIH
49297<=m&&49323>=m||// Lo  [27] HANGUL SYLLABLE BBIG..HANGUL SYLLABLE BBIH
49325<=m&&49351>=m||// Lo  [27] HANGUL SYLLABLE SAG..HANGUL SYLLABLE SAH
49353<=m&&49379>=m||// Lo  [27] HANGUL SYLLABLE SAEG..HANGUL SYLLABLE SAEH
49381<=m&&49407>=m||// Lo  [27] HANGUL SYLLABLE SYAG..HANGUL SYLLABLE SYAH
49409<=m&&49435>=m||// Lo  [27] HANGUL SYLLABLE SYAEG..HANGUL SYLLABLE SYAEH
49437<=m&&49463>=m||// Lo  [27] HANGUL SYLLABLE SEOG..HANGUL SYLLABLE SEOH
49465<=m&&49491>=m||// Lo  [27] HANGUL SYLLABLE SEG..HANGUL SYLLABLE SEH
49493<=m&&49519>=m||// Lo  [27] HANGUL SYLLABLE SYEOG..HANGUL SYLLABLE SYEOH
49521<=m&&49547>=m||// Lo  [27] HANGUL SYLLABLE SYEG..HANGUL SYLLABLE SYEH
49549<=m&&49575>=m||// Lo  [27] HANGUL SYLLABLE SOG..HANGUL SYLLABLE SOH
49577<=m&&49603>=m||// Lo  [27] HANGUL SYLLABLE SWAG..HANGUL SYLLABLE SWAH
49605<=m&&49631>=m||// Lo  [27] HANGUL SYLLABLE SWAEG..HANGUL SYLLABLE SWAEH
49633<=m&&49659>=m||// Lo  [27] HANGUL SYLLABLE SOEG..HANGUL SYLLABLE SOEH
49661<=m&&49687>=m||// Lo  [27] HANGUL SYLLABLE SYOG..HANGUL SYLLABLE SYOH
49689<=m&&49715>=m||// Lo  [27] HANGUL SYLLABLE SUG..HANGUL SYLLABLE SUH
49717<=m&&49743>=m||// Lo  [27] HANGUL SYLLABLE SWEOG..HANGUL SYLLABLE SWEOH
49745<=m&&49771>=m||// Lo  [27] HANGUL SYLLABLE SWEG..HANGUL SYLLABLE SWEH
49773<=m&&49799>=m||// Lo  [27] HANGUL SYLLABLE SWIG..HANGUL SYLLABLE SWIH
49801<=m&&49827>=m||// Lo  [27] HANGUL SYLLABLE SYUG..HANGUL SYLLABLE SYUH
49829<=m&&49855>=m||// Lo  [27] HANGUL SYLLABLE SEUG..HANGUL SYLLABLE SEUH
49857<=m&&49883>=m||// Lo  [27] HANGUL SYLLABLE SYIG..HANGUL SYLLABLE SYIH
49885<=m&&49911>=m||// Lo  [27] HANGUL SYLLABLE SIG..HANGUL SYLLABLE SIH
49913<=m&&49939>=m||// Lo  [27] HANGUL SYLLABLE SSAG..HANGUL SYLLABLE SSAH
49941<=m&&49967>=m||// Lo  [27] HANGUL SYLLABLE SSAEG..HANGUL SYLLABLE SSAEH
49969<=m&&49995>=m||// Lo  [27] HANGUL SYLLABLE SSYAG..HANGUL SYLLABLE SSYAH
49997<=m&&50023>=m||// Lo  [27] HANGUL SYLLABLE SSYAEG..HANGUL SYLLABLE SSYAEH
50025<=m&&50051>=m||// Lo  [27] HANGUL SYLLABLE SSEOG..HANGUL SYLLABLE SSEOH
50053<=m&&50079>=m||// Lo  [27] HANGUL SYLLABLE SSEG..HANGUL SYLLABLE SSEH
50081<=m&&50107>=m||// Lo  [27] HANGUL SYLLABLE SSYEOG..HANGUL SYLLABLE SSYEOH
50109<=m&&50135>=m||// Lo  [27] HANGUL SYLLABLE SSYEG..HANGUL SYLLABLE SSYEH
50137<=m&&50163>=m||// Lo  [27] HANGUL SYLLABLE SSOG..HANGUL SYLLABLE SSOH
50165<=m&&50191>=m||// Lo  [27] HANGUL SYLLABLE SSWAG..HANGUL SYLLABLE SSWAH
50193<=m&&50219>=m||// Lo  [27] HANGUL SYLLABLE SSWAEG..HANGUL SYLLABLE SSWAEH
50221<=m&&50247>=m||// Lo  [27] HANGUL SYLLABLE SSOEG..HANGUL SYLLABLE SSOEH
50249<=m&&50275>=m||// Lo  [27] HANGUL SYLLABLE SSYOG..HANGUL SYLLABLE SSYOH
50277<=m&&50303>=m||// Lo  [27] HANGUL SYLLABLE SSUG..HANGUL SYLLABLE SSUH
50305<=m&&50331>=m||// Lo  [27] HANGUL SYLLABLE SSWEOG..HANGUL SYLLABLE SSWEOH
50333<=m&&50359>=m||// Lo  [27] HANGUL SYLLABLE SSWEG..HANGUL SYLLABLE SSWEH
50361<=m&&50387>=m||// Lo  [27] HANGUL SYLLABLE SSWIG..HANGUL SYLLABLE SSWIH
50389<=m&&50415>=m||// Lo  [27] HANGUL SYLLABLE SSYUG..HANGUL SYLLABLE SSYUH
50417<=m&&50443>=m||// Lo  [27] HANGUL SYLLABLE SSEUG..HANGUL SYLLABLE SSEUH
50445<=m&&50471>=m||// Lo  [27] HANGUL SYLLABLE SSYIG..HANGUL SYLLABLE SSYIH
50473<=m&&50499>=m||// Lo  [27] HANGUL SYLLABLE SSIG..HANGUL SYLLABLE SSIH
50501<=m&&50527>=m||// Lo  [27] HANGUL SYLLABLE AG..HANGUL SYLLABLE AH
50529<=m&&50555>=m||// Lo  [27] HANGUL SYLLABLE AEG..HANGUL SYLLABLE AEH
50557<=m&&50583>=m||// Lo  [27] HANGUL SYLLABLE YAG..HANGUL SYLLABLE YAH
50585<=m&&50611>=m||// Lo  [27] HANGUL SYLLABLE YAEG..HANGUL SYLLABLE YAEH
50613<=m&&50639>=m||// Lo  [27] HANGUL SYLLABLE EOG..HANGUL SYLLABLE EOH
50641<=m&&50667>=m||// Lo  [27] HANGUL SYLLABLE EG..HANGUL SYLLABLE EH
50669<=m&&50695>=m||// Lo  [27] HANGUL SYLLABLE YEOG..HANGUL SYLLABLE YEOH
50697<=m&&50723>=m||// Lo  [27] HANGUL SYLLABLE YEG..HANGUL SYLLABLE YEH
50725<=m&&50751>=m||// Lo  [27] HANGUL SYLLABLE OG..HANGUL SYLLABLE OH
50753<=m&&50779>=m||// Lo  [27] HANGUL SYLLABLE WAG..HANGUL SYLLABLE WAH
50781<=m&&50807>=m||// Lo  [27] HANGUL SYLLABLE WAEG..HANGUL SYLLABLE WAEH
50809<=m&&50835>=m||// Lo  [27] HANGUL SYLLABLE OEG..HANGUL SYLLABLE OEH
50837<=m&&50863>=m||// Lo  [27] HANGUL SYLLABLE YOG..HANGUL SYLLABLE YOH
50865<=m&&50891>=m||// Lo  [27] HANGUL SYLLABLE UG..HANGUL SYLLABLE UH
50893<=m&&50919>=m||// Lo  [27] HANGUL SYLLABLE WEOG..HANGUL SYLLABLE WEOH
50921<=m&&50947>=m||// Lo  [27] HANGUL SYLLABLE WEG..HANGUL SYLLABLE WEH
50949<=m&&50975>=m||// Lo  [27] HANGUL SYLLABLE WIG..HANGUL SYLLABLE WIH
50977<=m&&51003>=m||// Lo  [27] HANGUL SYLLABLE YUG..HANGUL SYLLABLE YUH
51005<=m&&51031>=m||// Lo  [27] HANGUL SYLLABLE EUG..HANGUL SYLLABLE EUH
51033<=m&&51059>=m||// Lo  [27] HANGUL SYLLABLE YIG..HANGUL SYLLABLE YIH
51061<=m&&51087>=m||// Lo  [27] HANGUL SYLLABLE IG..HANGUL SYLLABLE IH
51089<=m&&51115>=m||// Lo  [27] HANGUL SYLLABLE JAG..HANGUL SYLLABLE JAH
51117<=m&&51143>=m||// Lo  [27] HANGUL SYLLABLE JAEG..HANGUL SYLLABLE JAEH
51145<=m&&51171>=m||// Lo  [27] HANGUL SYLLABLE JYAG..HANGUL SYLLABLE JYAH
51173<=m&&51199>=m||// Lo  [27] HANGUL SYLLABLE JYAEG..HANGUL SYLLABLE JYAEH
51201<=m&&51227>=m||// Lo  [27] HANGUL SYLLABLE JEOG..HANGUL SYLLABLE JEOH
51229<=m&&51255>=m||// Lo  [27] HANGUL SYLLABLE JEG..HANGUL SYLLABLE JEH
51257<=m&&51283>=m||// Lo  [27] HANGUL SYLLABLE JYEOG..HANGUL SYLLABLE JYEOH
51285<=m&&51311>=m||// Lo  [27] HANGUL SYLLABLE JYEG..HANGUL SYLLABLE JYEH
51313<=m&&51339>=m||// Lo  [27] HANGUL SYLLABLE JOG..HANGUL SYLLABLE JOH
51341<=m&&51367>=m||// Lo  [27] HANGUL SYLLABLE JWAG..HANGUL SYLLABLE JWAH
51369<=m&&51395>=m||// Lo  [27] HANGUL SYLLABLE JWAEG..HANGUL SYLLABLE JWAEH
51397<=m&&51423>=m||// Lo  [27] HANGUL SYLLABLE JOEG..HANGUL SYLLABLE JOEH
51425<=m&&51451>=m||// Lo  [27] HANGUL SYLLABLE JYOG..HANGUL SYLLABLE JYOH
51453<=m&&51479>=m||// Lo  [27] HANGUL SYLLABLE JUG..HANGUL SYLLABLE JUH
51481<=m&&51507>=m||// Lo  [27] HANGUL SYLLABLE JWEOG..HANGUL SYLLABLE JWEOH
51509<=m&&51535>=m||// Lo  [27] HANGUL SYLLABLE JWEG..HANGUL SYLLABLE JWEH
51537<=m&&51563>=m||// Lo  [27] HANGUL SYLLABLE JWIG..HANGUL SYLLABLE JWIH
51565<=m&&51591>=m||// Lo  [27] HANGUL SYLLABLE JYUG..HANGUL SYLLABLE JYUH
51593<=m&&51619>=m||// Lo  [27] HANGUL SYLLABLE JEUG..HANGUL SYLLABLE JEUH
51621<=m&&51647>=m||// Lo  [27] HANGUL SYLLABLE JYIG..HANGUL SYLLABLE JYIH
51649<=m&&51675>=m||// Lo  [27] HANGUL SYLLABLE JIG..HANGUL SYLLABLE JIH
51677<=m&&51703>=m||// Lo  [27] HANGUL SYLLABLE JJAG..HANGUL SYLLABLE JJAH
51705<=m&&51731>=m||// Lo  [27] HANGUL SYLLABLE JJAEG..HANGUL SYLLABLE JJAEH
51733<=m&&51759>=m||// Lo  [27] HANGUL SYLLABLE JJYAG..HANGUL SYLLABLE JJYAH
51761<=m&&51787>=m||// Lo  [27] HANGUL SYLLABLE JJYAEG..HANGUL SYLLABLE JJYAEH
51789<=m&&51815>=m||// Lo  [27] HANGUL SYLLABLE JJEOG..HANGUL SYLLABLE JJEOH
51817<=m&&51843>=m||// Lo  [27] HANGUL SYLLABLE JJEG..HANGUL SYLLABLE JJEH
51845<=m&&51871>=m||// Lo  [27] HANGUL SYLLABLE JJYEOG..HANGUL SYLLABLE JJYEOH
51873<=m&&51899>=m||// Lo  [27] HANGUL SYLLABLE JJYEG..HANGUL SYLLABLE JJYEH
51901<=m&&51927>=m||// Lo  [27] HANGUL SYLLABLE JJOG..HANGUL SYLLABLE JJOH
51929<=m&&51955>=m||// Lo  [27] HANGUL SYLLABLE JJWAG..HANGUL SYLLABLE JJWAH
51957<=m&&51983>=m||// Lo  [27] HANGUL SYLLABLE JJWAEG..HANGUL SYLLABLE JJWAEH
51985<=m&&52011>=m||// Lo  [27] HANGUL SYLLABLE JJOEG..HANGUL SYLLABLE JJOEH
52013<=m&&52039>=m||// Lo  [27] HANGUL SYLLABLE JJYOG..HANGUL SYLLABLE JJYOH
52041<=m&&52067>=m||// Lo  [27] HANGUL SYLLABLE JJUG..HANGUL SYLLABLE JJUH
52069<=m&&52095>=m||// Lo  [27] HANGUL SYLLABLE JJWEOG..HANGUL SYLLABLE JJWEOH
52097<=m&&52123>=m||// Lo  [27] HANGUL SYLLABLE JJWEG..HANGUL SYLLABLE JJWEH
52125<=m&&52151>=m||// Lo  [27] HANGUL SYLLABLE JJWIG..HANGUL SYLLABLE JJWIH
52153<=m&&52179>=m||// Lo  [27] HANGUL SYLLABLE JJYUG..HANGUL SYLLABLE JJYUH
52181<=m&&52207>=m||// Lo  [27] HANGUL SYLLABLE JJEUG..HANGUL SYLLABLE JJEUH
52209<=m&&52235>=m||// Lo  [27] HANGUL SYLLABLE JJYIG..HANGUL SYLLABLE JJYIH
52237<=m&&52263>=m||// Lo  [27] HANGUL SYLLABLE JJIG..HANGUL SYLLABLE JJIH
52265<=m&&52291>=m||// Lo  [27] HANGUL SYLLABLE CAG..HANGUL SYLLABLE CAH
52293<=m&&52319>=m||// Lo  [27] HANGUL SYLLABLE CAEG..HANGUL SYLLABLE CAEH
52321<=m&&52347>=m||// Lo  [27] HANGUL SYLLABLE CYAG..HANGUL SYLLABLE CYAH
52349<=m&&52375>=m||// Lo  [27] HANGUL SYLLABLE CYAEG..HANGUL SYLLABLE CYAEH
52377<=m&&52403>=m||// Lo  [27] HANGUL SYLLABLE CEOG..HANGUL SYLLABLE CEOH
52405<=m&&52431>=m||// Lo  [27] HANGUL SYLLABLE CEG..HANGUL SYLLABLE CEH
52433<=m&&52459>=m||// Lo  [27] HANGUL SYLLABLE CYEOG..HANGUL SYLLABLE CYEOH
52461<=m&&52487>=m||// Lo  [27] HANGUL SYLLABLE CYEG..HANGUL SYLLABLE CYEH
52489<=m&&52515>=m||// Lo  [27] HANGUL SYLLABLE COG..HANGUL SYLLABLE COH
52517<=m&&52543>=m||// Lo  [27] HANGUL SYLLABLE CWAG..HANGUL SYLLABLE CWAH
52545<=m&&52571>=m||// Lo  [27] HANGUL SYLLABLE CWAEG..HANGUL SYLLABLE CWAEH
52573<=m&&52599>=m||// Lo  [27] HANGUL SYLLABLE COEG..HANGUL SYLLABLE COEH
52601<=m&&52627>=m||// Lo  [27] HANGUL SYLLABLE CYOG..HANGUL SYLLABLE CYOH
52629<=m&&52655>=m||// Lo  [27] HANGUL SYLLABLE CUG..HANGUL SYLLABLE CUH
52657<=m&&52683>=m||// Lo  [27] HANGUL SYLLABLE CWEOG..HANGUL SYLLABLE CWEOH
52685<=m&&52711>=m||// Lo  [27] HANGUL SYLLABLE CWEG..HANGUL SYLLABLE CWEH
52713<=m&&52739>=m||// Lo  [27] HANGUL SYLLABLE CWIG..HANGUL SYLLABLE CWIH
52741<=m&&52767>=m||// Lo  [27] HANGUL SYLLABLE CYUG..HANGUL SYLLABLE CYUH
52769<=m&&52795>=m||// Lo  [27] HANGUL SYLLABLE CEUG..HANGUL SYLLABLE CEUH
52797<=m&&52823>=m||// Lo  [27] HANGUL SYLLABLE CYIG..HANGUL SYLLABLE CYIH
52825<=m&&52851>=m||// Lo  [27] HANGUL SYLLABLE CIG..HANGUL SYLLABLE CIH
52853<=m&&52879>=m||// Lo  [27] HANGUL SYLLABLE KAG..HANGUL SYLLABLE KAH
52881<=m&&52907>=m||// Lo  [27] HANGUL SYLLABLE KAEG..HANGUL SYLLABLE KAEH
52909<=m&&52935>=m||// Lo  [27] HANGUL SYLLABLE KYAG..HANGUL SYLLABLE KYAH
52937<=m&&52963>=m||// Lo  [27] HANGUL SYLLABLE KYAEG..HANGUL SYLLABLE KYAEH
52965<=m&&52991>=m||// Lo  [27] HANGUL SYLLABLE KEOG..HANGUL SYLLABLE KEOH
52993<=m&&53019>=m||// Lo  [27] HANGUL SYLLABLE KEG..HANGUL SYLLABLE KEH
53021<=m&&53047>=m||// Lo  [27] HANGUL SYLLABLE KYEOG..HANGUL SYLLABLE KYEOH
53049<=m&&53075>=m||// Lo  [27] HANGUL SYLLABLE KYEG..HANGUL SYLLABLE KYEH
53077<=m&&53103>=m||// Lo  [27] HANGUL SYLLABLE KOG..HANGUL SYLLABLE KOH
53105<=m&&53131>=m||// Lo  [27] HANGUL SYLLABLE KWAG..HANGUL SYLLABLE KWAH
53133<=m&&53159>=m||// Lo  [27] HANGUL SYLLABLE KWAEG..HANGUL SYLLABLE KWAEH
53161<=m&&53187>=m||// Lo  [27] HANGUL SYLLABLE KOEG..HANGUL SYLLABLE KOEH
53189<=m&&53215>=m||// Lo  [27] HANGUL SYLLABLE KYOG..HANGUL SYLLABLE KYOH
53217<=m&&53243>=m||// Lo  [27] HANGUL SYLLABLE KUG..HANGUL SYLLABLE KUH
53245<=m&&53271>=m||// Lo  [27] HANGUL SYLLABLE KWEOG..HANGUL SYLLABLE KWEOH
53273<=m&&53299>=m||// Lo  [27] HANGUL SYLLABLE KWEG..HANGUL SYLLABLE KWEH
53301<=m&&53327>=m||// Lo  [27] HANGUL SYLLABLE KWIG..HANGUL SYLLABLE KWIH
53329<=m&&53355>=m||// Lo  [27] HANGUL SYLLABLE KYUG..HANGUL SYLLABLE KYUH
53357<=m&&53383>=m||// Lo  [27] HANGUL SYLLABLE KEUG..HANGUL SYLLABLE KEUH
53385<=m&&53411>=m||// Lo  [27] HANGUL SYLLABLE KYIG..HANGUL SYLLABLE KYIH
53413<=m&&53439>=m||// Lo  [27] HANGUL SYLLABLE KIG..HANGUL SYLLABLE KIH
53441<=m&&53467>=m||// Lo  [27] HANGUL SYLLABLE TAG..HANGUL SYLLABLE TAH
53469<=m&&53495>=m||// Lo  [27] HANGUL SYLLABLE TAEG..HANGUL SYLLABLE TAEH
53497<=m&&53523>=m||// Lo  [27] HANGUL SYLLABLE TYAG..HANGUL SYLLABLE TYAH
53525<=m&&53551>=m||// Lo  [27] HANGUL SYLLABLE TYAEG..HANGUL SYLLABLE TYAEH
53553<=m&&53579>=m||// Lo  [27] HANGUL SYLLABLE TEOG..HANGUL SYLLABLE TEOH
53581<=m&&53607>=m||// Lo  [27] HANGUL SYLLABLE TEG..HANGUL SYLLABLE TEH
53609<=m&&53635>=m||// Lo  [27] HANGUL SYLLABLE TYEOG..HANGUL SYLLABLE TYEOH
53637<=m&&53663>=m||// Lo  [27] HANGUL SYLLABLE TYEG..HANGUL SYLLABLE TYEH
53665<=m&&53691>=m||// Lo  [27] HANGUL SYLLABLE TOG..HANGUL SYLLABLE TOH
53693<=m&&53719>=m||// Lo  [27] HANGUL SYLLABLE TWAG..HANGUL SYLLABLE TWAH
53721<=m&&53747>=m||// Lo  [27] HANGUL SYLLABLE TWAEG..HANGUL SYLLABLE TWAEH
53749<=m&&53775>=m||// Lo  [27] HANGUL SYLLABLE TOEG..HANGUL SYLLABLE TOEH
53777<=m&&53803>=m||// Lo  [27] HANGUL SYLLABLE TYOG..HANGUL SYLLABLE TYOH
53805<=m&&53831>=m||// Lo  [27] HANGUL SYLLABLE TUG..HANGUL SYLLABLE TUH
53833<=m&&53859>=m||// Lo  [27] HANGUL SYLLABLE TWEOG..HANGUL SYLLABLE TWEOH
53861<=m&&53887>=m||// Lo  [27] HANGUL SYLLABLE TWEG..HANGUL SYLLABLE TWEH
53889<=m&&53915>=m||// Lo  [27] HANGUL SYLLABLE TWIG..HANGUL SYLLABLE TWIH
53917<=m&&53943>=m||// Lo  [27] HANGUL SYLLABLE TYUG..HANGUL SYLLABLE TYUH
53945<=m&&53971>=m||// Lo  [27] HANGUL SYLLABLE TEUG..HANGUL SYLLABLE TEUH
53973<=m&&53999>=m||// Lo  [27] HANGUL SYLLABLE TYIG..HANGUL SYLLABLE TYIH
54001<=m&&54027>=m||// Lo  [27] HANGUL SYLLABLE TIG..HANGUL SYLLABLE TIH
54029<=m&&54055>=m||// Lo  [27] HANGUL SYLLABLE PAG..HANGUL SYLLABLE PAH
54057<=m&&54083>=m||// Lo  [27] HANGUL SYLLABLE PAEG..HANGUL SYLLABLE PAEH
54085<=m&&54111>=m||// Lo  [27] HANGUL SYLLABLE PYAG..HANGUL SYLLABLE PYAH
54113<=m&&54139>=m||// Lo  [27] HANGUL SYLLABLE PYAEG..HANGUL SYLLABLE PYAEH
54141<=m&&54167>=m||// Lo  [27] HANGUL SYLLABLE PEOG..HANGUL SYLLABLE PEOH
54169<=m&&54195>=m||// Lo  [27] HANGUL SYLLABLE PEG..HANGUL SYLLABLE PEH
54197<=m&&54223>=m||// Lo  [27] HANGUL SYLLABLE PYEOG..HANGUL SYLLABLE PYEOH
54225<=m&&54251>=m||// Lo  [27] HANGUL SYLLABLE PYEG..HANGUL SYLLABLE PYEH
54253<=m&&54279>=m||// Lo  [27] HANGUL SYLLABLE POG..HANGUL SYLLABLE POH
54281<=m&&54307>=m||// Lo  [27] HANGUL SYLLABLE PWAG..HANGUL SYLLABLE PWAH
54309<=m&&54335>=m||// Lo  [27] HANGUL SYLLABLE PWAEG..HANGUL SYLLABLE PWAEH
54337<=m&&54363>=m||// Lo  [27] HANGUL SYLLABLE POEG..HANGUL SYLLABLE POEH
54365<=m&&54391>=m||// Lo  [27] HANGUL SYLLABLE PYOG..HANGUL SYLLABLE PYOH
54393<=m&&54419>=m||// Lo  [27] HANGUL SYLLABLE PUG..HANGUL SYLLABLE PUH
54421<=m&&54447>=m||// Lo  [27] HANGUL SYLLABLE PWEOG..HANGUL SYLLABLE PWEOH
54449<=m&&54475>=m||// Lo  [27] HANGUL SYLLABLE PWEG..HANGUL SYLLABLE PWEH
54477<=m&&54503>=m||// Lo  [27] HANGUL SYLLABLE PWIG..HANGUL SYLLABLE PWIH
54505<=m&&54531>=m||// Lo  [27] HANGUL SYLLABLE PYUG..HANGUL SYLLABLE PYUH
54533<=m&&54559>=m||// Lo  [27] HANGUL SYLLABLE PEUG..HANGUL SYLLABLE PEUH
54561<=m&&54587>=m||// Lo  [27] HANGUL SYLLABLE PYIG..HANGUL SYLLABLE PYIH
54589<=m&&54615>=m||// Lo  [27] HANGUL SYLLABLE PIG..HANGUL SYLLABLE PIH
54617<=m&&54643>=m||// Lo  [27] HANGUL SYLLABLE HAG..HANGUL SYLLABLE HAH
54645<=m&&54671>=m||// Lo  [27] HANGUL SYLLABLE HAEG..HANGUL SYLLABLE HAEH
54673<=m&&54699>=m||// Lo  [27] HANGUL SYLLABLE HYAG..HANGUL SYLLABLE HYAH
54701<=m&&54727>=m||// Lo  [27] HANGUL SYLLABLE HYAEG..HANGUL SYLLABLE HYAEH
54729<=m&&54755>=m||// Lo  [27] HANGUL SYLLABLE HEOG..HANGUL SYLLABLE HEOH
54757<=m&&54783>=m||// Lo  [27] HANGUL SYLLABLE HEG..HANGUL SYLLABLE HEH
54785<=m&&54811>=m||// Lo  [27] HANGUL SYLLABLE HYEOG..HANGUL SYLLABLE HYEOH
54813<=m&&54839>=m||// Lo  [27] HANGUL SYLLABLE HYEG..HANGUL SYLLABLE HYEH
54841<=m&&54867>=m||// Lo  [27] HANGUL SYLLABLE HOG..HANGUL SYLLABLE HOH
54869<=m&&54895>=m||// Lo  [27] HANGUL SYLLABLE HWAG..HANGUL SYLLABLE HWAH
54897<=m&&54923>=m||// Lo  [27] HANGUL SYLLABLE HWAEG..HANGUL SYLLABLE HWAEH
54925<=m&&54951>=m||// Lo  [27] HANGUL SYLLABLE HOEG..HANGUL SYLLABLE HOEH
54953<=m&&54979>=m||// Lo  [27] HANGUL SYLLABLE HYOG..HANGUL SYLLABLE HYOH
54981<=m&&55007>=m||// Lo  [27] HANGUL SYLLABLE HUG..HANGUL SYLLABLE HUH
55009<=m&&55035>=m||// Lo  [27] HANGUL SYLLABLE HWEOG..HANGUL SYLLABLE HWEOH
55037<=m&&55063>=m||// Lo  [27] HANGUL SYLLABLE HWEG..HANGUL SYLLABLE HWEH
55065<=m&&55091>=m||// Lo  [27] HANGUL SYLLABLE HWIG..HANGUL SYLLABLE HWIH
55093<=m&&55119>=m||// Lo  [27] HANGUL SYLLABLE HYUG..HANGUL SYLLABLE HYUH
55121<=m&&55147>=m||// Lo  [27] HANGUL SYLLABLE HEUG..HANGUL SYLLABLE HEUH
55149<=m&&55175>=m||// Lo  [27] HANGUL SYLLABLE HYIG..HANGUL SYLLABLE HYIH
55177<=m&&55203>=m// Lo  [27] HANGUL SYLLABLE HIG..HANGUL SYLLABLE HIH
?p:9757==m||// So       WHITE UP POINTING INDEX
9977==m||// So       PERSON WITH BALL
9994<=m&&9997>=m||// So   [4] RAISED FIST..WRITING HAND
127877==m||// So       FATHER CHRISTMAS
127938<=m&&127940>=m||// So   [3] SNOWBOARDER..SURFER
127943==m||// So       HORSE RACING
127946<=m&&127948>=m||// So   [3] SWIMMER..GOLFER
128066<=m&&128067>=m||// So   [2] EAR..NOSE
128070<=m&&128080>=m||// So  [11] WHITE UP POINTING BACKHAND INDEX..OPEN HANDS SIGN
128110==m||// So       POLICE OFFICER
128112<=m&&128120>=m||// So   [9] BRIDE WITH VEIL..PRINCESS
128124==m||// So       BABY ANGEL
128129<=m&&128131>=m||// So   [3] INFORMATION DESK PERSON..DANCER
128133<=m&&128135>=m||// So   [3] NAIL POLISH..HAIRCUT
128170==m||// So       FLEXED BICEPS
128372<=m&&128373>=m||// So   [2] MAN IN BUSINESS SUIT LEVITATING..SLEUTH OR SPY
128378==m||// So       MAN DANCING
128400==m||// So       RAISED HAND WITH FINGERS SPLAYED
128405<=m&&128406>=m||// So   [2] REVERSED HAND WITH MIDDLE FINGER EXTENDED..RAISED HAND WITH PART BETWEEN MIDDLE AND RING FINGERS
128581<=m&&128583>=m||// So   [3] FACE WITH NO GOOD GESTURE..PERSON BOWING DEEPLY
128587<=m&&128591>=m||// So   [5] HAPPY PERSON RAISING ONE HAND..PERSON WITH FOLDED HANDS
128675==m||// So       ROWBOAT
128692<=m&&128694>=m||// So   [3] BICYCLIST..PEDESTRIAN
128704==m||// So       BATH
128716==m||// So       SLEEPING ACCOMMODATION
129304<=m&&129308>=m||// So   [5] SIGN OF THE HORNS..RIGHT-FACING FIST
129310<=m&&129311>=m||// So   [2] HAND WITH INDEX AND MIDDLE FINGERS CROSSED..I LOVE YOU HAND SIGN
129318==m||// So       FACE PALM
129328<=m&&129337>=m||// So  [10] PREGNANT WOMAN..JUGGLING
129341<=m&&129342>=m||// So   [2] WATER POLO..HANDBALL
129489<=m&&129501>=m// So  [13] ADULT..ELF
?_:127995<=m&&127999>=m?g:8205==m// Cf       ZERO WIDTH JOINER
?h:9792==m||// So       FEMALE SIGN
9794==m||// So       MALE SIGN
9877<=m&&9878>=m||// So   [2] STAFF OF AESCULAPIUS..SCALES
9992==m||// So       AIRPLANE
10084==m||// So       HEAVY BLACK HEART
127752==m||// So       RAINBOW
127806==m||// So       EAR OF RICE
127859==m||// So       COOKING
127891==m||// So       GRADUATION CAP
127908==m||// So       MICROPHONE
127912==m||// So       ARTIST PALETTE
127979==m||// So       SCHOOL
127981==m||// So       FACTORY
128139==m||// So       KISS MARK
128187<=m&&128188>=m||// So   [2] PERSONAL COMPUTER..BRIEFCASE
128295==m||// So       WRENCH
128300==m||// So       MICROSCOPE
128488==m||// So       LEFT SPEECH BUBBLE
128640==m||// So       ROCKET
128658==m// So       FIRE ENGINE
?c:128102<=m&&128105>=m?y:d;//all unlisted characters have a grapheme break property of "Other"
}var e=0,t=1,n=2,i=3,r=4,a=5,s=6,l=7,o=8,u=9,p=10,d=11,f=12,_=13,g=14,h=15,c=16,y=17,m=0,b=1,v=2,T=3,x=4;// BreakTypes
return this.nextBreak=function(e,t){if(void 0===t&&(t=0),0>t)return 0;if(t>=e.length-1)return e.length;for(var n=getGraphemeBreakProperty(codePointAt(e,t)),r=[],a=t+1;a<e.length;a++)// check for already processed low surrogates
if(!isSurrogate(e,a-1)){var i=getGraphemeBreakProperty(codePointAt(e,a));if(shouldBreak(n,r,i))return a;r.push(i)}return e.length},this.splitGraphemes=function(e){for(var t,n=[],i=0;(t=this.nextBreak(e,i))<e.length;)n.push(e.slice(i,t)),i=t;return i<e.length&&n.push(e.slice(i)),n},this.countGraphemes=function(e){for(var t,n=0,i=0;(t=this.nextBreak(e,i))<e.length;)i=t,n++;return i<e.length&&n++,n},this}var graphemeSplitter$1=GraphemeSplitter;// https://github.com/airportyh/protomorphism
class Protocol{constructor(e){function createFun(e){return function(...n){const i=n[0];let r=null;if(null===i&&this.hasImplementation(Symbol('null'))?r=this.registry.get(Symbol)[e]:t(i)&&this.hasImplementation(Core.Integer)?r=this.registry.get(Core.Integer)[e]:'number'==typeof i&&!t(i)&&this.hasImplementation(Core.Float)?r=this.registry.get(Core.Float)[e]:'string'==typeof i&&this.hasImplementation(Core.BitString)?r=this.registry.get(Core.BitString)[e]:i&&i instanceof Map&&i.has(Symbol.for('__struct__'))&&this.hasImplementation(i)?r=this.registry.get(i.get(Symbol.for('__struct__')).__MODULE__)[e]:null!==i&&this.hasImplementation(i)?r=this.registry.get(i.constructor)[e]:this.fallback&&(r=this.fallback[e]),null!=r){const e=r.apply(this,n);return e}throw new Error(`No implementation found for ${i}`)}}var t=Number.isInteger;for(const t in this.registry=new Map,this.fallback=null,e)this[t]=createFun(t).bind(this)}implementation(e,t){null===e?this.fallback=t:this.registry.set(e,t)}hasImplementation(e){if(e===Core.Integer||e===Core.Float||e===Core.BitString)return this.registry.has(e);return e&&e instanceof Map&&e.has(Symbol.for('__struct__'))?this.registry.has(e.get(Symbol.for('__struct__')).__MODULE__):this.registry.has(e.constructor)}}// http://erlang.org/doc/man/lists.html
function reverse(e){return[...e]}function foreach(e,t){return t.forEach((t)=>e(t)),Symbol.for('ok')}function duplicate(e,t){const n=[];for(;n.length<e;)n.push(t);return n}function flatten(e,t=[]){const n=e.reduce((e,t)=>Array.isArray(t)?e.concat(flatten(t)):e.concat(t),[]);return n.concat(t)}function foldl(e,t,n){return n.reduce((t,n)=>e(n,t),t)}function foldr(e,t,n){return foldl(e,t,reverse(n))}function keyfind(e,t,n){for(const i of n)if(i instanceof ErlangTypes.Tuple&&i.get(t-1)===e)return i;return!1}function keymember(e,t,n){return!1!==keyfind(e,t,n)}function keyreplace(e,t,n,i){const r=[...n];for(let a=0;a<r.length;a++)if(r[a].get(t-1)===e)return r[a]=i,r;return r}function keysort(e,t){const n=[...t];return n.sort((t,n)=>{if(t.get(e-1)<n.get(e-1))return-1;return t.get(e-1)>n.get(e-1)?1:0})}function keystore(e,t,n,i){const r=[...n];for(let a=0;a<r.length;a++)if(r[a].get(t-1)===e)return r[a]=i,r;return r.concat(i)}function keydelete(e,t,n){const i=[];let r=!1;for(let a=0;a<n.length;a++)!1==r&&n[a].get(t-1)===e?r=!0:i.push(n[a]);return i}function keytake(e,t,n){const i=keyfind(e,t,n);return!1!==i&&new ErlangTypes.Tuple(i.get(t-1),i,keydelete(e,t,n))}function mapfoldl(e,t,n){const i=[];let r=t;for(const a of n){const t=e(a,r);i.push(t.get(0)),r=t.get(1)}return new ErlangTypes.Tuple(i,r)}function concat$1(e){return e.map((e)=>e.toString()).join()}function map(e,t){return t.map((t)=>e(t))}function filter(e,t){return t.filter((t)=>e(t))}function filtermap(e,t){const n=[];for(const i of t){const t=e(i);!0===t?n.push(i):t instanceof ErlangTypes.Tuple&&!0===t.get(0)&&n.push(t.get(1))}return n}function member(e,t){for(const n of t)if(n===e)return!0;return!1}function all(e,t){for(const n of t)if(!1===e(n))return!1;return!0}function any(e,t){for(const n of t)if(!0===e(n))return!0;return!1}function splitwith(e,t){let n=!1;const i=[],r=[];for(const a of t)!0==n?r.push(a):!0===e(a)?i.push(a):(n=!0,r.push(a));return new ErlangTypes.Tuple(i,r)}function sort(...e){if(1===e.length){const t=[...e[0]];return t.sort()}const t=e[0],n=[...e[1]];return n.sort((e,n)=>{const i=t(e,n);return!0===i?-1:1})}var lists={reverse,foreach,duplicate,flatten,foldl,foldr,keydelete,keyfind,keymember,keyreplace,keysort,keystore,keytake,mapfoldl,concat:concat$1,map,filter,filtermap,member,all,any,splitwith,sort};function get_value(e,t,n=Symbol.for('undefined')){const i=lists.keyfind(e,1,t);if(i){const[,e]=i.values;return e}return!!lists.member(e,t)||n}function is_defined(e,t){const n=lists.keyfind(e,1,t);return!!n}var proplists={get_value,is_defined};// http://erlang.org/doc/man/erlang.html
const selfPID=new ErlangTypes.PID;function is_boolean$1(e){return'boolean'==typeof e||e instanceof Boolean}function atom_to_binary(e,t=Symbol.for('utf8')){if(t!==Symbol.for('utf8'))throw new Error(`unsupported encoding ${t}`);return null===e?'nil':is_boolean$1(e)?e.toString():e.__MODULE__?Symbol.keyFor(e.__MODULE__):Symbol.keyFor(e)}function atom_to_list(e){return atom_to_binary(e)}function binary_to_atom(e,t=Symbol.for('utf8')){if(t!==Symbol.for('utf8'))throw new Error(`unsupported encoding ${t}`);return'nil'===e?null:!('true'!==e)||'false'!==e&&Symbol.for(e)}function binary_to_existing_atom(e,t=Symbol.for('utf8')){return binary_to_atom(e,t)}function list_concatenation(e,t){return e.concat(t)}function list_subtraction(e,t){const n=[...e];for(const i of t){const e=n.indexOf(i);-1<e&&n.splice(e,1)}return n}function arrayEquals$1(e,t){if(!Array.isArray(t))return!1;if(e.length!==t.length)return!1;for(let n=0;n<e.length;n++)if(!1===equals$1(e[n],t[n]))return!1;return!0}function tupleEquals$1(e,t){return!1!=t instanceof ErlangTypes.Tuple&&!(e.length!==t.length)&&arrayEquals$1(e.values,t.values)}function bitstringEquals$1(e,t){return!1!=t instanceof ErlangTypes.BitString&&!(e.length!==t.length)&&arrayEquals$1(e.value,t.value)}function pidEquals$1(e,t){return!1!=t instanceof ErlangTypes.PID&&e.id===t.id}function referenceEquals$1(e,t){return!1!=t instanceof ErlangTypes.Reference&&e.id===t.id}function mapEquals$1(e,t){if(!1==t instanceof Map)return!1;const n=Array.from(e.entries()),i=Array.from(t.entries());return arrayEquals$1(n,i)}function equals$1(e,t){return Array.isArray(e)?arrayEquals$1(e,t):e instanceof ErlangTypes.Tuple?tupleEquals$1(e,t):e instanceof ErlangTypes.PID?pidEquals$1(e,t):e instanceof ErlangTypes.BitString?bitstringEquals$1(e,t):e instanceof ErlangTypes.Reference?referenceEquals$1(e,t):e instanceof Map?mapEquals$1(e,t):e===t}function div(e,t){return e/t}function not(e){return!e}function rem(e,t){return e%t}function band(e,t){return e&t}function bor(e,t){return e|t}function bnot(e){return~e}function bsl(e,t){return e<<t}function bsr(e,t){return e>>t}function bxor(e,t){return e^t}function is_atom(e){if(null===e)return!0;return!!is_boolean$1(e)||'symbol'==typeof e||e instanceof Symbol||null!=e.__MODULE__}function is_bitstring$1(e){return e instanceof ErlangTypes.BitString}function is_number$1(e){return'number'==typeof e||e instanceof Number}function is_float(e){return is_number$1(e)&&!Number.isInteger(e)}function is_function$1(e){return'function'==typeof e||e instanceof Function}function is_integer(e){return Number.isInteger(e)}function is_list(e){return Array.isArray(e)}function is_map$1(e){return e instanceof Map}function is_pid$1(e){return e instanceof ErlangTypes.PID}function is_port(){return!1}function is_reference$1(e){return e instanceof ErlangTypes.Reference}function is_tuple$1(e){return e instanceof ErlangTypes.Tuple}function is_binary(e){return'string'==typeof e||e instanceof String}function element(e,t){return t.get(e-1)}function setelement(e,t,n){const i=[...t.values];return i[e-1]=n,new ErlangTypes.Tuple(...i)}function make_tuple(e,t){const n=[];for(let r=0;r<e;r++)n.push(t);return new ErlangTypes.Tuple(...n)}function insert_element(e,t,n){const i=[...t.values];return i.splice(e-1,0,n),new ErlangTypes.Tuple(...i)}function append_element(e,t){const n=[...e.values,t];return new ErlangTypes.Tuple(...n)}function delete_element(e,t){const n=[...t.values];return n.splice(e-1,1),new ErlangTypes.Tuple(...n)}function tuple_to_list(e){const t=[...e.values];return t}function abs(e){return Math.abs(e)}function apply(...e){return 2===e.length?e[0].apply(this,...e[1]):e[0][atom_to_binary(e[1])].apply(this,...e[2])}function binary_part(e,t,n){return e.substring(t,t+n)}function bit_size(e){return e.bit_size}function byte_size(e){return'string'==typeof e||e instanceof String?e.length:e.byte_size}function hd(e){return e[0]}function length(e){return e.length}function make_ref(){return new ErlangTypes.Reference}function map_size(e){return e.size}function max(e,t){return Math.max(e,t)}function min(e,t){return Math.min(e,t)}function round(e){return Math.round(e)}function tl(e){return e.slice(1)}function trunc(e){return Math.trunc(e)}function tuple_size(e){return e.length}function binary_to_float(e){return parseFloat(e)}function binary_to_integer(e,t=10){return parseInt(e,t)}function process_info(e,t){return t?t===Symbol.for('current_stacktrace')?new ErlangTypes.Tuple(t,[]):new ErlangTypes.Tuple(t,null):[]}function list_to_binary(e){var t=String.fromCodePoint;const n=lists.flatten(e),i=n.reduce((e,n)=>{if(null===n)return e;return is_integer(n)?e+t(n):is_bitstring$1(n)?e+t(...n.value):e+n},'');return i}function iolist_to_binary(e){var t=String.fromCodePoint;if(null===e)return'';if(is_binary(e))return e;if(is_bitstring$1(e))return t(...e.value);if(is_number$1(e))return t(e);const n=lists.flatten(e),i=n.reduce((e,n)=>{if(null===n)return e;return is_integer(n)?e+t(n):is_bitstring$1(n)?e+t(...n.value):e+iolist_to_binary(n)},'');return i}function io_size(e){return iolist_to_binary(e).length}function integer_to_binary(e,t=10){return e.toString(t)}function node(){return Symbol.for('nonode@nohost')}function nodes(e=[]){const t=Array.isArray(e)?e:[e],n=[];for(const i of t)i===Symbol.for('this')&&(n.push(Symbol.for('nonode@nohost')),console.log(n));return n}function self$1(){return selfPID}function _throw(e){throw e}function error(e){let t=null;if(e instanceof Map&&e.has(Symbol.for('__exception__'))){let n=Symbol.keyFor(e.get(Symbol.for('__struct__')).__MODULE__);n=n.split('.').slice(1).join('.');const i=e.get(Symbol.for('message'));t=new Error(`** (${n}) ${i}`)}else t=is_binary(e)?new Error(`** (RuntimeError) ${e}`):new Error(`** (ErlangError) Erlang Error ${e.toString()}`);throw t.__reason=e,t}function exit(...e){if(2===e.length)throw e[1];else throw e[0]}function raise(e,t){e===Symbol.for('throw')?_throw(t):e===Symbol.for('error')?error(t):exit(t)}function function_exported(e,t){return null!=e[t]}function lessThanEqualTo(e,t){return e<=t}function add(e,t){return e+t}var erlang={atom_to_binary,binary_to_atom,binary_to_existing_atom,list_concatenation,list_subtraction,div,not,rem,band,bor,bsl,bsr,bxor,bnot,is_bitstring:is_bitstring$1,is_boolean:is_boolean$1,is_float,is_function:is_function$1,is_integer,is_list,is_map:is_map$1,is_number:is_number$1,is_pid:is_pid$1,is_port,is_reference:is_reference$1,is_tuple:is_tuple$1,is_atom,is_binary,element,setelement,make_tuple,insert_element,append_element,delete_element,tuple_to_list,abs,apply,binary_part,bit_size,byte_size,hd,length,make_ref,map_size,max,min,round,tl,trunc,tuple_size,binary_to_float,binary_to_integer,process_info,iolist_to_binary,io_size,integer_to_binary,atom_to_list,node,self:self$1,throw:_throw,error,exit,raise,list_to_binary,nodes,function_exported,equals:equals$1,lessThanEqualTo,add};function call_property(e,t){if(!t)return e instanceof Function||'function'==typeof e?e():e;if(e instanceof Map){let n=null;if(e.has(t)?n=t:e.has(Symbol.for(t))&&(n=Symbol.for(t)),null===n)throw new Error(`Property ${t} not found in ${e}`);return e.get(n)}let n=null;if('number'==typeof e||'symbol'==typeof e||'boolean'==typeof e||'string'==typeof e?void 0===e[t]?void 0!==e[Symbol.for(t)]&&(n=Symbol.for(t)):n=t:t in e?n=t:Symbol.for(t)in e&&(n=Symbol.for(t)),null===n)throw new Error(`Property ${t} not found in ${e}`);return e[n]instanceof Function||'function'==typeof e[n]?e[n]():e[n]}function defprotocol(e){return new Protocol(e)}function defimpl(e,t,n){e.implementation(t,n)}function build_namespace(e,t){let n=t.split('.');const i=e;let r=e;'Elixir'===n[0]&&(n=n.slice(1));for(const i of n)'undefined'==typeof r[i]&&(r[i]={}),r=r[i];return i.__table__=e.__table__||{},i.__table__[Symbol.for(t)]=r,r}function map_to_object(e,t=[]){const n=proplists.get_value(Symbol.for('keys'),t),i=proplists.get_value(Symbol.for('symbols'),t),r={};for(const a of e.entries()){let e=a[0];const s=a[1];n===Symbol.for('string')&&'number'==typeof e?e=e.toString():(n===Symbol.for('string')||i!==Symbol.for('undefined'))&&'symbol'==typeof e&&(e=erlang.atom_to_binary(e)),r[e]=s instanceof Map?map_to_object(s,t):i!==Symbol.for('undefined')&&'symbol'==typeof s?erlang.atom_to_binary(s):s}return r}function object_to_map(e,t=[]){const n=proplists.get_value(Symbol.for('keys'),t)===Symbol.for('atom'),i=!0===proplists.get_value(Symbol.for('recurse_array'),t);if(e.constructor===Object){const r=new Map;return Reflect.ownKeys(e).forEach((a)=>{let s=a,l=e[a];n&&'string'==typeof a&&(s=Symbol.for(a)),null!==l&&(l.constructor===Object||l instanceof Array&&i)&&(l=object_to_map(l,t)),r.set(s,l)}),r}if(e instanceof Array&&i)return e.map((e)=>null!==e&&(e.constructor===Object||e instanceof Array)?object_to_map(e,t):e);throw new Error(`Object ${e} is not an native object or array`)}class Recurse{constructor(e){this.func=e}}function trampoline$1(e){let t=e;for(;t&&t instanceof Recurse;)t=t.func();return t}function split_at(e,t){const n=new graphemeSplitter$1,i=n.splitGraphemes(e);if(0>t){const n=i.length+t;return 0>n?new Core.Tuple('',e):split_at(e,n)}let r='',a='',s=0;for(const n of i)s<t?r+=n:a+=n,s+=1;return new Core.Tuple(r,a)}function graphemes(e){const t=new graphemeSplitter$1;return t.splitGraphemes(e)}function concat(e,t){return[e].concat(t)}var Functions={call_property,defprotocol,defimpl,build_namespace,map_to_object,object_to_map,trampoline:trampoline$1,Recurse,split_at,graphemes,concat};function _case(e,t){return Core.Patterns.defmatch(...t)(e)}function cond(...e){for(const t of e)if(t[0])return t[1]();throw new Error}function run_list_generators(e,t){if(0===t.length)return e.map((e)=>Array.isArray(e)?e:[e]);const n=t.pop(),r=[];for(const a of n())for(const t of e)r.push([a].concat(t));return run_list_generators(r,t)}function _for(e,t,n,i=[]){const[r,a]=n.into(i);let s=r;const l=run_list_generators(t.pop()(),t);for(const r of l)e.guard.apply(this,r)&&(s=a(s,new Core.Tuple(Symbol.for('cont'),e.fn.apply(this,r))));return a(s,Symbol.for('done'))}function _try(e,t,n,i,r){let a=null;try{a=e()}catch(i){let e=null;if(t)try{let n=i;return i.__reason&&(n=i.__reason,n.set('__reason',i.__reason)),e=t(n),e}catch(e){throw e}if(n)try{return e=n(i),e}catch(e){throw e}throw i}finally{r&&r()}if(i)try{return i(a)}catch(e){if(e instanceof Core.Patterns.MatchError)throw new Error('No Match Found in Else');throw e}else return a}function _with(...e){let t=[],n=null,r=null;'function'==typeof e[e.length-2]?[n,r]=e.splice(-2):n=e.pop();for(let n=0;n<e.length;n++){const[i,a]=e[n],s=a(...t),l=Core.Patterns.match_or_default(i,s);if(null==l)return r?r.call(null,s):s;t=t.concat(l)}return n(...t)}function receive(e,t=0,n=()=>!0){console.warn('Receive not supported');const r=[],a=Symbol('NOMATCH');// this.mailbox.get();
for(let s=0;s<r.length;s++)for(const t of e){const e=Core.Patterns.match_or_default(t.pattern,r[s],t.guard,a);if(e!==a)return this.mailbox.removeAt(s),t.fn.apply(null,e)}return null}var SpecialForms={_case,cond,_for,_try,_with,receive};// http://erlang.org/doc/man/maps.html
const OK=Symbol.for('ok'),ERROR=Symbol.for('error'),BADMAP=Symbol.for('badmap'),BADKEY=Symbol.for('badkey');function is_non_primitive$1(e){return erlang.is_list(e)||erlang.is_map(e)||erlang.is_pid(e)||erlang.is_reference(e)||erlang.is_bitstring(e)||erlang.is_tuple(e)}function __put(e,t,n){const i=new Map(e);if(is_non_primitive$1(t))for(const r of e.keys())if(erlang.equals(r,t))return i.set(r,n),i;return i.set(t,n),i}function __has(e,t){if(is_non_primitive$1(t)){for(const n of e.keys())if(erlang.equals(n,t))return!0;return!1}return e.has(t)}function __get(e,t){if(is_non_primitive$1(t)){for(const n of e.keys())if(erlang.equals(n,t))return e.get(n);return null}return e.get(t)}function __delete(e,t){if(is_non_primitive$1(t))for(const n of e.keys())erlang.equals(n,t)&&e.delete(n);else e.delete(t)}function find(e,t){if(!1===erlang.is_map(t))return new ErlangTypes.Tuple(BADMAP,t);const n=__get(t,e);return'undefined'==typeof n?ERROR:new ErlangTypes.Tuple(OK,n)}function fold(e,t,n){let i=t;for(const[r,a]of n.entries())i=e(r,a,i);return i}function remove(e,t){if(!1===erlang.is_map(t))return new ErlangTypes.Tuple(BADMAP,t);const n=new Map(t);return __delete(n,e),n}function to_list(e){if(!1===erlang.is_map(e))return new ErlangTypes.Tuple(BADMAP,e);const t=[];for(const[n,i]of e.entries())t.push(new ErlangTypes.Tuple(n,i));return t}function from_list(e){return e.reduce((e,t)=>{const[n,i]=t;return e.set(n,i),e},new Map)}function keys(e){return!1===erlang.is_map(e)?new ErlangTypes.Tuple(BADMAP,e):Array.from(e.keys())}function values$1(e){return!1===erlang.is_map(e)?new ErlangTypes.Tuple(BADMAP,e):Array.from(e.values())}function is_key(e,t){return __has(t,e)}function put(e,t,n){return!1===erlang.is_map(n)?new ErlangTypes.Tuple(BADMAP,n):__put(n,e,t)}function merge(e,t){return!1===erlang.is_map(e)?new ErlangTypes.Tuple(BADMAP,e):!1===erlang.is_map(t)?new ErlangTypes.Tuple(BADMAP,t):new Map([...e,...t])}function update(e,t,n){return!1===erlang.is_map(n)?new ErlangTypes.Tuple(BADMAP,n):!1===is_key(e,n)?new ErlangTypes.Tuple(BADKEY,e):new Map([...n,[e,t]])}function get$1(...e){const t=e[0],n=e[1];return!1===erlang.is_map(n)?new ErlangTypes.Tuple(BADMAP,n):is_key(t,n)?__get(n,t):3===e.length?e[2]:new ErlangTypes.Tuple(BADKEY,t)}function take(e,t){if(!1===erlang.is_map(t))return new ErlangTypes.Tuple(BADMAP,t);if(!is_key(e,t))return ERROR;const n=__get(t,e),i=new Map(t);return __delete(i,e),new ErlangTypes.Tuple(n,i)}var maps={find,fold,remove,to_list,from_list,keys,values:values$1,is_key,put,merge,update,get:get$1,take,__has};function warn(e){const t=e.join('');return console.warn(`warning: ${t}`),Symbol.for('ok')}var elixir_errors={warn};const MODULE=Symbol.for('elixir_config'),ets=new Map;function _new(e){return ets.set(MODULE,new Map),ets.get(MODULE).set(MODULE,e),MODULE}function _delete(e){return ets.delete(e),!0}function put$1(e,t){return ets.get(MODULE).set(e,t),Symbol.for('ok')}function get$2(e){return ets.get(MODULE).get(e)}function update$1(e,t){const n=t(ets.get(MODULE).get(e));return put$1(e,n),n}function get_and_put(e,t){const n=get$2(e);return put$1(e,t),n}var elixir_config={new:_new,delete:_delete,put:put$1,get:get$2,update:update$1,get_and_put};function put_chars(e,t){const n=erlang.iolist_to_binary(t);return e===Symbol.for('stderr')?console.error(n):console.log(n),Symbol.for('ok')}var io={put_chars};function join(e,t=null){const n=Array.isArray(e)?e:[e,t];let r=[];for(let a=n.length-1;0<=a;a--){const e=n[a],t=e.replace(/\/+/g,'/').replace(/^\/|\/$/g,'');if(r.push(t),'/'===e[0]){r.push('');break}}return r.reverse().join('/')}function dirname(e){const t=join([e]),n=t.lastIndexOf('/');return-1===n?'.':t.substr(0,n)||'/'}var filename={join,dirname};function at(e,t){return e.charAt(t)}function copy(e,t=1){return e.repeat(t)}function first(e){if(0===e.length)throw new Error('Binary is of length 0');return at(e,0)}function last(e){if(0===e.length)throw new Error('Binary is of length 0');return e.slice(-1)}function list_to_bin(e){return erlang.list_to_binary(e)}function part(e,t,n=null){if(null===n){const[n,i]=t.values;return e.substr(n,i)}return e.substr(t,n)}// TODO: Support more options
// TODO: pattern cannot be list of strings
function replace(e,t,n,i=[]){const r=proplists.get_value(Symbol.for('global'),i);let a;return a=r===Symbol.for('undefined')?new RegExp(t,''):new RegExp(t,'g'),e.replace(a,n)}// TODO: Support more options, global is implied
// TODO: pattern cannot be list of strings
function split(e,t,n=[]){return e.split(t)}var binary={at,copy,first,last,list_to_bin,part,replace,split};function characters_to_list(e,t=Symbol.for('unicode')){let n=e;return Array.isArray(e)&&(n=lists.flatten(e)),erlang.is_binary(n)?n.split('').map((e)=>e.codePointAt(0)):n.reduce((e,n)=>erlang.is_integer(n)?e.concat(n):e.concat(characters_to_list(n,t)),[])}function characters_to_binary(e){const t=characters_to_list(e);return String.fromCodePoint(...t)}var unicode={characters_to_list,characters_to_binary};function get_key(e){let t=e;if(Core.global.__elixirscript_names__.has(e)&&(t=Core.global.__elixirscript_names__.get(e)),Core.global.__elixirscript_store__.has(t))return t;throw new Error(`Key ${t} not found`)}function create(e,t=null){const n=new Core.PID;return null!==t&&Core.global.__elixirscript_names__.set(t,n),Core.global.__elixirscript_store__.set(n,e)}function update$2(e,t){const n=get_key(e);return Core.global.__elixirscript_store__.set(n,t)}function read(e){const t=get_key(e);return Core.global.__elixirscript_store__.get(t)}function remove$1(e){const t=get_key(e);return Core.global.__elixirscript_store__.delete(t)}var Store={create,update:update$2,read,remove:remove$1};function log2(e){return Math.log2(e)}var math={log2};class Integer{}class Float{}function get_global(){return'undefined'==typeof self?'undefined'==typeof window?'undefined'==typeof global?(console.warn('No global state found'),null):global:window:self}function initApp(){const e={};return e.__table__={},e.start=(t,n)=>{t.__load(e).start(Symbol.for('normal'),n)},e.load=(t)=>t.__load(e),e}const globalState=get_global();globalState.__elixirscript_store__=new Map,globalState.__elixirscript_names__=new Map;var Core={Tuple:ErlangTypes.Tuple,PID:ErlangTypes.PID,BitString:ErlangTypes.BitString,Reference:ErlangTypes.Reference,Patterns,Integer,Float,Functions,SpecialForms,Store,global:globalState,erlang,maps,lists,elixir_errors,io,filename,binary,unicode,elixir_config,math,proplists,initApp},elixir={Core};export default elixir;
