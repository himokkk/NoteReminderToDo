package com.noderemindertodo.nodesreminderstodos.reminder;

import com.noderemindertodo.nodesreminderstodos.ResourceNotFoundException;
import com.noderemindertodo.nodesreminderstodos.reminder.Reminder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reminder")
public class ReminderController {

    @Autowired
    private ReminderRepository reminderRepository;

    @GetMapping()
    public ResponseEntity<List<Reminder>> getReminders() {
        return ResponseEntity.ok(reminderRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Reminder> getReminderById(@PathVariable Integer id) {
        Reminder reminder = reminderRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Reminder of id: {id} not found"));
        return ResponseEntity.ok(reminder);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Reminder> changeReminderText(@PathVariable Integer id, @RequestBody Reminder requestedReminder) {
        Reminder existingReminder = reminderRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Reminder of id: {id} not found"));

        existingReminder.setText(requestedReminder.getText());
        Reminder savedReminder = reminderRepository.save(existingReminder);
        return ResponseEntity.ok(savedReminder);
    }

    @PostMapping()
    public ResponseEntity<Reminder> createReminder(@RequestBody Reminder reminder) {
        Reminder savedReminder = reminderRepository.save(reminder);
        return ResponseEntity.ok(savedReminder);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Reminder> deleteReminder(@PathVariable Integer id)  {
        reminderRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Reminder of id: {id} not found"));

        reminderRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
