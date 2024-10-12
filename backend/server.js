const { default: http } = await import("http");

const server = http.createServer((req, res)=>{
    console.log(req.method, req.path);
    res.writeHead(210, {"content-type": "application/json"});
    res.write('Hola');
    res.end();
});

server.listen(8080, ()=>{
    console.log("Servidor escuchando en el puerto 8080");
});