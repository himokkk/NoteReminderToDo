package com.noderemindertodo.nodesreminderstodos;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.noderemindertodo.nodesreminderstodos.note.Note;
import com.noderemindertodo.nodesreminderstodos.note.NoteRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;

@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
@SpringBootTest
@AutoConfigureMockMvc
public class NoteControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private NoteRepository noteRepository;

    @Test
    public void testGetNoteById() throws Exception {
        Note newNote = new Note("Test note content");
        noteRepository.save(newNote);

        mockMvc.perform(get("/note/{id}", 1))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.text").exists());
    }

    @Test
    public void testCreateNote() throws Exception {
        Note newNote = new Note("Test note content");

        mockMvc.perform(post("/note").contentType("application/json")
            .content(objectMapper.writeValueAsString(newNote)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.text").value("Test note content"));
    }

    @Test
    public void testUpdateNote() throws Exception {
        Note newNote = new Note("Test note content");
        noteRepository.save(newNote);

        Note existingNote = new Note();
        existingNote.setText("Existing note content");

        mockMvc.perform(put("/note/{id}", 1)
                        .contentType("application/json")
                        .content(objectMapper.writeValueAsString(existingNote)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.text").value("Existing note content"));
    }

    @Test
    public void testDeleteNote() throws Exception {
        Note newNote = new Note("Test note content");
        noteRepository.save(newNote);

        mockMvc.perform(delete("/note/{id}", 1))
                .andExpect(status().isNoContent());
    }
}