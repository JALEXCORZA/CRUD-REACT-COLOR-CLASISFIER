
import * as ml5 from "ml5";//importamos la libreria de machine learning
import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import $ from "jquery";//metodo jquery para la peticion get 
import { Link } from "react-router-dom";//el componente link nos ayudara a navegar entre las vistas del proyecto
import { Button, Container, Table, Alert } from "react-bootstrap";//componentes utiles para creacion de botones

//declaracion del compjente color 
class Color extends Component {

neuralnetwork;//variable para la red neuronal del machine learning
  state={
    form:{
        id:"",
        pegunta:"",
        respuesta:"",
        r1:"",
        g1:"",
        b1:""
    },
    //estado para manejar el color de el campo pregunta y el color del div y se vea graficamente el color en la aplicacion
   color:"rgb(250,0,0)",
   //valores de los slider rgb
   rgb:{
   r:"0",
   g:"0",
   b:"0"
   },
   //valores para la peticion get de rgb
   r1:"",
   g1:"",
   b1:"",
   predictions:""
}
//metodo para la peticion get
peticionJquery=async()=>{

        

        await
            $.get("http://localhost:8080/Proyecto/CrearTest",this.state);
        
   }


   //metodo para llamar a la peticion jqueryy
insertar=async()=>{
    await
   
    this.peticionJquery();

   
   }
   //metodo para actualizar el ado del componente predictions
setPredictions = (pred) => {

  this.setState({
    predictions: pred
  });
}
//metodo para cambiar dinamicamente el estado del componente
handleChange=async e=>{

    e.persist();

    await this.setState({
        rgb:{
            ...this.state.rgb,
            [e.target.name]:e.target.value
        },
        r1:this.state.rgb.r,
        g1:this.state.rgb.g,
        b1:this.state.rgb.b,
        color:"rgb("+this.state.rgb.r+","+this.state.rgb.g+","+this.state.rgb.b+")",
       
      
    });
  //cada que se cambia el color lo clasificamos con Machine Learning
  console.log(this.state);
   this.classify();
  }
  //metodo para inicializar la red neuronal con machine learning  entrenarla con los datos
 setup=()=> {
    //datos de entrenamiento 
    
    const data = [
      {r:255, g:0, b:0, color:'red-ish'},
      {r:254, g:0, b:0, color:'red-ish'},
      {r:253, g:0, b:0, color:'red-ish'},
      {r:0, g:255, b:0, color:'green-ish'},
      {r:0, g:254, b:0, color:'green-ish'},
      {r:0, g:253, b:0, color:'green-ish'},
      {r:0, g:0, b:255, color:'blue-ish'},
      {r:0, g:0, b:254, color:'blue-ish'},
      {r:0, g:0, b:253, color:'blue-ish'},
      {r:0, g:0, b:252, color:'blue-ish'},
      {r:0, g:0, b:250, color:'blue-ish'},
      {r:250, g:250, b:250, color:'white'},
      {r:0, g:0, b:0, color:'black'},
      {r:255, g:0, b:255, color:'pink-ish'},
      {r:255, g:255, b:0, color:'yellow-ish'},
      {r:255, g:154, b:0, color:'orange-ish'}

    ];
    
    //opciones de creacion de la red neuronal
    const options = {
      task: 'classification',//tarea que realizara la red neuronal
      debug: true//el valor true es para ver graficamente como se entrena la red con los datos 
    }
    
    // inicializamos la red con las opciones previas
    this.neuralnetwork = ml5.neuralNetwork(options);
    
    //a??adimos todos los datos a la red
    data.forEach(item => {
      const inputs = {
        r: item.r, 
        g: item.g, 
        b: item.b
      };
      const output = {
        color: item.color
      };
    
      this.neuralnetwork.addData(inputs, output);
    });
    
    // se normalizan los datos
    this.neuralnetwork.normalizeData();
    
    // se fijan las ocipnes de entrenamiento
    const trainingOptions = {
      epochs: 32,
      batchSize: 12
    }

    //se entrena la red con el emtodo train()
    this.neuralnetwork.train(trainingOptions,console.log("trained"))
   
  }
    // metodo para clasificar los colores
  classify=()=>{
    //convertimos a enteros los valores de los slider obtenidos mediante el estado del componente
    let rs=parseInt(this.state.rgb.r);
    let gs=parseInt(this.state.rgb.g);
    let bs=parseInt(this.state.rgb.b);
//con los parametros obtenidos del estado del componente clasificamos el color 
    this.neuralnetwork.classify([rs,gs,bs],(err,result)=>{
      if(err){
        console.error(err);
        //se manda a consola si ocurre un error
      }
      console.log(result);//observamos en consola los resultados
      this.setPredictions(result[0].label);
     
    })

  }
  

  componentDidMount(){
    //en cuanto se monte el componente se inicializa la red neuronal
   this.setup();
   }

  render(){
//se renderiza en pantalla la interfaz grafica
  return (
    <div className="App" >
            
    <div className="outer-div">
   
        <div className="inner-div">

        <h3 className="text">agregar nueva pregunta </h3>
    <div style={{background:this.state.color,
    width:"200px",
    height:"200px",
    display:"inline-block",
    padding: "50px"}}>
   
    <h1>color</h1>
 
    </div>
    <div className="rgb">
    <label className="text">R</label>
        <input type="range" id="r" name="r" min={0} max={255} value={this.state.rgb.r}
            onChange={this.handleChange}/>
    <label className="text">G</label>
        <input type="range" id="r" name="g" min={0} max={255} value={this.state.rgb.g}
            onChange={this.handleChange}/>
    <label className="text">B</label>
        <input type="range" id="r" name="b" min={0} max={255} value={this.state.rgb.b}
            onChange={this.handleChange}/>
     <input type="text" id="label2" name="label2"  value={this.state.color}
            onChange={this.handleChange}/>
                
   
    <Button variant="info" style={{ margin: "12px" }} onClick={()=>this.insertar()}>insertar</Button>

    <Button variant="info" style={{ margin: "12px" }}>
                    <Link to="/Proyecto/home/" className="CustomLink">regresar</Link>
                </Button>


     </div>
    
     </div>
</div>
</div>


  );}

  
}

export default Color;
