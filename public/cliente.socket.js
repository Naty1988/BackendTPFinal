const socket = io();

let productosPool = document.querySelector('#productosPool')
const productsForm = document.querySelector('#productsForm')
const nombreInput = document.querySelector('#nombreInput')
const precioInput = document.querySelector('#precioInput')
const urlInput = document.querySelector('#urlInput')

// Productos

// function sendProduct(producto) {
//     socket.emit('client:producto', producto)
// }

// let html

function renderProducto(productos) {
    console.log('productos a renderizar desde client: ', productos)


    // const response = await fetch('/views/productos.ejs')
    // const plantilla = await response.text()
    // productos.forEach(producto => {
    //     const html = ejs.render(plantilla, producto)
    //     document.querySelector('#productosPool').innerHTML += html
    // })


    html = productos.map(pr => {
        return (`<div>
                    <p>${pr.nombre}</p>
                    <p>${pr.precio}</p>
                    </div>`)
    }).join(" ");
    console.log('HTML desde renderProducto:', html)

    productosPool.innerHTML += html;
    console.log("producto renderizado desde cliente")

}

// productsForm.addEventListener('submit', event => {
//     event.preventDefault()

//     const producto = { nombre: nombreInput.value, precio: precioInput.value, url: urlInput.value }
//     console.log("producto a enviar desde client ", producto)
//     sendProduct(producto)
// })

// socket.on('server:productos', productos => {
//     renderProducto(productos)
// })


// Servicio mensajería


const chatForm = document.querySelector('#chatForm')

const username = document.querySelector('#username')
const nombreMjInput = document.querySelector('#nombreMjInput')

const chatPool = document.querySelector('#chatPool')
const mensajeInput = document.querySelector('#mensajeInput')

function sendMensaje(mensaje) {
    socket.emit('client:mensaje', mensaje)
}

function renderMensaje(mensajes) {
    console.log('mensajes a renderizar desde client: ', mensajes)


    // const response = await fetch('/views/productos.ejs')
    // const plantilla = await response.text()
    // productos.forEach(producto => {
    //     const html = ejs.render(plantilla, producto)
    //     document.querySelector('#productosPool').innerHTML += html
    // })


    html = mensajes.map(mj => {
        return (`<div>
                   <li>id autor: ${mj.author.id}
                    </li>
                    <li>Mensaje: ${mj.text}

                    </div>`)
    }).join(" ");
    console.log('HTML:', html)

    productosPool.innerHTML += html;
    console.log("mensajes renderizado desde cliente")
}

chatForm.addEventListener('submit', event => {
    event.preventDefault()
    const email = username.value;
    const date = new Date;
    const mensaje = { email: email, typeUserOrSystem, date: date, text: mensajeInput.value };
       console.log("mensaje a enviar desde client ", mensaje)
    sendMensaje(mensaje)
})

socket.on('server: mensajes', mensajes => {
    console.log("recibiendo mensajes desde client", mensajes)

     renderMensaje(mensajes)
})


