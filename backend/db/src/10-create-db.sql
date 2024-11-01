BEGIN;

CREATE TABLE
    professor (
        dni VARCHAR(10) PRIMARY KEY,
        name TEXT NOT NULL,
        lastname TEXT NOT NULL --,
        -- id_facultad_dirige SMALLINT REFERENCES facultades (id) -- un profesor puede no dirigir una facultad
    );

CREATE TABLE
    faculty (
        id smallserial PRIMARY KEY,
        name TEXT NOT NULL,
        dean_id VARCHAR(10) REFERENCES professor (dni) UNIQUE NOT NULL -- toda facultad debería tener un profesor que la dirija
    );

CREATE TABLE
    degree (
        id smallserial PRIMARY KEY,
        name TEXT NOT NULL,
        faculty_id SMALLINT REFERENCES faculty
    );

CREATE TABLE
    student (
        dni VARCHAR(10) PRIMARY KEY,
        names TEXT NOT NULL,
        lastname TEXT NOT NULL,
        date_of_birth date NULL,
        degree_id SMALLINT,
        constraint degree_id FOREIGN KEY (degree_id) REFERENCES degree (id)
    );

CREATE TABLE
    course (    
        code VARCHAR(8) PRIMARY KEY,
        name TEXT NOT NULL,
        credits SMALLINT NOT NULL,
        professor_id VARCHAR(10) REFERENCES professor (dni)
    );

CREATE TABLE
    enrollment (
        course_code VARCHAR(8) REFERENCES course (code),
        student_dni VARCHAR(10) REFERENCES student (dni),
        semester VARCHAR(5) NOT NULL, -- 20242
        grade DECIMAL,
        CONSTRAINT enrollment_pk PRIMARY KEY (course_code, student_dni, semester)
    );

COMMIT;