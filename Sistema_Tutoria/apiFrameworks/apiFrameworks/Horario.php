<?php

include 'bd/BD.php';

header('Access-control-Allow-Origin: *');

#devuelve un valor
if($_SERVER['REQUEST_METHOD']=='GET'){
  if(isset($_GET['CodTutoria'])){
    $query="SELECT * from thorario WHERE CodTutoria='".$_GET['CodTutoria']."'";
    $resultado=metodoGet($query);
    echo json_encode($resultado->fetch(PDO::FETCH_ASSOC)); 
  }else{
    $query="SELECT * from thorario";
    $resultado=metodoGet($query);
    echo json_encode($resultado-> fetchAll());
  }
  header("HTTP/1.1 200 OK");
  exit();
}
#Agregar
if($_POST['METHOD']=='POST'){
  unset($_POST['METHOD']);
  $CodTutoria=$_POST['CodTutoria'];
  $CodAlumno=$_POST['CodAlumno'];
  $Fecha=$_POST['Fecha'];
  $Hora=$_POST['Hora'];
  $CodDocente=$_POST['CodDocente'];
  $query="INSERT into thorario(CodTutoria,CodAlumno,Fecha,Hora,CodDocente) values ( '$CodTutoria','$CodAlumno','$Fecha','$Hora','$CodDocente')";
  $resultado=metodoPost($query);
  echo json_encode($resultado);
  header("HTTP/1.1 200 OK");
  exit();
}
#editar
if($_POST['METHOD']=='PUT'){
  unset($_POST['METHOD']);
  $CodTutoria=$_POST['CodTutoria'];
  $CodAlumno=$_POST['CodAlumno'];
  $Fecha=$_POST['Fecha'];
  $Hora=$_POST['Hora'];
  $CodDocente=$_POST['CodDocente'];
  $query="UPDATE thorario SET Fecha='$Fecha',Hora='$Hora' WHERE CodTutoria='$CodTutoria'";
  $resultado=metodoPut($query);
  echo json_encode($resultado);
  header("HTTP/1.1 200 OK");
  exit();
}
if($_POST['METHOD']=='DELETE'){
  unset($_POST['METHOD']);
  $CodTutoria=$_GET['CodTutoria'];
  $query="DELETE FROM thorario WHERE CodTutoria='$CodTutoria'";
  $resultado=metodoDelete($query);
  echo json_encode($resultado);
  header("HTTP/1.1 200 OK");
  exit();
}
header("HTTP/1.1 Bad Request");
?>