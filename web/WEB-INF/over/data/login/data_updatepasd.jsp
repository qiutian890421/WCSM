<%-- 
    Document   : 修改密码
    Created on : 2016-10-18, 16:33:27
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
    String username = request.getParameter("username");
    String pass = request.getParameter("password");
    String oldpass = request.getParameter("oldpassword");
    String oldpassword = "";
    String password = "";
    if (username == null || username.trim().equals("")) {
        msg = "账号为空";
        suc = false;
    }
    if (pass == null || pass.trim().equals("")) {
        msg = "新密码为空";
        suc = false;
    } else {
        password = zwk.com.basic.Common.getMD5(pass);
    }
    if (oldpass == null || oldpass.trim().equals("")) {
        msg = "旧密码为空";
        suc = false;
    } else {
        oldpassword = zwk.com.basic.Common.getMD5(oldpass);
    }
    if (suc) {
        ResultSet r = wc.sm.v1.impl.CustomerInforExcutor.updatePasd(username, oldpassword, password);
        code = r.getCODE();
        msg = r.getMSG();
    }

%>
{
"data":{
"result":<%=suc%>,
"code":<%=code%>,
"msg":"<%=msg%>"
}
}