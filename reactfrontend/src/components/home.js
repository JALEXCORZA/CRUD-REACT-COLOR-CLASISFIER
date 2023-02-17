import React from "react";
import { Button, Container, Table, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";//import necesario para realizar la peticion  axios

import {Modal,ModalBody,ModalFooter,ModalHeader} from "reactstrap";
import $ from "jquery";//import necesario para realizar la peticion get jquery
import "bootstrap/dist/css/bootstrap.min.css";
import Color from "./color";
import Probar from "./probar";


class Home extends React.Component {
    //estado del componente
    state = {

        data: [],//arreglo para guardar los datos de la peticion get
        modalInsertar:false,//estado para manjar el despliegue de la ventana modal
        //form para guardar y enviar los datos de las preguntas  
        form:{
            id:"",
            question:"",
            respuesta:"",
            r:"0",
            g:"0",
            b:"0"
        },
      
        probar:"no",
        color:"rgb(250,0,0)",//color del cuadro rgb 
        
        tipoModal:"",//estado para desplegar diferentes ventanas modal segun el boton que se presione
        showAlert: false,
        alertText: ""
    }
 //metodo para desplegar la ventana modal
   modalInsertar=()=>{
    this.setState({modalInsertar: !this.state.modalInsertar});
  
   }
   modalprobar=()=>{
    this.setState({probar: !this.state.probar});
  
   }
//metodo para actualizar el estado del componente segun la pregunta seleccionada
   seleccionarPregunta=(pregunta)=>{
    this.setState({
        
        form:{
            id:pregunta.id,
            question:pregunta.pregunta,
            respuesta:pregunta.respuesta,
            r:pregunta.r,
            g:pregunta.g,
            b:pregunta.b



        }

    });
   }
//metodo para eliminar pregunta
  
eliminar=async()=>{
    await
        this.peticionJqueryEliminar();
        this.peticionJqueryEliminar();
        this.peticionGet();
        this.modalInsertar();
       }
//metodo para editar pregunta
editar=async()=>{
     await
        this.peticionJqueryEditar()
        this.peticionGet();
         this.modalInsertar();
        
    }
    //PETICION PARA ELIMINAR PREGUNTA
peticionJqueryEliminar=async()=>{

    await
        $.get("http://localhost:8080/Proyecto/Eliminar",this.state.form );
    
   }
//PETICCION PARA EDITAR PREGUNTA
peticionJqueryEditar=async()=>{
   
    await
        $.get("http://localhost:8080/Proyecto/Editar",this.state.form );
    
   }
//peticion para obtener los datos de la base de datos
peticionGet=()=>{
    axios.get("http://localhost:8080/Proyecto/PreguntasTest").then(response=>{
        console.log(response.data);
        this.setState({ data: response.data });
        console.log(this.state);
    }).catch(error=>{
        console.log(error,message);
    })

   }
//metodo para actualizar dinamicamente el estado del componente
handleChange=async e=>{
    //es asincrona por que la ventana modal esta en segundo plano
    e.persist();
//fija el estado del componente
    await this.setState({
        form:{
            ...this.state.form,
            [e.target.name]:e.target.value,
            question:"rgb("+this.state.form.r+","+this.state.form.g+","+this.state.form.b+")"
        },
        color:"rgb("+this.state.form.r+","+this.state.form.g+","+this.state.form.b+")"

    });

   
  }
  
componentDidMount(){
    //obtiene los datos de la base de datos una vez el componente se monta
    this.peticionGet();
  
   }


    render() {
        const { data,form, showAlert, alertText } = this.state;
        return (
            <Container className="MarginContainer" >
                <h1 className="AlignCenter" >COLOR CLASSIFIER CRUD</h1>
                <hr style={{ width: "80%" }} />
                {
                    showAlert ?
                        <Alert variant="danger">
                            {alertText}
                        </Alert>
                        : null
                }
                

       


    <Button variant="info" style={{ margin: "12px" }}>
                    <Link to="/Proyecto/color/" className="CustomLink">Añadir nueva pregunta</Link>
                </Button>
         <Button variant="success" className="M-6" onClick={()=>{this.peticionGet();}}>
                                            
                                        refrescar datos
                                            
</Button>
     
   
               
              
                <Table striped bordered >
                    <thead>
                        <tr>
                            <th className="text">Pregunta</th>

                            <th className="text">Acciones</th>
                        </tr>
                    </thead>
                   <tbody>
                    
                        {
                        
                         
                           
                            this.state.data.map(pregunta=>{
                                 return(
                                    <tr>
                                    <td className="text">
                                        {pregunta.pregunta}
                                        </td>
                                    <td>
                                            <Button
                                                variant="success"
                                                className="M-6" 
                                                onClick={()=>{this.setState({tipoModal:"ver"});this.seleccionarPregunta(pregunta);this.modalInsertar()}}>
                                            
                                                    Ver pregunta
                                            
                                            </Button>
                                            <Button
                                                variant="warning"
                                                className="M-6"
                                                onClick={()=>{this.setState({tipoModal:"actualizar"});this.seleccionarPregunta(pregunta);this.modalInsertar()}}>
                                            
                                                    Editar pregunta
                                            
                                            </Button>
                                            <Button
                                                variant="danger"
                                                className="M-6"
                                                onClick={()=>{this.setState({tipoModal:"eliminar"});this.seleccionarPregunta(pregunta);this.modalInsertar()}}
                                            >
                                                Eliminar pregunta
                                            </Button>
                                            <Button variant="info" style={{ margin: "12px" }}
                            
                                            
                                                onClick={()=>{this.seleccionarPregunta(pregunta);this.modalInsertar();this.setState({probar:"si"})}}>
                                                probar ejercicio
                                            </Button>
                                        
                                     </td>
                                     </tr>
                             
                                 )})
                                 
                        }

                    </tbody>
                </Table>
                <Modal isOpen={this.state.modalInsertar}>
                    <ModalHeader style={{display:'block'}}>
                        <span style={{float:'right'}}></span>
                    </ModalHeader>
                    <ModalBody>
                        
                   {this.state.probar=="si"?<Probar data={this.state.form} >

                                         
                                        
                                            </Probar>:  this.state.tipoModal=="eliminar"?
                                            <h4>confirmar eliminacion</h4>:
                    <div>
                    <div style={{background:this.state.form.question,
                                    width:"200px",
                                    height:"200px",
                                    display:"inline-block",
                                    padding: "50px"}}>
            
                                    <h1>color</h1>
            
                    </div>
                    <div className="rgb">
            <label >R</label>
                <input type="range" id="r" name="r" min={0} max={255} value={form?form.r:""}
                    onChange={this.handleChange}/>
            <label >G</label>
                <input type="range" id="r" name="g" min={0} max={255} value={form?form.g:""}
                    onChange={this.handleChange}/>
            <label >B</label>
                <input type="range" id="r" name="b" min={0} max={255} value={form?form.b:""}
                    onChange={this.handleChange}/>
             </div>


                    <div className="form group">
                        
                        <label htmlFor="id">ID</label>
                        <input className="form control" type="text" name="id" id="id" readOnly onChange={this.handleChange} value={form?form.id:this.state.data.length+1} />
                        <br/>
                        <label htmlFor="pregunta">pregunta</label>
                        <input className="form control" type="text" name="question" id="question" onChange={this.handleChange} value={this.state.form.question}/>
                        <br/>
                        <label htmlFor="respuesta">respuesta</label>
                        <input className="form control" type="text" name="respuesta" id="respuesta"  onChange={this.handleChange} value={form?form.respuesta:""}/>
                        <br/>
                    </div>
                    </div>

                    }
                    
                    
                    
                    
                       
                    </ModalBody>
                    <ModalFooter>
                        {this.state.tipoModal=="insertar"?
                        <button className="btn btn-succes" onClick={()=>this.insertar()}>insertar</button>:
                        this.state.tipoModal=="ver"?
                       <label>observando...</label>:
                       this.state.tipoModal=="eliminar"?
                        <button className="btn btn-succes" onClick={()=>{this.eliminar();this.modalInsertar()}}>confirmar</button>:
                        this.state.tipoModal=="actualizar"?
                        <button className="btn btn-succes" onClick={()=>this.editar()}>actualizar</button>:
                        <label>...probando ejercicio</label>
                    }
                        <button className="btn btn-danger" onClick={()=>{this.modalInsertar();this.peticionGet();this.setState({probar:"no"})}}>volver</button>
                    </ModalFooter>
                </Modal>
             
            </Container>
        )
    }

}

export default Home;