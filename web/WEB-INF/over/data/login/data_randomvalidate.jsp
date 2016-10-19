<%-- 
    Document   : 手机验证码功能
    Created on : 2016-10-18, 14:59:57
    Author     : Administrator
--%>

<%@page import="org.json.JSONObject"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%
    response.setCharacterEncoding("UTF=8");
    response.setContentType("text/html;charset=UTF-8");
    int code = wc.sm.v1.impl.CustomerInforExcutor.ERR;
    Boolean suc = true;
    String msg = "该手机未申请验证";
    String telephone = request.getParameter("telephone");
    String random = request.getParameter("random");
    if (telephone == null || telephone.trim().equals("")) {
        suc = false;
        msg = "手机号为空";
    }
    if (random == null || random.trim().equals("")) {
        suc = false;
        msg = "验证码为空";
    }
    if (suc) {
        Object _data = session.getAttribute("_random_data_" + telephone);
        if (_data != null) {
            JSONObject data = (JSONObject) _data;
            String _random = data.getString("random");
            if (_random.equals(random)) {
                Long time = System.currentTimeMillis();
                Long oldtime = data.getLong("time");
                if ((time - oldtime) >= 70000l) {
                    msg = "验证码超时";
                } else {
                    msg = "验证成功";
                    code = wc.sm.v1.impl.CustomerInforExcutor.SUC;
                    JSONObject rr = new JSONObject();
                    rr.put("result", true);
                    session.setAttribute("_random_validate_" + telephone, rr);
                    session.removeAttribute("_random_data_" + telephone);
                }
            } else {
                msg = "验证码错误";
            }
        } else {
            msg = "表单超时！";
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
