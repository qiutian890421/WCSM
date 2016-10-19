<%-- 
    Document   : 重定向
    Created on : 2016-10-18, 10:26:25
    Author     : 邱杰
--%>

<%@page import="java.util.Map"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%
    String path = request.getParameter("path");
    if (path != null) {
        if (!path.trim().equals("")) {
            request.getRequestDispatcher("/WEB-INF/over/data" + path + ".jsp").forward(request, response);
            return;
        }
    } else {
%><h1>非法访问</h1><%
    }
%>
