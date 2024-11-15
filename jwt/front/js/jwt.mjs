const data = {
  user: "emanuel",
  pass: "1234"
}
const options = {
  method: "GET",
  headers: {
      // sessionStorage.getItem("token")
      "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiZW1hbnVlbCIsInJvbCI6InVzZXIiLCJpYXQiOjE3MzE1NDU1NTYsImV4cCI6MTczMTU0OTE1Nn0.FBXPCQqTczP-TFEKCT9sBGdktz4MynVVF3bstNiR7pU"
  }
}
const result = await fetch("http://localhost:3000/users", options);
console.log(result);
const token = await result.json();
console.log(token);
// sessionStorage.setItem("token", token);
// localStorage.setItem("token", token)
console.log("del session storage", sessionStorage.getItem("token"));
console.log("del local storage", localStorage.getItem("token"));
