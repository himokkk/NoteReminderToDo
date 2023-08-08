package com.noderemindertodo.nodesreminderstodos.todo;

import com.noderemindertodo.nodesreminderstodos.ResourceNotFoundException;
import com.noderemindertodo.nodesreminderstodos.note.Note;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/todo")
public class ToDoController {
    @Autowired
    private ToDoRepository toDoRepository;

    @GetMapping()
    public ResponseEntity<List<ToDo>> getToDos() {
        return ResponseEntity.ok(toDoRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ToDo> getToDoById(@PathVariable Integer id) {
        ToDo exisitingToDo = toDoRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("ToDo of id: {id} not found")
        );

        return ResponseEntity.ok(exisitingToDo);
    }

    @PostMapping()
    public ResponseEntity<ToDo> createToDo(@RequestBody ToDo toDo) {
        ToDo savedToDo = toDoRepository.save(toDo);
        return ResponseEntity.ok(savedToDo);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<ToDo> changeToDo(@PathVariable Integer id, @RequestBody ToDo updatedToDo) {
        ToDo existingToDo = toDoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("ToDo not found with id: " + id));

        if (updatedToDo.getText() != null) {
            existingToDo.setText(updatedToDo.getText());
        }

        if (updatedToDo.getIsDone() != null) {
            existingToDo.setIsDone(updatedToDo.getIsDone());
        }

        ToDo savedToDo = toDoRepository.save(existingToDo);
        return ResponseEntity.ok(savedToDo);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ToDo> deleteNote(@PathVariable Integer id)  {
        toDoRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("ToDo of id: {id} not found"));

        toDoRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
