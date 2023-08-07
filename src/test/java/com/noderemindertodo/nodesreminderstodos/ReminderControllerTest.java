package com.noderemindertodo.nodesreminderstodos;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.noderemindertodo.nodesreminderstodos.reminder.Reminder;
import com.noderemindertodo.nodesreminderstodos.reminder.ReminderRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDateTime;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
@SpringBootTest
@AutoConfigureMockMvc
public class ReminderControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private ReminderRepository reminderRepository;

    @Test
    public void testGetReminderById() throws Exception {
        LocalDateTime reminderTime = LocalDateTime.now().plusMinutes(2);
        Reminder newReminder = new Reminder("Test reminder content", reminderTime);
        reminderRepository.save(newReminder);

        mockMvc.perform(get("/reminder/{id}", 1))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.text").exists());
    }

    @Test
    public void testCreateReminder() throws Exception {
        LocalDateTime reminderTime = LocalDateTime.now().plusMinutes(2);
        Reminder newReminder = new Reminder("Test reminder content", reminderTime);

        mockMvc.perform(post("/reminder").contentType("application/json")
                        .content(objectMapper.writeValueAsString(newReminder)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.text").value("Test reminder content"));
    }

    @Test
    public void testUpdateReminder() throws Exception {
        LocalDateTime reminderTime = LocalDateTime.now().plusMinutes(2);
        Reminder newReminder = new Reminder("Test reminder content", reminderTime);
        reminderRepository.save(newReminder);

        Reminder existingReminder = new Reminder();
        existingReminder.setText("Existing reminder content");

        mockMvc.perform(put("/reminder/{id}", 1)
                        .contentType("application/json")
                        .content(objectMapper.writeValueAsString(existingReminder)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.text").value("Existing reminder content"));
    }

    @Test
    public void testDeleteReminder() throws Exception {
        LocalDateTime reminderTime = LocalDateTime.now().plusMinutes(2);
        Reminder newReminder = new Reminder("Test reminder content", reminderTime);
        reminderRepository.save(newReminder);

        mockMvc.perform(delete("/reminder/{id}", 1))
                .andExpect(status().isNoContent());
    }
}
