package com.noderemindertodo.nodesreminderstodos.todo;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name="todo")
public class ToDo {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Column(name="text", nullable = false)
    private String text;

    @Column(name="isDone", nullable = false)
    private Boolean isDone;

    @Column(name="creationDate")
    @CreationTimestamp
    private LocalDateTime creationDate;

    @Column(name="lastUpdateDate")
    @UpdateTimestamp
    private LocalDateTime lastUpdateDate;

    public ToDo(String text) {
        this.text = text;
        this.isDone = false;
    }

    public ToDo() {
        this.isDone = false;
    }

    public void setText (String attrib) {
        this.text = attrib == null ? "" : attrib;
    }

    public void setIsDone(Boolean isDone) {
        this.isDone = isDone;
    }

    public Integer getId() {
        return id;
    }

    public String getText() {
        return text;
    }

    public Boolean getIsDone() {
        return isDone;
    }

    public LocalDateTime getCreationDate() {
        return creationDate;
    }

    public LocalDateTime getLastUpdateDate() {
        return lastUpdateDate;
    }
}
