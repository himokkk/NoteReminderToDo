package com.noderemindertodo.nodesreminderstodos;

import org.springframework.data.jpa.repository.JpaRepository;

public interface NoteRepository extends JpaRepository<Note, Integer> { }
