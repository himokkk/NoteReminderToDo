package com.noderemindertodo.nodesreminderstodos;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.noderemindertodo.nodesreminderstodos.todo.ToDo;
import com.noderemindertodo.nodesreminderstodos.todo.ToDoRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
@SpringBootTest
@AutoConfigureMockMvc
public class ToDoControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private ToDoRepository toDoRepository;

    @Test
    public void testGetToDoById() throws Exception {
        ToDo newToDo = new ToDo("Test toDo content");
        toDoRepository.save(newToDo);

        mockMvc.perform(get("/todo/{id}", 1))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.text").exists());
    }

    @Test
    public void testCreateToDo() throws Exception {
        ToDo newToDo = new ToDo("Test toDo content");

        mockMvc.perform(post("/todo").contentType("application/json")
                        .content(objectMapper.writeValueAsString(newToDo)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.text").value("Test toDo content"));
    }

    @Test
    public void testUpdateToDo() throws Exception {
        ToDo newToDo = new ToDo("Test toDo content");
        toDoRepository.save(newToDo);

        ToDo existingToDo = new ToDo();
        existingToDo.setText("Existing toDo content");

        mockMvc.perform(patch("/todo/{id}", 1)
                        .contentType("application/json")
                        .content(objectMapper.writeValueAsString(existingToDo)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.text").value("Existing toDo content"));

        existingToDo.setIsDone(true);
        mockMvc.perform(patch("/todo/{id}", 1)
                        .contentType("application/json")
                        .content(objectMapper.writeValueAsString(existingToDo)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.isDone").value(true));
    }

    @Test
    public void testDeleteToDo() throws Exception {
        ToDo newToDo = new ToDo("Test toDo content");
        toDoRepository.save(newToDo);

        mockMvc.perform(delete("/todo/{id}", 1))
                .andExpect(status().isNoContent());
    }
}