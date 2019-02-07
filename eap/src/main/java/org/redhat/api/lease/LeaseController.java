package org.redhat.api.lease;

import java.util.HashMap;
import java.util.List;

import javax.inject.Inject;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path("lease")
@Produces(MediaType.APPLICATION_JSON)
public class LeaseController {
	
	@Inject
	private LeaseService LeaseService;	

	@GET
	public List<LeaseModel> getAllItems() {
				
		List<LeaseModel> items = LeaseService.findAll();
		return items;
	}
	
	@GET
	@Path("/{id}")
	public LeaseModel getItem(@PathParam("id") String id) {
		
		LeaseModel item = LeaseService.findById(id);
		return item;
	}

	@POST
	public LeaseModel createItem(LeaseModel item) {
		
		LeaseModel savedItem = LeaseService.createItem(item);
		return savedItem;
	}
	
	@PUT
	public LeaseModel updateItem(LeaseModel item) {
		
		LeaseModel updatedItem = LeaseService.updateItem(item);
		return updatedItem;
	}
	
	@DELETE
	@Path("/{id}")
	public HashMap<String,Boolean> deleteItem(@PathParam("id") String id) {
		
		HashMap<String,Boolean> status = new HashMap<String,Boolean>();
		status.put("isDeleted", LeaseService.deleteItem(id));

		return status;
	}

}
