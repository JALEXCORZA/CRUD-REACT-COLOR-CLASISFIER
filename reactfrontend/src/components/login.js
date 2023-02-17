import React from "react";
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import $ from "jquery"//import necesario para poder usar el metodo get de jquery
import { browserHistory } from "react-router";
import ReactDOM from "react-dom"
import Home from "./home"//importamos el componente home para poder llamarlo dentro de la aplicacion

import cube from "./cube.png"

class Login extends React.Component {
    
  state={
    val: false,
  }

    cambiar = () =>{
        this.setState((state)=>({
          val:true,
        comp: <Home></Home>
          //comp: <Prueba></Prueba>
        }))
    }
    //metodo para validar usuario y contraseña
      validar=(usuario,password) =>{
        var datos={
            User: usuario,
            password: password
        }
        //se hace una peticion al servidor para validar los datos respecto a  os que existen en la base de datos
        $.get("Login",datos, (resultado)=>{
          if(resultado[0].usuario !="error"){
            this.state.val = true;
            this.forceUpdate();
          }else{
            alert("USUARIO NO REGISTRADO")
          }
          
        })
     
    }
    render() {
      const styles = {
          padding : '5px'
          
      }
      const qId = (new URLSearchParams(window.location.search).get("val") == "true")? true:false;
      const undiv=  <div className = "grid"  id="equis">
               <h1 className="AlignCenter" > COLOR CLASSIFIER </h1>
            <div class="register">
       <img src="./cube.png" width="100px" height="100px"></img>
             
                <input placeholder="Ingrese el usuario" type="text" id="User" class="input" />
         
       
            
                <input placeholder="Ingrese su contraseña" type="password" id="password" class="input" />
    
      
            <button className="btn-primary" onClick={() => this.validar(document.getElementById("User").value,document.getElementById("password").value)}>
                Submit
              </button>
            </div>
            </div>
       const esValido = (this.state.val) || qId?<Home></Home>: undiv
        return(
          <div>
            {esValido}
            {console.log(esValido)}
          </div>
        )    
  }
}
export default Login; 