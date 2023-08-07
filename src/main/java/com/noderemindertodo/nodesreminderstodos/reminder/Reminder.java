package com.noderemindertodo.nodesreminderstodos.reminder;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.cglib.core.Local;

import java.time.LocalDateTime;

@Entity
@Table(name="reminder")
public class Reminder {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Column(name="text", nullable=false)
    private String text;

    @Column(name="reminderTime", nullable = false)
    private LocalDateTime reminderTime;

    @Column(name="creationDate")
    @CreationTimestamp
    private LocalDateTime creationDate;

    @Column(name="lastUpdateDate")
    @UpdateTimestamp
    private LocalDateTime lastUpdateDate;

    public Reminder(String text, LocalDateTime reminderTime) {
        this.text = text;
        this.reminderTime = reminderTime;
    }

    public Reminder() {}

    public void setText (String attrib) {
        this.text = attrib == null ? "" : attrib;
    }

    public void setReminderTime(LocalDateTime reminderTime) {
        this.reminderTime = reminderTime;
    }

    public Integer getId() {
        return id;
    }

    public String getText() {
        return text;
    }

    public LocalDateTime getReminderTime() {
        return reminderTime;
    }

    public LocalDateTime getCreationDate() {
        return creationDate;
    }

    public LocalDateTime getLastUpdateDate() {
        return lastUpdateDate;
    }
}
