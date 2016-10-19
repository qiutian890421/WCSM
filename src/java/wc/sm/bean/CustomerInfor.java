package wc.sm.bean;
public class CustomerInfor{
	private String ID = null;
	public static final String DB_ID="_ID";
	public static final String SQLU_ID="U@_ID";
	public static final String SQLQ_ID="@_ID";
	public void setID(String value){
		this.ID=value;
	}	 public String getID(){
		return this.ID;
	}
	private String UserName = null;
	public static final String DB_USERNAME="_USERNAME";
	public static final String SQLU_USERNAME="U@_USERNAME";
	public static final String SQLQ_USERNAME="@_USERNAME";
	public void setUserName(String value){
		this.UserName=value;
	}	 public String getUserName(){
		return this.UserName;
	}
	private String PassWords = null;
	public static final String DB_PASSWORDS="_PASSWORD";
	public static final String SQLU_PASSWORDS="U@_PASSWORD";
	public static final String SQLQ_PASSWORDS="@_PASSWORD";
	public void setPassWords(String value){
		this.PassWords=value;
	}	 public String getPassWords(){
		return this.PassWords;
	}
	private String UPAY = null;
	public static final String DB_UPAY="_UPAY";
	public static final String SQLU_UPAY="U@_UPAY";
	public static final String SQLQ_UPAY="@_UPAY";
	public void setUPAY(String value){
		this.UPAY=value;
	}	 public String getUPAY(){
		return this.UPAY;
	}
	private Boolean Freeze = null;
	public static final String DB_FREEZE="_FREEZE";
	public static final String SQLU_FREEZE="U@_FREEZE";
	public static final String SQLQ_FREEZE="@_FREEZE";
	public void setFreeze(Boolean value){
		this.Freeze=value;
	}	 public Boolean getFreeze(){
		return this.Freeze;
	}
	private Boolean Valid = null;
	public static final String DB_VALID="_VALID";
	public static final String SQLU_VALID="U@_VALID";
	public static final String SQLQ_VALID="@_VALID";
	public void setValid(Boolean value){
		this.Valid=value;
	}	 public Boolean getValid(){
		return this.Valid;
	}
	private Long CreateTime = null;
	public static final String DB_CREATETIME="_CREATETIME";
	public static final String SQLU_CREATETIME="U@_CREATETIME";
	public static final String SQLQ_CREATETIME="@_CREATETIME";
	public void setCreateTime(Long value){
		this.CreateTime=value;
	}	 public Long getCreateTime(){
		return this.CreateTime;
	}
}