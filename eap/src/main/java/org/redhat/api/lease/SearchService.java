package org.redhat.api.lease;

import java.util.List;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.hibernate.search.jpa.FullTextEntityManager;
import org.hibernate.search.jpa.FullTextQuery;
import org.hibernate.search.jpa.Search;
import org.hibernate.search.query.dsl.QueryBuilder;
import org.jboss.logging.Logger;

@Stateless
public class SearchService {
    @PersistenceContext
    private EntityManager em;

    private static Logger log = Logger.getLogger(SearchService.class.getName());

    public PageModel search(String offset, String pageSize, String filter) {
        FullTextEntityManager fullTextEntityManager = Search.getFullTextEntityManager(em);

        QueryBuilder qb = fullTextEntityManager
                .getSearchFactory()
                .buildQueryBuilder()
                .forEntity(LeaseModel.class)
                .get();

        if (filter == null || filter.trim().length() < 1) {
            log.info("Setting filter to wildcard");
            filter = "*";
        } else {
            filter = "*" + filter.toLowerCase().trim() + "*";
        }

        org.apache.lucene.search.Query luceneQuery = qb
                .keyword()
                .wildcard()
                .onFields("leaseNumber", "city", "address", "state", "leaseName", "annualRent")
                .matching(filter)
                .createQuery();

        FullTextQuery jpaQuery = fullTextEntityManager.createFullTextQuery(luceneQuery, LeaseModel.class);

        if (offset != null) {
            jpaQuery.setFirstResult(Integer.valueOf(offset));
        }

        if (pageSize != null) {
            jpaQuery.setMaxResults(Integer.valueOf(pageSize));
        }

        int count = jpaQuery.getResultSize();

        @SuppressWarnings("unchecked")
        List<LeaseModel> list = jpaQuery.getResultList();

        PageModel page = new PageModel(count, list);
        return page;

    }
}