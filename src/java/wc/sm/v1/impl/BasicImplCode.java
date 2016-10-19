/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package wc.sm.v1.impl;

import java.lang.reflect.Method;

/**
 * 基础验证代码
 *
 * @author ZWK
 */
public class BasicImplCode<T> {

    private T value = null;

    public void setValue(T o) {
        this.value = o;
    }

    public T getValue() {
        return this.value;
    }

    /**
     * 循环验证空值
     *
     * @param obj 实例化的对象
     * @param method 获取bean属性的方法
     * @param code 实例化代码
     * @return 当全部满足验证条件，返回true
     */
    public static boolean forEachNullValueValid(Object obj, BasicImplCode code) {
        boolean suc = true;
        java.lang.reflect.Method[] fields = obj.getClass().getDeclaredMethods();
        for (java.lang.reflect.Method f : fields) {
            if (f.getName().startsWith("set")) {
                continue;
            }
            try {
                if (getObjValueNULL(obj, f.getName())) {
                    suc = false;
                    code.addMessage("[" + zwk.com.basic.Common.getDateTime(System.currentTimeMillis(), "yyyy-MM-dd HH:mm:ss") + " NullValueValid err] : 方法" + f.getName() + "的值为空");
                    break;
                }
            } catch (Exception e) {
                e.printStackTrace();
                return false;
            }
        }
        return suc;
    }

    /**
     * 循环验证空值
     *
     * @param obj 实例化的对象
     * @param code 实例化代码
     * @param method 获取bean属性的方法
     * @return 当全部满足验证条件，返回true
     */
    public static boolean forEachNullValueValid(Object obj, BasicImplCode code, String method[]) {
        boolean suc = true;
        if (method == null) {
            suc = false;
            try {
                code.addMessage("[" + zwk.com.basic.Common.getDateTime(System.currentTimeMillis(), "yyyy-MM-dd HH:mm:ss") + " NullValueValid err] : 没有待验证的方法");
            } catch (Exception e) {
            }
            return suc;
        }
        for (String m : method) {
            try {
                if (getObjValueNULL(obj, m)) {
                    suc = false;
                    code.addMessage("[" + zwk.com.basic.Common.getDateTime(System.currentTimeMillis(), "yyyy-MM-dd HH:mm:ss") + " NullValueValid err] : 方法" + m + "的值为空");
                    break;
                }
            } catch (Exception e) {
                return false;
            }
        }
        return suc;
    }

    /**
     * 验证对象某属性是否为空
     *
     * @param obj 对象
     * @param methodname 方法名称
     * @return 当属性为空时，返回true
     */
    public static boolean getObjValueNULL(Object obj, String methodname) throws Exception {
        boolean suc = true;
        Method method = obj.getClass().getDeclaredMethod(methodname);
        suc = method.invoke(obj) == null;
        return suc;
    }

    /**
     * 是否验证空值
     */
    public static boolean VALID_NULLVALUE = true;
    private boolean suc = false;//是否操作成功
    private java.util.List<String> messages = new java.util.ArrayList<String>();

    public boolean getStatus() {
        return this.suc;
    }

    public void addMessage(String msg) {
        try {
            messages.add("[" + zwk.com.basic.Common.getDateTime(System.currentTimeMillis(), "yyyy-MM-dd HH:mm:ss") + " BasicImpl Err]:" + msg);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void setFail() {
        this.suc = false;
    }

    public void setSucess() {
        this.suc = true;
    }
    private int codevalue = -1;

    public void setCodeValue(int code) {
        this.codevalue = code;
    }

    public int getCodeValue() {
        return this.codevalue;
    }

    /**
     * 获取消息
     *
     * @return
     */
    public java.util.List<String> getMessages() {
        return this.messages;
    }
}
