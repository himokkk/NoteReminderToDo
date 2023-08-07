package com.noderemindertodo.nodesreminderstodos.note;

import com.noderemindertodo.nodesreminderstodos.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/note")
public class NoteController {
    @Autowired
    private NoteRepository noteRepository;

    @GetMapping()
    public ResponseEntity<List<Note>> getNotes() {
        return ResponseEntity.ok(noteRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Note> getNoteById(@PathVariable Integer id) {
        Note note = noteRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Note of id: {id} not found"));
        return ResponseEntity.ok(note);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Note> changeNoteText(@PathVariable Integer id, @RequestBody Note requestedNote) {
        Note existingNote = noteRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Note of id: {id} not found"));

        existingNote.setText(requestedNote.getText());
        Note savedNote = noteRepository.save(existingNote);
        return ResponseEntity.ok(savedNote);
    }

    @PostMapping()
    public ResponseEntity<Note> createNote(@RequestBody Note note) {
        Note savedNote = noteRepository.save(note);
        return ResponseEntity.ok(savedNote);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Note> deleteNote(@PathVariable Integer id)  {
            noteRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Note of id: {id} not found"));

        noteRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
