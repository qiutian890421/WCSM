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
    String msg = "";
    String random = "";
    String telephone = request.getParameter("telephone");
    if (telephone == null || telephone.trim().equals("")) {
        suc = false;
        msg = "手机号为空";
    } else {
        Boolean m = glob.Glob.validateTelePhone(telephone);
        if (!m) {
            msg = "手机号格式不正确";
            suc = false;
        }
    }
    if (suc) {
        Boolean bgj = true;
        Object _olddata = session.getAttribute("_random_data_" + telephone);
        if (_olddata != null) {
            JSONObject olddata = (JSONObject) _olddata;
            Long oldtime = olddata.getLong("time");
            Long time = System.currentTimeMillis();
            if ((time - oldtime) <= 60000l) {
                msg = "请勿重复提交";
                bgj = false;
            }
        }
        if (bgj) {
            random = glob.Glob.createRandom(true, 4);
            String url = "http://api.sms.cn/sms/?ac=send&uid=wcitadmin&pwd=" + glob.Glob.SMSKEY + "&template=390243&mobile=" + telephone + "&content={\"code\":\"" + random + "\"}";
            String s = glob.Glob.sendPost(url, null);
            s = s.replace("/n", "");
            JSONObject a = new JSONObject(s);
            if (a.get("message").equals("发送成功")) {
                code = wc.sm.v1.impl.CustomerInforExcutor.SUC;
                msg = a.getString("message");
                JSONObject jb = new JSONObject();
                jb.put("telephone", telephone);
                jb.put("random", random);
                jb.put("time", System.currentTimeMillis());
                session.setAttribute("_random_data_" + telephone, jb);
                System.out.println("验证码是：" + random);
            } else {
                msg = "短信发送失败";
                suc = false;
            }
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
