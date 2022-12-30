let total=document.getElementById("total");
let carroCompras=document.getElementById("carrito-compras");

fetch("../assets/javascript/data.json")
.then(resp=>resp.json())
.then(obj=>{
    productos=obj
    funcionCarrito()
})
.catch(error=>console.log(error))

function funcionCarrito(){
    function calculo(){
        let numeroCarro=document.querySelector("#numero-carrito");
        let suma=carro.reduce((suma,value)=>{return suma+value.cantidadCarro},0) 
        numeroCarro.textContent="("+suma+")";
    }
    
    calculo();
    
    let valorTotal=0;
    function generarProductosCarrito (){
        if(carro.length !==0){
            let tablaCarrito=document.getElementById("tablaCarrito");
            let dataHtml="";
            for (let i of carro ){
                
                let id=i.id;
                let producto=productos[id-1];
                let nombre=producto.nombre;
                let cantidad=i.cantidadCarro;
                let precio= producto.precio;
                let subTotal=cantidad*precio;
                valorTotal=subTotal+valorTotal;
    
                dataHtml+=`<tr> <th>${nombre}</th>
                                <td class="text-center"><button id=${id} class="btn-disminuirCarro" >-</button>${cantidad}<button id=${id} class="btn-aumentarCarro" >+</button></td>
                                <td class="text-center">$${precio}</td>
                                <td class="text-center">$${subTotal} </td>
                                <td class="text-center"><button id=${id} class="btn-eliminar" >x</button></td></tr>`;
            }
            //total y despacio para descuento y total
            dataHtml+=`<tr class="sinLinea"> <th></th> 
            <td></td>
            <th class="text-center">Total:</th>
            <th id="valorTotal" class="text-center">$${valorTotal}</th> </tr>
            <tr id="descuentoFila" class="sinLinea text-center" ></tr>
            <tr id="totalDescuentoFila" class="sinLinea text-center"></tr>`;
    
            //cupon de descuento y vaciar carro
            let descuento=document.getElementById("descuento")
            let dataHtml2= ` 
            <div class="descuento ">
              <input id="input-descuento" type="text" class="input-descuento">
              <button id="boton-descuento" class="btn-descuento" >APLICAR</button> 
            </div>
            <div class="descuento10OFF"><p> Usa 10OFF para un 10% de descuento.</p></div> 
            <div class="vaciarCarro">
              <button id="boton-vaciarCarro" class="btn-vaciarCarro"  >Vaciar carro</button> 
            </div>`
    
            //botones volver, pago
            let finalCarro=document.getElementById("final-carro")
            let dataHtml3=`
            <button class="btn btn-success" href="#">Proceder al pago -></button>  
            `
    
            tablaCarrito.innerHTML=dataHtml;
            descuento.innerHTML=dataHtml2;
            finalCarro.innerHTML=dataHtml3;
            
        }
        else{
            tablaCarrito.innerHTML=`
            <h3 class="mt-5 text-right">El carro esta vacio!</h3>
          `
        }
        
    }
    
    let cupones=""
    function descuento(){
        let cupon=document.getElementById("input-descuento").value
        if (cupones==="10OFF"){    
            alert("Ya aplicaste este cupon!");
        }
        else{
            if (cupon==="10OFF"){
                cupones="10OFF";
                
                let desc=0.1*valorTotal;
                let totalDescuento=valorTotal-desc;
    
                let descuentoFila=document.getElementById("descuentoFila")
                let dataHtml=`<th class="text-center"></th>
                <th class="text-center"></th>
                <td class="text-center">Descuento:</td>
                <td class="text-center">-$${desc}</td>`;
                descuentoFila.innerHTML=dataHtml;
    
                let totalDescuentoFila=document.getElementById("totalDescuentoFila")
                let dataHtml2=`<th class="text-center"></th>
                <th class="text-center"></th>
                <th class="text-center">Total con Descuento:</th>
                <th class="text-center">$${totalDescuento}</th>`;
                totalDescuentoFila.innerHTML=dataHtml2;
            }
            else{
                alert("Cupon no valido")
            }
        }
        
    }
    
    function eliminar(id){
        buscarProducto=carro.find((x)=>{ return x.id===parseInt(id)}) 
        carro=carro.filter((x)=>{return x !=buscarProducto})
        localStorage.setItem("data",JSON.stringify(carro))
        location.reload()
        
        
    }
    
    function vaciarCarro(){
        carro=[]
        localStorage.setItem("data",JSON.stringify(carro))
        location.reload()
    }
    
    
    generarProductosCarrito()
    
    //leer botones disminuir carro
    const disminuirCarro=document.querySelectorAll(".btn-disminuirCarro");
    for (let i=0;i<disminuirCarro.length;i++){
        disminuirCarro[i].addEventListener("click",()=>{
            id=disminuirCarro[i].id;
            disminuir(id);
            location.reload();
        })
    }
    
    //leer botones aumentar carro
    const aumentarCarro=document.querySelectorAll(".btn-aumentarCarro");
    for (let i=0;i<aumentarCarro.length;i++){
        aumentarCarro[i].addEventListener("click",()=>{
            id=aumentarCarro[i].id;
            aumentar(id);
            location.reload();
        })
    }
    //leer eliminar item
    
    const eliminarItem=document.querySelectorAll(".btn-eliminar");
    
    for (let i=0;i<eliminarItem.length;i++){
        eliminarItem[i].addEventListener("click",()=>{
            console.log("Hola leo el boton")
            id=eliminarItem[i].id;
            eliminar(id);
            
        })
    }
    
    //leer aplicarDescuento
    
    document.querySelector("#boton-descuento").addEventListener("click",()=>{descuento()})
    
    
    
    //leer vaciarCarro
    
    document.querySelector("#boton-vaciarCarro").addEventListener("click",()=>{vaciarCarro()})
    
    
    
}
