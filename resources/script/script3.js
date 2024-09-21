console.log('iniciamos')
setTimeout(function(){
    console.log('Ya tengo la respuesta');
}, 1000);
console.log('terminamos')

function miFuncion(err, succ, x ,y){
    if(x > y){
        return err('mensaje')
    }
    succ(x+y)
}

function call1(){
    console.log('tuvimos exito');
}
function call2(){
    console.log('fallamos');
}
// miFuncion(call2, call1, 300, 40)

function uno(x){
    console.log('Empieza uno');
    setTimeout(function (){
        console.log('miCallback')
        setTimeout(function(){
            console.log('miCallback2');
            setTimeout(function(){
                console.log('miCallback3');
                if(x<0) throw new Error
            }, 2000);        
        }, 2000);        
    }, 1000);
    console.log('termina uno');
}
// uno()

function miFuncion2(x, y){
    return new Promise((suc, rej)=>{
        if(x > y){
            suc('Lo Logramos')
        }
        rej(80)
    });
}


// miFuncion2(200,40).then((val)=>{
//     console.log(val);
// }).catch((a)=>{
//     console.log(a);
// });

async function miFuncion3(){
    console.log('Funcion3')
    try{
        let a = await miFuncion2(250,50);
        console.log(a);
    }catch(err){
        console.log(err);
    }
}

miFuncion3()