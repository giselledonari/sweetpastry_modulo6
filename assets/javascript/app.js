//leer botones mas
const agregar=document.querySelectorAll(".btn-mas");
for (let i=0;i<agregar.length;i++){
    agregar[i].addEventListener("click",()=>{
        let id=agregar[i].id
        aumentar(id)
    })
}

//leer botones menos
const quitar=document.querySelectorAll(".btn-menos");
for (let i=0;i<quitar.length;i++){
    quitar[i].addEventListener("click",()=>{
        let id=quitar[i].id
        disminuir(id)
    })
}
//leerjason
let productos
fetch("../assets/javascript/data.json")
.then(resp=>resp.json())
.then((obj)=>{productos=obj})
.catch(error=>console.log(error))


//crear carro
let carro=JSON.parse(localStorage.getItem("data"))||[];

//funcion para agregar al carro
function aumentar(id){
    let producto=productos[id-1];

    let buscarProducto=carro.find((x)=>{ return x.id===producto.id}) //busca el producto en el carro, find puede encontrar subindices

    if (buscarProducto===undefined){
        if (producto.inventario>0){
            carro.push({
            id:producto.id,
            cantidadCarro:1,
        })
        }
        else{
            alert(`No quedan ${producto.nombre} en la tienda`)
        }
       
    }
    else{
        // se agrega restriccion del inventario
        if (buscarProducto.cantidadCarro<producto.inventario){
            buscarProducto.cantidadCarro+=1;
        }
        else{
            alert(`Solo quedan ${producto.inventario} ${producto.nombre}`)
        }
        
    }
    
    localStorage.setItem("data",JSON.stringify(carro));//guardar el carro en el localstorage
    //console.log(carro);
    actualizar(producto.id);
}

//funcion para quitar del carro (de a 1)
function disminuir(id){
    let producto=productos[id-1];
    let buscarProducto=carro.find((x)=>{ return x.id===producto.id}) 

    if (buscarProducto===undefined ||buscarProducto.cantidadCarro===0){// si la cantidad es 0 o no existe en el carro, que no haga nada
        return
    }
    else{
        buscarProducto.cantidadCarro-=1; //ahora restamos
    }
    actualizar(producto.id); 
    carro=carro.filter((x)=>{return x.cantidadCarro !=0})
    console.log(carro);
    localStorage.setItem("data",JSON.stringify(carro)); //guardar el carro en el localstorage
}

//funcion que actualiza las cantidades en el carrito
function actualizar (id){
    let buscarProducto=carro.find((x)=>{return x.id===id })
    idCantidad="#cantidad"+id;
    
    if (document.querySelector(idCantidad)){
        document.querySelector(idCantidad).textContent=buscarProducto.cantidadCarro;
    }

    calculo();
    
    
}

//funcion que calcula el numero del carrito
function calculo(){
    let numeroCarro=document.querySelector("#numero-carrito");
    let suma=carro.reduce((suma,value)=>{return suma+value.cantidadCarro},0)
    numeroCarro.textContent="("+suma+")";

}
//actualiza las cantidades en los cuadritos blancos de los botones
function actualizarCantidades(){
    for (producto of carro){
        id="cantidad"+producto.id;
        cantidad=producto.cantidadCarro;
        if (document.getElementById(id)){
            document.getElementById(id).textContent=cantidad;
        }
    }
}

calculo()
actualizarCantidades()

