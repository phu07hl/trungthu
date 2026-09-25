(function() {
    const t = document.createElement("link").relList;
    if (t && t.supports && t.supports("modulepreload"))
        return;
    for (const n of document.querySelectorAll('link[rel="modulepreload"]'))
        a(n);
    new MutationObserver(n => {
        for (const i of n)
            if (i.type === "childList")
                for (const o of i.addedNodes)
                    o.tagName === "LINK" && o.rel === "modulepreload" && a(o)
    }
    ).observe(document, {
        childList: !0,
        subtree: !0
    });
    function s(n) {
        const i = {};
        return n.integrity && (i.integrity = n.integrity),
        n.referrerPolicy && (i.referrerPolicy = n.referrerPolicy),
        n.crossOrigin === "use-credentials" ? i.credentials = "include" : n.crossOrigin === "anonymous" ? i.credentials = "omit" : i.credentials = "same-origin",
        i
    }
    function a(n) {
        if (n.ep)
            return;
        n.ep = !0;
        const i = s(n);
        fetch(n.href, i)
    }
}
)();
const p = "trungthuv2"
  , B = "https://t.dlove.vn";
function S() {
    let e = "";
    try {
        e = new URLSearchParams(location.search).get("api") || ""
    } catch {}
    return String(e || void 0 || "https://apiv2.deargift.online/api/v2").replace(/\/+$/, "")
}
const E = S()
  , y = "https://deargift.vn"
  , C = {
    CONFIG: "TRUNGTHUV2_CONFIG",
    CONFIG_EDITOR: "TRUNGTHUV2_CONFIG_EDITOR",
    NHAP_META: "TRUNGTHUV2_NHAP_META",
    PENDING_PAYMENT: "pending_payment_trungthuv2",
    PENDING_EDIT: "pending_edit_trungthuv2",
    PALETTE: "loverain:palette"
}
  , u = {
    NAME: "TrungThuV2PreviewDB",
    STORE: "preview",
    KEY_XEM: "config",
    KEY_NHAP: "nhap-tu-luu",
    VERSION: 1
}
  , M = new Set(["index", "index.html", "config", "config.html", "edit", "edit.html", "payment-success", "payment-success.html", "payment-cancel", "preview", "assets", "font", "src", "favicon.ico", "robots.txt"])
  , P = /^\/([a-z0-9](?:[a-z0-9-]{1,28}[a-z0-9])?)$/i
  , T = "musics/"
  , x = "/assets/music/";
function K(e) {
    const t = String(e || "").trim();
    return t ? /^https?:\/\//i.test(t) ? t : t.startsWith(T) ? x + t.slice(T.length) : t : ""
}
function Y(e) {
    const t = String(e || "").trim();
    return t ? /^https?:\/\//i.test(t) ? t : t.startsWith("assets/") ? "/" + t : t : ""
}
const D = 45e3;
function I() {
    return new Promise( (e, t) => {
        if (typeof indexedDB > "u") {
            t(new Error("Không có IndexedDB"));
            return
        }
        const s = indexedDB.open(u.NAME, u.VERSION);
        s.onupgradeneeded = () => {
            s.result.objectStoreNames.contains(u.STORE) || s.result.createObjectStore(u.STORE)
        }
        ,
        s.onsuccess = () => e(s.result),
        s.onerror = () => t(s.error)
    }
    )
}
async function F(e) {
    try {
        const t = await I();
        return await new Promise(s => {
            const n = t.transaction(u.STORE, "readonly").objectStore(u.STORE).get(e);
            n.onsuccess = () => s(n.result ?? null),
            n.onerror = () => s(null)
        }
        )
    } catch {
        return null
    }
}
async function V(e, t) {
    const s = await I();
    await new Promise( (a, n) => {
        const i = s.transaction(u.STORE, "readwrite");
        i.objectStore(u.STORE).put(t, e),
        i.oncomplete = a,
        i.onerror = () => n(i.error)
    }
    )
}
async function d(e) {
    const t = new AbortController
      , s = setTimeout( () => t.abort(), D);
    try {
        const a = await fetch(e, {
            signal: t.signal,
            headers: {
                Accept: "application/json"
            }
        });
        let n = null;
        try {
            n = await a.json()
        } catch {}
        return {
            status: a.status,
            body: n
        }
    } finally {
        clearTimeout(s)
    }
}
function w({status: e, body: t}) {
    var a, n, i, o;
    if (e === 200 && (t != null && t.success) && t.data)
        return {
            trangThai: "ok",
            config: t.data
        };
    if (t != null && t.expired)
        return {
            trangThai: "expired",
            thongDiep: t.message || "Thiệp này đã hết hạn."
        };
    const s = ((a = t == null ? void 0 : t.error) == null ? void 0 : a.code) || (t == null ? void 0 : t.code) || "";
    return e === 403 && (s === "payment_required" || t != null && t.paymentRequired) ? {
        trangThai: "payment_required",
        thongDiep: ((n = t == null ? void 0 : t.error) == null ? void 0 : n.message) || (t == null ? void 0 : t.message) || "Thiệp chưa được thanh toán."
    } : e === 404 || s === "not_found" ? {
        trangThai: "not_found",
        thongDiep: "Không tìm thấy thiệp này."
    } : e === 403 ? {
        trangThai: "not_found",
        thongDiep: ((i = t == null ? void 0 : t.error) == null ? void 0 : i.message) || (t == null ? void 0 : t.message) || "Thiệp chưa được kích hoạt."
    } : {
        trangThai: "loi",
        thongDiep: ((o = t == null ? void 0 : t.error) == null ? void 0 : o.message) || (t == null ? void 0 : t.message) || "Không tải được thiệp, thử lại sau."
    }
}
function b(e=location) {
    const t = new URLSearchParams(e.search)
      , s = t.get("preview") === "1"
      , a = t.get("embed") === "1"
      , n = t.get("scene") || "";
    let i = "";
    const o = (e.pathname || "/").match(P);
    o && !M.has(o[1].toLowerCase()) && (i = o[1].toLowerCase());
    let m = "";
    const f = (e.search || "").replace(/^\?+/, "").trim();
    if (f) {
        const A = f.split("&")[0].trim()
          , [h,O] = A.split("=");
        h && O === void 0 && /^[a-z0-9]{6,64}$/i.test(h) && (m = h)
    }
    return {
        preview: s,
        embed: a,
        scene: n,
        slug: i,
        websiteId: m
    }
}
async function j() {
    const e = b();
    if (e.preview) {
        const t = await F(u.KEY_XEM);
        if (t)
            return {
                trangThai: "preview",
                config: t,
                diaChi: e
            };
        try {
            const s = localStorage.getItem(C.CONFIG);
            if (s)
                return {
                    trangThai: "preview",
                    config: JSON.parse(s),
                    diaChi: e
                }
        } catch {}
        return {
            trangThai: "trong",
            diaChi: e
        }
    }
    try {
        if (e.slug) {
            const t = await d(`${E}/access/by-slug/${p}/${encodeURIComponent(e.slug)}`);
            return {
                ...w(t),
                diaChi: e
            }
        }
        if (e.websiteId) {
            const t = await d(`${E}/access/${p}/${encodeURIComponent(e.websiteId)}`);
            return {
                ...w(t),
                diaChi: e
            }
        }
    } catch (t) {
        return {
            trangThai: "loi",
            thongDiep: (t == null ? void 0 : t.name) === "AbortError" ? "Mạng chậm quá, không tải được thiệp. Thử tải lại trang." : "Không kết nối được máy chủ.",
            diaChi: e
        }
    }
    return {
        trangThai: "trong",
        diaChi: e
    }
}
const R = /[©®™]/
  , g = new RegExp("\\p{Extended_Pictographic}(?:\\p{Emoji_Modifier}|️|‍\\p{Extended_Pictographic})*|[0-9#*]️?⃣|[\\u{1F1E6}-\\u{1F1FF}]{2}","gu");
function q(e) {
    if (typeof e != "string")
        return !1;
    g.lastIndex = 0;
    let t;
    for (; (t = g.exec(e)) !== null; )
        if (!R.test(t[0]))
            return !0;
    return !1
}
function $(e) {
    return typeof e != "string" || !e ? "" : e.replace(g, t => R.test(t) ? t : "").replace(/[ \t]{2,}/g, " ").trim()
}
const r = new URLSearchParams(typeof location > "u" ? "" : location.search)
  , v = new Set((r.get("off") || "").split(",").filter(Boolean));
function z() {
    return !1
}
function L() {
    const e = r.get("quality");
    if (e === "low")
        return "yeu";
    if (e === "high" || typeof navigator > "u" || typeof window > "u")
        return "manh";
    const t = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      , s = Math.min(window.innerWidth, window.innerHeight) < 700
      , a = (navigator.hardwareConcurrency || 8) <= 4;
    return t || s || a ? "yeu" : "manh"
}
const U = L()
  , G = U === "yeu"
  , c = G ? {
    cols: 14,
    rows: 7,
    stars: 900,
    imgMax: 640,
    dprMax: 1.75,
    lanterns: 10,
    bloomHeight: 260,
    bloomIntensity: .42,
    bloomThreshold: .22
} : {
    cols: 18,
    rows: 9,
    stars: 1500,
    imgMax: 1024,
    dprMax: 2,
    lanterns: 14,
    bloomHeight: 180,
    bloomIntensity: .7,
    bloomThreshold: .1
}
  , l = {
    dpr: Number(r.get("dpr")) || 0,
    cols: Number(r.get("cols")) || c.cols,
    rows: Number(r.get("rows")) || c.rows,
    bloomHeight: Number(r.get("bh")) || c.bloomHeight,
    bloomIntensity: r.has("bi") ? Number(r.get("bi")) : c.bloomIntensity,
    bloomThreshold: r.has("bt") ? Number(r.get("bt")) : c.bloomThreshold,
    textMaterial: r.get("tm") || "standard",
    multisampling: r.has("ms") ? Number(r.get("ms")) : 0,
    antialias: r.has("aa") ? r.get("aa") === "1" : !1,
    noColorCycle: r.get("nocolor") === "1",
    autostart: r.get("autostart") === "1",
    starCount: Number(r.get("stars")) || c.stars,
    lanternCount: Number(r.get("lanterns")) || c.lanterns,
    flySecs: Number(r.get("fly")) || 2.2,
    showFlyingHearts: r.get("hearts") === "1",
    imgFix: r.get("imgfix") !== "0"
};
l.imgMax = Number(r.get("imgmax")) || (l.imgFix ? c.imgMax : 512);
l.imgGlow = r.has("glow") ? Number(r.get("glow")) : l.imgFix ? .4 : 1.5;
l.dprMax = Number(r.get("dprmax")) || c.dprMax;
const W = 95
  , X = -55
  , k = r.get("dir") === "down" ? -1 : 1
  , J = -35
  , Q = 55
  , Z = [-10, 0, 78]
  , tt = [-10, 0, 30]
  , et = 2.8
  , nt = [0, 0, -30]
  , rt = [0, 0, -66]
  , N = typeof window < "u" && window.innerHeight > window.innerWidth
  , st = [0, N ? -12 : -16, -66]
  , it = Number(r.get("heartscale")) || (N ? 1.25 : 1.7)
  , at = .6
  , ot = .75
  , ct = .32
  , ut = .5
  , lt = {
    hong: {
        nhan: "Hồng chuyển sắc",
        a: "#EE66A6",
        b: "#99DDFF"
    },
    hongdon: {
        nhan: "Hồng",
        a: "#EE66A6",
        b: "#EE66A6"
    },
    vang: {
        nhan: "Vàng",
        a: "#FFC24A",
        b: "#FFF4CB"
    }
}
  , ht = ["hong", "hongdon", "vang"]
  , gt = "loverain:palette"
  , _ = {
    url: "/assets/intro/06-lantern-distant.webp",
    crop: {
        x: 160,
        y: 76,
        w: 1015,
        h: 1107
    },
    emissive: "#ffb347",
    emissiveIntensity: .9,
    scale: 1
}
  , H = [{
    url: "/assets/rabbits/rabbit-flying-with-lantern.webp",
    crop: {
        x: 0,
        y: 0,
        w: 433,
        h: 512
    }
}, {
    url: "/assets/rabbits/rabbit-flying-with-star.webp",
    crop: {
        x: 0,
        y: 0,
        w: 512,
        h: 471
    }
}, {
    url: "/assets/rabbits/rabbit-sitting-golden-crescent.webp",
    crop: {
        x: 0,
        y: 0,
        w: 506,
        h: 512
    }
}, {
    url: "/assets/rabbits/rabbit-sleeping-full-moon.webp",
    crop: {
        x: 0,
        y: 0,
        w: 426,
        h: 512
    }
}, {
    url: "/assets/rabbits/rabbit-sleeping-white-crescent.webp",
    crop: {
        x: 0,
        y: 0,
        w: 455,
        h: 512
    }
}].map(e => ({
    ...e,
    emissive: "#ffffff",
    emissiveIntensity: .6,
    scale: 1.8,
    speedMul: .7
}))
  , mt = v.has("rabbits") ? [_] : H.flatMap(e => [_, e]);
export {E as A, ut as C, l as D, J as F, st as H, u as I, mt as L, ot as O, ht as P, lt as R, B as S, p as T, C as a, y as b, q as c, F as d, $ as e, z as f, V as g, gt as h, ct as i, X as j, W as k, k as l, Q as m, tt as n, Z as o, K as p, nt as q, et as r, it as s, rt as t, at as u, v, Y as w, j as x};
