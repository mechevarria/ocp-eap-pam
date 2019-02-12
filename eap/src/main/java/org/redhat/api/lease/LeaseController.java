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
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

@Path("lease")
@Produces(MediaType.APPLICATION_JSON)
public class LeaseController {

	@Inject
	private LeaseService LeaseService;

	@GET
	public PageModel getPaged(@QueryParam("offset")String offset, @QueryParam("pageSize")String pageSize) {
		
		List<LeaseModel> leases = LeaseService.findByPage(offset, pageSize);
		long count = LeaseService.getCount();

		PageModel page = new PageModel(count, leases);
		return page;
	}

	@GET
	@Path("/{id}")
	public LeaseModel getLease(@PathParam("id") String id) {

		LeaseModel lease = LeaseService.findById(id);
		return lease;
	}

	@POST
	public LeaseModel createLease(LeaseModel lease) {

		LeaseModel savedItem = LeaseService.createLease(lease);
		return savedItem;
	}

	@PUT
	public LeaseModel updateLease(LeaseModel lease) {

		LeaseModel updatedLease = LeaseService.updateLease(lease);
		return updatedLease;
	}

	@PUT
	@Path("/status")
	public LeaseModel updateStatus(@QueryParam("id") String id, @QueryParam("status") String status) {
		LeaseModel lease = LeaseService.findById(id);
		lease.setStatus(status);

		LeaseModel updatedLease = LeaseService.updateLease(lease);
		return updatedLease;
	} 

	@DELETE
	@Path("/{id}")
	public HashMap<String, Boolean> deleteLease(@PathParam("id") String id) {

		HashMap<String, Boolean> status = new HashMap<String, Boolean>();
		status.put("isDeleted", LeaseService.deleteLease(id));

		return status;
	}

}
