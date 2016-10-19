/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package wc.sm.v1.impl;

import wc.sm.bean.CustomerInfor;
import wc.sm.bean.ResultSet;
import wc.sm.v1.impl.basic.BasicCustomerInfor;

/**
 * 客户账号操作模块
 *
 * @author Administrator
 */
public class CustomerInforExcutor {

    public static final int SUC = 0;//成功
    public static final int ERR = 1;//失败
    public static final String MSG = "系统繁忙,请稍候再试!";

    /**
     * 登录验证
     *
     * @param username 登录手机账号
     * @param password 登录密码
     * @return
     */
    public static ResultSet loginValidate(String username, String password) {
        int code = ERR;
        String msg = MSG;
        try {
            CustomerInfor model = new CustomerInfor();
            model.setUserName(username);
            int count = BasicCustomerInfor.getCount(model, null, false).getValue();
            if (count > 0) {
                model.setPassWords(password);
                count = BasicCustomerInfor.getCount(model, null, false).getValue();
                if (count > 0) {
                    model.setFreeze(false);
                    count = BasicCustomerInfor.getCount(model, null, false).getValue();
                    if (count > 0) {
                        model.setValid(true);
                        count = BasicCustomerInfor.getCount(model, null, false).getValue();
                        if (count == 0) {
                            msg = "账号未激活";
                        } else {
                            code = SUC;
                            msg = "登录成功";
                        }
                    } else {
                        msg = "账号已被冻结";
                    }
                } else {
                    msg = "密码错误";
                }
            } else {
                msg = "该手机号未注册";
            }
        } catch (Exception e) {
        }
        ResultSet r = new ResultSet();
        r.setCODE(code);
        r.setMSG(msg);
        return r;
    }

    /**
     * 验证登录手机号是否存在
     *
     * @param telephone 手机号(登录账号)
     * @return
     */
    public static ResultSet telValidate(String telephone) {
        int code = ERR;
        String msg = MSG;
        ResultSet r = new ResultSet();
        try {
            Boolean m = glob.Glob.validateTelePhone(telephone);
            if (!m) {
                msg = "手机号格式不正确";
            } else {
                CustomerInfor model = new CustomerInfor();
                model.setUserName(telephone);
                int count = wc.sm.v1.impl.basic.BasicCustomerInfor.getCount(model, null, false).getValue();
                code = SUC;
                if (count == 0) {
                    r.setEXISTS(false);
                    msg = "不存在手机号";
                } else {
                    r.setEXISTS(true);
                    msg = "存在手机号";
                }
            }

        } catch (Exception e) {
        }

        r.setCODE(code);
        r.setMSG(msg);
        return r;
    }

    /**
     * 注册账号
     *
     * @param username 登录手机号
     * @param password 登录密码
     * @param upay 支付密码
     * @return
     */
    public static ResultSet registerCustomer(String username, String password, String upay) {
        int code = ERR;
        String msg = MSG;
        ResultSet r = new ResultSet();
        try {
            ResultSet d = telValidate(username);
            if (!d.getEXISTS()) {
                CustomerInfor model = new CustomerInfor();
                Long createtime = System.currentTimeMillis();
                model.setUserName(username);
                model.setID(cn.skyatom.common.Common.getUUID());
                model.setPassWords(password);
                model.setUPAY(upay);
                model.setFreeze(false);
                model.setValid(true);
                model.setCreateTime(createtime);
                code = wc.sm.v1.impl.basic.BasicCustomerInfor.insertObject(model, null, false).getStatus() ? SUC : ERR;
                if (code == SUC) {
                    msg = "注册成功";
                } else {
                    msg = "注册失败";
                }
                r.setCODE(code);
                r.setMSG(msg);
                return r;

            } else {
                return d;
            }
        } catch (Exception e) {
            r.setCODE(code);
            r.setMSG(msg);
            return r;
        }
    }

    /**
     * 重置密码
     *
     * @param username
     * @param password
     * @return
     */
    public static ResultSet resetPasd(String username, String password) {
        int code = ERR;
        String msg = MSG;
        ResultSet r = new ResultSet();
        try {
            ResultSet d = telValidate(username);
            if (d.getEXISTS()) {
                CustomerInfor model = new CustomerInfor();
                CustomerInfor _model = new CustomerInfor();
                _model.setUserName(username);
                model.setPassWords(password);
                code = BasicCustomerInfor.updateObject(_model, model, null, false).getStatus() ? SUC : ERR;
                if (code == SUC) {
                    msg = "重置密码成功";
                } else {
                    msg = "重置密码失败";
                }
                r.setCODE(code);
                r.setMSG(msg);
                return r;
            } else {
                return d;
            }

        } catch (Exception e) {
            r.setMSG(msg);
            r.setCODE(code);
            return r;
        }
    }

    /**
     * 修改密码
     *
     * @param username
     * @param oldpassword
     * @param password
     * @return
     */
    public static ResultSet updatePasd(String username, String oldpassword, String password) {
        int code = ERR;
        String msg = MSG;
        ResultSet r = new ResultSet();
        try {
            ResultSet d = telValidate(username);
            if (d.getEXISTS()) {
                CustomerInfor model = new CustomerInfor();
                CustomerInfor _model = new CustomerInfor();
                _model.setUserName(username);
                _model.setPassWords(oldpassword);
                int count = BasicCustomerInfor.getCount(_model, null, false).getValue();
                if (count == 0) {
                    msg = "旧密码输入错误";
                } else {
                    model.setPassWords(password);
                    code = BasicCustomerInfor.updateObject(_model, model, null, false).getStatus() ? SUC : ERR;
                    if (code == SUC) {
                        msg = "重置密码成功";
                    } else {
                        msg = "重置密码失败";
                    }
                }
                r.setCODE(code);
                r.setMSG(msg);
                return r;
            } else {
                return d;
            }

        } catch (Exception e) {
            r.setMSG(msg);
            r.setCODE(code);
            return r;
        }
    }

}
