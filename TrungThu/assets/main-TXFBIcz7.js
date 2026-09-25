import {f as Tn, R as me, h as Wn, D as O, C as Kn, i as rt, j as pe, k as Se, l as st, F as qn, m as Zn, n as Jn, o as Qn, H as Ye, q as ea, r as ta, s as it, t as na, u as $t, L as Bt, e as aa, O as oa, v as we, w as Vt, p as Ht, x as ra} from "./config-Bb1R82Qk.js";
import {r as l, j as g, u as Ae, a as ke, T as sa, b as ia, C as ca, A as la, O as ua, c as fa} from "./fiber-C9CpB_0h.js";
import {r as re, c as B, ad as Ie, ae as We, u as Gt, aa as Ke, ab as te, a3 as Sn, af as Lt, ag as Ee, t as ha, D as qe, ah as An, F as jt, ai as kn, x as bt, aj as da, ak as ma, al as xe, am as ct, a7 as Ut, an as Be, ao as pa, ap as Xt, p as Yt, h as Wt} from "./three-YEApjGS9.js";
import {E as ga, B as ya} from "./post-UaYqWOfJ.js";
const Qe = "/assets/intro/"
  , wa = "http://www.w3.org/2000/svg"
  , F = (e, t, n) => {
    const o = document.createElementNS(wa, e);
    for (const a in t)
        o.setAttribute(a, t[a]);
    return n && n.appendChild(o),
    o
}
  , oe = (e, t) => e + Math.random() * (t - e)
  , ba = e => Array.isArray(e) ? oe(e[0], e[1]) : e;
function xa() {
    const e = new Set;
    return {
        cancelled: !1,
        after(t, n) {
            if (this.cancelled)
                return 0;
            const o = setTimeout( () => {
                e.delete(o),
                this.cancelled || t()
            }
            , n);
            return e.add(o),
            o
        },
        clear() {
            this.cancelled = !0;
            for (const t of e)
                clearTimeout(t);
            e.clear()
        }
    }
}
function ve(e) {
    const t = e.placement;
    if (t.mode === "box")
        return t.boxPx;
    const n = t.targetContentBoxPx
      , o = e.asset
      , a = o.alphaContentRectPx;
    if (t.mode === "alpha-content-box-stretch") {
        const s = n.width / a.width
          , i = n.height / a.height;
        return {
            x: n.x - a.x * s,
            y: n.y - a.y * i,
            width: o.width * s,
            height: o.height * i
        }
    }
    const r = Math.min(n.width / a.width, n.height / a.height);
    return {
        x: n.x + (n.width - a.width * r) / 2 - a.x * r,
        y: n.y + (n.height - a.height * r) / 2 - a.y * r,
        width: o.width * r,
        height: o.height * r
    }
}
function xt(e, t) {
    return F("image", {
        href: Qe + e.file,
        x: t.x,
        y: t.y,
        width: t.width,
        height: t.height,
        preserveAspectRatio: "none",
        "data-layer": e.id
    })
}
function Kt(e, t, n) {
    if (n)
        return;
    const o = t.animation || {}
      , a = ve(t);
    if (o.transformOrigin) {
        const [c,y] = o.transformOrigin.split(" ").map(parseFloat);
        e.style.transformOrigin = `${a.x + a.width * c / 100}px ${a.y + a.height * y / 100}px`
    } else
        e.style.transformOrigin = `${a.x + a.width / 2}px ${a.y + a.height / 2}px`;
    const r = ba(o.durationSeconds || 6) * 1e3
      , s = (o.delaySeconds || 0) * 1e3
      , i = {
        duration: r,
        iterations: 1 / 0,
        direction: "alternate",
        easing: "ease-in-out",
        delay: s
    }
      , u = () => o.translateXPx ? o.translateXPx : o.translateXPercent ? [a.width * o.translateXPercent[0] / 100, a.width * o.translateXPercent[1] / 100] : [0, 0];
    switch (o.preset) {
    case "lantern-float":
        {
            const [c,y] = o.translateYPx
              , [f,h] = o.rotateDegrees;
            e.animate([{
                transform: `translateY(${c}px) rotate(${f}deg)`
            }, {
                transform: `translateY(${y}px) rotate(${h}deg)`
            }], i);
            break
        }
    case "glow-pulse":
        e.animate([{
            transform: `scale(${o.scale[0]})`,
            opacity: o.opacity[0]
        }, {
            transform: `scale(${o.scale[1]})`,
            opacity: o.opacity[1]
        }], i);
        break;
    case "twinkle":
        e.animate([{
            opacity: o.opacity[1]
        }, {
            opacity: o.opacity[0]
        }], {
            ...i,
            duration: 3e3
        });
        break;
    case "slow-drift":
    case "parallax-x":
    case "cloud-drift":
        {
            const [c,y] = u();
            e.animate([{
                transform: `translateX(${c}px)`
            }, {
                transform: `translateX(${y}px)`
            }], i);
            break
        }
    case "branch-sway":
        {
            const [c,y] = o.rotateDegrees;
            e.animate([{
                transform: `rotate(${c}deg)`
            }, {
                transform: `rotate(${y}deg)`
            }], i);
            break
        }
    case "rabbit-breathe":
        {
            const [c,y] = o.translateYPx
              , [f,h] = o.scale;
            e.animate([{
                transform: `translateY(${c}px) scale(${f})`
            }, {
                transform: `translateY(${y}px) scale(${h})`
            }], i);
            break
        }
    }
}
function va(e, t, n, {reduced: o, timers: a}) {
    const r = e.repeat
      , s = ve(e)
      , i = s.x + s.width / 2
      , u = s.y + s.height / 2
      , c = /flower/.test(e.id)
      , y = n.bloomSpots || []
      , f = n.fallFloor || n.scene.referenceCanvas.height
      , h = n.scene.referenceCanvas.width / 551
      , m = d => {
        if (a.cancelled || !d.isConnected)
            return;
        const p = y[Math.floor(Math.random() * y.length)]
          , w = p.x + oe(-14, 14) * h
          , x = p.y + oe(-6, 10) * h
          , M = oe(r.randomScale[0], r.randomScale[1])
          , C = oe(0, 360)
          , b = Math.min(oe(150, 300) * h, f - x)
          , _ = oe(-40, 40) * h
          , T = oe(8, 22) * h * (Math.random() < .5 ? -1 : 1)
          , S = oe(90, 260) * (Math.random() < .5 ? -1 : 1)
          , j = oe(c ? 6500 : 5500, c ? 10500 : 9500);
        d.style.transformOrigin = `${i}px ${u}px`;
        const P = (k, N) => {
            const z = w - i + _ * k + T * Math.sin(N)
              , he = x - u + b * (k * k * .35 + k * .65);
            return `translate(${z}px, ${he}px) scale(${M}) rotate(${C + S * k}deg)`
        }
          , E = []
          , D = 8;
        for (let k = 0; k <= D; k++) {
            const N = k / D
              , z = N < .12 ? N / .12 : N > .72 ? Math.max(0, 1 - (N - .72) / .28) : 1;
            E.push({
                transform: P(N, N * Math.PI * 2.2),
                opacity: z * .95,
                offset: N
            })
        }
        d.animate(E, {
            duration: j,
            easing: "linear",
            fill: "forwards"
        }).finished.then( () => {
            a.cancelled || !d.isConnected || a.after( () => m(d), oe(300, 4500))
        }
        ).catch( () => {}
        )
    }
    ;
    for (let d = 0; d < r.recommendedCount; d++) {
        const p = F("g", {}, t);
        p.appendChild(xt(e, s)),
        p.style.opacity = "0",
        !(o || !y.length) && a.after( () => m(p), oe(0, 6e3))
    }
}
const lt = new Map;
function Ma(e) {
    const t = Qe + e.file;
    if (lt.has(t))
        return lt.get(t);
    const n = new Promise( (o, a) => {
        const r = new Image;
        r.onload = () => {
            try {
                const s = r.naturalWidth
                  , i = r.naturalHeight
                  , u = document.createElement("canvas");
                u.width = s,
                u.height = i;
                const c = u.getContext("2d");
                c.drawImage(r, 0, 0);
                const y = c.getImageData(0, 0, s, i).data
                  , f = e.asset.alphaContentRectPx
                  , h = f.x + f.width / 2
                  , m = f.y + f.height / 2
                  , d = 360
                  , p = 3
                  , w = [];
                let x = 1e9
                  , M = 1e9
                  , C = -1e9
                  , b = -1e9;
                for (let T = 0; T < d; T++) {
                    const S = T / d * Math.PI * 2
                      , j = Math.cos(S)
                      , P = Math.sin(S);
                    let E = 0;
                    for (; E < s; E++) {
                        const N = Math.round(h + j * E)
                          , z = Math.round(m + P * E);
                        if (N < 0 || z < 0 || N >= s || z >= i || y[(z * s + N) * 4 + 3] > 40)
                            break
                    }
                    const D = Math.max(0, E - p)
                      , A = h + j * D
                      , k = m + P * D;
                    w.push([A, k]),
                    A < x && (x = A),
                    A > C && (C = A),
                    k < M && (M = k),
                    k > b && (b = k)
                }
                const _ = w.map( ([T,S], j) => (j ? "L" : "M") + T.toFixed(1) + " " + S.toFixed(1)).join(" ") + " Z";
                o({
                    d: _,
                    bbox: {
                        x,
                        y: M,
                        width: C - x,
                        height: b - M
                    }
                })
            } catch (s) {
                a(s)
            }
        }
        ,
        r.onerror = () => a(new Error("Không đọc được ảnh khung")),
        r.src = t
    }
    );
    return lt.set(t, n),
    n
}
async function Ta({root: e, layout: t, kind: n, flags: o, timers: a, reg: r, isCancelled: s, onStart: i, onHide: u, markDone: c}) {
    const {reduced: y, skyBlue: f, hiddenLayers: h} = o
      , m = t.scene.referenceCanvas
      , d = t.layers.find(v => v.id === "window-frame");
    let p = null;
    try {
        p = await Ma(d)
    } catch (v) {
        console.warn("Dùng đường cắt trong layout vì không suy được từ ảnh khung:", v)
    }
    if (s())
        return;
    const w = n === "desktop";
    e.classList.toggle("desktop", w),
    e.style.backgroundColor = t.scene.backgroundColor || "#050a14";
    const x = F("svg", {
        class: "poster " + n,
        viewBox: m.viewBox,
        role: "img",
        "aria-label": "Thiệp Trung thu",
        preserveAspectRatio: w ? "xMidYMid slice" : "xMidYMid meet"
    }, e);
    let M = null
      , C = null
      , b = {
        x: 0,
        y: 0,
        width: m.width,
        height: m.height
    };
    const _ = () => {
        if (w)
            return;
        const v = Math.min(innerWidth / m.width, innerHeight / m.height)
          , R = innerWidth / v
          , I = innerHeight / v;
        let le = (t.scene.portraitFocusY || m.height / 2) - I / 2;
        I >= m.height && (le = Math.max(m.height - I, Math.min(0, le))),
        b = {
            x: (m.width - R) / 2,
            y: le,
            width: R,
            height: I
        },
        x.setAttribute("viewBox", `${b.x} ${b.y} ${R} ${I}`);
        const H = t.scene.moonHint;
        C && H && (C.setAttribute("x", b.x + R / 2),
        C.setAttribute("y", b.y + I - (H.screenBottomPx || 38) / v),
        C.setAttribute("font-size", (H.screenFontPx || 14) / v)),
        M && (M.setAttribute("x", b.x),
        M.setAttribute("y", b.y),
        M.setAttribute("width", b.width),
        M.setAttribute("height", b.height))
    }
    ;
    _(),
    window.addEventListener("resize", _),
    r( () => window.removeEventListener("resize", _));
    const T = F("defs", {}, x)
      , S = F("clipPath", {
        id: "window-aperture",
        clipPathUnits: "userSpaceOnUse"
    }, T);
    let j;
    if (p) {
        const v = ve(d)
          , R = v.width / d.asset.width
          , I = v.height / d.asset.height;
        S.setAttribute("transform", `translate(${v.x} ${v.y}) scale(${R} ${I})`),
        F("path", {
            d: p.d
        }, S),
        j = {
            x: v.x + p.bbox.x * R,
            y: v.y + p.bbox.y * I,
            width: p.bbox.width * R,
            height: p.bbox.height * I
        }
    } else {
        const R = F("path", {
            d: t.clipPaths["window-aperture"].d
        }, S).getBBox();
        j = {
            x: R.x,
            y: R.y,
            width: R.width,
            height: R.height
        }
    }
    const P = F("radialGradient", {
        id: "moon-halo-gradient"
    }, T);
    F("stop", {
        offset: "0%",
        "stop-color": "#fff6d6",
        "stop-opacity": "0.9"
    }, P),
    F("stop", {
        offset: "35%",
        "stop-color": "#ffe7a8",
        "stop-opacity": "0.45"
    }, P),
    F("stop", {
        offset: "70%",
        "stop-color": "#ffd98a",
        "stop-opacity": "0.12"
    }, P),
    F("stop", {
        offset: "100%",
        "stop-color": "#ffd98a",
        "stop-opacity": "0"
    }, P);
    const E = F("filter", {
        id: "moon-soft",
        x: "-50%",
        y: "-50%",
        width: "200%",
        height: "200%"
    }, T);
    F("feGaussianBlur", {
        stdDeviation: String(6 * m.width / 551)
    }, E);
    const D = F("radialGradient", {
        id: "dark-sky-gradient",
        cx: "32%",
        cy: "28%",
        r: "85%"
    }, T);
    F("stop", {
        offset: "0%",
        "stop-color": "#171326"
    }, D),
    F("stop", {
        offset: "45%",
        "stop-color": "#08070f"
    }, D),
    F("stop", {
        offset: "100%",
        "stop-color": "#000000"
    }, D);
    const A = [...t.layers].sort( (v, R) => v.zIndex - R.zIndex)
      , k = A.find(v => v.id === "full-moon")
      , N = k.placement.targetContentBoxPx
      , z = {
        cx: N.x + N.width / 2,
        cy: N.y + N.height / 2,
        r: Math.min(N.width, N.height) / 2
    }
      , he = k.interactive && k.interactive.hitSlopPx || 14
      , ge = k.interactive && k.interactive.holdDurationMs || 1500
      , V = j
      , K = {
        cx: V.x + V.width / 2,
        cy: V.y + V.height / 2,
        w: V.width,
        h: V.height
    }
      , G = {}
      , L = F("g", {
        id: "window-group"
    })
      , U = F("g", {
        "clip-path": "url(#window-aperture)"
    }, L);
    let X = !1;
    for (const v of A) {
        if (h.has(v.id))
            continue;
        if (v.group === "particles") {
            const I = F("g", {
                id: "g-" + v.id
            }, x);
            G[v.id] = I,
            va(v, I, t, {
                reduced: y,
                timers: a
            });
            continue
        }
        const R = F("g", {
            id: "g-" + v.id
        });
        if (!w && v.placement.mode === "box" && v.zIndex === 0) {
            M = F("image", {
                href: Qe + v.file,
                x: b.x,
                y: b.y,
                width: b.width,
                height: b.height,
                preserveAspectRatio: "xMidYMid slice"
            }),
            R.appendChild(M),
            G[v.id] = R,
            x.appendChild(R);
            continue
        }
        if (v.id === "night-sky" && !f) {
            const I = ve(v);
            F("rect", {
                x: I.x - I.width,
                y: I.y - I.height,
                width: I.width * 3,
                height: I.height * 3,
                fill: "url(#dark-sky-gradient)"
            }, R)
        } else
            R.appendChild(xt(v, ve(v)));
        if (G[v.id] = R,
        v.group === "window-content") {
            U.appendChild(R);
            continue
        }
        if (v.id === "window-frame") {
            L.appendChild(R),
            x.appendChild(L),
            X = !0;
            continue
        }
        x.appendChild(R),
        Kt(R, v, y)
    }
    for (const v of A)
        v.group === "window-content" && G[v.id] && Kt(G[v.id], v, y);
    X || x.appendChild(L);
    const W = Math.max(m.width, m.height) * 4
      , q = F("rect", {
        id: "intro-dim",
        x: -W,
        y: -W,
        width: W * 2 + m.width,
        height: W * 2 + m.height,
        fill: "#1a0208",
        opacity: "0",
        "pointer-events": "none"
    }, x)
      , Y = F("g", {
        id: "moon-ui"
    }, x)
      , Z = F("circle", {
        class: "moon-hit",
        cx: z.cx,
        cy: z.cy,
        r: z.r + he,
        tabindex: "0",
        role: "button",
        "aria-label": k.interactive && k.interactive.ariaLabel || "Ấn và giữ mặt trăng để mở thiệp"
    }, Y)
      , J = F("circle", {
        class: "moon-halo",
        cx: z.cx,
        cy: z.cy,
        r: z.r * 1.9,
        filter: "url(#moon-soft)",
        "pointer-events": "none"
    }, Y);
    J.style.transformOrigin = `${z.cx}px ${z.cy}px`,
    y || J.animate([{
        opacity: .32,
        transform: "scale(1)"
    }, {
        opacity: .55,
        transform: "scale(1.06)"
    }], {
        duration: 3200,
        iterations: 1 / 0,
        direction: "alternate",
        easing: "ease-in-out"
    });
    const De = F("g", {
        "clip-path": "url(#window-aperture)",
        opacity: "0",
        "pointer-events": "none"
    }, Y);
    De.appendChild(xt(k, ve(k))),
    De.style.transformOrigin = `${z.cx}px ${z.cy}px`;
    const _t = G["full-moon"];
    _t.style.transformOrigin = `${z.cx}px ${z.cy}px`;
    const ce = t.scene.moonHint;
    let Oe = null;
    ce && ce.text && (Oe = F("g", {
        class: "moon-hint",
        "pointer-events": "none"
    }, Y),
    C = F("text", {
        x: ce.centerX != null ? ce.centerX : z.cx,
        y: ce.baselineY != null ? ce.baselineY : 0,
        "font-size": ce.fontSizePx != null ? ce.fontSizePx : 16,
        "text-anchor": "middle"
    }, Oe),
    C.textContent = ce.text,
    y || C.animate([{
        opacity: .62
    }, {
        opacity: 1
    }], {
        duration: 2200,
        iterations: 1 / 0,
        direction: "alternate",
        easing: "ease-in-out"
    }),
    _()),
    function() {
        if (y)
            return;
        const R = m.height / 100
          , I = "cubic-bezier(.2,.75,.25,1)"
          , ee = (H, se, ie, $e, ue) => {
            if (!H || !H.parentNode)
                return;
            const Le = F("g", {
                class: "intro-enter"
            });
            H.parentNode.insertBefore(Le, H),
            Le.appendChild(H),
            Le.animate([{
                opacity: 0,
                transform: `translate(${se}px, ${ie}px)`
            }, {
                opacity: 1,
                transform: "translate(0px, 0px)"
            }], {
                duration: ue,
                delay: $e,
                easing: I,
                fill: "backwards"
            })
        }
          , le = A.find(H => H.zIndex === 0);
        le && ee(G[le.id], 0, 0, 0, 850),
        ee(L, 0, -2.2 * R, 120, 950);
        for (const H of A) {
            const se = G[H.id];
            if (!se || H.zIndex === 0 || H.id === "window-frame" || H.group === "window-content")
                continue;
            const ie = H.id;
            ie.startsWith("lantern") ? ee(se, 0, 5.5 * R, 430, 1050) : ie.startsWith("cloud") ? ee(se, (ie.includes("left") ? -4 : 4) * R, 0, 330, 1050) : ie.includes("branch") ? ee(se, 0, 4.5 * R, 520, 1050) : ie === "jade-rabbit" ? ee(se, 0, 2.8 * R, 700, 950) : H.group === "particles" ? ee(se, 0, 0, 950, 800) : ee(se, 0, 0, 500, 900)
        }
        ee(Y, 0, 0, 1020, 850)
    }();
    let de = !1
      , Ce = !1
      , ne = 0
      , Nt = 0
      , be = 0;
    const Hn = () => {
        ne > 0 ? (J.getAnimations().forEach(v => v.cancel()),
        J.style.opacity = String(.4 + .6 * ne),
        J.style.transform = `scale(${1 + .9 * ne})`) : (J.style.opacity = "",
        J.style.transform = ""),
        q.setAttribute("opacity", String(.6 * ne)),
        De.setAttribute("opacity", String(ne)),
        Z.style.transform = _t.style.transform = De.style.transform = `scale(${1 + .06 * ne})`,
        Oe && Oe.setAttribute("opacity", String(1 - ne))
    }
      , nt = v => {
        if (!Ce) {
            if (ne = de ? Math.min(1, (v - Nt) / ge) : Math.max(0, ne - .04),
            Hn(),
            de && ne >= 1)
                return Gn();
            (de || ne > 0) && (be = requestAnimationFrame(nt))
        }
    }
      , at = v => {
        Ce || de || (v && v.preventDefault && v.preventDefault(),
        de = !0,
        Nt = performance.now() - ne * ge,
        e.classList.add("holding"),
        cancelAnimationFrame(be),
        be = requestAnimationFrame(nt))
    }
      , ye = () => {
        Ce || !de || (de = !1,
        e.classList.remove("holding"),
        cancelAnimationFrame(be),
        be = requestAnimationFrame(nt))
    }
      , zt = v => v.preventDefault()
      , Dt = v => {
        (v.code === "Space" || v.code === "Enter") && !v.repeat && at(v)
    }
      , Ot = v => {
        (v.code === "Space" || v.code === "Enter") && ye()
    }
    ;
    Z.addEventListener("pointerdown", at),
    window.addEventListener("pointerup", ye),
    window.addEventListener("pointercancel", ye),
    window.addEventListener("blur", ye),
    Z.addEventListener("contextmenu", zt),
    Z.addEventListener("keydown", Dt),
    Z.addEventListener("keyup", Ot),
    r( () => {
        Ce = !0,
        cancelAnimationFrame(be),
        window.removeEventListener("pointerup", ye),
        window.removeEventListener("pointercancel", ye),
        window.removeEventListener("blur", ye),
        Z.removeEventListener("pointerdown", at),
        Z.removeEventListener("contextmenu", zt),
        Z.removeEventListener("keydown", Dt),
        Z.removeEventListener("keyup", Ot)
    }
    );
    function Gn() {
        Ce = !0,
        de = !1,
        c(),
        e.classList.remove("holding"),
        e.classList.add("done"),
        Y.animate([{
            opacity: 1
        }, {
            opacity: 0
        }], {
            duration: 500,
            fill: "forwards"
        }),
        q.animate([{
            opacity: .6
        }, {
            opacity: 0
        }], {
            duration: 700,
            fill: "forwards"
        });
        const v = "cubic-bezier(.4,0,.2,1)"
          , R = m.width / 551
          , I = (ue, Le, Un, Xn) => {
            const ot = G[ue];
            ot && (ot.getAnimations().forEach(Yn => Yn.cancel()),
            ot.animate([{
                transform: "translateY(0px)",
                opacity: 1
            }, {
                transform: `translateY(${Le * R}px)`,
                opacity: 0
            }], {
                duration: Un,
                delay: Xn,
                easing: v,
                fill: "forwards"
            }))
        }
        ;
        I("lantern-large-over-frame", -260, 1500, 0),
        I("lantern-medium-center", -220, 1400, 80),
        I("lantern-medium", -220, 1400, 80),
        I("lantern-small-right", -180, 1300, 160),
        I("lantern-distant", -140, 1200, 220),
        I("osmanthus-branch", 120, 1100, 0),
        I("osmanthus-branch-desktop", 120, 1100, 0),
        I("jade-rabbit", 120, 1100, 0);
        for (const ue of ["cloud-left", "cloud-right", "cloud-left-desktop", "cloud-right-desktop"])
            I(ue, 0, 700, 0);
        for (const ue of A)
            ue.group === "particles" && G[ue.id] && G[ue.id].animate([{
                opacity: 1
            }, {
                opacity: 0
            }], {
                duration: 600,
                fill: "forwards"
            });
        const ee = G["red-background"] || G["desktop-background"];
        ee && ee.animate([{
            opacity: 1
        }, {
            opacity: 0
        }], {
            duration: 900,
            delay: 700,
            fill: "forwards"
        }),
        e.animate([{
            backgroundColor: e.style.backgroundColor
        }, {
            backgroundColor: "#000"
        }], {
            duration: 1200,
            delay: 500,
            fill: "forwards"
        }),
        e.animate([{
            opacity: 1
        }, {
            opacity: 1,
            offset: .42
        }, {
            opacity: 0
        }], {
            duration: 3e3,
            easing: "linear",
            fill: "forwards"
        });
        const le = x.getScreenCTM()
          , H = le.a
          , se = Math.max(innerWidth / (K.w * H), innerHeight / (K.h * H)) * 1.25
          , ie = x.createSVGPoint();
        ie.x = innerWidth / 2,
        ie.y = innerHeight / 2;
        const $e = ie.matrixTransform(le.inverse());
        L.style.transformOrigin = `${K.cx}px ${K.cy}px`,
        L.animate([{
            transform: "translate(0px, 0px) scale(1)"
        }, {
            transform: `translate(${$e.x - K.cx}px, ${$e.y - K.cy}px) scale(${se})`
        }], {
            duration: 2e3,
            delay: 350,
            easing: "cubic-bezier(.55,0,.3,1)",
            fill: "forwards"
        }),
        G["window-frame"].animate([{
            opacity: 1
        }, {
            opacity: 0
        }], {
            duration: 900,
            delay: 900,
            fill: "forwards"
        }),
        U.animate([{
            opacity: 1
        }, {
            opacity: 1,
            offset: .55
        }, {
            opacity: 0
        }], {
            duration: 2e3,
            delay: 900,
            fill: "forwards"
        }),
        a.after(i, 1e3),
        a.after(u, 3100)
    }
}
function Sa({rootRef: e, enabled: t, onStart: n, onHide: o}) {
    const a = l.useMemo( () => {
        const h = new URLSearchParams(location.search);
        return {
            force: h.get("layout"),
            skyBlue: h.get("sky") === "blue",
            hiddenLayers: new Set(h.get("mountains") === "1" ? [] : ["mountains"]),
            reduced: Tn()
        }
    }
    , [])
      , r = l.useMemo( () => window.matchMedia("(min-width: 900px) and (min-aspect-ratio: 4/3)"), [])
      , s = () => a.force === "desktop" ? "desktop" : a.force === "mobile" ? "mobile" : r.matches ? "desktop" : "mobile"
      , [i,u] = l.useState(s)
      , c = l.useRef(!1)
      , y = l.useRef(n)
      , f = l.useRef(o);
    y.current = n,
    f.current = o,
    l.useEffect( () => {
        if (a.force)
            return;
        const h = () => {
            c.current || u(s())
        }
        ;
        return r.addEventListener("change", h),
        () => r.removeEventListener("change", h)
    }
    , [r, a.force]),
    l.useEffect( () => {
        const h = e.current;
        if (!t || !h)
            return;
        let m = !1;
        const d = () => m
          , p = xa()
          , w = []
          , x = b => w.push(b)
          , M = new AbortController;
        return fetch(Qe + (i === "desktop" ? "layout.desktop.json" : "layout.json"), {
            signal: M.signal
        }).then(b => b.json()).then(b => {
            if (!m)
                return Ta({
                    root: h,
                    layout: b,
                    kind: i,
                    flags: a,
                    timers: p,
                    reg: x,
                    isCancelled: d,
                    onStart: () => y.current && y.current(),
                    onHide: () => f.current && f.current(),
                    markDone: () => {
                        c.current = !0
                    }
                })
        }
        ).catch(b => {
            m || b.name === "AbortError" || (console.error("Không dựng được màn mở đầu:", b),
            c.current = !0,
            y.current && y.current(),
            f.current && f.current())
        }
        ),
        () => {
            m = !0,
            M.abort(),
            p.clear();
            for (const b of w)
                try {
                    b()
                } catch {}
            h.getAnimations && h.getAnimations().forEach(b => b.cancel()),
            h.replaceChildren(),
            h.classList.remove("desktop", "holding", "done"),
            h.style.backgroundColor = "",
            h.style.opacity = ""
        }
    }
    , [i, t])
}
function Aa({onStart: e, skip: t=!1}) {
    const n = l.useRef(null)
      , [o,a] = l.useState(!0)
      , r = l.useRef(!1)
      , s = l.useRef(e);
    s.current = e;
    const i = l.useCallback( () => {
        r.current || (r.current = !0,
        s.current && s.current())
    }
    , [])
      , u = l.useCallback( () => a(!1), [])
      , [c] = l.useState( () => t || new URLSearchParams(location.search).get("autostart") === "1");
    return l.useEffect( () => {
        c && (i(),
        a(!1))
    }
    , [c, i]),
    Sa({
        rootRef: n,
        enabled: o && !c,
        onStart: i,
        onHide: u
    }),
    !o || c ? null : g.jsx("div", {
        className: "intro",
        ref: n
    })
}
const Pt = {
    paragraphs: ["Gửi bạn,", "Trung thu năm nay lại về rồi 🌕 Ngoài kia đèn lồng đã treo kín phố, mùi bánh nướng thơm len qua từng con ngõ nhỏ.", "Mình vẫn nhớ cái đêm đầu tiên hai đứa ngồi xem đèn trời bay lên 🏮 Cậu bảo ước gì năm nào cũng được như thế này.", "Năm nay đèn vẫn bay, trăng vẫn tròn, và mình thì vẫn ở đây ❤️ vẫn muốn nói với cậu đúng câu ấy thêm một lần nữa.", "Có những điều dịu dàng chỉ cần nhớ đến thôi là đủ khiến cả một khoảnh khắc trở nên ấm áp, dù ngoài kia trời đã trở lạnh từ lâu 🍂", "Chú thỏ trên cung trăng chắc cũng đang mải giã bánh 🐰 còn mình thì ngồi đây viết cho cậu vài dòng, mong cậu đọc được rồi mỉm cười 🌙", "Chúc cậu một mùa Trung thu thật bình yên ✨ Mong những điều dịu dàng nhất luôn tìm được đường đến với cậu."]
}
  , Ve = {
    speedMs: 42,
    minSpeedMs: 28,
    maxTotalMs: 22e3
}
  , ut = "/assets/nguyet-thu"
  , ka = 620
  , Ca = 300;
function La(e) {
    try {
        if (typeof Intl < "u" && Intl.Segmenter)
            return Array.from(new Intl.Segmenter("vi",{
                granularity: "grapheme"
            }).segment(e), t => t.segment)
    } catch {}
    return Array.from(e)
}
function Cn(e) {
    const t = ((e == null ? void 0 : e.text) ?? Pt.paragraphs.join(`
`)).replace(/\r\n?/g, `
`).trim()
      , n = La(t)
      , o = n.length ? Math.max(Ve.minSpeedMs, Math.min(Ve.speedMs, Ve.maxTotalMs / n.length)) : Ve.speedMs;
    return {
        fullText: t,
        graphemes: n,
        msPerChar: o
    }
}
const Ln = Cn({
    text: Pt.paragraphs.join(`
`)
})
  , qt = /https?:\/\/[^\s<>"']+/g;
function ja(e, t) {
    e.textContent = "";
    let n = 0, o;
    for (qt.lastIndex = 0; (o = qt.exec(t)) !== null; ) {
        let a = o[0]
          , r = "";
        const s = a.match(/[.,;:!?)\]]+$/);
        if (s && (r = s[0],
        a = a.slice(0, -r.length)),
        !a)
            continue;
        o.index > n && e.appendChild(document.createTextNode(t.slice(n, o.index)));
        const i = document.createElement("a");
        i.href = a,
        i.textContent = a,
        i.target = "_blank",
        i.rel = "noopener noreferrer",
        e.appendChild(i),
        r && e.appendChild(document.createTextNode(r)),
        n = o.index + o[0].length
    }
    n < t.length && e.appendChild(document.createTextNode(t.slice(n)))
}
function Pa({active: e, runId: t, typedRef: n, cursorRef: o, boxRef: a, onDone: r, noiDung: s}) {
    const i = l.useRef(null);
    return l.useEffect( () => {
        let u = !1;
        if (!e)
            return;
        const {fullText: c, graphemes: y, msPerChar: f} = s || Ln
          , h = n.current
          , m = o.current
          , d = a.current;
        if (!h || !d)
            return;
        let p = null
          , w = 0
          , x = 0
          , M = 0
          , C = 0;
        function b() {
            h.textContent = "",
            p = document.createTextNode(""),
            h.appendChild(p),
            w = 0,
            d.scrollTop = 0,
            m && (m.hidden = !1)
        }
        function _(E) {
            !p || E <= w || (p.appendData(y.slice(w, E).join("")),
            w = E,
            d.scrollTop = 1e9)
        }
        function T(E) {
            if (_(y.length),
            ja(h, c),
            p = null,
            m && (m.hidden = !0),
            u || (u = !0,
            r == null || r()),
            !E) {
                d.scrollTop = 0;
                return
            }
            d.scrollTop = 1e9,
            M = requestAnimationFrame( () => {
                M = 0,
                d.scrollTop = d.scrollHeight
            }
            )
        }
        function S() {
            x && (cancelAnimationFrame(x),
            x = 0),
            C && (clearTimeout(C),
            C = 0)
        }
        function j() {
            S(),
            !(!p && w >= y.length) && T(!1)
        }
        function P() {
            const E = performance.now()
              , D = () => {
                x = 0;
                const A = Math.min(y.length, Math.floor((performance.now() - E) / f));
                if (_(A),
                w >= y.length) {
                    T(!0);
                    return
                }
                x = requestAnimationFrame(D)
            }
            ;
            x = requestAnimationFrame(D)
        }
        return i.current = j,
        b(),
        C = setTimeout( () => {
            C = 0,
            P()
        }
        , ka),
        () => {
            S(),
            M && (cancelAnimationFrame(M),
            M = 0),
            i.current = null
        }
    }
    , [e, t, n, o, a, r, s]),
    l.useCallback( () => {
        i.current && i.current()
    }
    , [])
}
function Ra({open: e, onClose: t, onOpenHeart: n, showHeart: o=!0, noiDung: a=Ln}) {
    const [r,s] = l.useState(!1)
      , [i,u] = l.useState(!1)
      , [c,y] = l.useState(0)
      , f = l.useRef(!1)
      , h = l.useRef(null)
      , m = l.useRef(null)
      , d = l.useRef(null)
      , p = l.useRef(null)
      , w = l.useRef(null)
      , [x,M] = l.useState(!1)
      , C = l.useRef(null)
      , b = r && !i && x
      , [_,T] = l.useState(!1)
      , S = l.useCallback( () => T(!0), [])
      , j = Pa({
        active: b,
        runId: c,
        typedRef: d,
        cursorRef: p,
        boxRef: m,
        onDone: S,
        noiDung: a
    });
    l.useEffect( () => {
        if (e) {
            f.current = !0,
            h.current = document.activeElement,
            s(!0),
            u(!1),
            y(k => k + 1),
            T(!1),
            M(!1);
            return
        }
        if (!f.current)
            return;
        u(!0);
        const A = setTimeout( () => {
            s(!1),
            u(!1)
        }
        , Ca);
        return () => clearTimeout(A)
    }
    , [e]),
    l.useEffect( () => {
        if (r)
            return;
        const A = h.current;
        A && typeof A.focus == "function" && A.focus(),
        h.current = null
    }
    , [r]),
    l.useEffect( () => {
        b && w.current && w.current.focus()
    }
    , [b, c]),
    l.useEffect( () => {
        if (!b)
            return;
        const A = k => {
            k.key === "Escape" && t()
        }
        ;
        return window.addEventListener("keydown", A),
        () => window.removeEventListener("keydown", A)
    }
    , [b, t]),
    l.useEffect( () => {
        if (!r || x)
            return;
        const A = C.current;
        if (!A)
            return;
        const k = () => M(!0);
        if (A.complete && A.naturalWidth > 0) {
            k();
            return
        }
        A.addEventListener("load", k),
        A.addEventListener("error", k);
        const N = setTimeout(k, 6e3);
        return () => {
            A.removeEventListener("load", k),
            A.removeEventListener("error", k),
            clearTimeout(N)
        }
    }
    , [r, x, c]);
    const P = l.useCallback(A => {
        A.target === A.currentTarget && t()
    }
    , [t])
      , E = l.useCallback(A => {
        A.target.closest(".nt-close") || A.target.closest(".nt-toheart") || A.target.closest("a") || j()
    }
    , [j])
      , D = l.useCallback( () => {
        t(),
        n == null || n()
    }
    , [t, n]);
    return r ? g.jsx("div", {
        className: i ? "nt-backdrop nt-closing" : "nt-backdrop",
        onMouseDown: P,
        children: g.jsxs("section", {
            className: x ? "nt-dialog nt-san" : "nt-dialog",
            role: "dialog",
            "aria-modal": "true",
            "aria-label": "Lá thư",
            onClick: E,
            children: [g.jsxs("picture", {
                className: "nt-sheet",
                "aria-hidden": "true",
                children: [g.jsx("source", {
                    media: "(max-width: 767px)",
                    srcSet: `${ut}/paper-straight.webp`
                }), g.jsx("img", {
                    ref: C,
                    src: `${ut}/paper.webp`,
                    alt: ""
                })]
            }), g.jsx("button", {
                ref: w,
                className: "nt-close",
                type: "button",
                "aria-label": "Đóng lá thư",
                onClick: t,
                children: g.jsx("svg", {
                    viewBox: "0 0 24 24",
                    "aria-hidden": "true",
                    focusable: "false",
                    children: g.jsx("path", {
                        d: "M8.4 8.4 15.6 15.6M15.6 8.4 8.4 15.6"
                    })
                })
            }), g.jsx("div", {
                className: "nt-letter",
                ref: m,
                "aria-live": "polite",
                children: g.jsx("div", {
                    className: "nt-letter-inner",
                    children: g.jsxs("p", {
                        className: "nt-copy",
                        children: [g.jsx("span", {
                            className: "nt-typed",
                            ref: d
                        }), g.jsx("b", {
                            className: "nt-cursor",
                            ref: p,
                            "aria-hidden": "true"
                        })]
                    })
                })
            }), g.jsx("img", {
                className: "nt-rabbit",
                src: `${ut}/rabbit-cloud.webp`,
                alt: "Thỏ ngọc trên mây"
            }), o && _ ? g.jsx("button", {
                type: "button",
                className: "nt-toheart",
                onClick: D,
                title: "Mở trái tim",
                "aria-label": "Mở trái tim",
                children: g.jsx("img", {
                    src: "/assets/ui/btn-heart.webp",
                    alt: "",
                    draggable: !1
                })
            }) : null]
        })
    }, c) : null
}
const et = {
    started: O.autostart
};
function Ea() {
    et.started = !0
}
const vt = new re(me.hong.a)
  , Mt = new re(me.hong.b);
function jn(e) {
    const t = me[e] || me.hong;
    vt.set(t.a),
    Mt.set(t.b)
}
let Ze = "hong";
function Ia(e) {
    Ze = me[e] ? e : "hong",
    jn(Ze)
}
function Fa(e) {
    Ze = me[e] ? e : "hong",
    jn(Ze)
}
try {
    localStorage.removeItem(Wn)
} catch {}
const Me = {
    open: !1,
    since: 0
};
function Zt(e) {
    Me.open = !!e,
    Me.since = performance.now()
}
function _a() {
    if (!Me.open && !Me.since)
        return 1;
    const e = Math.min(1, (performance.now() - Me.since) / 1e3 / Kn)
      , t = e * e * (3 - 2 * e);
    return Me.open ? 1 - (1 - rt) * t : rt + (1 - rt) * t
}
const Fe = {
    startedAt: -1
};
function Na() {
    return Fe.startedAt >= 0 ? !1 : (Fe.startedAt = performance.now(),
    !0)
}
function za() {
    Fe.startedAt = -1
}
function Pn() {
    return Fe.startedAt < 0 ? 0 : Math.min(1, (performance.now() - Fe.startedAt) / 1e3 / O.flySecs)
}
const Je = e => Math.min(Number.isFinite(e) && e > 0 ? e : 1 / 60, 1 / 30)
  , Tt = e => e < 0 ? 0 : e > 1 ? 1 : e
  , Rn = e => {
    const t = Tt(e);
    return t * t * (3 - 2 * t)
}
;
function Da(e, t, n) {
    let o = e + st * t * n;
    return (st > 0 ? o > Se : o < pe) && (o = st > 0 ? pe : Se),
    o
}
function ft(e) {
    const t = Tt((e - pe) / (qn - pe))
      , n = Tt((Se - e) / (Se - Zn));
    return Rn(t * n)
}
const ht = (e, t, n) => Math.sin(e * .55 + n) * t
  , Rt = () => pe + Math.random() * (Se - pe);
function Oa({onDone: e}) {
    const t = Ae(o => o.camera)
      , n = l.useRef({
        t: 0,
        done: !1,
        from: new B(...Qn),
        to: new B(...Jn)
    });
    return l.useEffect( () => {
        n.current.done || t.position.copy(n.current.from)
    }
    , [t]),
    ke( (o, a) => {
        const r = n.current;
        if (r.done)
            return;
        if (!et.started) {
            t.position.copy(r.from);
            return
        }
        r.t += Je(a);
        const s = Math.min(1, r.t / ta)
          , i = 1 - Math.pow(1 - s, 3);
        t.position.lerpVectors(r.from, r.to, i),
        s >= 1 && (r.done = !0,
        e == null || e())
    }
    , -2),
    null
}
function $a({onDone: e}) {
    const t = Ae(o => o.camera)
      , n = l.useRef({
        done: !1,
        from: null,
        to: new B(...ea),
        lookFrom: new B(0,0,0),
        lookTo: new B(...Ye),
        look: new B
    });
    return ke( () => {
        const o = n.current;
        if (o.done)
            return;
        o.from || (o.from = t.position.clone());
        const a = Pn()
          , r = a * a * a * (a * (a * 6 - 15) + 10);
        t.position.lerpVectors(o.from, o.to, r),
        o.look.lerpVectors(o.lookFrom, o.lookTo, r),
        t.lookAt(o.look),
        a >= 1 && (o.done = !0,
        t.position.copy(o.to),
        t.lookAt(o.lookTo),
        e == null || e())
    }
    , -2),
    null
}
const Jt = 12
  , Ba = 7
  , Va = 26
  , Qt = .55
  , en = .12
  , tn = e => e * 180 / Math.PI
  , nn = (e, t) => t * Math.tanh(e / t);
function Ha({imgRef: e, active: t}) {
    const n = Ae(i => i.camera)
      , o = l.useMemo( () => new B(...Ye), [])
      , a = l.useMemo( () => new B, [])
      , r = l.useRef(null)
      , s = l.useRef({
        yaw: 0,
        pitch: 0
    });
    return ke( () => {
        const i = e == null ? void 0 : e.current;
        if (!i)
            return;
        if (!t) {
            r.current && (r.current = null,
            i.style.transform = "");
            return
        }
        a.subVectors(n.position, o);
        const u = a.length() || 1
          , c = Math.atan2(a.x, a.z)
          , y = Math.asin(Ie.clamp(a.y / u, -1, 1));
        r.current || (r.current = {
            az: c,
            el: y
        });
        let f = c - r.current.az;
        for (; f > Math.PI; )
            f -= Math.PI * 2;
        for (; f < -Math.PI; )
            f += Math.PI * 2;
        const h = y - r.current.el
          , m = nn(-tn(f) * Qt, Jt)
          , d = nn(tn(h) * Qt, Ba);
        s.current.yaw += (m - s.current.yaw) * en,
        s.current.pitch += (d - s.current.pitch) * en;
        const p = s.current.yaw / Jt * Va;
        i.style.transform = `translateX(${p.toFixed(2)}px) rotateY(${s.current.yaw.toFixed(2)}deg) rotateX(${s.current.pitch.toFixed(2)}deg)`
    }
    ),
    null
}
const _e = {
    seed: 20260915,
    shape: {
        width: 21,
        aspect: 1.25,
        thicknessRatio: .32,
        notch: .15,
        lobe: .72
    },
    particles: {
        countDesktop: 22e3,
        countMobile: 1e4,
        innerRatio: .02,
        baseSize: .36,
        sizeJitter: .5,
        sparkRatio: .015,
        sparkSize: 1.8,
        maxPixelSize: 9,
        opacity: 1,
        gain: 1.7,
        densityNoise: {
            freq: .18,
            min: .55
        },
        brightJitter: .18
    },
    colors: {
        champagne: "#FFD58A",
        amber: "#FFB454",
        coral: "#FF756D",
        warmRed: "#D94B58",
        rim: "#FFE7B0",
        hueJitter: .025,
        coralBoost: 1.32
    },
    lighting: {
        keyDir: [-.6, .72, .45],
        fillDir: [.75, -.1, .55],
        ambient: .42,
        key: .7,
        fill: .22,
        backDim: .3,
        rim: .35,
        rimPower: 3,
        innerDim: .4
    },
    motion: {
        breathAmp: .015,
        breathSpeed: 1.25,
        wobbleAmp: .05,
        twinkleSpeed: 2.6,
        swayDeg: 8,
        swaySpeed: .18
    },
    orbit: {
        radiusX: .92,
        radiusZ: .4,
        tiltDeg: 26,
        rollDeg: -6,
        dustCount: {
            desktop: 3200,
            mobile: 1600
        },
        dustSize: .46,
        dustColor: "#FFD98A",
        dustOpacity: .8,
        sparkRatio: .03,
        speed: .09,
        thickness: .09,
        radialSpread: .16,
        yOffset: -.36
    }
};
function En(e) {
    let t = e >>> 0;
    return function() {
        t = t + 1831565813 >>> 0;
        let n = t;
        return n = Math.imul(n ^ n >>> 15, n | 1),
        n ^= n + Math.imul(n ^ n >>> 7, n | 61),
        ((n ^ n >>> 14) >>> 0) / 4294967296
    }
}
function In() {
    const t = new URLSearchParams(location.search).get("quality");
    if (t === "low" || t === "high")
        return t === "low" ? "mobile" : "desktop";
    const n = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      , o = Math.min(innerWidth, innerHeight) < 700
      , a = (navigator.hardwareConcurrency || 8) <= 4;
    return n || o || a ? "mobile" : "desktop"
}
function Ga(e) {
    const t = (o, a, r) => {
        let s = Math.imul(o, 374761393) + Math.imul(a, 668265263) + Math.imul(r, 1274126177) + Math.imul(e | 0, 97) | 0;
        return s = Math.imul(s ^ s >>> 13, 1103515245),
        s = (s ^ s >>> 16) >>> 0,
        s / 4294967296
    }
      , n = o => o * o * (3 - 2 * o);
    return (o, a, r) => {
        const s = Math.floor(o)
          , i = Math.floor(a)
          , u = Math.floor(r)
          , c = n(o - s)
          , y = n(a - i)
          , f = n(r - u);
        let h = 0;
        for (let m = 0; m <= 1; m++)
            for (let d = 0; d <= 1; d++)
                for (let p = 0; p <= 1; p++)
                    h += (p ? c : 1 - c) * (d ? y : 1 - y) * (m ? f : 1 - f) * t(s + p, i + d, u + m);
        return h
    }
}
function Ua(e, t, n, o=.22, a=1) {
    if (o > 0 && n > 0) {
        const i = Math.min(1, n / .7);
        n += o * Math.exp(-(e * e) / (.42 * .42)) * i * i
    }
    const r = e * e + 2.25 * t * t + n * n - 1;
    return r * r * r - a * (e * e + .1125 * t * t) * n * n * n
}
function *Xa(e, t=_e) {
    const n = t.shape
      , o = t.particles
      , a = En(t.seed)
      , r = n.notch ?? .22
      , s = n.lobe ?? 1
      , i = Ga(t.seed)
      , u = o.densityNoise || {
        freq: 0,
        min: 1
    }
      , c = 1.3
      , y = -1.15
      , f = 1.3
      , h = .75
      , m = .001
      , d = .035
      , p = (L, U, X) => Ua(L, U, X, r, s)
      , w = new B
      , x = (L, U, X, W) => (w.set((p(L + m, U, X) - W) / m, (p(L, U + m, X) - W) / m, (p(L, U, X + m) - W) / m),
    w)
      , M = Math.round(e * o.innerRatio)
      , C = e - M
      , b = new Float32Array(e * 3)
      , _ = new Float32Array(e * 3)
      , T = new Float32Array(e);
    let S = 0
      , j = 0;
    for (; S < C && j < C * 400; ) {
        j++,
        j & 255 || (yield);
        let L = (a() * 2 - 1) * c
          , U = (a() * 2 - 1) * h
          , X = y + a() * (f - y)
          , W = p(L, U, X)
          , q = x(L, U, X, W)
          , Y = q.length() + 1e-6;
        if (!(Math.abs(W / Y) > d)) {
            for (let Z = 0; Z < 3; Z++) {
                const J = W / (Y * Y);
                L -= J * q.x,
                U -= J * q.y,
                X -= J * q.z,
                W = p(L, U, X),
                q = x(L, U, X, W),
                Y = q.length() + 1e-6
            }
            if (!(Math.abs(W / Y) > .005)) {
                if (u.freq > 0) {
                    const Z = i(L * u.freq * 10 + 7.1, X * u.freq * 10 + 3.3, U * u.freq * 10 + 5.7);
                    if (a() > u.min + (1 - u.min) * Z)
                        continue
                }
                b.set([L, X, U], S * 3),
                _.set([q.x / Y, q.z / Y, q.y / Y], S * 3),
                S++
            }
        }
    }
    const P = S;
    let E = 0;
    for (j = 0; E < M && j < M * 400; ) {
        j++,
        j & 255 || (yield);
        const L = (a() * 2 - 1) * c
          , U = (a() * 2 - 1) * h
          , X = y + a() * (f - y)
          , W = p(L, U, X);
        if (W >= 0)
            continue;
        const q = x(L, U, X, W)
          , Y = q.length() + 1e-6;
        if (W / Y > -.05)
            continue;
        const J = P + E;
        b.set([L, X, U], J * 3),
        _.set([q.x / Y, q.z / Y, q.y / Y], J * 3),
        T[J] = 1,
        E++
    }
    const D = P + E
      , A = new Gt
      , k = new B;
    for (let L = 0; L < P; L++)
        A.expandByPoint(k.fromArray(b, L * 3));
    const N = new B
      , z = new B;
    A.getSize(N),
    A.getCenter(z);
    const he = n.width / N.x
      , ge = n.width / n.aspect / N.y
      , V = n.width * n.thicknessRatio / N.z
      , K = new B;
    for (let L = 0; L < D; L++)
        b[L * 3] = (b[L * 3] - z.x) * he,
        b[L * 3 + 1] = (b[L * 3 + 1] - z.y) * ge,
        b[L * 3 + 2] = (b[L * 3 + 2] - z.z) * V,
        K.fromArray(_, L * 3),
        K.set(K.x / he, K.y / ge, K.z / V).normalize(),
        _.set([K.x, K.y, K.z], L * 3);
    const G = new Gt(new B(-n.width / 2,-(n.width / n.aspect) / 2,-(n.width * n.thicknessRatio) / 2),new B(n.width / 2,n.width / n.aspect / 2,n.width * n.thicknessRatio / 2));
    return {
        count: D,
        positions: b.subarray(0, D * 3),
        normals: _.subarray(0, D * 3),
        inner: T.subarray(0, D),
        rng: a,
        box: G
    }
}
const Ya = `
  attribute float aSize;
  attribute float aPhase;
  attribute float aSpark;
  attribute float aInner;
  attribute vec3 aColor;
  uniform float uTime;
  uniform float uPixelRatio;
  uniform float uSizeScale;
  uniform float uMaxSize;
  uniform float uBreathAmp;
  uniform float uBreathSpeed;
  uniform float uWobble;
  uniform float uPulse;
  varying vec3 vColor;
  varying vec3 vNormalV;
  varying vec3 vViewDir;
  varying float vSpark;
  varying float vPhase;
  varying float vInner;
  void main() {
    float breath = 1.0 + uBreathAmp * sin(uTime * uBreathSpeed) + uPulse;
    vec3 p = position * breath;
    p += normal * (uWobble * sin(uTime * 1.7 + aPhase * 6.2831));
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    float sizePx = aSize * uSizeScale * uPixelRatio * (320.0 / -mv.z);
    gl_PointSize = clamp(sizePx, 1.2, uMaxSize * uPixelRatio);
    vColor = aColor;
    vNormalV = normalize(normalMatrix * normal);
    vViewDir = normalize(-mv.xyz);
    vSpark = aSpark;
    vPhase = aPhase;
    vInner = aInner;
  }
`
  , Wa = `
  uniform float uTime;
  uniform vec3 uLightDir;
  uniform vec3 uFillDir;
  uniform float uAmbient;
  uniform float uKey;
  uniform float uFill;
  uniform float uBackDim;
  uniform float uRim;
  uniform float uRimPower;
  uniform vec3 uRimColor;
  uniform float uInnerDim;
  uniform float uOpacity;
  uniform float uGain;
  uniform float uTwinkleSpeed;
  uniform float uPulse;
  varying vec3 vColor;
  varying vec3 vNormalV;
  varying vec3 vViewDir;
  varying float vSpark;
  varying float vPhase;
  varying float vInner;
  void main() {
    vec2 uv = gl_PointCoord * 2.0 - 1.0;
    float d2 = dot(uv, uv);
    if (d2 > 1.0) discard;
    float r = sqrt(d2);
    float core = exp(-d2 * 10.0);
    float halo = pow(1.0 - r, 3.0);
    float shapeA = core * 0.9 + halo * 0.3;

    vec3 N = normalize(vNormalV);
    vec3 L = normalize(uLightDir);
    vec3 V = normalize(vViewDir);
    float ndl = dot(N, L);
    float wrap = clamp((ndl + 0.4) / 1.4, 0.0, 1.0);
    float fill = clamp(dot(N, normalize(uFillDir)), 0.0, 1.0);
    float diffuse = uAmbient + uKey * wrap + uFill * fill;
    float facing = dot(N, V);
    float back = mix(uBackDim, 1.0, smoothstep(-0.5, 0.3, facing));
    float fres = pow(1.0 - clamp(facing, 0.0, 1.0), uRimPower);
    float rim = fres * uRim * (0.45 + 0.55 * wrap);
    vec3 H = normalize(L + V);
    float specular = pow(max(dot(N, H), 0.0), 28.0) * (0.12 + vSpark * 0.25) * wrap;

    vec3 col = vColor * diffuse * back + uRimColor * (rim + specular);
    col *= mix(1.0, uInnerDim, vInner);
    float tw = 1.0 + vSpark * (0.35 * sin(uTime * uTwinkleSpeed + vPhase * 6.2831) + 0.2);
    col *= tw;
    col *= uGain;
    col *= 1.0 + uPulse * 6.0;

    float alpha = shapeA * uOpacity * (1.0 + vSpark * 0.25);
    gl_FragColor = vec4(col, alpha);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`;
function Ka() {
    return new Promise(e => {
        let t = !1;
        const n = () => {
            t || (t = !0,
            e())
        }
        ;
        requestAnimationFrame(n),
        setTimeout(n, 50)
    }
    )
}
async function qa(e, t=_e, n=4) {
    const o = Xa(e, t);
    let a = o.next()
      , r = 0;
    for (; !a.done; ) {
        const s = performance.now();
        for (; !a.done && performance.now() - s < n; )
            a = o.next();
        a.done || (r++,
        await Ka())
    }
    return {
        ...a.value,
        soLo: r
    }
}
function Za(e, t=_e, n=1) {
    const {count: o, positions: a, normals: r, inner: s, rng: i, box: u} = e
      , c = u.max.x - u.min.x
      , y = u.max.y - u.min.y
      , f = t.colors
      , h = new re(f.champagne)
      , m = new re(f.amber)
      , d = new re(f.coral)
      , p = new re(f.warmRed)
      , w = new re
      , x = {
        h: 0,
        s: 0,
        l: 0
    }
      , M = Ie.clamp
      , C = new Float32Array(o * 3)
      , b = new Float32Array(o)
      , _ = new Float32Array(o)
      , T = new Float32Array(o)
      , S = t.particles;
    for (let k = 0; k < o; k++) {
        const N = a[k * 3]
          , z = a[k * 3 + 1]
          , he = M((N - u.min.x) / c, 0, 1)
          , ge = M((z - u.min.y) / y, 0, 1);
        let V = M(.58 * he + .42 * (1 - ge), 0, 1);
        V = V * V * (3 - 2 * V),
        V < .32 ? w.copy(h).lerp(m, V / .32) : V < .64 ? w.copy(m).lerp(d, (V - .32) / .32) : w.copy(d).lerp(p, (V - .64) / .36 * .7);
        const K = f.coralBoost || 1;
        V > .45 && w.multiplyScalar(1 + (K - 1) * Math.min(1, (V - .45) / .3)),
        w.getHSL(x),
        w.setHSL(x.h + (i() - .5) * f.hueJitter, x.s, M(x.l + (i() - .5) * .06, 0, 1));
        const G = 1 + (i() - .5) * 2 * (S.brightJitter || 0);
        C.set([w.r * G, w.g * G, w.b * G], k * 3);
        const L = i() < S.sparkRatio ? 1 : 0;
        T[k] = L,
        b[k] = S.baseSize * (1 + (i() * 2 - 1) * S.sizeJitter) * (L ? S.sparkSize : 1),
        _[k] = i()
    }
    const j = new Ke;
    j.setAttribute("position", new te(a,3)),
    j.setAttribute("normal", new te(r,3)),
    j.setAttribute("aColor", new te(C,3)),
    j.setAttribute("aSize", new te(b,1)),
    j.setAttribute("aPhase", new te(_,1)),
    j.setAttribute("aSpark", new te(T,1)),
    j.setAttribute("aInner", new te(s,1)),
    j.boundingBox = u.clone(),
    j.computeBoundingSphere();
    const P = t.lighting
      , E = t.motion
      , D = new Sn({
        vertexShader: Ya,
        fragmentShader: Wa,
        transparent: !0,
        depthTest: !0,
        depthWrite: !1,
        blending: Lt,
        uniforms: {
            uTime: {
                value: 0
            },
            uPixelRatio: {
                value: n
            },
            uSizeScale: {
                value: 1
            },
            uMaxSize: {
                value: S.maxPixelSize
            },
            uBreathAmp: {
                value: E.breathAmp
            },
            uBreathSpeed: {
                value: E.breathSpeed
            },
            uWobble: {
                value: E.wobbleAmp
            },
            uPulse: {
                value: 0
            },
            uLightDir: {
                value: new B(...P.keyDir).normalize()
            },
            uFillDir: {
                value: new B(...P.fillDir).normalize()
            },
            uAmbient: {
                value: P.ambient
            },
            uKey: {
                value: P.key
            },
            uFill: {
                value: P.fill ?? 0
            },
            uBackDim: {
                value: P.backDim
            },
            uRim: {
                value: P.rim
            },
            uRimPower: {
                value: P.rimPower
            },
            uRimColor: {
                value: new re(f.rim)
            },
            uInnerDim: {
                value: P.innerDim
            },
            uOpacity: {
                value: 0
            },
            uGain: {
                value: S.gain ?? 1
            },
            uTwinkleSpeed: {
                value: E.twinkleSpeed
            }
        }
    })
      , A = new Ee(j,D);
    return A.frustumCulled = !1,
    A.name = "heartParticles",
    A
}
const Ja = `
  attribute float aAngle;
  attribute float aRadial;
  attribute float aLift;
  attribute float aSize;
  attribute float aPhase;
  uniform float uTime;
  uniform float uSpeed;
  uniform float uRx;
  uniform float uRz;
  uniform float uPixelRatio;
  uniform float uSizeScale;
  varying float vFade;
  void main() {
    float ang = aAngle + uTime * uSpeed;
    vec3 p = vec3(cos(ang) * uRx * aRadial, aLift, sin(ang) * uRz * aRadial);
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = clamp(aSize * uSizeScale * uPixelRatio * (320.0 / -mv.z), 1.0, 10.0 * uPixelRatio);
    float spark = step(2.0, aPhase);
    vFade = mix(0.5 + 0.35 * sin(uTime * 1.3 + aPhase * 6.2831), 1.3 + 0.3 * sin(uTime * 2.1 + aPhase * 6.2831), spark);
  }
`
  , Qa = `
  uniform vec3 uColor;
  uniform float uOpacity;
  varying float vFade;
  void main() {
    vec2 uv = gl_PointCoord * 2.0 - 1.0;
    float d2 = dot(uv, uv);
    if (d2 > 1.0) discard;
    float a = pow(1.0 - sqrt(d2), 2.0) * uOpacity * vFade;
    gl_FragColor = vec4(uColor, a);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`;
function eo(e, t, n=_e, o=1) {
    const a = n.orbit
      , r = En(n.seed ^ 1540483477)
      , s = t === "mobile" ? a.dustCount.mobile : a.dustCount.desktop
      , i = new Float32Array(s)
      , u = new Float32Array(s)
      , c = new Float32Array(s)
      , y = new Float32Array(s)
      , f = new Float32Array(s)
      , h = new Float32Array(s * 3)
      , m = a.thickness * e;
    for (let b = 0; b < s; b++) {
        i[b] = r() * Math.PI * 2,
        u[b] = 1 + (r() - .5) * (a.radialSpread || .1),
        c[b] = (r() - .5) * m;
        const _ = r() < (a.sparkRatio || 0);
        y[b] = a.dustSize * (.45 + r() * .9) * (_ ? 2.2 : 1),
        f[b] = _ ? 2 + r() : r()
    }
    const d = new Ke;
    d.setAttribute("position", new te(h,3)),
    d.setAttribute("aAngle", new te(i,1)),
    d.setAttribute("aRadial", new te(u,1)),
    d.setAttribute("aLift", new te(c,1)),
    d.setAttribute("aSize", new te(y,1)),
    d.setAttribute("aPhase", new te(f,1));
    const p = a.radiusX * e
      , w = a.radiusZ * e;
    d.boundingSphere = new ha(new B,Math.max(p, w) * 1.2);
    const x = new Sn({
        vertexShader: Ja,
        fragmentShader: Qa,
        transparent: !0,
        depthWrite: !1,
        depthTest: !0,
        blending: Lt,
        uniforms: {
            uTime: {
                value: 0
            },
            uSpeed: {
                value: a.speed
            },
            uRx: {
                value: p
            },
            uRz: {
                value: w
            },
            uPixelRatio: {
                value: o
            },
            uSizeScale: {
                value: 1
            },
            uColor: {
                value: new re(a.dustColor)
            },
            uOpacity: {
                value: 0
            }
        }
    })
      , M = new Ee(d,x);
    M.frustumCulled = !1,
    M.name = "orbitDust";
    const C = new We;
    return C.name = "orbit",
    C.rotation.x = Ie.degToRad(a.tiltDeg),
    C.rotation.z = Ie.degToRad(a.rollDeg),
    C.position.y = a.yOffset * e,
    C.add(M),
    C.userData.dust = M,
    C
}
function to(e, t, n, o, a) {
    const r = Za(e, o, n)
      , s = o.shape.width
      , i = eo(s, t, o, n)
      , u = new We;
    u.name = "heartGroup",
    u.add(r);
    const c = new We;
    c.name = "heartGalaxy",
    c.add(u, i);
    const y = Ie.degToRad(o.motion.swayDeg)
      , f = r.material.uniforms
      , h = i.userData.dust.material.uniforms;
    return console.log(`Trái tim: ${e.count} hạt, chất lượng ${t}, dựng trong ${(performance.now() - a).toFixed(0)} ms` + (e.soLo ? ` chia thành ${e.soLo} lô` : " một hơi")),
    {
        group: c,
        heartPoints: r,
        orbit: i,
        heartWidth: s,
        quality: t,
        update(m, d=1, p=0, w) {
            w && (f.uPixelRatio.value = w,
            h.uPixelRatio.value = w),
            f.uTime.value = m,
            f.uPulse.value = p,
            f.uOpacity.value = o.particles.opacity * d,
            u.rotation.y = Math.sin(m * o.motion.swaySpeed) * y,
            h.uTime.value = m,
            h.uOpacity.value = o.orbit.dustOpacity * d
        },
        dispose() {
            c.traverse(m => {
                var d, p, w, x;
                (p = (d = m.geometry) == null ? void 0 : d.dispose) == null || p.call(d),
                (x = (w = m.material) == null ? void 0 : w.dispose) == null || x.call(w)
            }
            )
        }
    }
}
function no(e, t) {
    return e === "mobile" ? t.particles.countMobile : t.particles.countDesktop
}
async function ao({quality: e=In(), pixelRatio: t=1, cfg: n=_e}={}) {
    const o = performance.now()
      , a = await qa(no(e, n), n);
    return to(a, e, t, n, o)
}
let Xe = null
  , He = null;
function Fn(e) {
    return Xe ? Promise.resolve(Xe) : (He || (He = ao({
        quality: In(),
        pixelRatio: e || 1
    }).then(t => (Xe = t,
    t)).catch(t => (console.error("Không dựng được trái tim:", t),
    He = null,
    null))),
    He)
}
function oo() {
    const e = Math.min(window.devicePixelRatio || 1, 2)
      , t = () => Fn(e);
    setTimeout( () => {
        typeof requestIdleCallback == "function" ? requestIdleCallback(t, {
            timeout: 2e3
        }) : t()
    }
    , 1500)
}
function ro() {
    const e = Ae(a => a.gl)
      , [t,n] = l.useState(Xe);
    l.useEffect( () => {
        if (t)
            return;
        let a = !0;
        return Fn(e.getPixelRatio()).then(r => {
            a && r && n(r)
        }
        ),
        () => {
            a = !1
        }
    }
    , [t, e]);
    const o = l.useMemo( () => e.getPixelRatio(), [e]);
    return ke(a => {
        if (!t)
            return;
        const r = Rn((Pn() - $t) / (1 - $t));
        t.update(a.clock.elapsedTime, r, 0, o)
    }
    ),
    t ? g.jsx("primitive", {
        object: t.group,
        position: na,
        scale: [it, it, it]
    }) : null
}
const _n = 0
  , Nn = 1
  , so = 2
  , zn = 3
  , an = 2.5
  , Te = []
  , dt = new re
  , on = new re;
function tt(e) {
    return Te.push(e),
    () => {
        const t = Te.indexOf(e);
        t >= 0 && Te.splice(t, 1)
    }
}
function io(e, t) {
    if (!et.started || Te.length === 0)
        return;
    const n = Je(t)
      , o = _a()
      , a = !O.noColorCycle;
    if (a) {
        const r = (Math.sin(e / an) + 1) / 2;
        on.lerpColors(vt, Mt, r)
    }
    for (let r = 0; r < Te.length; r++) {
        const s = Te[r]
          , i = s.ref.current;
        if (i)
            if (s.y = Da(s.y, s.speed * o, n),
            i.position.y = s.y,
            s.kind === _n) {
                const u = e + s.phase;
                i.position.x = s.startX + ht(u, .45, s.phase * 3.1);
                const c = s.matRef.current;
                if (c && (c.opacity = ft(s.y),
                a)) {
                    const y = (Math.sin(u / an) + 1) / 2;
                    dt.lerpColors(vt, Mt, y),
                    c.color.set(dt),
                    c.emissive && c.emissive.set(dt)
                }
            } else if (s.kind === Nn) {
                i.position.x = s.startX + ht(e, s.amp, s.phase),
                i.rotation.z = Math.cos(e * .55 + s.phase) * .04;
                const u = s.matRef.current;
                u && (u.opacity = ft(s.y),
                a && u.emissive.set(on))
            } else if (s.kind === zn) {
                i.position.x = s.startX + ht(e, s.amp, s.phase),
                i.rotation.z += s.spin * n;
                const u = s.matRef.current;
                u && (u.opacity = ft(s.y))
            } else
                s.t += n,
                i.position.x = s.startX + Math.sin(s.t * .6) * s.amp,
                i.rotation.z = Math.sin(s.t * .8 + 1) * .12
    }
}
const mt = new Map;
function co(e) {
    if (mt.has(e.url))
        return mt.get(e.url);
    const t = new Promise( (n, o) => {
        const a = new Image;
        a.onload = () => {
            const r = e.crop
              , i = Math.min(1, 512 / Math.max(r.w, r.h))
              , u = document.createElement("canvas");
            u.width = Math.round(r.w * i),
            u.height = Math.round(r.h * i),
            u.getContext("2d").drawImage(a, r.x, r.y, r.w, r.h, 0, 0, u.width, u.height);
            const c = new An(u);
            c.colorSpace = jt,
            c.generateMipmaps = !0,
            c.minFilter = kn,
            c.magFilter = bt,
            n(c)
        }
        ,
        a.onerror = () => o(new Error("Không tải được " + e.url)),
        a.src = e.url
    }
    );
    return mt.set(e.url, t),
    t
}
function lo({def: e, startX: t, startZ: n, speed: o, size: a, swayAmp: r, phase: s}) {
    const i = l.useRef()
      , [u,c] = l.useState(null);
    l.useEffect( () => {
        let d = !0;
        return co(e).then(p => {
            d && c(p)
        }
        ).catch(p => console.error(p)),
        () => {
            d = !1
        }
    }
    , [e]);
    const y = l.useMemo( () => Rt(), [])
      , f = e.crop.w / e.crop.h
      , h = a * f
      , m = a;
    return l.useEffect( () => tt({
        kind: so,
        ref: i,
        matRef: {
            current: null
        },
        y,
        t: s,
        startX: t,
        speed: o,
        amp: r
    }), [y, s, t, o, r]),
    u ? g.jsxs("mesh", {
        ref: i,
        position: [t, y, n],
        children: [g.jsx("planeGeometry", {
            args: [h, m]
        }), g.jsx("meshStandardMaterial", {
            map: u,
            emissiveMap: u,
            emissive: e.emissive || "#ffb347",
            emissiveIntensity: e.emissiveIntensity ?? .9,
            toneMapped: !1,
            transparent: !0,
            alphaTest: .05,
            depthWrite: !1,
            side: qe,
            metalness: 0,
            roughness: .8
        })]
    }) : null
}
function uo() {
    return l.useMemo( () => {
        const t = [];
        for (let n = 0; n < O.lanternCount; n++) {
            const o = Bt[n % Bt.length];
            t.push({
                key: "lantern-" + n,
                def: o,
                startX: -32 + (n + .5) * (64 / O.lanternCount) + (Math.random() - .5) * 6,
                startZ: -12 + Math.random() * 26,
                speed: (3 + Math.random() * 3) * (o.speedMul || 1),
                size: (3.2 + Math.random() * 2.8) * (o.scale || 1),
                swayAmp: .8 + Math.random() * 1.6,
                phase: Math.random() * 20
            })
        }
        return t
    }
    , []).map( ({key: t, ...n}) => g.jsx(lo, {
        ...n
    }, t))
}
const je = new Map;
function fo(e, t, n, o) {
    e.beginPath(),
    e.moveTo(o, 0),
    e.lineTo(t - o, 0),
    e.quadraticCurveTo(t, 0, t, o),
    e.lineTo(t, n - o),
    e.quadraticCurveTo(t, n, t - o, n),
    e.lineTo(o, n),
    e.quadraticCurveTo(0, n, 0, n - o),
    e.lineTo(0, o),
    e.quadraticCurveTo(0, 0, o, 0),
    e.closePath()
}
const pt = 3
  , ho = 15e3
  , rn = [0, 800, 2500];
function mo(e, t) {
    return new Promise( (n, o) => {
        const a = new Image;
        a.crossOrigin = "Anonymous";
        const r = setTimeout( () => {
            a.src = "",
            o(new Error("timeout"))
        }
        , t);
        a.onload = () => {
            clearTimeout(r),
            n(a)
        }
        ,
        a.onerror = () => {
            clearTimeout(r),
            o(new Error("error"))
        }
        ,
        a.src = e
    }
    )
}
const po = e => new Promise(t => setTimeout(t, e));
async function go(e) {
    let t;
    for (let n = 0; n < pt; n++) {
        rn[n] && await po(rn[n]);
        const o = n === 0 ? e : `${e}${e.includes("?") ? "&" : "?"}corslai=${n}-${Date.now()}`;
        try {
            return await mo(o, ho)
        } catch (a) {
            t = a,
            console.warn(`[ảnh bay] lần ${n + 1}/${pt} hỏng (${a.message}): ${e}`)
        }
    }
    throw console.error(`[ảnh bay] bỏ cuộc sau ${pt} lần (${(t == null ? void 0 : t.message) || "?"}): ${e} — sẽ thử lại khi mạng ổn hoặc trang hiện lại`),
    t || new Error("Không tải được ảnh: " + e)
}
function yo(e, t) {
    const n = document.createElement("canvas")
      , o = n.getContext("2d")
      , a = O.imgMax;
    let r = e.width
      , s = e.height;
    (r > a || s > a) && (r > s ? (s = Math.floor(s / r * a),
    r = a) : (r = Math.floor(r / s * a),
    s = a)),
    n.width = r,
    n.height = s,
    fo(o, r, s, r * .05),
    o.clip(),
    o.drawImage(e, 0, 0, r, s);
    const i = new An(n);
    return O.imgFix ? (i.colorSpace = jt,
    i.generateMipmaps = !0,
    i.minFilter = kn,
    i.magFilter = bt,
    i.anisotropy = t != null && t.capabilities ? t.capabilities.getMaxAnisotropy() : 1) : (i.generateMipmaps = !1,
    i.minFilter = bt),
    i
}
function wo(e, t) {
    const n = `${e}@${O.imgMax}`;
    if (je.has(n))
        return je.get(n);
    const o = go(e).then(a => yo(a, t));
    return o.catch( () => {
        je.get(n) === o && je.delete(n)
    }
    ),
    je.set(n, o),
    o
}
let sn = 0;
const St = new Set;
function cn() {
    sn++,
    St.forEach(e => e(sn))
}
typeof window < "u" && (window.addEventListener("online", cn),
document.addEventListener("visibilitychange", () => {
    document.visibilityState === "visible" && cn()
}
));
function bo({imageUrl: e, startX: t, startZ: n, speed: o}) {
    const a = l.useRef()
      , r = l.useRef()
      , [s,i] = l.useState(null)
      , u = Ae(p => p.gl)
      , [c,y] = l.useState(0);
    l.useEffect( () => {
        if (s)
            return;
        const p = w => y(w);
        return St.add(p),
        () => {
            St.delete(p)
        }
    }
    , [s]),
    l.useEffect( () => {
        if (!e || s)
            return;
        let p = !0;
        return wo(e, u).then(w => {
            p && i(w)
        }
        ).catch( () => {}
        ),
        () => {
            p = !1
        }
    }
    , [e, u, s, c]);
    const [f,h] = l.useMemo( () => {
        if (s != null && s.image) {
            const p = s.image.width / s.image.height
              , w = 10;
            return p > 1 ? [w, w / p] : [w * p, w]
        }
        return [3, 3]
    }
    , [s])
      , m = l.useMemo( () => Rt(), [])
      , d = l.useMemo( () => ({
        phase: Math.random() * Math.PI * 2,
        amp: .8 + Math.random() * .8
    }), []);
    return l.useEffect( () => tt({
        kind: Nn,
        ref: a,
        matRef: r,
        y: m,
        startX: t,
        speed: o,
        phase: d.phase,
        amp: d.amp
    }), [m, t, o, d]),
    s ? g.jsxs("mesh", {
        ref: a,
        position: [t, m, n],
        children: [g.jsx("planeGeometry", {
            args: [f, h]
        }), g.jsx("meshStandardMaterial", {
            ref: r,
            map: s,
            emissiveMap: s,
            emissive: "#EE66A6",
            emissiveIntensity: O.imgGlow,
            toneMapped: !1,
            transparent: !0,
            side: qe,
            metalness: 0,
            roughness: .7
        })]
    }) : null
}
function xo({images: e}) {
    return l.useMemo( () => {
        if (!Array.isArray(e) || e.length === 0)
            return [];
        const n = [];
        let o = 0;
        for (let a = 0; a < 4; a++)
            for (let r = 0; r < 4; r++)
                n.push({
                    key: `image-${a}-${r}`,
                    imageUrl: e[o % e.length],
                    startX: (r - 1.5) * 18,
                    startZ: -10 + a * 10,
                    speed: 4 + Math.random() * 5
                }),
                o++;
        return n
    }
    , [e]).map( ({key: n, ...o}) => g.jsx(bo, {
        ...o
    }, n))
}
function vo({text: e, startX: t, startY: n, startZ: o, speed: a, phase: r, color: s, font: i}) {
    const u = l.useRef()
      , c = l.useRef();
    l.useEffect( () => tt({
        kind: _n,
        ref: u,
        matRef: c,
        y: n,
        startX: t,
        speed: a,
        phase: r
    }), [t, n, a, r]);
    const y = l.useMemo( () => {
        const f = e.split(/(\s+)/);
        let h = 0
          , m = "";
        return f.forEach(d => {
            d.trim().length > 0 && h++,
            m += d,
            h >= 8 && d.match(/\s+/) && (m = m.trimEnd() + `
`,
            h = 0)
        }
        ),
        m.trim()
    }
    , [e]);
    return g.jsxs(sa, {
        ref: u,
        font: i,
        fontSize: 1.5,
        letterSpacing: -.1,
        position: [t, n, o],
        anchorX: "center",
        anchorY: "middle",
        textAlign: "center",
        children: [y, O.textMaterial === "basic" ? g.jsx("meshBasicMaterial", {
            ref: c,
            color: s,
            toneMapped: !1,
            transparent: !0,
            side: qe
        }) : g.jsx("meshStandardMaterial", {
            ref: c,
            color: s,
            emissive: s,
            emissiveIntensity: 1.5,
            toneMapped: !1,
            transparent: !0,
            side: qe
        })]
    })
}
function Mo({messages: e, color: t, fontName: n}) {
    return l.useMemo( () => {
        const a = (Array.isArray(e) ? e : []).map(aa).filter(Boolean);
        if (a.length === 0)
            return [];
        const r = [];
        let s = 0;
        for (let i = 0; i < O.rows; i++)
            for (let u = 0; u < O.cols; u++) {
                const c = a[s % a.length]
                  , f = c.length > 20 ? 6 : 3;
                r.push({
                    key: `text-${i}-${u}`,
                    text: c,
                    startX: (u - (O.cols - 1) / 2) * f,
                    startY: pe + Math.random() * (Se - pe),
                    startZ: -10 + i * f * 1.5,
                    speed: 7 + Math.random() * 2,
                    phase: Math.random() * 2,
                    color: t ?? "#EE66A6",
                    font: n ? `/font/${n}.ttf` : "/font/Mali.ttf"
                }),
                s++
            }
        return r
    }
    , [e, t, n]).map( ({key: a, ...r}) => g.jsx(vo, {
        ...r
    }, a))
}
const To = /^[og]\s*(.+)?/
  , So = /^mtllib /
  , Ao = /^usemtl /
  , ko = /^usemap /
  , ln = /\s+/
  , un = new B
  , gt = new B
  , fn = new B
  , hn = new B
  , ae = new B
  , Ge = new re;
function Co() {
    const e = {
        objects: [],
        object: {},
        vertices: [],
        normals: [],
        colors: [],
        uvs: [],
        materials: {},
        materialLibraries: [],
        startObject: function(t, n) {
            if (this.object && this.object.fromDeclaration === !1) {
                this.object.name = t,
                this.object.fromDeclaration = n !== !1;
                return
            }
            const o = this.object && typeof this.object.currentMaterial == "function" ? this.object.currentMaterial() : void 0;
            if (this.object && typeof this.object._finalize == "function" && this.object._finalize(!0),
            this.object = {
                name: t || "",
                fromDeclaration: n !== !1,
                geometry: {
                    vertices: [],
                    normals: [],
                    colors: [],
                    uvs: [],
                    hasUVIndices: !1
                },
                materials: [],
                smooth: !0,
                startMaterial: function(a, r) {
                    const s = this._finalize(!1);
                    s && (s.inherited || s.groupCount <= 0) && this.materials.splice(s.index, 1);
                    const i = {
                        index: this.materials.length,
                        name: a || "",
                        mtllib: Array.isArray(r) && r.length > 0 ? r[r.length - 1] : "",
                        smooth: s !== void 0 ? s.smooth : this.smooth,
                        groupStart: s !== void 0 ? s.groupEnd : 0,
                        groupEnd: -1,
                        groupCount: -1,
                        inherited: !1,
                        clone: function(u) {
                            const c = {
                                index: typeof u == "number" ? u : this.index,
                                name: this.name,
                                mtllib: this.mtllib,
                                smooth: this.smooth,
                                groupStart: 0,
                                groupEnd: -1,
                                groupCount: -1,
                                inherited: !1
                            };
                            return c.clone = this.clone.bind(c),
                            c
                        }
                    };
                    return this.materials.push(i),
                    i
                },
                currentMaterial: function() {
                    if (this.materials.length > 0)
                        return this.materials[this.materials.length - 1]
                },
                _finalize: function(a) {
                    const r = this.currentMaterial();
                    if (r && r.groupEnd === -1 && (r.groupEnd = this.geometry.vertices.length / 3,
                    r.groupCount = r.groupEnd - r.groupStart,
                    r.inherited = !1),
                    a && this.materials.length > 1)
                        for (let s = this.materials.length - 1; s >= 0; s--)
                            this.materials[s].groupCount <= 0 && this.materials.splice(s, 1);
                    return a && this.materials.length === 0 && this.materials.push({
                        name: "",
                        smooth: this.smooth
                    }),
                    r
                }
            },
            o && o.name && typeof o.clone == "function") {
                const a = o.clone(0);
                a.inherited = !0,
                this.object.materials.push(a)
            }
            this.objects.push(this.object)
        },
        finalize: function() {
            this.object && typeof this.object._finalize == "function" && this.object._finalize(!0)
        },
        parseVertexIndex: function(t, n) {
            const o = parseInt(t, 10);
            return (o >= 0 ? o - 1 : o + n / 3) * 3
        },
        parseNormalIndex: function(t, n) {
            const o = parseInt(t, 10);
            return (o >= 0 ? o - 1 : o + n / 3) * 3
        },
        parseUVIndex: function(t, n) {
            const o = parseInt(t, 10);
            return (o >= 0 ? o - 1 : o + n / 2) * 2
        },
        addVertex: function(t, n, o) {
            const a = this.vertices
              , r = this.object.geometry.vertices;
            r.push(a[t + 0], a[t + 1], a[t + 2]),
            r.push(a[n + 0], a[n + 1], a[n + 2]),
            r.push(a[o + 0], a[o + 1], a[o + 2])
        },
        addVertexPoint: function(t) {
            const n = this.vertices;
            this.object.geometry.vertices.push(n[t + 0], n[t + 1], n[t + 2])
        },
        addVertexLine: function(t) {
            const n = this.vertices;
            this.object.geometry.vertices.push(n[t + 0], n[t + 1], n[t + 2])
        },
        addNormal: function(t, n, o) {
            const a = this.normals
              , r = this.object.geometry.normals;
            r.push(a[t + 0], a[t + 1], a[t + 2]),
            r.push(a[n + 0], a[n + 1], a[n + 2]),
            r.push(a[o + 0], a[o + 1], a[o + 2])
        },
        addFaceNormal: function(t, n, o) {
            const a = this.vertices
              , r = this.object.geometry.normals;
            un.fromArray(a, t),
            gt.fromArray(a, n),
            fn.fromArray(a, o),
            ae.subVectors(fn, gt),
            hn.subVectors(un, gt),
            ae.cross(hn),
            ae.normalize(),
            r.push(ae.x, ae.y, ae.z),
            r.push(ae.x, ae.y, ae.z),
            r.push(ae.x, ae.y, ae.z)
        },
        addColor: function(t, n, o) {
            const a = this.colors
              , r = this.object.geometry.colors;
            a[t] !== void 0 && r.push(a[t + 0], a[t + 1], a[t + 2]),
            a[n] !== void 0 && r.push(a[n + 0], a[n + 1], a[n + 2]),
            a[o] !== void 0 && r.push(a[o + 0], a[o + 1], a[o + 2])
        },
        addUV: function(t, n, o) {
            const a = this.uvs
              , r = this.object.geometry.uvs;
            r.push(a[t + 0], a[t + 1]),
            r.push(a[n + 0], a[n + 1]),
            r.push(a[o + 0], a[o + 1])
        },
        addDefaultUV: function() {
            const t = this.object.geometry.uvs;
            t.push(0, 0),
            t.push(0, 0),
            t.push(0, 0)
        },
        addUVLine: function(t) {
            const n = this.uvs;
            this.object.geometry.uvs.push(n[t + 0], n[t + 1])
        },
        addFace: function(t, n, o, a, r, s, i, u, c) {
            const y = this.vertices.length;
            let f = this.parseVertexIndex(t, y)
              , h = this.parseVertexIndex(n, y)
              , m = this.parseVertexIndex(o, y);
            if (this.addVertex(f, h, m),
            this.addColor(f, h, m),
            i !== void 0 && i !== "") {
                const d = this.normals.length;
                f = this.parseNormalIndex(i, d),
                h = this.parseNormalIndex(u, d),
                m = this.parseNormalIndex(c, d),
                this.addNormal(f, h, m)
            } else
                this.addFaceNormal(f, h, m);
            if (a !== void 0 && a !== "") {
                const d = this.uvs.length;
                f = this.parseUVIndex(a, d),
                h = this.parseUVIndex(r, d),
                m = this.parseUVIndex(s, d),
                this.addUV(f, h, m),
                this.object.geometry.hasUVIndices = !0
            } else
                this.addDefaultUV()
        },
        addPointGeometry: function(t) {
            this.object.geometry.type = "Points";
            const n = this.vertices.length;
            for (let o = 0, a = t.length; o < a; o++) {
                const r = this.parseVertexIndex(t[o], n);
                this.addVertexPoint(r),
                this.addColor(r)
            }
        },
        addLineGeometry: function(t, n) {
            this.object.geometry.type = "Line";
            const o = this.vertices.length
              , a = this.uvs.length;
            for (let r = 0, s = t.length; r < s; r++)
                this.addVertexLine(this.parseVertexIndex(t[r], o));
            for (let r = 0, s = n.length; r < s; r++)
                this.addUVLine(this.parseUVIndex(n[r], a))
        }
    };
    return e.startObject("", !1),
    e
}
class Lo extends da {
    constructor(t) {
        super(t),
        this.materials = null
    }
    load(t, n, o, a) {
        const r = this
          , s = new ma(this.manager);
        s.setPath(this.path),
        s.setRequestHeader(this.requestHeader),
        s.setWithCredentials(this.withCredentials),
        s.load(t, function(i) {
            try {
                n(r.parse(i))
            } catch (u) {
                a ? a(u) : console.error(u),
                r.manager.itemError(t)
            }
        }, o, a)
    }
    setMaterials(t) {
        return this.materials = t,
        this
    }
    parse(t) {
        const n = new Co;
        t.indexOf(`\r
`) !== -1 && (t = t.replace(/\r\n/g, `
`)),
        t.indexOf(`\\
`) !== -1 && (t = t.replace(/\\\n/g, ""));
        const o = t.split(`
`);
        let a = [];
        for (let i = 0, u = o.length; i < u; i++) {
            const c = o[i].trimStart();
            if (c.length === 0)
                continue;
            const y = c.charAt(0);
            if (y !== "#")
                if (y === "v") {
                    const f = c.split(ln);
                    switch (f[0]) {
                    case "v":
                        n.vertices.push(parseFloat(f[1]), parseFloat(f[2]), parseFloat(f[3])),
                        f.length >= 7 ? (Ge.setRGB(parseFloat(f[4]), parseFloat(f[5]), parseFloat(f[6]), jt),
                        n.colors.push(Ge.r, Ge.g, Ge.b)) : n.colors.push(void 0, void 0, void 0);
                        break;
                    case "vn":
                        n.normals.push(parseFloat(f[1]), parseFloat(f[2]), parseFloat(f[3]));
                        break;
                    case "vt":
                        n.uvs.push(parseFloat(f[1]), parseFloat(f[2]));
                        break
                    }
                } else if (y === "f") {
                    const h = c.slice(1).trim().split(ln)
                      , m = [];
                    for (let p = 0, w = h.length; p < w; p++) {
                        const x = h[p];
                        if (x.length > 0) {
                            const M = x.split("/");
                            m.push(M)
                        }
                    }
                    const d = m[0];
                    for (let p = 1, w = m.length - 1; p < w; p++) {
                        const x = m[p]
                          , M = m[p + 1];
                        n.addFace(d[0], x[0], M[0], d[1], x[1], M[1], d[2], x[2], M[2])
                    }
                } else if (y === "l") {
                    const f = c.substring(1).trim().split(" ");
                    let h = [];
                    const m = [];
                    if (c.indexOf("/") === -1)
                        h = f;
                    else
                        for (let d = 0, p = f.length; d < p; d++) {
                            const w = f[d].split("/");
                            w[0] !== "" && h.push(w[0]),
                            w[1] !== "" && m.push(w[1])
                        }
                    n.addLineGeometry(h, m)
                } else if (y === "p") {
                    const h = c.slice(1).trim().split(" ");
                    n.addPointGeometry(h)
                } else if ((a = To.exec(c)) !== null) {
                    const f = (" " + a[0].slice(1).trim()).slice(1);
                    n.startObject(f)
                } else if (Ao.test(c))
                    n.object.startMaterial(c.substring(7).trim(), n.materialLibraries);
                else if (So.test(c))
                    n.materialLibraries.push(c.substring(7).trim());
                else if (ko.test(c))
                    console.warn('THREE.OBJLoader: Rendering identifier "usemap" not supported. Textures must be defined in MTL files.');
                else if (y === "s") {
                    if (a = c.split(" "),
                    a.length > 1) {
                        const h = a[1].trim().toLowerCase();
                        n.object.smooth = h !== "0" && h !== "off"
                    } else
                        n.object.smooth = !0;
                    const f = n.object.currentMaterial();
                    f && (f.smooth = n.object.smooth)
                } else {
                    if (c === "\0")
                        continue;
                    console.warn('THREE.OBJLoader: Unexpected line: "' + c + '"')
                }
        }
        n.finalize();
        const r = new We;
        if (r.materialLibraries = [].concat(n.materialLibraries),
        !(n.objects.length === 1 && n.objects[0].geometry.vertices.length === 0) === !0)
            for (let i = 0, u = n.objects.length; i < u; i++) {
                const c = n.objects[i]
                  , y = c.geometry
                  , f = c.materials
                  , h = y.type === "Line"
                  , m = y.type === "Points";
                let d = !1;
                if (y.vertices.length === 0)
                    continue;
                const p = new Ke;
                p.setAttribute("position", new xe(y.vertices,3)),
                y.normals.length > 0 && p.setAttribute("normal", new xe(y.normals,3)),
                y.colors.length > 0 && (d = !0,
                p.setAttribute("color", new xe(y.colors,3))),
                y.hasUVIndices === !0 && p.setAttribute("uv", new xe(y.uvs,2));
                const w = [];
                for (let M = 0, C = f.length; M < C; M++) {
                    const b = f[M]
                      , _ = b.name + "_" + b.smooth + "_" + d;
                    let T = n.materials[_];
                    if (this.materials !== null) {
                        if (T = this.materials.create(b.name),
                        h && T && !(T instanceof ct)) {
                            const S = new ct;
                            Ut.prototype.copy.call(S, T),
                            S.color.copy(T.color),
                            T = S
                        } else if (m && T && !(T instanceof Be)) {
                            const S = new Be({
                                size: 10,
                                sizeAttenuation: !1
                            });
                            Ut.prototype.copy.call(S, T),
                            S.color.copy(T.color),
                            S.map = T.map,
                            T = S
                        }
                    }
                    T === void 0 && (h ? T = new ct : m ? T = new Be({
                        size: 1,
                        sizeAttenuation: !1
                    }) : T = new pa,
                    T.name = b.name,
                    T.flatShading = !b.smooth,
                    T.vertexColors = d,
                    n.materials[_] = T),
                    w.push(T)
                }
                let x;
                if (w.length > 1) {
                    for (let M = 0, C = f.length; M < C; M++) {
                        const b = f[M];
                        p.addGroup(b.groupStart, b.groupCount, M)
                    }
                    h ? x = new Xt(p,w) : m ? x = new Ee(p,w) : x = new Yt(p,w)
                } else
                    h ? x = new Xt(p,w[0]) : m ? x = new Ee(p,w[0]) : x = new Yt(p,w[0]);
                x.name = c.name,
                r.add(x)
            }
        else if (n.vertices.length > 0) {
            const i = new Be({
                size: 1,
                sizeAttenuation: !1
            })
              , u = new Ke;
            u.setAttribute("position", new xe(n.vertices,3)),
            n.colors.length > 0 && n.colors[0] !== void 0 && (u.setAttribute("color", new xe(n.colors,3)),
            i.vertexColors = !0);
            const c = new Ee(u,i);
            r.add(c)
        }
        return r
    }
}
const dn = "#e62e00";
function jo({geometry: e, startX: t, startZ: n, speed: o}) {
    const a = l.useRef()
      , r = l.useRef()
      , s = l.useMemo( () => Rt(), [])
      , i = l.useMemo( () => ({
        phase: Math.random() * Math.PI * 2,
        amp: .6 + Math.random() * .8,
        spin: .4 + Math.random() * .5
    }), []);
    return l.useEffect( () => tt({
        kind: zn,
        ref: a,
        matRef: r,
        y: s,
        startX: t,
        speed: o,
        phase: i.phase,
        amp: i.amp,
        spin: i.spin
    }), [s, t, o, i]),
    g.jsx("mesh", {
        ref: a,
        geometry: e,
        position: [t, s, n],
        scale: .15,
        rotation: [-Math.PI / 2, 0, 0],
        children: g.jsx("meshStandardMaterial", {
            ref: r,
            color: dn,
            emissive: dn,
            emissiveIntensity: 1.3,
            transparent: !0,
            toneMapped: !1
        })
    })
}
function Po() {
    const e = ia(Lo, "/models/heart.obj")
      , t = l.useMemo( () => {
        let o = null;
        return e.traverse(a => {
            !o && a.isMesh && (o = a.geometry)
        }
        ),
        o
    }
    , [e])
      , n = l.useMemo( () => {
        const o = [];
        for (let a = 0; a < 4; a++)
            for (let r = 0; r < 7; r++)
                o.push({
                    key: `tim-${a}-${r}`,
                    startX: (r - 3) * 7 + (Math.random() - .5) * 3,
                    startZ: -12 + a * 9 + (Math.random() - .5) * 3,
                    speed: 5 + Math.random() * 9
                });
        return o
    }
    , []);
    return t ? n.map( ({key: o, ...a}) => g.jsx(jo, {
        geometry: t,
        ...a
    }, o)) : null
}
function Ro() {
    return ke( (e, t) => io(e.clock.elapsedTime, t), -1),
    null
}
const Eo = `
attribute float aSize;
attribute float aPhase;
attribute float aSpeed;
attribute vec3 aColor;
uniform float uTime;
uniform float uPixelRatio;
varying vec3 vColor;
varying float vTwinkle;
varying float vSize;
void main() {
    vColor = aColor;
    // Lấp lánh: hai sóng sin lệch pha, nâng bậc để đa số sao dịu, thi thoảng bừng sáng.
    float w = 0.5 + 0.5 * sin(uTime * aSpeed + aPhase);
    float w2 = 0.5 + 0.5 * sin(uTime * aSpeed * 1.7 + aPhase * 2.3);
    vTwinkle = 0.45 + 0.75 * pow(w * 0.7 + w2 * 0.3, 2.0);
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    float att = 260.0 / max(1.0, -mv.z);
    float size = aSize * uPixelRatio * (0.75 + 0.25 * vTwinkle) * att;
    vSize = size;
    gl_PointSize = clamp(size, 1.2 * uPixelRatio, 26.0 * uPixelRatio);
    gl_Position = projectionMatrix * mv;
}`
  , Io = `
varying vec3 vColor;
varying float vTwinkle;
varying float vSize;
void main() {
    vec2 p = gl_PointCoord - 0.5;
    float d = length(p);
    if (d > 0.5) discard;
    // Lõi sáng + quầng mờ
    float core = smoothstep(0.5, 0.0, d);
    core = core * core;
    float halo = exp(-d * d * 18.0) * 0.55;
    // Tia chữ thập nhẹ cho các sao lớn
    float cross = exp(-abs(p.x) * 40.0) * exp(-abs(p.y) * 6.0) + exp(-abs(p.y) * 40.0) * exp(-abs(p.x) * 6.0);
    cross *= smoothstep(6.0, 14.0, vSize) * 0.35;
    float a = (core + halo + cross) * vTwinkle;
    // Lõi ngả trắng ấm để sao vàng trông rực chứ không bệt
    vec3 col = mix(vColor, vec3(1.0, 0.98, 0.9), core * 0.5);
    gl_FragColor = vec4(col * a, a);
}`
  , mn = [[1, .84, .25], [1, .9, .45], [1, .95, .7], [1, .78, .2], [1, .93, .6], [1, .72, .3]];
function Fo() {
    const e = l.useRef()
      , t = l.useRef()
      , n = Ae(s => s.gl)
      , o = l.useMemo( () => {
        const s = O.starCount
          , i = new Float32Array(s * 3)
          , u = new Float32Array(s * 3)
          , c = new Float32Array(s)
          , y = new Float32Array(s)
          , f = new Float32Array(s);
        for (let h = 0; h < s; h++) {
            const m = Math.random() * 2 - 1
              , d = Math.random() * Math.PI * 2
              , p = 70 + Math.pow(Math.random(), .6) * 150
              , w = Math.sqrt(1 - m * m);
            i[h * 3] = p * w * Math.cos(d),
            i[h * 3 + 1] = p * m,
            i[h * 3 + 2] = p * w * Math.sin(d);
            const x = mn[Math.floor(Math.random() * mn.length)];
            u[h * 3] = x[0],
            u[h * 3 + 1] = x[1],
            u[h * 3 + 2] = x[2];
            const M = Math.random();
            c[h] = M < .75 ? 1.2 + Math.random() * 1.3 : M < .94 ? 2.6 + Math.random() * 1.8 : 4.4 + Math.random() * 2.6,
            y[h] = Math.random() * Math.PI * 2,
            f[h] = .6 + Math.random() * 2.2
        }
        return {
            pos: i,
            col: u,
            size: c,
            phase: y,
            speed: f
        }
    }
    , [])
      , a = l.useMemo( () => ({
        uTime: {
            value: 0
        },
        uPixelRatio: {
            value: Math.min(n ? n.getPixelRatio() : 1, 2)
        }
    }), [n]);
    ke( (s, i) => {
        t.current && (t.current.uniforms.uTime.value = s.clock.elapsedTime),
        e.current && (e.current.position.copy(s.camera.position),
        e.current.rotation.y += Je(i) * .006,
        e.current.rotation.x += Je(i) * .0015)
    }
    );
    const r = O.starCount;
    return g.jsx("group", {
        ref: e,
        position: [-10, 0, 30],
        children: g.jsxs("points", {
            frustumCulled: !1,
            children: [g.jsxs("bufferGeometry", {
                children: [g.jsx("bufferAttribute", {
                    attach: "attributes-position",
                    array: o.pos,
                    count: r,
                    itemSize: 3
                }), g.jsx("bufferAttribute", {
                    attach: "attributes-aColor",
                    array: o.col,
                    count: r,
                    itemSize: 3
                }), g.jsx("bufferAttribute", {
                    attach: "attributes-aSize",
                    array: o.size,
                    count: r,
                    itemSize: 1
                }), g.jsx("bufferAttribute", {
                    attach: "attributes-aPhase",
                    array: o.phase,
                    count: r,
                    itemSize: 1
                }), g.jsx("bufferAttribute", {
                    attach: "attributes-aSpeed",
                    array: o.speed,
                    count: r,
                    itemSize: 1
                })]
            }), g.jsx("shaderMaterial", {
                ref: t,
                uniforms: a,
                vertexShader: Eo,
                fragmentShader: Io,
                transparent: !0,
                depthWrite: !1,
                depthTest: !0,
                blending: Lt,
                toneMapped: !1
            })]
        })
    })
}
function _o({content: e, started: t, goHeartRef: n, onHeartBegin: o, coupleImgRef: a}) {
    const [r,s] = l.useState(t ? "run" : "wait")
      , [i,u] = l.useState(!1)
      , [c,y] = l.useState(!0)
      , f = l.useRef();
    l.useEffect( () => {
        za()
    }
    , []);
    const h = l.useCallback( () => {
        if (!Na())
            return;
        o == null || o(),
        s("exit");
        const d = setTimeout( () => y(!1), O.flySecs * oa * 1e3)
          , p = setTimeout( () => s("heart"), O.flySecs * 1e3 + 150);
        return () => {
            clearTimeout(d),
            clearTimeout(p)
        }
    }
    , [o]);
    l.useEffect( () => {
        n && (n.current = h)
    }
    , [h, n]),
    l.useEffect( () => {
        !t || r !== "wait" || (et.started = !0,
        s("intro"))
    }
    , [t, r]);
    const m = r === "run" || r === "heart" && i;
    return g.jsxs(ca, {
        style: {
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100vh",
            background: "black"
        },
        camera: {
            position: [-10, 0, 30],
            fov: 100
        },
        dpr: O.dpr || [1, O.dprMax],
        gl: {
            antialias: O.antialias,
            powerPreference: "high-performance"
        },
        performance: {
            min: .6,
            max: 1,
            debounce: 250
        },
        children: [g.jsx(la, {
            pixelated: !1
        }), g.jsx("color", {
            attach: "background",
            args: ["#000"]
        }), g.jsx("ambientLight", {
            intensity: 1
        }), g.jsx("pointLight", {
            position: [10, 10, 0],
            color: "#ff00ff",
            intensity: .5,
            distance: 20
        }), g.jsx(Oa, {
            onDone: () => s("run")
        }), (r === "exit" || r === "heart") && !i ? g.jsx($a, {
            onDone: () => {
                var p;
                const d = f.current;
                d != null && d.target && (d.target.set(...Ye),
                (p = d.update) == null || p.call(d)),
                u(!0)
            }
        }) : null, g.jsx(Ro, {}), we.has("particles") ? null : g.jsx(Fo, {}), g.jsx(Ha, {
            imgRef: a,
            active: r === "heart" && i
        }), we.has("controls") ? null : g.jsx(ua, {
            ref: f,
            enabled: m,
            target: r === "run" || r === "wait" || r === "intro" ? [0, 0, 0] : Ye,
            enableZoom: !0,
            enableRotate: !0,
            enablePan: !1,
            touches: {
                ONE: Wt.ROTATE,
                TWO: Wt.DOLLY_ROTATE
            },
            enableDamping: !0,
            dampingFactor: .06,
            zoomSpeed: .35,
            rotateSpeed: .7,
            minDistance: 10,
            maxDistance: 50
        }), g.jsxs("group", {
            children: [c && !we.has("images") ? g.jsx(xo, {
                images: e.images
            }) : null, c && !we.has("text") ? g.jsx(Mo, {
                messages: e.messages,
                color: e.color,
                fontName: e.fontName
            }) : null, c && !we.has("lanterns") ? g.jsx(uo, {}) : null, c && e.flyingHearts && !we.has("hearts") ? g.jsx(Po, {}) : null, r === "exit" || r === "heart" ? g.jsx(ro, {}, "heart-scene") : null]
        }), we.has("bloom") ? null : g.jsx(ga, {
            multisampling: O.multisampling,
            children: g.jsx(ya, {
                mipmapBlur: !1,
                intensity: O.bloomIntensity,
                luminanceThreshold: O.bloomThreshold,
                luminanceSmoothing: .5,
                height: O.bloomHeight,
                kernelSize: 4
            })
        })]
    })
}
const Dn = "/assets/music/bongtrang.mp3"
  , On = .55
  , $n = 3e3
  , No = 700;
let fe = Dn
  , $ = null
  , Ue = 0;
const At = new Set;
let Q = null
  , Pe = "";
function Bn(e) {
    typeof fetch != "function" || typeof URL > "u" || !URL.createObjectURL || Pe === e || Q && Q.nguon === e || (Pe = e,
    fetch(e, {
        mode: "cors",
        credentials: "omit"
    }).then(t => t.ok ? t.blob() : Promise.reject(new Error("HTTP " + t.status))).then(t => {
        if (Pe !== e)
            return;
        const n = Q;
        if (Q = {
            nguon: e,
            url: URL.createObjectURL(t)
        },
        n)
            try {
                URL.revokeObjectURL(n.url)
            } catch {}
        Et()
    }
    ).catch( () => {}
    ).finally( () => {
        Pe === e && (Pe = "")
    }
    ))
}
function Et() {
    !$ || !Q || Q.nguon !== fe || $.src !== Q.url && (!$.paused || Re || ze || ($.src = Q.url,
    $.load()))
}
function kt() {
    for (const e of At)
        e(It())
}
function Ne() {
    return $ || ($ = new Audio(Q && Q.nguon === fe ? Q.url : fe),
    $.loop = !0,
    $.preload = "auto",
    $.volume = 0,
    $.addEventListener("play", kt),
    $.addEventListener("pause", kt),
    $)
}
function zo(e) {
    var o;
    const t = e && String(e).trim() || Dn;
    if (t === fe || (fe = t,
    Bn(fe),
    !$))
        return;
    const n = !$.paused;
    $.src = Q && Q.nguon === fe ? Q.url : fe,
    $.load(),
    n && ((o = $.play()) == null || o.catch( () => {}
    ))
}
function Do() {
    Bn(fe),
    Ne()
}
let pn = !1
  , Re = !1
  , ze = !1;
function gn() {
    if (pn || Re)
        return;
    const e = Ne();
    Et(),
    Re = !0,
    e.volume = 0;
    const t = () => {
        ze || (e.pause(),
        e.currentTime = 0),
        pn = !0,
        Re = !1
    }
      , n = e.play();
    n && typeof n.then == "function" ? n.then(t).catch( () => {
        Re = !1
    }
    ) : t()
}
function It() {
    return !!$ && !$.paused
}
function Oo(e) {
    return At.add(e),
    () => At.delete(e)
}
const $o = 40;
function Ft(e, t, n) {
    const o = Ne();
    clearInterval(Ue);
    const a = performance.now()
      , r = o.volume;
    Ue = setInterval( () => {
        const s = Math.min(1, (performance.now() - a) / t)
          , i = s * s * (3 - 2 * s);
        o.volume = r + (e - r) * i,
        s >= 1 && (clearInterval(Ue),
        Ue = 0,
        n == null || n())
    }
    , $o)
}
function Ct() {
    var t;
    const e = Ne();
    e.paused && (Et(),
    ze = !0,
    e.volume = 0,
    (t = e.play()) == null || t.catch( () => Vn()),
    Ft(On, $n))
}
let yt = !1;
function Vn() {
    if (yt || typeof window > "u")
        return;
    yt = !0;
    const e = () => {
        var o;
        if (t(),
        !ze)
            return;
        const n = Ne();
        n.paused && (n.volume = 0,
        (o = n.play()) == null || o.then( () => Ft(On, $n)).catch( () => Vn()))
    }
      , t = () => {
        yt = !1;
        for (const n of ["touchend", "click", "pointerup", "keydown"])
            window.removeEventListener(n, e, !0)
    }
    ;
    for (const n of ["touchend", "click", "pointerup", "keydown"])
        window.addEventListener(n, e, !0)
}
function Bo() {
    $ && (ze = !1,
    Ft(0, No, () => {
        $.pause(),
        kt()
    }
    ))
}
function Vo() {
    It() ? Bo() : Ct()
}
function Ho({visible: e, onOpenHeart: t, onOpenLetter: n, showHeart: o, showLetter: a}) {
    const [r,s] = l.useState(It);
    l.useEffect( () => Oo(s), []);
    const [i,u] = l.useState(!1);
    return l.useEffect( () => {
        if (!e) {
            u(!1);
            return
        }
        const c = setTimeout( () => u(!0), 5e3);
        return () => clearTimeout(c)
    }
    , [e]),
    e ? g.jsxs("div", {
        className: "topbar",
        children: [o && i ? g.jsx("button", {
            type: "button",
            className: "topbar-btn topbar-heart",
            onClick: t,
            title: "Mở trái tim",
            "aria-label": "Mở trái tim",
            children: g.jsx("img", {
                src: "/assets/ui/btn-heart.webp",
                alt: "",
                draggable: !1
            })
        }) : null, a && i ? g.jsx("button", {
            type: "button",
            className: "topbar-btn topbar-letter",
            onClick: n,
            title: "Mở lá thư",
            "aria-label": "Mở lá thư",
            children: g.jsx("img", {
                src: "/assets/nguyet-thu/btn-letter.webp",
                alt: "",
                draggable: !1
            })
        }) : null, g.jsx("button", {
            type: "button",
            className: "topbar-btn topbar-music",
            onClick: Vo,
            title: r ? "Tắt nhạc" : "Bật nhạc",
            "aria-label": "Bật hoặc tắt nhạc",
            children: g.jsxs("svg", {
                viewBox: "0 0 24 24",
                width: "26",
                height: "26",
                fill: "none",
                stroke: "#fff",
                strokeWidth: "2",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                children: [g.jsx("path", {
                    d: "M11 5 6 9H2v6h4l5 4z"
                }), r ? g.jsxs(g.Fragment, {
                    children: [g.jsx("path", {
                        d: "M15.5 8.5a5 5 0 0 1 0 7"
                    }), g.jsx("path", {
                        d: "M18.5 5.5a9 9 0 0 1 0 13"
                    })]
                }) : g.jsxs(g.Fragment, {
                    children: [g.jsx("path", {
                        d: "m17 9 5 6"
                    }), g.jsx("path", {
                        d: "m22 9-5 6"
                    })]
                })]
            })
        })]
    }) : null
}
const yn = {
    dangTai: {
        icon: "🌕",
        tieuDe: "Đang mở thiệp…",
        mo: "Chờ một chút, trăng đang lên."
    },
    expired: {
        icon: "🍂",
        tieuDe: "Thiệp này đã hết hạn",
        mo: "Người gửi có thể gia hạn để mở lại."
    },
    payment_required: {
        icon: "🏮",
        tieuDe: "Thiệp chưa được kích hoạt",
        mo: "Đơn hàng của thiệp này chưa hoàn tất thanh toán."
    },
    not_found: {
        icon: "🐰",
        tieuDe: "Không tìm thấy thiệp",
        mo: "Đường dẫn có thể đã sai hoặc thiệp đã bị gỡ."
    },
    loi: {
        icon: "☁️",
        tieuDe: "Không tải được thiệp",
        mo: "Kiểm tra kết nối rồi thử lại."
    }
};
function wn({loai: e, thongDiep: t, onThuLai: n, linkTao: o}) {
    const a = yn[e] || yn.loi
      , r = e === "dangTai";
    return g.jsx("div", {
        className: r ? "mtb mtb-tai" : "mtb",
        role: r ? "status" : "alert",
        children: g.jsxs("div", {
            className: "mtb-hop",
            children: [g.jsx("div", {
                className: "mtb-icon",
                "aria-hidden": "true",
                children: a.icon
            }), g.jsx("h1", {
                className: "mtb-tieude",
                children: a.tieuDe
            }), g.jsx("p", {
                className: "mtb-mo",
                children: t || a.mo
            }), r ? null : g.jsxs("div", {
                className: "mtb-nut",
                children: [n ? g.jsx("button", {
                    type: "button",
                    className: "mtb-btn",
                    onClick: n,
                    children: "Thử lại"
                }) : null, o ? g.jsx("a", {
                    className: "mtb-btn mtb-btn-phu",
                    href: o,
                    children: "Tạo thiệp của bạn"
                }) : null]
            })]
        })
    })
}
const bn = {
    messages: ["Chào cậu mình iu cậu nhiều lắm", "Iu 1000 lần", "Iu em", "iu em nhiều lắm", "17/11/200X", "iu ní nhiều lắm", "Iu em nhất trên đời"],
    images: ["/assets/images/1.jpg", "/assets/images/2.jpg", "/assets/images/3.jpg", "/assets/images/4.jpg", "/assets/images/5.jpg", "/assets/images/6.jpg", "/assets/images/7.jpg", "/assets/images/625a2866-caed-4ac9-8e7b-00599172ea16.jfif", "/assets/images/866ba173-1554-4491-905a-9b67fdcda533.jfif", "/assets/images/bcd1e29d-45e4-4b85-87ce-48879b53bb01.jfif"]
}
  , Go = 20
  , Uo = 10;
function wt(e, t="") {
    return typeof e == "string" ? e : t
}
function xn(e, t) {
    return Array.isArray(e) ? e.filter(n => typeof n == "string" && n.trim()).map(n => n.trim()).slice(0, t) : []
}
function Xo() {
    return {
        enableLetter: !0,
        enableHeart: !0,
        flyingTexts: bn.messages.slice(),
        flyingImages: bn.images.map(e => e.replace(/^\//, "")),
        couplePhoto: "assets/couple/couple.webp",
        letter: {
            text: Pt.paragraphs.join(`
`)
        },
        bgMusic: "musics/bongtrang.mp3",
        palette: "hong",
        showWatermark: !1
    }
}
function vn(e) {
    var c;
    const t = e && typeof e == "object" ? e : {}
      , n = me[t.palette] ? t.palette : "hong"
      , o = xn(t.flyingTexts, Go)
      , a = xn(t.flyingImages, Uo).map(Vt)
      , r = Vt(wt(t.couplePhoto))
      , s = wt((c = t.letter) == null ? void 0 : c.text).trim()
      , i = (t.enableLetter ?? !1) === !0 && s.length > 0
      , u = (t.enableHeart ?? !1) === !0 && r.length > 0;
    return {
        enableLetter: i,
        enableHeart: u,
        flyingTexts: o.length ? o : ["Trung thu vui vẻ"],
        flyingImages: a,
        couplePhoto: r,
        letter: {
            text: s
        },
        musicUrl: Ht(t.bgMusic) || Ht("musics/bongtrang.mp3"),
        palette: n,
        color: me[n].a,
        flyingHearts: t.flyingHearts === !0,
        showWatermark: t.showWatermark === !0,
        websiteId: wt(t.websiteId),
        expiresAt: t.expiresAt ?? null
    }
}
const Yo = 800
  , Wo = 3300
  , Mn = "/config.html"
  , Ko = O.autostart || new URLSearchParams(location.search).get("demo") === "1";
function qo() {
    const [e,t] = l.useState({
        trangThai: "dangTai"
    })
      , [n,o] = l.useState(0);
    return l.useEffect( () => {
        let a = !0;
        return t({
            trangThai: "dangTai"
        }),
        ra().then(r => {
            if (a) {
                if (r.trangThai === "trong") {
                    if (!Ko) {
                        location.replace(Mn);
                        return
                    }
                    t({
                        trangThai: "ok",
                        cauHinh: vn(Xo()),
                        diaChi: r.diaChi,
                        mau: !0
                    });
                    return
                }
                if (r.trangThai === "ok" || r.trangThai === "preview") {
                    t({
                        trangThai: "ok",
                        cauHinh: vn(r.config),
                        diaChi: r.diaChi,
                        preview: r.trangThai === "preview"
                    });
                    return
                }
                t({
                    trangThai: r.trangThai,
                    thongDiep: r.thongDiep,
                    diaChi: r.diaChi
                })
            }
        }
        ),
        () => {
            a = !1
        }
    }
    , [n]),
    e.trangThai === "dangTai" ? g.jsx(wn, {
        loai: "dangTai"
    }) : e.trangThai !== "ok" ? g.jsx(wn, {
        loai: e.trangThai,
        thongDiep: e.thongDiep,
        onThuLai: e.trangThai === "loi" ? () => o(a => a + 1) : null,
        linkTao: Mn
    }) : g.jsx(Zo, {
        cauHinh: e.cauHinh,
        diaChi: e.diaChi,
        preview: !!e.preview
    })
}
function Zo({cauHinh: e, diaChi: t, preview: n}) {
    const o = n && (t == null ? void 0 : t.scene) || ""
      , a = O.autostart || !!o
      , [r,s] = l.useState(a)
      , [i,u] = l.useState(!1)
      , [c,y] = l.useState(!1)
      , f = l.useRef(null)
      , h = l.useRef(null);
    l.useMemo( () => {
        Ia(e.palette),
        zo(e.musicUrl)
    }
    , [e]);
    const [m,d] = l.useState(null)
      , p = l.useMemo( () => ({
        fontName: "Mali",
        color: e.color,
        messages: e.flyingTexts,
        flyingHearts: m ?? e.flyingHearts,
        images: e.flyingImages
    }), [e, m])
      , w = l.useMemo( () => Cn(e.letter), [e]);
    l.useEffect( () => {
        Do();
        let T = 0;
        const S = () => {
            T && (clearTimeout(T),
            T = 0)
        }
          , j = E => {
            var D, A;
            gn(),
            (A = (D = E.target) == null ? void 0 : D.closest) != null && A.call(D, ".moon-hit") && (S(),
            T = setTimeout( () => {
                T = 0,
                Ct()
            }
            , Yo))
        }
          , P = () => gn();
        return window.addEventListener("pointerdown", j, !0),
        window.addEventListener("pointerup", S, !0),
        window.addEventListener("pointercancel", S, !0),
        window.addEventListener("touchend", P, !0),
        window.addEventListener("click", P, !0),
        () => {
            S(),
            window.removeEventListener("pointerdown", j, !0),
            window.removeEventListener("pointerup", S, !0),
            window.removeEventListener("pointercancel", S, !0),
            window.removeEventListener("touchend", P, !0),
            window.removeEventListener("click", P, !0)
        }
    }
    , []);
    const x = l.useCallback( () => {
        Ea(),
        s(!0),
        Ct(),
        e.enableHeart && oo()
    }
    , [e.enableHeart]);
    l.useEffect( () => {
        if (!r)
            return;
        const T = window.matchMedia("(max-width: 767px)").matches
          , S = [];
        e.enableLetter && (S.push(T ? "/assets/nguyet-thu/paper-straight.webp" : "/assets/nguyet-thu/paper.webp"),
        S.push("/assets/nguyet-thu/rabbit-cloud.webp")),
        e.enableHeart && S.push("/assets/ui/btn-heart.webp", e.couplePhoto),
        S.filter(Boolean).forEach(j => {
            const P = new Image;
            P.src = j
        }
        )
    }
    , [r, e]);
    const M = l.useCallback( () => {
        u(!0),
        Zt(!0)
    }
    , [])
      , C = l.useCallback( () => {
        u(!1),
        Zt(!1)
    }
    , [])
      , b = l.useCallback( () => {
        var T;
        (T = f.current) == null || T.call(f),
        y(!0)
    }
    , []);
    l.useEffect( () => {
        if (!r || !o)
            return;
        const T = setTimeout( () => {
            o === "letter" && e.enableLetter ? M() : o === "heart" && e.enableHeart && b()
        }
        , Wo);
        return () => clearTimeout(T)
    }
    , [r, o, e, M, b]),
    l.useEffect( () => {
        if (!n)
            return;
        const T = S => {
            S.origin === window.location.origin && S.data && (S.data.type === "loverain:doi-mau" && Fa(S.data.palette),
            S.data.type === "loverain:tim-bay" && d(!!S.data.on))
        }
        ;
        return window.addEventListener("message", T),
        () => window.removeEventListener("message", T)
    }
    , [n]),
    l.useEffect( () => {
        if (!(!n || window.parent === window))
            try {
                window.parent.postMessage({
                    type: "loverain:canh",
                    chuBay: r && !c
                }, window.location.origin)
            } catch {}
    }
    , [n, r, c]);
    const _ = !!(t != null && t.embed);
    return g.jsxs(g.Fragment, {
        children: [g.jsx(_o, {
            content: p,
            started: r,
            goHeartRef: f,
            coupleImgRef: h
        }), e.enableHeart ? g.jsx("div", {
            id: "couple-wrap",
            className: c ? "on" : void 0,
            children: g.jsx("img", {
                id: "couple",
                ref: h,
                src: e.couplePhoto,
                alt: "",
                "aria-hidden": "true",
                draggable: !1
            })
        }) : null, g.jsx(Ho, {
            visible: r,
            showHeart: e.enableHeart && !c,
            showLetter: e.enableLetter,
            onOpenHeart: b,
            onOpenLetter: M
        }), e.enableLetter ? g.jsx(Ra, {
            open: i,
            onClose: C,
            onOpenHeart: b,
            showHeart: e.enableHeart && !c,
            noiDung: w
        }) : null, n && !_ ? g.jsx("div", {
            className: "nhan-xemthu",
            children: "Chế độ xem thử"
        }) : null, e.showWatermark ? g.jsxs("a", {
            className: "dau-dlove",
            href: "https://dlove.vn",
            target: "_blank",
            rel: "noopener noreferrer",
            "aria-label": "Tạo món quà của bạn tại DLove.vn",
            children: [g.jsx("img", {
                src: "/assets/ui/logo-dlove.png",
                alt: "",
                width: "22",
                height: "24",
                draggable: !1
            }), g.jsx("span", {
                children: "DLove.vn"
            })]
        }) : null, g.jsx(Aa, {
            onStart: x,
            skip: a
        })]
    })
}
Tn() && document.documentElement.classList.add("giam-chuyen-dong");
fa(document.getElementById("root")).render(g.jsx(l.StrictMode, {
    children: g.jsx(qo, {})
}));
