/**
 * @module Modal
 * @author Sidi Sid'ahmed <sidiwlsidahmed@gmail.com>   
 * Released under the MIT License.
 * Attaches a Modal to an element.
 * UMD standard code
 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
        typeof define === 'function' && define.amd ? define(factory) : (global.Modal = factory());
}(this, function () {
    'use strict';
    // Object Modal to return
    let autoincrement = 0

    var Modal = {
        create: function (params) {
            if (params.type === 'alert') return _error('use alert as function in Modal.alert')
            if (params.type === 'toast') return _error('use toast as function in Modal.toast')
            if (params.type === 'notify') return _error('use notify as type in Modal.toast function')
            if (params.type === undefined || params.type === null) params.type = 'dialog'
            return _setOptions(params)
        },
        toast: function (params) {
            if (params.type === 'dialog') return _error('use dialog as type in Modal.create function')
            if (params.type === 'confirm') return _error('use confirm as type in Modal.create function')
            if (params.type === undefined || params.type === null) params.type = 'toast'
            return _setOptions(params)
        },
        alert: function (params) {
            if (params.type === 'dialog') return _error('use dialog as type in Modal.create function')
            if (params.type === 'confirm') return _error('use confirm as type in Modal.create function')
            if (params.type === 'toast') return _error('use toast as function in Modal.toast')
            if (params.type === 'notify') return _error('use notify as type in Modal.toast function')
            if (params.type === undefined || params.type === null) params.type = 'alert'
            return _setOptions(params)
        },
        version: '1.2.0',
    };
    var d = document
    var w = window
    if (!d || !w) return _error('Oops! window object or document object hasnot not found')
    var _typeof = function (obj) {
        if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
            _typeof = function (obj) {
                return typeof obj;
            };
        } else {
            _typeof = function (obj) {
                return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            };
        }
        return _typeof(obj);
    }, _error = function (err = null) {
        return console.error(err || 'Oops! Something went wrong')
    }, _innerText = function (el, _txt) {
        return el.innerText = _txt
    }, _innerHTML = function (el, _html) {
        return el.innerHTML = _html
    }, _append = function (el, h) {
        return el.appendChild(h)
    }, _class = function (el, v) {
        if (!v) return false
        for (let i in v) {
            el.classList.add(v[i])
        }
        return el
    }, _$ = function (e) {
        return d.querySelector(e)
    }, __$ = function (e) {
        return d.querySelectorAll(e)
    }, _attr = function (el, n, v) {
        if (!v) return el.getAttribute(n)
        return el.setAttribute(n, v)
    }, _inarray = function (a, v) {
        var count = a.length
        for (var i = 0; i < count; i++) {
            if (a[i] === v) { return true }
        }
        return false
    }, _find = function (elem, className) {
        if (!className) {
            return false;
        }
        if (!elem.querySelectorAll(className)) {
            return false;
        }
        return elem.querySelectorAll(className).length
    }, _addElement = function (el, cl = null, at = null) {
        if (_typeof(el) !== 'string') { _error('Class must be string ') }
        el = d.createElement(el);
        if (cl !== null) {
            if (_typeof(cl) !== 'object') { _error('Class must be string ') }
            for (let i = 0; i < cl.length; i++) {
                el.classList.add(cl[i])
            }
        }
        if (at !== null) {
            if (_typeof(cl) !== 'object') { _error('Attribute must be array ') }
            for (let a in at) {
                el.setAttribute(a, at[a])
            }
        }

        return el;
    }, _title = function (t) {
        if (t) if (_typeof(t) === 'string') return t
        return false
    }, _type = function (t) {
        var _t = ['dialog', 'confirm', 'toast', 'alert', 'notify']
        if (!t) t = _t[0]
        if (_inarray(_t, t) === false) return _error('Oops! type must be equal ' + _t)
        return t
    }, _icon = function (i) {
        var _i = [false, 'success', 'error', 'question', 'warning', 'info']
        if (i) if (_inarray(_i, i) === false) return _error('Oops! icon must be equal ' + _i)
        return i
    }, _evt = function (e) {
        var _evt = ['default', 'dark', 'success', 'error', 'question', 'warning', 'info']
        if (e) if (_inarray(_evt, e) === false) return _error('Oops! type must be equal ' + _evt)
        return e
    }, _message = function (m) {
        if (m) if (_typeof(m) === 'string') return m
        return m
    }, _html = function (h) {
        if (!h) h = undefined
        return h
    }, _position = function (p) {
        var _p = ['center', 'center-top', 'center-bottom', 'bottom-right', 'bottom-left', 'top-left', 'top-right']
        if (p) if (_inarray(_p, p) === false) return _error('Oops! position must be equal' + _p)
        return p
    }, _animate = function (a) {
        var _a = ['popup', 'scaleIn', 'bounce', 'pluse', 'fadeIn', 'rollIn', 'ripple', 'slideIn', 'slide']
        if (!a) a = _a[0]
        if (_inarray(_a, a) === false) return _error('Oops! animate must be equal ' + _a)
        return a
    }, _delay = function (d) {
        var _d = ['number', 'boolean']
        if (_inarray(_d, _typeof(d)) === false) return _error('Oops! delay must be equal ' + _d)
        return d
    }, _backdrop = function (b) {
        var _b = [true, false]
        if (_inarray(_b, b) === false) return _error('Oops! backdrop must be equal boolean value' + _b)
        return b
    }, _screenWidth = function () {
        return w.innerHeight
    }, _initLenght = function (s, c) {
        var ov = c.offsetHeight
        var children = c.children
        var rs = s - ov
        for (let i = 0; i < children.length; i++) {
            var to = children[i].offsetHeight + 20
            if (rs < to) return false
        }
        return true
    }, _header = function (t, c, i) {
        var el = 'div'
        if (t === 'toast' || t === 'notify') el = 'span'
        var h = _addElement(el, [t + '-header'], { label: 'header' })
        if (t === 'confirm' || t === 'dialog') if (c === false) return h
        var txt = _addElement('h5', [t + '-title', 'txt'], { label: 'title' })
        if (t === 'toast' || t === 'notify' || t === 'alert') if (c === false) return txt
        _innerText(txt, c)
        if (i) _innerHTML(h, i)
        _append(h, txt)
        if (t === 'toast' || t === 'notify' || t === 'alert') return txt
        return h
    }, _body = function (t, c = { m: null, h: null }) {
        var el = 'div'
        if (t === 'toast' || t === 'notify') el = 'span'
        var b = _addElement(el, [t + '-body', 'txt'], { label: 'body' })
        if (c.m === false) return b
        if (!c.m && !c.h) c.m = 'Hello Words'
        if (!c.m) {
            if (!c.h) {
                _error('You must be declare messeage or html elements');
            } else {
                if (_typeof(c.h) === 'string') _innerHTML(b, c.h)
                if (_typeof(c.h) === 'object') _append(b, c.h)
            }
        }
        var p = _addElement('p', ['paragth', 'txt'], { label: 'paragth' })
        _innerHTML(p, c.m)
        if (t === 'alert') return p
        _append(b, p)
        return b
    }, _footer = function (t, h, d, btn = { cancel: null, confirm: null }) {
        var el = 'div'
        if (t === 'toast' || t === 'notify') el = 'span'
        var f = _addElement(el, [t + '-footer'], { label: 'footer' })
        var clases = ['btn', 'btn-default', 'btn-modal']
        var attr = {
            id: null,
            type: 'button',
            'aria-hidden': true,
            label: 'btn',
            aria: 'btn-default',
        }
        attr['id'] = 'modal-c'
        attr['aria'] = 'btn-dark'
        clases[1] = 'btn-dark'
        var c = _addElement('button', clases, attr)
        if (btn.cancel === false) c.style.display = 'none'
        _innerText(c, btn.cancel === undefined || null ? 'Close' : btn.cancel)
        _append(f, c)
        if (btn.confirm !== false) {
            attr['id'] = 'modal-f'
            attr['aria'] = 'btn-success'
            clases[1] = 'btn-success'
            var o = _addElement('button', clases, attr)
            o.addEventListener('click', function (e) {
                return _callback(h, o, t)
            })
            _innerText(o, btn.confirm === undefined || null ? 'Save changes' : btn.confirm)
            _append(f, o)
        }
        if (d && d !== false) w.setTimeout(function () {
            if (c) var d = c
            if (o) var d = o
            return _close(d, t)
        }, d)
        return f
    }, _int = function (a) {
        var type = a.type
        var title = a.title
        var icon = a.icon
        var w = a.width === undefined || null ? '32em' : a.width
        var minw = a.minWidth
        var maxw = a.maxWidth
        var attr = {
            label: 'modal',
            visible: false,
            'aria-font': 'source',
            event: a.event === undefined || null ? 'default' : a.event
        }
        if (type === 'toast') var w = a.width === undefined || null ? '16em' : a.width
        if (type === 'toast') attr['label'] = 'toast'
        if (type !== 'toast' || type !== 'notify') var w = a.width === undefined || null ? '32em' : a.width
        if (type === 'notify') attr['label'] = 'notify'
        if (type === 'notify') var w = a.width === undefined || null ? 'fit-content' : a.width
        if (type === 'alert') attr['label'] = 'alert'
        if (type === 'alert') var w = a.width === undefined || null ? 'fit-content' : a.width
        var di = _addElement('div', [type], attr)
        di.style.width = w;
        di.style.minWidth = minw;
        di.style.maxWidth = maxw;
        if (icon && icon !== false) {
            var ico = _addElement('div', ['icon'], { label: 'icon', icon: a.icon }),
                cols = _addElement('div', ['cols']),
                tip = _addElement('div', ['tip']),
                log = _addElement('div', ['log']);
            _append(cols, tip)
            _append(cols, log)
            _append(ico, cols)
        }
        var _int = [
            _header(type, title, icon),
            _body(type, { m: a.message, h: a.html }),
            _footer(type, a.then, a.delay, { cancel: a.cancel, confirm: a.confirm })
        ]
        if (type) var oht = [..._int]
        if (type === 'toast' && icon !== false) var oht = [ico, ..._int]

        for (let i = 0; i < oht.length; i++) { _append(di, oht[i]) }

        return di
    }, _event = function (el, f, t, b) {
        if (!el) return _error('Oops! element not found')
        var c = el.querySelectorAll('[aria="btn-dark"]')
        if (c) c.forEach(el => {
            el.addEventListener('click', function (e) {
                return _close(el, t)
            })
        });
        if (t === 'dialog' || t === 'confirm') {
            w.addEventListener('keyup', function (e) {
                if (e.key === 'Escape' || e.code === 'Escape' || e.keyCode == 27) {
                    var c = el.querySelectorAll('[aria="btn-dark"]')
                    if (c) c.forEach(le => {
                        return _close(le, t)
                    });
                }
                if (e.key === 'Enter' || e.code === 'Enter' || e.keyCode == 13) {
                    var o = el.querySelector('[aria="btn-success"]')
                    return _callback(f, o, t)
                }
                return e.preventDefault
            });
        }
        if (b === true) {
            if (t === 'toast' || t === 'notify') {
                var o = el.children
                if (o) for (let e = 0; e < o.length; e++) {
                    o[e].style.cursor = 'pointer'
                    var _c = o[e].querySelector('[aria="btn-dark"]')
                    o[e].addEventListener('click', function (e) {
                        if (e.target) return _close(el, t)
                        return o[e]
                    })
                }
            }
            if (t === 'confirm' || t === 'dialog') {
                var o = el
                var _c = o.querySelector('[aria="btn-dark"]')
                o.addEventListener('click', function (e) {
                    if (e.target == o) return _close(_c, t)
                    return o
                })
            }
        }
    }, _removeModal = function (s, el) {
        var ol = _$('[label="overlay"]')
        if (_find(d.body, '#' + el.id) > 1) {
            return _close(ol.querySelector('[aria="btn-dark"]'), s.type)
        }
        return false
    }, _Modal = function (s, el) {
        setTimeout(function () {
            _removeModal(s, el)
        }, 20)
        _append(d.body, el)
        setTimeout(function () {
            _attr(el, 'visible', true)
            var r = _int(s)
            _append(el, r)
            setTimeout(function () {
                _attr(r, 'visible', true)
                return _event(el, s.then, s.type, s.backdrop)
            }, 20)
        }, 20)
    }, _Toast = function (s, el) {
        setTimeout(function () {
            _removeModal(s, el)
        }, 20)
        console.log(_find(d.body, '#' + el.id));
        if (_find(d.body, '#' + el.id) < 0) _append(d.body, el)
        if (_find(d.body, '#' + el.id) === 1) {
            var el = _$('[label="overlay"]')
            if (_initLenght(_screenWidth(), el) === false) return false
            setTimeout(function () {
                _attr(el, 'visible', true)
                var r = _int(s)
                _append(el, r)
                setTimeout(function () {
                    _attr(r, 'ids', ++autoincrement)
                    _attr(r, 'visible', true)
                    return _event(el, s.then, s.type, s.backdrop)
                }, 20)
            }, 20)
        }

    }, _Alert = function (s, el, arg) {
        if (el) _attr(el, 'id', 'overlay')
        for (const a in arg) {
            _attr(el, a, arg[a])
        }
        if (_find(d.body, '#' + el.id) === 0) _append(d.body, el)
        if (_find(d.body, '#' + el.id) === 1) {
            // if(el.children.className !== 'alert') return false
            var el = _$('#overlay')
            setTimeout(function () {
                _attr(el, 'visible', true)
                var r = _int(s)
                _append(el, r)
                setTimeout(function () {
                    _attr(r, 'ids', ++autoincrement)
                    _attr(r, 'visible', true)
                    return _event(el, s.then, s.type, s.backdrop)
                }, 20)
            }, 20)
        }
    }, _return = function (a) {
        if (a.type !== 'alert') var p = { 'placement': a.position }
        var arg = { id: 'overlay', aria: a.type, animate: a.animate, label: 'overlay', ...p }
        var el = _addElement('div', ['overlay'], arg)
        if (a.type === 'toast' || a.type === 'notify') {
            return _Toast(a, el)
        }
        if (a.type === 'dialog' || a.type === 'confirm') {
            return _Modal(a, el)
        }
        if (a.type === 'alert') {
            var nl = a.el
            if (a.el === undefined || a.el === null) var nl = el
            return _Alert(a, nl, arg)
        }
        return false
    }, _setOptions = function (params) {
        var _cfg = {
            type: _type(params.type),
            title: _title(params.title === undefined || null ? false : params.title),
            message: _message(params.message),
            animate: _animate(params.animate),
            then: params.then,
            width: params.width,
            minWidth: params.minWidth,
            maxWidth: params.maxWidth,
            event: _evt(params.event),
        }
        if (params.type === 'toast') {
            const config = {
                ..._cfg,
                delay: _delay(params.delay === undefined || null ? false : params.delay),
                position: _position(params.position === undefined || null ? 'bottom-right' : params.position),
                icon: _icon(params.icon === undefined || null ? false : params.icon),
                cancel: params.cancel === undefined || null ? false : params.cancel,
                confirm: params.confirm === undefined || null ? false : params.confirm,
                backdrop: _backdrop(params.backdrop === undefined || null ? true : params.backdrop),
            }
            return _return(config)
        }
        if (params.type === 'notify') {
            const config = {
                ..._cfg,
                delay: _delay(params.delay === undefined || null ? false : params.delay),
                position: _position(params.position === undefined || null ? 'bottom-right' : params.position),
                cancel: params.cancel === undefined || null ? false : params.cancel,
                confirm: params.confirm === undefined || null ? false : params.confirm,
                backdrop: _backdrop(params.backdrop === undefined || null ? true : params.backdrop),
            }
            return _return(config)
        }
        if (params.type === 'alert') {
            const config = {
                ..._cfg,
                el: _$(params.el),
                delay: _delay(params.delay === undefined || null ? false : params.delay),
                cancel: params.cancel === undefined || null ? false : params.cancel,
                confirm: params.confirm === undefined || null ? false : params.confirm,
            }
            return _return(config)
        }
        if (params.type === 'dialog' || params.type === 'confirm' || params.type === undefined || params.type === null) {
            const config = {
                ..._cfg,
                html: _html(params.html),
                position: _position(params.position === undefined || null ? 'center-top' : params.position),
                confirm: params.confirm,
                cancel: params.cancel,
            }
            return _return(config)
        }
        return false
    }, _close = function (that, t) {
        if (t === 'dialog' || t === 'confirm') {
            var el = that.parentNode.parentNode;
            _attr(el, 'visible', 'false')
            el.addEventListener('animationend', function (e) {
                setTimeout(function () {
                    _attr(el.parentNode, 'visible', 'false')
                    el.parentNode.addEventListener('animationend', function (e) {
                        setTimeout(function () {
                            return el.parentNode.remove()
                        }, e.elapsedTime);
                    })
                }, e.elapsedTime)
            })
        }
        if (t === 'toast' || t === 'notify' || t === 'alert') {
            var el = that.parentNode.parentNode;
            _attr(el, 'visible', 'false')
            el.addEventListener('animationend', function (e) {
                if (el.parentNode.children.length === 1) return el.parentNode.remove()
                setTimeout(function () {
                    return el.remove()
                }, e.elapsedTime);
            })
        }

    }, _callback = function (f, e, t) {
        if (_typeof(f) === 'function') return f.call(_close(e, t))
        return _close(e, t)
    };

    return Modal

}));