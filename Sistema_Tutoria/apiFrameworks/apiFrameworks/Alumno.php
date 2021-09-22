<?php

include 'bd/BD.php';

header('Access-control-Allow-Origin: *');

if($_SERVER['REQUEST_METHOD']=='GET'){
  if(isset($_GET['CodAlumno'])){
    $query="SELECT * from talumno WHERE CodAlumno='".$_GET['CodAlumno']."'";
    $resultado=metodoGet($query);
    echo json_encode($resultado->fetch(PDO::FETCH_ASSOC)); 
  }else{
    $query="SELECT * from talumno";
    $resultado=metodoGet($query);
    echo json_encode($resultado-> fetchAll());
  }
  header("HTTP/1.1 200 OK");
  exit();
}
if($_POST['METHOD']=='POST'){
  unset($_POST['METHOD']);
  $CodAlumno=$_POST['CodAlumno'];
  $Nombres=$_POST['Nombres'];
  $Apellidos=$_POST['Apellidos'];
  $Correo=$_POST['Correo'];
  $Telefono=$_POST['Telefono'];
  $DNI=$_POST['DNI'];
  $query="INSERT into talumno(CodAlumno,Nombres,Apellidos,Correo,Telefono,DNI ) values ( '$CodAlumno','$Nombres','$Apellidos','$Correo','$Telefono','$DNI')";
  $resultado=metodoPost($query);
  echo json_encode($resultado);
  header("HTTP/1.1 200 OK");
  exit();
}
if($_POST['METHOD']=='PUT'){
  unset($_POST['METHOD']);
  $CodAlumno=$_POST['CodAlumno'];
  $Nombres=$_POST['Nombres'];
  $Apellidos=$_POST['Apellidos'];
  $Correo=$_POST['Correo'];
  $Telefono=$_POST['Telefono'];
  $DNI=$_POST['DNI'];
  $query="UPDATE talumno SET Nombres='$Nombres',Apellidos='$Apellidos',Correo='$Correo',Telefono='$Telefono',DNI='$DNI' WHERE CodAlumno='$CodAlumno'";
  $resultado=metodoPut($query);
  echo json_encode($resultado);
  header("HTTP/1.1 200 OK");
  exit();
}
if($_POST['METHOD']=='DELETE'){
  unset($_POST['METHOD']);
  $CodAlumno=$_GET['CodAlumno'];
  $query="DELETE FROM talumno WHERE CodAlumno='$CodAlumno'";
  $resultado=metodoDeleteAlumno($query);
  echo json_encode($resultado);
  header("HTTP/1.1 200 OK");
  exit();
}
header("HTTP/1.1 Bad Request");
?>