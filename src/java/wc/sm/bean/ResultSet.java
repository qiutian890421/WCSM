/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package wc.sm.bean;

/**
 *
 * @author Administrator
 */
public class ResultSet {

    private String MSG = null;
    private Integer CODE = null;
    private Boolean EXISTS = null;
    private Object LIST = null;

    /**
     * @return the MSG
     */
    public String getMSG() {
        return MSG;
    }

    /**
     * @param MSG the MSG to set
     */
    public void setMSG(String MSG) {
        this.MSG = MSG;
    }

    /**
     * @return the CODE
     */
    public Integer getCODE() {
        return CODE;
    }

    /**
     * @param CODE the CODE to set
     */
    public void setCODE(Integer CODE) {
        this.CODE = CODE;
    }

    /**
     * @return the EXISTS
     */
    public Boolean getEXISTS() {
        return EXISTS;
    }

    /**
     * @param EXISTS the EXISTS to set
     */
    public void setEXISTS(Boolean EXISTS) {
        this.EXISTS = EXISTS;
    }

    /**
     * @return the LIST
     */
    public Object getLIST() {
        return LIST;
    }

    /**
     * @param LIST the LIST to set
     */
    public void setLIST(Object LIST) {
        this.LIST = LIST;
    }
}
