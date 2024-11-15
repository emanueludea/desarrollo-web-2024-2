import jwt from "jsonwebtoken";

const secret = "MyS3cr3tK3y.";
const maxAge = "10m";
const forgedToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImVtYW51ZWwxIiwicm9sIjoiYWRtaW4iLCJpYXQiOjE3MzExMDI1MjQsImV4cCI6MTczMTEwMzEyNH0.dT3cAf2AEjdgxK49NMqMTdK1-EfRYyjuI-7-SQKj3J8";
// "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImVtYW51ZWwiLCJyb2wiOiJhZG1pbiIsImlhdCI6MTczMTEwMjE5MywiZXhwIjoxNzMxMTAyMTk0fQ.6Kq9FNSu4dxbsYExZoiqtmMPqHs93qyuTxJjPamuN1Q";
export const createToken = (userData) => {
  return jwt.sign(userData, secret, { expiresIn: maxAge });
};

export const checkToken = (token) => {
  try {
    const result = jwt.verify(token, secret);
    console.log(result, token);
    return true;
  } catch (err) {
    if (err instanceof TokenExpiredError) {
      console.log("el token está vencido");
    }
    console.log(err);
    return false;
  }
};

const data = { username: "emanuel fernando", rol: "admin" };
const token = createToken(data);
// setTimeout(() => {
//   console.log(data, token, checkToken(forgedToken));
// }, 2000);

console.log(
  "1",
  checkToken(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImVtYW51ZWwxIiwicm9sIjoiYWRtaW4iLCJpYXQiOjE3MzExMDI1MjQsImV4cCI6MTczMTEwMzEyNH0.dT3cAf2AEjdgxK49NMqMTdK1-EfRYyjuI-7-SQKj3J8"
  )
);
console.log(
  "2",
  checkToken(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImVtYW51ZWwgZmVybmFuZG8iLCJyb2wiOiJhZG1pbiIsImlhdCI6MTczMTEwMjY3NSwiZXhwIjoxNzMxMTAzMjc1fQ.pEe8m3lrtT--INcDcY6j57aVRfRVRrF2f4ucB7rteiM"
  )
);
console.log(
  "3",
  checkToken(
    " eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImVtYW51ZWwgZmVybmFuZG8iLCJyb2wiOiJhZG1pbiIsImlhdCI6MTczMTEwMjU2NywiZXhwIjoxNzMxMTAzMTY3fQ.wq41T6RTRQWZXhN0YWRpqMjTljkz675uAho6qmibirY"
  )
);
