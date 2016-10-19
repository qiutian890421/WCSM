/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package glob;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;

/**
 * Web application lifecycle listener.
 *
 * @author ZWK
 */
@WebListener()
public class ApplicationStartListener implements ServletContextListener {

    @Override
    public void contextInitialized(ServletContextEvent sce) {
        String contenxtpath = sce.getServletContext().getContextPath();
        Glob.setContextPath(contenxtpath);
        String dbconfig = sce.getServletContext().getInitParameter("dbconfig");
        String beanfile = sce.getServletContext().getInitParameter("beanfile");
        String dbfile = sce.getServletContext().getInitParameter("dbfile");
        String stpath = sce.getServletContext().getInitParameter("stpath");
        String webhost = sce.getServletContext().getInitParameter("webhost");
        String realpath = sce.getServletContext().getRealPath("");
        String formValidErrPage_ajax = sce.getServletContext().getInitParameter("formValidErrPage_ajax");
        String formValidErrPage_form = sce.getServletContext().getInitParameter("formValidErrPage_form");
        Glob.setRealPath(realpath);
        if (dbconfig.indexOf(":") < 0) {
            dbconfig = realpath + "/" + dbconfig;
        }
        if (beanfile.indexOf(":") < 0) {
            beanfile = realpath + "/" + beanfile;
        }
        if (dbfile.indexOf(":") < 0) {
            dbfile = realpath + "/" + dbfile;
        }
        if (stpath.indexOf(":") < 0) {
            stpath = realpath + "/" + stpath;
        }
        try {
            Glob.initDB(dbconfig, beanfile, dbfile, stpath);
         
            System.out.println("启动成功：" + Glob.APP_NAME);
//            new wc.oa.weichat.TokenThread().start();
//            StartAppLi_MAllBindExcutor.view();
        } catch (Exception e) {
            System.out.println("\t\t****[" + Glob.APP_NAME + "    ver:" + Glob.APP_VER + "  for:" + Glob.APP_MALL + "  启动失败]*");
            e.printStackTrace();
            System.out.println("\n\n");
        }

    }

    @Override
    public void contextDestroyed(ServletContextEvent sce) {
        Glob.closeDataBaseFactory();
        System.out.println("完成");
    }
}
