package org.redhat.api.lease;

import java.io.Serializable;
import java.util.List;

public class PageModel implements Serializable {

    private static final long serialVersionUID = 1L;

    private List<LeaseModel> leases;
    private int count;

    public PageModel(int count, List<LeaseModel> leases) {
        this.count = count;
        this.leases = leases;
    }

    // generated methods below

    public List<LeaseModel> getLeases() {
        return this.leases;
    }

    public void setLeases(List<LeaseModel> leases) {
        this.leases = leases;
    }

    public int getCount() {
        return this.count;
    }

    public void setCount(int count) {
        this.count = count;
    }

};