BEGIN transaction;

create table facultades(
    id smallserial primary key,
    nombre text not null
);
create table profesores(
    cedula varchar(10) primary key,
    nombres text not null,
    apellidos text not null,
    id_facultad_dirige smallint references facultades (id)
);

create table carreras(
    id smallserial primary key,
    nombre text not null,
    id_facultad smallint references facultades
);

create table alumnos(
    cedula varchar(10) primary key,
    nombres text not null,
    apellidos text not null,
    fecha_nacimiento date null,
    id_carrera smallint,

    constraint fk_id_carrera
     foreign key (id_carrera) 
     REFERENCES carreras (id)
);
create table cursos(
    codigo varchar(8) primary key,
    nombre text not null,
    creditos smallint not null,
    id_profesor varchar(10) references profesores (cedula)
);

create table matriculas(
    codigo_curso varchar(8) references cursos (codigo),
    cedula_alumno varchar(10) references alumnos (cedula),
    semestre varchar(5) not null, -- 20242
    nota decimal,
    constraint pk_matriculas
      primary key (codigo_curso, cedula_alumno, semestre)
);

COMMIT transaction;

BEGIN transaction;
insert into facultades (nombre) values('ingeniería'), ('enfermería'), ('educación');
COMMIT transaction;