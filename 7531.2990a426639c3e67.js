"use strict";(self.webpackChunkclario_frontend=self.webpackChunkclario_frontend||[]).push([[7531],{7818:(xe,te,_)=>{_.d(te,{D:()=>Je,b:()=>pe});var y=_(88290),B=_(46038),H=_(42596),I=_(69347),D=_(97838),A=_(67555),N=_(5660),X=_(3987),b=_(1245),K=_(95781),ue=_(24404),F=_(66541),C=_(49355),O=_(91719),$=_(27589),Z=_(30662),k=_(73052),V=_(68125),se=_(31573),j=_(97594),ee=_(53169),Q=_(53827),q=_(7524),W=_(27439),oe=_(40900),ce=_(60795),me=_(52490),Me=_(31184),Pe=_(63982),ke=_(85938),at=_(93528),st=_(69446),Le=_(53299),rt=_(90762),lt=_(63243),Te=_(59171),ye=_(55362);function pe(ge){const Re=new rt.kG,{vertex:Ye,fragment:de,varyings:be}=Re;if((0,Pe.Sv)(Ye,ge),Re.include(X.f),be.add("vpos","vec3"),Re.include(oe.k,ge),Re.include(A.fQ,ge),Re.include(C.L,ge),Re.include(W.av,ge),ge.output===H.H_.Color){Re.include(W.NI,ge),Re.include(W.R5,ge),Re.include(W.jF,ge),Re.include(W.DT,ge),(0,Pe.hY)(Ye,ge),Re.include(N.O,ge),Re.include(D.w,ge);const Ce=ge.normalType===N.r.Attribute||ge.normalType===N.r.Compressed;Ce&&ge.offsetBackfaces&&Re.include(B.w),Re.include($.Q,ge),Re.include(F.Bb,ge),ge.instancedColor&&Re.attributes.add(ye.T.INSTANCECOLOR,"vec4"),be.add("vPositionLocal","vec3"),Re.include(K.D,ge),Re.include(y.qj,ge),Re.include(b.R,ge),Re.include(ue.c,ge),Ye.uniforms.add(new at.N("externalColor",Be=>Be.externalColor)),be.add("vcolorExt","vec4"),ge.multipassEnabled&&be.add("depth","float"),Ye.code.add(Le.H`
      void main(void) {
        forwardNormalizedVertexColor();
        vcolorExt = externalColor;
        ${ge.instancedColor?"vcolorExt *= instanceColor * 0.003921568627451;":""}
        vcolorExt *= vvColor();
        vcolorExt *= getSymbolColor();
        forwardColorMixMode();

        if (vcolorExt.a < ${Le.H.float(ce.b)}) {
          gl_Position = vec4(1e38, 1e38, 1e38, 1.0);
        } else {
          vpos = getVertexInLocalOriginSpace();
          vPositionLocal = vpos - view[3].xyz;
          vpos = subtractOrigin(vpos);
          ${Ce?Le.H`vNormalWorld = dpNormal(vvLocalNormal(normalModel()));`:""}
          vpos = addVerticalOffset(vpos, localOrigin);
          ${ge.hasVertexTangents?"vTangent = dpTransformVertexTangent(tangent);":""}
          gl_Position = transformPosition(proj, view, vpos);
          ${Ce&&ge.offsetBackfaces?"gl_Position = offsetBackfacingClipPosition(gl_Position, vpos, vNormalWorld, cameraPosition);":""}
        }

        ${ge.multipassEnabled?"depth = (view * vec4(vpos, 1.0)).z;":""}
        forwardLinearDepth();
        forwardTextureCoordinates();
        forwardColorUV();
        forwardNormalUV();
        forwardEmissiveUV();
        forwardOcclusionUV();
        forwardMetallicRoughnessUV();
      }
    `),Re.include(I.f5,ge),Re.include(k.XP,ge),Re.include(Z.K,ge),Re.include(me.z,ge),Re.include(ge.instancedDoublePrecision?q.hb:q.XE,ge),Re.include(se.l,ge),(0,Pe.hY)(de,ge),de.uniforms.add(Ye.uniforms.get("localOrigin"),new ke.J("ambient",Be=>Be.ambient),new ke.J("diffuse",Be=>Be.diffuse),new st.p("opacity",Be=>Be.opacity),new st.p("layerOpacity",Be=>Be.layerOpacity)),ge.hasColorTexture&&de.uniforms.add(new lt.A("tex",Be=>Be.texture)),Re.include(Q.jV,ge),Re.include(ee.T,ge),de.include(Me.y),Re.include(j.k,ge),(0,k.PN)(de),(0,k.sC)(de),(0,V.F1)(de),ge.transparencyPassType===Te.A.ColorAlpha&&(Re.outputs.add("fragColor","vec4",0),Re.outputs.add("fragAlpha","float",1)),de.code.add(Le.H`
      void main() {
        discardBySlice(vpos);
        ${ge.multipassEnabled?"terrainDepthTest(depth);":""}
        ${ge.hasColorTexture?Le.H`
                vec4 texColor = texture(tex, ${ge.hasColorTextureTransform?Le.H`colorUV`:Le.H`vuv0`});
                ${ge.textureAlphaPremultiplied?"texColor.rgb /= texColor.a;":""}
                discardOrAdjustAlpha(texColor);`:Le.H`vec4 texColor = vec4(1.0);`}
        shadingParams.viewDirection = normalize(vpos - cameraPosition);
        ${ge.normalType===N.r.ScreenDerivative?Le.H`
                vec3 normal = screenDerivativeNormal(vPositionLocal);`:Le.H`
                shadingParams.normalView = vNormalWorld;
                vec3 normal = shadingNormal(shadingParams);`}
        ${ge.pbrMode===Q.f7.Normal?"applyPBRFactors();":""}
        float ssao = evaluateAmbientOcclusionInverse() * getBakedOcclusion();

        vec3 posWorld = vpos + localOrigin;

        float additionalAmbientScale = additionalDirectedAmbientLight(posWorld);
        float shadow = ${ge.receiveShadows?"readShadowMap(vpos, linearDepth)":ge.spherical?"lightingGlobalFactor * (1.0 - additionalAmbientScale)":"0.0"};

        vec3 matColor = max(ambient, diffuse);
        ${ge.hasVertexColors?Le.H`
                vec3 albedo = mixExternalColor(vColor.rgb * matColor, texColor.rgb, vcolorExt.rgb, int(colorMixMode));
                float opacity_ = layerOpacity * mixExternalOpacity(vColor.a * opacity, texColor.a, vcolorExt.a, int(colorMixMode));`:Le.H`
                vec3 albedo = mixExternalColor(matColor, texColor.rgb, vcolorExt.rgb, int(colorMixMode));
                float opacity_ = layerOpacity * mixExternalOpacity(opacity, texColor.a, vcolorExt.a, int(colorMixMode));`}
        ${ge.hasNormalTexture?Le.H`
                mat3 tangentSpace = ${ge.hasVertexTangents?"computeTangentSpace(normal);":"computeTangentSpace(normal, vpos, vuv0);"}
                vec3 shadingNormal = computeTextureNormal(tangentSpace, ${ge.hasNormalTextureTransform?Le.H`normalUV`:"vuv0"});`:Le.H`vec3 shadingNormal = normal;`}
        vec3 normalGround = ${ge.spherical?Le.H`normalize(posWorld);`:Le.H`vec3(0.0, 0.0, 1.0);`}

        ${ge.snowCover?Le.H`
                float snow = smoothstep(0.5, 0.55, dot(normal, normalGround));
                albedo = mix(albedo, vec3(1), snow);
                shadingNormal = mix(shadingNormal, normal, snow);
                ssao = mix(ssao, 1.0, snow);`:""}

        vec3 additionalLight = ssao * mainLightIntensity * additionalAmbientScale * ambientBoostFactor * lightingGlobalFactor;

        ${ge.pbrMode===Q.f7.Normal||ge.pbrMode===Q.f7.Schematic?Le.H`
                float additionalAmbientIrradiance = additionalAmbientIrradianceFactor * mainLightIntensity[2];
                ${ge.snowCover?Le.H`
                        mrr = mix(mrr, vec3(0.0, 1.0, 0.04), snow);
                        emission = mix(emission, vec3(0.0), snow);`:""}

                vec3 shadedColor = evaluateSceneLightingPBR(shadingNormal, albedo, shadow, 1.0 - ssao, additionalLight, shadingParams.viewDirection, normalGround, mrr, emission, additionalAmbientIrradiance);`:Le.H`vec3 shadedColor = evaluateSceneLighting(shadingNormal, albedo, shadow, 1.0 - ssao, additionalLight);`}
        fragColor = highlightSlice(vec4(shadedColor, opacity_), vpos);
        ${ge.transparencyPassType===Te.A.ColorAlpha?Le.H`
                  fragColor = premultiplyAlpha(fragColor);
                  fragAlpha = fragColor.a;`:""}
      }
    `)}return Re.include(O.s,ge),Re}const Je=Object.freeze(Object.defineProperty({__proto__:null,build:pe},Symbol.toStringTag,{value:"Module"}))},75799:(xe,te,_)=>{_.d(te,{R:()=>lt,b:()=>rt});var y=_(88290),B=_(46038),H=_(42596),I=_(69347),D=_(97838),A=_(67555),N=_(5660),X=_(3987),b=_(1245),K=_(95781),ue=_(24404),F=_(49355),C=_(91719),O=_(30662),$=_(73052),Z=_(68125),k=_(31573),V=_(53169),se=_(53827),j=_(7524),ee=_(40900),Q=_(60795),q=_(52490),W=_(31184),oe=_(63982),ce=_(85938),me=_(93528),Me=_(69446),Pe=_(53299),ke=_(90762),at=_(63243),st=_(59171),Le=_(55362);function rt(Te){const ye=new ke.kG,{vertex:pe,fragment:Je,varyings:ge}=ye;return(0,oe.Sv)(pe,Te),ye.include(X.f),ge.add("vpos","vec3"),ye.include(ee.k,Te),ye.include(A.fQ,Te),ye.include(F.L,Te),Te.output===H.H_.Color&&((0,oe.hY)(ye.vertex,Te),ye.include(N.O,Te),ye.include(D.w,Te),Te.offsetBackfaces&&ye.include(B.w),Te.instancedColor&&ye.attributes.add(Le.T.INSTANCECOLOR,"vec4"),ge.add("vNormalWorld","vec3"),ge.add("localvpos","vec3"),Te.multipassEnabled&&ge.add("depth","float"),ye.include(K.D,Te),ye.include(y.qj,Te),ye.include(b.R,Te),ye.include(ue.c,Te),pe.uniforms.add(new me.N("externalColor",Re=>Re.externalColor)),ge.add("vcolorExt","vec4"),pe.code.add(Pe.H`
        void main(void) {
          forwardNormalizedVertexColor();
          vcolorExt = externalColor;
          ${Te.instancedColor?"vcolorExt *= instanceColor * 0.003921568627451;":""}
          vcolorExt *= vvColor();
          vcolorExt *= getSymbolColor();
          forwardColorMixMode();

          if (vcolorExt.a < ${Pe.H.float(Q.b)}) {
            gl_Position = vec4(1e38, 1e38, 1e38, 1.0);
          } else {
            vpos = getVertexInLocalOriginSpace();
            localvpos = vpos - view[3].xyz;
            vpos = subtractOrigin(vpos);
            vNormalWorld = dpNormal(vvLocalNormal(normalModel()));
            vpos = addVerticalOffset(vpos, localOrigin);
            gl_Position = transformPosition(proj, view, vpos);
            ${Te.offsetBackfaces?"gl_Position = offsetBackfacingClipPosition(gl_Position, vpos, vNormalWorld, cameraPosition);":""}
          }
          ${Te.multipassEnabled?Pe.H`depth = (view * vec4(vpos, 1.0)).z;`:""}
          forwardLinearDepth();
          forwardTextureCoordinates();
        }
      `)),Te.output===H.H_.Color&&(ye.include(I.f5,Te),ye.include($.XP,Te),ye.include(O.K,Te),ye.include(q.z,Te),ye.include(Te.instancedDoublePrecision?j.hb:j.XE,Te),ye.include(k.l,Te),(0,oe.hY)(ye.fragment,Te),(0,Z.Pe)(Je),(0,$.PN)(Je),(0,$.sC)(Je),Je.uniforms.add(pe.uniforms.get("localOrigin"),pe.uniforms.get("view"),new ce.J("ambient",Re=>Re.ambient),new ce.J("diffuse",Re=>Re.diffuse),new Me.p("opacity",Re=>Re.opacity),new Me.p("layerOpacity",Re=>Re.layerOpacity)),Te.hasColorTexture&&Je.uniforms.add(new at.A("tex",Re=>Re.texture)),ye.include(se.jV,Te),ye.include(V.T,Te),Je.include(W.y),Te.transparencyPassType===st.A.ColorAlpha&&(ye.outputs.add("fragColor","vec4",0),ye.outputs.add("fragAlpha","float",1)),(0,Z.F1)(Je),Je.code.add(Pe.H`
      void main() {
        discardBySlice(vpos);
        ${Te.multipassEnabled?Pe.H`terrainDepthTest(depth);`:""}
        ${Te.hasColorTexture?Pe.H`
                vec4 texColor = texture(tex, ${Te.hasColorTextureTransform?Pe.H`colorUV`:Pe.H`vuv0`});
                ${Te.textureAlphaPremultiplied?"texColor.rgb /= texColor.a;":""}
                discardOrAdjustAlpha(texColor);`:Pe.H`vec4 texColor = vec4(1.0);`}
        vec3 viewDirection = normalize(vpos - cameraPosition);
        ${Te.pbrMode===se.f7.Normal?"applyPBRFactors();":""}
        float ssao = evaluateAmbientOcclusionInverse();
        ssao *= getBakedOcclusion();

        float additionalAmbientScale = additionalDirectedAmbientLight(vpos + localOrigin);
        vec3 additionalLight = ssao * mainLightIntensity * additionalAmbientScale * ambientBoostFactor * lightingGlobalFactor;
        ${Te.receiveShadows?"float shadow = readShadowMap(vpos, linearDepth);":Te.spherical?"float shadow = lightingGlobalFactor * (1.0 - additionalAmbientScale);":"float shadow = 0.0;"}
        vec3 matColor = max(ambient, diffuse);
        ${Te.hasVertexColors?Pe.H`
                vec3 albedo = mixExternalColor(vColor.rgb * matColor, texColor.rgb, vcolorExt.rgb, int(colorMixMode));
                float opacity_ = layerOpacity * mixExternalOpacity(vColor.a * opacity, texColor.a, vcolorExt.a, int(colorMixMode));`:Pe.H`
                vec3 albedo = mixExternalColor(matColor, texColor.rgb, vcolorExt.rgb, int(colorMixMode));
                float opacity_ = layerOpacity * mixExternalOpacity(opacity, texColor.a, vcolorExt.a, int(colorMixMode));`}
        ${Te.snowCover?Pe.H`albedo = mix(albedo, vec3(1), 0.9);`:Pe.H``}
        ${Pe.H`
            vec3 shadingNormal = normalize(vNormalWorld);
            albedo *= 1.2;
            vec3 viewForward = vec3(view[0][2], view[1][2], view[2][2]);
            float alignmentLightView = clamp(dot(viewForward, -mainLightDirection), 0.0, 1.0);
            float transmittance = 1.0 - clamp(dot(viewForward, shadingNormal), 0.0, 1.0);
            float treeRadialFalloff = vColor.r;
            float backLightFactor = 0.5 * treeRadialFalloff * alignmentLightView * transmittance * (1.0 - shadow);
            additionalLight += backLightFactor * mainLightIntensity;`}
        ${Te.pbrMode===se.f7.Normal||Te.pbrMode===se.f7.Schematic?Te.spherical?Pe.H`vec3 normalGround = normalize(vpos + localOrigin);`:Pe.H`vec3 normalGround = vec3(0.0, 0.0, 1.0);`:Pe.H``}
        ${Te.pbrMode===se.f7.Normal||Te.pbrMode===se.f7.Schematic?Pe.H`
                float additionalAmbientIrradiance = additionalAmbientIrradianceFactor * mainLightIntensity[2];
                ${Te.snowCover?Pe.H`
                        mrr = vec3(0.0, 1.0, 0.04);
                        emission = vec3(0.0);`:""}

                vec3 shadedColor = evaluateSceneLightingPBR(shadingNormal, albedo, shadow, 1.0 - ssao, additionalLight, viewDirection, normalGround, mrr, emission, additionalAmbientIrradiance);`:Pe.H`vec3 shadedColor = evaluateSceneLighting(shadingNormal, albedo, shadow, 1.0 - ssao, additionalLight);`}
        fragColor = highlightSlice(vec4(shadedColor, opacity_), vpos);
        ${Te.transparencyPassType===st.A.ColorAlpha?Pe.H`
                fragColor = premultiplyAlpha(fragColor);
                fragAlpha = fragColor.a;`:""}
      }
    `)),ye.include(C.s,Te),ye}const lt=Object.freeze(Object.defineProperty({__proto__:null,build:rt},Symbol.toStringTag,{value:"Module"}))},55998:(xe,te,_)=>{_.d(te,{S:()=>$,b:()=>F,g:()=>C});var y=_(29726),B=_(89014),H=_(84415),I=_(79251),D=_(31151),A=_(22946),N=_(69446),X=_(53299),b=_(90762),K=_(63243);const ue=16;function F(){const Z=new b.kG,k=Z.fragment;return Z.include(H.k),Z.include(D.GZ),k.include(I.K),k.uniforms.add(new N.p("radius",(V,se)=>C(se.camera))).code.add(X.H`vec3 sphere[16] = vec3[16](
vec3(0.186937, 0.0, 0.0),
vec3(0.700542, 0.0, 0.0),
vec3(-0.864858, -0.481795, -0.111713),
vec3(-0.624773, 0.102853, -0.730153),
vec3(-0.387172, 0.260319, 0.007229),
vec3(-0.222367, -0.642631, -0.707697),
vec3(-0.01336, -0.014956, 0.169662),
vec3(0.122575, 0.1544, -0.456944),
vec3(-0.177141, 0.85997, -0.42346),
vec3(-0.131631, 0.814545, 0.524355),
vec3(-0.779469, 0.007991, 0.624833),
vec3(0.308092, 0.209288,0.35969),
vec3(0.359331, -0.184533, -0.377458),
vec3(0.192633, -0.482999, -0.065284),
vec3(0.233538, 0.293706, -0.055139),
vec3(0.417709, -0.386701, 0.442449)
);
float fallOffFunction(float vv, float vn, float bias) {
float f = max(radius * radius - vv, 0.0);
return f * f * f * max(vn - bias, 0.0);
}`),k.code.add(X.H`float aoValueFromPositionsAndNormal(vec3 C, vec3 n_C, vec3 Q) {
vec3 v = Q - C;
float vv = dot(v, v);
float vn = dot(normalize(v), n_C);
return fallOffFunction(vv, vn, 0.1);
}`),k.uniforms.add(new K.A("normalMap",V=>V.normalTexture),new K.A("depthMap",V=>V.depthTexture),new N.p("projScale",V=>V.projScale),new K.A("rnm",V=>V.noiseTexture),new A.A("rnmScale",(V,se)=>(0,y.t8)(O,se.camera.fullWidth/V.noiseTexture.descriptor.width,se.camera.fullHeight/V.noiseTexture.descriptor.height)),new N.p("intensity",V=>V.intensity),new A.A("screenSize",(V,se)=>(0,y.t8)(O,se.camera.fullWidth,se.camera.fullHeight))),Z.outputs.add("fragOcclusion","float"),k.code.add(X.H`
    void main(void) {
      float depth = depthFromTexture(depthMap, uv);

      // Early out if depth is out of range, such as in the sky
      if (depth >= 1.0 || depth <= 0.0) {
        fragOcclusion = 1.0;
        return;
      }

      // get the normal of current fragment
      vec4 norm4 = texture(normalMap, uv);
      if(norm4.a != 1.0) {
        fragOcclusion = 1.0;
        return;
      }
      vec3 norm = vec3(-1.0) + 2.0 * norm4.xyz;

      float currentPixelDepth = linearizeDepth(depth);
      vec3 currentPixelPos = reconstructPosition(gl_FragCoord.xy, currentPixelDepth);

      float sum = 0.0;
      vec3 tapPixelPos;

      vec3 fres = normalize(2.0 * texture(rnm, uv * rnmScale).xyz - 1.0);

      // note: the factor 2.0 should not be necessary, but makes ssao much nicer.
      // bug or deviation from CE somewhere else?
      float ps = projScale / (2.0 * currentPixelPos.z * zScale.x + zScale.y);

      for(int i = 0; i < ${X.H.int(ue)}; ++i) {
        vec2 unitOffset = reflect(sphere[i], fres).xy;
        vec2 offset = vec2(-unitOffset * radius * ps);

        // don't use current or very nearby samples
        if( abs(offset.x) < 2.0 || abs(offset.y) < 2.0){
          continue;
        }

        vec2 tc = vec2(gl_FragCoord.xy + offset);
        if (tc.x < 0.0 || tc.y < 0.0 || tc.x > screenSize.x || tc.y > screenSize.y) continue;
        vec2 tcTap = tc / screenSize;
        float occluderFragmentDepth = linearDepthFromTexture(depthMap, tcTap);

        tapPixelPos = reconstructPosition(tc, occluderFragmentDepth);

        sum += aoValueFromPositionsAndNormal(currentPixelPos, norm, tapPixelPos);
      }

      // output the result
      float A = max(1.0 - sum * intensity / float(${X.H.int(ue)}), 0.0);

      // Anti-tone map to reduce contrast and drag dark region farther: (x^0.2 + 1.2 * x^4) / 2.2
      A = (pow(A, 0.2) + 1.2 * A*A*A*A) / 2.2;

      fragOcclusion = A;
    }
  `),Z}function C(Z){return Math.max(10,20*Z.computeScreenPixelSizeAtDist(Math.abs(4*Z.relativeElevation)))}const O=(0,B.Ue)(),$=Object.freeze(Object.defineProperty({__proto__:null,build:F,getRadius:C},Symbol.toStringTag,{value:"Module"}))},75475:(xe,te,_)=>{_.d(te,{S:()=>F,b:()=>ue});var y=_(43548),B=_(84415),H=_(79251),I=_(95930),D=_(69446),A=_(53299),N=_(90762),X=_(22166),b=_(63243);const K=4;function ue(){const C=new N.kG,O=C.fragment;C.include(B.k);const $=(K+1)/2,Z=1/(2*$*$);return O.include(H.K),O.uniforms.add(new b.A("depthMap",k=>k.depthTexture),new X.R("tex",k=>k.colorTexture),new I.q("blurSize",k=>k.blurSize),new D.p("projScale",(k,V)=>{const se=(0,y.p)(V.camera.eye,V.camera.center);return se>5e4?Math.max(0,k.projScale-(se-5e4)):k.projScale})),O.code.add(A.H`
    void blurFunction(vec2 uv, float r, float center_d, float sharpness, inout float wTotal, inout float bTotal) {
      float c = texture(tex, uv).r;
      float d = linearDepthFromTexture(depthMap, uv);

      float ddiff = d - center_d;

      float w = exp(-r * r * ${A.H.float(Z)} - ddiff * ddiff * sharpness);
      wTotal += w;
      bTotal += w * c;
    }
  `),C.outputs.add("fragBlur","float"),O.code.add(A.H`
    void main(void) {
      float b = 0.0;
      float w_total = 0.0;

      float center_d = linearDepthFromTexture(depthMap, uv);

      float sharpness = -0.05 * projScale / center_d;
      for (int r = -${A.H.int(K)}; r <= ${A.H.int(K)}; ++r) {
        float rf = float(r);
        vec2 uvOffset = uv + rf * blurSize;
        blurFunction(uvOffset, rf, center_d, sharpness, w_total, b);
      }

      fragBlur = b / w_total;
    }
  `),C}const F=Object.freeze(Object.defineProperty({__proto__:null,build:ue},Symbol.toStringTag,{value:"Module"}))},6671:(xe,te,_)=>{_.d(te,{a:()=>V,b:()=>q,c:()=>$,g:()=>W,j:()=>Le,n:()=>be}),_(14007),_(4703);var H=_(55117),I=_(39061),D=_(43548),A=_(73145),N=_(5710),X=_(23515),b=_(89612),K=_(48621),ue=_(69349),F=_(4267),C=_(65119);const O=$();function $(){return(0,X.Ue)()}const Z=N.e,k=N.e;function V(ie,le){return(0,N.c)(le,ie)}function q(ie){return ie[3]}function W(ie){return ie}function Me(ie,le,_e){if(null==le||!at(ie,le,ke))return!1;let{t0:ve,t1:fe}=ke;if((ve<0||fe<ve&&fe>0)&&(ve=fe),ve<0)return!1;if(_e){const{origin:Fe,direction:ht}=le;_e[0]=Fe[0]+ht[0]*ve,_e[1]=Fe[1]+ht[1]*ve,_e[2]=Fe[2]+ht[2]*ve}return!0}const ke={t0:0,t1:0};function at(ie,le,_e){const{origin:ve,direction:fe}=le,Fe=st;Fe[0]=ve[0]-ie[0],Fe[1]=ve[1]-ie[1],Fe[2]=ve[2]-ie[2];const ht=fe[0]*fe[0]+fe[1]*fe[1]+fe[2]*fe[2];if(0===ht)return!1;const ze=2*(fe[0]*Fe[0]+fe[1]*Fe[1]+fe[2]*Fe[2]),Et=ze*ze-4*ht*(Fe[0]*Fe[0]+Fe[1]*Fe[1]+Fe[2]*Fe[2]-ie[3]*ie[3]);if(Et<0)return!1;const Rt=Math.sqrt(Et);return _e.t0=(-ze-Rt)/(2*ht),_e.t1=(-ze+Rt)/(2*ht),!0}const st=(0,A.Ue)();function Le(ie,le){return Me(ie,le,null)}function lt(ie,le,_e){const ve=C.WM.get(),fe=C.MP.get();(0,D.b)(ve,le.origin,le.direction);const Fe=q(ie);(0,D.b)(_e,ve,le.origin),(0,D.j)(_e,_e,1/(0,D.l)(_e)*Fe);const ht=Je(ie,le.origin),ze=(0,F.EU)(le.origin,_e);return(0,I.Us)(fe,ze+ht,ve),(0,D.h)(_e,_e,fe),_e}function ye(ie,le,_e){const ve=(0,D.f)(C.WM.get(),le,ie),fe=(0,D.j)(C.WM.get(),ve,ie[3]/(0,D.l)(ve));return(0,D.g)(_e,fe,ie)}function Je(ie,le){const _e=(0,D.f)(C.WM.get(),le,ie),ve=(0,D.l)(_e),fe=q(ie),Fe=fe+Math.abs(fe-ve);return(0,H.ZF)(fe/Fe)}const ge=(0,A.Ue)();function Re(ie,le,_e,ve){const fe=(0,D.f)(ge,le,ie);switch(_e){case K.R.X:{const Fe=(0,H.jE)(fe,ge)[2];return(0,D.s)(ve,-Math.sin(Fe),Math.cos(Fe),0)}case K.R.Y:{const Fe=(0,H.jE)(fe,ge),ht=Fe[1],ze=Fe[2],Et=Math.sin(ht);return(0,D.s)(ve,-Et*Math.cos(ze),-Et*Math.sin(ze),Math.cos(ht))}case K.R.Z:return(0,D.n)(ve,fe);default:return}}function Ye(ie,le){const _e=(0,D.f)(Be,le,ie);return(0,D.l)(_e)-ie[3]}function be(ie,le){const _e=(0,D.a)(ie,le),ve=q(ie);return _e<=ve*ve}const Be=(0,A.Ue)(),_t=$();Object.freeze(Object.defineProperty({__proto__:null,NullSphere:O,altitudeAt:Ye,angleToSilhouette:Je,axisAt:Re,clear:function ee(ie){ie[0]=ie[1]=ie[2]=ie[3]=0},closestPoint:function Te(ie,le,_e){return Me(ie,le,_e)?_e:((0,ue.JI)(le,ie,_e),ye(ie,_e,_e))},closestPointOnSilhouette:lt,containsPoint:be,copy:V,create:$,distanceToSilhouette:function pe(ie,le){const _e=(0,D.f)(C.WM.get(),le,ie),ve=(0,D.q)(_e);return Math.sqrt(Math.abs(ve-ie[3]*ie[3]))},elevate:function ce(ie,le,_e){return ie!==_e&&(_e[0]=ie[0],_e[1]=ie[1],_e[2]=ie[2]),_e[3]=ie[3]+le,_e},equals:k,exactEquals:Z,fromCenterAndRadius:function se(ie,le){return(0,X.al)(ie[0],ie[1],ie[2],le)},fromRadius:function Q(ie,le){return ie[0]=ie[1]=ie[2]=0,ie[3]=le,ie},fromValues:function oe(ie,le,_e,ve){return(0,X.al)(ie,le,_e,ve)},getCenter:W,getRadius:q,intersectLine:function Pe(ie,le,_e){const ve=(0,ue.zk)(le,_e);if(!at(ie,ve,ke))return[];const{origin:fe,direction:Fe}=ve,{t0:ht,t1:ze}=ke,Et=Rt=>{const Ht=(0,A.Ue)();return(0,D.r)(Ht,fe,Fe,Rt),ye(ie,Ht,Ht)};return Math.abs(ht-ze)<(0,b.bn)()?[Et(ht)]:[Et(ht),Et(ze)]},intersectRay:Me,intersectRayClosestSilhouette:function rt(ie,le,_e){if(Me(ie,le,_e))return _e;const ve=lt(ie,le,C.WM.get());return(0,D.g)(_e,le.origin,(0,D.j)(C.WM.get(),le.direction,(0,D.p)(le.origin,ve)/(0,D.l)(le.direction))),_e},intersectsRay:Le,projectPoint:ye,setAltitudeAt:function de(ie,le,_e,ve){const fe=Ye(ie,le),Fe=Re(ie,le,K.R.Z,Be),ht=(0,D.j)(Be,Fe,_e-fe);return(0,D.g)(ve,le,ht)},setExtent:function me(ie,le,_e){return ie!==_e&&V(ie,_e),_e},tmpSphere:_t,union:function Ce(ie,le,_e=(0,X.Ue)()){const ve=(0,D.p)(ie,le),fe=ie[3],Fe=le[3];return ve+Fe<fe?((0,N.c)(_e,ie),_e):ve+fe<Fe?((0,N.c)(_e,le),_e):((0,D.o)(_e,ie,le,(ve+Fe-fe)/(2*ve)),_e[3]=(ve+fe+Fe)/2,_e)},wrap:function j(ie){return ie}},Symbol.toStringTag,{value:"Module"}))},43589:(xe,te,_)=>{function H(O,$,Z){I(O.typedBuffer,$.typedBuffer,Z,O.typedBufferStride,$.typedBufferStride)}function I(O,$,Z,k=3,V=k){if(O.length/k!==Math.ceil($.length/V))return O;const se=O.length/k,j=Z[0],ee=Z[1],Q=Z[2],q=Z[4],W=Z[5],oe=Z[6],ce=Z[8],me=Z[9],Me=Z[10],Pe=Z[12],ke=Z[13],at=Z[14];let st=0,Le=0;for(let rt=0;rt<se;rt++){const lt=$[st],Te=$[st+1],ye=$[st+2];O[Le]=j*lt+q*Te+ce*ye+Pe,O[Le+1]=ee*lt+W*Te+me*ye+ke,O[Le+2]=Q*lt+oe*Te+Me*ye+at,st+=V,Le+=k}return O}function D(O,$,Z){A(O.typedBuffer,$.typedBuffer,Z,O.typedBufferStride,$.typedBufferStride)}function A(O,$,Z,k=3,V=k){if(O.length/k!==Math.ceil($.length/V))return;const se=O.length/k,j=Z[0],ee=Z[1],Q=Z[2],q=Z[3],W=Z[4],oe=Z[5],ce=Z[6],me=Z[7],Me=Z[8];let Pe=0,ke=0;for(let at=0;at<se;at++){const st=$[Pe],Le=$[Pe+1],rt=$[Pe+2];O[ke]=j*st+q*Le+ce*rt,O[ke+1]=ee*st+W*Le+me*rt,O[ke+2]=Q*st+oe*Le+Me*rt,Pe+=V,ke+=k}}function N(O,$,Z){X(O.typedBuffer,$.typedBuffer,Z,O.typedBufferStride,$.typedBufferStride)}function X(O,$,Z,k=3,V=k){const se=Math.min(O.length/k,$.length/V);let j=0,ee=0;for(let Q=0;Q<se;Q++)O[ee]=Z*$[j],O[ee+1]=Z*$[j+1],O[ee+2]=Z*$[j+2],j+=V,ee+=k;return O}function b(O,$,Z,k=3,V=k){const se=O.length/k;if(se!==Math.ceil($.length/V))return O;let j=0,ee=0;for(let Q=0;Q<se;Q++)O[ee]=$[j]+Z[0],O[ee+1]=$[j+1]+Z[1],O[ee+2]=$[j+2]+Z[2],j+=V,ee+=k;return O}function K(O,$){ue(O.typedBuffer,$.typedBuffer,O.typedBufferStride,$.typedBufferStride)}function ue(O,$,Z=3,k=Z){const V=Math.min(O.length/Z,$.length/k);let se=0,j=0;for(let ee=0;ee<V;ee++){const Q=$[se],q=$[se+1],W=$[se+2],oe=Q*Q+q*q+W*W;if(oe>0){const ce=1/Math.sqrt(oe);O[j]=ce*Q,O[j+1]=ce*q,O[j+2]=ce*W}se+=k,j+=Z}}_.d(te,{a:()=>I,b:()=>b,c:()=>D,d:()=>H,e:()=>K,f:()=>N,n:()=>ue,s:()=>X,t:()=>A}),_(14007),_(4703),Object.freeze(Object.defineProperty({__proto__:null,normalize:ue,normalizeView:K,scale:X,scaleView:N,shiftRight:function F(O,$,Z){const k=Math.min(O.count,$.count),V=O.typedBuffer,se=O.typedBufferStride,j=$.typedBuffer,ee=$.typedBufferStride;let Q=0,q=0;for(let W=0;W<k;W++)V[q]=j[Q]>>Z,V[q+1]=j[Q+1]>>Z,V[q+2]=j[Q+2]>>Z,Q+=ee,q+=se},transformMat3:A,transformMat3View:D,transformMat4:I,transformMat4View:H,translate:b},Symbol.toStringTag,{value:"Module"}))},2599:(xe,te,_)=>{_.d(te,{a:()=>A,b:()=>b,n:()=>X,s:()=>K,t:()=>N}),_(14007);var B=_(4703);function A(F,C,O){N(F.typedBuffer,C.typedBuffer,O,F.typedBufferStride,C.typedBufferStride)}function N(F,C,O,$=4,Z=$){if(F.length/$!=C.length/Z)return;const k=F.length/$,V=O[0],se=O[1],j=O[2],ee=O[3],Q=O[4],q=O[5],W=O[6],oe=O[7],ce=O[8];let me=0,Me=0;for(let Pe=0;Pe<k;Pe++){const ke=C[me],at=C[me+1],st=C[me+2],Le=C[me+3];F[Me]=V*ke+ee*at+W*st,F[Me+1]=se*ke+Q*at+oe*st,F[Me+2]=j*ke+q*at+ce*st,F[Me+3]=Le,me+=Z,Me+=$}}function X(F,C){const O=Math.min(F.count,C.count),$=F.typedBuffer,Z=F.typedBufferStride,k=C.typedBuffer,V=C.typedBufferStride;for(let se=0;se<O;se++){const j=se*Z,ee=se*V,Q=k[ee],q=k[ee+1],W=k[ee+2],oe=Q*Q+q*q+W*W;if(oe>0){const ce=1/Math.sqrt(oe);$[j]=ce*Q,$[j+1]=ce*q,$[j+2]=ce*W}}}function b(F,C,O){K(F.typedBuffer,C,O,F.typedBufferStride)}function K(F,C,O,$=4){const Z=Math.min(F.length/$,C.count),k=C.typedBuffer,V=C.typedBufferStride;let se=0,j=0;for(let ee=0;ee<Z;ee++)F[j]=O*k[se],F[j+1]=O*k[se+1],F[j+2]=O*k[se+2],F[j+3]=O*k[se+3],se+=V,j+=$}Object.freeze(Object.defineProperty({__proto__:null,normalize:X,scale:K,scaleView:b,transformMat3:N,transformMat3View:A,transformMat4:function D(F,C,O,$=4,Z=$){if(F.length/$!=C.length/Z)return void B.Z.getLogger("esri.views.3d.support.buffer.math").error("source and destination buffers need to have the same number of elements");const k=F.length/$,V=O[0],se=O[1],j=O[2],ee=O[3],Q=O[4],q=O[5],W=O[6],oe=O[7],ce=O[8],me=O[9],Me=O[10],Pe=O[11],ke=O[12],at=O[13],st=O[14],Le=O[15];let rt=0,lt=0;for(let Te=0;Te<k;Te++){const ye=C[rt],pe=C[rt+1],Je=C[rt+2],ge=C[rt+3];F[lt]=V*ye+Q*pe+ce*Je+ke*ge,F[lt+1]=se*ye+q*pe+me*Je+at*ge,F[lt+2]=j*ye+W*pe+Me*Je+st*ge,F[lt+3]=ee*ye+oe*pe+Pe*Je+Le*ge,rt+=Z,lt+=$}},transformMat4View:function I(F,C,O){if(F.count!==C.count)return;const $=F.count,Z=O[0],k=O[1],V=O[2],se=O[3],j=O[4],ee=O[5],Q=O[6],q=O[7],W=O[8],oe=O[9],ce=O[10],me=O[11],Me=O[12],Pe=O[13],ke=O[14],at=O[15],st=F.typedBuffer,Le=F.typedBufferStride,rt=C.typedBuffer,lt=C.typedBufferStride;for(let Te=0;Te<$;Te++){const ye=Te*Le,pe=Te*lt,Je=rt[pe],ge=rt[pe+1],Re=rt[pe+2],Ye=rt[pe+3];st[ye]=Z*Je+j*ge+W*Re+Me*Ye,st[ye+1]=k*Je+ee*ge+oe*Re+Pe*Ye,st[ye+2]=V*Je+Q*ge+ce*Re+ke*Ye,st[ye+3]=se*Je+q*ge+me*Re+at*Ye}}},Symbol.toStringTag,{value:"Module"}))},3852:(xe,te,_)=>{_.d(te,{r:()=>y});class y{constructor(){this._outer=new Map}clear(){this._outer.clear()}get empty(){return 0===this._outer.size}get(H,I){return this._outer.get(H)?.get(I)}set(H,I,D){const A=this._outer.get(H);A?A.set(I,D):this._outer.set(H,new Map([[I,D]]))}delete(H,I){const D=this._outer.get(H);D&&(D.delete(I),0===D.size&&this._outer.delete(H))}forEach(H){this._outer.forEach((I,D)=>H(I,D))}}},16573:(xe,te,_)=>{_.d(te,{x:()=>B});var y=_(38119);class B{constructor(D){this._allocator=D,this._items=[],this._itemsPtr=0,this._grow()}get(){return 0===this._itemsPtr&&(0,y.Y)(()=>this._reset()),this._itemsPtr===this._items.length&&this._grow(),this._items[this._itemsPtr++]}_reset(){const D=Math.min(3*Math.max(8,this._itemsPtr),this._itemsPtr+3*H);this._items.length=Math.min(D,this._items.length),this._itemsPtr=0}_grow(){for(let D=0;D<Math.max(8,Math.min(this._items.length,H));D++)this._items.push(this._allocator())}}const H=1024},93960:(xe,te,_)=>{_.d(te,{G:()=>B});var y=_(57964);let B=class Kr{constructor(I,D,A=""){this.major=I,this.minor=D,this._context=A}lessThan(I,D){return this.major<I||I===this.major&&this.minor<D}since(I,D){return!this.lessThan(I,D)}validate(I){if(this.major!==I.major)throw new y.Z((this._context&&this._context+":")+"unsupported-version",`Required major ${this._context&&this._context+" "}version is '${this.major}', but got '\${version.major}.\${version.minor}'`,{version:I})}clone(){return new Kr(this.major,this.minor,this._context)}static parse(I,D=""){const[A,N]=I.split("."),X=/^\s*\d+\s*$/;if(!A?.match||!X.test(A))throw new y.Z((D&&D+":")+"invalid-version","Expected major version to be a number, but got '${version}'",{version:I});if(!N?.match||!X.test(N))throw new y.Z((D&&D+":")+"invalid-version","Expected minor version to be a number, but got '${version}'",{version:I});const b=parseInt(A,10),K=parseInt(N,10);return new Kr(b,K,D)}}},70751:(xe,te,_)=>{function y(X){return X=X||globalThis.location.hostname,N.some(b=>null!=X?.match(b))}function B(X,b){return X&&(b=b||globalThis.location.hostname)?null!=b.match(H)||null!=b.match(D)?X.replace("static.arcgis.com","staticdev.arcgis.com"):null!=b.match(I)||null!=b.match(A)?X.replace("static.arcgis.com","staticqa.arcgis.com"):X:X}_.d(te,{XO:()=>y,pJ:()=>B});const H=/^devext\.arcgis\.com$/,I=/^qaext\.arcgis\.com$/,D=/^[\w-]*\.mapsdevext\.arcgis\.com$/,A=/^[\w-]*\.mapsqa\.arcgis\.com$/,N=[/^([\w-]*\.)?[\w-]*\.zrh-dev-local\.esri\.com$/,H,I,/^jsapps\.esri\.com$/,D,A]},20396:(xe,te,_)=>{_.d(te,{xx:()=>B});var y=_(40271);function B(A,N=!1){return A<=y.c8?N?new Array(A).fill(0):new Array(A):new Float32Array(A)}},58248:(xe,te,_)=>{_.d(te,{$z:()=>I,KF:()=>b,mi:()=>B});var y=_(40271);function B(F){if((0,y.kJ)(F)){if(F.length<y.c8)return F}else if(F.length<y.c8)return Array.from(F);let C=!0,O=!0;return F.some(($,Z)=>(C=C&&0===$,O=O&&$===Z,!C&&!O)),C?function ue(F){if(1===F)return N;if(F<y.c8)return new Array(F).fill(0);if(F>K.length){const C=Math.max(2*K.length,F);K=new Uint8Array(C)}return new Uint8Array(K.buffer,0,F)}(F.length):O?b(F.length):(0,y.kJ)(F)||F.BYTES_PER_ELEMENT!==Uint16Array.BYTES_PER_ELEMENT?function H(F){let C=!0;for(const O of F){if(O>=65536)return(0,y.kJ)(F)?new Uint32Array(F):F;O>=256&&(C=!1)}return C?new Uint8Array(F):new Uint16Array(F)}(F):F}function I(F){return F<=y.c8?new Array(F):F<=65536?new Uint16Array(F):new Uint32Array(F)}let A=(()=>{const F=new Uint32Array(131072);for(let C=0;C<F.length;++C)F[C]=C;return F})();const N=[0],X=(()=>{const F=new Uint16Array(65536);for(let C=0;C<F.length;++C)F[C]=C;return F})();function b(F){if(1===F)return N;if(F<y.c8)return Array.from(new Uint16Array(X.buffer,0,F));if(F<X.length)return new Uint16Array(X.buffer,0,F);if(F>A.length){const C=Math.max(2*A.length,F);A=new Uint32Array(C);for(let O=0;O<A.length;O++)A[O]=O}return new Uint32Array(A.buffer,0,F)}let K=new Uint8Array(65536)},69349:(xe,te,_)=>{_.d(te,{JI:()=>O,Ue:()=>A,re:()=>b,zk:()=>ue}),_(57678);var B=_(16573),H=_(43548),I=_(73145);function A(V){return V?N((0,I.d9)(V.origin),(0,I.d9)(V.direction)):N((0,I.Ue)(),(0,I.Ue)())}function N(V,se){return{origin:V,direction:se}}function b(V,se){const j=Z.get();return j.origin=V,j.direction=se,j}function ue(V,se,j=A()){return(0,H.c)(j.origin,V),(0,H.f)(j.direction,se,V),j}function O(V,se,j){const ee=(0,H.m)(V.direction,(0,H.f)(j,se,V.origin));return(0,H.g)(j,V.origin,(0,H.j)(j,V.direction,ee)),j}_(65119);const Z=new B.x(()=>A());(0,I.Ue)()},47531:(xe,te,_)=>{_.r(te),_.d(te,{fetch:()=>Rs,gltfToEngineResources:()=>Mn,parseUrl:()=>Tn});var y=_(15861),B=_(70751),H=_(55117),I=_(92899),D=_(38519),A=_(39061),N=_(41666),X=_(89014),b=_(43548),K=_(73145),ue=_(27048),F=_(20396),C=_(11716),O=_(43589),$=_(2599),Z=_(46033),k=_(52875),V=_(17765),se=_(73848),j=_(71807),ee=_(22646),Q=_(65749),q=_(93266);function W(M){if(null==M)return null;const T=null!=M.offset?M.offset:q.AG,x=null!=M.rotation?M.rotation:0,P=null!=M.scale?M.scale:q.hq,w=(0,D.al)(1,0,0,0,1,0,T[0],T[1],1),L=(0,D.al)(Math.cos(x),-Math.sin(x),0,Math.sin(x),Math.cos(x),0,0,0,1),U=(0,D.al)(P[0],0,0,0,P[1],0,0,0,1),z=(0,D.Ue)();return(0,I.Jp)(z,L,U),(0,I.Jp)(z,w,z),z}class oe{constructor(){this.geometries=new Array,this.materials=new Array,this.textures=new Array}}class ce{constructor(T,x,P){this.name=T,this.lodThreshold=x,this.pivotOffset=P,this.stageResources=new oe,this.numberOfVertices=0}}var me=_(66476),Me=_(37636),Pe=_(91307),ke=_(57964),at=_(4703),st=_(3852),Le=_(79412),rt=_(93960),lt=_(58248),Te=_(83068),ye=_(65391),pe=_(15182),Je=_(40271);function ge(M){if(M.length<Je.c8)return Array.from(M);if((0,Je.kJ)(M))return Float64Array.from(M);if(!("BYTES_PER_ELEMENT"in M))return Array.from(M);switch(M.BYTES_PER_ELEMENT){case 1:return Uint8Array.from(M);case 2:return(0,Je.Uc)(M)?Uint16Array.from(M):Int16Array.from(M);case 4:return Float32Array.from(M);default:return Float64Array.from(M)}}var Re=_(43029),Ye=_(98694);class de{constructor(T,x,P){this.primitiveIndices=T,this._numIndexPerPrimitive=x,this.position=P,this._children=void 0,(0,Ye.hu)(T.length>=1),(0,Ye.hu)(3===P.size||4===P.size);const{data:w,size:L,indices:U}=P;(0,Ye.hu)(U.length%this._numIndexPerPrimitive==0),(0,Ye.hu)(U.length>=T.length*this._numIndexPerPrimitive);const z=T.length;let R=L*U[this._numIndexPerPrimitive*T[0]];be.clear(),be.push(R);const Y=(0,K.al)(w[R],w[R+1],w[R+2]),G=(0,K.d9)(Y);for(let Oe=0;Oe<z;++Oe){const De=this._numIndexPerPrimitive*T[Oe];for(let Ne=0;Ne<this._numIndexPerPrimitive;++Ne){R=L*U[De+Ne],be.push(R);let Se=w[R];Y[0]=Math.min(Se,Y[0]),G[0]=Math.max(Se,G[0]),Se=w[R+1],Y[1]=Math.min(Se,Y[1]),G[1]=Math.max(Se,G[1]),Se=w[R+2],Y[2]=Math.min(Se,Y[2]),G[2]=Math.max(Se,G[2])}}this.bbMin=Y,this.bbMax=G;const ae=(0,b.o)((0,K.Ue)(),this.bbMin,this.bbMax,.5);this.radius=.5*Math.max(Math.max(G[0]-Y[0],G[1]-Y[1]),G[2]-Y[2]);let Ae=this.radius*this.radius;for(let Oe=0;Oe<be.length;++Oe){R=be.at(Oe);const De=w[R]-ae[0],Ne=w[R+1]-ae[1],Se=w[R+2]-ae[2],nt=De*De+Ne*Ne+Se*Se;if(nt<=Ae)continue;const Ke=Math.sqrt(nt),et=.5*(Ke-this.radius);this.radius=this.radius+et,Ae=this.radius*this.radius;const ot=et/Ke;ae[0]+=De*ot,ae[1]+=Ne*ot,ae[2]+=Se*ot}this.center=ae,be.clear()}getChildren(){if(this._children||(0,b.a)(this.bbMin,this.bbMax)<=1)return this._children;const T=(0,b.o)((0,K.Ue)(),this.bbMin,this.bbMax,.5),x=this.primitiveIndices.length,P=new Uint8Array(x),w=new Array(8);for(let G=0;G<8;++G)w[G]=0;const{data:L,size:U,indices:z}=this.position;for(let G=0;G<x;++G){let ae=0;const Ae=this._numIndexPerPrimitive*this.primitiveIndices[G];let Oe=U*z[Ae],De=L[Oe],Ne=L[Oe+1],Se=L[Oe+2];for(let nt=1;nt<this._numIndexPerPrimitive;++nt){Oe=U*z[Ae+nt];const Ke=L[Oe],et=L[Oe+1],ot=L[Oe+2];Ke<De&&(De=Ke),et<Ne&&(Ne=et),ot<Se&&(Se=ot)}De<T[0]&&(ae|=1),Ne<T[1]&&(ae|=2),Se<T[2]&&(ae|=4),P[G]=ae,++w[ae]}let R=0;for(let G=0;G<8;++G)w[G]>0&&++R;if(R<2)return;const Y=new Array(8);for(let G=0;G<8;++G)Y[G]=w[G]>0?new Uint32Array(w[G]):void 0;for(let G=0;G<8;++G)w[G]=0;for(let G=0;G<x;++G){const ae=P[G];Y[ae][w[ae]++]=this.primitiveIndices[G]}this._children=new Array;for(let G=0;G<8;++G)void 0!==Y[G]&&this._children.push(new de(Y[G],this._numIndexPerPrimitive,this.position));return this._children}static prune(){be.prune()}}const be=new Re.Z({deallocator:null});var Ce=_(36981),Be=_(80914),_t=_(16573),qe=_(28955);function Et(M,T,x){return(0,b.f)(xt,T,M),(0,b.f)(Gt,x,M),.5*(0,b.l)((0,b.b)(xt,xt,Gt))}_(65119),new _t.x(qe.Ue),new _t.x(()=>function le(M){return M?{p0:(0,K.d9)(M.p0),p1:(0,K.d9)(M.p1),p2:(0,K.d9)(M.p2)}:{p0:(0,K.Ue)(),p1:(0,K.Ue)(),p2:(0,K.Ue)()}}());const xt=(0,K.Ue)(),Gt=(0,K.Ue)(),ft=(0,K.Ue)(),Lt=(0,K.Ue)(),J=(0,K.Ue)(),re=(0,K.Ue)();var he=_(68160);class Ee{constructor(T){this.channel=T,this.id=(0,he.D)()}}var ne=_(55362);_(8648),(0,K.Ue)(),new Float32Array(6);class hr extends Ce.c{constructor(T,x,P=null,w=Be.U.Mesh,L=null,U=-1){super(),this.material=T,this.mapPositions=P,this.type=w,this.objectAndLayerIdColor=L,this.edgeIndicesLength=U,this.visible=!0,this._attributes=new Map,this._boundingInfo=null;for(const[z,R]of x)this._attributes.set(z,{...R,indices:(0,lt.mi)(R.indices)}),z===ne.T.POSITION&&(this.edgeIndicesLength=this.edgeIndicesLength<0?this._attributes.get(z).indices.length:this.edgeIndicesLength)}instantiate(T={}){const x=new hr(T.material||this.material,[],this.mapPositions,this.type,this.objectAndLayerIdColor,this.edgeIndicesLength);return this._attributes.forEach((P,w)=>{P.exclusive=!1,x._attributes.set(w,P)}),x._boundingInfo=this._boundingInfo,x.transformation=T.transformation||this.transformation,x}get attributes(){return this._attributes}getMutableAttribute(T){let x=this._attributes.get(T);return x&&!x.exclusive&&(x={...x,exclusive:!0,data:ge(x.data)},this._attributes.set(T,x)),x}setAttributeData(T,x){const P=this._attributes.get(T);P&&this._attributes.set(T,{...P,exclusive:!0,data:x})}get indexCount(){return this._attributes.values().next().value.indices?.length??0}get faceCount(){return this.indexCount/3}get boundingInfo(){return null==this._boundingInfo&&(this._boundingInfo=this._calculateBoundingInfo()),this._boundingInfo}computeAttachmentOrigin(T){return!!(this.type===Be.U.Mesh?this._computeAttachmentOriginTriangles(T):this.type===Be.U.Line?this._computeAttachmentOriginLines(T):this._computeAttachmentOriginPoints(T))&&(null!=this._transformation&&(0,b.h)(T,T,this._transformation),!0)}_computeAttachmentOriginTriangles(T){return function Ct(M,T){if(!M)return!1;const{size:x,data:P,indices:w}=M;(0,b.s)(T,0,0,0),(0,b.s)(re,0,0,0);let L=0,U=0;for(let z=0;z<w.length-2;z+=3){const R=w[z]*x,Y=w[z+1]*x,G=w[z+2]*x;(0,b.s)(ft,P[R],P[R+1],P[R+2]),(0,b.s)(Lt,P[Y],P[Y+1],P[Y+2]),(0,b.s)(J,P[G],P[G+1],P[G+2]);const ae=Et(ft,Lt,J);ae?((0,b.g)(ft,ft,Lt),(0,b.g)(ft,ft,J),(0,b.j)(ft,ft,1/3*ae),(0,b.g)(T,T,ft),L+=ae):((0,b.g)(re,re,ft),(0,b.g)(re,re,Lt),(0,b.g)(re,re,J),U+=3)}return!(0===U&&0===L||(0!==L?((0,b.j)(T,T,1/L),0):0===U||((0,b.j)(T,re,1/U),0)))}(this.attributes.get(ne.T.POSITION),T)}_computeAttachmentOriginLines(T){const x=this.attributes.get(ne.T.POSITION);return function er(M,T,x){if(!M)return!1;(0,b.s)(x,0,0,0),(0,b.s)(re,0,0,0);let P=0,w=0;const{size:L,data:U,indices:z}=M,R=z.length-1,Y=R+(T?2:0);for(let G=0;G<Y;G+=2){const Ae=z[G<R?G:R]*L,Oe=z[G<R?G+1:0]*L;ft[0]=U[Ae],ft[1]=U[Ae+1],ft[2]=U[Ae+2],Lt[0]=U[Oe],Lt[1]=U[Oe+1],Lt[2]=U[Oe+2],(0,b.j)(ft,(0,b.g)(ft,ft,Lt),.5);const De=(0,b.F)(ft,Lt);De>0?((0,b.g)(x,x,(0,b.j)(ft,ft,De)),P+=De):0===P&&((0,b.g)(re,re,ft),w++)}return 0!==P?((0,b.j)(x,x,1/P),!0):0!==w&&((0,b.j)(x,re,1/w),!0)}(x,function Cn(M,T){return!(!("isClosed"in M)||!M.isClosed)&&T.indices.length>2}(this.material.parameters,x),T)}_computeAttachmentOriginPoints(T){return function Kt(M,T){if(!M)return!1;const{size:x,data:P,indices:w}=M;(0,b.s)(T,0,0,0);let L=-1,U=0;for(let z=0;z<w.length;z++){const R=w[z]*x;L!==R&&(T[0]+=P[R],T[1]+=P[R+1],T[2]+=P[R+2],U++),L=R}return U>1&&(0,b.j)(T,T,1/U),U>0}(this.attributes.get(ne.T.POSITION),T)}invalidateBoundingInfo(){this._boundingInfo=null}_calculateBoundingInfo(){const T=this.attributes.get(ne.T.POSITION);if(!T||0===T.indices.length)return null;const x=this.type===Be.U.Mesh?3:1;(0,Ye.hu)(T.indices.length%x==0,"Indexing error: "+T.indices.length+" not divisible by "+x);const P=(0,lt.KF)(T.indices.length/x);return new de(P,x,T)}get transformation(){return this._transformation??N.Wd}set transformation(T){this._transformation=T&&T!==N.Wd?(0,N.d9)(T):null}addHighlight(){const T=new Ee(pe.V_.Highlight);return this.highlights=function pt(M,T){return null==M&&(M=[]),M.push(T),M}(this.highlights,T),T}removeHighlight(T){this.highlights=function tr(M,T){if(null==M)return null;const x=M.filter(P=>P!==T);return 0===x.length?null:x}(this.highlights,T)}}var Sn=_(14007),Rn=_(88278),$r=_(51172),yr=_(6785),Ln=_(33258),In=_(98930);let Jr;var Jt,M;(M=Jt||(Jt={}))[M.ETC1_RGB=0]="ETC1_RGB",M[M.ETC2_RGBA=1]="ETC2_RGBA",M[M.BC1_RGB=2]="BC1_RGB",M[M.BC3_RGBA=3]="BC3_RGBA",M[M.BC4_R=4]="BC4_R",M[M.BC5_RG=5]="BC5_RG",M[M.BC7_M6_RGB=6]="BC7_M6_RGB",M[M.BC7_M5_RGBA=7]="BC7_M5_RGBA",M[M.PVRTC1_4_RGB=8]="PVRTC1_4_RGB",M[M.PVRTC1_4_RGBA=9]="PVRTC1_4_RGBA",M[M.ASTC_4x4_RGBA=10]="ASTC_4x4_RGBA",M[M.ATC_RGB=11]="ATC_RGB",M[M.ATC_RGBA=12]="ATC_RGBA",M[M.FXT1_RGB=17]="FXT1_RGB",M[M.PVRTC2_4_RGB=18]="PVRTC2_4_RGB",M[M.PVRTC2_4_RGBA=19]="PVRTC2_4_RGBA",M[M.ETC2_EAC_R11=20]="ETC2_EAC_R11",M[M.ETC2_EAC_RG11=21]="ETC2_EAC_RG11",M[M.RGBA32=13]="RGBA32",M[M.RGB565=14]="RGB565",M[M.BGR565=15]="BGR565",M[M.RGBA4444=16]="RGBA4444";var je=_(39237),or=_(17091),Bn=_(54731);let It=null,_r=null;function Yr(){return Dr.apply(this,arguments)}function Dr(){return Dr=(0,y.Z)(function*(){return null==_r&&(_r=function Un(){return Jr??=(0,y.Z)(function*(){const M=yield _.e(6853).then(_.bind(_,86853)),T=yield M.default({locateFile:x=>(0,In.V)(`esri/libs/basisu/${x}`)});return T.initializeBasis(),T})(),Jr}(),It=yield _r),_r}),Dr.apply(this,arguments)}function Xr(M,T,x,P,w){const L=(0,Bn.RG)(T?je.q_.COMPRESSED_RGBA8_ETC2_EAC:je.q_.COMPRESSED_RGB8_ETC2);return Math.ceil(x*P*L*(w&&M>1?(4**M-1)/(3*4**(M-1)):1))}function Zr(M){return M.getNumImages()>=1&&!M.isUASTC()}function Qr(M){return M.getFaces()>=1&&M.isETC1S()}function br(){return br=(0,y.Z)(function*(M,T,x){null==It&&(It=yield Yr());const P=new It.BasisFile(new Uint8Array(x));if(!Zr(P))return null;P.startTranscoding();const w=kr(M,T,P.getNumLevels(0),P.getHasAlpha(),P.getImageWidth(0,0),P.getImageHeight(0,0),(L,U)=>P.getImageTranscodedSizeInBytes(0,L,U),(L,U,z)=>P.transcodeImage(z,0,L,U,0,0));return P.close(),P.delete(),w}),br.apply(this,arguments)}function Cr(){return Cr=(0,y.Z)(function*(M,T,x){null==It&&(It=yield Yr());const P=new It.KTX2File(new Uint8Array(x));if(!Qr(P))return null;P.startTranscoding();const w=kr(M,T,P.getLevels(),P.getHasAlpha(),P.getWidth(),P.getHeight(),(L,U)=>P.getImageTranscodedSizeInBytes(L,0,0,U),(L,U,z)=>P.transcodeImage(z,L,0,0,U,0,-1,-1));return P.close(),P.delete(),w}),Cr.apply(this,arguments)}function kr(M,T,x,P,w,L,U,z){const{compressedTextureETC:R,compressedTextureS3TC:Y}=M.capabilities,[G,ae]=R?P?[Jt.ETC2_RGBA,je.q_.COMPRESSED_RGBA8_ETC2_EAC]:[Jt.ETC1_RGB,je.q_.COMPRESSED_RGB8_ETC2]:Y?P?[Jt.BC3_RGBA,je.q_.COMPRESSED_RGBA_S3TC_DXT5_EXT]:[Jt.BC1_RGB,je.q_.COMPRESSED_RGB_S3TC_DXT1_EXT]:[Jt.RGBA32,je.VI.RGBA],Ae=T.hasMipmap?x:Math.min(1,x),Oe=[];for(let De=0;De<Ae;De++)Oe.push(new Uint8Array(U(De,G))),z(De,G,Oe[De]);return T.internalFormat=ae,T.hasMipmap=Oe.length>1,T.samplingMode=T.hasMipmap?je.cw.LINEAR_MIPMAP_LINEAR:je.cw.LINEAR,T.width=w,T.height=L,new or.x(M,T,{type:"compressed",levels:Oe})}const fr=()=>at.Z.getLogger("esri.views.3d.webgl-engine.lib.DDSUtil");function Sr(M){return M.charCodeAt(0)+(M.charCodeAt(1)<<8)+(M.charCodeAt(2)<<16)+(M.charCodeAt(3)<<24)}const Gn=Sr("DXT1"),Kn=Sr("DXT3"),$n=Sr("DXT5");function Rr(M,T,x){if(M instanceof ImageData)return Rr(qr(M),T,x);const P=document.createElement("canvas");return P.width=T,P.height=x,P.getContext("2d").drawImage(M,0,0,P.width,P.height),P}function qr(M){const T=document.createElement("canvas");T.width=M.width,T.height=M.height;const x=T.getContext("2d");if(null==x)throw new ke.Z("Failed to create 2d context from HTMLCanvasElement");return x.putImageData(M,0,0),T}var ar,oi=_(22784);class en extends Ce.c{get parameters(){return this._parameters}constructor(T,x){super(),this._data=T,this.type=Be.U.Texture,this._glTexture=null,this._loadingPromise=null,this._loadingController=null,this.events=new Rn.Z,this._parameters={...li,...x},this._startPreload(T)}dispose(){this.unload(),this._data=this.frameUpdate=void 0}_startPreload(T){null!=T&&(T instanceof HTMLVideoElement?(this.frameUpdate=x=>this._frameUpdate(T,x),this._startPreloadVideoElement(T)):T instanceof HTMLImageElement&&this._startPreloadImageElement(T))}_startPreloadVideoElement(T){if(!((0,yr.jc)(T.src)||"auto"===T.preload&&T.crossOrigin)){T.preload="auto",T.crossOrigin="anonymous";const x=!T.paused;if(T.src=T.src,x&&T.autoplay){const P=()=>{T.removeEventListener("canplay",P),T.play()};T.addEventListener("canplay",P)}}}_startPreloadImageElement(T){(0,yr.HK)(T.src)||(0,yr.jc)(T.src)||T.crossOrigin||(T.crossOrigin="anonymous",T.src=T.src)}_createDescriptor(T){const x=new oi.X;return x.wrapMode=this._parameters.wrap??je.e8.REPEAT,x.flipped=!this._parameters.noUnpackFlip,x.samplingMode=this._parameters.mipmap?je.cw.LINEAR_MIPMAP_LINEAR:je.cw.LINEAR,x.hasMipmap=!!this._parameters.mipmap,x.preMultiplyAlpha=!!this._parameters.preMultiplyAlpha,x.maxAnisotropy=this._parameters.maxAnisotropy??(this._parameters.mipmap?T.parameters.maxMaxAnisotropy:1),x}get glTexture(){return this._glTexture}get memoryEstimate(){return this._glTexture?.usedMemory||function ai(M,T){if(null==M)return 0;if((0,Je.eP)(M)||(0,Je.lq)(M))return T.encoding===pe.Ti.KTX2_ENCODING?function Fn(M,T){if(null==It)return M.byteLength;const x=new It.KTX2File(new Uint8Array(M)),P=Qr(x)?Xr(x.getLevels(),x.getHasAlpha(),x.getWidth(),x.getHeight(),T):0;return x.close(),x.delete(),P}(M,!!T.mipmap):T.encoding===pe.Ti.BASIS_ENCODING?function wn(M,T){if(null==It)return M.byteLength;const x=new It.BasisFile(new Uint8Array(M)),P=Zr(x)?Xr(x.getNumLevels(0),x.getHasAlpha(),x.getImageWidth(0,0),x.getImageHeight(0,0),T):0;return x.close(),x.delete(),P}(M,!!T.mipmap):M.byteLength;const{width:x,height:P}=M instanceof Image||M instanceof ImageData||M instanceof HTMLCanvasElement||M instanceof HTMLVideoElement?tn(M):T;return(T.mipmap?4/3:1)*x*P*(T.components||4)||0}(this._data,this._parameters)}load(T){if(this._glTexture)return this._glTexture;if(this._loadingPromise)return this._loadingPromise;const x=this._data;return null==x?(this._glTexture=new or.x(T,this._createDescriptor(T),null),this._glTexture):(this._parameters.reloadable||(this._data=void 0),"string"==typeof x?this._loadFromURL(T,x):x instanceof Image?this._loadFromImageElement(T,x):x instanceof HTMLVideoElement?this._loadFromVideoElement(T,x):x instanceof ImageData||x instanceof HTMLCanvasElement?this._loadFromImage(T,x):((0,Je.eP)(x)||(0,Je.lq)(x))&&this._parameters.encoding===pe.Ti.DDS_ENCODING?this._loadFromDDSData(T,x):((0,Je.eP)(x)||(0,Je.lq)(x))&&this._parameters.encoding===pe.Ti.KTX2_ENCODING?this._loadFromKTX2(T,x):((0,Je.eP)(x)||(0,Je.lq)(x))&&this._parameters.encoding===pe.Ti.BASIS_ENCODING?this._loadFromBasis(T,x):(0,Je.lq)(x)?this._loadFromPixelData(T,x):(0,Je.eP)(x)?this._loadFromPixelData(T,new Uint8Array(x)):null)}_frameUpdate(T,x){return null==this._glTexture||T.readyState<ar.HAVE_CURRENT_DATA||x===T.currentTime?x:(this._glTexture.setData(T),this._glTexture.descriptor.hasMipmap&&this._glTexture.generateMipmap(),this._parameters.updateCallback&&this._parameters.updateCallback(),T.currentTime)}_loadFromDDSData(T,x){return this._glTexture=function ri(M,T,x){const P=function ni(M,T){const x=new Int32Array(M,0,31);if(542327876!==x[0])return fr().error("Invalid magic number in DDS header"),null;if(!(4&x[20]))return fr().error("Unsupported format, must contain a FourCC code"),null;const P=x[21];let w,L;switch(P){case Gn:w=8,L=je.q_.COMPRESSED_RGB_S3TC_DXT1_EXT;break;case Kn:w=16,L=je.q_.COMPRESSED_RGBA_S3TC_DXT3_EXT;break;case $n:w=16,L=je.q_.COMPRESSED_RGBA_S3TC_DXT5_EXT;break;default:return fr().error("Unsupported FourCC code:",function Vn(M){return String.fromCharCode(255&M,M>>8&255,M>>16&255,M>>24&255)}(P)),null}let U=1,z=x[4],R=x[3];(3&z||3&R)&&(fr().warn("Rounding up compressed texture size to nearest multiple of 4."),z=z+3&-4,R=R+3&-4);const Y=z,G=R;let ae,Ae;131072&x[2]&&!1!==T&&(U=Math.max(1,x[7]));let Oe=x[1]+4;const De=[];for(let Ne=0;Ne<U;++Ne)Ae=(z+3>>2)*(R+3>>2)*w,ae=new Uint8Array(M,Oe,Ae),De.push(ae),Oe+=Ae,z=Math.max(1,z>>1),R=Math.max(1,R>>1);return{textureData:{type:"compressed",levels:De},internalFormat:L,width:Y,height:G}}(x,T.hasMipmap??!1);if(null==P)throw new Error("DDS texture data is null");const{textureData:w,internalFormat:L,width:U,height:z}=P;return T.samplingMode=w.levels.length>1?je.cw.LINEAR_MIPMAP_LINEAR:je.cw.LINEAR,T.hasMipmap=w.levels.length>1,T.internalFormat=L,T.width=U,T.height=z,new or.x(M,T,w)}(T,this._createDescriptor(T),x),this._glTexture}_loadFromKTX2(T,x){return this._loadAsync(()=>function jn(M,T,x){return Cr.apply(this,arguments)}(T,this._createDescriptor(T),x).then(P=>(this._glTexture=P,P)))}_loadFromBasis(T,x){return this._loadAsync(()=>function Nn(M,T,x){return br.apply(this,arguments)}(T,this._createDescriptor(T),x).then(P=>(this._glTexture=P,P)))}_loadFromPixelData(T,x){(0,Ye.hu)(this._parameters.width>0&&this._parameters.height>0);const P=this._createDescriptor(T);return P.pixelFormat=1===this._parameters.components?je.VI.LUMINANCE:3===this._parameters.components?je.VI.RGB:je.VI.RGBA,P.width=this._parameters.width??0,P.height=this._parameters.height??0,this._glTexture=new or.x(T,P,x),this._glTexture}_loadFromURL(T,x){var P=this;return this._loadAsync(function(){var w=(0,y.Z)(function*(L){const U=yield(0,Te.t)(x,{signal:L});return(0,Le.k_)(L),P._loadFromImage(T,U)});return function(L){return w.apply(this,arguments)}}())}_loadFromImageElement(T,x){var P=this;return x.complete?this._loadFromImage(T,x):this._loadAsync(function(){var w=(0,y.Z)(function*(L){const U=yield(0,Ln.fY)(x,x.src,!1,L);return(0,Le.k_)(L),P._loadFromImage(T,U)});return function(L){return w.apply(this,arguments)}}())}_loadFromVideoElement(T,x){return x.readyState>=ar.HAVE_CURRENT_DATA?this._loadFromImage(T,x):this._loadFromVideoElementAsync(T,x)}_loadFromVideoElementAsync(T,x){return this._loadAsync(P=>new Promise((w,L)=>{const U=()=>{x.removeEventListener("loadeddata",z),x.removeEventListener("error",R),(0,$r.hw)(Y)},z=()=>{x.readyState>=ar.HAVE_CURRENT_DATA&&(U(),w(this._loadFromImage(T,x)))},R=G=>{U(),L(G||new ke.Z("Failed to load video"))};x.addEventListener("loadeddata",z),x.addEventListener("error",R);const Y=(0,Le.fu)(P,()=>R((0,Le.zE)()))}))}_loadFromImage(T,x){let P=x;if(!(P instanceof HTMLVideoElement)){const{maxTextureSize:U}=T.parameters;P=this._parameters.downsampleUncompressed?function ii(M,T){let L=M.width*M.height;if(L<4096)return M instanceof ImageData?qr(M):M;let U=M.width,z=M.height;do{U=Math.ceil(U/2),z=Math.ceil(z/2),L=U*z}while(L>1048576||null!=T&&(U>T||z>T));return Rr(M,U,z)}(P,U):function si(M,T){const x=Math.max(M.width,M.height);if(x<=T)return M;const P=T/x;return Rr(M,Math.round(M.width*P),Math.round(M.height*P))}(P,U)}const w=tn(P);this._parameters.width=w.width,this._parameters.height=w.height;const L=this._createDescriptor(T);return L.pixelFormat=3===this._parameters.components?je.VI.RGB:je.VI.RGBA,L.width=w.width,L.height=w.height,this._glTexture=new or.x(T,L,P),this._glTexture}_loadAsync(T){const x=new AbortController;this._loadingController=x;const P=T(x.signal);this._loadingPromise=P;const w=()=>{this._loadingController===x&&(this._loadingController=null),this._loadingPromise===P&&(this._loadingPromise=null)};return P.then(w,w),P}unload(){if(this._glTexture=(0,$r.M2)(this._glTexture),null!=this._loadingController){const T=this._loadingController;this._loadingController=null,this._loadingPromise=null,T.abort()}this.events.emit("unloaded")}}function tn(M){return M instanceof HTMLVideoElement?{width:M.videoWidth,height:M.videoHeight}:M}!function(M){M[M.HAVE_NOTHING=0]="HAVE_NOTHING",M[M.HAVE_METADATA=1]="HAVE_METADATA",M[M.HAVE_CURRENT_DATA=2]="HAVE_CURRENT_DATA",M[M.HAVE_FUTURE_DATA=3]="HAVE_FUTURE_DATA",M[M.HAVE_ENOUGH_DATA=4]="HAVE_ENOUGH_DATA"}(ar||(ar={}));const li={wrap:{s:je.e8.REPEAT,t:je.e8.REPEAT},mipmap:!0,noUnpackFlip:!1,preMultiplyAlpha:!1,downsampleUncompressed:!1};var vr=_(92867),ci=_(82859),Ot=_(42596),Yt=_(5660),Xt=_(97594),lr=_(53827),di=_(48261),rn=_(64457),zt=_(59171),rr=_(89877);const ui=(0,rr.wK)(je.zi.SRC_ALPHA,je.zi.ONE,je.zi.ONE_MINUS_SRC_ALPHA,je.zi.ONE_MINUS_SRC_ALPHA),hi=(0,rr.wK)(je.zi.ONE,je.zi.ZERO,je.zi.ONE,je.zi.ONE_MINUS_SRC_ALPHA);function _i(M){return M===zt.A.FrontFace?null:hi}const mi={factor:-1,units:-2};function vi(M){return M?mi:null}function gi(M,T=je.wb.LESS){return M===zt.A.NONE||M===zt.A.FrontFace?T:je.wb.LEQUAL}function pi(M){return M===zt.A.ColorAlpha?{buffers:[je.VY.COLOR_ATTACHMENT0,je.VY.COLOR_ATTACHMENT1]}:null}class Ei{constructor(T=!1,x=!0){this.isVerticalRay=T,this.normalRequired=x}}const gr=(0,ue.Ue)();function Ti(M,T,x,P,w,L){if(!M.visible)return;const U=(0,b.z)(on,P,x),z=(Y,G,ae)=>{L(Y,ae,G,!1)},R=new Ei(!1,T.options.normalRequired);if(M.boundingInfo)(0,Ye.hu)(M.type===Be.U.Mesh),nn(M.boundingInfo,x,U,T.tolerance,w,R,z);else{const Y=M.attributes.get(ne.T.POSITION),G=Y.indices;!function sn(M,T,x,P,w,L,U,z,R,Y){const G=T,ae=Ri,Ae=Math.abs(G[0]),Oe=Math.abs(G[1]),De=Math.abs(G[2]),Ne=Ae>=Oe?Ae>=De?0:2:Oe>=De?1:2,Se=Ne,nt=G[Se]<0?2:1,Ke=(Ne+nt)%3,et=(Ne+(3-nt))%3,ot=G[Ke]/G[Se],dt=G[et]/G[Se],tt=1/G[Se],Ie=Oi,We=Pi,Qe=Ai,{normalRequired:He}=R;for(let Ue=x;Ue<P;++Ue){const Ze=3*Ue,we=U*w[Ze];(0,b.s)(ae[0],L[we+0],L[we+1],L[we+2]);const it=U*w[Ze+1];(0,b.s)(ae[1],L[it+0],L[it+1],L[it+2]);const ct=U*w[Ze+2];(0,b.s)(ae[2],L[ct+0],L[ct+1],L[ct+2]),z&&((0,b.c)(ae[0],z.applyToVertex(ae[0][0],ae[0][1],ae[0][2],Ue)),(0,b.c)(ae[1],z.applyToVertex(ae[1][0],ae[1][1],ae[1][2],Ue)),(0,b.c)(ae[2],z.applyToVertex(ae[2][0],ae[2][1],ae[2][2],Ue))),(0,b.z)(Ie,ae[0],M),(0,b.z)(We,ae[1],M),(0,b.z)(Qe,ae[2],M);const ut=Ie[Ke]-ot*Ie[Se],mt=Ie[et]-dt*Ie[Se],Tt=We[Ke]-ot*We[Se],yt=We[et]-dt*We[Se],Dt=Qe[Ke]-ot*Qe[Se],bt=Qe[et]-dt*Qe[Se],vt=Dt*yt-bt*Tt,Pt=ut*bt-mt*Dt,At=Tt*mt-yt*ut;if((vt<0||Pt<0||At<0)&&(vt>0||Pt>0||At>0))continue;const St=vt+Pt+At;if(0===St)continue;const gt=vt*(tt*Ie[Se])+Pt*(tt*We[Se])+At*(tt*Qe[Se]);if(gt*Math.sign(St)<0)continue;const Ut=gt/St;Ut>=0&&Y(Ut,Ue,He?yi(ae):null)}}(x,U,0,G.length/3,G,Y.data,Y.stride,w,R,z)}}const Mi=(0,K.Ue)();function nn(M,T,x,P,w,L,U){if(null==M)return;const z=function Di(M,T){return(0,b.s)(T,1/M[0],1/M[1],1/M[2])}(x,Mi);if((0,ue.op)(gr,M.bbMin),(0,ue.Tn)(gr,M.bbMax),w?.applyToAabb(gr),function bi(M,T,x,P){return function Ci(M,T,x,P,w){const L=(M[0]-P-T[0])*x[0],U=(M[3]+P-T[0])*x[0];let z=Math.min(L,U),R=Math.max(L,U);const Y=(M[1]-P-T[1])*x[1],G=(M[4]+P-T[1])*x[1];if(R=Math.min(R,Math.max(Y,G)),R<0||(z=Math.max(z,Math.min(Y,G)),z>R))return!1;const ae=(M[2]-P-T[2])*x[2],Ae=(M[5]+P-T[2])*x[2];return R=Math.min(R,Math.max(ae,Ae)),!(R<0)&&(z=Math.max(z,Math.min(ae,Ae)),!(z>R)&&z<w)}(M,T,x,P,1/0)}(gr,T,z,P)){const{primitiveIndices:R,position:Y}=M,G=R?R.length:Y.indices.length/3;if(G>Si){const ae=M.getChildren();if(void 0!==ae){for(const Ae of ae)nn(Ae,T,x,P,w,L,U);return}}!function xi(M,T,x,P,w,L,U,z,R,Y,G){const ae=M[0],Ae=M[1],Oe=M[2],De=T[0],Ne=T[1],Se=T[2],{normalRequired:nt}=Y;for(let Ke=x;Ke<P;++Ke){const et=z[Ke],ot=3*et,dt=U*w[ot];let tt=L[dt],Ie=L[dt+1],We=L[dt+2];const Qe=U*w[ot+1];let He=L[Qe],Ue=L[Qe+1],Ze=L[Qe+2];const we=U*w[ot+2];let it=L[we],ct=L[we+1],ut=L[we+2];null!=R&&([tt,Ie,We]=R.applyToVertex(tt,Ie,We,Ke),[He,Ue,Ze]=R.applyToVertex(He,Ue,Ze,Ke),[it,ct,ut]=R.applyToVertex(it,ct,ut,Ke));const mt=He-tt,Tt=Ue-Ie,yt=Ze-We,Dt=it-tt,bt=ct-Ie,vt=ut-We,Pt=Ne*vt-bt*Se,At=Se*Dt-vt*De,St=De*bt-Dt*Ne,gt=mt*Pt+Tt*At+yt*St;if(Math.abs(gt)<=Ir)continue;const Ut=ae-tt,wt=Ae-Ie,Ft=Oe-We,Mt=Ut*Pt+wt*At+Ft*St;if(gt>0){if(Mt<0||Mt>gt)continue}else if(Mt>0||Mt<gt)continue;const Nt=wt*yt-Tt*Ft,Qt=Ft*mt-yt*Ut,kt=Ut*Tt-mt*wt,Wt=De*Nt+Ne*Qt+Se*kt;if(gt>0){if(Wt<0||Mt+Wt>gt)continue}else if(Wt>0||Mt+Wt<gt)continue;const qt=(Dt*Nt+bt*Qt+vt*kt)/gt;qt>=0&&G(qt,et,nt?Lr(mt,Tt,yt,Dt,bt,vt,Zt):null)}}(T,x,0,G,Y.indices,Y.data,Y.stride,R,w,L,U)}}const Zt=(0,K.Ue)();const Oi=(0,K.Ue)(),Pi=(0,K.Ue)(),Ai=(0,K.Ue)();function Lr(M,T,x,P,w,L,U){return(0,b.s)(pr,M,T,x),(0,b.s)(Er,P,w,L),(0,b.b)(U,pr,Er),(0,b.n)(U,U),U}function yi(M){return(0,b.z)(pr,M[1],M[0]),(0,b.z)(Er,M[2],M[0]),(0,b.b)(Zt,pr,Er),(0,b.n)(Zt,Zt),Zt}const pr=(0,K.Ue)(),Er=(0,K.Ue)(),Si=1e3,Ir=1e-7,on=(0,K.Ue)(),Ri=[(0,K.Ue)(),(0,K.Ue)(),(0,K.Ue)()];var cr;!function(M){M[M.INTEGRATED_MESH=0]="INTEGRATED_MESH",M[M.OPAQUE_TERRAIN=1]="OPAQUE_TERRAIN",M[M.OPAQUE_MATERIAL=2]="OPAQUE_MATERIAL",M[M.OPAQUE_NO_SSAO_DEPTH=3]="OPAQUE_NO_SSAO_DEPTH",M[M.TRANSPARENT_MATERIAL=4]="TRANSPARENT_MATERIAL",M[M.TRANSPARENT_NO_SSAO_DEPTH=5]="TRANSPARENT_NO_SSAO_DEPTH",M[M.TRANSPARENT_TERRAIN=6]="TRANSPARENT_TERRAIN",M[M.TRANSPARENT_DEPTH_WRITE_DISABLED_MATERIAL=7]="TRANSPARENT_DEPTH_WRITE_DISABLED_MATERIAL",M[M.OCCLUDED_TERRAIN=8]="OCCLUDED_TERRAIN",M[M.OCCLUDER_MATERIAL=9]="OCCLUDER_MATERIAL",M[M.TRANSPARENT_OCCLUDER_MATERIAL=10]="TRANSPARENT_OCCLUDER_MATERIAL",M[M.OCCLUSION_PIXELS=11]="OCCLUSION_PIXELS",M[M.OPAQUE_ENVIRONMENT=12]="OPAQUE_ENVIRONMENT",M[M.TRANSPARENT_ENVIRONMENT=13]="TRANSPARENT_ENVIRONMENT",M[M.LASERLINES=14]="LASERLINES",M[M.LASERLINES_CONTRAST_CONTROL=15]="LASERLINES_CONTRAST_CONTROL",M[M.HUD_MATERIAL=16]="HUD_MATERIAL",M[M.LABEL_MATERIAL=17]="LABEL_MATERIAL",M[M.LINE_CALLOUTS=18]="LINE_CALLOUTS",M[M.LINE_CALLOUTS_HUD_DEPTH=19]="LINE_CALLOUTS_HUD_DEPTH",M[M.DRAPED_MATERIAL=20]="DRAPED_MATERIAL",M[M.DRAPED_WATER=21]="DRAPED_WATER",M[M.VIEWSHED=22]="VIEWSHED",M[M.VOXEL=23]="VOXEL",M[M.MAX_SLOTS=24]="MAX_SLOTS"}(cr||(cr={}));var Bt=_(6671),an=_(38475);const ln=new class Ui{constructor(T=0){this.offset=T,this.sphere=(0,Bt.c)(),this.tmpVertex=(0,K.Ue)()}applyToVertex(T,x,P){const w=this.objectTransform.transform,L=(0,b.s)(Ur,T,x,P),U=(0,b.h)(L,L,w),z=this.offset/(0,b.l)(U);return(0,b.r)(U,U,U,z),(0,b.h)(this.tmpVertex,U,this.objectTransform.inverse),this.tmpVertex}applyToMinMax(T,x){const P=this.offset/(0,b.l)(T);(0,b.r)(T,T,T,P);const w=this.offset/(0,b.l)(x);(0,b.r)(x,x,x,w)}applyToAabb(T){const x=this.offset/Math.sqrt(T[0]*T[0]+T[1]*T[1]+T[2]*T[2]);T[0]+=T[0]*x,T[1]+=T[1]*x,T[2]+=T[2]*x;const P=this.offset/Math.sqrt(T[3]*T[3]+T[4]*T[4]+T[5]*T[5]);return T[3]+=T[3]*P,T[4]+=T[4]*P,T[5]+=T[5]*P,T}applyToBoundingSphere(T){const x=(0,b.l)((0,Bt.g)(T)),P=this.offset/x;return(0,b.r)((0,Bt.g)(this.sphere),(0,Bt.g)(T),(0,Bt.g)(T),P),this.sphere[3]=T[3]+T[3]*this.offset/x,this.sphere}};new class Ii{constructor(T=0){this.componentLocalOriginLength=0,this._totalOffset=0,this._offset=0,this._tmpVertex=(0,K.Ue)(),this._tmpMbs=(0,Bt.c)(),this._tmpObb=new an.Oo,this._resetOffset(T)}_resetOffset(T){this._offset=T,this._totalOffset=T}set offset(T){this._resetOffset(T)}get offset(){return this._offset}set componentOffset(T){this._totalOffset=this._offset+T}set localOrigin(T){this.componentLocalOriginLength=(0,b.l)(T)}applyToVertex(T,x,P){const w=(0,b.s)(Ur,T,x,P),L=(0,b.s)(un,T,x,P+this.componentLocalOriginLength),U=this._totalOffset/(0,b.l)(L);return(0,b.r)(this._tmpVertex,w,L,U),this._tmpVertex}applyToAabb(T){const x=this.componentLocalOriginLength,P=T[0],w=T[1],L=T[2]+x,U=T[3],z=T[4],R=T[5]+x,Y=Math.abs(P),G=Math.abs(w),ae=Math.abs(L),Ae=Math.abs(U),Oe=Math.abs(z),De=Math.abs(R),Ne=.5*(1+Math.sign(P*U))*Math.min(Y,Ae),Se=.5*(1+Math.sign(w*z))*Math.min(G,Oe),nt=.5*(1+Math.sign(L*R))*Math.min(ae,De),Ke=Math.max(Y,Ae),et=Math.max(G,Oe),ot=Math.max(ae,De),dt=Math.sqrt(Ne*Ne+Se*Se+nt*nt),tt=Math.sign(Y+P),Ie=Math.sign(G+w),We=Math.sign(ae+L),Qe=Math.sign(Ae+U),He=Math.sign(Oe+z),Ue=Math.sign(De+R),Ze=this._totalOffset;if(dt<Ze)return T[0]-=(1-tt)*Ze,T[1]-=(1-Ie)*Ze,T[2]-=(1-We)*Ze,T[3]+=Qe*Ze,T[4]+=He*Ze,T[5]+=Ue*Ze,T;const we=Ze/Math.sqrt(Ke*Ke+et*et+ot*ot),it=Ze/dt,ct=it-we,ut=-ct;return T[0]+=P*(tt*ut+it),T[1]+=w*(Ie*ut+it),T[2]+=L*(We*ut+it),T[3]+=U*(Qe*ct+we),T[4]+=z*(He*ct+we),T[5]+=R*(Ue*ct+we),T}applyToMbs(T){const x=(0,b.l)((0,Bt.g)(T)),P=this._totalOffset/x;return(0,b.r)((0,Bt.g)(this._tmpMbs),(0,Bt.g)(T),(0,Bt.g)(T),P),this._tmpMbs[3]=T[3]+T[3]*this._totalOffset/x,this._tmpMbs}applyToObb(T){return(0,an.gI)(T,this._totalOffset,this._totalOffset,vr.JY.Global,this._tmpObb),this._tmpObb}},new class Li{constructor(T=0){this.offset=T,this.tmpVertex=(0,K.Ue)()}applyToVertex(T,x,P){const w=(0,b.s)(Ur,T,x,P),L=(0,b.g)(un,w,this.localOrigin),U=this.offset/(0,b.l)(L);return(0,b.r)(this.tmpVertex,w,L,U),this.tmpVertex}applyToAabb(T){const x=wi,P=Fi,w=Ni;for(let R=0;R<3;++R)x[R]=T[0+R]+this.localOrigin[R],P[R]=T[3+R]+this.localOrigin[R],w[R]=x[R];const L=this.applyToVertex(x[0],x[1],x[2]);for(let R=0;R<3;++R)T[R]=L[R],T[R+3]=L[R];const U=R=>{const Y=this.applyToVertex(R[0],R[1],R[2]);for(let G=0;G<3;++G)T[G]=Math.min(T[G],Y[G]),T[G+3]=Math.max(T[G+3],Y[G])};for(let R=1;R<8;++R){for(let Y=0;Y<3;++Y)w[Y]=R&1<<Y?P[Y]:x[Y];U(w)}let z=0;for(let R=0;R<3;++R)x[R]*P[R]<0&&(z|=1<<R);if(0!==z&&7!==z)for(let R=0;R<8;++R)if(!(z&R)){for(let Y=0;Y<3;++Y)w[Y]=z&1<<Y?0:R&1<<Y?x[Y]:P[Y];U(w)}for(let R=0;R<3;++R)T[R]-=this.localOrigin[R],T[R+3]-=this.localOrigin[R];return T}};const Ur=(0,K.Ue)(),un=(0,K.Ue)(),wi=(0,K.Ue)(),Fi=(0,K.Ue)(),Ni=(0,K.Ue)();function hn(M,T,x){const{data:P,indices:w}=M,L=T.typedBuffer,U=T.typedBufferStride,z=w.length;x*=U;for(let R=0;R<z;++R){const Y=2*w[R];L[x]=P[Y],L[x+1]=P[Y+1],x+=U}}function _n(M,T,x,P){const{data:w,indices:L}=M,U=T.typedBuffer,z=T.typedBufferStride,R=L.length;if(x*=z,null==P||1===P)for(let Y=0;Y<R;++Y){const G=3*L[Y];U[x]=w[G],U[x+1]=w[G+1],U[x+2]=w[G+2],x+=z}else for(let Y=0;Y<R;++Y){const G=3*L[Y];for(let ae=0;ae<P;++ae)U[x]=w[G],U[x+1]=w[G+1],U[x+2]=w[G+2],x+=z}}function fn(M,T,x,P=1){const{data:w,indices:L}=M,U=T.typedBuffer,z=T.typedBufferStride,R=L.length;if(x*=z,1===P)for(let Y=0;Y<R;++Y){const G=4*L[Y];U[x]=w[G],U[x+1]=w[G+1],U[x+2]=w[G+2],U[x+3]=w[G+3],x+=z}else for(let Y=0;Y<R;++Y){const G=4*L[Y];for(let ae=0;ae<P;++ae)U[x]=w[G],U[x+1]=w[G+1],U[x+2]=w[G+2],U[x+3]=w[G+3],x+=z}}function Gi(M,T,x,P,w=1){const L=T.typedBuffer,U=T.typedBufferStride;if(P*=U,1===w)for(let z=0;z<x;++z)L[P]=M[0],L[P+1]=M[1],L[P+2]=M[2],L[P+3]=M[3],P+=U;else for(let z=0;z<x;++z)for(let R=0;R<w;++R)L[P]=M[0],L[P+1]=M[1],L[P+2]=M[2],L[P+3]=M[3],P+=U}function $i(M,T,x,P,w,L){switch(M){case ne.T.POSITION:{(0,Ye.hu)(3===T.size);const U=w.getField(M,C.ct);(0,Ye.hu)(!!U,`No buffer view for ${M}`),U&&function ji(M,T,x,P,w=1){if(!T)return void _n(M,x,P,w);const{data:L,indices:U}=M,z=x.typedBuffer,R=x.typedBufferStride,Y=U.length,G=T[0],ae=T[1],Ae=T[2],Oe=T[4],De=T[5],Ne=T[6],Se=T[8],nt=T[9],Ke=T[10],et=T[12],ot=T[13],dt=T[14];P*=R;let tt=0,Ie=0,We=0;const Qe=(0,A.lv)(T)?He=>{tt=L[He]+et,Ie=L[He+1]+ot,We=L[He+2]+dt}:He=>{const Ue=L[He],Ze=L[He+1],we=L[He+2];tt=G*Ue+Oe*Ze+Se*we+et,Ie=ae*Ue+De*Ze+nt*we+ot,We=Ae*Ue+Ne*Ze+Ke*we+dt};if(1===w)for(let He=0;He<Y;++He)Qe(3*U[He]),z[P]=tt,z[P+1]=Ie,z[P+2]=We,P+=R;else for(let He=0;He<Y;++He){Qe(3*U[He]);for(let Ue=0;Ue<w;++Ue)z[P]=tt,z[P+1]=Ie,z[P+2]=We,P+=R}}(T,x,U,L);break}case ne.T.NORMAL:{(0,Ye.hu)(3===T.size);const U=w.getField(M,C.ct);(0,Ye.hu)(!!U,`No buffer view for ${M}`),U&&function Wi(M,T,x,P,w=1){if(!T)return void _n(M,x,P,w);const{data:L,indices:U}=M,z=T,R=x.typedBuffer,Y=x.typedBufferStride,G=U.length,ae=z[0],Ae=z[1],Oe=z[2],De=z[4],Ne=z[5],Se=z[6],nt=z[8],Ke=z[9],et=z[10],ot=!(0,A.pV)(z);P*=Y;let Ie=0,We=0,Qe=0;const He=(0,A.lv)(z)?Ue=>{Ie=L[Ue],We=L[Ue+1],Qe=L[Ue+2]}:Ue=>{const Ze=L[Ue],we=L[Ue+1],it=L[Ue+2];Ie=ae*Ze+De*we+nt*it,We=Ae*Ze+Ne*we+Ke*it,Qe=Oe*Ze+Se*we+et*it};if(1===w)if(ot)for(let Ue=0;Ue<G;++Ue){He(3*U[Ue]);const Ze=Ie*Ie+We*We+Qe*Qe;if(Ze<.999999&&Ze>1e-6){const we=1/Math.sqrt(Ze);R[P]=Ie*we,R[P+1]=We*we,R[P+2]=Qe*we}else R[P]=Ie,R[P+1]=We,R[P+2]=Qe;P+=Y}else for(let Ue=0;Ue<G;++Ue)He(3*U[Ue]),R[P]=Ie,R[P+1]=We,R[P+2]=Qe,P+=Y;else for(let Ue=0;Ue<G;++Ue){if(He(3*U[Ue]),ot){const Ze=Ie*Ie+We*We+Qe*Qe;if(Ze<.999999&&Ze>1e-6){const we=1/Math.sqrt(Ze);Ie*=we,We*=we,Qe*=we}}for(let Ze=0;Ze<w;++Ze)R[P]=Ie,R[P+1]=We,R[P+2]=Qe,P+=Y}}(T,P,U,L);break}case ne.T.NORMALCOMPRESSED:{(0,Ye.hu)(2===T.size);const U=w.getField(M,C.or);(0,Ye.hu)(!!U,`No buffer view for ${M}`),U&&hn(T,U,L);break}case ne.T.UV0:{(0,Ye.hu)(2===T.size);const U=w.getField(M,C.Eu);(0,Ye.hu)(!!U,`No buffer view for ${M}`),U&&hn(T,U,L);break}case ne.T.COLOR:case ne.T.SYMBOLCOLOR:{const U=w.getField(M,C.mc);(0,Ye.hu)(!!U,`No buffer view for ${M}`),(0,Ye.hu)(3===T.size||4===T.size),!U||3!==T.size&&4!==T.size||function zi(M,T,x,P,w=1){const{data:L,indices:U}=M,z=x.typedBuffer,R=x.typedBufferStride,Y=U.length;if(P*=R,T!==L.length||4!==T)if(1!==w)if(4!==T)for(let G=0;G<Y;++G){const ae=3*U[G];for(let Ae=0;Ae<w;++Ae)z[P]=L[ae],z[P+1]=L[ae+1],z[P+2]=L[ae+2],z[P+3]=255,P+=R}else for(let G=0;G<Y;++G){const ae=4*U[G];for(let Ae=0;Ae<w;++Ae)z[P]=L[ae],z[P+1]=L[ae+1],z[P+2]=L[ae+2],z[P+3]=L[ae+3],P+=R}else{if(4===T){for(let G=0;G<Y;++G){const ae=4*U[G];z[P]=L[ae],z[P+1]=L[ae+1],z[P+2]=L[ae+2],z[P+3]=L[ae+3],P+=R}return}for(let G=0;G<Y;++G){const ae=3*U[G];z[P]=L[ae],z[P+1]=L[ae+1],z[P+2]=L[ae+2],z[P+3]=255,P+=R}}else{z[P]=L[0],z[P+1]=L[1],z[P+2]=L[2],z[P+3]=L[3];const G=new Uint32Array(x.typedBuffer.buffer,x.start),ae=R/4,Ae=G[P/=4];P+=ae;const Oe=Y*w;for(let De=1;De<Oe;++De)G[P]=Ae,P+=ae}}(T,T.size,U,L);break}case ne.T.COLORFEATUREATTRIBUTE:{const U=w.getField(M,C.ly);(0,Ye.hu)(!!U,`No buffer view for ${M}`),(0,Ye.hu)(1===T.size),U&&1===T.size&&function Vi(M,T,x){const{data:P,indices:w}=M,L=T.typedBuffer,U=T.typedBufferStride,z=w.length,R=P[0];x*=U;for(let Y=0;Y<z;++Y)L[x]=R,x+=U}(T,U,L);break}case ne.T.TANGENT:{(0,Ye.hu)(4===T.size);const U=w.getField(M,C.ek);(0,Ye.hu)(!!U,`No buffer view for ${M}`),U&&function Hi(M,T,x,P,w=1){if(!T)return void fn(M,x,P,w);const{data:L,indices:U}=M,R=x.typedBuffer,Y=x.typedBufferStride,G=U.length,ae=T[0],Ae=T[1],Oe=T[2],De=T[4],Ne=T[5],Se=T[6],nt=T[8],Ke=T[9],et=T[10],ot=!(0,A.pV)(T);if(P*=Y,1===w)for(let Ie=0;Ie<G;++Ie){const We=4*U[Ie],Qe=L[We],He=L[We+1],Ue=L[We+2],Ze=L[We+3];let we=ae*Qe+De*He+nt*Ue,it=Ae*Qe+Ne*He+Ke*Ue,ct=Oe*Qe+Se*He+et*Ue;if(ot){const ut=we*we+it*it+ct*ct;if(ut<.999999&&ut>1e-6){const mt=1/Math.sqrt(ut);we*=mt,it*=mt,ct*=mt}}R[P]=we,R[P+1]=it,R[P+2]=ct,R[P+3]=Ze,P+=Y}else for(let Ie=0;Ie<G;++Ie){const We=4*U[Ie],Qe=L[We],He=L[We+1],Ue=L[We+2],Ze=L[We+3];let we=ae*Qe+De*He+nt*Ue,it=Ae*Qe+Ne*He+Ke*Ue,ct=Oe*Qe+Se*He+et*Ue;if(ot){const ut=we*we+it*it+ct*ct;if(ut<.999999&&ut>1e-6){const mt=1/Math.sqrt(ut);we*=mt,it*=mt,ct*=mt}}for(let ut=0;ut<w;++ut)R[P]=we,R[P+1]=it,R[P+2]=ct,R[P+3]=Ze,P+=Y}}(T,x,U,L);break}case ne.T.PROFILERIGHT:case ne.T.PROFILEUP:case ne.T.PROFILEVERTEXANDNORMAL:case ne.T.FEATUREVALUE:{(0,Ye.hu)(4===T.size);const U=w.getField(M,C.ek);(0,Ye.hu)(!!U,`No buffer view for ${M}`),U&&fn(T,U,L)}}}class Ji{constructor(T){this.vertexBufferLayout=T}elementCount(T){return T.attributes.get(ne.T.POSITION).indices.length}write(T,x,P,w,L){!function Ki(M,T,x,P,w,L){for(const U of T.fields.keys()){const z=M.attributes.get(U),R=z?.indices;if(z&&R)$i(U,z,x,P,w,L);else if(U===ne.T.OBJECTANDLAYERIDCOLOR&&null!=M.objectAndLayerIdColor){const Y=M.attributes.get(ne.T.POSITION)?.indices;if(Y){const G=Y.length,ae=w.getField(U,C.mc);Gi(M.objectAndLayerIdColor,ae,G,L)}}}}(P,this.vertexBufferLayout,T,x,w,L)}}var Yi=_(22868),Xi=_(23515),Mr=_(95781),Zi=_(66541),Qi=_(60795),mn=_(74532),ki=_(690),qi=_(11661),es=_(97940);const ts={mask:255},rs={function:{func:je.wb.ALWAYS,ref:pe.hU.OutlineVisualElementMask,mask:pe.hU.OutlineVisualElementMask},operation:{fail:je.xS.KEEP,zFail:je.xS.KEEP,zPass:je.xS.ZERO}},ns={function:{func:je.wb.ALWAYS,ref:pe.hU.OutlineVisualElementMask,mask:pe.hU.OutlineVisualElementMask},operation:{fail:je.xS.KEEP,zFail:je.xS.KEEP,zPass:je.xS.REPLACE}},vn=[1,1,.5],ss=[0,.6,.2],os=[0,1,.2];var as=_(7818);class ls extends Zi.d4{constructor(){super(...arguments),this.isSchematic=!1,this.usePBR=!1,this.mrrFactors=(0,K.nI)(vn),this.hasVertexColors=!1,this.hasSymbolColors=!1,this.doubleSided=!1,this.doubleSidedType="normal",this.cullFace=pe.Vr.Back,this.isInstanced=!1,this.hasInstancedColor=!1,this.emissiveFactor=(0,K.al)(0,0,0),this.instancedDoublePrecision=!1,this.normalType=Yt.r.Attribute,this.receiveShadows=!0,this.receiveAmbientOcclusion=!0,this.castShadows=!0,this.shadowMappingEnabled=!1,this.ambient=(0,K.al)(.2,.2,.2),this.diffuse=(0,K.al)(.8,.8,.8),this.externalColor=(0,Xi.al)(1,1,1,1),this.colorMixMode="multiply",this.opacity=1,this.layerOpacity=1,this.origin=(0,K.Ue)(),this.hasSlicePlane=!1,this.hasSliceHighlight=!0,this.offsetTransparentBackfaces=!1,this.vvSize=null,this.vvColor=null,this.vvOpacity=null,this.vvSymbolAnchor=null,this.vvSymbolRotationMatrix=null,this.modelTransformation=null,this.transparent=!1,this.writeDepth=!0,this.customDepthTest=pe.Gv.Less,this.textureAlphaMode=pe.JJ.Blend,this.textureAlphaCutoff=Qi.F,this.textureAlphaPremultiplied=!1,this.hasOccludees=!1,this.renderOccluded=rn.yD.Occlude,this.isDecoration=!1}}class dr extends ki.A{initializeConfiguration(T,x){x.spherical=T.viewingMode===vr.JY.Global,x.doublePrecisionRequiresObfuscation=T.rctx.driverTest.doublePrecisionRequiresObfuscation.result,x.textureCoordinateType=x.hasColorTexture||x.hasMetallicRoughnessTexture||x.hasEmissionTexture||x.hasOcclusionTexture||x.hasNormalTexture?Mr.N.Default:Mr.N.None,x.objectAndLayerIdColorInstanced=x.instanced}initializeProgram(T){return this._initializeProgram(T,dr.shader)}_initializeProgram(T,x){return new es.$(T.rctx,x.get().build(this.configuration),qi.i)}_makePipeline(T,x){const P=this.configuration,w=T===zt.A.NONE,L=T===zt.A.FrontFace;return(0,rr.sm)({blending:P.output===Ot.H_.Color&&P.transparent?w?ui:_i(T):null,culling:ds(P)?(0,rr.zp)(P.cullFace):null,depthTest:{func:gi(T,cs(P.customDepthTest))},depthWrite:(w||L)&&P.writeDepth?rr.LZ:null,drawBuffers:P.output===Ot.H_.Depth?{buffers:[je.Xg.NONE]}:pi(T),colorWrite:rr.BK,stencilWrite:P.hasOccludees?ts:null,stencilTest:P.hasOccludees?x?ns:rs:null,polygonOffset:w||L?null:vi(P.enableOffset)})}initializePipeline(){return this._occludeePipelineState=this._makePipeline(this.configuration.transparencyPassType,!0),this._makePipeline(this.configuration.transparencyPassType,!1)}getPipeline(T){return T?this._occludeePipelineState:super.getPipeline()}}function cs(M){return M===pe.Gv.Lequal?je.wb.LEQUAL:je.wb.LESS}function ds(M){return M.cullFace!==pe.Vr.None||!M.hasSlicePlane&&!M.transparent&&!M.doubleSidedMode}dr.shader=new mn.J(as.D,()=>_.e(6204).then(_.bind(_,42921)));var Ve=_(50484),Ge=_(61842),us=_(67555),hs=_(92426);class xr extends us.PO{}(0,Ve._)([(0,Ge.o)({constValue:!0})],xr.prototype,"hasSliceHighlight",void 0),(0,Ve._)([(0,Ge.o)({constValue:!1})],xr.prototype,"hasSliceInVertexProgram",void 0),(0,Ve._)([(0,Ge.o)({constValue:hs.P.Pass})],xr.prototype,"pbrTextureBindType",void 0);class $e extends xr{constructor(){super(...arguments),this.output=Ot.H_.Color,this.alphaDiscardMode=pe.JJ.Opaque,this.doubleSidedMode=Xt.q.None,this.pbrMode=lr.f7.Disabled,this.cullFace=pe.Vr.None,this.transparencyPassType=zt.A.NONE,this.normalType=Yt.r.Attribute,this.textureCoordinateType=Mr.N.None,this.customDepthTest=pe.Gv.Less,this.spherical=!1,this.hasVertexColors=!1,this.hasSymbolColors=!1,this.hasVerticalOffset=!1,this.hasSlicePlane=!1,this.hasSliceHighlight=!0,this.hasColorTexture=!1,this.hasMetallicRoughnessTexture=!1,this.hasEmissionTexture=!1,this.hasOcclusionTexture=!1,this.hasNormalTexture=!1,this.hasScreenSizePerspective=!1,this.hasVertexTangents=!1,this.hasOccludees=!1,this.multipassEnabled=!1,this.hasModelTransformation=!1,this.offsetBackfaces=!1,this.vvSize=!1,this.vvColor=!1,this.receiveShadows=!1,this.receiveAmbientOcclusion=!1,this.textureAlphaPremultiplied=!1,this.instanced=!1,this.instancedColor=!1,this.objectAndLayerIdColorInstanced=!1,this.instancedDoublePrecision=!1,this.doublePrecisionRequiresObfuscation=!1,this.writeDepth=!0,this.transparent=!1,this.enableOffset=!0,this.cullAboveGround=!1,this.snowCover=!1,this.hasColorTextureTransform=!1,this.hasEmissionTextureTransform=!1,this.hasNormalTextureTransform=!1,this.hasOcclusionTextureTransform=!1,this.hasMetallicRoughnessTextureTransform=!1}}(0,Ve._)([(0,Ge.o)({count:Ot.H_.COUNT})],$e.prototype,"output",void 0),(0,Ve._)([(0,Ge.o)({count:pe.JJ.COUNT})],$e.prototype,"alphaDiscardMode",void 0),(0,Ve._)([(0,Ge.o)({count:Xt.q.COUNT})],$e.prototype,"doubleSidedMode",void 0),(0,Ve._)([(0,Ge.o)({count:lr.f7.COUNT})],$e.prototype,"pbrMode",void 0),(0,Ve._)([(0,Ge.o)({count:pe.Vr.COUNT})],$e.prototype,"cullFace",void 0),(0,Ve._)([(0,Ge.o)({count:zt.A.COUNT})],$e.prototype,"transparencyPassType",void 0),(0,Ve._)([(0,Ge.o)({count:Yt.r.COUNT})],$e.prototype,"normalType",void 0),(0,Ve._)([(0,Ge.o)({count:Mr.N.COUNT})],$e.prototype,"textureCoordinateType",void 0),(0,Ve._)([(0,Ge.o)({count:pe.Gv.COUNT})],$e.prototype,"customDepthTest",void 0),(0,Ve._)([(0,Ge.o)()],$e.prototype,"spherical",void 0),(0,Ve._)([(0,Ge.o)()],$e.prototype,"hasVertexColors",void 0),(0,Ve._)([(0,Ge.o)()],$e.prototype,"hasSymbolColors",void 0),(0,Ve._)([(0,Ge.o)()],$e.prototype,"hasVerticalOffset",void 0),(0,Ve._)([(0,Ge.o)()],$e.prototype,"hasSlicePlane",void 0),(0,Ve._)([(0,Ge.o)()],$e.prototype,"hasSliceHighlight",void 0),(0,Ve._)([(0,Ge.o)()],$e.prototype,"hasColorTexture",void 0),(0,Ve._)([(0,Ge.o)()],$e.prototype,"hasMetallicRoughnessTexture",void 0),(0,Ve._)([(0,Ge.o)()],$e.prototype,"hasEmissionTexture",void 0),(0,Ve._)([(0,Ge.o)()],$e.prototype,"hasOcclusionTexture",void 0),(0,Ve._)([(0,Ge.o)()],$e.prototype,"hasNormalTexture",void 0),(0,Ve._)([(0,Ge.o)()],$e.prototype,"hasScreenSizePerspective",void 0),(0,Ve._)([(0,Ge.o)()],$e.prototype,"hasVertexTangents",void 0),(0,Ve._)([(0,Ge.o)()],$e.prototype,"hasOccludees",void 0),(0,Ve._)([(0,Ge.o)()],$e.prototype,"multipassEnabled",void 0),(0,Ve._)([(0,Ge.o)()],$e.prototype,"hasModelTransformation",void 0),(0,Ve._)([(0,Ge.o)()],$e.prototype,"offsetBackfaces",void 0),(0,Ve._)([(0,Ge.o)()],$e.prototype,"vvSize",void 0),(0,Ve._)([(0,Ge.o)()],$e.prototype,"vvColor",void 0),(0,Ve._)([(0,Ge.o)()],$e.prototype,"receiveShadows",void 0),(0,Ve._)([(0,Ge.o)()],$e.prototype,"receiveAmbientOcclusion",void 0),(0,Ve._)([(0,Ge.o)()],$e.prototype,"textureAlphaPremultiplied",void 0),(0,Ve._)([(0,Ge.o)()],$e.prototype,"instanced",void 0),(0,Ve._)([(0,Ge.o)()],$e.prototype,"instancedColor",void 0),(0,Ve._)([(0,Ge.o)()],$e.prototype,"objectAndLayerIdColorInstanced",void 0),(0,Ve._)([(0,Ge.o)()],$e.prototype,"instancedDoublePrecision",void 0),(0,Ve._)([(0,Ge.o)()],$e.prototype,"doublePrecisionRequiresObfuscation",void 0),(0,Ve._)([(0,Ge.o)()],$e.prototype,"writeDepth",void 0),(0,Ve._)([(0,Ge.o)()],$e.prototype,"transparent",void 0),(0,Ve._)([(0,Ge.o)()],$e.prototype,"enableOffset",void 0),(0,Ve._)([(0,Ge.o)()],$e.prototype,"cullAboveGround",void 0),(0,Ve._)([(0,Ge.o)()],$e.prototype,"snowCover",void 0),(0,Ve._)([(0,Ge.o)()],$e.prototype,"hasColorTextureTransform",void 0),(0,Ve._)([(0,Ge.o)()],$e.prototype,"hasEmissionTextureTransform",void 0),(0,Ve._)([(0,Ge.o)()],$e.prototype,"hasNormalTextureTransform",void 0),(0,Ve._)([(0,Ge.o)()],$e.prototype,"hasOcclusionTextureTransform",void 0),(0,Ve._)([(0,Ge.o)()],$e.prototype,"hasMetallicRoughnessTextureTransform",void 0),(0,Ve._)([(0,Ge.o)({constValue:!1})],$e.prototype,"occlusionPass",void 0),(0,Ve._)([(0,Ge.o)({constValue:!0})],$e.prototype,"hasVvInstancing",void 0),(0,Ve._)([(0,Ge.o)({constValue:!1})],$e.prototype,"useCustomDTRExponentForWater",void 0),(0,Ve._)([(0,Ge.o)({constValue:!1})],$e.prototype,"supportsTextureAtlas",void 0),(0,Ve._)([(0,Ge.o)({constValue:!0})],$e.prototype,"useFillLights",void 0);var _s=_(75799);class Or extends dr{initializeConfiguration(T,x){super.initializeConfiguration(T,x),x.hasMetallicRoughnessTexture=!1,x.hasEmissionTexture=!1,x.hasOcclusionTexture=!1,x.hasNormalTexture=!1,x.hasModelTransformation=!1,x.normalType=Yt.r.Attribute,x.doubleSidedMode=Xt.q.WindingOrder,x.hasVertexTangents=!1}initializeProgram(T){return this._initializeProgram(T,Or.shader)}}Or.shader=new mn.J(_s.R,()=>_.e(2143).then(_.bind(_,82143)));class Pr extends rn.F5{constructor(T){super(T,vs),this.supportsEdges=!0,this.produces=new Map([[cr.OPAQUE_MATERIAL,x=>((0,Ot.Jb)(x)||(0,Ot.Kr)(x))&&!this.parameters.transparent],[cr.TRANSPARENT_MATERIAL,x=>((0,Ot.Jb)(x)||(0,Ot.Kr)(x))&&this.parameters.transparent&&this.parameters.writeDepth],[cr.TRANSPARENT_DEPTH_WRITE_DISABLED_MATERIAL,x=>((0,Ot.Jb)(x)||(0,Ot.Kr)(x))&&this.parameters.transparent&&!this.parameters.writeDepth]]),this._configuration=new $e,this._vertexBufferLayout=function gs(M){const T=(0,ci.U$)().vec3f(ne.T.POSITION);return M.normalType===Yt.r.Compressed?T.vec2i16(ne.T.NORMALCOMPRESSED,{glNormalized:!0}):T.vec3f(ne.T.NORMAL),M.hasVertexTangents&&T.vec4f(ne.T.TANGENT),(M.textureId||M.normalTextureId||M.metallicRoughnessTextureId||M.emissiveTextureId||M.occlusionTextureId)&&T.vec2f(ne.T.UV0),M.hasVertexColors&&T.vec4u8(ne.T.COLOR),M.hasSymbolColors&&T.vec4u8(ne.T.SYMBOLCOLOR),(0,Sn.Z)("enable-feature:objectAndLayerId-rendering")&&T.vec4u8(ne.T.OBJECTANDLAYERIDCOLOR),T}(this.parameters)}isVisibleForOutput(T){return T!==Ot.H_.Shadow&&T!==Ot.H_.ShadowExcludeHighlight&&T!==Ot.H_.ShadowHighlight||this.parameters.castShadows}isVisible(){const T=this.parameters;if(!super.isVisible()||0===T.layerOpacity)return!1;const{hasInstancedColor:x,hasVertexColors:P,hasSymbolColors:w,vvColor:L}=T,U="replace"===T.colorMixMode,z=T.opacity>0,R=T.externalColor&&T.externalColor[3]>0,Y=x||L||w;return P&&Y?U||z:P?U?R:z:Y?U||z:U?R:z}getConfiguration(T,x){return this._configuration.output=T,this._configuration.hasNormalTexture=!!this.parameters.normalTextureId,this._configuration.hasColorTexture=!!this.parameters.textureId,this._configuration.hasVertexTangents=this.parameters.hasVertexTangents,this._configuration.instanced=this.parameters.isInstanced,this._configuration.instancedDoublePrecision=this.parameters.instancedDoublePrecision,this._configuration.vvSize=!!this.parameters.vvSize,this._configuration.hasVerticalOffset=null!=this.parameters.verticalOffset,this._configuration.hasScreenSizePerspective=null!=this.parameters.screenSizePerspective,this._configuration.hasSlicePlane=this.parameters.hasSlicePlane,this._configuration.hasSliceHighlight=this.parameters.hasSliceHighlight,this._configuration.alphaDiscardMode=this.parameters.textureAlphaMode,this._configuration.normalType=this.parameters.normalType,this._configuration.transparent=this.parameters.transparent,this._configuration.writeDepth=this.parameters.writeDepth,null!=this.parameters.customDepthTest&&(this._configuration.customDepthTest=this.parameters.customDepthTest),this._configuration.hasOccludees=this.parameters.hasOccludees,this._configuration.cullFace=this.parameters.hasSlicePlane?pe.Vr.None:this.parameters.cullFace,this._configuration.multipassEnabled=x.multipassEnabled,this._configuration.cullAboveGround=x.multipassTerrain.cullAboveGround,this._configuration.hasModelTransformation=null!=this.parameters.modelTransformation,T===Ot.H_.Color&&(this._configuration.hasVertexColors=this.parameters.hasVertexColors,this._configuration.hasSymbolColors=this.parameters.hasSymbolColors,this._configuration.doubleSidedMode=this.parameters.treeRendering?Xt.q.WindingOrder:this.parameters.doubleSided&&"normal"===this.parameters.doubleSidedType?Xt.q.View:this.parameters.doubleSided&&"winding-order"===this.parameters.doubleSidedType?Xt.q.WindingOrder:Xt.q.None,this._configuration.instancedColor=this.parameters.hasInstancedColor,this._configuration.receiveShadows=this.parameters.receiveShadows&&this.parameters.shadowMappingEnabled,this._configuration.receiveAmbientOcclusion=this.parameters.receiveAmbientOcclusion&&null!=x.ssao,this._configuration.vvColor=!!this.parameters.vvColor,this._configuration.textureAlphaPremultiplied=!!this.parameters.textureAlphaPremultiplied,this._configuration.pbrMode=this.parameters.usePBR?this.parameters.isSchematic?lr.f7.Schematic:lr.f7.Normal:lr.f7.Disabled,this._configuration.hasMetallicRoughnessTexture=!!this.parameters.metallicRoughnessTextureId,this._configuration.hasEmissionTexture=!!this.parameters.emissiveTextureId,this._configuration.hasOcclusionTexture=!!this.parameters.occlusionTextureId,this._configuration.offsetBackfaces=!(!this.parameters.transparent||!this.parameters.offsetTransparentBackfaces),this._configuration.transparencyPassType=x.transparencyPassType,this._configuration.enableOffset=x.camera.relativeElevation<5e5,this._configuration.snowCover=this.hasSnowCover(x),this._configuration.hasColorTextureTransform=!!this.parameters.colorTextureTransformMatrix,this._configuration.hasNormalTextureTransform=!!this.parameters.normalTextureTransformMatrix,this._configuration.hasEmissionTextureTransform=!!this.parameters.emissiveTextureTransformMatrix,this._configuration.hasOcclusionTextureTransform=!!this.parameters.occlusionTextureTransformMatrix,this._configuration.hasMetallicRoughnessTextureTransform=!!this.parameters.metallicRoughnessTextureTransformMatrix),this._configuration}hasSnowCover(T){return null!=T.weather&&T.weatherVisible&&"snowy"===T.weather.type&&"enabled"===T.weather.snowCover}intersect(T,x,P,w,L,U){if(null!=this.parameters.verticalOffset){const z=P.camera;(0,b.s)(wr,x[12],x[13],x[14]);let R=null;switch(P.viewingMode){case vr.JY.Global:R=(0,b.n)(gn,wr);break;case vr.JY.Local:R=(0,b.c)(gn,Ts)}let Y=0;const G=(0,b.f)(Ms,wr,z.eye),ae=(0,b.l)(G),Ae=(0,b.j)(G,G,1/ae);let Oe=null;this.parameters.screenSizePerspective&&(Oe=(0,b.m)(R,Ae)),Y+=(0,Yi.Hx)(z,ae,this.parameters.verticalOffset,Oe??0,this.parameters.screenSizePerspective),(0,b.j)(R,R,Y),(0,b.t)(Br,R,P.transform.inverseRotation),w=(0,b.f)(ps,w,Br),L=(0,b.f)(Es,L,Br)}Ti(T,P,w,L,function Bi(M){return null!=M?(ln.offset=M,ln):null}(P.verticalOffset),U)}createGLMaterial(T){return new fs(T)}createBufferWriter(){return new Ji(this._vertexBufferLayout)}}class fs extends di.F{constructor(T){super({...T,...T.material.parameters})}_updateShadowState(T){T.shadowMap.enabled!==this._material.parameters.shadowMappingEnabled&&this._material.setParameters({shadowMappingEnabled:T.shadowMap.enabled})}_updateOccludeeState(T){T.hasOccludees!==this._material.parameters.hasOccludees&&this._material.setParameters({hasOccludees:T.hasOccludees})}beginSlot(T){this._output===Ot.H_.Color&&(this._updateShadowState(T),this._updateOccludeeState(T));const x=this._material.parameters;this.updateTexture(x.textureId);const P=T.camera.viewInverseTransposeMatrix;return(0,b.s)(x.origin,P[3],P[7],P[11]),this._material.setParameters(this.textureBindParameters),this.ensureTechnique(x.treeRendering?Or:dr,T)}}const vs=new class ms extends ls{constructor(){super(...arguments),this.initTextureTransparent=!1,this.treeRendering=!1,this.hasVertexTangents=!1}},ps=(0,K.Ue)(),Es=(0,K.Ue)(),Ts=(0,K.al)(0,0,1),gn=(0,K.Ue)(),Br=(0,K.Ue)(),wr=(0,K.Ue)(),Ms=(0,K.Ue)(),jt=()=>at.Z.getLogger("esri.views.3d.layers.graphics.objectResourceUtils");function Fr(){return Fr=(0,y.Z)(function*(M,T){const x=yield function Os(M,T){return Nr.apply(this,arguments)}(M,T),P=yield function bs(M,T){return Wr.apply(this,arguments)}(x.textureDefinitions??{},T);let w=0;for(const L in P)if(P.hasOwnProperty(L)){const U=P[L];w+=U?.image?U.image.width*U.image.height*4:0}return{resource:x,textures:P,size:w+(0,Pe.Ul)(x)}}),Fr.apply(this,arguments)}function Nr(){return Nr=(0,y.Z)(function*(M,T){const x=T?.streamDataRequester;if(x)return function Ps(M,T,x){return jr.apply(this,arguments)}(M,x,T);const P=yield(0,Me.q6)((0,me.Z)(M,T));if(!0===P.ok)return P.value.data;(0,Le.r9)(P.error),pn(P.error)}),Nr.apply(this,arguments)}function jr(){return jr=(0,y.Z)(function*(M,T,x){const P=yield(0,Me.q6)(T.request(M,"json",x));if(!0===P.ok)return P.value;(0,Le.r9)(P.error),pn(P.error.details.url)}),jr.apply(this,arguments)}function pn(M){throw new ke.Z("",`Request for object resource failed: ${M}`)}function As(M){const T=M.params,x=T.topology;let P=!0;switch(T.vertexAttributes||(jt().warn("Geometry must specify vertex attributes"),P=!1),T.topology){case"PerAttributeArray":break;case"Indexed":case null:case void 0:{const L=T.faces;if(L){if(T.vertexAttributes)for(const U in T.vertexAttributes){const z=L[U];z?.values?(null!=z.valueType&&"UInt32"!==z.valueType&&(jt().warn(`Unsupported indexed geometry indices type '${z.valueType}', only UInt32 is currently supported`),P=!1),null!=z.valuesPerElement&&1!==z.valuesPerElement&&(jt().warn(`Unsupported indexed geometry values per element '${z.valuesPerElement}', only 1 is currently supported`),P=!1)):(jt().warn(`Indexed geometry does not specify face indices for '${U}' attribute`),P=!1)}}else jt().warn("Indexed geometries must specify faces"),P=!1;break}default:jt().warn(`Unsupported topology '${x}'`),P=!1}M.params.material||(jt().warn("Geometry requires material"),P=!1);const w=M.params.vertexAttributes;for(const L in w)w[L].values||(jt().warn("Geometries with externally defined attributes are not yet supported"),P=!1);return P}function Ds(M){const T=(0,ue.cS)();return M.forEach(x=>{const P=x.boundingInfo;null!=P&&((0,ue.pp)(T,P.bbMin),(0,ue.pp)(T,P.bbMax))}),T}function Wr(){return Wr=(0,y.Z)(function*(M,T){const x=new Array;for(const L in M){const U=M[L],z=U.images[0].data;if(!z){jt().warn("Externally referenced texture data is not yet supported");continue}const R=U.encoding+";base64,"+z,Y="/textureDefinitions/"+L,G="rgba"===U.channels?U.alphaChannelUsage||"transparency":"none",ae={noUnpackFlip:!0,wrap:{s:je.e8.REPEAT,t:je.e8.REPEAT},preMultiplyAlpha:En(G)!==pe.JJ.Opaque},Ae=T?.disableTextures?Promise.resolve(null):(0,Te.t)(R,T);x.push(Ae.then(Oe=>({refId:Y,image:Oe,parameters:ae,alphaChannelUsage:G})))}const P=yield Promise.all(x),w={};for(const L of P)w[L.refId]=L;return w}),Wr.apply(this,arguments)}function En(M){switch(M){case"mask":return pe.JJ.Mask;case"maskAndTransparency":return pe.JJ.MaskBlend;case"none":return pe.JJ.Opaque;default:return pe.JJ.Blend}}function Cs(M){const T=M.params;return{id:1,material:T.material,texture:T.texture,region:T.texture}}const Ss=new rt.G(1,2,"wosr");var nr=_(77891);function Rs(M,T){return Hr.apply(this,arguments)}function Hr(){return Hr=(0,y.Z)(function*(M,T){const x=Tn((0,B.pJ)(M));if("wosr"===x.fileType){const ae=yield T.cache?T.cache.loadWOSR(x.url,T):function xs(M,T){return Fr.apply(this,arguments)}(x.url,T),{engineResources:Ae,referenceBoundingBox:Oe}=function ys(M,T){const x=new Array,P=new Array,w=new Array,L=new st.r,U=M.resource,z=rt.G.parse(U.version||"1.0","wosr");Ss.validate(z);const R=U.model.name,Y=U.model.geometries,G=U.materialDefinitions??{},ae=M.textures;let Ae=0;const Oe=new Map;for(let De=0;De<Y.length;De++){const Ne=Y[De];if(!As(Ne))continue;const Se=Cs(Ne),nt=Ne.params.vertexAttributes,Ke=[],et=we=>{if("PerAttributeArray"===Ne.params.topology)return null;const it=Ne.params.faces;for(const ct in it)if(ct===we)return it[ct].values;return null},ot=nt[ne.T.POSITION],dt=ot.values.length/ot.valuesPerElement;for(const we in nt){const it=nt[we],ct=it.values,ut=et(we)??(0,lt.KF)(dt);Ke.push([we,new ye.a(ct,ut,it.valuesPerElement,!0)])}const tt=Se.texture,Ie=ae&&ae[tt];if(Ie&&!Oe.has(tt)){const{image:we,parameters:it}=Ie,ct=new en(we,it);P.push(ct),Oe.set(tt,ct)}const We=Oe.get(tt),Qe=We?We.id:void 0,He=Se.material;let Ue=L.get(He,tt);if(null==Ue){const we=G[He.substring(He.lastIndexOf("/")+1)].params;1===we.transparency&&(we.transparency=0);const it=Ie&&Ie.alphaChannelUsage,ct=we.transparency>0||"transparency"===it||"maskAndTransparency"===it,ut=Ie?En(Ie.alphaChannelUsage):void 0,mt={ambient:(0,K.nI)(we.diffuse),diffuse:(0,K.nI)(we.diffuse),opacity:1-(we.transparency||0),transparent:ct,textureAlphaMode:ut,textureAlphaCutoff:.33,textureId:Qe,initTextureTransparent:!0,doubleSided:!0,cullFace:pe.Vr.None,colorMixMode:we.externalColorMixMode||"tint",textureAlphaPremultiplied:Ie?.parameters.preMultiplyAlpha??!1};T?.materialParameters&&Object.assign(mt,T.materialParameters),Ue=new Pr(mt),L.set(He,tt,Ue)}w.push(Ue);const Ze=new hr(Ue,Ke);Ae+=Ke.find(we=>we[0]===ne.T.POSITION)?.[1]?.indices.length??0,x.push(Ze)}return{engineResources:[{name:R,stageResources:{textures:P,materials:w,geometries:x},pivotOffset:U.model.pivotOffset,numberOfVertices:Ae,lodThreshold:null}],referenceBoundingBox:Ds(x)}}(ae,T);return{lods:Ae,referenceBoundingBox:Oe,isEsriSymbolResource:!1,isWosr:!0}}const P=yield T.cache?T.cache.loadGLTF(x.url,T,!!T.usePBR):(0,j.Q)(new se.C(T.streamDataRequester),x.url,T,T.usePBR),w=P.model.meta?.ESRI_proxyEllipsoid,L=P.meta.isEsriSymbolResource&&null!=w&&"EsriRealisticTreesStyle"===P.meta.ESRI_webstyle;L&&!P.customMeta.esriTreeRendering&&(P.customMeta.esriTreeRendering=!0,function Bs(M,T){for(let x=0;x<M.model.lods.length;++x){const P=M.model.lods[x];for(const w of P.parts){const L=w.attributes.normal;if(null==L)return;const U=w.attributes.position,z=U.count,R=(0,K.Ue)(),Y=(0,K.Ue)(),G=(0,K.Ue)(),ae=new Uint8Array(4*z),Ae=new Float64Array(3*z),Oe=(0,A.U_)((0,N.Ue)(),w.transform);let De=0,Ne=0;for(let Se=0;Se<z;Se++){U.getVec(Se,Y),L.getVec(Se,R),(0,b.h)(Y,Y,w.transform),(0,b.f)(G,Y,T.center),(0,b.D)(G,G,T.radius);const nt=G[2],Ke=(0,b.l)(G),et=Math.min(.45+.55*Ke*Ke,1);(0,b.D)(G,G,T.radius),null!==Oe&&(0,b.h)(G,G,Oe),(0,b.n)(G,G),x+1!==M.model.lods.length&&M.model.lods.length>1&&(0,b.o)(G,G,R,nt>-1?.2:Math.min(-4*nt-3.8,1)),Ae[De]=G[0],Ae[De+1]=G[1],Ae[De+2]=G[2],De+=3,ae[Ne]=255*et,ae[Ne+1]=255*et,ae[Ne+2]=255*et,ae[Ne+3]=255,Ne+=4}w.attributes.normal=new C.ct(Ae),w.attributes.color=new C.mc(ae)}}}(P,w));const U=!!T.usePBR,z=P.meta.isEsriSymbolResource?{usePBR:U,isSchematic:!1,treeRendering:L,mrrFactors:[...os]}:{usePBR:U,isSchematic:!1,treeRendering:!1,mrrFactors:[...vn]},R={...T.materialParameters,treeRendering:L},{engineResources:Y,referenceBoundingBox:G}=Mn(P,z,R,T.skipHighLods&&null==x.specifiedLodIndex?{skipHighLods:!0}:{skipHighLods:!1,singleLodIndex:x.specifiedLodIndex});return{lods:Y,referenceBoundingBox:G,isEsriSymbolResource:P.meta.isEsriSymbolResource,isWosr:!1}}),Hr.apply(this,arguments)}function Tn(M){const T=M.match(/(.*\.(gltf|glb))(\?lod=([0-9]+))?$/);return T?{fileType:"gltf",url:T[1],specifiedLodIndex:null!=T[4]?Number(T[4]):null}:M.match(/(.*\.(json|json\.gz))$/)?{fileType:"wosr",url:M,specifiedLodIndex:null}:{fileType:"unknown",url:M,specifiedLodIndex:null}}function Mn(M,T,x,P){const w=M.model,L=new Array,U=new Map,z=new Map,R=w.lods.length,Y=(0,ue.cS)();return w.lods.forEach((G,ae)=>{const Ae=!0===P.skipHighLods&&(R>1&&0===ae||R>3&&1===ae)||!1===P.skipHighLods&&null!=P.singleLodIndex&&ae!==P.singleLodIndex;if(Ae&&0!==ae)return;const Oe=new ce(G.name,G.lodThreshold,[0,0,0]);G.parts.forEach(De=>{const Ne=Ae?new Pr({}):function Ls(M,T,x,P,w,L,U){const z=T.material+(T.attributes.normal?"_normal":"")+(T.attributes.color?"_color":"")+(T.attributes.texCoord0?"_texCoord0":"")+(T.attributes.tangent?"_tangent":""),R=M.materials.get(T.material),Y=null!=T.attributes.texCoord0,G=null!=T.attributes.normal;if(null==R)return null;const ae=function Us(M){switch(M){case"BLEND":return pe.JJ.Blend;case"MASK":return pe.JJ.Mask;case"OPAQUE":case null:case void 0:return pe.JJ.Opaque}}(R.alphaMode);if(!L.has(z)){if(Y){const tt=(Ie,We=!1)=>{if(null!=Ie&&!U.has(Ie)){const Qe=M.textures.get(Ie);if(null!=Qe){const He=Qe.data;U.set(Ie,new en((0,Q.$A)(He)?He.data:He,{...Qe.parameters,preMultiplyAlpha:!(0,Q.$A)(He)&&We,encoding:(0,Q.$A)(He)&&null!=He.encoding?He.encoding:void 0}))}}};tt(R.textureColor,ae!==pe.JJ.Opaque),tt(R.textureNormal),tt(R.textureOcclusion),tt(R.textureEmissive),tt(R.textureMetallicRoughness)}const Oe=R.color[0]**(1/nr.j),De=R.color[1]**(1/nr.j),Ne=R.color[2]**(1/nr.j),Se=R.emissiveFactor[0]**(1/nr.j),nt=R.emissiveFactor[1]**(1/nr.j),Ke=R.emissiveFactor[2]**(1/nr.j),et=null!=R.textureColor&&Y?U.get(R.textureColor):null,ot=function is({normalTexture:M,metallicRoughnessTexture:T,metallicFactor:x,roughnessFactor:P,emissiveTexture:w,emissiveFactor:L,occlusionTexture:U}){return null==M&&null==T&&null==w&&(null==L||(0,b.e)(L,K.AG))&&null==U&&(null==P||1===P)&&(null==x||1===x)}({normalTexture:R.textureNormal,metallicRoughnessTexture:R.textureMetallicRoughness,metallicFactor:R.metallicFactor,roughnessFactor:R.roughnessFactor,emissiveTexture:R.textureEmissive,emissiveFactor:R.emissiveFactor,occlusionTexture:R.textureOcclusion}),dt=null!=R.normalTextureTransform?.scale?R.normalTextureTransform?.scale:X.hq;L.set(z,new Pr({...P,transparent:ae===pe.JJ.Blend,customDepthTest:pe.Gv.Lequal,textureAlphaMode:ae,textureAlphaCutoff:R.alphaCutoff,diffuse:[Oe,De,Ne],ambient:[Oe,De,Ne],opacity:R.opacity,doubleSided:R.doubleSided,doubleSidedType:"winding-order",cullFace:R.doubleSided?pe.Vr.None:pe.Vr.Back,hasVertexColors:!!T.attributes.color,hasVertexTangents:!!T.attributes.tangent,normalType:G?Yt.r.Attribute:Yt.r.ScreenDerivative,castShadows:!0,receiveShadows:R.receiveShadows,receiveAmbientOcclusion:R.receiveAmbientOcclustion,textureId:et?.id,colorMixMode:R.colorMixMode,normalTextureId:null!=R.textureNormal&&Y?U.get(R.textureNormal).id:void 0,textureAlphaPremultiplied:null!=et&&!!et.parameters.preMultiplyAlpha,occlusionTextureId:null!=R.textureOcclusion&&Y?U.get(R.textureOcclusion).id:void 0,emissiveTextureId:null!=R.textureEmissive&&Y?U.get(R.textureEmissive).id:void 0,metallicRoughnessTextureId:null!=R.textureMetallicRoughness&&Y?U.get(R.textureMetallicRoughness).id:void 0,emissiveFactor:[Se,nt,Ke],mrrFactors:ot?[...ss]:[R.metallicFactor,R.roughnessFactor,P.mrrFactors[2]],isSchematic:ot,colorTextureTransformMatrix:W(R.colorTextureTransform),normalTextureTransformMatrix:W(R.normalTextureTransform),scale:[dt[0],dt[1]],occlusionTextureTransformMatrix:W(R.occlusionTextureTransform),emissiveTextureTransformMatrix:W(R.emissiveTextureTransform),metallicRoughnessTextureTransformMatrix:W(R.metallicRoughnessTextureTransform),...w}))}const Ae=L.get(z);if(x.stageResources.materials.push(Ae),Y){const Oe=De=>{null!=De&&x.stageResources.textures.push(U.get(De))};Oe(R.textureColor),Oe(R.textureNormal),Oe(R.textureOcclusion),Oe(R.textureEmissive),Oe(R.textureMetallicRoughness)}return Ae}(w,De,Oe,T,x,U,z),{geometry:Se,vertexCount:nt}=function Is(M,T){const x=M.attributes.position.count,P=(0,ee.p)(M.indices||x,M.primitiveType),w=(0,F.xx)(3*x),{typedBuffer:L,typedBufferStride:U}=M.attributes.position;(0,O.a)(w,L,M.transform,3,U);const z=[[ne.T.POSITION,new ye.a(w,P,3,!0)]];if(null!=M.attributes.normal){const Y=(0,F.xx)(3*x),{typedBuffer:G,typedBufferStride:ae}=M.attributes.normal;(0,I.XL)(ir,M.transform),(0,O.t)(Y,G,ir,3,ae),(0,H.oc)(ir)&&(0,O.n)(Y,Y),z.push([ne.T.NORMAL,new ye.a(Y,P,3,!0)])}if(null!=M.attributes.tangent){const Y=(0,F.xx)(4*x),{typedBuffer:G,typedBufferStride:ae}=M.attributes.tangent;(0,I.xO)(ir,M.transform),(0,$.t)(Y,G,ir,4,ae),(0,H.oc)(ir)&&(0,O.n)(Y,Y,4),z.push([ne.T.TANGENT,new ye.a(Y,P,4,!0)])}if(null!=M.attributes.texCoord0){const Y=(0,F.xx)(2*x),{typedBuffer:G,typedBufferStride:ae}=M.attributes.texCoord0;(0,Z.n)(Y,G,2,ae),z.push([ne.T.UV0,new ye.a(Y,P,2,!0)])}const R=M.attributes.color;if(null!=R){const Y=new Uint8Array(4*x);4===R.elementCount?R instanceof C.ek?(0,$.s)(Y,R,255):R instanceof C.mc?(0,V.c)(Y,R):R instanceof C.v6&&(0,$.s)(Y,R,1/256):(Y.fill(255),R instanceof C.ct?(0,O.s)(Y,R.typedBuffer,255,4,R.typedBufferStride):M.attributes.color instanceof C.ne?(0,k.c)(Y,R.typedBuffer,4,M.attributes.color.typedBufferStride):M.attributes.color instanceof C.mw&&(0,O.s)(Y,R.typedBuffer,1/256,4,R.typedBufferStride)),z.push([ne.T.COLOR,new ye.a(Y,P,4,!0)])}return{geometry:new hr(T,z),vertexCount:x}}(De,Ne??new Pr({})),Ke=Se.boundingInfo;null!=Ke&&0===ae&&((0,ue.pp)(Y,Ke.bbMin),(0,ue.pp)(Y,Ke.bbMax)),null!=Ne&&(Oe.stageResources.geometries.push(Se),Oe.numberOfVertices+=nt)}),Ae||L.push(Oe)}),{engineResources:L,referenceBoundingBox:Y}}const ir=(0,D.Ue)()},69676:(xe,te,_)=>{var B,b;_.d(te,{a9:()=>B}),_(55117),(b=B||(B={}))[b.Multiply=1]="Multiply",b[b.Ignore=2]="Ignore",b[b.Replace=3]="Replace",b[b.Tint=4]="Tint"},82859:(xe,te,_)=>{_.d(te,{Gw:()=>N,U$:()=>A});var y=_(11716),B=_(19840),H=_(98694);class I{constructor(C,O){this.layout=C,this.buffer="number"==typeof O?new ArrayBuffer(O*C.stride):O;for(const $ of C.fields.keys()){const Z=C.fields.get($);this[$]=new Z.constructor(this.buffer,Z.offset,this.stride)}}get stride(){return this.layout.stride}get count(){return this.buffer.byteLength/this.stride}get byteLength(){return this.buffer.byteLength}getField(C,O){const $=this[C];return $&&$.elementCount===O.ElementCount&&$.elementType===O.ElementType?$:null}slice(C,O){return new I(this.layout,this.buffer.slice(C*this.stride,O*this.stride))}copyFrom(C,O=0,$=0,Z=C.count){const k=this.stride;if(k%4==0){const V=new Uint32Array(C.buffer,O*k,Z*k/4);new Uint32Array(this.buffer,$*k,Z*k/4).set(V)}else{const V=new Uint8Array(C.buffer,O*k,Z*k);new Uint8Array(this.buffer,$*k,Z*k).set(V)}return this}get usedMemory(){return this.byteLength}dispose(){}}class D{constructor(C=null){this._stride=0,this._lastAligned=0,this._fields=new Map,C&&(this._stride=C.stride,C.fields.forEach(O=>{return this._fields.set(O[0],{...O[1],constructor:(F=O[1].constructor,ue.get(F))});var F}))}freeze(){return this}vec2f(C,O){return this._appendField(C,y.Eu,O),this}vec2f64(C,O){return this._appendField(C,y.q6,O),this}vec3f(C,O){return this._appendField(C,y.ct,O),this}vec3f64(C,O){return this._appendField(C,y.fP,O),this}vec4f(C,O){return this._appendField(C,y.ek,O),this}vec4f64(C,O){return this._appendField(C,y.Cd,O),this}mat3f(C,O){return this._appendField(C,y.gK,O),this}mat3f64(C,O){return this._appendField(C,y.ey,O),this}mat4f(C,O){return this._appendField(C,y.bj,O),this}mat4f64(C,O){return this._appendField(C,y.O1,O),this}vec4u8(C,O){return this._appendField(C,y.mc,O),this}f32(C,O){return this._appendField(C,y.ly,O),this}f64(C,O){return this._appendField(C,y.oS,O),this}u8(C,O){return this._appendField(C,y.D_,O),this}u16(C,O){return this._appendField(C,y.av,O),this}i8(C,O){return this._appendField(C,y.Hz,O),this}vec2i8(C,O){return this._appendField(C,y.Vs,O),this}vec2i16(C,O){return this._appendField(C,y.or,O),this}vec2u8(C,O){return this._appendField(C,y.xA,O),this}vec4u16(C,O){return this._appendField(C,y.v6,O),this}u32(C,O){return this._appendField(C,y.Nu,O),this}_appendField(C,O,$){if(this._fields.has(C))return void(0,H.hu)(!1,`${C} already added to vertex buffer layout`);const Z=O.ElementCount*(0,B.n1)(O.ElementType),k=this._stride;this._stride+=Z,this._fields.set(C,{size:Z,constructor:O,offset:k,optional:$})}createBuffer(C){return new I(this,C)}createView(C){return new I(this,C)}clone(){const C=new D;return C._stride=this._stride,C._fields=new Map,this._fields.forEach((O,$)=>C._fields.set($,O)),C.BufferType=this.BufferType,C}get stride(){if(this._lastAligned!==this._fields.size){let C=1;this._fields.forEach(O=>C=Math.max(C,(0,B.n1)(O.constructor.ElementType))),this._stride=Math.floor((this._stride+C-1)/C)*C,this._lastAligned=this._fields.size}return this._stride}get fields(){return this._fields}}function A(){return new D}class N{constructor(C){this.fields=new Array,C.fields.forEach((O,$)=>{const Z={...O,constructor:b(O.constructor)};this.fields.push([$,Z])}),this.stride=C.stride}}const X=[y.ly,y.Eu,y.ct,y.ek,y.gK,y.bj,y.oS,y.q6,y.fP,y.Cd,y.ey,y.O1,y.D_,y.xA,y.ne,y.mc,y.av,y.TS,y.mw,y.v6,y.Nu,y.qt,y.G5,y.hu,y.Hz,y.Vs,y.P_,y.ir,y.o7,y.or,y.n1,y.zO,y.Jj,y.wA,y.PP,y.TN];function b(F){return`${F.ElementType}_${F.ElementCount}`}const ue=new Map;X.forEach(F=>ue.set(b(F),F))},82658:(xe,te,_)=>{_.d(te,{A:()=>H});var y=_(69676),B=_(53299);function H(I){I.vertex.code.add(B.H`
    vec4 decodeSymbolColor(vec4 symbolColor, out int colorMixMode) {
      float symbolAlpha = 0.0;

      const float maxTint = 85.0;
      const float maxReplace = 170.0;
      const float scaleAlpha = 3.0;

      if (symbolColor.a > maxReplace) {
        colorMixMode = ${B.H.int(y.a9.Multiply)};
        symbolAlpha = scaleAlpha * (symbolColor.a - maxReplace);
      } else if (symbolColor.a > maxTint) {
        colorMixMode = ${B.H.int(y.a9.Replace)};
        symbolAlpha = scaleAlpha * (symbolColor.a - maxTint);
      } else if (symbolColor.a > 0.0) {
        colorMixMode = ${B.H.int(y.a9.Tint)};
        symbolAlpha = scaleAlpha * symbolColor.a;
      } else {
        colorMixMode = ${B.H.int(y.a9.Multiply)};
        symbolAlpha = 0.0;
      }

      return vec4(symbolColor.r, symbolColor.g, symbolColor.b, symbolAlpha);
    }
  `)}},88290:(xe,te,_)=>{_.d(te,{Zu:()=>A,bA:()=>N,qj:()=>X});var y=_(42596),B=_(96904),H=_(22946),I=_(53299);function D(b){b.varyings.add("linearDepth","float")}function A(b){b.vertex.uniforms.add(new H.A("nearFar",(K,ue)=>ue.camera.nearFar))}function N(b){b.vertex.code.add(I.H`float calculateLinearDepth(vec2 nearFar,float z) {
return (-z - nearFar[0]) / (nearFar[1] - nearFar[0]);
}`)}function X(b,K){const{vertex:ue}=b;switch(K.output){case y.H_.Color:if(K.receiveShadows)return D(b),void ue.code.add(I.H`void forwardLinearDepth() { linearDepth = gl_Position.w; }`);break;case y.H_.Shadow:case y.H_.ShadowHighlight:case y.H_.ShadowExcludeHighlight:case y.H_.ViewshedShadow:return b.include(B.up,K),D(b),A(b),N(b),void ue.code.add(I.H`void forwardLinearDepth() {
linearDepth = calculateLinearDepth(nearFar, vPosition_view.z);
}`)}ue.code.add(I.H`void forwardLinearDepth() {}`)}},46038:(xe,te,_)=>{_.d(te,{w:()=>B});var y=_(53299);function B(H){H.vertex.code.add(y.H`vec4 offsetBackfacingClipPosition(vec4 posClip, vec3 posWorld, vec3 normalWorld, vec3 camPosWorld) {
vec3 camToVert = posWorld - camPosWorld;
bool isBackface = dot(camToVert, normalWorld) > 0.0;
if (isBackface) {
posClip.z += 0.0000003 * posClip.w;
}
return posClip;
}`)}},84415:(xe,te,_)=>{_.d(te,{k:()=>H});var y=_(53299),B=_(55362);function H(I,D=!0){I.attributes.add(B.T.POSITION,"vec2"),D&&I.varyings.add("uv","vec2"),I.vertex.code.add(y.H`
    void main(void) {
      gl_Position = vec4(position, 0.0, 1.0);
      ${D?y.H`uv = position * 0.5 + vec2(0.5);`:""}
    }
  `)}},42596:(xe,te,_)=>{var y,O;function H(O){return O===y.Shadow||O===y.ShadowHighlight||O===y.ShadowExcludeHighlight||O===y.ViewshedShadow}function I(O){return function F(O){return function ue(O){return function N(O){return O===y.Color}(O)||function D(O){return O===y.Highlight||O===y.ObjectAndLayerIdColor}(O)}(O)||function C(O){return O===y.Depth}(O)}(O)||O===y.Normal}_.d(te,{H_:()=>y,Jb:()=>I,Kr:()=>H}),(O=y||(y={}))[O.Color=0]="Color",O[O.Depth=1]="Depth",O[O.Normal=2]="Normal",O[O.Shadow=3]="Shadow",O[O.ShadowHighlight=4]="ShadowHighlight",O[O.ShadowExcludeHighlight=5]="ShadowExcludeHighlight",O[O.ViewshedShadow=6]="ViewshedShadow",O[O.Highlight=7]="Highlight",O[O.ObjectAndLayerIdColor=8]="ObjectAndLayerIdColor",O[O.COUNT=9]="COUNT"},69347:(xe,te,_)=>{_.d(te,{f5:()=>K});var y=_(39061),B=_(41666),H=_(43548),I=_(73145),D=_(41841),N=(_(85938),_(53299));function K(ee,Q){!function ue(ee,Q,...q){if(!Q.hasSlicePlane){const me=N.H`#define rejectBySlice(_pos_) false
#define discardBySlice(_pos_) {}
#define highlightSlice(_color_, _pos_) (_color_)`;return Q.hasSliceInVertexProgram&&ee.vertex.code.add(me),void ee.fragment.code.add(me)}Q.hasSliceInVertexProgram&&ee.vertex.uniforms.add(...q),ee.fragment.uniforms.add(...q);const W=N.H`struct SliceFactors {
float front;
float side0;
float side1;
float side2;
float side3;
};
SliceFactors calculateSliceFactors(vec3 pos) {
vec3 rel = pos - slicePlaneOrigin;
vec3 slicePlaneNormal = -cross(slicePlaneBasis1, slicePlaneBasis2);
float slicePlaneW = -dot(slicePlaneNormal, slicePlaneOrigin);
float basis1Len2 = dot(slicePlaneBasis1, slicePlaneBasis1);
float basis2Len2 = dot(slicePlaneBasis2, slicePlaneBasis2);
float basis1Dot = dot(slicePlaneBasis1, rel);
float basis2Dot = dot(slicePlaneBasis2, rel);
return SliceFactors(
dot(slicePlaneNormal, pos) + slicePlaneW,
-basis1Dot - basis1Len2,
basis1Dot - basis1Len2,
-basis2Dot - basis2Len2,
basis2Dot - basis2Len2
);
}
bool sliceByFactors(SliceFactors factors) {
return factors.front < 0.0
&& factors.side0 < 0.0
&& factors.side1 < 0.0
&& factors.side2 < 0.0
&& factors.side3 < 0.0;
}
bool sliceEnabled() {
return dot(slicePlaneBasis1, slicePlaneBasis1) != 0.0;
}
bool sliceByPlane(vec3 pos) {
return sliceEnabled() && sliceByFactors(calculateSliceFactors(pos));
}
#define rejectBySlice(_pos_) sliceByPlane(_pos_)
#define discardBySlice(_pos_) { if (sliceByPlane(_pos_)) discard; }`,oe=N.H`vec4 applySliceHighlight(vec4 color, vec3 pos) {
SliceFactors factors = calculateSliceFactors(pos);
const float HIGHLIGHT_WIDTH = 1.0;
const vec4 HIGHLIGHT_COLOR = vec4(0.0, 0.0, 0.0, 0.3);
factors.front /= (2.0 * HIGHLIGHT_WIDTH) * fwidth(factors.front);
factors.side0 /= (2.0 * HIGHLIGHT_WIDTH) * fwidth(factors.side0);
factors.side1 /= (2.0 * HIGHLIGHT_WIDTH) * fwidth(factors.side1);
factors.side2 /= (2.0 * HIGHLIGHT_WIDTH) * fwidth(factors.side2);
factors.side3 /= (2.0 * HIGHLIGHT_WIDTH) * fwidth(factors.side3);
if (sliceByFactors(factors)) {
return color;
}
float highlightFactor = (1.0 - step(0.5, factors.front))
* (1.0 - step(0.5, factors.side0))
* (1.0 - step(0.5, factors.side1))
* (1.0 - step(0.5, factors.side2))
* (1.0 - step(0.5, factors.side3));
return mix(color, vec4(HIGHLIGHT_COLOR.rgb, color.a), highlightFactor * HIGHLIGHT_COLOR.a);
}`,ce=Q.hasSliceHighlight?N.H`
        ${oe}
        #define highlightSlice(_color_, _pos_) (sliceEnabled() ? applySliceHighlight(_color_, _pos_) : (_color_))
      `:N.H`#define highlightSlice(_color_, _pos_) (_color_)`;Q.hasSliceInVertexProgram&&ee.vertex.code.add(W),ee.fragment.code.add(W),ee.fragment.code.add(ce)}(ee,Q,new D.B("slicePlaneOrigin",(q,W)=>function $(ee,Q,q){if(null==q.slicePlane)return I.AG;const W=F(ee,Q,q),oe=C(W,q.slicePlane),ce=O(ee,W,q);return null!=ce?(0,H.h)(V,oe,ce):oe}(Q,q,W)),new D.B("slicePlaneBasis1",(q,W)=>Z(Q,q,W,W.slicePlane?.basis1)),new D.B("slicePlaneBasis2",(q,W)=>Z(Q,q,W,W.slicePlane?.basis2)))}function F(ee,Q,q){return ee.instancedDoublePrecision?(0,H.s)(k,q.camera.viewInverseTransposeMatrix[3],q.camera.viewInverseTransposeMatrix[7],q.camera.viewInverseTransposeMatrix[11]):Q.slicePlaneLocalOrigin}function C(ee,Q){return null!=ee?(0,H.f)(V,Q.origin,ee):Q.origin}function O(ee,Q,q){return ee.hasSliceTranslatedView?null!=Q?(0,y.Iu)(j,q.camera.viewMatrix,Q):q.camera.viewMatrix:null}function Z(ee,Q,q,W){if(null==W||null==q.slicePlane)return I.AG;const oe=F(ee,Q,q),ce=C(oe,q.slicePlane),me=O(ee,oe,q);return null!=me?((0,H.g)(se,W,ce),(0,H.h)(V,ce,me),(0,H.h)(se,se,me),(0,H.f)(se,se,V)):W}const k=(0,I.Ue)(),V=(0,I.Ue)(),se=(0,I.Ue)(),j=(0,B.Ue)()},97838:(xe,te,_)=>{_.d(te,{w:()=>H});var y=_(88290),B=_(53299);function H(I){(0,y.bA)(I),I.vertex.code.add(B.H`vec4 transformPositionWithDepth(mat4 proj, mat4 view, vec3 pos, vec2 nearFar, out float depth) {
vec4 eye = view * vec4(pos, 1.0);
depth = calculateLinearDepth(nearFar,eye.z);
return proj * eye;
}`),I.vertex.code.add(B.H`vec4 transformPosition(mat4 proj, mat4 view, vec3 pos) {
return proj * (view * vec4(pos, 1.0));
}`)}},67555:(xe,te,_)=>{_.d(te,{PO:()=>k,fQ:()=>j});var y=_(50484),B=_(92899),H=_(38519),I=_(41666),D=_(43548),A=_(73145),N=_(42596),X=_(59866),b=_(63982),K=_(41841),ue=_(53299),F=_(11405),C=_(73205),O=_(61842),$=_(55362),Z=_(8648);class k extends O.m{constructor(){super(...arguments),this.instancedDoublePrecision=!1,this.hasModelTransformation=!1}}(0,y._)([(0,O.o)()],k.prototype,"instancedDoublePrecision",void 0),(0,y._)([(0,O.o)()],k.prototype,"hasModelTransformation",void 0);const se=(0,H.Ue)();function j(Q,q){const W=q.hasModelTransformation,oe=q.instancedDoublePrecision;W&&(Q.vertex.uniforms.add(new C.g("model",me=>me.modelTransformation??I.Wd)),Q.vertex.uniforms.add(new F.c("normalLocalOriginFromModel",me=>((0,B.XL)(se,me.modelTransformation??I.Wd),se)))),q.instanced&&oe&&(Q.attributes.add($.T.INSTANCEMODELORIGINHI,"vec3"),Q.attributes.add($.T.INSTANCEMODELORIGINLO,"vec3"),Q.attributes.add($.T.INSTANCEMODEL,"mat3"),Q.attributes.add($.T.INSTANCEMODELNORMAL,"mat3"));const ce=Q.vertex;oe&&(ce.include(X.$,q),ce.uniforms.add(new K.B("viewOriginHi",(me,Me)=>(0,Z.U8)((0,D.s)(ee,Me.camera.viewInverseTransposeMatrix[3],Me.camera.viewInverseTransposeMatrix[7],Me.camera.viewInverseTransposeMatrix[11]),ee)),new K.B("viewOriginLo",(me,Me)=>(0,Z.GB)((0,D.s)(ee,Me.camera.viewInverseTransposeMatrix[3],Me.camera.viewInverseTransposeMatrix[7],Me.camera.viewInverseTransposeMatrix[11]),ee)))),ce.code.add(ue.H`
    vec3 getVertexInLocalOriginSpace() {
      return ${W?oe?"(model * vec4(instanceModel * localPosition().xyz, 1.0)).xyz":"(model * localPosition()).xyz":oe?"instanceModel * localPosition().xyz":"localPosition().xyz"};
    }

    vec3 subtractOrigin(vec3 _pos) {
      ${oe?ue.H`
          // Negated inputs are intentionally the first two arguments. The other way around the obfuscation in dpAdd() stopped
          // working for macOS 14+ and iOS 17+.
          // Issue: https://devtopia.esri.com/WebGIS/arcgis-js-api/issues/56280
          vec3 originDelta = dpAdd(-instanceModelOriginHi, -instanceModelOriginLo, viewOriginHi, viewOriginLo);
          return _pos - originDelta;`:"return vpos;"}
    }
    `),ce.code.add(ue.H`
    vec3 dpNormal(vec4 _normal) {
      return normalize(${W?oe?"normalLocalOriginFromModel * (instanceModelNormal * _normal.xyz)":"normalLocalOriginFromModel * _normal.xyz":oe?"instanceModelNormal * _normal.xyz":"_normal.xyz"});
    }
    `),q.output===N.H_.Normal&&((0,b._8)(ce),ce.code.add(ue.H`
    vec3 dpNormalView(vec4 _normal) {
      return normalize((viewNormal * ${W?oe?"vec4(normalLocalOriginFromModel * (instanceModelNormal * _normal.xyz), 1.0)":"vec4(normalLocalOriginFromModel * _normal.xyz, 1.0)":oe?"vec4(instanceModelNormal * _normal.xyz, 1.0)":"_normal"}).xyz);
    }
    `)),q.hasVertexTangents&&ce.code.add(ue.H`
    vec4 dpTransformVertexTangent(vec4 _tangent) {
      ${W?oe?"return vec4(normalLocalOriginFromModel * (instanceModelNormal * _tangent.xyz), _tangent.w);":"return vec4(normalLocalOriginFromModel * _tangent.xyz, _tangent.w);":oe?"return vec4(instanceModelNormal * _tangent.xyz, _tangent.w);":"return _tangent;"}
    }`)}const ee=(0,A.Ue)()},5660:(xe,te,_)=>{_.d(te,{O:()=>I,r:()=>D});var D,A,y=_(480),B=_(53299),H=_(55362);function I(A,N){switch(N.normalType){case D.Compressed:A.attributes.add(H.T.NORMALCOMPRESSED,"vec2"),A.vertex.code.add(B.H`vec3 decompressNormal(vec2 normal) {
float z = 1.0 - abs(normal.x) - abs(normal.y);
return vec3(normal + sign(normal) * min(z, 0.0), z);
}
vec3 normalModel() {
return decompressNormal(normalCompressed);
}`);break;case D.Attribute:A.attributes.add(H.T.NORMAL,"vec3"),A.vertex.code.add(B.H`vec3 normalModel() {
return normal;
}`);break;case D.ScreenDerivative:A.fragment.code.add(B.H`vec3 screenDerivativeNormal(vec3 positionView) {
return normalize(cross(dFdx(positionView), dFdy(positionView)));
}`);break;default:(0,y.Bg)(N.normalType);case D.COUNT:case D.Ground:}}(A=D||(D={}))[A.Attribute=0]="Attribute",A[A.Compressed=1]="Compressed",A[A.Ground=2]="Ground",A[A.ScreenDerivative=3]="ScreenDerivative",A[A.COUNT=4]="COUNT"},3987:(xe,te,_)=>{_.d(te,{f:()=>H});var y=_(53299),B=_(55362);function H(I){I.attributes.add(B.T.POSITION,"vec3"),I.vertex.code.add(y.H`vec3 positionModel() { return position; }`)}},1245:(xe,te,_)=>{_.d(te,{R:()=>A});var y=_(82658),B=_(5718),H=_(53299),I=_(55362),D=_(22868);function A(N,X){X.hasSymbolColors?(N.include(y.A),N.attributes.add(I.T.SYMBOLCOLOR,"vec4"),N.varyings.add("colorMixMode","mediump float"),N.vertex.code.add(H.H`int symbolColorMixMode;
vec4 getSymbolColor() {
return decodeSymbolColor(symbolColor, symbolColorMixMode) * 0.003921568627451;
}
void forwardColorMixMode() {
colorMixMode = float(symbolColorMixMode) + 0.5;
}`)):(N.fragment.uniforms.add(new B._("colorMixMode",b=>D.FZ[b.colorMixMode])),N.vertex.code.add(H.H`vec4 getSymbolColor() { return vec4(1.0); }
void forwardColorMixMode() {}`))}},95781:(xe,te,_)=>{_.d(te,{D:()=>D,N:()=>I});var I,A,y=_(480),B=_(53299),H=_(55362);function D(A,N){switch(N.textureCoordinateType){case I.Default:return A.attributes.add(H.T.UV0,"vec2"),A.varyings.add("vuv0","vec2"),void A.vertex.code.add(B.H`void forwardTextureCoordinates() {
vuv0 = uv0;
}`);case I.Compressed:return A.attributes.add(H.T.UV0,"vec2"),A.varyings.add("vuv0","vec2"),void A.vertex.code.add(B.H`vec2 getUV0() {
return uv0 / 16384.0;
}
void forwardTextureCoordinates() {
vuv0 = getUV0();
}`);case I.Atlas:return A.attributes.add(H.T.UV0,"vec2"),A.varyings.add("vuv0","vec2"),A.attributes.add(H.T.UVREGION,"vec4"),A.varyings.add("vuvRegion","vec4"),void A.vertex.code.add(B.H`void forwardTextureCoordinates() {
vuv0 = uv0;
vuvRegion = uvRegion;
}`);default:(0,y.Bg)(N.textureCoordinateType);case I.None:return void A.vertex.code.add(B.H`void forwardTextureCoordinates() {}`);case I.COUNT:return}}(A=I||(I={}))[A.None=0]="None",A[A.Default=1]="Default",A[A.Atlas=2]="Atlas",A[A.Compressed=3]="Compressed",A[A.COUNT=4]="COUNT"},24404:(xe,te,_)=>{_.d(te,{c:()=>H});var y=_(53299),B=_(55362);function H(I,D){D.hasVertexColors?(I.attributes.add(B.T.COLOR,"vec4"),I.varyings.add("vColor","vec4"),I.vertex.code.add(y.H`void forwardVertexColor() { vColor = color; }`),I.vertex.code.add(y.H`void forwardNormalizedVertexColor() { vColor = color * 0.003921568627451; }`)):I.vertex.code.add(y.H`void forwardVertexColor() {}
void forwardNormalizedVertexColor() {}`)}},66541:(xe,te,_)=>{_.d(te,{Bb:()=>b,d4:()=>K});var y=_(480),B=_(38519),I=(_(23515),_(5660)),D=_(96904),A=_(53299),N=_(1159),X=_(11405);function b(F,C){switch(C.normalType){case I.r.Attribute:case I.r.Compressed:F.include(I.O,C),F.varyings.add("vNormalWorld","vec3"),F.varyings.add("vNormalView","vec3"),F.vertex.uniforms.add(new N.j("transformNormalGlobalFromModel",O=>O.transformNormalGlobalFromModel),new X.c("transformNormalViewFromGlobal",O=>O.transformNormalViewFromGlobal)),F.vertex.code.add(A.H`void forwardNormal() {
vNormalWorld = transformNormalGlobalFromModel * normalModel();
vNormalView = transformNormalViewFromGlobal * vNormalWorld;
}`);break;case I.r.Ground:F.include(D.up,C),F.varyings.add("vNormalWorld","vec3"),F.vertex.code.add(A.H`
        void forwardNormal() {
          vNormalWorld = ${C.spherical?A.H`normalize(vPositionWorldCameraRelative);`:A.H`vec3(0.0, 0.0, 1.0);`}
        }
        `);break;case I.r.ScreenDerivative:F.vertex.code.add(A.H`void forwardNormal() {}`);break;default:(0,y.Bg)(C.normalType);case I.r.COUNT:}}class K extends D.su{constructor(){super(...arguments),this.transformNormalViewFromGlobal=(0,B.Ue)()}}},96904:(xe,te,_)=>{_.d(te,{su:()=>C,up:()=>F});var y=_(38519),B=_(41666),H=_(73145),I=_(3987),D=_(59866),A=_(41841),N=_(85938),X=_(53299),b=_(1159),K=_(11405),ue=_(73205);function F($,Z){$.include(I.f);const k=$.vertex;k.include(D.$,Z),$.varyings.add("vPositionWorldCameraRelative","vec3"),$.varyings.add("vPosition_view","vec3"),k.uniforms.add(new N.J("transformWorldFromViewTH",V=>V.transformWorldFromViewTH),new N.J("transformWorldFromViewTL",V=>V.transformWorldFromViewTL),new K.c("transformViewFromCameraRelativeRS",V=>V.transformViewFromCameraRelativeRS),new ue.g("transformProjFromView",V=>V.transformProjFromView),new b.j("transformWorldFromModelRS",V=>V.transformWorldFromModelRS),new A.B("transformWorldFromModelTH",V=>V.transformWorldFromModelTH),new A.B("transformWorldFromModelTL",V=>V.transformWorldFromModelTL)),k.code.add(X.H`vec3 positionWorldCameraRelative() {
vec3 rotatedModelPosition = transformWorldFromModelRS * positionModel();
vec3 transform_CameraRelativeFromModel = dpAdd(
transformWorldFromModelTL,
transformWorldFromModelTH,
-transformWorldFromViewTL,
-transformWorldFromViewTH
);
return transform_CameraRelativeFromModel + rotatedModelPosition;
}`),k.code.add(X.H`
    void forwardPosition(float fOffset) {
      vPositionWorldCameraRelative = positionWorldCameraRelative();
      if (fOffset != 0.0) {
        vPositionWorldCameraRelative += fOffset * ${Z.spherical?X.H`normalize(transformWorldFromViewTL + vPositionWorldCameraRelative)`:X.H`vec3(0.0, 0.0, 1.0)`};
      }

      vPosition_view = transformViewFromCameraRelativeRS * vPositionWorldCameraRelative;
      gl_Position = transformProjFromView * vec4(vPosition_view, 1.0);
    }
  `),$.fragment.uniforms.add(new N.J("transformWorldFromViewTL",V=>V.transformWorldFromViewTL)),k.code.add(X.H`vec3 positionWorld() {
return transformWorldFromViewTL + vPositionWorldCameraRelative;
}`),$.fragment.code.add(X.H`vec3 positionWorld() {
return transformWorldFromViewTL + vPositionWorldCameraRelative;
}`)}class C extends X.K{constructor(){super(...arguments),this.transformWorldFromViewTH=(0,H.Ue)(),this.transformWorldFromViewTL=(0,H.Ue)(),this.transformViewFromCameraRelativeRS=(0,y.Ue)(),this.transformProjFromView=(0,B.Ue)()}}},81285:(xe,te,_)=>{_.d(te,{i:()=>D});var y=_(480),B=_(95781),H=_(53299);function I(A){A.fragment.code.add(H.H`vec4 textureAtlasLookup(sampler2D tex, vec2 textureCoordinates, vec4 atlasRegion) {
vec2 atlasScale = atlasRegion.zw - atlasRegion.xy;
vec2 uvAtlas = fract(textureCoordinates) * atlasScale + atlasRegion.xy;
float maxdUV = 0.125;
vec2 dUVdx = clamp(dFdx(textureCoordinates), -maxdUV, maxdUV) * atlasScale;
vec2 dUVdy = clamp(dFdy(textureCoordinates), -maxdUV, maxdUV) * atlasScale;
return textureGrad(tex, uvAtlas, dUVdx, dUVdy);
}`)}function D(A,N){switch(A.include(B.D,N),N.textureCoordinateType){case B.N.Default:case B.N.Compressed:return void A.fragment.code.add(H.H`vec4 textureLookup(sampler2D tex, vec2 uv) {
return texture(tex, uv);
}`);case B.N.Atlas:return A.include(I),void A.fragment.code.add(H.H`vec4 textureLookup(sampler2D tex, vec2 uv) {
return textureAtlasLookup(tex, uv, vuvRegion);
}`);default:(0,y.Bg)(N.textureCoordinateType);case B.N.None:case B.N.COUNT:return}}},49355:(xe,te,_)=>{_.d(te,{L:()=>O});var y=_(5710),B=_(23515),H=_(43548),I=_(73145),D=_(85938),A=_(53299);function N(k){k.vertex.code.add(A.H`float screenSizePerspectiveViewAngleDependentFactor(float absCosAngle) {
return absCosAngle * absCosAngle * absCosAngle;
}`),k.vertex.code.add(A.H`vec3 screenSizePerspectiveScaleFactor(float absCosAngle, float distanceToCamera, vec3 params) {
return vec3(
min(params.x / (distanceToCamera - params.y), 1.0),
screenSizePerspectiveViewAngleDependentFactor(absCosAngle),
params.z
);
}`),k.vertex.code.add(A.H`float applyScreenSizePerspectiveScaleFactorFloat(float size, vec3 factor) {
return mix(size * clamp(factor.x, factor.z, 1.0), size, factor.y);
}`),k.vertex.code.add(A.H`float screenSizePerspectiveScaleFloat(float size, float absCosAngle, float distanceToCamera, vec3 params) {
return applyScreenSizePerspectiveScaleFactorFloat(
size,
screenSizePerspectiveScaleFactor(absCosAngle, distanceToCamera, params)
);
}`),k.vertex.code.add(A.H`vec2 applyScreenSizePerspectiveScaleFactorVec2(vec2 size, vec3 factor) {
return mix(size * clamp(factor.x, factor.z, 1.0), size, factor.y);
}`),k.vertex.code.add(A.H`vec2 screenSizePerspectiveScaleVec2(vec2 size, float absCosAngle, float distanceToCamera, vec3 params) {
return applyScreenSizePerspectiveScaleFactorVec2(size, screenSizePerspectiveScaleFactor(absCosAngle, distanceToCamera, params));
}`)}const ue=(0,I.Ue)();var F=_(63982),C=_(93528);function O(k,V){const se=k.vertex;V.hasVerticalOffset?(function Z(k){k.uniforms.add(new C.N("verticalOffset",(V,se)=>{const{minWorldLength:j,maxWorldLength:ee,screenLength:Q}=V.verticalOffset,q=Math.tan(.5*se.camera.fovY)/(.5*se.camera.fullViewport[3]);return(0,y.s)($,Q*(se.camera.pixelRatio||1),q,j,ee)}))}(se),V.hasScreenSizePerspective&&(k.include(N),function b(k){k.uniforms.add(new D.J("screenSizePerspectiveAlignment",V=>function K(k){return(0,H.s)(ue,k.parameters.divisor,k.parameters.offset,k.minScaleFactor)}(V.screenSizePerspectiveAlignment||V.screenSizePerspective)))}(se),(0,F.hY)(k.vertex,V)),se.code.add(A.H`
      vec3 calculateVerticalOffset(vec3 worldPos, vec3 localOrigin) {
        float viewDistance = length((view * vec4(worldPos, 1.0)).xyz);
        ${V.spherical?A.H`vec3 worldNormal = normalize(worldPos + localOrigin);`:A.H`vec3 worldNormal = vec3(0.0, 0.0, 1.0);`}
        ${V.hasScreenSizePerspective?A.H`
            float cosAngle = dot(worldNormal, normalize(worldPos - cameraPosition));
            float verticalOffsetScreenHeight = screenSizePerspectiveScaleFloat(verticalOffset.x, abs(cosAngle), viewDistance, screenSizePerspectiveAlignment);`:A.H`
            float verticalOffsetScreenHeight = verticalOffset.x;`}
        // Screen sized offset in world space, used for example for line callouts
        float worldOffset = clamp(verticalOffsetScreenHeight * verticalOffset.y * viewDistance, verticalOffset.z, verticalOffset.w);
        return worldNormal * worldOffset;
      }

      vec3 addVerticalOffset(vec3 worldPos, vec3 localOrigin) {
        return worldPos + calculateVerticalOffset(worldPos, localOrigin);
      }
    `)):se.code.add(A.H`vec3 addVerticalOffset(vec3 worldPos, vec3 localOrigin) { return worldPos; }`)}const $=(0,B.Ue)()},91719:(xe,te,_)=>{_.d(te,{s:()=>Q});var y=_(88290),B=_(42596),H=_(69347),I=_(97838),D=_(5660),A=_(53299),N=_(55362);function X(q,W){const oe=W.output===B.H_.ObjectAndLayerIdColor,ce=W.objectAndLayerIdColorInstanced;oe&&(q.varyings.add("objectAndLayerIdColorVarying","vec4"),q.attributes.add(ce?N.T.INSTANCEOBJECTANDLAYERIDCOLOR:N.T.OBJECTANDLAYERIDCOLOR,"vec4")),q.vertex.code.add(A.H`
     void forwardObjectAndLayerIdColor() {
      ${oe?ce?A.H`objectAndLayerIdColorVarying = instanceObjectAndLayerIdColor * 0.003921568627451;`:A.H`objectAndLayerIdColorVarying = objectAndLayerIdColor * 0.003921568627451;`:A.H``} }`),q.fragment.code.add(A.H`
      void outputObjectAndLayerIdColor() {
        ${oe?A.H`fragColor = objectAndLayerIdColorVarying;`:A.H``} }`)}var b=_(95781),K=_(66541),ue=_(2012);function F(q,W){switch(W.output){case B.H_.Shadow:case B.H_.ShadowHighlight:case B.H_.ShadowExcludeHighlight:case B.H_.ViewshedShadow:q.fragment.include(ue.f),q.fragment.code.add(A.H`float _calculateFragDepth(const in float depth) {
const float SLOPE_SCALE = 2.0;
const float BIAS = 20.0 * .000015259;
float m = max(abs(dFdx(depth)), abs(dFdy(depth)));
return depth + SLOPE_SCALE * m + BIAS;
}
void outputDepth(float _linearDepth) {
fragColor = floatToRgba4(_calculateFragDepth(_linearDepth));
}`)}}var C=_(23515),O=_(63243);const $=(0,C.al)(1,1,0,1),Z=(0,C.al)(1,0,1,1);function k(q){q.fragment.uniforms.add(new O.A("depthTexture",(W,oe)=>oe.mainDepth)),q.fragment.constants.add("occludedHighlightFlag","vec4",$).add("unoccludedHighlightFlag","vec4",Z),q.fragment.code.add(A.H`void outputHighlight() {
float sceneDepth = float(texelFetch(depthTexture, ivec2(gl_FragCoord.xy), 0).x);
if (gl_FragCoord.z > sceneDepth + 5e-7) {
fragColor = occludedHighlightFlag;
} else {
fragColor = unoccludedHighlightFlag;
}
}`)}var V=_(40900),se=_(52490),j=_(63982),ee=_(15182);function Q(q,W){const{vertex:oe,fragment:ce}=q,me=W.hasColorTexture&&W.alphaDiscardMode!==ee.JJ.Opaque;switch(W.output){case B.H_.Depth:(0,j.Sv)(oe,W),q.include(I.w,W),q.include(H.f5,W),q.include(b.D,W),me&&ce.uniforms.add(new O.A("tex",Me=>Me.texture)),oe.code.add(A.H`void main(void) {
vpos = getVertexInLocalOriginSpace();
vpos = subtractOrigin(vpos);
vpos = addVerticalOffset(vpos, localOrigin);
gl_Position = transformPosition(proj, view, vpos);
forwardTextureCoordinates();
}`),q.include(se.z,W),ce.code.add(A.H`
          void main(void) {
            discardBySlice(vpos);
            ${me?A.H`
                    vec4 texColor = texture(tex, ${W.hasColorTextureTransform?A.H`colorUV`:A.H`vuv0`});
                    discardOrAdjustAlpha(texColor);`:""}
          }
        `);break;case B.H_.Shadow:case B.H_.ShadowHighlight:case B.H_.ShadowExcludeHighlight:case B.H_.ViewshedShadow:case B.H_.ObjectAndLayerIdColor:(0,j.Sv)(oe,W),q.include(I.w,W),q.include(b.D,W),q.include(V.k,W),q.include(F,W),q.include(H.f5,W),q.include(X,W),(0,y.Zu)(q),q.varyings.add("depth","float"),me&&ce.uniforms.add(new O.A("tex",Me=>Me.texture)),oe.code.add(A.H`void main(void) {
vpos = getVertexInLocalOriginSpace();
vpos = subtractOrigin(vpos);
vpos = addVerticalOffset(vpos, localOrigin);
gl_Position = transformPositionWithDepth(proj, view, vpos, nearFar, depth);
forwardTextureCoordinates();
forwardObjectAndLayerIdColor();
}`),q.include(se.z,W),ce.code.add(A.H`
          void main(void) {
            discardBySlice(vpos);
            ${me?A.H`
                    vec4 texColor = texture(tex, ${W.hasColorTextureTransform?A.H`colorUV`:A.H`vuv0`});
                    discardOrAdjustAlpha(texColor);`:""}
            ${W.output===B.H_.ObjectAndLayerIdColor?A.H`outputObjectAndLayerIdColor();`:A.H`outputDepth(depth);`}
          }
        `);break;case B.H_.Normal:(0,j.Sv)(oe,W),q.include(I.w,W),q.include(D.O,W),q.include(K.Bb,W),q.include(b.D,W),q.include(V.k,W),me&&ce.uniforms.add(new O.A("tex",Pe=>Pe.texture)),W.normalType===D.r.ScreenDerivative&&q.varyings.add("vPositionView","vec3"),oe.code.add(A.H`
          void main(void) {
            vpos = getVertexInLocalOriginSpace();

            ${W.normalType===D.r.Attribute||W.normalType===D.r.Compressed?A.H`vNormalWorld = dpNormalView(vvLocalNormal(normalModel()));`:A.H`
                  // Get vertex position in camera space for screen-space derivative normals
                  vPositionView = (view * vec4(vpos, 1.0)).xyz;
                `}
            vpos = subtractOrigin(vpos);
            vpos = addVerticalOffset(vpos, localOrigin);
            gl_Position = transformPosition(proj, view, vpos);
            forwardTextureCoordinates();
          }
        `),q.include(H.f5,W),q.include(se.z,W),ce.code.add(A.H`
          void main() {
            discardBySlice(vpos);
            ${me?A.H`
                    vec4 texColor = texture(tex, ${W.hasColorTextureTransform?A.H`colorUV`:A.H`vuv0`});
                    discardOrAdjustAlpha(texColor);`:""}

            ${W.normalType===D.r.ScreenDerivative?A.H`vec3 normal = screenDerivativeNormal(vPositionView);`:A.H`
                  vec3 normal = normalize(vNormalWorld);
                  if (gl_FrontFacing == false){
                    normal = -normal;
                  }`}
            fragColor = vec4(0.5 + 0.5 * normal, 1.0);
          }
        `);break;case B.H_.Highlight:(0,j.Sv)(oe,W),q.include(I.w,W),q.include(b.D,W),q.include(V.k,W),me&&ce.uniforms.add(new O.A("tex",Me=>Me.texture)),oe.code.add(A.H`void main(void) {
vpos = getVertexInLocalOriginSpace();
vpos = subtractOrigin(vpos);
vpos = addVerticalOffset(vpos, localOrigin);
gl_Position = transformPosition(proj, view, vpos);
forwardTextureCoordinates();
}`),q.include(H.f5,W),q.include(se.z,W),q.include(k,W),ce.code.add(A.H`
          void main() {
            discardBySlice(vpos);
            ${me?A.H`
                    vec4 texColor = texture(tex, ${W.hasColorTextureTransform?A.H`colorUV`:A.H`vuv0`});
                    discardOrAdjustAlpha(texColor);`:""}
            outputHighlight();
          }
        `)}}},79251:(xe,te,_)=>{_.d(te,{K:()=>N});var y=_(29726),B=_(89014),I=(_(24542),_(22946)),D=_(53299);function N(K){K.uniforms.add(new I.A("zProjectionMap",(ue,F)=>function X(K){const ue=K.projectionMatrix;return(0,y.t8)(b,ue[14],ue[10])}(F.camera))),K.code.add(D.H`float linearizeDepth(float depth) {
float depthNdc = depth * 2.0 - 1.0;
float c1 = zProjectionMap[0];
float c2 = zProjectionMap[1];
return -(c1 / (depthNdc + c2 + 1e-7));
}`),K.code.add(D.H`float depthFromTexture(sampler2D depthTexture, vec2 uv) {
ivec2 iuv = ivec2(uv * vec2(textureSize(depthTexture, 0)));
float depth = texelFetch(depthTexture, iuv, 0).r;
return depth;
}`),K.code.add(D.H`float linearDepthFromTexture(sampler2D depthTexture, vec2 uv) {
return linearizeDepth(depthFromTexture(depthTexture, uv));
}`)}const b=(0,B.Ue)()},27589:(xe,te,_)=>{_.d(te,{Q:()=>C});var y=_(38519),B=_(89014),H=_(95781),I=_(81285),D=_(97594),A=_(22946),N=_(53299),X=_(11405),b=_(22166),K=_(63243),ue=_(92426),F=_(55362);function C(O,$){const Z=O.fragment;$.hasVertexTangents?(O.attributes.add(F.T.TANGENT,"vec4"),O.varyings.add("vTangent","vec4"),Z.code.add($.doubleSidedMode===D.q.WindingOrder?N.H`mat3 computeTangentSpace(vec3 normal) {
float tangentHeadedness = gl_FrontFacing ? vTangent.w : -vTangent.w;
vec3 tangent = normalize(gl_FrontFacing ? vTangent.xyz : -vTangent.xyz);
vec3 bitangent = cross(normal, tangent) * tangentHeadedness;
return mat3(tangent, bitangent, normal);
}`:N.H`mat3 computeTangentSpace(vec3 normal) {
float tangentHeadedness = vTangent.w;
vec3 tangent = normalize(vTangent.xyz);
vec3 bitangent = cross(normal, tangent) * tangentHeadedness;
return mat3(tangent, bitangent, normal);
}`)):Z.code.add(N.H`mat3 computeTangentSpace(vec3 normal, vec3 pos, vec2 st) {
vec3 Q1 = dFdx(pos);
vec3 Q2 = dFdy(pos);
vec2 stx = dFdx(st);
vec2 sty = dFdy(st);
float det = stx.t * sty.s - sty.t * stx.s;
vec3 T = stx.t * Q2 - sty.t * Q1;
T = T - normal * dot(normal, T);
T *= inversesqrt(max(dot(T,T), 1.e-10));
vec3 B = sign(det) * cross(normal, T);
return mat3(T, B, normal);
}`),$.textureCoordinateType!==H.N.None&&(O.include(I.i,$),Z.uniforms.add($.pbrTextureBindType===ue.P.Pass?new K.A("normalTexture",k=>k.textureNormal):new b.R("normalTexture",k=>k.textureNormal)),$.hasNormalTextureTransform&&(Z.uniforms.add(new A.A("scale",k=>k.scale??B.hq)),Z.uniforms.add(new X.c("normalTextureTransformMatrix",k=>k.normalTextureTransformMatrix??y.Wd))),Z.code.add(N.H`vec3 computeTextureNormal(mat3 tangentSpace, vec2 uv) {
vec3 rawNormal = textureLookup(normalTexture, uv).rgb * 2.0 - 1.0;`),$.hasNormalTextureTransform&&Z.code.add(N.H`mat3 normalTextureRotation = mat3(normalTextureTransformMatrix[0][0]/scale[0], normalTextureTransformMatrix[0][1]/scale[1], 0.0,
normalTextureTransformMatrix[1][0]/scale[0], normalTextureTransformMatrix[1][1]/scale[1], 0.0,
0.0, 0.0, 0.0 );
rawNormal.xy = (normalTextureRotation * vec3(rawNormal.x, rawNormal.y, 1.0)).xy;`),Z.code.add(N.H`return tangentSpace * rawNormal;
}`))}},30662:(xe,te,_)=>{_.d(te,{K:()=>be});var O,$,Ce,y=_(53299),B=_(63243),H=_(50484),I=_(55117),D=_(51172),A=_(77675),N=_(95854),X=_(80543),F=(_(14007),_(4703),_(65311),_(10141)),C=_(29726);(Ce=O||(O={}))[Ce.RED=0]="RED",Ce[Ce.RG=1]="RG",Ce[Ce.RGBA4=2]="RGBA4",Ce[Ce.RGBA=3]="RGBA",Ce[Ce.RGBA_MIPMAP=4]="RGBA_MIPMAP",Ce[Ce.R16F=5]="R16F",Ce[Ce.RGBA16F=6]="RGBA16F",function(Ce){Ce[Ce.DEPTH_STENCIL_TEXTURE=0]="DEPTH_STENCIL_TEXTURE",Ce[Ce.DEPTH16_BUFFER=1]="DEPTH16_BUFFER"}($||($={}));var Z=_(73514),k=_(57964),V=_(15182);let se=class extends Z.Z{constructor(Ce){super(Ce),this.view=null,this.consumes={required:[]},this.produces="composite-color",this._context=null,this._dirty=!0}initialize(){this.addHandles([(0,A.YP)(()=>this.view.ready,Ce=>{Ce&&this.view._stage?.renderer.addRenderNode(this)},A.nn)])}destroy(){this.view._stage?.renderer?.removeRenderNode(this)}render(){throw new k.Z("RenderNode:render-function-not-implemented","render() is not implemented.")}get camera(){return this.view.state.camera.clone()}get sunLight(){return this.bindParameters.lighting.legacy}get gl(){return this.view._stage.renderView.renderingContext.gl}acquireOutputFramebuffer(){const Ce=this._frameBuffer?.getTexture()?.descriptor,Be=this.view._stage.renderer.fboCache.acquire(Ce?.width??640,Ce?.height??480,this.produces);return Be.fbo?.initializeAndBind(),Be}bindRenderTarget(){return this._frameBuffer?.fbo?.initializeAndBind(),this._frameBuffer}requestRender(Ce){Ce===V.Xx.UPDATE&&this.view._stage?.renderView.requestRender(Ce),this._dirty=!0}resetWebGLState(){this.renderingContext.resetState(),this.renderingContext.bindFramebuffer(this._frameBuffer?.fbo)}get fboCache(){return this.view._stage.renderer.fboCache}get bindParameters(){return this._context.bindParameters}get renderingContext(){return this.view._stage.renderView.renderingContext}updateAnimation(){return!!this._dirty&&(this._dirty=!1,!0)}doRender(Ce,Be){this._context=Be,this._frameBuffer=Ce.find(({name:_t})=>_t===this.produces);try{return this.render(Ce)}finally{this._frameBuffer=null}}};(0,H._)([(0,X.Cb)({constructOnly:!0})],se.prototype,"view",void 0),(0,H._)([(0,X.Cb)({constructOnly:!0})],se.prototype,"consumes",void 0),(0,H._)([(0,X.Cb)()],se.prototype,"produces",void 0),se=(0,H._)([(0,F.j)("esri.views.3d.webgl.RenderNode")],se);const j=se;var q=_(74532),W=_(690),oe=_(11661),ce=_(97940),me=_(75475),Me=_(89877);class Pe extends W.A{initializeProgram(Be){return new ce.$(Be.rctx,Pe.shader.get().build(),oe.i)}initializePipeline(){return(0,Me.sm)({colorWrite:Me.BK})}}Pe.shader=new q.J(me.S,()=>_.e(4373).then(_.bind(_,44373)));var at=_(89014);class st extends y.K{constructor(){super(...arguments),this.projScale=1}}class Le extends st{constructor(){super(...arguments),this.intensity=1}}class rt extends y.K{}class lt extends rt{constructor(){super(...arguments),this.blurSize=(0,at.Ue)()}}var Te=_(55998);class ye extends W.A{initializeProgram(Be){return new ce.$(Be.rctx,ye.shader.get().build(),oe.i)}initializePipeline(){return(0,Me.sm)({colorWrite:Me.BK})}}ye.shader=new q.J(Te.S,()=>_.e(6317).then(_.bind(_,76317)));var pe=_(39237),Je=_(17091),ge=_(22784);const Re=2;let Ye=class extends j{constructor(Ce){super(Ce),this.consumes={required:["normals"]},this.produces="ssao",this.isEnabled=()=>!1,this._enableTime=(0,N.HA)(0),this._passParameters=new Le,this._drawParameters=new lt}initialize(){const Ce=Uint8Array.from(atob("eXKEvZaUc66cjIKElE1jlJ6MjJ6Ufkl+jn2fcXp5jBx7c6KEflSGiXuXeW6OWs+tfqZ2Yot2Y7Zzfo2BhniEj3xoiXuXj4eGZpqEaHKDWjSMe7palFlzc3BziYOGlFVzg6Zzg7CUY5JrjFF7eYJ4jIKEcyyEonSXe7qUfqZ7j3xofqZ2c4R5lFZ5Y0WUbppoe1l2cIh2ezyUho+BcHN2cG6DbpqJhqp2e1GcezhrdldzjFGUcyxjc3aRjDyEc1h7Sl17c6aMjH92pb6Mjpd4dnqBjMOEhqZleIOBYzB7gYx+fnqGjJuEkWlwnCx7fGl+c4hjfGyRe5qMlNOMfnqGhIWHc6OMi4GDc6aMfqZuc6aMzqJzlKZ+lJ6Me3qRfoFue0WUhoR5UraEa6qMkXiPjMOMlJOGe7JrUqKMjK6MeYRzdod+Sl17boiPc6qEeYBlcIh2c1WEe7GDiWCDa0WMjEmMdod+Y0WcdntzhmN8WjyMjKJjiXtzgYxYaGd+a89zlEV7e2GJfnd+lF1rcK5zc4p5cHuBhL6EcXp5eYB7fnh8iX6HjIKEeaxuiYOGc66RfG2Ja5hzjlGMjEmMe9OEgXuPfHyGhPeEdl6JY02McGuMfnqGhFiMa3WJfnx2l4hwcG1uhmN8c0WMc39og1GBbrCEjE2EZY+JcIh2cIuGhIWHe0mEhIVrc09+gY5+eYBlnCyMhGCDl3drfmmMgX15aGd+gYx+fnuRfnhzY1SMsluJfnd+hm98WtNrcIuGh4SEj0qPdkqOjFF7jNNjdnqBgaqUjMt7boeBhnZ4jDR7c5pze4GGjEFrhLqMjHyMc0mUhKZze4WEa117kWlwbpqJjHZ2eX2Bc09zeId+e0V7WlF7jHJ2l72BfId8l3eBgXyBe897jGl7c66cgW+Xc76EjKNbgaSEjGx4fId8jFFjgZB8cG6DhlFziZhrcIh2fH6HgUqBgXiPY8dahGFzjEmMhEFre2dxhoBzc5SGfleGe6alc7aUeYBlhKqUdlp+cH5za4OEczxza0Gcc4J2jHZ5iXuXjH2Jh5yRjH2JcFx+hImBjH+MpddCl3dreZeJjIt8ZW18bm1zjoSEeIOBlF9oh3N7hlqBY4+UeYFwhLJjeYFwaGd+gUqBYxiEYot2fqZ2ondzhL6EYyiEY02Ea0VjgZB8doaGjHxoc66cjEGEiXuXiXWMiZhreHx8frGMe75rY02Ec5pzfnhzlEp4a3VzjM+EhFFza3mUY7Zza1V5e2iMfGyRcziEhDyEkXZ2Y4OBnCx7g5t2eyBjgV6EhEFrcIh2dod+c4Z+nJ5zjm15jEmUeYxijJp7nL6clIpjhoR5WrZraGd+fnuRa6pzlIiMg6ZzfHx5foh+eX1ufnB5eX1ufnB5aJt7UqKMjIh+e3aBfm5lbYSBhGFze6J4c39oc0mUc4Z+e0V7fKFVe0WEdoaGY02Ec4Z+Y02EZYWBfH6HgU1+gY5+hIWUgW+XjJ57ebWRhFVScHuBfJ6PhBx7WqJzlM+Ujpd4gHZziX6HjHmEgZN+lJt5boiPe2GJgX+GjIGJgHZzeaxufnB5hF2JtdN7jJ57hp57hK6ElFVzg6ZzbmiEbndzhIWHe3uJfoFue3qRhJd2j3xoc65zlE1jc3p8lE1jhniEgXJ7e657vZaUc3qBh52BhIF4aHKDa9drgY5+c52GWqZzbpqJe8tjnM+UhIeMfo2BfGl+hG1zSmmMjKJjZVaGgX15c1lze0mEp4OHa3mUhIWHhDyclJ6MeYOJkXiPc0VzhFiMlKaEboSJa5Jze41re3qRhn+HZYWBe0mEc4p5fnORbox5lEp4hGFjhGGEjJuEc1WEhLZjeHeGa7KlfHx2hLaMeX1ugY5+hIWHhKGPjMN7c1WEho1zhoBzZYx7fnhzlJt5exyUhFFziXtzfmmMa6qMYyiEiXxweV12kZSMeWqXSl17fnhzxmmMrVGEe1mcc4p5eHeGjK6MgY5+doaGa6pzlGV7g1qBh4KHkXiPeW6OaKqafqZ2eXZ5e1V7jGd7boSJc3BzhJd2e0mcYot2h1RoY8dahK6EQmWEWjx7e1l2lL6UgXyBdnR4eU9zc0VreX1umqaBhld7fo2Bc6KEc5Z+hDyEcIeBWtNrfHyGe5qMhMuMe5qMhEGEbVVupcNzg3aHhIF4boeBe0mEdlptc39ofFl5Y8uUlJOGiYt2UmGEcyxjjGx4jFF7a657ZYWBnElzhp57iXtrgZN+tfOEhIOBjE2HgU1+e8tjjKNbiWCDhE15gUqBgYN7fnqGc66ce9d7iYSBj0qPcG6DnGGcT3eGa6qMZY+JlIiMl4hwc3aRdnqBlGV7eHJ2hLZjfnuRhDyEeX6MSk17g6Z+c6aUjHmEhIF4gXyBc76EZW18fGl+fkl+jCxrhoVwhDyUhIqGlL2DlI6EhJd2tdN7eYORhEGMa2Faa6pzc3Bzc4R5lIRznM+UY9eMhDycc5Z+c4p5c4iGY117pb6MgXuPrbJafnx2eYOJeXZ5e657hDyEcziElKZjfoB5eHeGj4WRhGGEe6KGeX1utTStc76EhFGJnCyMa5hzfH6HnNeceYB7hmN8gYuMhIVrczSMgYF8h3N7c5pza5hzjJqEYIRdgYuMlL2DeYRzhGGEeX1uhLaEc4iGeZ1zdl6JhrVteX6Me2iMfm5lWqJzSpqEa6pzdnmchHx2c6OMhNdrhoR5g3aHczxzeW52gV6Ejm15frGMc0Vzc4Z+l3drfniJe+9rWq5rlF1rhGGEhoVwe9OEfoh+e7pac09+c3qBY0lrhDycdnp2lJ6MiYOGhGCDc3aRlL2DlJt5doaGdnp2gYF8gWeOjF2Uc4R5c5Z+jEmMe7KEc4mEeYJ4dmyBe0mcgXiPbqJ7eYB7fmGGiYSJjICGlF1reZ2PnElzbpqJfH6Hc39oe4WEc5eJhK6EhqyJc3qBgZB8c09+hEmEaHKDhFGJc5SGiXWMUpaEa89zc6OMnCyMiXtrho+Be5qMc7KEjJ57dmN+hKGPjICGbmiEe7prdod+hGCDdnmchBx7eX6MkXZ2hGGEa657hm98jFFjY5JreYOJgY2EjHZ2a295Y3FajJ6Mc1J+YzB7e4WBjF2Uc4R5eV12gYxzg1qBeId+c9OUc5pzjFFjgY5+hFiMlIaPhoR5lIpjjIKBlNdSe7KEeX2BfrGMhIqGc65zjE2UhK6EklZ+QmWEeziMWqZza3VzdnR4foh+gYF8n3iJiZhrnKp7gYF8eId+lJ6Me1lrcIuGjKJjhmN8c66MjFF7a6prjJ6UnJ5zezyUfruRWlF7nI5zfHyGe657h4SEe8tjhBx7jFFjc09+c39ojICMeZeJeXt+YzRzjHZ2c0WEcIeBeXZ5onSXkVR+gYJ+eYFwdldzgYF7eX2BjJ6UiXuXlE1jh4SEe1mchLJjc4Z+hqZ7eXZ5bm1zlL6Ue5p7iWeGhKqUY5pzjKJjcIeBe8t7gXyBYIRdlEp4a3mGnK6EfmmMZpqEfFl5gYxzjKZuhGFjhoKGhHx2fnx2eXuMe3aBiWeGvbKMe6KGa5hzYzB7gZOBlGV7hmN8hqZlYot2Y117a6pzc6KEfId8foB5rctrfneJfJ6PcHN2hFiMc5pzjH92c0VzgY2EcElzdmCBlFVzg1GBc65zY4OBboeBcHiBeYJ4ewxzfHx5lIRzlEmEnLKEbk1zfJ6PhmN8eYBljBiEnMOEiXxwezyUcIeBe76EdsKEeX2BdnR4jGWUrXWMjGd7fkl+j4WRlEGMa5Jzho+BhDyEfnqMeXt+g3aHlE1jczClhNN7ZW18eHx8hGFjZW18iXWMjKJjhH57gYuMcIuGWjyMe4ZtjJuExmmMj4WRdntzi4GDhFFzYIRdnGGcjJp7Y0F7e4WEkbCGiX57fnSHa657a6prhBCMe3Z+SmmMjH92eHJ2hK6EY1FzexhrvbKMnI5za4OEfnd+eXuMhImBe897hLaMjN+EfG+BeIOBhF1+eZeJi4GDkXZ2eXKEgZ6Ejpd4c2GHa1V5e5KUfqZuhCx7jKp7lLZrg11+hHx2hFWUoot2nI5zgbh5mo9zvZaUe3qRbqKMfqZ2kbCGhFiM"),_t=>_t.charCodeAt(0)),Be=new ge.X;Be.wrapMode=pe.e8.CLAMP_TO_EDGE,Be.pixelFormat=pe.VI.RGB,Be.wrapMode=pe.e8.REPEAT,Be.hasMipmap=!0,Be.width=32,Be.height=32,this._passParameters.noiseTexture=new Je.x(this.renderingContext,Be,Ce),this._ssaoTechnique=this.techniques.acquire(ye),this._blurTechnique=this.techniques.acquire(Pe),this.addHandles((0,A.YP)(()=>this.isEnabled(),()=>this._enableTime=(0,N.HA)(0)))}destroy(){this._passParameters.noiseTexture=(0,D.M2)(this._passParameters.noiseTexture),this._blurTechnique.release(),this._ssaoTechnique.release()}render(Ce){const Be=this.bindParameters,_t=Ce.find(({name:ft})=>"normals"===ft),qe=_t?.getTexture(),ie=_t?.getTexture(pe.Lu),le=this.fboCache,_e=Be.camera,ve=_e.fullViewport[2],fe=_e.fullViewport[3],Fe=Math.round(ve/Re),ht=Math.round(fe/Re);if(!this._ssaoTechnique.compiled||!this._blurTechnique.compiled)return this._enableTime=(0,N.HA)(performance.now()),this.requestRender(),le.acquire(Fe,ht,"ssao",O.RED);0===this._enableTime&&(this._enableTime=(0,N.HA)(performance.now()));const ze=this.renderingContext,Et=this.view.qualitySettings.fadeDuration,Ht=(0,I.uZ)((5e5-_e.relativeElevation)/2e5,0,1),xt=Et>0?Math.min(Et,performance.now()-this._enableTime)/Et:1,Gt=xt*Ht;this._passParameters.normalTexture=qe,this._passParameters.depthTexture=ie,this._passParameters.projScale=1/_e.computeScreenPixelSizeAtDist(1),this._passParameters.intensity=4*de/(0,Te.g)(_e)**6*Gt;const Ct=le.acquire(ve,fe,"ssao input",O.RG);ze.unbindTexture(Ct.fbo.colorTexture),ze.bindFramebuffer(Ct.fbo),ze.setViewport(0,0,ve,fe),ze.bindTechnique(this._ssaoTechnique,Be,this._passParameters,this._drawParameters),ze.screen.draw();const Kt=le.acquire(Fe,ht,"ssao blur",O.RED);ze.unbindTexture(Kt.fbo.colorTexture),ze.bindFramebuffer(Kt.fbo),this._drawParameters.colorTexture=Ct.getTexture(),(0,C.t8)(this._drawParameters.blurSize,0,Re/fe),ze.bindTechnique(this._blurTechnique,Be,this._passParameters,this._drawParameters),ze.setViewport(0,0,Fe,ht),ze.screen.draw(),Ct.release();const er=le.acquire(Fe,ht,"ssao",O.RED);return ze.unbindTexture(er.fbo.colorTexture),ze.bindFramebuffer(er.fbo),ze.setViewport(0,0,ve,fe),ze.setClearColor(1,1,1,0),ze.clear(pe.lk.COLOR_BUFFER_BIT),this._drawParameters.colorTexture=Kt.getTexture(),(0,C.t8)(this._drawParameters.blurSize,Re/ve,0),ze.bindTechnique(this._blurTechnique,Be,this._passParameters,this._drawParameters),ze.setViewport(0,0,Fe,ht),ze.screen.draw(),ze.setViewport4fv(_e.fullViewport),Kt.release(),xt<1&&this.requestRender(V.Xx.UPDATE),er}};(0,H._)([(0,X.Cb)()],Ye.prototype,"consumes",void 0),(0,H._)([(0,X.Cb)()],Ye.prototype,"produces",void 0),(0,H._)([(0,X.Cb)({constructOnly:!0})],Ye.prototype,"techniques",void 0),(0,H._)([(0,X.Cb)({constructOnly:!0})],Ye.prototype,"isEnabled",void 0),Ye=(0,H._)([(0,F.j)("esri.views.3d.webgl-engine.effects.ssao.SSAO")],Ye);const de=.5;function be(Ce,Be){const _t=Ce.fragment;Be.receiveAmbientOcclusion?(_t.uniforms.add(new B.A("ssaoTex",(qe,ie)=>ie.ssao?.getTexture())),_t.constants.add("blurSizePixelsInverse","float",1/Re),_t.code.add(y.H`float evaluateAmbientOcclusionInverse() {
vec2 ssaoTextureSizeInverse = 1.0 / vec2(textureSize(ssaoTex, 0));
return texture(ssaoTex, gl_FragCoord.xy * blurSizePixelsInverse * ssaoTextureSizeInverse).r;
}
float evaluateAmbientOcclusion() {
return 1.0 - evaluateAmbientOcclusionInverse();
}`)):_t.code.add(y.H`float evaluateAmbientOcclusionInverse() { return 1.0; }
float evaluateAmbientOcclusion() { return 0.0; }`)}},73052:(xe,te,_)=>{_.d(te,{XP:()=>_t,PN:()=>Ce,sC:()=>Be});var y=_(480),B=_(43548),H=_(73145),I=_(5710),D=_(23515),A=_(53827),N=_(85938),X=_(93528),b=_(53299);function K(qe,ie){const le=qe.fragment,_e=void 0!==ie.lightingSphericalHarmonicsOrder?ie.lightingSphericalHarmonicsOrder:2;0===_e?(le.uniforms.add(new N.J("lightingAmbientSH0",(ve,fe)=>(0,B.s)(ue,fe.lighting.sh.r[0],fe.lighting.sh.g[0],fe.lighting.sh.b[0]))),le.code.add(b.H`vec3 calculateAmbientIrradiance(vec3 normal, float ambientOcclusion) {
vec3 ambientLight = 0.282095 * lightingAmbientSH0;
return ambientLight * (1.0 - ambientOcclusion);
}`)):1===_e?(le.uniforms.add(new X.N("lightingAmbientSH_R",(ve,fe)=>(0,I.s)(F,fe.lighting.sh.r[0],fe.lighting.sh.r[1],fe.lighting.sh.r[2],fe.lighting.sh.r[3])),new X.N("lightingAmbientSH_G",(ve,fe)=>(0,I.s)(F,fe.lighting.sh.g[0],fe.lighting.sh.g[1],fe.lighting.sh.g[2],fe.lighting.sh.g[3])),new X.N("lightingAmbientSH_B",(ve,fe)=>(0,I.s)(F,fe.lighting.sh.b[0],fe.lighting.sh.b[1],fe.lighting.sh.b[2],fe.lighting.sh.b[3]))),le.code.add(b.H`vec3 calculateAmbientIrradiance(vec3 normal, float ambientOcclusion) {
vec4 sh0 = vec4(
0.282095,
0.488603 * normal.x,
0.488603 * normal.z,
0.488603 * normal.y
);
vec3 ambientLight = vec3(
dot(lightingAmbientSH_R, sh0),
dot(lightingAmbientSH_G, sh0),
dot(lightingAmbientSH_B, sh0)
);
return ambientLight * (1.0 - ambientOcclusion);
}`)):2===_e&&(le.uniforms.add(new N.J("lightingAmbientSH0",(ve,fe)=>(0,B.s)(ue,fe.lighting.sh.r[0],fe.lighting.sh.g[0],fe.lighting.sh.b[0])),new X.N("lightingAmbientSH_R1",(ve,fe)=>(0,I.s)(F,fe.lighting.sh.r[1],fe.lighting.sh.r[2],fe.lighting.sh.r[3],fe.lighting.sh.r[4])),new X.N("lightingAmbientSH_G1",(ve,fe)=>(0,I.s)(F,fe.lighting.sh.g[1],fe.lighting.sh.g[2],fe.lighting.sh.g[3],fe.lighting.sh.g[4])),new X.N("lightingAmbientSH_B1",(ve,fe)=>(0,I.s)(F,fe.lighting.sh.b[1],fe.lighting.sh.b[2],fe.lighting.sh.b[3],fe.lighting.sh.b[4])),new X.N("lightingAmbientSH_R2",(ve,fe)=>(0,I.s)(F,fe.lighting.sh.r[5],fe.lighting.sh.r[6],fe.lighting.sh.r[7],fe.lighting.sh.r[8])),new X.N("lightingAmbientSH_G2",(ve,fe)=>(0,I.s)(F,fe.lighting.sh.g[5],fe.lighting.sh.g[6],fe.lighting.sh.g[7],fe.lighting.sh.g[8])),new X.N("lightingAmbientSH_B2",(ve,fe)=>(0,I.s)(F,fe.lighting.sh.b[5],fe.lighting.sh.b[6],fe.lighting.sh.b[7],fe.lighting.sh.b[8]))),le.code.add(b.H`vec3 calculateAmbientIrradiance(vec3 normal, float ambientOcclusion) {
vec3 ambientLight = 0.282095 * lightingAmbientSH0;
vec4 sh1 = vec4(
0.488603 * normal.x,
0.488603 * normal.z,
0.488603 * normal.y,
1.092548 * normal.x * normal.y
);
vec4 sh2 = vec4(
1.092548 * normal.y * normal.z,
0.315392 * (3.0 * normal.z * normal.z - 1.0),
1.092548 * normal.x * normal.z,
0.546274 * (normal.x * normal.x - normal.y * normal.y)
);
ambientLight += vec3(
dot(lightingAmbientSH_R1, sh1),
dot(lightingAmbientSH_G1, sh1),
dot(lightingAmbientSH_B1, sh1)
);
ambientLight += vec3(
dot(lightingAmbientSH_R2, sh2),
dot(lightingAmbientSH_G2, sh2),
dot(lightingAmbientSH_B2, sh2)
);
return ambientLight * (1.0 - ambientOcclusion);
}`),ie.pbrMode!==A.f7.Normal&&ie.pbrMode!==A.f7.Schematic||le.code.add(b.H`const vec3 skyTransmittance = vec3(0.9, 0.9, 1.0);
vec3 calculateAmbientRadiance(float ambientOcclusion)
{
vec3 ambientLight = 1.2 * (0.282095 * lightingAmbientSH0) - 0.2;
return ambientLight *= (1.0 - ambientOcclusion) * skyTransmittance;
}`))}const ue=(0,H.Ue)(),F=(0,D.Ue)();var C=_(30662),O=_(68125),$=_(53169),Z=_(64780),k=_(47832),V=_(92426);class se extends k.x{constructor(ie,le){super(ie,"bool",V.P.Pass,(_e,ve,fe)=>_e.setUniform1b(ie,le(ve,fe)))}}var j=_(69446);_(55117),(0,H.Ue)();const Ye=.4;function Ce(qe){qe.constants.add("ambientBoostFactor","float",Ye)}function Be(qe){qe.uniforms.add(new j.p("lightingGlobalFactor",(ie,le)=>le.lighting.globalFactor))}function _t(qe,ie){const le=qe.fragment;switch(qe.include(C.K,ie),ie.pbrMode!==A.f7.Disabled&&qe.include($.T,ie),qe.include(K,ie),qe.include(Z.e),le.code.add(b.H`
    const float GAMMA_SRGB = 2.1;
    const float INV_GAMMA_SRGB = 0.4761904;
    ${ie.pbrMode===A.f7.Disabled?"":"const vec3 GROUND_REFLECTANCE = vec3(0.2);"}
  `),Ce(le),Be(le),(0,O.Pe)(le),le.code.add(b.H`
    float additionalDirectedAmbientLight(vec3 vPosWorld) {
      float vndl = dot(${ie.spherical?b.H`normalize(vPosWorld)`:b.H`vec3(0.0, 0.0, 1.0)`}, mainLightDirection);
      return smoothstep(0.0, 1.0, clamp(vndl * 2.5, 0.0, 1.0));
    }
  `),(0,O.F1)(le),le.code.add(b.H`vec3 evaluateAdditionalLighting(float ambientOcclusion, vec3 vPosWorld) {
float additionalAmbientScale = additionalDirectedAmbientLight(vPosWorld);
return (1.0 - ambientOcclusion) * additionalAmbientScale * ambientBoostFactor * lightingGlobalFactor * mainLightIntensity;
}`),ie.pbrMode){case A.f7.Disabled:case A.f7.WaterOnIntegratedMesh:case A.f7.Water:qe.include(O.kR),le.code.add(b.H`vec3 evaluateSceneLighting(vec3 normalWorld, vec3 albedo, float shadow, float ssao, vec3 additionalLight)
{
vec3 mainLighting = evaluateMainLighting(normalWorld, shadow);
vec3 ambientLighting = calculateAmbientIrradiance(normalWorld, ssao);
vec3 albedoLinear = pow(albedo, vec3(GAMMA_SRGB));
vec3 totalLight = mainLighting + ambientLighting + additionalLight;
totalLight = min(totalLight, vec3(PI));
vec3 outColor = vec3((albedoLinear / PI) * totalLight);
return pow(outColor, vec3(INV_GAMMA_SRGB));
}`);break;case A.f7.Normal:case A.f7.Schematic:le.code.add(b.H`const float fillLightIntensity = 0.25;
const float horizonLightDiffusion = 0.4;
const float additionalAmbientIrradianceFactor = 0.02;
vec3 evaluateSceneLightingPBR(vec3 normal, vec3 albedo, float shadow, float ssao, vec3 additionalLight, vec3 viewDir, vec3 normalGround, vec3 mrr, vec3 _emission, float additionalAmbientIrradiance)
{
vec3 viewDirection = -viewDir;
vec3 h = normalize(viewDirection + mainLightDirection);
PBRShadingInfo inputs;
inputs.NdotL = clamp(dot(normal, mainLightDirection), 0.001, 1.0);
inputs.NdotV = clamp(abs(dot(normal, viewDirection)), 0.001, 1.0);
inputs.NdotH = clamp(dot(normal, h), 0.0, 1.0);
inputs.VdotH = clamp(dot(viewDirection, h), 0.0, 1.0);
inputs.NdotNG = clamp(dot(normal, normalGround), -1.0, 1.0);
vec3 reflectedView = normalize(reflect(viewDirection, normal));
inputs.RdotNG = clamp(dot(reflectedView, normalGround), -1.0, 1.0);
inputs.albedoLinear = pow(albedo, vec3(GAMMA_SRGB));
inputs.ssao = ssao;
inputs.metalness = mrr[0];
inputs.roughness = clamp(mrr[1] * mrr[1], 0.001, 0.99);`),le.code.add(b.H`inputs.f0 = (0.16 * mrr[2] * mrr[2]) * (1.0 - inputs.metalness) + inputs.albedoLinear * inputs.metalness;
inputs.f90 = vec3(clamp(dot(inputs.f0, vec3(50.0 * 0.33)), 0.0, 1.0));
inputs.diffuseColor = inputs.albedoLinear * (vec3(1.0) - inputs.f0) * (1.0 - inputs.metalness);`),ie.useFillLights?le.uniforms.add(new se("hasFillLights",(_e,ve)=>ve.enableFillLights)):le.constants.add("hasFillLights","bool",!1),le.code.add(b.H`vec3 ambientDir = vec3(5.0 * normalGround[1] - normalGround[0] * normalGround[2], - 5.0 * normalGround[0] - normalGround[2] * normalGround[1], normalGround[1] * normalGround[1] + normalGround[0] * normalGround[0]);
ambientDir = ambientDir != vec3(0.0) ? normalize(ambientDir) : normalize(vec3(5.0, -1.0, 0.0));
inputs.NdotAmbDir = hasFillLights ? abs(dot(normal, ambientDir)) : 1.0;
vec3 mainLightIrradianceComponent = inputs.NdotL * (1.0 - shadow) * mainLightIntensity;
vec3 fillLightsIrradianceComponent = inputs.NdotAmbDir * mainLightIntensity * fillLightIntensity;
vec3 ambientLightIrradianceComponent = calculateAmbientIrradiance(normal, ssao) + additionalLight;
inputs.skyIrradianceToSurface = ambientLightIrradianceComponent + mainLightIrradianceComponent + fillLightsIrradianceComponent ;
inputs.groundIrradianceToSurface = GROUND_REFLECTANCE * ambientLightIrradianceComponent + mainLightIrradianceComponent + fillLightsIrradianceComponent ;`),le.uniforms.add(new j.p("lightingSpecularStrength",(_e,ve)=>ve.lighting.mainLight.specularStrength),new j.p("lightingEnvironmentStrength",(_e,ve)=>ve.lighting.mainLight.environmentStrength)),le.code.add(b.H`vec3 horizonRingDir = inputs.RdotNG * normalGround - reflectedView;
vec3 horizonRingH = normalize(viewDirection + horizonRingDir);
inputs.NdotH_Horizon = dot(normal, horizonRingH);
vec3 mainLightRadianceComponent = lightingSpecularStrength * normalDistribution(inputs.NdotH, inputs.roughness) * mainLightIntensity * (1.0 - shadow);
vec3 horizonLightRadianceComponent = lightingEnvironmentStrength * normalDistribution(inputs.NdotH_Horizon, min(inputs.roughness + horizonLightDiffusion, 1.0)) * mainLightIntensity * fillLightIntensity;
vec3 ambientLightRadianceComponent = lightingEnvironmentStrength * calculateAmbientRadiance(ssao) + additionalLight;
float normalDirectionModifier = mix(1., min(mix(0.1, 2.0, (inputs.NdotNG + 1.) * 0.5), 1.0), clamp(inputs.roughness * 5.0, 0.0 , 1.0));
inputs.skyRadianceToSurface = (ambientLightRadianceComponent + horizonLightRadianceComponent) * normalDirectionModifier + mainLightRadianceComponent;
inputs.groundRadianceToSurface = 0.5 * GROUND_REFLECTANCE * (ambientLightRadianceComponent + horizonLightRadianceComponent) * normalDirectionModifier + mainLightRadianceComponent;
inputs.averageAmbientRadiance = ambientLightIrradianceComponent[1] * (1.0 + GROUND_REFLECTANCE[1]);`),le.code.add(b.H`
        vec3 reflectedColorComponent = evaluateEnvironmentIllumination(inputs);
        vec3 additionalMaterialReflectanceComponent = inputs.albedoLinear * additionalAmbientIrradiance;
        vec3 emissionComponent = _emission == vec3(0.0) ? _emission : pow(_emission, vec3(GAMMA_SRGB));
        vec3 outColorLinear = reflectedColorComponent + additionalMaterialReflectanceComponent + emissionComponent;
        ${ie.pbrMode!==A.f7.Schematic||ie.hasColorTexture?b.H`vec3 outColor = pow(blackLevelSoftCompression(outColorLinear, inputs), vec3(INV_GAMMA_SRGB));`:b.H`vec3 outColor = pow(max(vec3(0.0), outColorLinear - 0.005 * inputs.averageAmbientRadiance), vec3(INV_GAMMA_SRGB));`}
        return outColor;
      }
    `);break;case A.f7.Simplified:case A.f7.TerrainWithWater:qe.include(O.kR),le.code.add(b.H`const float roughnessTerrain = 0.5;
const float specularityTerrain = 0.5;
const vec3 fresnelReflectionTerrain = vec3(0.04);
vec3 evaluatePBRSimplifiedLighting(vec3 n, vec3 c, float shadow, float ssao, vec3 al, vec3 vd, vec3 nup) {
vec3 viewDirection = -vd;
vec3 h = normalize(viewDirection + mainLightDirection);
float NdotL = clamp(dot(n, mainLightDirection), 0.001, 1.0);
float NdotV = clamp(abs(dot(n, viewDirection)), 0.001, 1.0);
float NdotH = clamp(dot(n, h), 0.0, 1.0);
float NdotNG = clamp(dot(n, nup), -1.0, 1.0);
vec3 albedoLinear = pow(c, vec3(GAMMA_SRGB));
float lightness = 0.3 * albedoLinear[0] + 0.5 * albedoLinear[1] + 0.2 * albedoLinear[2];
vec3 f0 = (0.85 * lightness + 0.15) * fresnelReflectionTerrain;
vec3 f90 =  vec3(clamp(dot(f0, vec3(50.0 * 0.33)), 0.0, 1.0));
vec3 mainLightIrradianceComponent = (1. - shadow) * NdotL * mainLightIntensity;
vec3 ambientLightIrradianceComponent = calculateAmbientIrradiance(n, ssao) + al;
vec3 ambientSky = ambientLightIrradianceComponent + mainLightIrradianceComponent;
vec3 indirectDiffuse = ((1.0 - NdotNG) * mainLightIrradianceComponent + (1.0 + NdotNG ) * ambientSky) * 0.5;
vec3 outDiffColor = albedoLinear * (1.0 - f0) * indirectDiffuse / PI;
vec3 mainLightRadianceComponent = normalDistribution(NdotH, roughnessTerrain) * mainLightIntensity;
vec2 dfg = prefilteredDFGAnalytical(roughnessTerrain, NdotV);
vec3 specularColor = f0 * dfg.x + f90 * dfg.y;
vec3 specularComponent = specularityTerrain * specularColor * mainLightRadianceComponent;
vec3 outColorLinear = outDiffColor + specularComponent;
vec3 outColor = pow(outColorLinear, vec3(INV_GAMMA_SRGB));
return outColor;
}`);break;default:(0,y.Bg)(ie.pbrMode);case A.f7.COUNT:}}(0,H.Ue)()},68125:(xe,te,_)=>{_.d(te,{F1:()=>I,Pe:()=>H,kR:()=>D});var y=_(85938),B=_(53299);function H(A){A.uniforms.add(new y.J("mainLightDirection",(N,X)=>X.lighting.mainLight.direction))}function I(A){A.uniforms.add(new y.J("mainLightIntensity",(N,X)=>X.lighting.mainLight.intensity))}function D(A){H(A.fragment),I(A.fragment),A.fragment.code.add(B.H`vec3 evaluateMainLighting(vec3 normal_global, float shadowing) {
float dotVal = clamp(dot(normal_global, mainLightDirection), 0.0, 1.0);
return mainLightIntensity * ((1.0 - shadowing) * dotVal);
}`)}},31573:(xe,te,_)=>{_.d(te,{l:()=>I});var y=_(79251),B=_(53299),H=_(63243);function I(A,N){if(!N.multipassEnabled)return;A.fragment.include(y.K),A.fragment.uniforms.add(new H.A("terrainDepthTexture",(b,K)=>K.multipassTerrain.depth?.attachment));const X=N.occlusionPass;A.fragment.code.add(B.H`
   ${X?"bool":"void"} terrainDepthTest(float fragmentDepth) {
      float depth = texelFetch(terrainDepthTexture, ivec2(gl_FragCoord.xy), 0).r;
      float linearDepth = linearizeDepth(depth);
      ${X?B.H`return fragmentDepth < linearDepth && depth < 1.0;`:B.H`
          if(fragmentDepth ${N.cullAboveGround?">":"<="} linearDepth){
            discard;
          }`}
    }`)}},97594:(xe,te,_)=>{_.d(te,{k:()=>H,q:()=>I});var I,D,y=_(480),B=_(53299);function H(D,A){const N=D.fragment;switch(N.code.add(B.H`struct ShadingNormalParameters {
vec3 normalView;
vec3 viewDirection;
} shadingParams;`),A.doubleSidedMode){case I.None:N.code.add(B.H`vec3 shadingNormal(ShadingNormalParameters params) {
return normalize(params.normalView);
}`);break;case I.View:N.code.add(B.H`vec3 shadingNormal(ShadingNormalParameters params) {
return dot(params.normalView, params.viewDirection) > 0.0 ? normalize(-params.normalView) : normalize(params.normalView);
}`);break;case I.WindingOrder:N.code.add(B.H`vec3 shadingNormal(ShadingNormalParameters params) {
return gl_FrontFacing ? normalize(params.normalView) : normalize(-params.normalView);
}`);break;default:(0,y.Bg)(A.doubleSidedMode);case I.COUNT:}}(D=I||(I={}))[D.None=0]="None",D[D.View=1]="View",D[D.WindingOrder=2]="WindingOrder",D[D.COUNT=3]="COUNT"},53169:(xe,te,_)=>{_.d(te,{T:()=>D});var y=_(53299);function B(N){const X=N.fragment.code;X.add(y.H`vec3 evaluateDiffuseIlluminationHemisphere(vec3 ambientGround, vec3 ambientSky, float NdotNG)
{
return ((1.0 - NdotNG) * ambientGround + (1.0 + NdotNG) * ambientSky) * 0.5;
}`),X.add(y.H`float integratedRadiance(float cosTheta2, float roughness)
{
return (cosTheta2 - 1.0) / (cosTheta2 * (1.0 - roughness * roughness) - 1.0);
}`),X.add(y.H`vec3 evaluateSpecularIlluminationHemisphere(vec3 ambientGround, vec3 ambientSky, float RdotNG, float roughness)
{
float cosTheta2 = 1.0 - RdotNG * RdotNG;
float intRadTheta = integratedRadiance(cosTheta2, roughness);
float ground = RdotNG < 0.0 ? 1.0 - intRadTheta : 1.0 + intRadTheta;
float sky = 2.0 - ground;
return (ground * ambientGround + sky * ambientSky) * 0.5;
}`)}var H=_(53827),I=_(64780);function D(N,X){const b=N.fragment.code;N.include(I.e),X.pbrMode!==H.f7.Normal&&X.pbrMode!==H.f7.Schematic&&X.pbrMode!==H.f7.Simplified&&X.pbrMode!==H.f7.TerrainWithWater||(b.add(y.H`float normalDistribution(float NdotH, float roughness)
{
float a = NdotH * roughness;
float b = roughness / (1.0 - NdotH * NdotH + a * a);
return b * b * INV_PI;
}`),b.add(y.H`const vec4 c0 = vec4(-1.0, -0.0275, -0.572,  0.022);
const vec4 c1 = vec4( 1.0,  0.0425,  1.040, -0.040);
const vec2 c2 = vec2(-1.04, 1.04);
vec2 prefilteredDFGAnalytical(float roughness, float NdotV) {
vec4 r = roughness * c0 + c1;
float a004 = min(r.x * r.x, exp2(-9.28 * NdotV)) * r.x + r.y;
return c2 * a004 + r.zw;
}`)),X.pbrMode!==H.f7.Normal&&X.pbrMode!==H.f7.Schematic||(N.include(B),b.add(y.H`struct PBRShadingInfo
{
float NdotL;
float NdotV;
float NdotH;
float VdotH;
float LdotH;
float NdotNG;
float RdotNG;
float NdotAmbDir;
float NdotH_Horizon;
vec3 skyRadianceToSurface;
vec3 groundRadianceToSurface;
vec3 skyIrradianceToSurface;
vec3 groundIrradianceToSurface;
float averageAmbientRadiance;
float ssao;
vec3 albedoLinear;
vec3 f0;
vec3 f90;
vec3 diffuseColor;
float metalness;
float roughness;
};`),b.add(y.H`vec3 evaluateEnvironmentIllumination(PBRShadingInfo inputs) {
vec3 indirectDiffuse = evaluateDiffuseIlluminationHemisphere(inputs.groundIrradianceToSurface, inputs.skyIrradianceToSurface, inputs.NdotNG);
vec3 indirectSpecular = evaluateSpecularIlluminationHemisphere(inputs.groundRadianceToSurface, inputs.skyRadianceToSurface, inputs.RdotNG, inputs.roughness);
vec3 diffuseComponent = inputs.diffuseColor * indirectDiffuse * INV_PI;
vec2 dfg = prefilteredDFGAnalytical(inputs.roughness, inputs.NdotV);
vec3 specularColor = inputs.f0 * dfg.x + inputs.f90 * dfg.y;
vec3 specularComponent = specularColor * indirectSpecular;
return (diffuseComponent + specularComponent);
}`),b.add(y.H`float gamutMapChanel(float x, vec2 p){
return (x < p.x) ? mix(0.0, p.y, x/p.x) : mix(p.y, 1.0, (x - p.x) / (1.0 - p.x) );
}`),b.add(y.H`vec3 blackLevelSoftCompression(vec3 inColor, PBRShadingInfo inputs){
vec3 outColor;
vec2 p = vec2(0.02 * (inputs.averageAmbientRadiance), 0.0075 * (inputs.averageAmbientRadiance));
outColor.x = gamutMapChanel(inColor.x, p) ;
outColor.y = gamutMapChanel(inColor.y, p) ;
outColor.z = gamutMapChanel(inColor.z, p) ;
return outColor;
}`))}},53827:(xe,te,_)=>{_.d(te,{f7:()=>b,jV:()=>ue});var b,F,y=_(81285),B=_(41841),H=_(85938),I=_(53299),D=_(22166),A=_(63243),N=_(92426);function ue(F,C){const O=F.fragment;if(C.pbrMode===b.Normal&&(C.hasMetallicRoughnessTexture||C.hasEmissionTexture||C.hasOcclusionTexture)&&F.include(y.i,C),C.pbrMode!==b.Schematic)if(C.pbrMode!==b.Disabled){if(C.pbrMode===b.Normal){O.code.add(I.H`vec3 mrr;
vec3 emission;
float occlusion;`);const Z=C.pbrTextureBindType;C.hasMetallicRoughnessTexture&&(O.uniforms.add(Z===N.P.Pass?new A.A("texMetallicRoughness",k=>k.textureMetallicRoughness):new D.R("texMetallicRoughness",k=>k.textureMetallicRoughness)),O.code.add(I.H`void applyMetallnessAndRoughness(vec2 uv) {
vec3 metallicRoughness = textureLookup(texMetallicRoughness, uv).rgb;
mrr[0] *= metallicRoughness.b;
mrr[1] *= metallicRoughness.g;
}`)),C.hasEmissionTexture&&(O.uniforms.add(Z===N.P.Pass?new A.A("texEmission",k=>k.textureEmissive):new D.R("texEmission",k=>k.textureEmissive)),O.code.add(I.H`void applyEmission(vec2 uv) {
emission *= textureLookup(texEmission, uv).rgb;
}`)),C.hasOcclusionTexture?(O.uniforms.add(Z===N.P.Pass?new A.A("texOcclusion",k=>k.textureOcclusion):new D.R("texOcclusion",k=>k.textureOcclusion)),O.code.add(I.H`void applyOcclusion(vec2 uv) {
occlusion *= textureLookup(texOcclusion, uv).r;
}
float getBakedOcclusion() {
return occlusion;
}`)):O.code.add(I.H`float getBakedOcclusion() { return 1.0; }`),Z===N.P.Pass?O.uniforms.add(new H.J("emissionFactor",k=>k.emissiveFactor),new H.J("mrrFactors",k=>k.mrrFactors)):O.uniforms.add(new B.B("emissionFactor",k=>k.emissiveFactor),new B.B("mrrFactors",k=>k.mrrFactors)),O.code.add(I.H`
    void applyPBRFactors() {
      mrr = mrrFactors;
      emission = emissionFactor;
      occlusion = 1.0;

      ${C.hasMetallicRoughnessTexture?I.H`applyMetallnessAndRoughness(${C.hasMetallicRoughnessTextureTransform?I.H`metallicRoughnessUV`:"vuv0"});`:""}

      ${C.hasEmissionTexture?I.H`applyEmission(${C.hasEmissiveTextureTransform?I.H`emissiveUV`:"vuv0"});`:""}

      ${C.hasOcclusionTexture?I.H`applyOcclusion(${C.hasOcclusionTextureTransform?I.H`occlusionUV`:"vuv0"});`:""}
    }
  `)}}else O.code.add(I.H`float getBakedOcclusion() { return 1.0; }`);else O.code.add(I.H`vec3 mrr = vec3(0.0, 0.6, 0.2);
vec3 emission = vec3(0.0);
float occlusion = 1.0;
void applyPBRFactors() {}
float getBakedOcclusion() { return 1.0; }`)}_(48261),(F=b||(b={}))[F.Disabled=0]="Disabled",F[F.Normal=1]="Normal",F[F.Schematic=2]="Schematic",F[F.Water=3]="Water",F[F.WaterOnIntegratedMesh=4]="WaterOnIntegratedMesh",F[F.Simplified=5]="Simplified",F[F.TerrainWithWater=6]="TerrainWithWater",F[F.COUNT=7]="COUNT"},64780:(xe,te,_)=>{_.d(te,{e:()=>B});var y=_(53299);function B(H){H.vertex.code.add(y.H`const float PI = 3.141592653589793;`),H.fragment.code.add(y.H`const float PI = 3.141592653589793;
const float LIGHT_NORMALIZATION = 1.0 / PI;
const float INV_PI = 0.3183098861837907;
const float HALF_PI = 1.570796326794897;`)}},7524:(xe,te,_)=>{_.d(te,{XE:()=>k,hb:()=>Z}),_(41666),_(73145);var H=_(2012),I=_(93528),D=_(5718),A=_(53299),N=_(47832),X=_(92426);class b extends N.x{constructor(j,ee,Q){super(j,"mat4",X.P.Draw,(q,W,oe,ce)=>q.setUniformMatrix4fv(j,ee(W,oe,ce)),Q)}}class K extends N.x{constructor(j,ee,Q){super(j,"mat4",X.P.Pass,(q,W,oe)=>q.setUniformMatrix4fv(j,ee(W,oe)),Q)}}var ue=_(63243);function Z(se,j){j.receiveShadows&&(se.fragment.uniforms.add(new K("shadowMapMatrix",(ee,Q)=>Q.shadowMap.getShadowMapMatrices(ee.origin),4)),V(se))}function k(se,j){j.receiveShadows&&(se.fragment.uniforms.add(new b("shadowMapMatrix",(ee,Q)=>Q.shadowMap.getShadowMapMatrices(ee.origin),4)),V(se))}function V(se){const j=se.fragment;j.include(H.f),j.uniforms.add(new ue.A("shadowMap",(ee,Q)=>Q.shadowMap.depthTexture),new D._("numCascades",(ee,Q)=>Q.shadowMap.numCascades),new I.N("cascadeDistances",(ee,Q)=>Q.shadowMap.cascadeDistances)),j.code.add(A.H`int chooseCascade(float depth, out mat4 mat) {
vec4 distance = cascadeDistances;
int i = depth < distance[1] ? 0 : depth < distance[2] ? 1 : depth < distance[3] ? 2 : 3;
mat = i == 0 ? shadowMapMatrix[0] : i == 1 ? shadowMapMatrix[1] : i == 2 ? shadowMapMatrix[2] : shadowMapMatrix[3];
return i;
}
vec3 lightSpacePosition(vec3 _vpos, mat4 mat) {
vec4 lv = mat * vec4(_vpos, 1.0);
lv.xy /= lv.w;
return 0.5 * lv.xyz + vec3(0.5);
}
vec2 cascadeCoordinates(int i, ivec2 textureSize, vec3 lvpos) {
float xScale = float(textureSize.y) / float(textureSize.x);
return vec2((float(i) + lvpos.x) * xScale, lvpos.y);
}
float readShadowMapDepth(ivec2 uv, sampler2D _depthTex) {
return rgba4ToFloat(texelFetch(_depthTex, uv, 0));
}
float posIsInShadow(ivec2 uv, vec3 lvpos, sampler2D _depthTex) {
return readShadowMapDepth(uv, _depthTex) < lvpos.z ? 1.0 : 0.0;
}
float filterShadow(vec2 uv, vec3 lvpos, ivec2 texSize, sampler2D _depthTex) {
vec2 st = fract(uv * vec2(texSize) + vec2(0.5));
ivec2 base = ivec2(uv * vec2(texSize) - vec2(0.5));
float s00 = posIsInShadow(ivec2(base.x, base.y), lvpos, _depthTex);
float s10 = posIsInShadow(ivec2(base.x + 1, base.y), lvpos, _depthTex);
float s11 = posIsInShadow(ivec2(base.x + 1, base.y + 1), lvpos, _depthTex);
float s01 = posIsInShadow(ivec2(base.x, base.y + 1), lvpos, _depthTex);
return mix(mix(s00, s10, st.x), mix(s01, s11, st.x), st.y);
}
float readShadowMap(const in vec3 _vpos, float _linearDepth) {
mat4 mat;
int i = chooseCascade(_linearDepth, mat);
if (i >= numCascades) { return 0.0; }
vec3 lvpos = lightSpacePosition(_vpos, mat);
if (lvpos.z >= 1.0 || lvpos.x < 0.0 || lvpos.x > 1.0 || lvpos.y < 0.0 || lvpos.y > 1.0) { return 0.0; }
ivec2 size = textureSize(shadowMap, 0);
vec2 uv = cascadeCoordinates(i, size, lvpos);
return filterShadow(uv, lvpos, size, shadowMap);
}`)}},27439:(xe,te,_)=>{_.d(te,{DT:()=>b,NI:()=>A,R5:()=>N,av:()=>D,jF:()=>X});var y=_(38519),B=_(95781),H=_(53299),I=_(11405);function D(K,ue){ue.hasColorTextureTransform?(K.vertex.uniforms.add(new I.c("colorTextureTransformMatrix",F=>F.colorTextureTransformMatrix??y.Wd)),K.varyings.add("colorUV","vec2"),K.vertex.code.add(H.H`void forwardColorUV(){
colorUV = (colorTextureTransformMatrix * vec3(vuv0, 1.0)).xy;
}`)):K.vertex.code.add(H.H`void forwardColorUV(){}`)}function A(K,ue){ue.hasNormalTextureTransform&&ue.textureCoordinateType!==B.N.None?(K.vertex.uniforms.add(new I.c("normalTextureTransformMatrix",F=>F.normalTextureTransformMatrix??y.Wd)),K.varyings.add("normalUV","vec2"),K.vertex.code.add(H.H`void forwardNormalUV(){
normalUV = (normalTextureTransformMatrix * vec3(vuv0, 1.0)).xy;
}`)):K.vertex.code.add(H.H`void forwardNormalUV(){}`)}function N(K,ue){ue.hasEmissionTextureTransform&&ue.textureCoordinateType!==B.N.None?(K.vertex.uniforms.add(new I.c("emissiveTextureTransformMatrix",F=>F.emissiveTextureTransformMatrix??y.Wd)),K.varyings.add("emissiveUV","vec2"),K.vertex.code.add(H.H`void forwardEmissiveUV(){
emissiveUV = (emissiveTextureTransformMatrix * vec3(vuv0, 1.0)).xy;
}`)):K.vertex.code.add(H.H`void forwardEmissiveUV(){}`)}function X(K,ue){ue.hasOcclusionTextureTransform&&ue.textureCoordinateType!==B.N.None?(K.vertex.uniforms.add(new I.c("occlusionTextureTransformMatrix",F=>F.occlusionTextureTransformMatrix??y.Wd)),K.varyings.add("occlusionUV","vec2"),K.vertex.code.add(H.H`void forwardOcclusionUV(){
occlusionUV = (occlusionTextureTransformMatrix * vec3(vuv0, 1.0)).xy;
}`)):K.vertex.code.add(H.H`void forwardOcclusionUV(){}`)}function b(K,ue){ue.hasMetallicRoughnessTextureTransform&&ue.textureCoordinateType!==B.N.None?(K.vertex.uniforms.add(new I.c("metallicRoughnessTextureTransformMatrix",F=>F.metallicRoughnessTextureTransformMatrix??y.Wd)),K.varyings.add("metallicRoughnessUV","vec2"),K.vertex.code.add(H.H`void forwardMetallicRoughnessUV(){
metallicRoughnessUV = (metallicRoughnessTextureTransformMatrix * vec3(vuv0, 1.0)).xy;
}`)):K.vertex.code.add(H.H`void forwardMetallicRoughnessUV(){}`)}},40900:(xe,te,_)=>{_.d(te,{k:()=>Lt});var y=_(85938),B=_(47832),H=_(92426);class I extends B.x{constructor(re,he,Ee){super(re,"vec4",H.P.Pass,(ne,Xe,pt)=>ne.setUniform4fv(re,he(Xe,pt)),Ee)}}class D extends B.x{constructor(re,he,Ee){super(re,"float",H.P.Pass,(ne,Xe,pt)=>ne.setUniform1fv(re,he(Xe,pt)),Ee)}}var A=_(53299),N=_(11405),X=_(55362),O=(_(14007),_(55117),_(92899),_(38519),_(39061),_(41666)),Z=(_(43548),_(73145)),V=(_(44526),_(50484)),se=_(73514),j=_(80543),q=(_(4703),_(65311),_(10141));let W=class extends se.Z{constructor(){super(...arguments),this.SCENEVIEW_HITTEST_RETURN_INTERSECTOR=!1,this.DECONFLICTOR_SHOW_VISIBLE=!1,this.DECONFLICTOR_SHOW_INVISIBLE=!1,this.DECONFLICTOR_SHOW_GRID=!1,this.LABELS_SHOW_BORDER=!1,this.TEXT_SHOW_BASELINE=!1,this.TEXT_SHOW_BORDER=!1,this.OVERLAY_DRAW_DEBUG_TEXTURE=!1,this.OVERLAY_SHOW_CENTER=!1,this.SHOW_POI=!1,this.TESTS_DISABLE_OPTIMIZATIONS=!1,this.TESTS_DISABLE_FAST_UPDATES=!1,this.DRAW_MESH_GEOMETRY_NORMALS=!1,this.FEATURE_TILE_FETCH_SHOW_TILES=!1,this.FEATURE_TILE_TREE_SHOW_TILES=!1,this.TERRAIN_TILE_TREE_SHOW_TILES=!1,this.I3S_TREE_SHOW_TILES=!1,this.I3S_SHOW_MODIFICATIONS=!1,this.LOD_INSTANCE_RENDERER_DISABLE_UPDATES=!1,this.LOD_INSTANCE_RENDERER_COLORIZE_BY_LEVEL=!1,this.EDGES_SHOW_HIDDEN_TRANSPARENT_EDGES=!1,this.LINE_WIREFRAMES=!1}};var ce,me,J;(0,V._)([(0,j.Cb)()],W.prototype,"SCENEVIEW_HITTEST_RETURN_INTERSECTOR",void 0),(0,V._)([(0,j.Cb)()],W.prototype,"DECONFLICTOR_SHOW_VISIBLE",void 0),(0,V._)([(0,j.Cb)()],W.prototype,"DECONFLICTOR_SHOW_INVISIBLE",void 0),(0,V._)([(0,j.Cb)()],W.prototype,"DECONFLICTOR_SHOW_GRID",void 0),(0,V._)([(0,j.Cb)()],W.prototype,"LABELS_SHOW_BORDER",void 0),(0,V._)([(0,j.Cb)()],W.prototype,"TEXT_SHOW_BASELINE",void 0),(0,V._)([(0,j.Cb)()],W.prototype,"TEXT_SHOW_BORDER",void 0),(0,V._)([(0,j.Cb)()],W.prototype,"OVERLAY_DRAW_DEBUG_TEXTURE",void 0),(0,V._)([(0,j.Cb)()],W.prototype,"OVERLAY_SHOW_CENTER",void 0),(0,V._)([(0,j.Cb)()],W.prototype,"SHOW_POI",void 0),(0,V._)([(0,j.Cb)()],W.prototype,"TESTS_DISABLE_OPTIMIZATIONS",void 0),(0,V._)([(0,j.Cb)()],W.prototype,"TESTS_DISABLE_FAST_UPDATES",void 0),(0,V._)([(0,j.Cb)()],W.prototype,"DRAW_MESH_GEOMETRY_NORMALS",void 0),(0,V._)([(0,j.Cb)()],W.prototype,"FEATURE_TILE_FETCH_SHOW_TILES",void 0),(0,V._)([(0,j.Cb)()],W.prototype,"FEATURE_TILE_TREE_SHOW_TILES",void 0),(0,V._)([(0,j.Cb)()],W.prototype,"TERRAIN_TILE_TREE_SHOW_TILES",void 0),(0,V._)([(0,j.Cb)()],W.prototype,"I3S_TREE_SHOW_TILES",void 0),(0,V._)([(0,j.Cb)()],W.prototype,"I3S_SHOW_MODIFICATIONS",void 0),(0,V._)([(0,j.Cb)()],W.prototype,"LOD_INSTANCE_RENDERER_DISABLE_UPDATES",void 0),(0,V._)([(0,j.Cb)()],W.prototype,"LOD_INSTANCE_RENDERER_COLORIZE_BY_LEVEL",void 0),(0,V._)([(0,j.Cb)()],W.prototype,"EDGES_SHOW_HIDDEN_TRANSPARENT_EDGES",void 0),(0,V._)([(0,j.Cb)()],W.prototype,"LINE_WIREFRAMES",void 0),W=(0,V._)([(0,q.j)("esri.views.3d.support.debugFlags")],W),new W,(J=ce||(ce={}))[J.Undefined=0]="Undefined",J[J.DefinedSize=1]="DefinedSize",J[J.DefinedScale=2]="DefinedScale",function(J){J[J.Undefined=0]="Undefined",J[J.DefinedAngle=1]="DefinedAngle"}(me||(me={})),(0,O.Ue)(),(0,Z.Ue)(),(0,O.Ue)(),_(64457);const ft=8;function Lt(J,re){const{vertex:he,attributes:Ee}=J;re.hasVvInstancing&&(re.vvSize||re.vvColor)&&Ee.add(X.T.INSTANCEFEATUREATTRIBUTE,"vec4"),re.vvSize?(he.uniforms.add(new y.J("vvSizeMinSize",ne=>ne.vvSize.minSize)),he.uniforms.add(new y.J("vvSizeMaxSize",ne=>ne.vvSize.maxSize)),he.uniforms.add(new y.J("vvSizeOffset",ne=>ne.vvSize.offset)),he.uniforms.add(new y.J("vvSizeFactor",ne=>ne.vvSize.factor)),he.uniforms.add(new N.c("vvSymbolRotationMatrix",ne=>ne.vvSymbolRotationMatrix)),he.uniforms.add(new y.J("vvSymbolAnchor",ne=>ne.vvSymbolAnchor)),he.code.add(A.H`vec3 vvScale(vec4 _featureAttribute) {
return clamp(vvSizeOffset + _featureAttribute.x * vvSizeFactor, vvSizeMinSize, vvSizeMaxSize);
}
vec4 vvTransformPosition(vec3 position, vec4 _featureAttribute) {
return vec4(vvSymbolRotationMatrix * ( vvScale(_featureAttribute) * (position + vvSymbolAnchor)), 1.0);
}`),he.code.add(A.H`
      const float eps = 1.192092896e-07;
      vec4 vvTransformNormal(vec3 _normal, vec4 _featureAttribute) {
        vec3 vvScale = clamp(vvSizeOffset + _featureAttribute.x * vvSizeFactor, vvSizeMinSize + eps, vvSizeMaxSize);
        return vec4(vvSymbolRotationMatrix * _normal / vvScale, 1.0);
      }

      ${re.hasVvInstancing?A.H`
      vec4 vvLocalNormal(vec3 _normal) {
        return vvTransformNormal(_normal, instanceFeatureAttribute);
      }

      vec4 localPosition() {
        return vvTransformPosition(position, instanceFeatureAttribute);
      }`:""}
    `)):he.code.add(A.H`vec4 localPosition() { return vec4(position, 1.0); }
vec4 vvLocalNormal(vec3 _normal) { return vec4(_normal, 1.0); }`),re.vvColor?(he.constants.add("vvColorNumber","int",ft),he.uniforms.add(new D("vvColorValues",ne=>ne.vvColor.values,ft),new I("vvColorColors",ne=>ne.vvColor.colors,ft)),he.code.add(A.H`
      vec4 interpolateVVColor(float value) {
        if (value <= vvColorValues[0]) {
          return vvColorColors[0];
        }

        for (int i = 1; i < vvColorNumber; ++i) {
          if (vvColorValues[i] >= value) {
            float f = (value - vvColorValues[i-1]) / (vvColorValues[i] - vvColorValues[i-1]);
            return mix(vvColorColors[i-1], vvColorColors[i], f);
          }
        }
        return vvColorColors[vvColorNumber - 1];
      }

      vec4 vvGetColor(vec4 featureAttribute) {
        return interpolateVVColor(featureAttribute.y);
      }

      ${re.hasVvInstancing?A.H`
            vec4 vvColor() {
              return vvGetColor(instanceFeatureAttribute);
            }`:"vec4 vvColor() { return vec4(1.0); }"}
    `)):he.code.add(A.H`vec4 vvColor() { return vec4(1.0); }`)}},60795:(xe,te,_)=>{_.d(te,{F:()=>y,b:()=>B});const y=.1,B=.001},52490:(xe,te,_)=>{_.d(te,{z:()=>b});var y=_(60795),B=_(53299);function H(F){F.fragment.code.add(B.H`
    #define discardOrAdjustAlpha(color) { if (color.a < ${B.H.float(y.b)}) { discard; } }
  `)}_(47832),_(92426);var N=_(69446),X=_(15182);function b(F,C){!function ue(F,C,O){const $=F.fragment;switch(C.alphaDiscardMode!==X.JJ.Mask&&C.alphaDiscardMode!==X.JJ.MaskBlend||$.uniforms.add(O),C.alphaDiscardMode){case X.JJ.Blend:return F.include(H);case X.JJ.Opaque:$.code.add(B.H`void discardOrAdjustAlpha(inout vec4 color) {
color.a = 1.0;
}`);break;case X.JJ.Mask:$.code.add(B.H`#define discardOrAdjustAlpha(color) { if (color.a < textureAlphaCutoff) { discard; } else { color.a = 1.0; } }`);break;case X.JJ.MaskBlend:F.fragment.code.add(B.H`#define discardOrAdjustAlpha(color) { if (color.a < textureAlphaCutoff) { discard; } }`)}}(F,C,new N.p("textureAlphaCutoff",O=>O.textureAlphaCutoff))}},31151:(xe,te,_)=>{_.d(te,{GZ:()=>X});var y=_(29726),B=_(89014),H=_(5710),I=_(23515),D=_(22946),A=_(93528),N=_(53299);function X(C){C.fragment.uniforms.add(new A.N("projInfo",(O,$)=>function b(C){const O=C.projectionMatrix;return 0===O[11]?(0,H.s)(K,2/(C.fullWidth*O[0]),2/(C.fullHeight*O[5]),(1+O[12])/O[0],(1+O[13])/O[5]):(0,H.s)(K,-2/(C.fullWidth*O[0]),-2/(C.fullHeight*O[5]),(1-O[8])/O[0],(1-O[9])/O[5])}($.camera))),C.fragment.uniforms.add(new D.A("zScale",(O,$)=>function ue(C){return 0===C.projectionMatrix[11]?(0,y.t8)(F,0,1):(0,y.t8)(F,1,0)}($.camera))),C.fragment.code.add(N.H`vec3 reconstructPosition(vec2 fragCoord, float depth) {
return vec3((fragCoord * projInfo.xy + projInfo.zw) * (zScale.x * depth + zScale.y), depth);
}`)}const K=(0,I.Ue)(),F=(0,B.Ue)()},59866:(xe,te,_)=>{_.d(te,{$:()=>B});var y=_(53299);function B({code:H},I){H.add(I.doublePrecisionRequiresObfuscation?y.H`vec3 dpPlusFrc(vec3 a, vec3 b) {
return mix(a, a + b, vec3(notEqual(b, vec3(0))));
}
vec3 dpMinusFrc(vec3 a, vec3 b) {
return mix(vec3(0), a - b, vec3(notEqual(a, b)));
}
vec3 dpAdd(vec3 hiA, vec3 loA, vec3 hiB, vec3 loB) {
vec3 t1 = dpPlusFrc(hiA, hiB);
vec3 e = dpMinusFrc(t1, hiA);
vec3 t2 = dpMinusFrc(hiB, e) + dpMinusFrc(hiA, dpMinusFrc(t1, e)) + loA + loB;
return t1 + t2;
}`:y.H`vec3 dpAdd(vec3 hiA, vec3 loA, vec3 hiB, vec3 loB) {
vec3 t1 = hiA + hiB;
vec3 e = t1 - hiA;
vec3 t2 = ((hiB - e) + (hiA - (t1 - e))) + loA + loB;
return t1 + t2;
}`)}},31184:(xe,te,_)=>{_.d(te,{y:()=>I});var y=_(69676),B=_(53299);function H(D){D.code.add(B.H`vec4 premultiplyAlpha(vec4 v) {
return vec4(v.rgb * v.a, v.a);
}
vec3 rgb2hsv(vec3 c) {
vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
vec4 p = c.g < c.b ? vec4(c.bg, K.wz) : vec4(c.gb, K.xy);
vec4 q = c.r < p.x ? vec4(p.xyw, c.r) : vec4(c.r, p.yzx);
float d = q.x - min(q.w, q.y);
float e = 1.0e-10;
return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), min(d / (q.x + e), 1.0), q.x);
}
vec3 hsv2rgb(vec3 c) {
vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}
float rgb2v(vec3 c) {
return max(c.x, max(c.y, c.z));
}`)}function I(D){D.include(H),D.code.add(B.H`
    vec3 mixExternalColor(vec3 internalColor, vec3 textureColor, vec3 externalColor, int mode) {
      // workaround for artifacts in OSX using Intel Iris Pro
      // see: https://devtopia.esri.com/WebGIS/arcgis-js-api/issues/10475
      vec3 internalMixed = internalColor * textureColor;
      vec3 allMixed = internalMixed * externalColor;

      if (mode == ${B.H.int(y.a9.Multiply)}) {
        return allMixed;
      }
      if (mode == ${B.H.int(y.a9.Ignore)}) {
        return internalMixed;
      }
      if (mode == ${B.H.int(y.a9.Replace)}) {
        return externalColor;
      }

      // tint (or something invalid)
      float vIn = rgb2v(internalMixed);
      vec3 hsvTint = rgb2hsv(externalColor);
      vec3 hsvOut = vec3(hsvTint.x, hsvTint.y, vIn * hsvTint.z);
      return hsv2rgb(hsvOut);
    }

    float mixExternalOpacity(float internalOpacity, float textureOpacity, float externalOpacity, int mode) {
      // workaround for artifacts in OSX using Intel Iris Pro
      // see: https://devtopia.esri.com/WebGIS/arcgis-js-api/issues/10475
      float internalMixed = internalOpacity * textureOpacity;
      float allMixed = internalMixed * externalOpacity;

      if (mode == ${B.H.int(y.a9.Ignore)}) {
        return internalMixed;
      }
      if (mode == ${B.H.int(y.a9.Replace)}) {
        return externalOpacity;
      }

      // multiply or tint (or something invalid)
      return allMixed;
    }
  `)}},2012:(xe,te,_)=>{_.d(te,{f:()=>B});var y=_(53299);function B(H){H.code.add(y.H`const float MAX_RGBA4_FLOAT =
15.0 / 16.0 +
15.0 / 16.0 / 16.0 +
15.0 / 16.0 / 16.0 / 16.0 +
15.0 / 16.0 / 16.0 / 16.0 / 16.0;
const vec4 FIXED_POINT_FACTORS_RGBA4 = vec4(1.0, 16.0, 16.0 * 16.0, 16.0 * 16.0 * 16.0);
vec4 floatToRgba4(const float value) {
float valueInValidDomain = clamp(value, 0.0, MAX_RGBA4_FLOAT);
vec4 fixedPointU4 = floor(fract(valueInValidDomain * FIXED_POINT_FACTORS_RGBA4) * 16.0);
const float toU4AsFloat = 1.0 / 15.0;
return fixedPointU4 * toU4AsFloat;
}
const vec4 RGBA4_2_FLOAT_FACTORS = vec4(
15.0 / (16.0),
15.0 / (16.0 * 16.0),
15.0 / (16.0 * 16.0 * 16.0),
15.0 / (16.0 * 16.0 * 16.0 * 16.0)
);
float rgba4ToFloat(vec4 rgba) {
return dot(rgba, RGBA4_2_FLOAT_FACTORS);
}`)}},24542:(xe,te,_)=>{_(53299)},63982:(xe,te,_)=>{_.d(te,{hY:()=>F,Sv:()=>C,_8:()=>Z});var y=_(39061),B=_(41666),H=_(43548),I=_(73145),D=_(41841),A=_(85938),X=(_(69446),_(47832)),b=_(92426);class K extends X.x{constructor(se,j){super(se,"mat4",b.P.Draw,(ee,Q,q)=>ee.setUniformMatrix4fv(se,j(Q,q)))}}var ue=_(73205);function F(V,se){se.instancedDoublePrecision?V.constants.add("cameraPosition","vec3",I.AG):V.uniforms.add(new D.B("cameraPosition",(j,ee)=>(0,H.s)($,ee.camera.viewInverseTransposeMatrix[3]-j.origin[0],ee.camera.viewInverseTransposeMatrix[7]-j.origin[1],ee.camera.viewInverseTransposeMatrix[11]-j.origin[2])))}function C(V,se){if(!se.instancedDoublePrecision)return void V.uniforms.add(new ue.g("proj",(ee,Q)=>Q.camera.projectionMatrix),new K("view",(ee,Q)=>(0,y.Iu)(O,Q.camera.viewMatrix,ee.origin)),new D.B("localOrigin",ee=>ee.origin));const j=ee=>(0,H.s)($,ee.camera.viewInverseTransposeMatrix[3],ee.camera.viewInverseTransposeMatrix[7],ee.camera.viewInverseTransposeMatrix[11]);V.uniforms.add(new ue.g("proj",(ee,Q)=>Q.camera.projectionMatrix),new ue.g("view",(ee,Q)=>(0,y.Iu)(O,Q.camera.viewMatrix,j(Q))),new A.J("localOrigin",(ee,Q)=>j(Q)))}const O=(0,B.Ue)(),$=(0,I.Ue)();function Z(V){V.uniforms.add(new ue.g("viewNormal",(se,j)=>j.camera.viewInverseTransposeMatrix))}},95930:(xe,te,_)=>{_.d(te,{q:()=>H});var y=_(47832),B=_(92426);class H extends y.x{constructor(D,A){super(D,"vec2",B.P.Draw,(N,X,b,K)=>N.setUniform2fv(D,A(X,b,K)))}}},22946:(xe,te,_)=>{_.d(te,{A:()=>H});var y=_(47832),B=_(92426);class H extends y.x{constructor(D,A){super(D,"vec2",B.P.Pass,(N,X,b)=>N.setUniform2fv(D,A(X,b)))}}},41841:(xe,te,_)=>{_.d(te,{B:()=>H});var y=_(47832),B=_(92426);class H extends y.x{constructor(D,A){super(D,"vec3",B.P.Draw,(N,X,b,K)=>N.setUniform3fv(D,A(X,b,K)))}}},85938:(xe,te,_)=>{_.d(te,{J:()=>H});var y=_(47832),B=_(92426);class H extends y.x{constructor(D,A){super(D,"vec3",B.P.Pass,(N,X,b)=>N.setUniform3fv(D,A(X,b)))}}},93528:(xe,te,_)=>{_.d(te,{N:()=>H});var y=_(47832),B=_(92426);class H extends y.x{constructor(D,A){super(D,"vec4",B.P.Pass,(N,X,b)=>N.setUniform4fv(D,A(X,b)))}}},69446:(xe,te,_)=>{_.d(te,{p:()=>H});var y=_(47832),B=_(92426);class H extends y.x{constructor(D,A){super(D,"float",B.P.Pass,(N,X,b)=>N.setUniform1f(D,A(X,b)))}}},5718:(xe,te,_)=>{_.d(te,{_:()=>H});var y=_(47832),B=_(92426);class H extends y.x{constructor(D,A){super(D,"int",B.P.Pass,(N,X,b)=>N.setUniform1i(D,A(X,b)))}}},1159:(xe,te,_)=>{_.d(te,{j:()=>H});var y=_(47832),B=_(92426);class H extends y.x{constructor(D,A){super(D,"mat3",B.P.Draw,(N,X,b)=>N.setUniformMatrix3fv(D,A(X,b)))}}},11405:(xe,te,_)=>{_.d(te,{c:()=>H});var y=_(47832),B=_(92426);class H extends y.x{constructor(D,A){super(D,"mat3",B.P.Pass,(N,X,b)=>N.setUniformMatrix3fv(D,A(X,b)))}}},73205:(xe,te,_)=>{_.d(te,{g:()=>H});var y=_(47832),B=_(92426);class H extends y.x{constructor(D,A){super(D,"mat4",B.P.Pass,(N,X,b)=>N.setUniformMatrix4fv(D,A(X,b)))}}},90762:(xe,te,_)=>{_.d(te,{kG:()=>X});var y=_(57964),H=(_(14007),_(4703)),I=_(92426),D=_(98694);class N{constructor(){this._includedModules=new Map}include(j,ee){this._includedModules.has(j)?this._includedModules.get(j):(this._includedModules.set(j,ee),j(this.builder,ee))}}class X extends N{constructor(){super(...arguments),this.vertex=new ue,this.fragment=new ue,this.attributes=new F,this.varyings=new C,this.extensions=new O,this.constants=new Z,this.outputs=new $}get fragmentUniforms(){return this.fragment.uniforms.entries}get builder(){return this}generate(j){const ee=this.extensions.generateSource(j),Q=this.attributes.generateSource(j),q=this.varyings.generateSource(j),W="vertex"===j?this.vertex:this.fragment,oe=W.uniforms.generateSource(),ce=W.code.generateSource(),me="vertex"===j?V:k,Me=this.constants.generateSource().concat(W.constants.generateSource()),Pe=this.outputs.generateSource(j);return`#version 300 es\n${ee.join("\n")}\n\n${me}\n\n${Me.join("\n")}\n\n${oe.join("\n")}\n\n${Q.join("\n")}\n\n${q.join("\n")}\n\n${Pe.join("\n")}\n\n${ce.join("\n")}`}generateBindPass(j){const ee=new Map;this.vertex.uniforms.entries.forEach(W=>{const oe=W.bind[I.P.Pass];oe&&ee.set(W.name,oe)}),this.fragment.uniforms.entries.forEach(W=>{const oe=W.bind[I.P.Pass];oe&&ee.set(W.name,oe)});const Q=Array.from(ee.values()),q=Q.length;return(W,oe)=>{for(let ce=0;ce<q;++ce)Q[ce](j,W,oe)}}generateBindDraw(j){const ee=new Map;this.vertex.uniforms.entries.forEach(W=>{const oe=W.bind[I.P.Draw];oe&&ee.set(W.name,oe)}),this.fragment.uniforms.entries.forEach(W=>{const oe=W.bind[I.P.Draw];oe&&ee.set(W.name,oe)});const Q=Array.from(ee.values()),q=Q.length;return(W,oe,ce)=>{for(let me=0;me<q;++me)Q[me](j,W,oe,ce)}}}class b{constructor(j){this._stage=j,this._entries=new Map}add(...j){for(const ee of j)this._add(ee);return this._stage}get(j){return this._entries.get(j)}_add(j){if(null!=j){if(this._entries.has(j.name)&&!this._entries.get(j.name).equals(j))throw new y.Z(`Duplicate uniform name ${j.name} for different uniform type`);this._entries.set(j.name,j)}else H.Z.getLogger("esri.views.3d.webgl-engine.core.shaderModules.shaderBuilder").error(`Trying to add null Uniform from ${(new Error).stack}.`)}generateSource(){return Array.from(this._entries.values()).map(j=>null!=j.arraySize?`uniform ${j.type} ${j.name}[${j.arraySize}];`:`uniform ${j.type} ${j.name};`)}get entries(){return Array.from(this._entries.values())}}class K{constructor(j){this._stage=j,this._entries=new Array}add(j){return this._entries.push(j),this._stage}generateSource(){return this._entries}}class ue extends N{constructor(){super(...arguments),this.uniforms=new b(this),this.code=new K(this),this.constants=new Z}get builder(){return this}}class F{constructor(){this._entries=new Array}add(j,ee){this._entries.push([j,ee])}generateSource(j){return"fragment"===j?[]:this._entries.map(ee=>`in ${ee[1]} ${ee[0]};`)}}class C{constructor(){this._entries=new Map}add(j,ee){this._entries.has(j)&&(0,D.hu)(this._entries.get(j)===ee),this._entries.set(j,ee)}generateSource(j){const ee=new Array;return this._entries.forEach((Q,q)=>ee.push("vertex"===j?`out ${Q} ${q};`:`in ${Q} ${q};`)),ee}}class O{constructor(){this._entries=new Set}add(j){this._entries.add(j)}generateSource(j){const ee="vertex"===j?O.ALLOWLIST_VERTEX:O.ALLOWLIST_FRAGMENT;return Array.from(this._entries).filter(Q=>ee.includes(Q)).map(Q=>`#extension ${Q} : enable`)}}O.ALLOWLIST_FRAGMENT=["GL_EXT_shader_texture_lod","GL_OES_standard_derivatives"],O.ALLOWLIST_VERTEX=[];class ${constructor(){this._entries=new Map}add(j,ee,Q=0){const q=this._entries.get(Q);q?(0,D.hu)(q.name===j&&q.type===ee,`Fragment shader output location ${Q} occupied`):this._entries.set(Q,{name:j,type:ee})}generateSource(j){if("vertex"===j)return[];0===this._entries.size&&this._entries.set(0,{name:$.DEFAULT_NAME,type:$.DEFAULT_TYPE});const ee=new Array;return this._entries.forEach((Q,q)=>ee.push(`layout(location = ${q}) out ${Q.type} ${Q.name};`)),ee}}$.DEFAULT_TYPE="vec4",$.DEFAULT_NAME="fragColor";class Z{constructor(){this._entries=new Set}add(j,ee,Q){let q="ERROR_CONSTRUCTOR_STRING";switch(ee){case"float":q=Z._numberToFloatStr(Q);break;case"int":q=Z._numberToIntStr(Q);break;case"bool":q=Q.toString();break;case"vec2":q=`vec2(${Z._numberToFloatStr(Q[0])},                            ${Z._numberToFloatStr(Q[1])})`;break;case"vec3":q=`vec3(${Z._numberToFloatStr(Q[0])},                            ${Z._numberToFloatStr(Q[1])},                            ${Z._numberToFloatStr(Q[2])})`;break;case"vec4":q=`vec4(${Z._numberToFloatStr(Q[0])},                            ${Z._numberToFloatStr(Q[1])},                            ${Z._numberToFloatStr(Q[2])},                            ${Z._numberToFloatStr(Q[3])})`;break;case"ivec2":q=`ivec2(${Z._numberToIntStr(Q[0])},                             ${Z._numberToIntStr(Q[1])})`;break;case"ivec3":q=`ivec3(${Z._numberToIntStr(Q[0])},                             ${Z._numberToIntStr(Q[1])},                             ${Z._numberToIntStr(Q[2])})`;break;case"ivec4":q=`ivec4(${Z._numberToIntStr(Q[0])},                             ${Z._numberToIntStr(Q[1])},                             ${Z._numberToIntStr(Q[2])},                             ${Z._numberToIntStr(Q[3])})`;break;case"mat2":case"mat3":case"mat4":q=`${ee}(${Array.prototype.map.call(Q,W=>Z._numberToFloatStr(W)).join(", ")})`}return this._entries.add(`const ${ee} ${j} = ${q};`),this}static _numberToIntStr(j){return j.toFixed(0)}static _numberToFloatStr(j){return Number.isInteger(j)?j.toFixed(1):j.toString()}generateSource(){return Array.from(this._entries)}}const k="#ifdef GL_FRAGMENT_PRECISION_HIGH\n  precision highp float;\n  precision highp sampler2D;\n#else\n  precision mediump float;\n  precision mediump sampler2D;\n#endif",V="precision highp float;\nprecision highp sampler2D;"},22166:(xe,te,_)=>{_.d(te,{R:()=>H});var y=_(47832),B=_(92426);class H extends y.x{constructor(D,A){super(D,"sampler2D",B.P.Draw,(N,X,b)=>N.bindTexture(D,A(X,b)))}}},63243:(xe,te,_)=>{_.d(te,{A:()=>H});var y=_(47832),B=_(92426);class H extends y.x{constructor(D,A){super(D,"sampler2D",B.P.Pass,(N,X,b)=>N.bindTexture(D,A(X,b)))}}},47832:(xe,te,_)=>{_.d(te,{x:()=>B});var y=_(92426);class B{constructor(I,D,A,N,X=null){if(this.name=I,this.type=D,this.arraySize=X,this.bind={[y.P.Pass]:null,[y.P.Draw]:null},N)switch(A){case y.P.Pass:this.bind[y.P.Pass]=N;break;case y.P.Draw:this.bind[y.P.Draw]=N}}equals(I){return this.type===I.type&&this.name===I.name&&this.arraySize===I.arraySize}}},53299:(xe,te,_)=>{_.d(te,{H:()=>H,K:()=>B});const B=class y{};function H(I,...D){let A="";for(let N=0;N<D.length;N++)A+=I[N]+D[N];return A+=I[I.length-1],A}var I;(I=H||(H={})).int=function D(N){return Math.round(N).toString()},I.float=function A(N){return N.toPrecision(8)}},92426:(xe,te,_)=>{var y,B;_.d(te,{P:()=>y}),(B=y||(y={}))[B.Pass=0]="Pass",B[B.Draw=1]="Draw"},74532:(xe,te,_)=>{_.d(te,{J:()=>B});var y=_(15861);class B{constructor(I,D){this._module=I,this._loadModule=D}get(){return this._module}reload(){var I=this;return(0,y.Z)(function*(){return I._module=yield I._loadModule(),I._module})()}}},690:(xe,te,_)=>{_.d(te,{A:()=>H});var y=_(51172),B=_(39237);class H{constructor(D,A,N){this.release=N,this.initializeConfiguration(D,A),this._configuration=A.snapshot(),this._program=this.initializeProgram(D),this._pipeline=this.initializePipeline(D)}destroy(){this._program=(0,y.M2)(this._program),this._pipeline=this._configuration=null}reload(D){(0,y.M2)(this._program),this._program=this.initializeProgram(D),this._pipeline=this.initializePipeline(D)}get program(){return this._program}get compiled(){return this.program.compiled}get key(){return this._configuration.key}get configuration(){return this._configuration}ensureAttributeLocations(D){this.program.assertCompatibleVertexAttributeLocations(D)}get primitiveType(){return B.MX.TRIANGLES}getPipeline(D,A,N){return this._pipeline}initializeConfiguration(D,A){}}},61842:(xe,te,_)=>{_.d(te,{m:()=>B,o:()=>H});var y=_(53299);class B extends y.K{constructor(){super(),this._key="",this._keyDirty=!1,this._parameterBits=this._parameterBits?this._parameterBits.map(()=>0):[],this._parameterNames||(this._parameterNames=[])}get key(){return this._keyDirty&&(this._keyDirty=!1,this._key=String.fromCharCode.apply(String,this._parameterBits)),this._key}snapshot(){const D=this._parameterNames,A={key:this.key};for(const N of D)A[N]=this[N];return A}}function H(I={}){return(D,A)=>{if(D._parameterNames=D._parameterNames??[],D._parameterNames.push(A),null!=I.constValue)Object.defineProperty(D,A,{get:()=>I.constValue});else{const N=D._parameterNames.length-1,b=Math.ceil(Math.log2(I.count||2)),K=D._parameterBits??[0];let ue=0;for(;K[ue]+b>16;)ue++,ue>=K.length&&K.push(0);D._parameterBits=K;const F=K[ue],C=(1<<b)-1<<F;K[ue]+=b,Object.defineProperty(D,A,{get(){return this[N]},set(O){if(this[N]!==O&&(this[N]=O,this._keyDirty=!0,this._parameterBits[ue]=this._parameterBits[ue]&~C|+O<<F&C,"number"!=typeof O&&"boolean"!=typeof O))throw new Error("Configuration value for "+A+" must be boolean or number, got "+typeof O)}})}}}},36981:(xe,te,_)=>{_.d(te,{c:()=>B});var y=_(68160);class B{constructor(){this.id=(0,y.D)()}}},80914:(xe,te,_)=>{var y,B;_.d(te,{U:()=>y}),(B=y||(y={}))[B.Layer=0]="Layer",B[B.Object=1]="Object",B[B.Mesh=2]="Mesh",B[B.Line=3]="Line",B[B.Point=4]="Point",B[B.Material=5]="Material",B[B.Texture=6]="Texture",B[B.COUNT=7]="COUNT"},11661:(xe,te,_)=>{_.d(te,{i:()=>B});var y=_(55362);const B=new Map([[y.T.POSITION,0],[y.T.NORMAL,1],[y.T.NORMALCOMPRESSED,1],[y.T.UV0,2],[y.T.COLOR,3],[y.T.COLORFEATUREATTRIBUTE,3],[y.T.SIZE,4],[y.T.TANGENT,4],[y.T.CENTEROFFSETANDDISTANCE,5],[y.T.SYMBOLCOLOR,5],[y.T.FEATUREATTRIBUTE,6],[y.T.INSTANCEFEATUREATTRIBUTE,6],[y.T.INSTANCECOLOR,7],[y.T.OBJECTANDLAYERIDCOLOR,7],[y.T.INSTANCEOBJECTANDLAYERIDCOLOR,7],[y.T.INSTANCEMODEL,8],[y.T.INSTANCEMODELNORMAL,12],[y.T.INSTANCEMODELORIGINHI,11],[y.T.INSTANCEMODELORIGINLO,15]])},48261:(xe,te,_)=>{_.d(te,{F:()=>A});var y=_(51172),B=_(79412),H=_(53299),I=_(15182);class D{constructor(b){this._material=b.material,this._techniques=b.techniques,this._output=b.output}dispose(){this._techniques.release(this._technique)}get technique(){return this._technique}get _stippleTextures(){return this._techniques.constructionContext.stippleTextures}get _markerTextures(){return this._techniques.constructionContext.markerTextures}ensureTechnique(b,K){return this._technique=this._techniques.releaseAndAcquire(b,this._material.getConfiguration(this._output,K),this._technique),this._technique}ensureResources(b){return I.Rw.LOADED}}class A extends D{constructor(b){super(b),this._numLoading=0,this._disposed=!1,this._textures=b.textures,this._textureId=b.textureId,this._acquire(b.textureId,K=>this._texture=K),this._acquire(b.normalTextureId,K=>this._textureNormal=K),this._acquire(b.emissiveTextureId,K=>this._textureEmissive=K),this._acquire(b.occlusionTextureId,K=>this._textureOcclusion=K),this._acquire(b.metallicRoughnessTextureId,K=>this._textureMetallicRoughness=K)}dispose(){this._texture=(0,y.RY)(this._texture),this._textureNormal=(0,y.RY)(this._textureNormal),this._textureEmissive=(0,y.RY)(this._textureEmissive),this._textureOcclusion=(0,y.RY)(this._textureOcclusion),this._textureMetallicRoughness=(0,y.RY)(this._textureMetallicRoughness),this._disposed=!0}ensureResources(b){return 0===this._numLoading?I.Rw.LOADED:I.Rw.LOADING}get textureBindParameters(){return new N(null!=this._texture?this._texture.glTexture:null,null!=this._textureNormal?this._textureNormal.glTexture:null,null!=this._textureEmissive?this._textureEmissive.glTexture:null,null!=this._textureOcclusion?this._textureOcclusion.glTexture:null,null!=this._textureMetallicRoughness?this._textureMetallicRoughness.glTexture:null)}updateTexture(b){null!=this._texture&&b===this._texture.id||(this._texture=(0,y.RY)(this._texture),this._textureId=b,this._acquire(this._textureId,K=>this._texture=K))}_acquire(b,K){if(null==b)return void K(null);const ue=this._textures.acquire(b);if((0,B.y8)(ue))return++this._numLoading,void ue.then(F=>{if(this._disposed)return(0,y.RY)(F),void K(null);K(F)}).finally(()=>--this._numLoading);K(ue)}}class N extends H.K{constructor(b=null,K=null,ue=null,F=null,C=null,O,$){super(),this.texture=b,this.textureNormal=K,this.textureEmissive=ue,this.textureOcclusion=F,this.textureMetallicRoughness=C,this.scale=O,this.normalTextureTransformMatrix=$}}},64457:(xe,te,_)=>{_.d(te,{F5:()=>X,yD:()=>K});var K,F,y=_(73145),H=(_(53299),_(15182)),I=_(36981),D=_(80914),A=_(11661),N=_(22868);class X extends I.c{constructor(C,O){super(),this.type=D.U.Material,this.supportsEdges=!1,this._visible=!0,this._renderPriority=0,this._vertexAttributeLocations=A.i,this._pp0=(0,y.al)(0,0,1),this._pp1=(0,y.al)(0,0,0),this._parameters=(0,N.Uf)(C,O),this.validateParameters(this._parameters)}get parameters(){return this._parameters}update(C){return!1}setParameters(C,O=!0){(0,N.LO)(this._parameters,C)&&(this.validateParameters(this._parameters),O&&this.parametersChanged())}validateParameters(C){}get visible(){return this._visible}set visible(C){C!==this._visible&&(this._visible=C,this.parametersChanged())}shouldRender(C){return this.isVisible()&&this.isVisibleForOutput(C.output)&&(!this.parameters.isDecoration||C.bindParameters.decorations===H.Iq.ON)&&!!(this.parameters.renderOccluded&C.renderOccludedMask)}isVisibleForOutput(C){return!0}get renderPriority(){return this._renderPriority}set renderPriority(C){C!==this._renderPriority&&(this._renderPriority=C,this.parametersChanged())}get vertexAttributeLocations(){return this._vertexAttributeLocations}isVisible(){return this._visible}parametersChanged(){this.repository?.materialChanged(this)}queryRenderOccludedState(C){return this.isVisible()&&this.parameters.renderOccluded===C}intersectDraped(C,O,$,Z,k,V){return this._pp0[0]=this._pp1[0]=Z[0],this._pp0[1]=this._pp1[1]=Z[1],this.intersect(C,O,$,this._pp0,this._pp1,k)}}(F=K||(K={}))[F.None=0]="None",F[F.Occlude=1]="Occlude",F[F.Transparent=2]="Transparent",F[F.OccludeAndTransparent=4]="OccludeAndTransparent",F[F.OccludeAndTransparentStencil=8]="OccludeAndTransparentStencil",F[F.Opaque=16]="Opaque"},97940:(xe,te,_)=>{_.d(te,{$:()=>H});var y=_(43029),B=_(35208);class H{constructor(D,A,N){this._context=D,this._locations=N,this._textures=new Map,this._freeTextureUnits=new y.Z({deallocator:null}),this._glProgram=D.programCache.acquire(A.generate("vertex"),A.generate("fragment"),N),this._glProgram.stop=()=>{throw new Error("Wrapped _glProgram used directly")},this.bindPass=A.generateBindPass(this),this.bindDraw=A.generateBindDraw(this),this._fragmentUniforms=(0,B.hZ)()?A.fragmentUniforms:null}dispose(){this._glProgram.dispose()}get glName(){return this._glProgram.glName}get hasTransformFeedbackVaryings(){return this._glProgram.hasTransformFeedbackVaryings}get compiled(){return this._glProgram.compiled}setUniform1b(D,A){this._glProgram.setUniform1i(D,A?1:0)}setUniform1i(D,A){this._glProgram.setUniform1i(D,A)}setUniform1f(D,A){this._glProgram.setUniform1f(D,A)}setUniform2fv(D,A){this._glProgram.setUniform2fv(D,A)}setUniform3fv(D,A){this._glProgram.setUniform3fv(D,A)}setUniform4fv(D,A){this._glProgram.setUniform4fv(D,A)}setUniformMatrix3fv(D,A){this._glProgram.setUniformMatrix3fv(D,A)}setUniformMatrix4fv(D,A){this._glProgram.setUniformMatrix4fv(D,A)}setUniform1fv(D,A){this._glProgram.setUniform1fv(D,A)}setUniform1iv(D,A){this._glProgram.setUniform1iv(D,A)}setUniform2iv(D,A){this._glProgram.setUniform3iv(D,A)}setUniform3iv(D,A){this._glProgram.setUniform3iv(D,A)}setUniform4iv(D,A){this._glProgram.setUniform4iv(D,A)}assertCompatibleVertexAttributeLocations(D){D.locations!==this._locations&&console.error("VertexAttributeLocations are incompatible")}stop(){this._textures.clear(),this._freeTextureUnits.clear()}bindTexture(D,A){if(null==A?.glName){const X=this._textures.get(D);return X&&(this._context.bindTexture(null,X.unit),this._freeTextureUnit(X),this._textures.delete(D)),null}let N=this._textures.get(D);return null==N?(N=this._allocTextureUnit(A),this._textures.set(D,N)):N.texture=A,this._context.useProgram(this),this.setUniform1i(D,N.unit),this._context.bindTexture(A,N.unit),N.unit}rebindTextures(){this._context.useProgram(this),this._textures.forEach((D,A)=>{this._context.bindTexture(D.texture,D.unit),this.setUniform1i(A,D.unit)}),this._fragmentUniforms?.forEach(D=>{"sampler2D"!==D.type&&"samplerCube"!==D.type||this._textures.has(D.name)||console.error(`Texture sampler ${D.name} has no bound texture`)})}_allocTextureUnit(D){return{texture:D,unit:0===this._freeTextureUnits.length?this._textures.size:this._freeTextureUnits.pop()}}_freeTextureUnit(D){this._freeTextureUnits.push(D.unit)}}},59171:(xe,te,_)=>{var y,B;_.d(te,{A:()=>y}),(B=y||(y={}))[B.ColorAlpha=0]="ColorAlpha",B[B.FrontFace=1]="FrontFace",B[B.NONE=2]="NONE",B[B.COUNT=3]="COUNT"},98694:(xe,te,_)=>{_.d(te,{hu:()=>A,yK:()=>X}),_(89014),_(5710),(0,_(23515).Ue)();class D{constructor($){this.message=$}toString(){return`AssertException: ${this.message}`}}function A(O,$){if(!O){$=$||"Assertion";const Z=new Error($).stack;throw new D(`${$} at ${Z}`)}}function X(O,$,Z,k){let V,se=(Z[0]-O[0])/$[0],j=(k[0]-O[0])/$[0];se>j&&(V=se,se=j,j=V);let ee=(Z[1]-O[1])/$[1],Q=(k[1]-O[1])/$[1];if(ee>Q&&(V=ee,ee=Q,Q=V),se>Q||ee>j)return!1;ee>se&&(se=ee),Q<j&&(j=Q);let q=(Z[2]-O[2])/$[2],W=(k[2]-O[2])/$[2];return q>W&&(V=q,q=W,W=V),!(se>W||q>j||(W<j&&(j=W),j<0))}},22868:(xe,te,_)=>{_.d(te,{FZ:()=>q,Uf:()=>j,LO:()=>ee,Hx:()=>se});var y=_(57678),B=_(55117);_(92867),(0,B.Vl)(10),(0,B.Vl)(12),(0,B.Vl)(70),(0,B.Vl)(40);const k={scale:0,factor:0,minScaleFactor:0};function se(W,oe,ce,me,Me){let Pe=(ce.screenLength||0)*W.pixelRatio;null!=Me&&(Pe=function F(W,oe,ce,me){return function X(W,oe){return(0,B.t7)(W*Math.max(oe.scale,oe.minScaleFactor),W,oe.factor)}(W,function N(W,oe,ce){const me=ce.parameters;return k.scale=Math.min(me.divisor/(oe-me.offset),1),k.factor=function A(W){return Math.abs(W*W*W)}(W),k}(oe,ce,me))}(Pe,me,oe,Me));const ke=Pe*Math.tan(.5*W.fovY)/(.5*W.fullHeight);return(0,B.uZ)(ke*oe,ce.minWorldLength||0,null!=ce.maxWorldLength?ce.maxWorldLength:1/0)}function j(W,oe){const ce=oe?j(oe):{};for(const me in W){let Me=W[me];Me?.forEach&&(Me=Q(Me)),null==Me&&me in ce||(ce[me]=Me)}return ce}function ee(W,oe){let ce=!1;for(const me in oe){const Me=oe[me];void 0!==Me&&(Array.isArray(Me)?null===W[me]?(W[me]=Me.slice(),ce=!0):(0,y.Vx)(W[me],Me)&&(ce=!0):W[me]!==Me&&(ce=!0,W[me]=Me))}return ce}function Q(W){const oe=[];return W.forEach(ce=>oe.push(ce)),oe}const q={multiply:1,ignore:2,replace:3,tint:4}},8648:(xe,te,_)=>{function y(A,N,X){for(let b=0;b<X;++b)N[2*b]=A[b],N[2*b+1]=A[b]-N[2*b]}function H(A,N){const X=A.length;for(let b=0;b<X;++b)D[0]=A[b],N[b]=D[0];return N}function I(A,N){const X=A.length;for(let b=0;b<X;++b)D[0]=A[b],D[1]=A[b]-D[0],N[b]=D[1];return N}_.d(te,{GB:()=>I,LF:()=>y,U8:()=>H});const D=new Float32Array(2)},89877:(xe,te,_)=>{_.d(te,{BK:()=>b,LZ:()=>X,if:()=>H,jp:()=>Ye,sm:()=>se,wK:()=>I,zp:()=>N});var y=_(15182),B=_(39237);function H(de,be,Ce=B.db.ADD,Be=[0,0,0,0]){return{srcRgb:de,srcAlpha:de,dstRgb:be,dstAlpha:be,opRgb:Ce,opAlpha:Ce,color:{r:Be[0],g:Be[1],b:Be[2],a:Be[3]}}}function I(de,be,Ce,Be,_t=B.db.ADD,qe=B.db.ADD,ie=[0,0,0,0]){return{srcRgb:de,srcAlpha:be,dstRgb:Ce,dstAlpha:Be,opRgb:_t,opAlpha:qe,color:{r:ie[0],g:ie[1],b:ie[2],a:ie[3]}}}const D={face:B.LR.BACK,mode:B.Wf.CCW},A={face:B.LR.FRONT,mode:B.Wf.CCW},N=de=>de===y.Vr.Back?D:de===y.Vr.Front?A:null,X={zNear:0,zFar:1},b={r:!0,g:!0,b:!0,a:!0};function K(de){return Q.intern(de)}function ue(de){return W.intern(de)}function F(de){return ce.intern(de)}function C(de){return Me.intern(de)}function O(de){return ke.intern(de)}function $(de){return st.intern(de)}function Z(de){return rt.intern(de)}function k(de){return Te.intern(de)}function V(de){return pe.intern(de)}function se(de){return ge.intern(de)}class j{constructor(be,Ce){this._makeKey=be,this._makeRef=Ce,this._interns=new Map}intern(be){if(!be)return null;const Ce=this._makeKey(be),Be=this._interns;return Be.has(Ce)||Be.set(Ce,this._makeRef(be)),Be.get(Ce)??null}}function ee(de){return"["+de.join(",")+"]"}const Q=new j(q,de=>({__tag:"Blending",...de}));function q(de){return de?ee([de.srcRgb,de.srcAlpha,de.dstRgb,de.dstAlpha,de.opRgb,de.opAlpha,de.color.r,de.color.g,de.color.b,de.color.a]):null}const W=new j(oe,de=>({__tag:"Culling",...de}));function oe(de){return de?ee([de.face,de.mode]):null}const ce=new j(me,de=>({__tag:"PolygonOffset",...de}));function me(de){return de?ee([de.factor,de.units]):null}const Me=new j(Pe,de=>({__tag:"DepthTest",...de}));function Pe(de){return de?ee([de.func]):null}const ke=new j(at,de=>({__tag:"StencilTest",...de}));function at(de){return de?ee([de.function.func,de.function.ref,de.function.mask,de.operation.fail,de.operation.zFail,de.operation.zPass]):null}const st=new j(Le,de=>({__tag:"DepthWrite",...de}));function Le(de){return de?ee([de.zNear,de.zFar]):null}const rt=new j(lt,de=>({__tag:"ColorWrite",...de}));function lt(de){return de?ee([de.r,de.g,de.b,de.a]):null}const Te=new j(ye,de=>({__tag:"StencilWrite",...de}));function ye(de){return de?ee([de.mask]):null}const pe=new j(Je,de=>({__tag:"DrawBuffers",...de}));function Je(de){return de?ee(de.buffers):null}const ge=new j(function Re(de){return de?ee([q(de.blending),oe(de.culling),me(de.polygonOffset),Pe(de.depthTest),at(de.stencilTest),Le(de.depthWrite),lt(de.colorWrite),ye(de.stencilWrite),Je(de.drawBuffers)]):null},de=>({blending:K(de.blending),culling:ue(de.culling),polygonOffset:F(de.polygonOffset),depthTest:C(de.depthTest),stencilTest:O(de.stencilTest),depthWrite:$(de.depthWrite),colorWrite:Z(de.colorWrite),stencilWrite:k(de.stencilWrite),drawBuffers:V(de.drawBuffers)}));class Ye{constructor(be){this._pipelineInvalid=!0,this._blendingInvalid=!0,this._cullingInvalid=!0,this._polygonOffsetInvalid=!0,this._depthTestInvalid=!0,this._stencilTestInvalid=!0,this._depthWriteInvalid=!0,this._colorWriteInvalid=!0,this._stencilWriteInvalid=!0,this._drawBuffersInvalid=!0,this._stateSetters=be}setPipeline(be){(this._pipelineInvalid||be!==this._pipeline)&&(this._setBlending(be.blending),this._setCulling(be.culling),this._setPolygonOffset(be.polygonOffset),this._setDepthTest(be.depthTest),this._setStencilTest(be.stencilTest),this._setDepthWrite(be.depthWrite),this._setColorWrite(be.colorWrite),this._setStencilWrite(be.stencilWrite),this._setDrawBuffers(be.drawBuffers),this._pipeline=be),this._pipelineInvalid=!1}invalidateBlending(){this._blendingInvalid=!0,this._pipelineInvalid=!0}invalidateCulling(){this._cullingInvalid=!0,this._pipelineInvalid=!0}invalidatePolygonOffset(){this._polygonOffsetInvalid=!0,this._pipelineInvalid=!0}invalidateDepthTest(){this._depthTestInvalid=!0,this._pipelineInvalid=!0}invalidateStencilTest(){this._stencilTestInvalid=!0,this._pipelineInvalid=!0}invalidateDepthWrite(){this._depthWriteInvalid=!0,this._pipelineInvalid=!0}invalidateColorWrite(){this._colorWriteInvalid=!0,this._pipelineInvalid=!0}invalidateStencilWrite(){this._stencilTestInvalid=!0,this._pipelineInvalid=!0}invalidateDrawBuffers(){this._drawBuffersInvalid=!0,this._pipelineInvalid=!0}_setBlending(be){this._blending=this._setSubState(be,this._blending,this._blendingInvalid,this._stateSetters.setBlending),this._blendingInvalid=!1}_setCulling(be){this._culling=this._setSubState(be,this._culling,this._cullingInvalid,this._stateSetters.setCulling),this._cullingInvalid=!1}_setPolygonOffset(be){this._polygonOffset=this._setSubState(be,this._polygonOffset,this._polygonOffsetInvalid,this._stateSetters.setPolygonOffset),this._polygonOffsetInvalid=!1}_setDepthTest(be){this._depthTest=this._setSubState(be,this._depthTest,this._depthTestInvalid,this._stateSetters.setDepthTest),this._depthTestInvalid=!1}_setStencilTest(be){this._stencilTest=this._setSubState(be,this._stencilTest,this._stencilTestInvalid,this._stateSetters.setStencilTest),this._stencilTestInvalid=!1}_setDepthWrite(be){this._depthWrite=this._setSubState(be,this._depthWrite,this._depthWriteInvalid,this._stateSetters.setDepthWrite),this._depthWriteInvalid=!1}_setColorWrite(be){this._colorWrite=this._setSubState(be,this._colorWrite,this._colorWriteInvalid,this._stateSetters.setColorWrite),this._colorWriteInvalid=!1}_setStencilWrite(be){this._stencilWrite=this._setSubState(be,this._stencilWrite,this._stencilWriteInvalid,this._stateSetters.setStencilWrite),this._stencilTestInvalid=!1}_setDrawBuffers(be){this._drawBuffers=this._setSubState(be,this._drawBuffers,this._drawBuffersInvalid,this._stateSetters.setDrawBuffers),this._drawBuffersInvalid=!1}_setSubState(be,Ce,Be,_t){return(Be||be!==Ce)&&(_t(be),this._pipelineInvalid=!0),be}}}}]);