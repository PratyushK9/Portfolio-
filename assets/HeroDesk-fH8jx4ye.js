import{r as s,j as t,P as q}from"./index-DMZDi1q1.js";import{V as D,B as se,R as ae,_ as V,S as oe,u as R,M as E,a as _,W as Y,P as ne,b as ie,c as ce,C as L,d as F,e as le,f as ue,g as fe,h as me,i as de,j as ve}from"./extends-DNYtXTyV.js";function he(e,r=Math.PI/3){const n=Math.cos(r),a=(1+1e-10)*100,o=[new D,new D,new D],i=new D,l=new D,u=new D,c=new D;function f(m){const g=~~(m.x*a),h=~~(m.y*a),b=~~(m.z*a);return`${g},${h},${b}`}const v=e.index?e.toNonIndexed():e,d=v.attributes.position,x={};for(let m=0,g=d.count/3;m<g;m++){const h=3*m,b=o[0].fromBufferAttribute(d,h+0),y=o[1].fromBufferAttribute(d,h+1),C=o[2].fromBufferAttribute(d,h+2);i.subVectors(C,y),l.subVectors(b,y);const A=new D().crossVectors(i,l).normalize();for(let M=0;M<3;M++){const I=o[M],S=f(I);S in x||(x[S]=[]),x[S].push(A)}}const p=new Float32Array(d.count*3),j=new se(p,3,!1);for(let m=0,g=d.count/3;m<g;m++){const h=3*m,b=o[0].fromBufferAttribute(d,h+0),y=o[1].fromBufferAttribute(d,h+1),C=o[2].fromBufferAttribute(d,h+2);i.subVectors(C,y),l.subVectors(b,y),u.crossVectors(i,l).normalize();for(let A=0;A<3;A++){const M=o[A],I=f(M),S=x[I];c.set(0,0,0);for(let U=0,k=S.length;U<k;U++){const G=S[U];u.dot(G)>n&&c.add(G)}c.normalize(),j.setXYZ(h+A,c.x,c.y,c.z)}}return v.setAttribute("normal",j),v}const xe={uniforms:{tDiffuse:{value:null},h:{value:1/512}},vertexShader:`
      varying vec2 vUv;

      void main() {

        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

      }
  `,fragmentShader:`
    uniform sampler2D tDiffuse;
    uniform float h;

    varying vec2 vUv;

    void main() {

    	vec4 sum = vec4( 0.0 );

    	sum += texture2D( tDiffuse, vec2( vUv.x - 4.0 * h, vUv.y ) ) * 0.051;
    	sum += texture2D( tDiffuse, vec2( vUv.x - 3.0 * h, vUv.y ) ) * 0.0918;
    	sum += texture2D( tDiffuse, vec2( vUv.x - 2.0 * h, vUv.y ) ) * 0.12245;
    	sum += texture2D( tDiffuse, vec2( vUv.x - 1.0 * h, vUv.y ) ) * 0.1531;
    	sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y ) ) * 0.1633;
    	sum += texture2D( tDiffuse, vec2( vUv.x + 1.0 * h, vUv.y ) ) * 0.1531;
    	sum += texture2D( tDiffuse, vec2( vUv.x + 2.0 * h, vUv.y ) ) * 0.12245;
    	sum += texture2D( tDiffuse, vec2( vUv.x + 3.0 * h, vUv.y ) ) * 0.0918;
    	sum += texture2D( tDiffuse, vec2( vUv.x + 4.0 * h, vUv.y ) ) * 0.051;

    	gl_FragColor = sum;

    }
  `},pe={uniforms:{tDiffuse:{value:null},v:{value:1/512}},vertexShader:`
    varying vec2 vUv;

    void main() {

      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

    }
  `,fragmentShader:`

  uniform sampler2D tDiffuse;
  uniform float v;

  varying vec2 vUv;

  void main() {

    vec4 sum = vec4( 0.0 );

    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y - 4.0 * v ) ) * 0.051;
    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y - 3.0 * v ) ) * 0.0918;
    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y - 2.0 * v ) ) * 0.12245;
    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y - 1.0 * v ) ) * 0.1531;
    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y ) ) * 0.1633;
    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y + 1.0 * v ) ) * 0.1531;
    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y + 2.0 * v ) ) * 0.12245;
    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y + 3.0 * v ) ) * 0.0918;
    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y + 4.0 * v ) ) * 0.051;

    gl_FragColor = sum;

  }
  `},ge=()=>parseInt(ae.replace(/\D+/g,"")),ye=ge(),w=1e-5;function be(e,r,n){const a=new oe,o=n-w;return a.absarc(w,w,w,-Math.PI/2,-Math.PI,!0),a.absarc(w,r-o*2,w,Math.PI,Math.PI/2,!0),a.absarc(e-o*2,r-o*2,w,Math.PI/2,0,!0),a.absarc(e-o*2,w,w,0,-Math.PI/2,!0),a}const O=s.forwardRef(function({args:[r=1,n=1,a=1]=[],radius:o=.05,steps:i=1,smoothness:l=4,bevelSegments:u=4,creaseAngle:c=.4,children:f,...v},d){return s.createElement("mesh",V({ref:d},v),s.createElement(Me,{args:[r,n,a],radius:o,steps:i,smoothness:l,bevelSegments:u,creaseAngle:c}),f)}),Me=s.forwardRef(function({args:[r=1,n=1,a=1]=[],radius:o=.05,steps:i=1,smoothness:l=4,bevelSegments:u=4,creaseAngle:c=.4,...f},v){const d=s.useMemo(()=>be(r,n,o),[r,n,o]),x=s.useMemo(()=>({depth:a-o*2,bevelEnabled:!0,bevelSegments:u*2,steps:i,bevelSize:o-w,bevelThickness:o,curveSegments:l}),[a,o,l,u,i]),p=s.useRef(null);return s.useLayoutEffect(()=>{p.current&&(p.current.center(),he(p.current,c))},[d,x,c]),s.useImperativeHandle(v,()=>p.current),s.createElement("extrudeGeometry",V({ref:p,args:[d,x]},f))}),K=s.forwardRef(({children:e,enabled:r=!0,speed:n=1,rotationIntensity:a=1,floatIntensity:o=1,floatingRange:i=[-.1,.1],autoInvalidate:l=!1,...u},c)=>{const f=s.useRef(null);s.useImperativeHandle(c,()=>f.current,[]);const v=s.useRef(Math.random()*1e4);return R(d=>{var x,p;if(!r||n===0)return;l&&d.invalidate();const j=v.current+d.clock.elapsedTime;f.current.rotation.x=Math.cos(j/4*n)/8*a,f.current.rotation.y=Math.sin(j/4*n)/8*a,f.current.rotation.z=Math.sin(j/4*n)/20*a;let m=Math.sin(j/4*n)/10;m=E.mapLinear(m,-.1,.1,(x=i?.[0])!==null&&x!==void 0?x:-.1,(p=i?.[1])!==null&&p!==void 0?p:.1),f.current.position.y=m*o,f.current.updateMatrix()}),s.createElement("group",u,s.createElement("group",{ref:f,matrixAutoUpdate:!1},e))}),je=s.forwardRef(({scale:e=10,frames:r=1/0,opacity:n=1,width:a=1,height:o=1,blur:i=1,near:l=0,far:u=10,resolution:c=512,smooth:f=!0,color:v="#000000",depthWrite:d=!1,renderOrder:x,...p},j)=>{const m=s.useRef(null),g=_(P=>P.scene),h=_(P=>P.gl),b=s.useRef(null);a=a*(Array.isArray(e)?e[0]:e||1),o=o*(Array.isArray(e)?e[1]:e||1);const[y,C,A,M,I,S,U]=s.useMemo(()=>{const P=new Y(c,c),W=new Y(c,c);W.texture.generateMipmaps=P.texture.generateMipmaps=!1;const Z=new ne(a,o).rotateX(Math.PI/2),re=new ie(Z),z=new ce;z.depthTest=z.depthWrite=!1,z.onBeforeCompile=B=>{B.uniforms={...B.uniforms,ucolor:{value:new L(v)}},B.fragmentShader=B.fragmentShader.replace("void main() {",`uniform vec3 ucolor;
           void main() {
          `),B.fragmentShader=B.fragmentShader.replace("vec4( vec3( 1.0 - fragCoordZ ), opacity );","vec4( ucolor * fragCoordZ * 2.0, ( 1.0 - fragCoordZ ) * 1.0 );")};const X=new F(xe),J=new F(pe);return J.depthTest=X.depthTest=!1,[P,Z,z,re,X,J,W]},[c,a,o,e,v]),k=P=>{M.visible=!0,M.material=I,I.uniforms.tDiffuse.value=y.texture,I.uniforms.h.value=P*1/256,h.setRenderTarget(U),h.render(M,b.current),M.material=S,S.uniforms.tDiffuse.value=U.texture,S.uniforms.v.value=P*1/256,h.setRenderTarget(y),h.render(M,b.current),M.visible=!1};let G=0,N,$;return R(()=>{b.current&&(r===1/0||G<r)&&(G++,N=g.background,$=g.overrideMaterial,m.current.visible=!1,g.background=null,g.overrideMaterial=A,h.setRenderTarget(y),h.render(g,b.current),k(i),f&&k(i*.4),h.setRenderTarget(null),m.current.visible=!0,g.overrideMaterial=$,g.background=N)}),s.useImperativeHandle(j,()=>m.current,[]),s.createElement("group",V({"rotation-x":Math.PI/2},p,{ref:m}),s.createElement("mesh",{renderOrder:x,geometry:C,scale:[1,-1,1],rotation:[-Math.PI/2,0,0]},s.createElement("meshBasicMaterial",{transparent:!0,map:y.texture,opacity:n,depthWrite:d})),s.createElement("orthographicCamera",{ref:b,args:[-a/2,a/2,o/2,-o/2,l,u]}))});class Se extends F{constructor(){super({uniforms:{time:{value:0},pixelRatio:{value:1}},vertexShader:`
        uniform float pixelRatio;
        uniform float time;
        attribute float size;  
        attribute float speed;  
        attribute float opacity;
        attribute vec3 noise;
        attribute vec3 color;
        varying vec3 vColor;
        varying float vOpacity;

        void main() {
          vec4 modelPosition = modelMatrix * vec4(position, 1.0);
          modelPosition.y += sin(time * speed + modelPosition.x * noise.x * 100.0) * 0.2;
          modelPosition.z += cos(time * speed + modelPosition.x * noise.y * 100.0) * 0.2;
          modelPosition.x += cos(time * speed + modelPosition.x * noise.z * 100.0) * 0.2;
          vec4 viewPosition = viewMatrix * modelPosition;
          vec4 projectionPostion = projectionMatrix * viewPosition;
          gl_Position = projectionPostion;
          gl_PointSize = size * 25. * pixelRatio;
          gl_PointSize *= (1.0 / - viewPosition.z);
          vColor = color;
          vOpacity = opacity;
        }
      `,fragmentShader:`
        varying vec3 vColor;
        varying float vOpacity;
        void main() {
          float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
          float strength = 0.05 / distanceToCenter - 0.1;
          gl_FragColor = vec4(vColor, strength * vOpacity);
          #include <tonemapping_fragment>
          #include <${ye>=154?"colorspace_fragment":"encodings_fragment"}>
        }
      `})}get time(){return this.uniforms.time.value}set time(r){this.uniforms.time.value=r}get pixelRatio(){return this.uniforms.pixelRatio.value}set pixelRatio(r){this.uniforms.pixelRatio.value=r}}const Q=e=>e&&e.constructor===Float32Array,we=e=>[e.r,e.g,e.b],ee=e=>e instanceof ue||e instanceof D||e instanceof fe,te=e=>Array.isArray(e)?e:ee(e)?e.toArray():[e,e,e];function T(e,r,n){return s.useMemo(()=>{if(r!==void 0){if(Q(r))return r;if(r instanceof L){const a=Array.from({length:e*3},()=>we(r)).flat();return Float32Array.from(a)}else if(ee(r)||Array.isArray(r)){const a=Array.from({length:e*3},()=>te(r)).flat();return Float32Array.from(a)}return Float32Array.from({length:e},()=>r)}return Float32Array.from({length:e},n)},[r])}const Pe=s.forwardRef(({noise:e=1,count:r=100,speed:n=1,opacity:a=1,scale:o=1,size:i,color:l,children:u,...c},f)=>{s.useMemo(()=>le({SparklesImplMaterial:Se}),[]);const v=s.useRef(null),d=_(y=>y.viewport.dpr),x=te(o),p=s.useMemo(()=>Float32Array.from(Array.from({length:r},()=>x.map(E.randFloatSpread)).flat()),[r,...x]),j=T(r,i,Math.random),m=T(r,a),g=T(r,n),h=T(r*3,e),b=T(l===void 0?r*3:r,Q(l)?l:new L(l),()=>1);return R(y=>{v.current&&v.current.material&&(v.current.material.time=y.clock.elapsedTime)}),s.useImperativeHandle(f,()=>v.current,[]),s.createElement("points",V({key:`particle-${r}-${JSON.stringify(o)}`},c,{ref:v}),s.createElement("bufferGeometry",null,s.createElement("bufferAttribute",{attach:"attributes-position",args:[p,3]}),s.createElement("bufferAttribute",{attach:"attributes-size",args:[j,1]}),s.createElement("bufferAttribute",{attach:"attributes-opacity",args:[m,1]}),s.createElement("bufferAttribute",{attach:"attributes-speed",args:[g,1]}),s.createElement("bufferAttribute",{attach:"attributes-color",args:[b,3]}),s.createElement("bufferAttribute",{attach:"attributes-noise",args:[h,3]})),u||s.createElement("sparklesImplMaterial",{transparent:!0,pixelRatio:d,depthWrite:!1}))});function De(e){return s.useMemo(()=>{const r=document.createElement("canvas");r.width=640,r.height=400;const n=r.getContext("2d");n.fillStyle=e.screenBg,n.fillRect(0,0,640,400),n.fillStyle="rgba(255,255,255,0.08)",n.fillRect(0,0,640,34),["#ff5f57","#febc2e","#28c840"].forEach((i,l)=>{n.fillStyle=i,n.beginPath(),n.arc(22+l*22,17,7,0,7),n.fill()}),n.font='600 22px "JetBrains Mono", monospace',[[["const ","#c792ea"],["pratyush",e.accent],[" = {","#e6e6e6"]],[["  studies: ","#e6e6e6"],['"Electrical Eng."',"#c3e88d"],[",","#e6e6e6"]],[["  builds: ","#e6e6e6"],['["React", "Node"]',"#c3e88d"],[",","#e6e6e6"]],[["  ai: ","#e6e6e6"],['"RAG + citations"',"#c3e88d"],[",","#e6e6e6"]],[["  ships: ","#e6e6e6"],["true","#f78c6c"],[",","#e6e6e6"]],[["}","#e6e6e6"]],[],[["// hover around. click the bulb.","#7f8ea3"]]].forEach((i,l)=>{let u=26;i.forEach(([c,f])=>{n.fillStyle=f,n.fillText(c,u,78+l*38),u+=n.measureText(c).width})});const o=new de(r);return o.colorSpace=ve,o.anisotropy=4,o},[e])}function Ae({p:e}){const r=De(e);return t.jsxs("group",{position:[-.15,.06,-.05],children:[t.jsx(O,{args:[1.5,.06,1],radius:.03,castShadow:!0,children:t.jsx("meshStandardMaterial",{color:"#c7ccd6",metalness:.6,roughness:.35})}),t.jsxs("mesh",{position:[0,.032,.18],rotation:[-Math.PI/2,0,0],children:[t.jsx("planeGeometry",{args:[1.25,.45]}),t.jsx("meshStandardMaterial",{color:"#2a2e38",roughness:.8})]}),t.jsxs("group",{position:[0,.03,-.49],rotation:[-.28,0,0],children:[t.jsx(O,{args:[1.5,.98,.04],radius:.03,position:[0,.49,0],castShadow:!0,children:t.jsx("meshStandardMaterial",{color:"#b9bfca",metalness:.6,roughness:.35})}),t.jsxs("mesh",{position:[0,.5,.022],children:[t.jsx("planeGeometry",{args:[1.38,.86]}),t.jsx("meshBasicMaterial",{map:r,toneMapped:!1})]})]})]})}function Ie({p:e,on:r,onToggle:n,onHover:a}){const o=s.useRef(),i=s.useRef(),l=s.useRef(),u=s.useRef(0);return R(({clock:c},f)=>{const v=r?2.2+Math.sin(c.elapsedTime*3)*.25:.05;i.current.emissiveIntensity=E.lerp(i.current.emissiveIntensity,v,.15),l.current.intensity=E.lerp(l.current.intensity,r?4:0,.15),u.current=Math.max(0,u.current-f*2.5),o.current.scale.setScalar(1+Math.sin(u.current*Math.PI*3)*u.current*.25)}),t.jsxs("group",{ref:o,position:[.95,.06,.15],onClick:c=>{c.stopPropagation(),u.current=1,n()},onPointerOver:c=>{c.stopPropagation(),a(!0)},onPointerOut:()=>a(!1),children:[t.jsxs("mesh",{position:[0,.3,0],visible:!1,children:[t.jsx("sphereGeometry",{args:[.42,12,12]}),t.jsx("meshBasicMaterial",{})]}),t.jsxs("mesh",{position:[0,.06,0],castShadow:!0,children:[t.jsx("cylinderGeometry",{args:[.13,.16,.12,24]}),t.jsx("meshStandardMaterial",{color:"#3a3f4b",metalness:.5,roughness:.4})]}),t.jsxs("mesh",{position:[0,.17,0],children:[t.jsx("cylinderGeometry",{args:[.07,.08,.12,24]}),t.jsx("meshStandardMaterial",{color:"#d8c27a",metalness:.9,roughness:.25})]}),t.jsxs("mesh",{position:[0,.36,0],castShadow:!0,children:[t.jsx("sphereGeometry",{args:[.2,32,32]}),t.jsx("meshStandardMaterial",{ref:i,color:r?e.bulb:"#9aa0aa",emissive:e.bulb,emissiveIntensity:2,transparent:!0,opacity:.92,roughness:.15})]}),t.jsx("pointLight",{ref:l,position:[0,.4,0],color:e.bulb,intensity:4,distance:3,decay:2})]})}function Re({p:e}){const r=s.useRef();R(({clock:a})=>{r.current.emissiveIntensity=(Math.sin(a.elapsedTime*4)+1)*1.5});const n=[[-.2,.1,.4,0],[.1,-.12,.3,Math.PI/2],[.2,.05,.25,0],[-.25,-.1,.2,Math.PI/2]];return t.jsxs("group",{position:[-.95,.06,.62],rotation:[0,.35,0],children:[t.jsxs("mesh",{castShadow:!0,children:[t.jsx("boxGeometry",{args:[.78,.04,.52]}),t.jsx("meshStandardMaterial",{color:"#1e7a4a",roughness:.6})]}),n.map(([a,o,i,l],u)=>t.jsxs("mesh",{position:[a,.022,o],rotation:[0,l,0],children:[t.jsx("boxGeometry",{args:[i,.004,.018]}),t.jsx("meshStandardMaterial",{color:"#e3b341",metalness:.9,roughness:.3})]},u)),t.jsxs("mesh",{position:[.05,.05,0],castShadow:!0,children:[t.jsx("boxGeometry",{args:[.22,.05,.22]}),t.jsx("meshStandardMaterial",{color:"#14161c",roughness:.5})]}),t.jsxs("mesh",{position:[-.24,.04,.14],children:[t.jsx("boxGeometry",{args:[.12,.035,.08]}),t.jsx("meshStandardMaterial",{color:"#14161c"})]}),t.jsxs("mesh",{position:[.28,.05,-.16],children:[t.jsx("sphereGeometry",{args:[.035,16,16]}),t.jsx("meshStandardMaterial",{ref:r,color:e.accent2,emissive:e.accent2,emissiveIntensity:2})]})]})}function Ue({p:e}){return t.jsxs("group",{position:[.75,.06,-.55],children:[t.jsxs("mesh",{position:[0,.14,0],castShadow:!0,children:[t.jsx("cylinderGeometry",{args:[.13,.12,.28,32]}),t.jsx("meshStandardMaterial",{color:e.accent2,roughness:.4})]}),t.jsxs("mesh",{position:[.15,.15,0],rotation:[0,0,Math.PI/2],children:[t.jsx("torusGeometry",{args:[.065,.02,12,24]}),t.jsx("meshStandardMaterial",{color:e.accent2,roughness:.4})]}),t.jsxs("mesh",{position:[0,.27,0],rotation:[-Math.PI/2,0,0],children:[t.jsx("circleGeometry",{args:[.115,32]}),t.jsx("meshStandardMaterial",{color:"#3b2416",roughness:.2})]})]})}function Be({p:e}){const r=s.useRef();return R((n,a)=>{r.current.rotation.y+=a*.8,r.current.rotation.z+=a*.3}),t.jsx(K,{speed:2,rotationIntensity:.4,floatIntensity:1.2,children:t.jsxs("group",{ref:r,position:[-.2,1.75,-.2],scale:.8,children:[[0,Math.PI/3,-Math.PI/3].map(n=>t.jsxs("mesh",{rotation:[Math.PI/2,n,0],children:[t.jsx("torusGeometry",{args:[.38,.014,12,64]}),t.jsx("meshStandardMaterial",{color:e.accent,emissive:e.accent,emissiveIntensity:1.4,toneMapped:!1})]},n)),t.jsxs("mesh",{children:[t.jsx("sphereGeometry",{args:[.07,24,24]}),t.jsx("meshStandardMaterial",{color:e.accent,emissive:e.accent,emissiveIntensity:2,toneMapped:!1})]})]})})}const H={x:0,y:0};typeof window<"u"&&window.addEventListener("mousemove",e=>{H.x=e.clientX/window.innerWidth*2-1,H.y=-(e.clientY/window.innerHeight*2-1)},{passive:!0});function Ee({scene:e,onToggleLights:r,onHoverBulb:n}){const a=q[e],o=s.useRef();return R(()=>{const{x:i,y:l}=H;o.current.rotation.y=E.lerp(o.current.rotation.y,-.45+i*.35,.05),o.current.rotation.x=E.lerp(o.current.rotation.x,.08-l*.12,.05)}),t.jsxs("group",{ref:o,position:[0,-.55,0],children:[t.jsxs(K,{speed:1.4,rotationIntensity:.08,floatIntensity:.35,children:[t.jsx(O,{args:[3,.12,1.8],radius:.05,receiveShadow:!0,castShadow:!0,children:t.jsx("meshStandardMaterial",{color:a.desk,roughness:.7})}),t.jsx(Ae,{p:a}),t.jsx(Ie,{p:a,on:e!=="day",onToggle:r,onHover:n}),t.jsx(Re,{p:a}),t.jsx(Ue,{p:a})]}),t.jsx(Be,{p:a}),t.jsx(je,{position:[0,-.75,0],opacity:.45,scale:6,blur:2.6,far:2})]})}function Te({scene:e,onToggleLights:r}){const n=s.useRef(null),[a,o]=s.useState(!0),[i,l]=s.useState(!1),u=q[e];return s.useEffect(()=>{const c=new IntersectionObserver(([f])=>o(f.isIntersecting));return c.observe(n.current),()=>c.disconnect()},[]),t.jsx("div",{ref:n,className:"relative h-full w-full","data-cursor":i?e==="day"?"Make it night":"Make it day":"Click the lamp",children:t.jsxs(me,{shadows:!0,dpr:[1,1.75],frameloop:a?"always":"never",camera:{position:[2.7,2.2,4.4],fov:36},gl:{antialias:!0,alpha:!0},children:[t.jsx("ambientLight",{intensity:u.amb}),t.jsx("directionalLight",{position:[3,5,2],intensity:u.keyI,color:u.key,castShadow:!0,"shadow-mapSize":[1024,1024]}),t.jsx("directionalLight",{position:[-3,2,-2],intensity:.6,color:u.fill}),t.jsx(Ee,{scene:e,onToggleLights:r,onHoverBulb:l}),t.jsx(Pe,{count:40,scale:[4,3,3],size:2.5,speed:.4,color:u.accent,opacity:e==="day"?.5:.9})]})})}export{Te as default};
