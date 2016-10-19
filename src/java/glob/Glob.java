package glob;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.URL;
import java.net.URLConnection;
import java.security.MessageDigest;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * 全局变量设置
 *
 * @author 邹汶珂
 * @version 1.0 创建时间：2014-2-24
 */
public class Glob {

    public static final cn.skyatom.db.basic.Common COMMON = new cn.skyatom.db.basic.Common();
    public static final String APP_NAME = "《王朝服务市场》";
    public static final String APP_VER = "1.0";
    public static final String APP_MALL = "服务市场——by 王朝电子商务";
    public static final String APP_CODE = "skyatomcn";//当前应用的CODE
    public static final String ZIP_PWD = "qj";
    private static cn.skyatom.db.basic.DataBaseFactory dbf;
    private static String realpath = "";
    private static String contextpath = "";
    public static final String SMSKEY = "3424df86d78a52d1fdd880e9bebc760a";//短信接口密码
    public static final String OAURLGETSIGNKEY = "http://oa2.jinpaikefu.com/WCOA_v2/getSignKey.jsp"; //oa接口KEY地址
    public static final String OAURLDATA = "http://oa2.jinpaikefu.com/WCOA_v2/over/data"; //oa接口地址

    /**
     * 替换ajax传递中的转义字符，单引号
     *
     * @param html
     * @return
     */
    public static final String replaceAjaxHTMLSignS(String html) {
        String str = html;
        str = str.replaceAll("<", "&lt;");
        str = str.replaceAll("\\\\", "\\\\\\\\");
        str = str.replaceAll("\'", "\\\\\'");
        str = str.replaceAll("\n", "\\\\n");
        return str;
    }

    /**
     * 替换ajax传递中的转义字符，双引号引号
     *
     * @param html
     * @return
     */
    public static final String replaceAjaxHTMLSignD(String html) {
        String str = html;
        str = str.replaceAll("<", "&lt;");
        str = str.replaceAll("\\\\", "\\\\\\\\");
        str = str.replaceAll("\"", "\\\\\"");
        str = str.replaceAll("\n", "\\\\n");
        return str;
    }

    /**
     * 字符串转时间
     *
     * @param strDate 时间字符串
     * @param format 匹配的时间格式
     * @return 时间毫秒数
     */
    public static long getStrDateToTime(String strDate, String format) {
        SimpleDateFormat sdf = new SimpleDateFormat(format);
        Date date = null;
        try {
            date = sdf.parse(strDate);
        } catch (ParseException e) {
            return -1;
        }
        return date.getTime();
    }

    /**
     * 转化转义字符
     *
     * @param str 待转义的字符串
     * @return
     */
    public static final String replaceESC(String str) {
        String s = str.replaceAll("&", "&amp;");
        s = s.replaceAll("<", "&lt");
        s = s.replaceAll("\"", "&quot;");
        s = s.replaceAll("\'", "&apos;");
        return s;
    }

    /**
     * 向指定URL发送POST方法的请求
     *
     * @param url 发送请求的URL
     * @param param 请求参数，请求参数应该是name1=value1&name2=value2的形式。
     * @return URL所代表远程资源的响应
     */
    public static String sendPost(String url, String param) {
        PrintWriter out = null;
        BufferedReader in = null;
        String result = "";
        try {
            URL realUrl = new URL(url);
            // 打开和URL之间的连接  
            URLConnection conn = realUrl.openConnection();
            // 设置通用的请求属性  
            conn.setRequestProperty("accept", "*/*");
            conn.setRequestProperty("connection", "Keep-Alive");
            conn.setRequestProperty("user-agent",
                    "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1)");
            // 发送POST请求必须设置如下两行  
            conn.setDoOutput(true);
            conn.setDoInput(true);
            // 获取URLConnection对象对应的输出流  
            out = new PrintWriter(conn.getOutputStream());
            // 发送请求参数  
            out.print(param);
            // flush输出流的缓冲  
            out.flush();
            // 定义BufferedReader输入流来读取URL的响应  
            in = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            String line;
            while ((line = in.readLine()) != null) {
                result +=  line;
            }
        } catch (Exception e) {
            System.out.println("发送POST请求出现异常！" + e);
            e.printStackTrace();
        } // 使用finally块来关闭输出流、输入流  
        finally {
            try {
                if (out != null) {
                    out.close();
                }
                if (in != null) {
                    in.close();
                }
            } catch (IOException ex) {
                ex.printStackTrace();
            }
        }
        return result;
    }

    /**
     * 验证是否是手机号
     *
     * @param telephone
     * @return
     */
    public static Boolean validateTelePhone(String telephone) {
        Pattern p = Pattern.compile("^1(3|4|5|7|8)\\d{9}$");
        Matcher m = p.matcher(telephone);
        return m.find();
    }

    /**
     * 获取随机字符串
     *
     * @param numberFlag 是否为纯数字
     * @param length 长度
     * @return
     */
    public static String createRandom(boolean numberFlag, int length) {
        String retStr = "";
        String strTable = numberFlag ? "1234567890" : "1234567890abcdefghijkmnpqrstuvwxyz";
        int len = strTable.length();
        boolean bDone = true;
        do {
            retStr = "";
            int count = 0;
            for (int i = 0; i < length; i++) {
                double dblR = Math.random() * len;
                int intR = (int) Math.floor(dblR);
                char c = strTable.charAt(intR);
                if (('0' <= c) && (c <= '9')) {
                    count++;
                }
                retStr += strTable.charAt(intR);
            }
            if (count >= 2) {
                bDone = false;
            }
        } while (bDone);
        return retStr;
    }

    public final static String MD5(String s) {
        char hexDigits[] = {'0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'};
        try {
            byte[] btInput = s.getBytes();
            // 获得MD5摘要算法的 MessageDigest 对象
            MessageDigest mdInst = MessageDigest.getInstance("MD5");
            // 使用指定的字节更新摘要
            mdInst.update(btInput);
            // 获得密文
            byte[] md = mdInst.digest();
            // 把密文转换成十六进制的字符串形式
            int j = md.length;
            char str[] = new char[j * 2];
            int k = 0;
            for (int i = 0; i < j; i++) {
                byte byte0 = md[i];
                str[k++] = hexDigits[byte0 >>> 4 & 0xf];
                str[k++] = hexDigits[byte0 & 0xf];
            }
            return new String(str);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    /**
     * 降序排序
     *
     * @param numbers
     */
    public static void intSortLow(int[] numbers) {
        int temp; // 记录临时中间值   
        int size = numbers.length; // 数组大小   
        for (int i = 0; i < size - 1; i++) {
            for (int j = i + 1; j < size; j++) {
                if (numbers[i] < numbers[j]) { // 交换两数的位置   
                    temp = numbers[i];
                    numbers[i] = numbers[j];
                    numbers[j] = temp;
                }
            }
        }
    }

    /**
     * 升序排序
     *
     * @param numbers
     */
    public static void intSortUp(int[] numbers) {
        int temp; // 记录临时中间值   
        int size = numbers.length; // 数组大小   
        for (int i = 0; i < size - 1; i++) {
            for (int j = i + 1; j < size; j++) {
                if (numbers[i] > numbers[j]) { // 交换两数的位置   
                    temp = numbers[i];
                    numbers[i] = numbers[j];
                    numbers[j] = temp;
                }
            }
        }
    }

    /**
     * 获取图片不同尺寸的路径
     *
     * @param imgurl 文件路径
     * @param prefix 大小前缀
     * @return
     */
    public static String getImgPrefixURL(String imgurl, String prefix) {
        int p = imgurl.lastIndexOf("/");
        String path = imgurl.substring(0, p + 1);
        String filename = imgurl.substring(p + 1);
        return path + "/" + prefix + filename;
    }

    public static String getUUID() {
        return java.util.UUID.randomUUID().toString().replaceAll("-", "");
    }

    public static String getContextPath() {
        return contextpath;
    }

    static void setContextPath(String cp) {
        contextpath = cp;
    }

    static void setRealPath(String p) {
        realpath = p;
    }

    public static String getRealPath() {
        return realpath;
    }

    /**
     * 初始化数据库和连接配置
     *
     * @param dbconfig 数据库配置文件路径
     * @param beanfile 实体配置文件路径
     * @param dbfile 数据库表文件配置路径
     * @param stpath sql语句文件夹路径
     */
    public static void initDB(
            String dbconfig,
            String beanfile,
            String dbfile,
            String stpath) throws Exception {
        dbf = new cn.skyatom.db.basic.DataBaseFactory(dbconfig, beanfile, dbfile, stpath);
    }

    public static void closeDataBaseFactory() {
        dbf.closeConnections();
    }

    /**
     * 重置工厂
     */
    public static void resetDBFactory(long cachetime, long looptime) {
        try {
            dbf.reset(cachetime, looptime);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * 重置工厂
     */
    public static void resetDBFactory() {
        try {
            dbf.reset();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * 获取数据库工厂
     *
     * @return
     */
    public static cn.skyatom.db.basic.DataBaseFactory getDBFactory() {
        return dbf;
    }
}
