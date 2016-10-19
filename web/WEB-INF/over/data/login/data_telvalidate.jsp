<%-- 
    Document   : 手机号验证是否存在
    Created on : 2016-10-18, 9:18:04
    Author     : 邱杰
--%>

<%@page import="java.util.regex.Pattern"%>
<%@page import="java.util.regex.Matcher"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%
    int code = 1;
    Boolean suc = true;
    String msg = "";
    Boolean exists = null;
    //获取页面提交数据
    String telephone = request.getParameter("telephone");
    if (telephone == null || telephone.trim().equals("")) {
        msg = "手机号为空";
        suc = false;
    }
    //验证手机号
    if (suc) {
        wc.sm.bean.ResultSet r = wc.sm.v1.impl.CustomerInforExcutor.telValidate(telephone);
        msg = r.getMSG();
        code = r.getCODE();
        exists = r.getEXISTS();
    }

%>
{
"data":{
"result":<%=suc%>,
"code":<%=code%>,
"msg":"<%=msg%>",
"exists":<%=exists%>
}
}
