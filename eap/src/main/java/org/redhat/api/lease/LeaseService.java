package org.redhat.api.lease;

import java.sql.Date;
import java.util.List;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;

@Stateless
public class LeaseService {

	@PersistenceContext
	private EntityManager em;

	public List<LeaseModel> findAll() {

		TypedQuery<LeaseModel> query = em.createQuery("SELECT i FROM LeaseModel i", LeaseModel.class);
		
		List<LeaseModel> list = query.getResultList();
		
		return list;
	}

	public LeaseModel findById(String id) {

		return em.find(LeaseModel.class, Long.valueOf(id));
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

	public boolean deleteLease(String id) {
		LeaseModel toDelete = em.find(LeaseModel.class, Long.valueOf(id));

		toDelete = em.merge(toDelete);
		em.remove(toDelete);

		return true;

	}

}
