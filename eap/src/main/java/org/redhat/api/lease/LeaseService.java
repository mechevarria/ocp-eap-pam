package org.redhat.api.lease;

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

	public LeaseModel createItem(LeaseModel item) {

		em.persist(item);
		em.flush();

		return item;
	}

	public LeaseModel updateItem(LeaseModel item) {
		
		// find the existing item in the db
		LeaseModel updated = em.find(LeaseModel.class, item.getId());

		// merge the existing model with the model passed in
		updated = em.merge(item);

		return updated;
	}

	public boolean deleteItem(String id) {
		LeaseModel toDelete = em.find(LeaseModel.class, Long.valueOf(id));

		toDelete = em.merge(toDelete);
		em.remove(toDelete);

		return true;

	}

}
