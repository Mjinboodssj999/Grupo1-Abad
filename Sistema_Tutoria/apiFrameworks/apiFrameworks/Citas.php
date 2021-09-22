<?php

include 'bd/BD.php';

header('Access-control-Allow-Origin: *');

if($_SERVER['REQUEST_METHOD']=='GET'){
  if(isset($_GET['CodTutoria'])){ 
    $query="SELECT * from tcita WHERE CodTutoria='".$_GET['CodTutoria']."'";
    $resultado=metodoGet($query);
    echo json_encode($resultado->fetch(PDO::FETCH_ASSOC)); 
  }else{
    $query="SELECT * from tcita";
    $resultado=metodoGet($query);
    echo json_encode($resultado-> fetchAll());
  }
  header("HTTP/1.1 200 OK");
  exit();
}
if($_POST['METHOD']=='POST'){
  unset($_POST['METHOD']);
  $CodTutoria=$_POST['CodTutoria'];
  $CodAlumno=$_POST['CodAlumno'];
  $Fecha=$_POST['Fecha'];
  $Hora=$_POST['Hora'];
  $query="INSERT into tcita(CodTutoria,CodAlumno,Fecha,Hora) values ( '$CodTutoria','$CodAlumno','$Fecha','$Hora')";
  $resultado=metodoPost($query);
  echo json_encode($resultado);
  header("HTTP/1.1 200 OK");
  exit();
}
 
if($_POST['METHOD']=='BUSCARDOCENTES'){
  unset($_POST['METHOD']);
  $query="CALL spuBuscarDocentes";
  $resultado=metodoPA($query);
  echo json_encode($resultado-> fetchAll());
  header("HTTP/1.1 200 OK");
  exit();
} 
if($_POST['METHOD']=='LISTARESTUDIANTES'){
  unset($_POST['METHOD']);
  $CodAulaTutoria=$_POST['CodAulaTutoria'];
  $query="CALL spuListarAlumnos('$CodAulaTutoria')";
  $resultado=metodoPA($query);
  echo json_encode($resultado-> fetchAll());
  header("HTTP/1.1 200 OK");
  exit();
}
if($_POST['METHOD']=='BUSCARCITAS'){
  unset($_POST['METHOD']);
  $CodDocente=$_POST['CodDocente'];
  $query="call spuMostrarCitas('$CodDocente')";
  $resultado=metodoPA($query);
  echo json_encode($resultado-> fetchAll());
  header("HTTP/1.1 200 OK");
  exit();
} 
header("HTTP/1.1 Bad Request");
?>