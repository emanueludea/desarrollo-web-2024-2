class EnrollmentService {
  create = async (dni, courseCode, semester) => {
    const client = new Db();
    try {
      console.log("enrollCourse at StudentService");
      const results = await client.query(
        `INSERT INTO
              enrollment (course_code, student_dni, semester)
        VALUES
            ($1, $2, $3)
        RETURNING course_code, student_dni, semester;`,
        [courseCode, dni, semester]
      );
      console.log(results);
      return results.rows[0];
    } catch (error) {
      console.log("error at enrolling student on course", error);
      throw new CustomError(error.code, error.detail);
    }
  };
}
export { EnrollmentService };
