CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author TEXT,
    url TEXT NOT NULL,
    title TEXT NOT NULL,
    likes INTEGER DEFAULT 0
);

INSERT INTO blogs (author, url, title, likes)
VALUES ('Markus', 'https://example.com/eka', 'Markuksen blogi', 5);

INSERT INTO blogs (author, url, title)
VALUES ('Jarkko', 'https://example.com/toka', 'Jaren blogi');