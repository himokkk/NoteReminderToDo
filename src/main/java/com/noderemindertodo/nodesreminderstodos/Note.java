package com.noderemindertodo.nodesreminderstodos;


import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name="note")
public class    Note {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Column(name="text", nullable=false)
    private String text;

    @Column(name="creationDate")
    @CreationTimestamp
    private LocalDateTime creationDate;

    @Column(name="lastUpdateDate")
    @UpdateTimestamp
    private LocalDateTime lastUpdateDate;

    public Note(String text) {
        this.text = text;
    }

    public Note() {}

    public void setText (String attrib) {
        this.text = attrib == null ? "" : attrib;
    }

    public Integer getId() {
        return id;
    }

    public String getText() {
        return text;
    }

    public LocalDateTime getCreationDate() {
        return creationDate;
    }

    public LocalDateTime getLastUpdateDate() {
        return lastUpdateDate;
    }
}
