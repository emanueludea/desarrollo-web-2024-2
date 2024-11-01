curl -X GET localhost:8081/faculties -i
curl -X GET localhost:8081/degrees -i
curl -X GET localhost:8081/courses -i
curl -X GET localhost:8081/professors -i
curl -X GET localhost:8081/students -i

curl -X GET localhost:8081/faculties/1 -i
curl -X GET localhost:8081/degrees/1 -i
curl -X GET localhost:8081/courses/prg0001 -i
curl -X GET localhost:8081/professors/1010101010 -i
curl -X GET localhost:8081/students/2020202020 -i

curl -X POST -H "content-type: application/json" -H "accept-content: application/json" localhost:8081/faculties -d '{"name": "nueva facultad", "dean_id": "1010101013"}' -i
curl -X POST -H "content-type: application/json" -H "accept-content: application/json" localhost:8081/degrees -d '{"name": "nueva carrera", "faculty_id": 1}' -i
curl -X POST -H "content-type: application/json" -H "accept-content: application/json" localhost:8081/courses  -d '{"code": "pgr0009", "name": "programacion 9", "credits": 5}' -i
curl -X POST -H "content-type: application/json" -H "accept-content: application/json" localhost:8081/professors -d '{"dni": "2020202030", "names": "nuevo profesor", "lastname": "de carrera"}' -i
curl -X POST -H "content-type: application/json" -H "accept-content: application/json" localhost:8081/students -d '{"dni":"1010101021", "names": "nuevo estudiante", "lastname": "de carrera", "dateOfBith": "2000-01-01"}' -i

curl -X PUT -H "content-type: application/json" -H "accept-content: application/json" localhost:8081/faculties/3 -d '{"name": "Facultad editada", "dean_id": "1010101013"}' -i
curl -X PUT -H "content-type: application/json" -H "accept-content: application/json" localhost:8081/degrees/1 -d '{"name": "carrera editada", "faculty_id": 1}' -i
curl -X PUT -H "content-type: application/json" -H "accept-content: application/json" localhost:8081/courses/mat0001  -d '{"name": "materia editada", "credits": 5}' -i
curl -X PUT -H "content-type: application/json" -H "accept-content: application/json" localhost:8081/professors/1010101010 -d '{"names": "profesor editado", "lastname": "de edicion"}' -i
curl -X PUT -H "content-type: application/json" -H "accept-content: application/json" localhost:8081/students/2020202020 -d '{"names": "estudiante editadp", "lastname": "de edicion", "dateOfBith": "2000-10-01"}' -i

curl -X DELETE localhost:8081/faculties/1 -i
curl -X DELETE localhost:8081/degrees/1 -i
curl -X DELETE localhost:8081/courses/prg0001 -i
curl -X DELETE localhost:8081/professors/1010101010 -i
curl -X DELETE localhost:8081/students/2020202020 -i
