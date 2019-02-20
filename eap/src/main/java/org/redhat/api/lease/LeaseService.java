package org.redhat.api.lease;

import java.sql.Date;
import java.util.List;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;

import org.hibernate.search.jpa.FullTextEntityManager;
import org.hibernate.search.jpa.FullTextQuery;
import org.hibernate.search.jpa.Search;
import org.hibernate.search.query.dsl.QueryBuilder;
import org.jboss.logging.Logger;

@Stateless
public class LeaseService {

	@PersistenceContext
	private EntityManager em;

	private static Logger log = Logger.getLogger(LeaseService.class.getName());

	public List<LeaseModel> search(String offset, String pageSize, String filter) {

		FullTextEntityManager fullTextEntityManager = Search.getFullTextEntityManager(em);

		try {
			fullTextEntityManager.createIndexer().startAndWait();
		} catch (Exception ex) {
			log.error("Error while creating index: " + ex.getMessage());
		}

		QueryBuilder qb = fullTextEntityManager.getSearchFactory().buildQueryBuilder().forEntity(LeaseModel.class)
				.get();

		if (filter == null || filter.trim().length() < 1) {
			log.info("Setting filter to new wildcard");
			filter = "*";
		}

		org.apache.lucene.search.Query luceneQuery = qb.keyword().wildcard()
				.onFields("leaseNumber", "city", "address", "state", "leaseName").matching(filter).createQuery();

		FullTextQuery jpaQuery = fullTextEntityManager.createFullTextQuery(luceneQuery, LeaseModel.class);

		if (offset != null) {
			jpaQuery.setFirstResult(Integer.valueOf(offset));
		}

		if (pageSize != null) {
			jpaQuery.setMaxResults(Integer.valueOf(pageSize));
		}

		int total = jpaQuery.getResultSize();
		log.info("Total count is " + total);

		@SuppressWarnings("unchecked")
		List<LeaseModel> list = jpaQuery.getResultList();

		return list;

	}

	public Long getCount() {
		CriteriaBuilder qb = em.getCriteriaBuilder();
		CriteriaQuery<Long> cq = qb.createQuery(Long.class);
		cq.select(qb.count(cq.from(LeaseModel.class)));
		return em.createQuery(cq).getSingleResult();
	}

	public LeaseModel findById(String id) {

		return em.find(LeaseModel.class, Long.valueOf(id));
	}

	public LeaseModel findByProcessInstanceId(String processInstanceId) {
		TypedQuery<LeaseModel> query = em.createQuery(
				"SELECT i FROM LeaseModel i WHERE i.processInstanceId = :processInstanceId", LeaseModel.class);
		query.setParameter("processInstanceId", Integer.valueOf(processInstanceId));

		return query.getSingleResult();
	}

	public LeaseModel createLease(LeaseModel lease) {

		em.persist(lease);
		em.flush();

		return lease;
	}

	public LeaseModel updateLease(LeaseModel lease) {

		lease.setLastUpdateDate(new Date(System.currentTimeMillis()));

		// find the existing item in the db
		LeaseModel updated = em.find(LeaseModel.class, lease.getId());

		// merge the existing model with the model passed in
		updated = em.merge(lease);

		return updated;
	}

	public LeaseModel updateProcessId(String id, String processInstanceId) {
		LeaseModel lease = em.find(LeaseModel.class, Long.valueOf(id));
		lease.setProcessInstanceId(Integer.valueOf(processInstanceId));

		em.merge(lease);

		return lease;
	}

	public boolean deleteLease(String id) {
		LeaseModel toDelete = em.find(LeaseModel.class, Long.valueOf(id));

		toDelete = em.merge(toDelete);
		em.remove(toDelete);

		return true;

	}

}
