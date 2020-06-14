var firebaseConfig = {
    apiKey: "AIzaSyDlBW8k0czNHhdDwK265IqAtt_qgNKb7SM",
    authDomain: "control-de-un-invernadero.firebaseapp.com",
    databaseURL: "https://control-de-un-invernadero.firebaseio.com",
    projectId: "control-de-un-invernadero",
    storageBucket: "control-de-un-invernadero.appspot.com",
    messagingSenderId: "103114132808",
    appId: "1:103114132808:web:806b125d430ea4869ef77d",
    measurementId: "G-2G03EB94PP"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  var d = new Date();
  var t = d.getTime();
  var counter = t;
 
  document.getElementById("form").addEventListener("submit",(e)=>{
      var nombre = document.getElementById("nombre").value;
      var tipo = document.getElementById("tipo").value;
      var minimo = document.getElementById("minimo").value;
      var maximo = document.getElementById("maximo").value;
      e.preventDefault();
     // console.log(nombre+" "+tipo+" "+minimo+" "+maximo);
      añadirSensor(nombre,tipo,minimo,maximo);
      form.reset();
  });


  function añadirSensor(nombre,tipo,minimo,maximo){
      counter+=1;
      console.log(counter);
      var sensor={
          id:counter,
          nombre: nombre,
          tipo:tipo,
          minimo:minimo,
          maximo:maximo
      }
      let db=firebase.database().ref("sensores/"+nombre);
      db.set(sensor);
  }

  function leerSensor(){
      var sensor= firebase.database().ref("sensores/");
      sensor.on("child_added", function(data){
          var sensorValue=data.val();
          console.log(sensorValue)
          document.getElementById("tabla").innerHTML+=`
          <tr id="${sensorValue.nombre}">
          <th scope="row">${sensorValue.id}</th>
          <td>${sensorValue.nombre}</td>
          <td>${sensorValue.tipo}</td>
          <td>${sensorValue.minimo}</td>
          <td>${sensorValue.maximo}</td>
          <td>
          <center> <a href="#" class="btn btn-warning btn-circle btn-sm"  onclick="actualizarSensor(${sensorValue.id},'${sensorValue.nombre}','${sensorValue.tipo}','${sensorValue.minimo}','${sensorValue.maximo}')">
                  <i class="fas fa-exclamation-triangle"></i>
              </a> </center>
          </td>
          
          <td>
              <center> <a href="#" class="btn btn-danger btn-circle btn-sm" onclick="eliminarSensor('${sensorValue.nombre}')" >
                      <i class="fas fa-trash"></i>
                  </a> </center>
          </td>
          `
      });

      sensor.on("child_removed", function(data){
        var sensorValue=data.val();
        var sensores= document.getElementById(sensorValue.nombre);
        if(sensores){sensores.remove()}
      // console.log("Se elimino ", sensorValue);
    });
    
    sensor.on("child_changed",function(data){
        var sensorValue=data.val();
        var sensorFila= document.getElementById(sensorValue.nombre);
       console.log("Se edito ", sensorValue);
       sensorFila.children[1].innerText=sensorValue.nombre;
       sensorFila.children[2].innerText=sensorValue.tipo;
       sensorFila.children[3].innerText=sensorValue.minimo;
       sensorFila.children[4].innerText=sensorValue.maximo;
    })

}

function reset(){
    document.getElementById("firstSection").innerHTML=`
    <form class="border p-4 mb-4" id="form">
    <div class="form-group">
    <label>Nombre</label>
    <input type="text" id="nombre" placeholder="Nombre del sensor" class="form-control my-3">
    </div>
    <div class="form-group">
    <label>Tipo</label>
    <select class="form-control my-3" id="tipo">
      <option>Introduce el tipo del sensor...</option>
      <option>BMP180</option>
      <option>Servomotor</option>
      <option>LDR</option>
      <option>HCR04</option>
    </select>
  </div>
    <div class="form-group">
    <label>Valor minimo</label>
    <input type="number" id="minimo" placeholder="Valor minimo" class="form-control my-3">
    </div>
    <div class="form-group">
    <label>Maximo</label>
    <input type="number" id="maximo" placeholder="Valor maximo" class="form-control my-3">
    </div>
    <button class="btn btn-primary" type="submit" id="button1">Guardar</button>
    <button style="display: none;" id="button2" class="btn btn-success">Actualizar</button>
    <button style="display: none;" id="button3" class="btn btn-danger">Cancelar</button>
  </form>
    `;
    document.getElementById("form").addEventListener("submit",(e)=>{
        var nombre = document.getElementById("nombre").value;
        var tipo = document.getElementById("tipo").value;
        var minimo = document.getElementById("minimo").value;
        var maximo = document.getElementById("maximo").value;
        e.preventDefault();
       // console.log(nombre+" "+tipo+" "+minimo+" "+maximo);
        añadirSensor(nombre,tipo,minimo,maximo);
        form.reset();
    });
}

function actualizarSensor(id,nombre,tipo,minimo,maximo){
    document.getElementById("firstSection").innerHTML=`
    <form class="border p-4 mb-4" id="form2">
    <div class="form-group">
    <label>Nombre</label>
    <input type="text" id="nombre" placeholder="Nombre del sensor" class="form-control my-3" readonly>
    </div>
    <div class="form-group">
    <label>Tipo</label>
    <select class="form-control my-3" id="tipo">
      <option>Introduce el tipo del sensor...</option>
      <option>BMP180</option>
      <option>Servomotor</option>
      <option>LDR</option>
      <option>HCR04</option>
    </select>
  </div>
    <div class="form-group">
    <label>Valor minimo</label>
    <input type="number" id="minimo" placeholder="Valor minimo" class="form-control my-3">
    </div>
    <div class="form-group">
    <label>Maximo</label>
    <input type="number" id="maximo" placeholder="Valor maximo" class="form-control my-3">
    </div>
    <button class="btn btn-primary" style="display: none;" id="button1">Guardar</button>
    <button style="display: inline-block;" type="submit" id="button2" class="btn btn-success">Actualizar</button>
    <button style="display: inline-block;" id="button3" class="btn btn-danger">Cancelar</button>
  </form>
    `;
   document.getElementById("form2").addEventListener("submit",(e)=>{
       e.preventDefault();
   });
   document.getElementById("button3").addEventListener("click",(e)=>{
       reset();
   });
   document.getElementById("button2").addEventListener("click",(e)=>{
    actualizarSensor2(id,document.getElementById("nombre").value, 
    document.getElementById("tipo").value, document.getElementById("minimo").value,
    document.getElementById("maximo").value
    )
});
   
  document.getElementById("nombre").value=nombre;
  document.getElementById("tipo").value=tipo;
  document.getElementById("minimo").value=minimo;
  document.getElementById("maximo").value=maximo;
  console.log(nombre);
}


function actualizarSensor2(id, nombre, tipo, minimo, maximo) {
    let data = {
      id: id,
      nombre: nombre,
      tipo: tipo,
      minimo: minimo,
      maximo: maximo,
    };
    firebase
      .database()
      .ref('sensores/' +nombre)
      .set(data, function(error) {
        if (error) {
          console.log('ALGO FALLÓ, CORRE');
        } else {
          console.log('Sensor actualizado');
        }
      });
  
   // console.log('Data: ', data);
    reset();
  }
function eliminarSensor(nombre){
   var sensor= firebase.database().ref("sensores/"+nombre);
   sensor.remove();
}

function Naves(){
    var prueba=agregarNaves();
    console.log(prueba);
    return prueba;
}
var Nave=Naves();