<%-- 
    Document   : 获取OA账户信息
    Created on : 2016-10-19, 11:09:41
    Author     : Administrator
--%>
<%@page import="org.json.JSONObject"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%
    response.setCharacterEncoding("UTF=8");
    response.setContentType("text/html;charset=UTF-8");
    String telephone = request.getParameter("telephone");
    String param = "&formid=customerList";
    String url = glob.Glob.OAURLGETSIGNKEY;
    String s = glob.Glob.sendPost(url, param);
    s = s.replace("/n", "");
    param = "&cpage=0&pagesize=10&urlkey=" + s;
    url = glob.Glob.OAURLDATA + "/customerService_list.data";
    System.out.println(url);
    System.out.println(param);
    s = glob.Glob.sendPost(url, param);
    s = s.replace("/n", "");
    System.out.println(s);
    JSONObject _s = new JSONObject(s);
    JSONObject _d = _s.getJSONObject("data");
    String msg = _d.getString("msg");
    int code = 1;
    Boolean suc = true;

%>
{
"data":{
"result":<%=suc%>,
"code":<%=code%>,
"msg":"<%=msg%>"
}
}
