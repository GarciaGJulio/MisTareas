const fecha = document.querySelector('#fecha')
const input = document.querySelector('#input')
const botonEnter = document.querySelector('#enter')
const lista = document.querySelector('#lista')

const check = 'fa-check-circle'
const uncheck = 'fa-circle'
const lineThrough = 'line-through'
let id 
let LIST 

//FECHA
const FECHA = new Date()
fecha.innerHTML = FECHA.toLocaleDateString('es-MX',{weekday:'long', month:'long', day:'numeric'})



// Funcion Agregar Tarea
function agregarTarea (tarea,id, realizado, eliminado){

    if(eliminado){return}
    
    const REALIZADO = realizado ?check :uncheck //uso de operadores ternarios, ?true :false, condicional indica que si realizado es true ? entonces ejecute check y sino : uncheck
    
    const line = realizado ?lineThrough :''


    const elemento =    `<li id="elemento">
                        <i class="far ${REALIZADO} co" data="realizado" id="${id}"></i>
                        <p class="text ${line}"> ${tarea}</p>
                        <i class="fas fa-trash de" data="eliminado" id="${id}"></i>
                        </li>
                        ` //ascii para comillas de acento (backticks) alt+96, transforma el html en texto
    
    lista.insertAdjacentHTML("beforeend", elemento) //insertar elemento en el html
}

//Funcion tarea realizada

function tareaRealizada(element){
    element.classList.toggle(check)
    element.classList.toggle(uncheck)
    element.parentNode.querySelector('.text').classList.toggle(lineThrough)
    LIST[element.id].realizado = LIST[element.id].realizado ?false :true
   
   

}

//Funcion tarea eliminada

function tareaEliminada(element){
    element.parentNode.parentNode.removeChild(element.parentNode)
    LIST[element.id].eliminado = true
}

//llamar a la funcion tarea para agregar la tarea con el icono +

botonEnter.addEventListener('click',()=>{
    const tarea = input.value 
    if(tarea){
        agregarTarea(tarea,id,false,false)
        LIST.push({
            nombre:tarea,
            id:id,
            realizado:false,
            eliminado:false

        })
    }
    console.log(LIST)
    console.log(input.value)
    console.log(id)

    input.value = ''
    console.log(input.value)

    localStorage.setItem('TODO',JSON.stringify(LIST))
    id++
    console.log(id)

    


})

//agregar tarea usando el enter

document.addEventListener('keyup', function(event){ //llamo al metodo AddEventListener desde el document, keyup evento para detectar cuando se suelta una tecla
    if(event.key=='Enter'){ //evalúo si la tecla es enter que se soltó es Enter
        const tarea = input.value
        if(tarea){
            agregarTarea(tarea,id,false,false)
            LIST.push({
                nombre:tarea,
                id:id,
                realizado:false,
                eliminado:false
    
            })

        }
        localStorage.setItem('TODO',JSON.stringify(LIST))

        input.value=''
        id++

    }
})

//Listener del check

lista.addEventListener('click',function(event){
    const element = event.target //targuet nos devuelve el bloque de codigo al que se le hizo clic
    const elementData = element.attributes.data.value /*Attributes nos crea un NameNodeMap con los identificadores del elemento al que se le dio clic, luego .data selecciona ese elemento y .value devuelve el valor del elemento data */
    if(elementData==='realizado') {
        tareaRealizada(element)
    }
    else if(elementData==='eliminado'){
        tareaEliminada(element)
    }

    localStorage.setItem('TODO',JSON.stringify(LIST))
    
})


// local storage get item

let data = localStorage.getItem('TODO')
if (data) {
    LIST = JSON.parse(data)
    id = LIST.length
    cargarLista(LIST)
} 
else {
    LIST = []
    id = 0
}

function cargarLista(array) {
        array.forEach(function(item){
            agregarTarea(item.nombre, item.id, item.realizado, item.eliminado)
            
        });
}

