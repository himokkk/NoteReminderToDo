package com.noderemindertodo.nodesreminderstodos.reminder;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ReminderRepository extends JpaRepository<Reminder, Integer> { }
