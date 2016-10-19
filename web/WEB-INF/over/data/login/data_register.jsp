<%-- 
    Document   : 注册账号
    Created on : 2016-10-18, 9:18:04
    Author     : 邱杰
--%>

<%@page import="org.json.JSONObject"%>
<%@page import="wc.sm.bean.ResultSet"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%
    response.setCharacterEncoding("UTF=8");
    response.setContentType("text/html;charset=UTF-8");
    int code = wc.sm.v1.impl.CustomerInforExcutor.ERR;
    Boolean suc = true;
    String msg = "";
    //获取页面提交数据
    String username = request.getParameter("username");
    String pass = request.getParameter("password");
    String model = request.getParameter("model");
    String password = "";
    if (username == null || username.trim().equals("")) {
        msg = "登录账号为空";
        suc = false;
    }
    if (pass == null || pass.trim().equals("")) {
        msg = "登录密码为空";
        suc = false;
    } else {
        password = zwk.com.basic.Common.getMD5(pass);
    }
    Object _validate = session.getAttribute("_random_validate_" + username);
    if (_validate == null) {
        msg = "表单超时";
        suc = false;
    }
    if (suc) {
        JSONObject data = (JSONObject) _validate;
        if (data.getBoolean("result")) {
            ResultSet r = wc.sm.v1.impl.CustomerInforExcutor.registerCustomer(username, password, "#");
            code = r.getCODE();
            msg = r.getMSG();
            session.removeAttribute("_random_validate_" + username);
        } else {
            msg = "手机未通过验证";
        }
    }
%>
{
"data":{
"result":<%=suc%>,
"code":<%=code%>,
"msg":"<%=msg%>"
}
}
