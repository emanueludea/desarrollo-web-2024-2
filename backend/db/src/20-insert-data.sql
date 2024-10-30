BEGIN;

INSERT INTO
    professor (dni, name, surname)
VALUES
    ('1010101010', 'camilo', 'perez'),
    ('1010101011', 'santiago', 'penagos'),
    ('1010101012', 'mariana', 'botero'),
    ('1010101013', 'ana', 'acosta');

INSERT INTO
    faculty (name, dean_id)
VALUES
    ('ingeniería', '1010101010'),
    ('enfermería', '1010101011'),
    ('educación', '1010101012');

INSERT INTO
    degree (name, faculty_id)
VALUES
    (
        'electrónica',
        (
            SELECT
                id
            FROM
                faculty
            WHERE
                name = 'ingeniería'
            LIMIT
                1
        )
    ),
    (
        'enfermería clínica',
        (
            SELECT
                id
            FROM
                faculty
            WHERE
                name = 'enfermería'
            LIMIT
                1
        )
    ),
    (
        'licenciatura en lengua extranjera',
        (
            SELECT
                id
            FROM
                faculty
            WHERE
                name = 'educación'
            LIMIT
                1
        )
    );

INSERT INTO
    course (code, name, credits)
VALUES
    ('mat0001', 'matematicas I', 3),
    ('prg0001', 'progamación I', 4),
    ('ped0001', 'pedagogía I', 5),
    ('fis0001', 'fisiología I', 4);

INSERT INTO
    student (dni, names, surname, date_of_birth)
VALUES
    ('2020202020', 'pepito', 'perez', '2000-10-01'),
    ('2020202021', 'pedro', 'andrade', '2001-06-02'),
    ('2020202022', 'camila', 'lopez', '2002-12-11'),
    ('2020202023', 'antonia', 'gómez', '2003-08-20'),
    ('2020202024', 'martina', 'mejía', '2004-05-16'),
    ('2020202025', 'jose', 'carabalí', '2005-02-04'),
    (
        '2020202026',
        'isabella',
        'santillana',
        '2006-09-04'
    ),
    ('2020202027', 'jesus', 'correa', '1995-11-21'),
    ('2020202028', 'camilo', 'sarmiento', null);

INSERT INTO
    enrollment (course_code, student_dni, semester)
VALUES
    ('mat0001', '2020202020', '20241'),
    ('prg0001', '2020202020', '20241'),
    ('fis0001', '2020202021', '20241'),
    ('ped0001', '2020202022', '20241'),
    ('ped0001', '2020202023', '20241'),
    ('prg0001', '2020202024', '20241'),
    ('prg0001', '2020202025', '20241'),
    ('fis0001', '2020202026', '20241'),
    ('prg0001', '2020202027', '20241'),
    ('mat0001', '2020202027', '20241');

COMMIT;