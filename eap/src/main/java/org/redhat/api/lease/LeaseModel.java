package org.redhat.api.lease;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import org.hibernate.search.annotations.Field;
import org.hibernate.search.annotations.FieldBridge;
import org.hibernate.search.annotations.Indexed;
import org.hibernate.search.bridge.builtin.IntegerBridge;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.io.Serializable;
import java.sql.Date;

@Entity
@Indexed
@JsonIgnoreProperties(ignoreUnknown = true)
public class LeaseModel implements Serializable {

  private static final long serialVersionUID = -7384751271101505737L;

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long id;

  @Field
  private String leaseNumber;

  @Field
  private String city;

  @Field
  private String address;

  @Field
  private String state;
  private float lat;
  private float lon;

  @Field
  @FieldBridge(impl = IntegerBridge.class)
  private int annualRent;

  @Field
  private String leaseName;
  private String status;
  private Date lastUpdateDate;
  private int processInstanceId;

  // everything below is a generated getter/setter

  public long getId() {
    return this.id;
  }

  public void setId(long id) {
    this.id = id;
  }

  public int getProcessInstanceId() {
    return this.processInstanceId;
  }

  public void setProcessInstanceId(int processInstanceId) {
    this.processInstanceId = processInstanceId;
  }

  public Date getLastUpdateDate() {
    return this.lastUpdateDate;
  }

  public void setLastUpdateDate(Date lastUpdateDate) {
    this.lastUpdateDate = lastUpdateDate;
  }

  public String getStatus() {
    return this.status;
  }

  public void setStatus(String status) {
    this.status = status;
  }

  public String getLeaseName() {
    return this.leaseName;
  }

  public void setLeaseName(String leaseName) {
    this.leaseName = leaseName;
  }

  public int getAnnualRent() {
    return this.annualRent;
  }

  public void setAnnualRent(int annualRent) {
    this.annualRent = annualRent;
  }

  public String getState() {
    return this.state;
  }

  public void setState(String state) {
    this.state = state;
  }

  public float getLat() {
    return this.lat;
  }

  public void setLat(float lat) {
    this.lat = lat;
  }

  public float getLon() {
    return this.lon;
  }

  public void setLon(float lon) {
    this.lon = lon;
  }

  public String getLeaseNumber() {
    return this.leaseNumber;
  }

  public void setLeaseNumber(String leaseNumber) {
    this.leaseNumber = leaseNumber;
  }

  public String getCity() {
    return this.city;
  }

  public void setCity(String city) {
    this.city = city;
  }

  public String getAddress() {
    return this.address;
  }

  public void setAddress(String address) {
    this.address = address;
  }

}
