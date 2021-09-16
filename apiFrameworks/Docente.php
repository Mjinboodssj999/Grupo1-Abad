<?php

include 'bd/BD.php';

header('Access-control-Allow-Origin: *');

if($_SERVER['REQUEST_METHOD']=='GET'){
  if(isset($_GET['CodDocente'])){
    $query="SELECT * from tdocente WHERE CodDocente='".$_GET['CodDocente']."'";
    $resultado=metodoGet($query);
    echo json_encode($resultado->fetch(PDO::FETCH_ASSOC)); 
  }else{
    $query="SELECT * from tdocente";
    $resultado=metodoGet($query);
    echo json_encode($resultado-> fetchAll());
  }
  header("HTTP/1.1 200 OK");
  exit();
}
if($_POST['METHOD']=='POST'){
  unset($_POST['METHOD']);
  $CodDocente=$_POST['CodDocente'];
  $Nombres=$_POST['Nombres'];
  $Apellidos=$_POST['Apellidos'];
  $Correo=$_POST['Correo'];
  $Telefono=$_POST['Telefono'];
  $DNI=$_POST['DNI'];
  $Categoria	=$_POST['Categoria'];
  $Especialidad=$_POST['Especialidad'];
  $Impedimento=$_POST['Impedimento'];
  $query="INSERT into tdocente(CodDocente,Nombres,Apellidos,Correo,Telefono,DNI,Categoria,Especialidad,Impedimento) values ( '$CodDocente','$Nombres','$Apellidos','$Correo','$Telefono','$DNI','$Categoria','$Especialidad','$Impedimento')";
  $resultado=metodoPost($query);
  echo json_encode($resultado);
  header("HTTP/1.1 200 OK");
  exit();
}
if($_POST['METHOD']=='PUT'){
  unset($_POST['METHOD']);
  $CodDocente=$_POST['CodDocente'];
  $Nombres=$_POST['Nombres'];
  $Apellidos=$_POST['Apellidos'];
  $Correo=$_POST['Correo'];
  $Telefono=$_POST['Telefono'];
  $DNI=$_POST['DNI'];
  $Categoria	=$_POST['Categoria'];
  $Especialidad=$_POST['Especialidad'];
  $Impedimento=$_POST['Impedimento'];
  $query="UPDATE tdocente SET Nombres='$Nombres',Apellidos='$Apellidos',Correo='$Correo',Telefono='$Telefono',DNI='$DNI',Categoria='$Categoria',Especialidad='$Especialidad',Impedimento='$Impedimento' WHERE CodDocente='$CodDocente'";
  $resultado=metodoPut($query);
  echo json_encode($resultado);
  header("HTTP/1.1 200 OK");
  exit();
}
if($_POST['METHOD']=='DELETE'){
  unset($_POST['METHOD']);
  $CodDocente=$_GET['CodDocente'];
  $query="DELETE FROM tdocente WHERE CodDocente='$CodDocente'";
  $resultado=metodoDelete($query);
  echo json_encode($resultado);
  header("HTTP/1.1 200 OK");
  exit();
}
header("HTTP/1.1 Bad Request");
?>