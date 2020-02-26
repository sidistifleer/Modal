"use strict";

function _typeof2(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof2(obj); }

/**
 * @module Modal
 * @author Sidi Sid'ahmed <sidiwlsidahmed@gmail.com>   
 * Released under the MIT License.
 * Attaches a Modal to an element.
 * UMD standard code
 */
(function (global, factory) {
    (typeof exports === "undefined" ? "undefined" : _typeof2(exports)) === 'object' && typeof module !== 'undefined' ? module.exports = factory() : typeof define === 'function' && define.amd ? define(factory) : global.Modal = factory();
})(void 0, function () {
    'use strict'; // Object Modal to return

    var autoincrement = 0;
    var Modal = {
        create: function create(params) {
            if (params.type === 'alert') return _error('use alert as function in Modal.alert');
            if (params.type === 'toast') return _error('use toast as function in Modal.toast');
            if (params.type === 'notify') return _error('use notify as type in Modal.toast function');
            if (params.type === undefined || params.type === null) params.type = 'dialog';
            return _setOptions(params);
        },
        toast: function toast(params) {
            if (params.type === 'dialog') return _error('use dialog as type in Modal.create function');
            if (params.type === 'confirm') return _error('use confirm as type in Modal.create function');
            if (params.type === undefined || params.type === null) params.type = 'toast';
            return _setOptions(params);
        },
        alert: function alert(params) {
            if (params.type === 'dialog') return _error('use dialog as type in Modal.create function');
            if (params.type === 'confirm') return _error('use confirm as type in Modal.create function');
            if (params.type === 'toast') return _error('use toast as function in Modal.toast');
            if (params.type === 'notify') return _error('use notify as type in Modal.toast function');
            if (params.type === undefined || params.type === null) params.type = 'alert';
            return _setOptions(params);
        },
        version: '1.2.0'
    };

    var _typeof3 = function _typeof(obj) {
        if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
            _typeof3 = function _typeof(obj) {
                return _typeof2(obj);
            };
        } else {
            _typeof3 = function _typeof(obj) {
                return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
            };
        }

        return _typeof3(obj);
    },
        _error = function _error() {
            var err = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
            return console.error(err || 'Oops! Something went wrong');
        },
        _innerText = function _innerText(el, _txt) {
            return el.innerText = _txt;
        },
        _innerHTML = function _innerHTML(el, _html) {
            return el.innerHTML = _html;
        },
        _append = function _append(el, h) {
            return el.appendChild(h);
        },
        _class = function _class(el, v) {
            if (!v) return false;

            for (var i in v) {
                el.classList.add(v[i]);
            }

            return el;
        },
        _$ = function _$(e) {
            return document.querySelector(e);
        },
        __$ = function __$(e) {
            return document.querySelectorAll(e);
        },
        _attr = function _attr(el, n, v) {
            if (!v) return el.getAttribute(n);
            return el.setAttribute(n, v);
        },
        _inarray = function _inarray(a, v) {
            var count = a.length;

            for (var i = 0; i < count; i++) {
                if (a[i] === v) {
                    return true;
                }
            }

            return false;
        },
        _find = function _find(elem, className) {
            if (!className) {
                return false;
            }

            if (!elem.querySelectorAll(className)) {
                return false;
            }

            return elem.querySelectorAll(className).length;
        },
        _addElement = function _addElement(el) {
            var cl = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
            var at = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

            if (_typeof3(el) !== 'string') {
                _error('Class must be string ');
            }

            el = document.createElement(el);

            if (cl !== null) {
                if (_typeof3(cl) !== 'object') {
                    _error('Class must be string ');
                }

                for (var i = 0; i < cl.length; i++) {
                    el.classList.add(cl[i]);
                }
            }

            if (at !== null) {
                if (_typeof3(cl) !== 'object') {
                    _error('Attribute must be array ');
                }

                for (var a in at) {
                    el.setAttribute(a, at[a]);
                }
            }

            return el;
        },
        _title = function _title(t) {
            if (t) if (_typeof3(t) === 'string') return t;
            return false;
        },
        _type = function _type(t) {
            var _t = ['dialog', 'confirm', 'toast', 'alert', 'notify'];
            if (!t) t = _t[0];
            if (_inarray(_t, t) === false) return _error('Oops! type must be equal ' + _t);
            return t;
        },
        _icon = function _icon(i) {
            var _i = [false, 'success', 'error', 'question', 'warning', 'info'];
            if (i) if (_inarray(_i, i) === false) return _error('Oops! icon must be equal ' + _i);
            return i;
        },
        _evt = function _evt(e) {
            var _evt = ['default', 'dark', 'success', 'error', 'question', 'warning', 'info'];
            if (e) if (_inarray(_evt, e) === false) return _error('Oops! type must be equal ' + _evt);
            return e;
        },
        _message = function _message(m) {
            if (m) if (_typeof3(m) === 'string') return m;
            return m;
        },
        _html = function _html(h) {
            if (!h) h = undefined;
            return h;
        },
        _position = function _position(p) {
            var _p = ['center', 'center-top', 'center-bottom', 'bottom-right', 'bottom-left', 'top-left', 'top-right'];
            if (p) if (_inarray(_p, p) === false) return _error('Oops! position must be equal' + _p);
            return p;
        },
        _animate = function _animate(a) {
            var _a = ['popup', 'scaleIn', 'bounce', 'pluse', 'fadeIn', 'rollIn', 'ripple', 'slideIn', 'slide'];
            if (!a) a = _a[0];
            if (_inarray(_a, a) === false) return _error('Oops! animate must be equal ' + _a);
            return a;
        },
        _delay = function _delay(d) {
            var _d = ['number', 'boolean'];
            if (_inarray(_d, _typeof3(d)) === false) return _error('Oops! delay must be equal ' + _d);
            return d;
        },
        _backdrop = function _backdrop(b) {
            var _b = [true, false];
            if (_inarray(_b, b) === false) return _error('Oops! backdrop must be equal boolean value' + _b);
            return b;
        },
        _screenWidth = function _screenWidth() {
            return window.innerHeight;
        },
        _initLenght = function _initLenght(s, c) {
            var ov = c.offsetHeight;
            var children = c.children;
            var rs = s - ov;

            for (var i = 0; i < children.length; i++) {
                var to = children[i].offsetHeight + 20;
                if (rs < to) return false;
            }

            return true;
        },
        _header = function _header(t, c, i) {
            var el = 'div';
            if (t === 'toast' || t === 'notify') el = 'span';

            var h = _addElement(el, [t + '-header'], {
                label: 'header'
            });

            if (t === 'confirm' || t === 'dialog') if (c === false) return h;

            var txt = _addElement('h5', [t + '-title', 'txt'], {
                label: 'title'
            });

            if (t === 'toast' || t === 'notify' || t === 'alert') if (c === false) return txt;

            _innerText(txt, c);

            if (i) _innerHTML(h, i);

            _append(h, txt);

            if (t === 'toast' || t === 'notify' || t === 'alert') return txt;
            return h;
        },
        _body = function _body(t) {
            var c = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
                m: null,
                h: null
            };
            var el = 'div';
            if (t === 'toast' || t === 'notify') el = 'span';

            var b = _addElement(el, [t + '-body', 'txt'], {
                label: 'body'
            });

            if (c.m === false) return b;
            if (!c.m && !c.h) c.m = 'Hello Words';

            if (!c.m) {
                if (!c.h) {
                    _error('You must be declare messeage or html elements');
                } else {
                    _innerHTML(b, c.h);
                }
            }

            var p = _addElement('p', ['paragth', 'txt'], {
                label: 'paragth'
            });

            _innerText(p, c.m);

            if (t === 'alert') return p;

            _append(b, p);

            return b;
        },
        _footer = function _footer(t, h, d) {
            var btn = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {
                cancel: null,
                confirm: null
            };
            var el = 'div';
            if (t === 'toast' || t === 'notify') el = 'span';

            var f = _addElement(el, [t + '-footer'], {
                label: 'footer'
            });

            var clases = ['btn', 'btn-default', 'btn-modal'];
            var attr = {
                id: null,
                type: 'button',
                'aria-hidden': true,
                label: 'btn',
                aria: 'btn-default'
            };
            attr['id'] = 'modal-c';
            attr['aria'] = 'btn-dark';
            clases[1] = 'btn-dark';

            var c = _addElement('button', clases, attr);

            if (btn.cancel === false) c.style.display = 'none';

            _innerText(c, btn.cancel === undefined || null ? 'Close' : btn.cancel);

            _append(f, c);

            if (btn.confirm !== false) {
                attr['id'] = 'modal-f';
                attr['aria'] = 'btn-success';
                clases[1] = 'btn-success';

                var o = _addElement('button', clases, attr);

                o.addEventListener('click', function (e) {
                    return _callback(h, o, t);
                });

                _innerText(o, btn.confirm === undefined || null ? 'Save changes' : btn.confirm);

                _append(f, o);
            }

            if (d && d !== false) window.setTimeout(function () {
                if (c) var d = c;
                if (o) var d = o;
                return _close(d, t);
            }, d);
            return f;
        },
        _int = function _int(a) {
            var type = a.type;
            var title = a.title;
            var icon = a.icon;
            var w = a.width === undefined || null ? '32em' : a.width;
            var minw = a.minWidth;
            var maxw = a.maxWidth;
            var attr = {
                label: 'modal',
                visible: false,
                'aria-font': 'source',
                event: a.event === undefined || null ? 'default' : a.event
            };
            if (type === 'toast') var w = a.width === undefined || null ? '16em' : a.width;
            if (type === 'toast') attr['label'] = 'toast';
            if (type !== 'toast' || type !== 'notify') var w = a.width === undefined || null ? '32em' : a.width;
            if (type === 'notify') attr['label'] = 'notify';
            if (type === 'notify') var w = a.width === undefined || null ? 'fit-content' : a.width;
            if (type === 'alert') attr['label'] = 'alert';
            if (type === 'alert') var w = a.width === undefined || null ? 'fit-content' : a.width;

            var di = _addElement('div', [type], attr);

            di.style.width = w;
            di.style.minWidth = minw;
            di.style.maxWidth = maxw;

            if (icon && icon !== false) {
                var ico = _addElement('div', ['icon'], {
                    label: 'icon',
                    icon: a.icon
                }),
                    cols = _addElement('div', ['cols']),
                    tip = _addElement('div', ['tip']),
                    log = _addElement('div', ['log']);

                _append(cols, tip);

                _append(cols, log);

                _append(ico, cols);
            }

            var _int = [_header(type, title, icon), _body(type, {
                m: a.message,
                h: a.html
            }), _footer(type, a.then, a.delay, {
                cancel: a.cancel,
                confirm: a.confirm
            })];
            if (type) var oht = [].concat(_int);
            if (type === 'toast' && icon !== false) var oht = [ico].concat(_int);

            for (var i = 0; i < oht.length; i++) {
                _append(di, oht[i]);
            }

            return di;
        },
        _event = function _event(el, f, t, b) {
            if (!el) return _error('Oops! element not found');
            var c = el.querySelectorAll('[aria="btn-dark"]');
            if (c) c.forEach(function (el) {
                el.addEventListener('click', function (e) {
                    return _close(el, t);
                });
            });

            if (b === true) {
                if (t === 'toast' || t === 'notify') {
                    var o = el.children;

                    if (o) {
                        var _loop = function _loop(e) {
                            o[e].style.cursor = 'pointer';

                            var _c = o[e].querySelector('[aria="btn-dark"]');

                            o[e].addEventListener('click', function (e) {
                                if (e.target) return _close(_c, t);
                                return o[e];
                            });
                        };

                        for (var e = 0; e < o.length; e++) {
                            _loop(e);
                        }
                    }
                }

                if (t === 'confirm' || t === 'dialog') {
                    var o = el;

                    var _c = o.querySelector('[aria="btn-dark"]');

                    o.addEventListener('click', function (e) {
                        if (e.target == o) return _close(_c, t);
                        return o;
                    });
                }
            }
        },
        _Modal = function _Modal(s, el) {
            if (_find(document.body, '#' + el.id) > 0) return false;

            _append(document.body, el);

            setTimeout(function () {
                _attr(el, 'visible', true);

                var r = _int(s);

                _append(el, r);

                setTimeout(function () {
                    _attr(r, 'visible', true);

                    return _event(el, s.then, s.type, s.backdrop);
                }, 20);
            }, 20);
        },
        _Toast = function _Toast(s, el) {
            if (_find(document.body, '#' + el.id) === 0) _append(document.body, el);

            if (_find(document.body, '#' + el.id) === 1) {
                var _el = _$('#overlay');

                if (_initLenght(_screenWidth(), _el) === false) return false;
                setTimeout(function () {
                    _attr(_el, 'visible', true);

                    var r = _int(s);

                    _append(_el, r);

                    setTimeout(function () {
                        _attr(r, 'ids', ++autoincrement);

                        _attr(r, 'visible', true);

                        return _event(_el, s.then, s.type, s.backdrop);
                    }, 20);
                }, 20);
            }
        },
        _Alert = function _Alert(s, el) {
            if (_find(document.body, '#' + el.id) === 0) _append(document.body, el);

            if (_find(document.body, '#' + el.id) === 1) {
                var _el2 = _$('#overlay');

                setTimeout(function () {
                    _attr(_el2, 'visible', true);

                    var r = _int(s);

                    _append(_el2, r);

                    setTimeout(function () {
                        _attr(r, 'ids', ++autoincrement);

                        _attr(r, 'visible', true);

                        return _event(_el2, s.then, s.type, s.backdrop);
                    }, 20);
                }, 20);
            }
        },
        _return = function _return(a) {
            if (a.type !== 'alert') var p = {
                'placement': a.position
            };

            var el = _addElement('div', ['overlay'], {
                id: 'overlay',
                aria: a.type,
                animate: a.animate,
                ...p
            });

            if (a.type === 'toast' || a.type === 'notify') {
                return _Toast(a, el);
            }

            if (a.type === 'dialog' || a.type === 'confirm') {
                return _Modal(a, el);
            }

            if (a.type === 'alert') {
                var nl = a.el;
                if (a.el === undefined || a.el === null) var nl = el;
                return _Alert(a, nl);
            }

            return false;
        },
        _setOptions = function _setOptions(params) {
            var _cfg = {
                type: _type(params.type),
                title: _title(params.title === undefined || null ? false : params.title),
                message: _message(params.message),
                animate: _animate(params.animate),
                then: params.then,
                width: params.width,
                minWidth: params.minWidth,
                maxWidth: params.maxWidth,
                event: _evt(params.event)
            };

            if (params.type === 'toast') {
                var config = {
                    ..._cfg,
                    delay: _delay(params.delay === undefined || null ? false : params.delay),
                    position: _position(params.position === undefined || null ? 'bottom-right' : params.position),
                    icon: _icon(params.icon === undefined || null ? false : params.icon),
                    cancel: params.cancel === undefined || null ? false : params.cancel,
                    confirm: params.confirm === undefined || null ? false : params.confirm,
                    backdrop: _backdrop(params.backdrop === undefined || null ? true : params.backdrop)
                };
                return _return(config);
            }

            if (params.type === 'notify') {
                var _config = {
                    ..._cfg,
                    delay: _delay(params.delay === undefined || null ? false : params.delay),
                    position: _position(params.position === undefined || null ? 'bottom-right' : params.position),
                    cancel: params.cancel === undefined || null ? false : params.cancel,
                    confirm: params.confirm === undefined || null ? false : params.confirm,
                    backdrop: _backdrop(params.backdrop === undefined || null ? true : params.backdrop)
                };
                return _return(_config);
            }

            if (params.type === 'alert') {
                var _config2 = {
                    ..._cfg,
                    el: _$(params.el),
                    delay: _delay(params.delay),
                    cancel: params.cancel === undefined || null ? false : params.cancel,
                    confirm: params.confirm === undefined || null ? false : params.confirm
                };
                return _return(_config2);
            }

            if (params.type === 'dialog' || params.type === 'confirm' || params.type === undefined || params.type === null) {
                var _config3 = {
                    ..._cfg,
                    html: _html(params.html),
                    position: _position(params.position === undefined || null ? 'center-top' : params.position),
                    confirm: params.confirm,
                    cancel: params.cancel
                };
                return _return(_config3);
            }

            return false;
        },
        _close = function _close(that, t) {
            if (t === 'dialog' || t === 'confirm') {
                var el = that.parentNode.parentNode;

                _attr(el, 'visible', 'false');

                el.addEventListener('animationend', function (e) {
                    setTimeout(function () {
                        _attr(el.parentNode, 'visible', 'false');

                        el.parentNode.addEventListener('animationend', function (e) {
                            setTimeout(function () {
                                return el.parentNode.remove();
                            }, e.elapsedTime);
                        });
                    }, e.elapsedTime);
                });
            }

            if (t === 'toast' || t === 'notify') {
                var el = that.parentNode.parentNode;

                _attr(el, 'visible', 'false');

                el.addEventListener('animationend', function (e) {
                    if (el.parentNode.children.length === 1) return el.parentNode.remove();
                    setTimeout(function () {
                        return el.remove();
                    }, e.elapsedTime);
                });
            }
        },
        _callback = function _callback(f, e, t) {
            if (_typeof3(f) === 'function') return f.call(_close(e, t));
            return _close(e, t);
        };

    return Modal;
});