/*!
 * jQuery Tools v1.2.7 - The missing UI library for the Web
 *
 * overlay/overlay.js
 * overlay/overlay.apple.js
 * scrollable/scrollable.js
 * scrollable/scrollable.autoscroll.js
 * scrollable/scrollable.navigator.js
 * tabs/tabs.js
 * toolbox/toolbox.history.js
 *
 * NO COPYRIGHTS OR LICENSES. DO WHAT YOU LIKE.
 *
 * http://flowplayer.org/tools/
 *
 */
(function (a) {
    a.tools = a.tools || {
        version: "v1.2.7"
    }, a.tools.overlay = {
        addEffect: function (a, b, d) {
            c[a] = [b, d]
        },
        conf: {
            close: null,
            closeOnClick: !0,
            closeOnEsc: !0,
            closeSpeed: "fast",
            effect: "default",
            fixed: !a.browser.msie || a.browser.version > 6,
            left: "center",
            load: !1,
            mask: null,
            oneInstance: !0,
            speed: "normal",
            target: null,
            top: "10%"
        }
    };
    var b = [],
        c = {};
    a.tools.overlay.addEffect("default", function (b, c) {
        var d = this.getConf(),
            e = a(window);
        d.fixed || (b.top += e.scrollTop(), b.left += e.scrollLeft()), b.position = d.fixed ? "fixed" : "absolute", this.getOverlay().css(b).fadeIn(d.speed, c)
    }, function (a) {
        this.getOverlay().fadeOut(this.getConf().closeSpeed, a)
    });

    function d(d, e) {
        var f = this,
            g = d.add(f),
            h = a(window),
            i, j, k, l = a.tools.expose && (e.mask || e.expose),
            m = Math.random().toString().slice(10);
        l && (typeof l == "string" && (l = {
            color: l
        }), l.closeOnClick = l.closeOnEsc = !1);
        var n = e.target || d.attr("rel");
        j = n ? a(n) : null || d;
        if (!j.length) throw "Could not find Overlay: " + n;
        d && d.index(j) == -1 && d.click(function (a) {
            f.load(a);
            return a.preventDefault()
        }), a.extend(f, {
            load: function (d) {
                if (f.isOpened()) return f;
                var i = c[e.effect];
                if (!i) throw "Overlay: cannot find effect : \"" + e.effect + "\"";
                e.oneInstance && a.each(b, function () {
                    this.close(d)
                }), d = d || a.Event(), d.type = "onBeforeLoad", g.trigger(d);
                if (d.isDefaultPrevented()) return f;
                k = !0, l && a(j).expose(l);
                var n = e.top,
                    o = e.left,
                    p = j.outerWidth({
                        margin: !0
                    }),
                    q = j.outerHeight({
                        margin: !0
                    });
                typeof n == "string" && (n = n == "center" ? Math.max((h.height() - q) / 2, 0) : parseInt(n, 10) / 100 * h.height()), o == "center" && (o = Math.max((h.width() - p) / 2, 0)), i[0].call(f, {
                    top: n,
                    left: o
                }, function () {
                    k && (d.type = "onLoad", g.trigger(d))
                }), l && e.closeOnClick && a.mask.getMask().one("click", f.close), e.closeOnClick && a(document).on("click." + m, function (b) {
                    a(b.target).parents(j).length || f.close(b)
                }), e.closeOnEsc && a(document).on("keydown." + m, function (a) {
                    a.keyCode == 27 && f.close(a)
                });
                return f
            },
            close: function (b) {
                if (!f.isOpened()) return f;
                b = b || a.Event(), b.type = "onBeforeClose", g.trigger(b);
                if (!b.isDefaultPrevented()) {
                    k = !1, c[e.effect][1].call(f, function () {
                        b.type = "onClose", g.trigger(b)
                    }), a(document).off("click." + m + " keydown." + m), l && a.mask.close();
                    return f
                }
            },
            getOverlay: function () {
                return j
            },
            getTrigger: function () {
                return d
            },
            getClosers: function () {
                return i
            },
            isOpened: function () {
                return k
            },
            getConf: function () {
                return e
            }
        }), a.each("onBeforeLoad,onStart,onLoad,onBeforeClose,onClose".split(","), function (b, c) {
            a.isFunction(e[c]) && a(f).on(c, e[c]), f[c] = function (b) {
                b && a(f).on(c, b);
                return f
            }
        }), i = j.find(e.close || ".close"), !i.length && !e.close && (i = a("<a class=\"close\"></a>"), j.prepend(i)), i.click(function (a) {
            f.close(a)
        }), e.load && f.load()
    }
    a.fn.overlay = function (c) {
        var e = this.data("overlay");
        if (e) return e;
        a.isFunction(c) && (c = {
            onBeforeLoad: c
        }), c = a.extend(!0, {}, a.tools.overlay.conf, c), this.each(function () {
            e = new d(a(this), c), b.push(e), a(this).data("overlay", e)
        });
        return c.api ? e : this
    }
})(jQuery);
(function (a) {
    var b = a.tools.overlay,
        c = a(window);
    a.extend(b.conf, {
        start: {
            top: null,
            left: null
        },
        fadeInSpeed: "fast",
        zIndex: 9999
    });

    function d(a) {
        var b = a.offset();
        return {
            top: b.top + a.height() / 2,
            left: b.left + a.width() / 2
        }
    }
    var e = function (b, e) {
        var f = this.getOverlay(),
            g = this.getConf(),
            h = this.getTrigger(),
            i = this,
            j = f.outerWidth({
                margin: !0
            }),
            k = f.data("img"),
            l = g.fixed ? "fixed" : "absolute";
        if (!k) {
            var m = f.css("backgroundImage");
            if (!m) throw "background-image CSS property not set for overlay";
            m = m.slice(m.indexOf("(") + 1, m.indexOf(")")).replace(/\"/g, ""), f.css("backgroundImage", "none"), k = a("<img src=\"" + m + "\"/>"), k.css({
                border: 0,
                display: "none"
            }).width(j), a("body").append(k), f.data("img", k)
        }
        var n = g.start.top || Math.round(c.height() / 2),
            o = g.start.left || Math.round(c.width() / 2);
        if (h) {
            var p = d(h);
            n = p.top, o = p.left
        }
        g.fixed ? (n -= c.scrollTop(), o -= c.scrollLeft()) : (b.top += c.scrollTop(), b.left += c.scrollLeft()), k.css({
            position: "absolute",
            top: n,
            left: o,
            width: 0,
            zIndex: g.zIndex
        }).show(), b.position = l, f.css(b), k.animate({
            top: b.top,
            left: b.left,
            width: j
        }, g.speed, function () {
            f.css("zIndex", g.zIndex + 1).fadeIn(g.fadeInSpeed, function () {
                i.isOpened() && !a(this).index(f) ? e.call() : f.hide()
            })
        }).css("position", l)
    }, f = function (b) {
            var e = this.getOverlay().hide(),
                f = this.getConf(),
                g = this.getTrigger(),
                h = e.data("img"),
                i = {
                    top: f.start.top,
                    left: f.start.left,
                    width: 0
                };
            g && a.extend(i, d(g)), f.fixed && h.css({
                position: "absolute"
            }).animate({
                top: "+=" + c.scrollTop(),
                left: "+=" + c.scrollLeft()
            }, 0), h.animate(i, f.closeSpeed, b)
        };
    b.addEffect("apple", e, f)
})(jQuery);
(function (a) {
    a.tools = a.tools || {
        version: "v1.2.7"
    }, a.tools.scrollable = {
        conf: {
            activeClass: "active",
            circular: !1,
            clonedClass: "cloned",
            disabledClass: "disabled",
            easing: "swing",
            initialIndex: 0,
            item: "> *",
            items: ".items",
            keyboard: !0,
            mousewheel: !1,
            next: ".next",
            prev: ".prev",
            size: 1,
            speed: 400,
            vertical: !1,
            touch: !0,
            wheelSpeed: 0
        }
    };

    function b(a, b) {
        var c = parseInt(a.css(b), 10);
        if (c) return c;
        var d = a[0].currentStyle;
        return d && d.width && parseInt(d.width, 10)
    }

    function c(b, c) {
        var d = a(c);
        return d.length < 2 ? d : b.parent().find(c)
    }
    var d;

    function e(b, e) {
        var f = this,
            g = b.add(f),
            h = b.children(),
            i = 0,
            j = e.vertical;
        d || (d = f), h.length > 1 && (h = a(e.items, b)), e.size > 1 && (e.circular = !1), a.extend(f, {
            getConf: function () {
                return e
            },
            getIndex: function () {
                return i
            },
            getSize: function () {
                return f.getItems().size()
            },
            getNaviButtons: function () {
                return n.add(o)
            },
            getRoot: function () {
                return b
            },
            getItemWrap: function () {
                return h
            },
            getItems: function () {
                return h.find(e.item).not("." + e.clonedClass)
            },
            move: function (a, b) {
                return f.seekTo(i + a, b)
            },
            next: function (a) {
                return f.move(e.size, a)
            },
            prev: function (a) {
                return f.move(-e.size, a)
            },
            begin: function (a) {
                return f.seekTo(0, a)
            },
            end: function (a) {
                return f.seekTo(f.getSize() - 1, a)
            },
            focus: function () {
                d = f;
                return f
            },
            addItem: function (b) {
                b = a(b), e.circular ? (h.children().last().before(b), h.children().first().replaceWith(b.clone().addClass(e.clonedClass))) : (h.append(b), o.removeClass("disabled")), g.trigger("onAddItem", [b]);
                return f
            },
            seekTo: function (b, c, k) {
                b.jquery || (b *= 1);
                if (e.circular && b === 0 && i == -1 && c !== 0) return f;
                if (!e.circular && b < 0 || b > f.getSize() || b < -1) return f;
                var l = b;
                b.jquery ? b = f.getItems().index(b) : l = f.getItems().eq(b);
                var m = a.Event("onBeforeSeek");
                if (!k) {
                    g.trigger(m, [b, c]);
                    if (m.isDefaultPrevented() || !l.length) return f
                }
                var n = j ? {
                    top: -l.position().top
                } : {
                    left: -l.position().left
                };
                i = b, d = f, c === undefined && (c = e.speed), h.animate(n, c, e.easing, k || function () {
                    g.trigger("onSeek", [b])
                });
                return f
            }
        }), a.each(["onBeforeSeek", "onSeek", "onAddItem"], function (b, c) {
            a.isFunction(e[c]) && a(f).on(c, e[c]), f[c] = function (b) {
                b && a(f).on(c, b);
                return f
            }
        });
        if (e.circular) {
            var k = f.getItems().slice(-1).clone().prependTo(h),
                l = f.getItems().eq(1).clone().appendTo(h);
            k.add(l).addClass(e.clonedClass), f.onBeforeSeek(function (a, b, c) {
                if (!a.isDefaultPrevented()) {
                    if (b == -1) {
                        f.seekTo(k, c, function () {
                            f.end(0)
                        });
                        return a.preventDefault()
                    }
                    b == f.getSize() && f.seekTo(l, c, function () {
                        f.begin(0)
                    })
                }
            });
            var m = b.parents().add(b).filter(function () {
                if (a(this).css("display") === "none") return !0
            });
            m.length ? (m.show(), f.seekTo(0, 0, function () {}), m.hide()) : f.seekTo(0, 0, function () {})
        }
        var n = c(b, e.prev).click(function (a) {
            a.stopPropagation(), f.prev()
        }),
            o = c(b, e.next).click(function (a) {
                a.stopPropagation(), f.next()
            });
        e.circular || (f.onBeforeSeek(function (a, b) {
            setTimeout(function () {
                a.isDefaultPrevented() || (n.toggleClass(e.disabledClass, b <= 0), o.toggleClass(e.disabledClass, b >= f.getSize() - 1))
            }, 1)
        }), e.initialIndex || n.addClass(e.disabledClass)), f.getSize() < 2 && n.add(o).addClass(e.disabledClass), e.mousewheel && a.fn.mousewheel && b.mousewheel(function (a, b) {
            if (e.mousewheel) {
                f.move(b < 0 ? 1 : -1, e.wheelSpeed || 50);
                return !1
            }
        });

        if (e.touch && h[0]) {
        	// j$ disable vertical scroll 9/23/2013
            var p = {}; 
            h[0].ontouchstart = function (a) {
                var b = a.touches[0]; 
                p.x = b.clientX, p.y = b.clientY
            }, h[0].ontouchmove = function (a) {
                if (a.touches.length == 1 && !h.is(":animated")) {
                    var b = a.touches[0],
                        c = p.x - b.clientX,
                        d = p.y - b.clientY,
                        vX = Math.abs(c),
                        vY = Math.abs(d);
                    if( j && vY > vX || !j && vX > vY) {
                   		f[j && d > 0 || !j && c > 0 ? "next" : "prev"](), a.preventDefault()
                	}
                }
            }
        }
        
        e.keyboard && a(document).on("keydown.scrollable", function (b) {
            if (!(!e.keyboard || b.altKey || b.ctrlKey || b.metaKey || a(b.target).is(":input"))) {
                if (e.keyboard != "static" && d != f) return;
                var c = b.keyCode;
                if (j && (c == 38 || c == 40)) {
                    f.move(c == 38 ? -1 : 1);
                    return b.preventDefault()
                }
                if (!j && (c == 37 || c == 39)) {
                    f.move(c == 37 ? -1 : 1);
                    return b.preventDefault()
                }
            }
        }), e.initialIndex && f.seekTo(e.initialIndex, 0, function () {})
    }
    a.fn.scrollable = function (b) {
        var c = this.data("scrollable");
        if (c) return c;
        b = a.extend({}, a.tools.scrollable.conf, b), this.each(function () {
            c = new e(a(this), b), a(this).data("scrollable", c)
        });
        return b.api ? c : this
    }
})(jQuery);
(function (a) {
    var b = a.tools.scrollable;
    b.autoscroll = {
        conf: {
            autoplay: !0,
            interval: 3e3,
            autopause: !0
        }
    }, a.fn.autoscroll = function (c) {
        typeof c == "number" && (c = {
            interval: c
        });
        var d = a.extend({}, b.autoscroll.conf, c),
            e;
        this.each(function () {
            var b = a(this).data("scrollable"),
                c = b.getRoot(),
                f, g = !1;

            function h() {
                f && clearTimeout(f), f = setTimeout(function () {
                    b.next()
                }, d.interval)
            }
            b && (e = b), b.play = function () {
                f || (g = !1, c.on("onSeek", h), h())
            }, b.pause = function () {
                f = clearTimeout(f), c.off("onSeek", h)
            }, b.resume = function () {
                g || b.play()
            }, b.stop = function () {
                g = !0, b.pause()
            }, d.autopause && c.add(b.getNaviButtons()).hover(b.pause, b.resume), d.autoplay && b.play()
        });
        return d.api ? e : this
    }
})(jQuery);
(function (a) {
    var b = a.tools.scrollable;
    b.navigator = {
        conf: {
            navi: ".navi",
            naviItem: null,
            activeClass: "active",
            indexed: !1,
            idPrefix: null,
            history: !1
        }
    };

    function c(b, c) {
        var d = a(c);
        return d.length < 2 ? d : b.parent().find(c)
    }
    a.fn.navigator = function (d) {
        typeof d == "string" && (d = {
            navi: d
        }), d = a.extend({}, b.navigator.conf, d);
        var e;
        this.each(function () {
            var b = a(this).data("scrollable"),
                f = d.navi.jquery ? d.navi : c(b.getRoot(), d.navi),
                g = b.getNaviButtons(),
                h = d.activeClass,
                i = d.history && history.pushState,
                j = b.getConf().size;
            b && (e = b), b.getNaviButtons = function () {
                return g.add(f)
            }, i && (history.pushState({
                i: 0
            }, ""), a(window).on("popstate", function (a) {
                var c = a.originalEvent.state;
                c && b.seekTo(c.i)
            }));

            function k(a, c, d) {
                b.seekTo(c), d.preventDefault(), i && history.pushState({
                    i: c
                }, "")
            }

            function l() {
                return f.find(d.naviItem || "> *")
            }

            function m(b) {
                var c = a("<" + (d.naviItem || "a") + "/>").click(function (c) {
                    k(a(this), b, c)
                });
                b === 0 && c.addClass(h), d.indexed && c.text(b + 1), d.idPrefix && c.attr("id", d.idPrefix + b);
                return c.appendTo(f)
            }
            l().length ? l().each(function (b) {
                a(this).click(function (c) {
                    k(a(this), b, c)
                })
            }) : a.each(b.getItems(), function (a) {
                a % j == 0 && m(a)
            }), b.onBeforeSeek(function (a, b) {
                setTimeout(function () {
                    if (!a.isDefaultPrevented()) {
                        var c = b / j,
                            d = l().eq(c);
                        d.length && l().removeClass(h).eq(c).addClass(h)
                    }
                }, 1)
            }), b.onAddItem(function (a, c) {
                var d = b.getItems().index(c);
                d % j == 0 && m(d)
            })
        });
        return d.api ? e : this
    }
})(jQuery);
(function (a) {
    a.tools = a.tools || {
        version: "v1.2.7"
    }, a.tools.tabs = {
        conf: {
            tabs: "a",
            current: "current",
            onBeforeClick: null,
            onClick: null,
            effect: "default",
            initialEffect: !1,
            initialIndex: 0,
            event: "click",
            rotate: !1,
            slideUpSpeed: 400,
            slideDownSpeed: 400,
            history: !1
        },
        addEffect: function (a, c) {
            b[a] = c
        }
    };
    var b = {
        "default": function (a, b) {
            this.getPanes().hide().eq(a).show(), b.call()
        },
        fade: function (a, b) {
            var c = this.getConf(),
                d = c.fadeOutSpeed,
                e = this.getPanes();
            d ? e.fadeOut(d) : e.hide(), e.eq(a).fadeIn(c.fadeInSpeed, b)
        },
        slide: function (a, b) {
            var c = this.getConf();
            this.getPanes().slideUp(c.slideUpSpeed), this.getPanes().eq(a).slideDown(c.slideDownSpeed, b)
        },
        ajax: function (a, b) {
            this.getPanes().eq(0).load(this.getTabs().eq(a).attr("href"), b)
        }
    }, c, d;
    a.tools.tabs.addEffect("horizontal", function (b, e) {
        if (!c) {
            var f = this.getPanes().eq(b),
                g = this.getCurrentPane();
            d || (d = this.getPanes().eq(0).width()), c = !0, f.show(), g.animate({
                width: 0
            }, {
                step: function (a) {
                    f.css("width", d - a)
                },
                complete: function () {
                    a(this).hide(), e.call(), c = !1
                }
            }), g.length || (e.call(), c = !1)
        }
    });

    function e(c, d, e) {
        var f = this,
            g = c.add(this),
            h = c.find(e.tabs),
            i = d.jquery ? d : c.children(d),
            j;
        h.length || (h = c.children()), i.length || (i = c.parent().find(d)), i.length || (i = a(d)), a.extend(this, {
            click: function (d, i) {
                var k = h.eq(d),
                    l = !c.data("tabs");
                typeof d == "string" && d.replace("#", "") && (k = h.filter("[href*=\"" + d.replace("#", "") + "\"]"), d = Math.max(h.index(k), 0));
                if (e.rotate) {
                    var m = h.length - 1;
                    if (d < 0) return f.click(m, i);
                    if (d > m) return f.click(0, i)
                }
                if (!k.length) {
                    if (j >= 0) return f;
                    d = e.initialIndex, k = h.eq(d)
                }
                if (d === j) return f;
                i = i || a.Event(), i.type = "onBeforeClick", g.trigger(i, [d]);
                if (!i.isDefaultPrevented()) {
                    var n = l ? e.initialEffect && e.effect || "default" : e.effect;
                    b[n].call(f, d, function () {
                        j = d, i.type = "onClick", g.trigger(i, [d])
                    }), h.removeClass(e.current), k.addClass(e.current);
                    return f
                }
            },
            getConf: function () {
                return e
            },
            getTabs: function () {
                return h
            },
            getPanes: function () {
                return i
            },
            getCurrentPane: function () {
                return i.eq(j)
            },
            getCurrentTab: function () {
                return h.eq(j)
            },
            getIndex: function () {
                return j
            },
            next: function () {
                return f.click(j + 1)
            },
            prev: function () {
                return f.click(j - 1)
            },
            destroy: function () {
                h.off(e.event).removeClass(e.current), i.find("a[href^=\"#\"]").off("click.T");
                return f
            }
        }), a.each("onBeforeClick,onClick".split(","), function (b, c) {
            a.isFunction(e[c]) && a(f).on(c, e[c]), f[c] = function (b) {
                b && a(f).on(c, b);
                return f
            }
        }), e.history && a.fn.history && (a.tools.history.init(h), e.event = "history"), h.each(function (b) {
            a(this).on(e.event, function (a) {
                f.click(b, a);
                return a.preventDefault()
            })
        }), i.find("a[href^=\"#\"]").on("click.T", function (b) {
            f.click(a(this).attr("href"), b)
        }), location.hash && e.tabs == "a" && c.find("[href=\"" + location.hash + "\"]").length ? f.click(location.hash) : (e.initialIndex === 0 || e.initialIndex > 0) && f.click(e.initialIndex)
    }
    a.fn.tabs = function (b, c) {
        var d = this.data("tabs");
        d && (d.destroy(), this.removeData("tabs")), a.isFunction(c) && (c = {
            onBeforeClick: c
        }), c = a.extend({}, a.tools.tabs.conf, c), this.each(function () {
            d = new e(a(this), b, c), a(this).data("tabs", d)
        });
        return c.api ? d : this
    }
})(jQuery);
(function (a) {
    var b, c, d, e;
    a.tools = a.tools || {
        version: "v1.2.7"
    }, a.tools.history = {
        init: function (g) {
            e || (a.browser.msie && a.browser.version < "8" ? c || (c = a("<iframe/>").attr("src", "javascript:false;").hide().get(0), a("body").append(c), setInterval(function () {
                var d = c.contentWindow.document,
                    e = d.location.hash;
                b !== e && a(window).trigger("hash", e)
            }, 100), f(location.hash || "#")) : setInterval(function () {
                var c = location.hash;
                c !== b && a(window).trigger("hash", c)
            }, 100), d = d ? d.add(g) : g, g.click(function (b) {
                var d = a(this).attr("href");
                c && f(d);
                if (d.slice(0, 1) != "#") {
                    location.href = "#" + d;
                    return b.preventDefault()
                }
            }), e = !0)
        }
    };

    function f(a) {
        if (a) {
            var b = c.contentWindow.document;
            b.open().close(), b.location.hash = a
        }
    }
    a(window).on("hash", function (c, e) {
        e ? d.filter(function () {
            var b = a(this).attr("href");
            return b == e || b == e.replace("#", "")
        }).trigger("history", [e]) : d.eq(0).trigger("history", [e]), b = e
    }), a.fn.history = function (b) {
        a.tools.history.init(this);
        return this.on("history", b)
    }
})(jQuery);