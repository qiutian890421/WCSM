

<%@page import="wc.sm.bean.CustomerInfor"%>
<%@page import="glob.Glob"%>
<%@page import="wc.sm.v1.impl.basic.BasicCustomerInfor"%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <script src="Ajax.js" type="text/javascript"></script>
        <script src="fcnAjax.js" type="text/javascript"></script>
        <script src="skyatomconsole.1.2.3.js" type="text/javascript"></script>
        <title>JSP Page</title>
    </head>
    <body>
        <h1 id="title"></h1>
    </body>
    <script>

        var datas = {
            username: '13888888888',
            password: 'sr920722',
            oldpassword: 'sr920722',
            random: '3399',
            telephone: '13888888888',
            path: '/customer/data_getoacustomer'
        };
        getajaxdata('../redirect.jsp', datas, function (data) {
            var obj = SA.getById('title');
            obj.innerHTML = "是否执行：" + data.data.result + "</br>" + "执行结果：" + data.data.code + "</br>" + "结果描述：" + data.data.msg;
        });
    </script>
</html>
