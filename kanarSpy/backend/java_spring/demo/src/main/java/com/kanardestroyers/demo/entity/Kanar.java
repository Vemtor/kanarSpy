package com.kanardestroyers.demo.entity;


import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name="kanar")
public class Kanar {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private int id;

    @Column(name="birth_time")
    private Date birthTime;

    @Column(name="line")
    private int linie;


    @Column(name="stop")
    private String stop;

    @Column(name="coordinates")
    private String coordinates;

    public Kanar(){


    }

    public Kanar(Date birthTime, int linie, String stop, String coordinates) {
        this.birthTime = birthTime;
        this.linie = linie;
        this.stop = stop;
        this.coordinates = coordinates;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Date getBirthTime() {
        return birthTime;
    }

    public void setBirthTime(Date birthTime) {
        this.birthTime = birthTime;
    }

    public int getLinie() {
        return linie;
    }

    public void setLinie(int linie) {
        this.linie = linie;
    }

    public String getStop() {
        return stop;
    }

    public void setStop(String stop) {
        this.stop = stop;
    }

    public String getCoordinates() {
        return coordinates;
    }

    public void setCoordinates(String coordinates) {
        this.coordinates = coordinates;
    }

    @Override
    public String toString() {
        return "Kanar{" +
                "id=" + id +
                ", birthTime=" + birthTime +
                ", linie=" + linie +
                ", stop='" + stop + '\'' +
                ", coordinates='" + coordinates + '\'' +
                '}';
    }
}
