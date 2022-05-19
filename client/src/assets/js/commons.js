/*! For license information please see commons-c1e7f612c040c3fd58ff.js.LICENSE.txt */
(self.webpackChunk = self.webpackChunk || []).push([[351], {
    676: (e,t,n)=>{
        "use strict";
        function r(e, t) {
            (null == t || t > e.length) && (t = e.length);
            for (var n = 0, r = new Array(t); n < t; n++)
                r[n] = e[n];
            return r
        }
        n.d(t, {
            Z: ()=>r
        })
    }
    ,
    6156: (e,t,n)=>{
        "use strict";
        function r(e, t, n) {
            return t in e ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = n,
            e
        }
        n.d(t, {
            Z: ()=>r
        })
    }
    ,
    7329: (e,t,n)=>{
        "use strict";
        n.d(t, {
            Z: ()=>i
        });
        var r = n(676);
        var o = n(2961);
        function i(e) {
            return function(e) {
                if (Array.isArray(e))
                    return (0,
                    r.Z)(e)
            }(e) || function(e) {
                if ("undefined" != typeof Symbol && null != e[Symbol.iterator] || null != e["@@iterator"])
                    return Array.from(e)
            }(e) || (0,
            o.Z)(e) || function() {
                throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
            }()
        }
    }
    ,
    2961: (e,t,n)=>{
        "use strict";
        n.d(t, {
            Z: ()=>o
        });
        var r = n(676);
        function o(e, t) {
            if (e) {
                if ("string" == typeof e)
                    return (0,
                    r.Z)(e, t);
                var n = Object.prototype.toString.call(e).slice(8, -1);
                return "Object" === n && e.constructor && (n = e.constructor.name),
                "Map" === n || "Set" === n ? Array.from(e) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? (0,
                r.Z)(e, t) : void 0
            }
        }
    }
    ,
    0: (e,t)=>{
        "use strict";
        t.Z = async function() {
            let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            const {domain: t="", values: n={}} = e;
            if (t && Object.keys(n).length) {
                const {body: e} = document
                  , r = document.createElement("img")
                  , o = Object.entries(n).reduce(((e,t)=>{
                    let[n,r] = t;
                    return e.length ? "".concat(e, "&").concat(n, "=").concat(r) : "".concat(n, "=").concat(r)
                }
                ), "");
                let i = !1
                  , a = 0;
                const c = 5
                  , s = 1e3;
                r.src = "".concat(t, "sf-api/cookies?").concat(o),
                r.style.display = "none",
                r.onload = ()=>{
                    i = !0
                }
                ,
                e.appendChild(r);
                const u = new Promise((e=>{
                    const t = setInterval((()=>{
                        a += 1,
                        i ? (clearInterval(t),
                        e(!0)) : a >= c && (clearInterval(t),
                        e(!1))
                    }
                    ), s)
                }
                ));
                return await u
            }
            return Promise.resolve(!1)
        }
    }
    ,
    4713: (e,t,n)=>{
        "use strict";
        n.d(t, {
            Z: ()=>d
        });
        var r = n(7329)
          , o = n(6156)
          , i = n(1379);
        const a = [];
        function c(e, t=i.ZT) {
            let n;
            const r = [];
            function o(t) {
                if ((0,
                i.N8)(e, t) && (e = t,
                n)) {
                    const t = !a.length;
                    for (let t = 0; t < r.length; t += 1) {
                        const n = r[t];
                        n[1](),
                        a.push(n, e)
                    }
                    if (t) {
                        for (let e = 0; e < a.length; e += 2)
                            a[e][0](a[e + 1]);
                        a.length = 0
                    }
                }
            }
            return {
                set: o,
                update: function(t) {
                    o(t(e))
                },
                subscribe: function(a, c=i.ZT) {
                    const s = [a, c];
                    return r.push(s),
                    1 === r.length && (n = t(o) || i.ZT),
                    a(e),
                    ()=>{
                        const e = r.indexOf(s);
                        -1 !== e && r.splice(e, 1),
                        0 === r.length && (n(),
                        n = null)
                    }
                }
            }
        }
        function s(e, t) {
            var n = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
                var r = Object.getOwnPropertySymbols(e);
                t && (r = r.filter((function(t) {
                    return Object.getOwnPropertyDescriptor(e, t).enumerable
                }
                ))),
                n.push.apply(n, r)
            }
            return n
        }
        function u(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = null != arguments[t] ? arguments[t] : {};
                t % 2 ? s(Object(n), !0).forEach((function(t) {
                    (0,
                    o.Z)(e, t, n[t])
                }
                )) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : s(Object(n)).forEach((function(t) {
                    Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
                }
                ))
            }
            return e
        }
        const d = function() {
            var e = c({
                token: null,
                user: {},
                cart: {
                    id: null,
                    status: null,
                    items: [],
                    total: {}
                },
                favorites: [],
                isMediaPlaying: !1,
                articles: {
                    reviews: {
                        items: [],
                        sorting: "-helpful,-created_at",
                        page: 1
                    },
                    comments: {
                        items: [],
                        sorting: "-helpful,-created_at",
                        page: 1
                    },
                    authorProducts: {
                        items: [],
                        sorting: "newest",
                        page: 0,
                        pageCount: 0,
                        type: ""
                    }
                },
                productCart: {
                    license: null,
                    services: [],
                    supports: []
                }
            })
              , t = e.subscribe
              , n = e.update;
            return {
                subscribe: t,
                update: n,
                setToken: function(e) {
                    return n((function(t) {
                        return u(u({}, t), {}, {
                            token: e
                        })
                    }
                    ))
                },
                setUser: function(e) {
                    return n((function(t) {
                        return u(u({}, t), {}, {
                            user: e
                        })
                    }
                    ))
                },
                setCartData: function(e) {
                    return n((function(t) {
                        return u(u({}, t), {}, {
                            cart: u(u({}, t.cart), e)
                        })
                    }
                    ))
                },
                setIsMediaPlaying: function(e) {
                    return n((function(t) {
                        return u(u({}, t), {}, {
                            isMediaPlaying: e
                        })
                    }
                    ))
                },
                setFavorites: function(e) {
                    return n((function(t) {
                        return u(u({}, t), {}, {
                            favorites: (0,
                            r.Z)(e)
                        })
                    }
                    ))
                },
                addToFavorites: function(e) {
                    return n((function(t) {
                        return u(u({}, t), {}, {
                            favorites: [].concat((0,
                            r.Z)(t.favorites), [e])
                        })
                    }
                    ))
                },
                removeFromFavorites: function(e) {
                    return n((function(t) {
                        return u(u({}, t), {}, {
                            favorites: t.favorites.filter((function(t) {
                                return t.item_name !== e.item_name
                            }
                            ))
                        })
                    }
                    ))
                },
                setArticlesSorting: function(e, t) {
                    return n((function(n) {
                        return u(u({}, n), {}, {
                            articles: u(u({}, n.articles), {}, (0,
                            o.Z)({}, e, u(u({}, n.articles[e]), {}, {
                                sorting: t
                            })))
                        })
                    }
                    ))
                },
                setArticlesPage: function(e, t) {
                    return n((function(n) {
                        return u(u({}, n), {}, {
                            articles: u(u({}, n.articles), {}, (0,
                            o.Z)({}, e, u(u({}, n.articles[e]), {}, {
                                page: t
                            })))
                        })
                    }
                    ))
                },
                setArticlesPageCount: function(e, t) {
                    return n((function(n) {
                        return u(u({}, n), {}, {
                            articles: u(u({}, n.articles), {}, (0,
                            o.Z)({}, e, u(u({}, n.articles[e]), {}, {
                                pageCount: t
                            })))
                        })
                    }
                    ))
                },
                setArticlesItems: function(e, t, i) {
                    return n((function(n) {
                        return u(u({}, n), {}, {
                            articles: u(u({}, n.articles), {}, (0,
                            o.Z)({}, e, u(u({}, n.articles[e]), {}, {
                                items: i ? [].concat((0,
                                r.Z)(n.articles[e].items), (0,
                                r.Z)(t)) : t
                            })))
                        })
                    }
                    ))
                },
                setArticlesProductsType: function(e, t) {
                    return n((function(n) {
                        return u(u({}, n), {}, {
                            articles: u(u({}, n.articles), {}, (0,
                            o.Z)({}, e, u(u({}, n.articles[e]), {}, {
                                type: t
                            })))
                        })
                    }
                    ))
                },
                setProductCartLicense: function(e) {
                    return n((function(t) {
                        return u(u({}, t), {}, {
                            productCart: u(u({}, t.productCart), {}, {
                                license: e
                            })
                        })
                    }
                    ))
                },
                setProductCartServices: function(e) {
                    return n((function(t) {
                        return u(u({}, t), {}, {
                            productCart: u(u({}, t.productCart), {}, {
                                services: (0,
                                r.Z)(e)
                            })
                        })
                    }
                    ))
                },
                setProductCartSupports: function(e) {
                    return n((function(t) {
                        return u(u({}, t), {}, {
                            productCart: u(u({}, t.productCart), {}, {
                                supports: (0,
                                r.Z)(e)
                            })
                        })
                    }
                    ))
                }
            }
        }()
    }
    ,
    5980: (e,t,n)=>{
        "use strict";
        function r(e) {
            window.dataLayer = window.dataLayer || [],
            window.dataLayer.push(e)
        }
        n.d(t, {
            y: ()=>r
        })
    }
    ,
    5191: (e,t,n)=>{
        "use strict";
        function r(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            switch (e) {
            case "impressionSent":
                var n = function(e) {
                    var t = e.id
                      , n = void 0 === t ? "" : t
                      , r = e.name
                      , o = void 0 === r ? "" : r
                      , i = e.price
                      , a = void 0 === i ? "" : i
                      , c = e.brand
                      , s = void 0 === c ? "" : c
                      , u = e.category
                      , d = void 0 === u ? "" : u
                      , v = e.variant
                      , l = void 0 === v ? "" : v
                      , p = e.list
                      , f = void 0 === p ? "" : p
                      , m = e.position;
                    return {
                        id: n,
                        name: o,
                        price: a,
                        brand: s,
                        category: d,
                        variant: l,
                        list: f,
                        position: void 0 === m ? "" : m
                    }
                }(t);
                return {
                    event: "impressionSent",
                    ecommerce: {
                        impressions: [n]
                    }
                };
            case "productClick":
                var r = function(e) {
                    var t = e.id
                      , n = void 0 === t ? "" : t
                      , r = e.name
                      , o = void 0 === r ? "" : r
                      , i = e.price
                      , a = void 0 === i ? "" : i
                      , c = e.brand
                      , s = void 0 === c ? "" : c
                      , u = e.category
                      , d = void 0 === u ? "" : u
                      , v = e.variant
                      , l = void 0 === v ? "" : v
                      , p = e.position;
                    return {
                        id: n,
                        name: o,
                        price: a,
                        brand: s,
                        category: d,
                        variant: l,
                        position: void 0 === p ? 1 : p
                    }
                }(t)
                  , o = t.list
                  , i = void 0 === o ? "" : o;
                return {
                    event: "productClick",
                    ecommerce: {
                        click: {
                            actionField: {
                                list: i
                            },
                            products: [r]
                        }
                    }
                };
            case "useFilter":
                var a = t.filterName
                  , c = t.filterValue;
                return {
                    event: "useFilter",
                    eventCategory: "Filters",
                    eventAction: a,
                    eventLabel: c
                };
            case "addToCart":
                var s = function(e) {
                    var t = e.id
                      , n = void 0 === t ? "" : t
                      , r = e.name
                      , o = void 0 === r ? "" : r
                      , i = e.price
                      , a = void 0 === i ? "" : i
                      , c = e.brand
                      , s = void 0 === c ? "" : c
                      , u = e.category
                      , d = void 0 === u ? "" : u
                      , v = e.variant
                      , l = void 0 === v ? "" : v
                      , p = e.licenseId
                      , f = void 0 === p ? "" : p
                      , m = e.quantity
                      , g = void 0 === m ? 1 : m;
                    return {
                        id: n,
                        name: o,
                        price: a,
                        brand: s,
                        category: d,
                        variant: f ? "".concat(l, " + ").concat(f) : "".concat(l),
                        quantity: g
                    }
                }(t);
                return {
                    event: "addToCart",
                    ecommerce: {
                        add: {
                            products: [s]
                        }
                    }
                };
            case "impressionSentOffer":
                return {
                    event: "impressionSent",
                    ecommerce: {
                        impressions: t
                    }
                };
            case "addtoCollection":
                var u = t.eventAction
                  , d = void 0 === u ? "" : u
                  , v = t.eventLabel
                  , l = void 0 === v ? "" : v;
                return {
                    event: "addtoCollection",
                    eventCategory: "Add_to_collection",
                    eventAction: d,
                    eventLabel: l
                };
            case "motoTrial":
                var p = t.eventLabel
                  , f = void 0 === p ? "Submit" : p;
                return {
                    event: "Moto Trial",
                    eventCategory: "Moto Trial",
                    eventAction: "Get trial",
                    eventLabel: f
                };
            case "formSent":
                var m = t.eventAction
                  , g = t.eventLabel
                  , w = void 0 === g ? "Submit" : g;
                return {
                    event: "Forms_send",
                    eventCategory: "Forms",
                    eventAction: m,
                    eventLabel: w
                };
            case "menu":
                var y = t.eventAction
                  , b = void 0 === y ? "Main button - header" : y
                  , h = t.eventLabel
                  , C = void 0 === h ? "Open menu" : h;
                return {
                    event: "newmenu",
                    eventCategory: "New menu",
                    eventAction: b,
                    eventLabel: C
                };
            case "promotionView":
                var _ = function(e) {
                    var t = e.id
                      , n = void 0 === t ? "" : t
                      , r = e.name
                      , o = void 0 === r ? "" : r
                      , i = e.creative
                      , a = void 0 === i ? "" : i
                      , c = e.position;
                    return {
                        id: n,
                        name: o,
                        creative: a,
                        position: void 0 === c ? 1 : c
                    }
                }(t);
                return {
                    event: "promotionView",
                    ecommerce: {
                        promoView: {
                            promotions: [_]
                        }
                    }
                };
            case "promotionClick":
                var k = function(e) {
                    var t = e.id
                      , n = void 0 === t ? "" : t
                      , r = e.name
                      , o = void 0 === r ? "" : r
                      , i = e.creative
                      , a = void 0 === i ? "" : i
                      , c = e.position;
                    return {
                        id: n,
                        name: o,
                        creative: a,
                        position: void 0 === c ? 1 : c
                    }
                }(t);
                return {
                    event: "promotionClick",
                    ecommerce: {
                        promoClick: {
                            promotions: [k]
                        }
                    }
                };
            case "chatuser":
                var O = t.name
                  , A = void 0 === O ? "" : O
                  , S = t.chatroom
                  , Z = void 0 === S ? "assistance" : S
                  , j = t.email
                  , P = void 0 === j ? "" : j;
                return {
                    event: "chatuser",
                    userdata: [{
                        chatname: A,
                        chatroom: Z,
                        chatemail: P
                    }]
                };
            case "sorting":
                var L = t.currentSorting
                  , D = void 0 === L ? "" : L
                  , F = t.newSorting
                  , T = void 0 === F ? "" : F;
                return {
                    event: "sorting",
                    eventCategory: "Use sorting",
                    eventAction: "New - ".concat(T),
                    eventLabel: "Old - ".concat(D)
                };
            case "trackEvent":
                var x = t.eventCategory
                  , I = void 0 === x ? "Cart pop-up" : x
                  , U = t.eventAction
                  , E = void 0 === U ? "" : U
                  , B = t.eventLabel
                  , M = void 0 === B ? "" : B;
                return {
                    event: "trackEvent",
                    eventCategory: I,
                    eventAction: E,
                    eventLabel: M
                };
            default:
                console.warn("Broken event name ".concat(e))
            }
        }
        n.d(t, {
            c: ()=>r
        })
    }
    ,
    4522: (e,t,n)=>{
        "use strict";
        n.d(t, {
            Z: ()=>r
        });
        const r = {
            apiUrls: window.__app__.js.api,
            pageType: window.__app__.analytics.pageType,
            locale: window.__app__.language,
            apiLocale: window.__app__.apiLocale,
            domain: window.__app__.js.domain,
            liveDemoDomain: window.__app__.js.liveDemoDomain,
            liveDemoCookieDomain: window.__app__.js.liveDemoCookieDomain,
            cookieDomain: window.__app__.js.cookieDomain,
            fontPreviewDomain: window.__app__.js.fontPreviewDomain,
            reviveConfig: window.__app__.js.revive
        }
    }
    ,
    3048: (e,t,n)=>{
        "use strict";
        var r = n(5980)
          , o = n(5191);
        (0,
        n(3081).Fi)((function() {
            Object.defineProperty(window, "LiveChatWidget", {
                configurable: !0,
                get: function() {
                    return this._LiveChatWidget
                },
                set: function(e) {
                    this._LiveChatWidget = e,
                    window.LiveChatWidget.on("form_submitted", (function(e) {
                        if ("prechat" === e.type) {
                            var t = window.LiveChatWidget.get("customer_data");
                            (0,
                            r.y)((0,
                            o.c)("chatuser", t))
                        }
                    }
                    ))
                }
            })
        }
        ))
    }
    ,
    6808: (e,t,n)=>{
        var r, o;
        !function(i) {
            if (void 0 === (o = "function" == typeof (r = i) ? r.call(t, n, t, e) : r) || (e.exports = o),
            !0,
            e.exports = i(),
            !!0) {
                var a = window.Cookies
                  , c = window.Cookies = i();
                c.noConflict = function() {
                    return window.Cookies = a,
                    c
                }
            }
        }((function() {
            function e() {
                for (var e = 0, t = {}; e < arguments.length; e++) {
                    var n = arguments[e];
                    for (var r in n)
                        t[r] = n[r]
                }
                return t
            }
            function t(e) {
                return e.replace(/(%[0-9A-Z]{2})+/g, decodeURIComponent)
            }
            return function n(r) {
                function o() {}
                function i(t, n, i) {
                    if ("undefined" != typeof document) {
                        "number" == typeof (i = e({
                            path: "/"
                        }, o.defaults, i)).expires && (i.expires = new Date(1 * new Date + 864e5 * i.expires)),
                        i.expires = i.expires ? i.expires.toUTCString() : "";
                        try {
                            var a = JSON.stringify(n);
                            /^[\{\[]/.test(a) && (n = a)
                        } catch (e) {}
                        n = r.write ? r.write(n, t) : encodeURIComponent(String(n)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent),
                        t = encodeURIComponent(String(t)).replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent).replace(/[\(\)]/g, escape);
                        var c = "";
                        for (var s in i)
                            i[s] && (c += "; " + s,
                            !0 !== i[s] && (c += "=" + i[s].split(";")[0]));
                        return document.cookie = t + "=" + n + c
                    }
                }
                function a(e, n) {
                    if ("undefined" != typeof document) {
                        for (var o = {}, i = document.cookie ? document.cookie.split("; ") : [], a = 0; a < i.length; a++) {
                            var c = i[a].split("=")
                              , s = c.slice(1).join("=");
                            n || '"' !== s.charAt(0) || (s = s.slice(1, -1));
                            try {
                                var u = t(c[0]);
                                if (s = (r.read || r)(s, u) || t(s),
                                n)
                                    try {
                                        s = JSON.parse(s)
                                    } catch (e) {}
                                if (o[u] = s,
                                e === u)
                                    break
                            } catch (e) {}
                        }
                        return e ? o[e] : o
                    }
                }
                return o.set = i,
                o.get = function(e) {
                    return a(e, !1)
                }
                ,
                o.getJSON = function(e) {
                    return a(e, !0)
                }
                ,
                o.remove = function(t, n) {
                    i(t, "", e(n, {
                        expires: -1
                    }))
                }
                ,
                o.defaults = {},
                o.withConverter = n,
                o
            }((function() {}
            ))
        }
        ))
    }
    ,
    9115: (e,t,n)=>{
        e.exports = {
            id: "heart-usage",
            viewBox: "0 0 20 20",
            url: n.p + "images/sprite-svg-df7b3732035b960a68c524ed816aa6cd.svg#heart-usage",
            toString: function() {
                return this.url
            }
        }
    }
    ,
    8115: (e,t,n)=>{
        e.exports = {
            id: "heartFilled-usage",
            viewBox: "0 0 20 18",
            url: n.p + "images/sprite-svg-df7b3732035b960a68c524ed816aa6cd.svg#heartFilled-usage",
            toString: function() {
                return this.url
            }
        }
    }
}]);
