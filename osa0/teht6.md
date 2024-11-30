sequenceDiagram
    participant browser
    participant server

    Note right of browser: The user writes a notes and presses "Tallenna".

    browser->>browser: The note is added locally to the DOM in the browser's memory.

    Note right of browser: JavaScript displays the note on the page.

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    Note right of server: The server receives new note as: { content: "Uusi SPA-muistiinpano", date: "YYYY-MM-DD" }
    server-->>browser: HTTP 201 Created
    deactivate server

    Note right of browser: The new note remains visible, and the page does not reload.