<%-- 
    Document   : 客户登陆提交
    Created on : 2016-10-18, 9:18:04
    Author     : 邱杰
--%>

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
    //登录验证
    if (suc) {
        ResultSet r = wc.sm.v1.impl.CustomerInforExcutor.loginValidate(username, password);
        msg = r.getMSG();
        code = r.getCODE();
    }

%>
{
"data":{
"result":<%=suc%>,
"code":<%=code%>,
"msg":"<%=msg%>"
}
}
