/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package wc.sm.v1.impl.basic;

import glob.Glob;
import wc.sm.bean.CustomerInfor;
import wc.sm.v1.impl.BasicImplCode;

/**
 *
 * @author Administrator
 */
public class BasicCustomerInfor {

    /**
     * 添加对象
     *
     * @param model
     * @param methods 要验证获取值得方法
     * @param validnullvalue 是否要验证空值
     * @return 返回消息代码
     */
    public static BasicImplCode insertObject(CustomerInfor model, String[] methods, boolean validnullvalue) {
        BasicImplCode code = new BasicImplCode();
        boolean validsuc = true;
        if (validnullvalue) {
            validsuc = methods == null ? BasicImplCode.forEachNullValueValid(model, code) : BasicImplCode.forEachNullValueValid(model, code, methods);
        }
        if (validsuc) {
            cn.skyatom.db.basic.StatmentExcutor<CustomerInfor> exc = Glob.getDBFactory().getStatmentExcutor("wc.sm", "CustomerInfor_insertobject", "CustomerInfor");
            exc.setQueryObject(model);
            exc.finishExcute(false);
            try {
                if (exc.excuteQuery()) {
                    code.setSucess();
                } else {
                    code.setFail();
                    code.addMessage("操作错误");
                }
            } catch (Exception e) {
                exc.free();
                code.setFail();
                code.addMessage(e.getMessage());
            }
        }
        return code;
    }

    /**
     * 删除对象
     *
     * @param model
     * @param methods 要验证获取值得方法
     * @param validnullvalue 是否要验证空值
     * @return
     */
    public static BasicImplCode delObject(CustomerInfor model, String[] methods, boolean validnullvalue) {
        BasicImplCode code = new BasicImplCode();
        boolean validsuc = true;
        if (validnullvalue) {
            validsuc = methods == null ? BasicImplCode.forEachNullValueValid(model, code) : BasicImplCode.forEachNullValueValid(model, code, methods);
        }
        if (validsuc) {
            cn.skyatom.db.basic.StatmentExcutor<CustomerInfor> exc = Glob.getDBFactory().getStatmentExcutor("wc.sm", "CustomerInfor_delobject", "CustomerInfor");
            exc.setQueryObject(model);
            exc.finishExcute(false);
            try {
                if (exc.excuteQuery()) {
                    code.setSucess();
                } else {
                    code.setFail();
                    code.addMessage("操作错误");
                }
            } catch (Exception e) {
                exc.free();
                code.setFail();
                code.addMessage(e.getMessage());
            }
        }
        return code;
    }

    /**
     * 更新查询
     *
     * @param obj 目标对象
     * @param model
     * @param methods 要验证获取值得方法
     * @param validnullvalue 是否要验证空值
     * @return
     */
    public static BasicImplCode updateObject(CustomerInfor obj, CustomerInfor model, String[] methods, boolean validnullvalue) {
        BasicImplCode code = new BasicImplCode();
        boolean validsuc = true;
        if (validnullvalue) {
            validsuc = methods == null ? BasicImplCode.forEachNullValueValid(model, code) : BasicImplCode.forEachNullValueValid(model, code, methods);
        }
        if (validsuc) {
            cn.skyatom.db.basic.StatmentExcutor<CustomerInfor> exc = Glob.getDBFactory().getStatmentExcutor("wc.sm", "CustomerInfor_updateobject", "CustomerInfor");
            exc.setQueryObject(obj);
            exc.setValueObject(model);
            exc.finishExcute(false);
            try {
                if (exc.excuteQuery()) {
                    code.setSucess();
                } else {
                    code.setFail();
                    code.addMessage("操作错误");
                }
            } catch (Exception e) {
                exc.free();
                code.setFail();
                code.addMessage(e.getMessage());
            }
        }
        return code;
    }

    /**
     * 获取详情
     *
     * @param model
     * @param methods 要验证获取值得方法
     * @param validnullvalue 是否要验证空值
     * @return
     */
    public static BasicImplCode<CustomerInfor> getObject(CustomerInfor model, String[] methods, boolean validnullvalue) {
        BasicImplCode<CustomerInfor> code = new BasicImplCode();
        boolean validsuc = true;
        if (validnullvalue) {
            validsuc = methods == null ? BasicImplCode.forEachNullValueValid(model, code) : BasicImplCode.forEachNullValueValid(model, code, methods);
        }
        if (validsuc) {
            cn.skyatom.db.basic.StatmentExcutor<CustomerInfor> exc = Glob.getDBFactory().getStatmentExcutor("wc.sm", "CustomerInfor_queryobject", "CustomerInfor");
            exc.addExtParameter("@ext_page", " limit 0,1 ");
            exc.setQueryObject(model);
            exc.finishResult(false);
            try {
                CustomerInfor m = exc.getFirstObject();
                if (m == null) {
                    code.setFail();
                    code.addMessage("空数据");
                } else {
                    code.setSucess();
                    code.setValue(m);
                }
            } catch (Exception e) {
                exc.free();
                code.setFail();
                code.addMessage(e.getMessage());
            }
        }
        return code;
    }

    /**
     * 一般化统计
     *
     * @param model
     * @param methods
     * @param validnullvalue
     * @return
     */
    public static BasicImplCode<Integer> getCount(CustomerInfor model, String[] methods, boolean validnullvalue) {
        BasicImplCode<Integer> code = new BasicImplCode();
        boolean validsuc = true;
        if (validnullvalue) {
            validsuc = methods == null ? BasicImplCode.forEachNullValueValid(model, code) : BasicImplCode.forEachNullValueValid(model, code, methods);
        }
        if (validsuc) {
            cn.skyatom.db.basic.StatmentExcutor<CustomerInfor> exc = Glob.getDBFactory().getStatmentExcutor("wc.sm", "CustomerInfor_countobject", "CustomerInfor");
            exc.setQueryObject(model);
            exc.finishResult(false);
            try {
                cn.skyatom.db.basic.Result rs = exc.getResult();
                rs.next();
                int count = rs.getInt("num");
                code.setSucess();
                code.setValue(count);
            } catch (Exception e) {
                exc.free();
                code.setFail();
                code.addMessage(e.getMessage());
            }
        }
        return code;
    }
}
