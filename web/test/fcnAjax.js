var _Context = '/WCSM_v1';
var _SignKeyURL = _Context + '/getSignKey.jsp';
//同名字段多参方法
function getAjaxTos(formid, parms, url, fcn) {

    ajaxtotext({
        url: _SignKeyURL,
        data: {
            formid: formid
        },
        success: function (data) {
            getAjaxtosData(parms, _Context + url, fcn, data);
        }
    });
}
//同名字段多参方法-2
function getAjaxtosData(parms, url, fcn, data) {
    ajaxtos({
        url: url,
        data: parms + '&urlkey=' + data,
        success: function (data) {
            if (fcn != null) {
                fcn(data);
            }
        }
    });
}

//单名参数Ajax方法
function getFormAjax(formurl, tjurl, datas, fcn) {
    ajaxtotext({
        url: _SignKeyURL,
        data: {
            formid: formurl
        },
        success: function (data) {
            datas['urlkey'] = data;
            getajaxdata(data, _Context + tjurl, datas, fcn);
        }
    });
}
//单名参数Ajax方法-2
function getajaxdata(url, datas, fcn) {
    ajax({
        url: url,
        data: datas,
        success: function (data) {
            if (fcn != null) {
                fcn(data);
            }

        }});

}

