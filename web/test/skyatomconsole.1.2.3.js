/*
 * skyatom桌面后台js
 */


var DeskTaskBar = function (sa) {
    var _task = this;

    var _startmenupanel = null;//开始菜单
    _startmenupanel = document.createElement('div');
    _startmenupanel.className = 'taskbar_startmenu';
    _startmenupanel.setAttribute('id', SA.uuid());

    var _configpanel = null;//自定义的菜单
    _configpanel = document.createElement('div');
    _configpanel.className = 'startmenuconfigpanel';
    //添加自定义项目
    _task.addConfigItem = function (id, title, func, icon) {
        var item = document.createElement('div');
        item.setAttribute('dataid', id);
        item.setAttribute('id', SA.uuid());
        item.className = 'startmenuitem';
        if (icon != null) {
            item.style.backgroundImage = "url(" + icon + ")";
        }
        var txt = document.createTextNode(title);
        item.appendChild(txt);
        item.addEventListener('click', function () {
            if (func) {
                func();
            }
            _task.hiddenMenu();
        }, false);
        _configpanel.appendChild(item);
    };

    var _syspanel = null;//系统定义的菜单
    _syspanel = document.createElement('div');
    _syspanel.className = 'startmenusyspanel';

    //添加自定义项目
    _task.addSysItem = function (id, title, func, icon) {
        var item = document.createElement('div');
        item.setAttribute('dataid', id);
        item.setAttribute('id', SA.uuid());
        item.className = 'startmenuitem';
        if (icon != null) {
            item.style.backgroundImage = "url(" + icon + ")";
        }
        var txt = document.createTextNode(title);
        item.appendChild(txt);
        item.addEventListener('click', function () {
            if (func) {
                func();
            }
            _task.hiddenMenu();
        }, false);
        _syspanel.appendChild(item);
    };

    _startmenupanel.appendChild(_configpanel);
    _startmenupanel.appendChild(_syspanel);
    document.body.appendChild(_startmenupanel);

    var mask = document.createElement('div');
    mask.style.width = '100%';
    mask.style.height = '100%';
    mask.style.left = "0px";
    mask.style.top = '0px';
    mask.style.position = 'absolute';
    mask.style.display = 'none';
    mask.style.zIndex = 1;
    mask.addEventListener('click', function (ev) {
        _task.hiddenMenu();
    }, false);
    document.body.appendChild(mask);

    var _sa = sa;
    var _startitems = new Array();


    var _handl = document.createElement('div');
    _handl.setAttribute('id', SA.uuid());
    _handl.className = 'skyatom_desk_taskbar';

    var _start = document.createElement('div');
    _start.className = 'start';
    var _tb = document.createElement('div');
    _tb.className = 'task';
    var _txt = document.createTextNode('开   始');
    _start.appendChild(_txt);
    _start.addEventListener('click', function (ev) {
        _task.hiddenMenu();
    }, false);
    _handl.appendChild(_start);
    _handl.appendChild(_tb);

    document.body.appendChild(_handl);
    _task.hiddenMenu = function () {
        if (_startmenupanel.style.display == 'block') {
            mask.style.display = 'none';
            _startmenupanel.style.display = 'none';
        } else {
            mask.style.display = 'block';
            _startmenupanel.style.display = 'block';
        }

    };
    //获得句柄
    _task.getHandl = function () {
        return _handl;
    };
    _task.removeTaskIcon = function (_winid) {
        var os = SA.queryClassName('linkicon');
        for (var i = 0; i < os.length; i++) {
            var o = os[i];
            if (o.getAttribute('win-id') == _winid) {
                o.parentNode.removeChild(o);
                return;
            }
        }
    };
    /**
     * 获取任务面板
     * @returns {DeskTaskBar._tb|Element}
     */
    _task.getTaskBar = function () {
        return _tb;
    };

};

//主对象
var SA = function () {
    var sa = this;
    var taskbar = null;
    var contextpath = '/';
    /**
     * 设置上下文路径
     * @param {type} cp
     * @returns {undefined}
     */
    sa.setContextPath = function (cp) {
        contextpath = cp;
    };
    sa.getContextPath = function () {
        return contextpath;
    };
    var _res = "";//资源路径
    var winstartindex = 999;
    sa.setResource = function (r) {
        _res = r;
    };
    sa.getResouce = function () {
        return _res;
    };

    var _wins = new Array();//窗口
    sa.getWindows = function () {
        return _wins;
    };
    /**
     * 移除窗口。存在BUG
     * @param {type} win
     * @returns {Boolean}
     */
    sa.removeWin = function (win) {
        var wins = sa.getWindows();
        for (var _id in wins) {
            if (win.getID() == _id) {

                //最后一个窗口置顶
                var maxzindex = -1;
                var maxwin = null;
                for (var _id in wins) {
                    var w = wins[_id];
                    if (w != null) {
                        var _maxzindex = w.getHandl().style.zIndex;
                        if (_maxzindex > maxzindex) {
                            maxzindex = _maxzindex;
                            maxwin = w;
                        }
                    }
                }
                if (maxwin != null) {
                    maxwin.setFocus(true);
                    sa.focus(maxwin);
                }

                win.getParent().removeChild(win.getHandl());
                wins[_id] = null;
                return true;
            }
        }
        return false;
    };

    sa.closeWin = function (win, func) {
        if (func != null)
            func();
        sa.removeWin(win);
    };
    sa.focus = function (w) {
        var wins = sa.getWindows();
        for (var _id in wins) {
            if (_id == w.getID()) {
                continue;
            }
            var _w = wins[_id];
            sa.focusout(_w);
        }
        //console.log("获得焦点的是 : " + w.getTitle())
        w.setZIndex(winstartindex++);
    };
    sa.focusout = function (_win) {
        if (_win == null)
            return;
        _win.className = 'skyatom_window_dis';
        _win.setFocus(false);
    };
    /**
     *
     * @param {type} title
     * @param {type} x
     * @param {type} y
     * @param {type} w
     * @param {type} h
     * @param {type} icon
     * @param {type} parent
     * @param {type} typename 唯一窗口类型名称
     * @returns {SA.createWin.win|Window}
     */
    sa.createWin = function (title, x, y, w, h, icon, parent, typename) {
        for (var _id in _wins) {
            var _tw = _wins[_id];
            if (_tw == null) {
                continue;
            }
            var whandl = _tw.getHandl();
            var tn = whandl.getAttribute("type_name");
            if (tn != null) {
                if (tn == typename) {
                    return null;
                }
            }
        }
        var uid = SA.uuid();
        var win = new Window(title, x, y, w, h, icon, parent, uid, "_html", sa, winstartindex++, typename);
        win.init();
        _wins[uid] = win;
        sa.focus(win);
        return win;
    };
    var _oldEleDisplayMethod = new Array();//元素原有的现实方式
    /*
     * 隐藏元素；设置display
     * @param {type} o
     * @returns {undefined}
     */
    sa.hidden = function (o) {
        var id = sa.trim(o.id);
        if (id == '') {
            o.setAttribute('skyatomele_id', 'sa_' + SA.uuid());
        }
        _oldEleDisplayMethod[o.getAttribute('skyatomele_id')] = o.style.display;
        o.style.display = 'none';
    };
    /**
     * 显示元素，设置display
     * @param {type} o
     * @returns {undefined}
     */
    sa.show = function (o) {
        var m = _oldEleDisplayMethod[o.getAttribute('skyatomele_id')];
        o.style.display = m;
    };
    /**
     * 字符串是否已s结尾
     * @param {type} str
     * @param {type} s
     * @returns {Boolean}
     */
    sa.endWith = function (str, s) {
        if (s == null || s == "" || str.length == 0 || s.length > str.length)
            return false;
        if (str.substring(str.length - s.length) == s)
            return true;
        else
            return false;
        return true;
    };
    /**
     * 字符串是否已s开头
     * @param {type} str
     * @param {type} s
     * @returns {Boolean}
     */
    sa.startWith = function (str, s) {
        if (s == null || s == "" || str.length == 0 || s.length > str.length)
            return false;
        if (str.substr(0, s.length) == s)
            return true;
        else
            return false;
        return true;
    };
    sa.getById = function (id) {
        return document.getElementById(id);
    };
    /**
     * 删除左右两边的空白符
     * @param {type} str
     * @returns {unresolved}
     */
    sa.trim = function (str) {
        str = str.replace(/(^\s*)/g, "");
        str = str.replace(/(\s*$)/g, "");
        return str;
    };
    /**
     * 删除元素样式
     * @param {type} o 目标对象
     * @param {type} name classname
     * @returns {undefined}
     */
    sa.delClassName = function (o, name) {
        var cn = sa.trim(o.className);
        o.className = sa.trim(cn.replace(name, ""));
    };
    /**
     * 目标对象是否包含css类名
     * @param {type} o 目标对象
     * @param {type} name classname
     * @returns {Boolean}
     */
    sa.hasClassName = function (o, name) {
        var suc = false;
        if (o == null) {
            return suc;
        }
        var cn = o.className;
        cn = sa.trim(cn);
        name = sa.trim(name);
        if (name == '') {
            return false;
        }
        cn = " " + cn + " ";
        if (cn.indexOf(" " + name + " ") > -1) {
            suc = true;
        } else {
            suc = false;
        }
        return suc;
    };
    /**;
     * 向元素添加css类
     * @param {type} o 元素对象
     * @param {type} name classname
     * @returns {undefined}
     */
    sa.addClassName = function (o, name) {
        o.className = trim(o.className + " " + name);
    };
    /**
     * 查询筛选对象，已,号分隔
     * @param {type} str
     * @returns {undefined}
     */
    sa.queryClassName = function (str) {
        str = sa.trim(str);
        var _names = str.split(',');
        var objs = new Array();
        var index = 0;
        var nodes = document.body.getElementsByTagName("*");
        for (var _i = 0; _i < nodes.length; _i++) {
            var node = nodes[_i];
            var hasClass = false;
            for (var _j = 0; _j < _names.length; _j++) {
                if (sa.hasClassName(node, _names[_j])) {
                    hasClass = true;
                    break;
                }
            }
            if (hasClass) {
                objs[index++] = node;
            }
        }
        return objs;
    };

    sa.replaceClassName = function (o, oldclass, newclass) {
        o.className = SA.trim(o.className.replace(oldclass, newclass));
    };
    /**
     * 创建任务栏
     * @returns {undefined}
     */
    sa.createTaskBar = function () {
        taskbar = new DeskTaskBar(sa);
    };
    sa.getTaskBar = function () {
        return taskbar;
    };
    /**
     * 任务栏触发最小化窗口
     * @param {type} _win
     * @returns {undefined}
     */
    sa.winMinAction = function (_win) {
        var tb = taskbar.getTaskBar();
        var icon = document.createElement('div');
        icon.setAttribute('win-id', _win.getID());
        icon.className = 'linkicon';
        var txt = document.createTextNode(_win.getTitle());
        icon.appendChild(txt);
        if (_win.getIcon() != null || _win.getIcon() != '') {
            icon.style.backgroundImage = 'url("' + _win.getIcon() + '")';
        }
        icon.addEventListener('click', function (ev) {
            //console.log('taskbar is null?'+(_win.getID()))
            console.log(tb);
            taskbar.removeTaskIcon(_win.getID());
            sa.show(_win.getHandl());
            sa.focus(_win);
        }, false);
        tb.appendChild(icon);
    };
    /**
     * 窗口改变时，所有最大化窗口重绘
     * @returns {undefined}
     */
    sa.allMaxWinRender = function () {
        for (var _id in _wins) {
            var _tw = _wins[_id];
            if (_tw == null) {
                continue;
            }
            if (_tw.getStat() == Window.STAT_MAX) {
                _tw.maxRender();
            }
        }
    };

    //快捷方式图标数量
    var iconlinks = new Array();
    var iconnum = 0;
    //创建快捷方式
    sa.addIconLink = function (title, func, icon, popmenu, tips) {
        iconnum = iconnum + 1;
        var item = document.createElement('div');
        //右键菜单
        item.addEventListener('contextmenu', function (ev) {
            if (popmenu != null) {
            }
        }, false);
        item.setAttribute('iconnum', iconnum);
        item.setAttribute('id', SA.uuid());
        item.className = 'skyatom_desklink';
        var img = document.createElement('div');
        img.className = 'icon';
        if (icon != null) {
            img.style.backgroundImage = "url('" + icon + "')";
        }
        item.appendChild(img);
        var text = document.createElement('div');
        text.className = 'text';
        var txt = document.createTextNode(title);
        text.appendChild(txt);
        item.appendChild(text);
        item.addEventListener('click', function () {
            if (func) {
                func();
            }
        }, false);
        document.body.appendChild(item);
        var margin = 10;
        var deskh = document.body.scrollHeight - sa.getTaskBar().getHandl().offsetHeight;
        var iconw = item.offsetWidth;
        var iconh = item.offsetHeight;

        var rownums = parseInt(deskh / (iconh));//一列多少行
        var colnum = parseInt(iconnum / rownums) + (iconnum % rownums == 0 ? 0 : 1);//第几列
        var rownum = iconnum % rownums == 0 ? rownums : (iconnum % rownums);//第几行
        item.style.top = (iconh + margin) * (rownum - 1) + margin + 'px';
        item.style.left = (iconw + margin) * (colnum - 1) + margin + 'px';
        iconlinks["" + iconnum] = item;
    };
    /**
     * 桌面图标重新排列
     * @returns {undefined}
     */
    sa.deskIconLinkRender = function () {
        var icons = iconlinks;
        for (var idsn in icons) {
            var item = icons[idsn];
            var _iconnum = parseInt(item.getAttribute('iconnum'));
            var margin = 10;
            var deskh = document.body.scrollHeight - sa.getTaskBar().getHandl().offsetHeight;
            var iconw = item.offsetWidth;
            var iconh = item.offsetHeight;

            var rownums = parseInt(deskh / (iconh));//一列多少行
            var colnum = parseInt(_iconnum / rownums) + (_iconnum % rownums == 0 ? 0 : 1);//第几列
            var rownum = _iconnum % rownums == 0 ? rownums : (_iconnum % rownums);//第几行
            item.style.top = (iconh + margin) * (rownum - 1) + margin + 'px';
            item.style.left = (iconw + margin) * (colnum - 1) + margin + 'px';
            //console.log('index : ' + _iconnum + "\t rownums:" + rownums + "\trownum:" + rownum + '\tcolnum:' + colnum + "\ticonh:" + iconh + "\ticonw:" + iconw)
        }
    };
};
/**
 * 获取对应元素的指定表签名父元素
 * @param {type} tagName 表签名
 * @param {type} currentEle 当前元素
 * @param {type} attName 要监控的元素属性
 * @returns {undefined}
 */
SA.getParentTag = function (tagName, currentEle, attName) {
    var p = currentEle.parentNode;
    if (p == null) {
        return null;
    }
    if (p == document.body) {
        return null;
    }
    if (p == document) {
        return null;
    }
    if (!(p.tagName.toUpperCase() == tagName.toUpperCase())) {
        return SA.getParentTag(tagName, p);
    } else {
        if (SA.getAttr(p, attName) == null) {
            return SA.getParentTag(tagName, p);
        } else if (!SA.startWith(SA.getAttr(p, attName), "#")) {
            return SA.getParentTag(tagName, p);
        }
        return p;
    }
};
/**
 * 跳转到指定序号页面 
 * @param {type} renderobj 渲染的dom对象
 * @param {type} pageid 页面ID
 * @param {type} path 获取路径
 * @param {type} suffix 路径文件后缀
 * @param {type} startfunc 开始执行代码
 * @param {type} endfunc 完成结束代码
 * @returns {undefined}
 */
SA.goToPageID = function (renderobj, pageid, path, suffix, startfunc, endfunc) {
    if (!SA.startWith(pageid, '#')) {
        return;
    }
    var pageID = pageid.substr(1, pageid.length);
    if (startfunc != null) {
        startfunc();
    }
    var xmlhttp;
    if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else
    {// code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function ()
    {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var txt = xmlhttp.responseText;
            renderobj.innerHTML = txt;
            var tmpdiv = SA.createDiv("");
            tmpdiv.innerHTML = txt;
            var scrpt = SA.queryTags(tmpdiv, 'script');
            for (var _i = 0; _i < scrpt.length; _i++) {
                eval(scrpt[_i].innerHTML);
            }
            if (endfunc != null) {
                endfunc();
            }
        }
    };
    xmlhttp.open("POST", path + "/" + pageID + suffix, true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    var parms = "";
    xmlhttp.send(parms);
};
/**
 * 绑定面板中点击元素触发的页面渲染事件
 * @param {type} obj 面板对象
 * @param {type} targetName 要监控的元素标签名字
 * @param {type} attName 检查属性名称
 * @param {type} renderobj 要渲染的面板对象
 * @param {type} path 获取路径
 * @param {type} suffix 路径文件后缀
 * @returns {undefined}
 */
SA.bindLinkPage = function (obj, targetName, attName, renderobj, path, suffix, startfunc, endfunc) {
    SA.setEvent(obj, 'click', function (event) {
        var _obj = null;
        var tname = event.target.tagName;
        if (!(tname.toUpperCase() == targetName.toUpperCase())) {
            _obj = SA.getParentTag(targetName, event.target, attName);
            if (_obj == null) {
                return;
            }
        } else {
            _obj = event.target;
        }
        var v = SA.getAttr(_obj, attName);
        if (v == null || v == "") {
            return;
        }
        if (!SA.startWith(v, '#')) {
            return;
        }
        var pageID = v.substr(1, v.length);
        if (startfunc != null) {
            startfunc();
        }
        var xmlhttp;
        if (window.XMLHttpRequest)
        {// code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        } else
        {// code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange = function ()
        {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                var txt = xmlhttp.responseText;
                renderobj.innerHTML = txt;
                var tmpdiv = SA.createDiv("");
                tmpdiv.innerHTML = txt;
                var scrpt = SA.queryTags(tmpdiv, 'script');
                for (var _i = 0; _i < scrpt.length; _i++) {
                    eval(scrpt[_i].innerHTML);
                }
                if (endfunc != null) {
                    endfunc();
                }
            }
        };
        xmlhttp.open("POST", path + "/" + pageID + suffix, true);
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        var parms = "";
        xmlhttp.send(parms);
    });
};
/**
 * 设置对象事件
 * @param {type} o 目标对象
 * @param {type} event 时间名字
 * @param {type} func 函数句柄
 * @returns {undefined}
 */
SA.setEvent = function (o, event, func) {
    o.addEventListener(event, func, false);
};
/**
 * 移除对象事件
 * @param {type} o
 * @param {type} event
 * @param {type} func
 * @returns {undefined}
 */
SA.removeEvent = function (o, event, func) {
    o.removeEventListener(event, func, false);
};
/**
 * 设置元素是否可见
 * @param {type} o 目标对象
 * @param {type} s boolean 是否可见
 * @returns {undefined}
 */
SA.setVisible = function (o, s) {
    if (s) {
        o.style.visibility = 'visible';
    } else {
        o.style.visibility = 'hidden';
    }
};
SA.getDisplayMethod = function (o) {
    return o.style.display;
};
SA.top = function (o) {
    return o.offsetTop;
};
SA.left = function (o) {
    return o.offsetLeft;
};
SA.width = function (o) {
    return o.offsetWidth;
};
SA.realWidth = function (o) {
    return o.scrollWidth;
};
SA.height = function (o) {
    return o.offsetHeight;
};
SA.realHeight = function (o) {
    return o.scrollHeight;
};
SA.loadCss = function (src, sourceid) {
    var head = document.getElementById('head');
    var s = document.getElementById(sourceid);
    if (s == null) {
        var script = document.createElement('link');
        script.setAttribute('type', 'text/css');
        script.setAttribute('href', src);
        script.setAttribute('rel', 'stylesheet');
        script.setAttribute('id', sourceid);
        head.appendChild(script);
    } else {
        s.parentNode.removeChild(s);
        var script = document.createElement('link');
        script.setAttribute('type', 'text/css');
        script.setAttribute('href', src);
        script.setAttribute('rel', 'stylesheet');
        script.setAttribute('id', sourceid);
        head.appendChild(script);
    }
    return true;
};
SA.loadJS = function (src, sourceid) {
    var head = document.getElementById('head');
    var s = document.getElementById(sourceid);
    if (s == null) {
        var script = document.createElement('script');
        script.setAttribute('type', 'text/javascript');
        script.setAttribute('src', src);
        script.setAttribute('id', sourceid);
        head.appendChild(script);
    } else {
        s.parentNode.removeChild(s);
        var script = document.createElement('script');
        script.setAttribute('type', 'text/javascript');
        script.setAttribute('src', src);
        script.setAttribute('id', sourceid);
        head.appendChild(script);
    }
    return true;
};
/**
 * 去掉左右两边的空白符
 * @param {type} str
 * @returns {String}
 */
SA.trim = function (str) {
    str = str.replace(/(^\s*)/g, "");
    str = str.replace(/(\s*$)/g, "");
    return str;
};
SA.getById = function (id) {
    return document.getElementById(id);
};
SA.addClassName = function (o, name) {
    if (!SA.hasClassName(o, name))
        o.className = SA.trim(o.className + " " + name);
};

SA.delClassName = function (o, name) {
    var cn = SA.trim(o.className);
    o.className = SA.trim(cn.replace(name, ""));
};
SA.removeAtt = function (o, name) {
    o.removeAttribute(name);
};
SA.replaceClassName = function (o, oldclass, newclass) {
    o.className = SA.trim(o.className.replace(oldclass, newclass));
};

/**
 * 目标对象是否包含css类名
 * @param {type} o 目标对象
 * @param {type} name classname
 * @returns {Boolean}
 */
SA.hasClassName = function (o, name) {
    var suc = false;
    if (o == null) {
        return suc;
    }
    var cn = o.className;
    cn = SA.trim(cn);
    name = SA.trim(name);
    if (name == '') {
        return false;
    }
    cn = " " + cn + " ";
    if (cn.indexOf(" " + name + " ") > -1) {
        suc = true;
    } else {
        suc = false;
    }
    return suc;
};
SA.queryParentClassName = function (parent, str) {
    str = SA.trim(str);
    var _names = str.split(',');
    var objs = new Array();
    var index = 0;
    var nodes = parent.getElementsByTagName("*");
    for (var _i = 0; _i < nodes.length; _i++) {
        var node = nodes[_i];
        var hasClass = false;
        for (var _j = 0; _j < _names.length; _j++) {
            if (SA.hasClassName(node, _names[_j])) {
                hasClass = true;
                break;
            }
        }
        if (hasClass) {
            objs[index++] = node;
        }
    }
    return objs;
};
SA.queryFirstParentClassName = function (parent, str) {
    str = SA.trim(str);
    var _names = str.split(',');
    var objs = new Array();
    var index = 0;
    var nodes = parent.getElementsByTagName("*");
    for (var _i = 0; _i < nodes.length; _i++) {
        var node = nodes[_i];
        var hasClass = false;
        for (var _j = 0; _j < _names.length; _j++) {
            if (SA.hasClassName(node, _names[_j])) {
                hasClass = true;
                break;
            }
        }
        if (hasClass) {
            objs[index++] = node;
        }
    }
    return objs[0];
};
/**
 * 查询筛选对象，已,号分隔
 * @param {type} str
 * @returns {undefined}
 */
SA.queryClassName = function (str) {
    str = SA.trim(str);
    var _names = str.split(',');
    var objs = new Array();
    var index = 0;
    var nodes = document.body.getElementsByTagName("*");
    for (var _i = 0; _i < nodes.length; _i++) {
        var node = nodes[_i];
        var hasClass = false;
        for (var _j = 0; _j < _names.length; _j++) {
            if (SA.hasClassName(node, _names[_j])) {
                hasClass = true;
                break;
            }
        }
        if (hasClass) {
            objs[index++] = node;
        }
    }
    return objs;
};
/**
 * 查找标签元素
 * @param {type} parent
 * @param {type} elename
 * @returns {Array}
 */
SA.queryTags = function (parent, elename) {
    var objs = new Array();
    var index = 0;
    var nodes = parent.getElementsByTagName("*");
    for (var _i = 0; _i < nodes.length; _i++) {
        var node = nodes[_i];
        if (elename.toLowerCase() == node.tagName.toLowerCase()) {
            objs[index++] = node;
        }
    }
    return objs;
};
/**
 * 查询筛选对象，已,号分隔
 * @param {type} str
 * @returns {undefined}
 */
SA.queryFirstClassName = function (str) {
    str = SA.trim(str);
    var _names = str.split(',');
    var objs = new Array();
    var index = 0;
    var nodes = document.body.getElementsByTagName("*");
    for (var _i = 0; _i < nodes.length; _i++) {
        var node = nodes[_i];
        var hasClass = false;
        for (var _j = 0; _j < _names.length; _j++) {
            if (SA.hasClassName(node, _names[_j])) {
                hasClass = true;
                break;
            }
        }
        if (hasClass) {
            objs[index++] = node;
        }
    }
    return objs[0];
};
/**
 * json对象转字符串
 * @param {type} json
 * @returns {String}
 */
SA.json2str = function (json) {
    return JSON.stringify(json);
};
/**
 * 字符串转json
 * @param {type} str
 * @returns {Array|Object}
 */
SA.str2json = function (str) {
    return JSON.parse(str);
};
SA.uuid = function () {
    var uuid = new UUID();
    return uuid.createUUID();
};
SA.showMask = function (menu) {

    var mask = document.createElement('div');
    var win = menu.getWin();
    var id = SA.uuid();
    var _id = id;
    if (SA.winhasmask(win)) {
        return;
    }
    mask.className = 'skyatom_mask';
    mask.setAttribute('id', id);
    mask.style.zIndex = 99900;
    mask.style.display = 'block';
    mask.addEventListener('click', function () {
        SA.hiddenMask(menu, id);
    }, false);
    var w = win.getHandl().offsetWidth;
    var h = win.getHandl().offsetHeight;
    mask.style.width = w + "px";
    mask.style.height = h + 'px';
    mask.setAttribute('win-id', win.getID());
    win.getHandl().appendChild(mask);
    return _id;
};
SA.getWinMask = function (win) {
    var os = SA.queryClassName("skyatom_mask");
    if (os == null) {
    } else {
        for (var i = 0; i < os.length; i++) {
            var _o = os[i];
            if (_o.getAttribute('win-id') === win.getID()) {
                return _o;
            }
        }
    }
};
SA.winhasmask = function (win) {
    var os = SA.queryClassName("skyatom_mask");
    if (os == null) {
    } else {
        for (var i = 0; i < os.length; i++) {
            var _o = os[i];
            if (_o.getAttribute('win-id') === win.getID()) {
                return true;
            }
        }
    }
};
/**
 * 关闭遮罩层
 * @param {type} menu
 * @param {type} id 遮罩层ID
 * @returns {undefined}
 */
SA.hiddenMask = function (menu, id) {
    menu.close();
    var win = menu.getWin();
    var o = document.getElementById(id);
    o.parentNode.removeChild(o);
    var os = SA.queryClassName("skyatom_mask");
    if (os == null) {
    } else {
        for (var i = 0; i < os.length; i++) {
            var _o = os[i];
            if (_o.parentNode.getAttribute('win-id') == win.getID()) {
                _o.parentNode.removeChild(_o);
            }
        }
    }
    /*
     */
};
SA.setBackGroundImage = function (img) {
    var os = SA.queryClassName('skyatom_background');
    if (os.length == 0) {
        var bg = document.createElement('div');
        bg.className = "skyatom_background";
        bg.style.backgroundImage = 'url("' + img + '")';
        document.body.appendChild(bg);
    } else {
        var bg = os[0];
        bg.style.backgroundImage = 'url("' + img + '")';
    }
};

/**
 * 要删除的对象元素
 * @param {type} obj
 * @returns {undefined}
 */
SA.removeObj = function (obj) {
    if (obj != null) {
        obj.parentNode.removeChild(obj);
    }
};
/**
 * 添加元素
 * @param {type} parent
 * @param {type} ele
 * @returns {undefined}
 */
SA.addChild = function (parent, ele) {
    parent.appendChild(ele);
};
/**
 * 添加元素
 * @param {type} parent
 * @param {type} ele
 * @returns {undefined}
 */
SA.addChildFirst = function (parent, ele) {
    parent.insertBefore(ele, parent.childNodes[0]);
};
SA.getScreenWidth = function () {
    return document.body.offsetWidth;
};
SA.getScreenHeight = function () {
    return document.body.offsetHeight;
};
function randomInt(x1, x2)
{
    var min_int = parseInt(x1);
    var max_int = parseInt(x2);
    if (isNaN(min_int) || isNaN(max_int))
    {
        alert('parameter error');
        return false;
    }

    x1 = Math.min(min_int, max_int);
    x2 = Math.max(min_int, max_int);

    return x1 + Math.floor(Math.random() * (x2 - x1 + 1));
}
/**
 * 乱序
 * @param {type} no
 * @returns {Array|Boolean}
 */
SA.getSequence = function (no) {
    var sequence = new Array();
    for (var i = 0; i < no; i++) {
        sequence[i] = i;
    }
    for (var i = 0; i < no; i++) {
        var min_int = parseInt(0);
        var max_int = parseInt(no);
        if (isNaN(min_int) || isNaN(max_int))
        {
            alert('parameter error');
            return false;
        }
        var x1 = Math.min(min_int, max_int);
        var x2 = Math.max(min_int, max_int);
        var p = x1 + Math.floor(Math.random() * (x2 - x1 + 1));
        var tmp = sequence[i];
        sequence[i] = sequence[p];
        sequence[p] = tmp;
    }
    var _s = new Array();
    var index = 0;
    for (var i = 0; i < sequence.length; i++) {
        if (sequence[i] == null)
            continue;
        _s[index++] = sequence[i];
    }
    return _s;
};
/**
 * 获取元素到父级元素的相对位置left
 * @param {type} ele 目标元素
 * @param {type} obj 父级元素
 * @returns 
 */
SA.getElementRelativeLeft = function (ele, obj) {
    var left = 0;
    if (ele.parentNode == obj) {
        left = ele.offsetLeft;
        try {
            if (ele.style.borderWidth != null && ele.style.borderWidth != '') {
                left += parseInt(ele.style.borderWidth);
            }
        } catch (_e) {
        }
    } else {
        var tb = 0;
        try {
            if (ele.style.borderWidth != null && ele.style.borderWidth != '') {
                tb += parseInt(ele.style.borderWidth);
            }
        } catch (_e) {
        }
        left += ele.offsetLeft + SA.getElementRelativeLeft(ele.parentNode, obj);
    }
    return left;
};

/**
 * 创建元素
 * @param {type} elename
 * @returns {undefined}
 */
SA.createDiv = function (cla) {
    var ele = document.createElement('div');
    SA.addClassName(ele, cla);
    return ele;
};
/**
 * 创建元素
 * @param {type} elename
 * @returns {undefined}
 */
SA.createSpan = function (cla) {
    var ele = document.createElement('span');
    SA.addClassName(ele, cla);
    return ele;
};
/**
 * 创建元素
 * @param {type} elename
 * @returns {undefined}
 */
SA.createEle = function (elename) {
    var ele = document.createElement(elename);
    return ele;
};
/**
 * 设置元素属性
 * @param {type} obj
 * @param {type} name
 * @param {type} value
 * @returns {undefined}
 */
SA.setAttr = function (obj, name, value) {
    obj.setAttribute(name, value);
};
/**
 * 获取元素属性
 * @param {type} obj
 * @param {type} name
 * @returns {undefined}
 */
SA.getAttr = function (obj, name) {
    return obj.getAttribute(name);
};
/**
 * 获取元素到父级元素的相对位置top
 * @param {type} ele 目标元素
 * @param {type} obj 父级元素
 * @returns 
 */
SA.getElementRelativeTop = function (ele, obj) {
    var top = 0;
    if (ele.parentNode == obj) {
        top = ele.offsetTop;
        if (ele.style.borderWidth != null && ele.style.borderWidth != '') {
            top += parseInt(ele.style.borderWidth);
        }
    } else {
        var tb = 0;
        if (ele.style.borderWidth != null && ele.style.borderWidth != '') {
            tb += parseInt(ele.style.borderWidth);
        }
        top += ele.offsetLeft + SA.getElementRelativeTop(ele.parentNode, obj);
    }
    return top;
};
/**
 * 替换所有字符串
 * @param {type} str 全文本
 * @param {type} reallyDo 要替换的字符
 * @param {type} replaceWith 替换结果字符
 * @returns {unresolved}
 */
SA.replaceAllString = function (str, reallyDo, replaceWith) {
    if (reallyDo == '+') {
        return str.replace(/\+/g, replaceWith);
    }
    if (reallyDo == '?') {
        return str.replace(/\?/g, replaceWith);
    }
    if (reallyDo == '%') {
        return str.replace(/\%/g, replaceWith);
    }
    var e = new RegExp(reallyDo, "g");
    return str.replace(e, replaceWith);
};

/**
 * 字符串是否已s结尾
 * @param {type} str
 * @param {type} s
 * @returns {Boolean}
 */
SA.endWith = function (str, s) {
    if (s == null || s == "" || str.length == 0 || s.length > str.length)
        return false;
    if (str.substring(str.length - s.length) == s)
        return true;
    else
        return false;
    return true;
};
/**
 * 字符串是否已s开头
 * @param {type} str
 * @param {type} s
 * @returns {Boolean}
 */
SA.startWith = function (str, s) {
    if (s == null || s == "" || str.length == 0 || s.length > str.length)
        return false;
    if (str.substr(0, s.length) == s)
        return true;
    else
        return false;
    return true;
};

SA.getElementTop = function (e) {
    var offset = e.offsetTop;
    if (e.offsetParent != null)
        offset += SA.getElementTop(e.offsetParent);
    return offset;
}
//获取元素的横坐标 
SA.getElementLeft = function (e) {
    var offset = e.offsetLeft;
    if (e.offsetParent != null)
        offset += SA.getElementLeft(e.offsetParent);
    return offset;
};

SA.NumAdd = function (arg1, arg2) {
    var r1, r2, m;
    try {
        r1 = arg1.toString().split(".")[1].length
    } catch (e) {
        r1 = 0
    }
    try {
        r2 = arg2.toString().split(".")[1].length
    } catch (e) {
        r2 = 0
    }
    m = Math.pow(10, Math.max(r1, r2))
    return (arg1 * m + arg2 * m) / m
}
//给Number类型增加一个add方法，调用起来更加方便。  
Number.prototype.add = function (arg) {
    return SA.NumAdd(arg, this);
};
//说明：javascript的减法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的减法结果。  
//调用：accSub(arg1,arg2)  
//返回值：arg1减上arg2的精确结果  
SA.NumSub = function (arg1, arg2) {
    return SA.NumAdd(arg1, -arg2);
}
//给Number类型增加一个sub方法，调用起来更加方便。  
Number.prototype.sub = function (arg) {
    return SA.NumSub(this, arg);
};
//说明：javascript的乘法结果会有误差，在两个浮点数相乘的时候会比较明显。这个函数返回较为精确的乘法结果。  
//调用：accMul(arg1,arg2)  
//返回值：arg1乘以arg2的精确结果  
SA.NumMul = function (arg1, arg2)
{
    var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
    try {
        m += s1.split(".")[1].length
    } catch (e) {
    }
    try {
        m += s2.split(".")[1].length
    } catch (e) {
    }
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
};
//给Number类型增加一个mul方法，调用起来更加方便。  
Number.prototype.mul = function (arg) {
    return SA.NumMul(arg, this);
};

//说明：javascript的除法结果会有误差，在两个浮点数相除的时候会比较明显。这个函数返回较为精确的除法结果。  
//调用：accDiv(arg1,arg2)  
//返回值：arg1除以arg2的精确结果  
SA.NumDiv = function (arg1, arg2) {
    var t1 = 0, t2 = 0, r1, r2;
    try {
        t1 = arg1.toString().split(".")[1].length
    } catch (e) {
    }
    try {
        t2 = arg2.toString().split(".")[1].length
    } catch (e) {
    }
    with (Math) {
        r1 = Number(arg1.toString().replace(".", ""))
        r2 = Number(arg2.toString().replace(".", ""))
        return (r1 / r2) * pow(10, t2 - t1);
    }
}
//给Number类型增加一个div方法，调用起来更加方便。  
Number.prototype.div = function (arg) {
    return SA.NumDiv(this, arg);
};
//保留小数点后两位
SA.toDecimal = function (x) {
    var f = parseFloat(x);
    if (isNaN(f)) {
        return;
    }
    f = Math.round(x * 100) / 100;
    return f;
};

/**
 * 转义url的特殊符号
 * @param {type} html
 * @returns {undefined}
 */
SA.encodingURLSign = function (html) {
    var str = html + "";
    if (SA.startWith(str + "", "-")) {
        var temp = (str + "").substr(1);
        if (/^\d+$/.test(temp + "")) {
            return html;
        }
        if (/^(-|\+) \d+\.\d*$/.test(temp + "")) {
            return html;
        }
    } else {
        if (/^\d+$/.test(str + "")) {
            return html;
        }
        if (/^(-|\+) \d+\.\d*$/.test(str + "")) {
            return html;
        }
    }
    str = SA.replaceAllString(str, "%", "%25");
    str = SA.replaceAllString(str, '&', "%26");
    str = SA.replaceAllString(str, "=", "%3D");
    str = SA.replaceAllString(str, "+", "%2B");
    str = SA.replaceAllString(str, "/", "%2F");
    str = SA.replaceAllString(str, "?", "%3F");
    str = SA.replaceAllString(str, "#", "%23");
    str = SA.replaceAllString(str, " ", "%20");
    return str;
};

/* 
 * 文本对象动态替换.
 * @
 */
/**
 * 
 * @param {type} _delaytime 延时时间
 * @param {type} _times 展现所循环的次数
 * @param {type} _obj 操作对象
 * @param {type} _houvertype 鼠标覆盖显示方式。char为字符，num为数字，null默认为字符
 * @param {type} _outtype 鼠标移出显示方式。char为字符，num为数字，null默认为字符
 * @returns {undefined}
 */
var CharacterReplace = function (_delaytime, __times, _obj, _hovertype, _outtype) {
    var _cr = this;
    var delaytime = _delaytime;
    var _times = __times;
    var obj = _obj;
    var hovertype = _hovertype;
    var outtype = _outtype;

    var _dataover = obj.getAttribute('data-hover');
    var _data = obj.getAttribute('data');
    /**
     * 设置鼠标覆盖所显示的文字
     * @param {type} s
     * @returns {undefined}
     */
    _cr.setHoverdata = function (s) {
        _dataover = s;
    };
    /**
     * 设置鼠标移开所显示的文字
     * @param {type} s
     * @returns {undefined}
     */
    _cr.setData = function (s) {
        _data = s;
    };

    var _hover = null;
    var _out = null;
    var ishover = false;
    var num_array = new Array();
    for (var i = 0; i < 10; i++) {
        num_array[i] = i;
    }

    var char_array = new Array();
    for (var i = 0; i < 26; i++) {
        char_array[i] = String.fromCharCode(65 + i);
    }
    for (var i = 0; i < 26; i++) {
        char_array[i + 26] = String.fromCharCode(97 + i);
    }
    function getNum(i) {
        return num_array[i];
    }
    function getChar(type, i) {
        if (type == null) {
            return getCharacter(i);
        } else if (type == 'char') {
            return getCharacter(i);
        } else if (type == 'num') {
            return getNum(i);
        }
    }
    function getCharacter(i) {
        return char_array[i];
    }


    SA.setEvent(obj, 'mouseover', function () {
        if (!ishover) {
            try {
                clearInterval(_out);
            } catch (_e) {
                console.log("e:" + _e);
            }
        }
        ishover = true;
        var dataover = _dataover.split("");
        var length = dataover.length;
        var carray = new Array();//新组的字符数组
        for (var i = 0; i < length; i++) {
            carray[i] = "0";
        }
        var o_index = 0;
        var index = 0;
        var times = _times;
        _hover = setInterval(function () {
            if (!ishover) {
                clearInterval(_hover);
                return;
            }
            var str = "";
            for (var i = index; i < length; i++) {
                carray[i] = getChar(hovertype, o_index++);
                if (hovertype == null || hovertype == 'char') {
                    if (o_index >= 52) {
                        o_index = 0;
                    }
                } else if (hovertype == 'num') {
                    if (o_index >= 10) {
                        o_index = 0;
                    }
                }
            }
            times--;
            if (times < 0) {
                carray[index] = dataover[index];
                index++;
                times = _times;
            }
            for (var i = 0; i < length; i++) {
                str += carray[i];
            }
            obj.innerHTML = str;
            if ((index + 1) == length) {
                carray[index] = dataover[index];
                obj.innerHTML = _dataover;
                clearInterval(_hover);
            }
        }, delaytime);
    });

    SA.setEvent(obj, 'mouseout', function () {
        if (ishover) {
            try {
                clearInterval(_hover);
            } catch (_e) {
                console.log("e:" + _e);
            }
        }
        ishover = false;
        var dataover = _data.split("");
        var length = dataover.length;
        var carray = new Array();//新组的字符数组
        for (var i = 0; i < length; i++) {
            carray[i] = "0";
        }
        var o_index = 0;
        var index = 0;
        var times = _times;
        _out = setInterval(function () {
            if (ishover) {
                clearInterval(_out);
                return;
            }
            var str = "";
            for (var i = index; i < length; i++) {
                carray[i] = getChar(outtype, o_index++);
                if (outtype == null || outtype == 'char') {
                    if (o_index >= 52) {
                        o_index = 0;
                    }
                } else if (outtype == 'num') {
                    if (o_index >= 10) {
                        o_index = 0;
                    }
                }
            }
            times--;
            if (times < 0) {
                carray[index] = dataover[index];
                index++;
                times = _times;
            }
            for (var i = 0; i < length; i++) {
                str += carray[i];
            }
            obj.innerHTML = str;
            if ((index + 1) == length) {
                carray[index] = dataover[index];
                obj.innerHTML = _data;
                clearInterval(_out);
            }
        }, delaytime);
    });
    /**
     * 执行显示效果
     * @returns {undefined}
     */
    _cr.excute = function () {
        obj.innerHTML = _data;
        if (!ishover) {
            try {
                clearInterval(_out);
            } catch (_e) {
                console.log("e:" + _e)
            }
        }
        ishover = true;
        var dataover = _dataover.split("");
        var length = dataover.length;
        var carray = new Array();//新组的字符数组
        for (var i = 0; i < length; i++) {
            carray[i] = "0";
        }
        var o_index = 0;
        var index = 0;
        var times = _times;
        _hover = setInterval(function () {
            if (!ishover) {
                clearInterval(_hover);
                return;
            }
            var str = "";
            for (var i = index; i < length; i++) {
                carray[i] = getChar(hovertype, o_index++);
                if (hovertype == null || hovertype == 'char') {
                    if (o_index >= 52) {
                        o_index = 0;
                    }
                } else if (hovertype == 'num') {
                    if (o_index >= 10) {
                        o_index = 0;
                    }
                }
            }
            times--;
            if (times < 0) {
                carray[index] = dataover[index];
                index++;
                times = _times;
            }
            for (var i = 0; i < length; i++) {
                str += carray[i];
            }
            obj.innerHTML = str;
            if ((index + 1) == length) {
                carray[index] = dataover[index];
                obj.innerHTML = _dataover;
                clearInterval(_hover);
            }
        }, delaytime);
    }
};

//循环出现
CharacterReplace.loop = function (obj, _length, type, delaytime) {
    var num_array = new Array();
    for (var i = 0; i < 10; i++) {
        num_array[i] = i;
    }

    var char_array = new Array();
    for (var i = 0; i < 26; i++) {
        char_array[i] = String.fromCharCode(65 + i);
    }
    for (var i = 0; i < 26; i++) {
        char_array[i + 26] = String.fromCharCode(97 + i);
    }
    function getNum(i) {
        return num_array[i];
    }
    function getChar(type, i) {
        if (type == null) {
            return getCharacter(i);
        } else if (type == 'char') {
            return getCharacter(i);
        } else if (type == 'num') {
            return getNum(i);
        }
    }
    function getCharacter(i) {
        return char_array[i];
    }


    var length = _length;
    var carray = new Array();//新组的字符数组
    for (var i = 0; i < length; i++) {
        carray[i] = "0";
    }
    var o_index = 0;
    var index = 0;
    var _hover = setInterval(function () {
        num_array = SA.getSequence(10);
        var str = "";
        for (var i = 0; i < length; i++) {
            carray[i] = getChar(type, o_index++);
            if (type == null || type == 'char') {
                if (o_index >= 52) {
                    o_index = 0;
                }
            } else if (type == 'num') {
                if (o_index >= 10) {
                    o_index = 0;
                }
            }
        }
        for (var i = 0; i < length; i++) {
            str += carray[i];
        }
        obj.innerHTML = str;
    }, delaytime);
};
//UUID生成
function UUID() {
    this.id = this.createUUID();
}
// When asked what this Object is, lie and return it's value
UUID.prototype.valueOf = function () {
    return this.id;
};
UUID.prototype.toString = function () {
    return this.id;
};
UUID.prototype.createUUID = function () {
    var dg = new Date(1582, 10, 15, 0, 0, 0, 0);
    var dc = new Date();
    var t = dc.getTime() - dg.getTime();
    var h = '-';
    var tl = UUID.getIntegerBits(t, 0, 31);
    var tm = UUID.getIntegerBits(t, 32, 47);
    var thv = UUID.getIntegerBits(t, 48, 59) + '1'; // version 1, security version is 2
    var csar = UUID.getIntegerBits(UUID.rand(4095), 0, 7);
    var csl = UUID.getIntegerBits(UUID.rand(4095), 0, 7);
    var n = UUID.getIntegerBits(UUID.rand(8191), 0, 7) +
            UUID.getIntegerBits(UUID.rand(8191), 8, 15) +
            UUID.getIntegerBits(UUID.rand(8191), 0, 7) +
            UUID.getIntegerBits(UUID.rand(8191), 8, 15) +
            UUID.getIntegerBits(UUID.rand(8191), 0, 15); // this last number is two octets long
    return tl + h + tm + h + thv + h + csar + csl + h + n;
};
UUID.getIntegerBits = function (val, start, end) {
    var base16 = UUID.returnBase(val, 16);
    var quadArray = new Array();
    var quadString = '';
    var i = 0;
    for (i = 0; i < base16.length; i++) {
        quadArray.push(base16.substring(i, i + 1));
    }
    for (i = Math.floor(start / 4); i <= Math.floor(end / 4); i++) {
        if (!quadArray[i] || quadArray[i] == '')
            quadString += '0';
        else
            quadString += quadArray[i];
    }
    return quadString;
};
UUID.returnBase = function (number, base) {
    var convert = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    if (number < base)
        var output = convert[number];
    else {
        var MSD = '' + Math.floor(number / base);
        var LSD = number - MSD * base;
        if (MSD >= base)
            var output = this.returnBase(MSD, base) + convert[LSD];
        else
            var output = convert[MSD] + convert[LSD];
    }
    return output;
};
UUID.rand = function (max) {
    return Math.floor(Math.random() * max);
};



///初始化
/*
 document.oncontextmenu = function () {
 event.returnValue = false;
 return false;
 };
 */

var Desk = new SA();
window.onresize = function () {
    Desk.deskIconLinkRender();
    Desk.allMaxWinRender();
};