package es.codeurjc.mastercloudapps.p3.worker;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class NewTask {

    @Id
    public int id;
    public String text;
}