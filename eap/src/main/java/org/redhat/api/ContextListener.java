package org.redhat.api;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;

import org.hibernate.search.jpa.Search;
import org.hibernate.search.jpa.FullTextEntityManager;
import org.jboss.logging.Logger;
 
@WebListener
public class ContextListener implements ServletContextListener {

    @PersistenceContext
	private EntityManager em;

    private static Logger log = Logger.getLogger(ContextListener.class.getName());
 
    @Override
    public void contextDestroyed(ServletContextEvent arg0) {
        log.info("Server stopped");
    }
 
    @Override
    public void contextInitialized(ServletContextEvent arg0) {
        FullTextEntityManager fullTextEntityManager = Search.getFullTextEntityManager(em);

        try {
            log.info("Server started. Creating search index");
            fullTextEntityManager.createIndexer().startAndWait();
        } catch (Exception ex) {
            log.error("Error while creating search index: " + ex.getMessage());
        }
    }
}