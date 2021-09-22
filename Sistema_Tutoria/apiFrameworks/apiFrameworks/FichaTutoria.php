<?php

include 'bd/BD.php';

header('Access-control-Allow-Origin: *');

#devuelve un valor
if($_SERVER['REQUEST_METHOD']=='GET'){
  if(isset($_GET['CodFicha'])){
    $query="SELECT * from tfichatutoria WHERE CodFicha='".$_GET['CodFicha']."'";
    $resultado=metodoGet($query);
    echo json_encode($resultado->fetch(PDO::FETCH_ASSOC)); 
  }else{
    $query="SELECT * from tfichatutoria";
    $resultado=metodoGet($query);
    echo json_encode($resultado-> fetchAll());
  }
  header("HTTP/1.1 200 OK");
  exit();
}
#Agregar
if($_POST['METHOD']=='POST'){
  unset($_POST['METHOD']);
  $CodFicha=$_POST['CodFicha'];
  $CodEstudiante=$_POST['CodEstudiante'];
  $Fecha=$_POST['Fecha'];
  $Hora=$_POST['Hora'];
  $Actividad=$_POST['Actividad'];
  $TipoTutoria=$_POST['TipoTutoria'];
  $Detalles=$_POST['Detalles'];
  $Psicologia=$_POST['Psicologia'];
  $Semestre=$_POST['Semestre'];
  $Permiso=$_POST['Permiso'];
  $query="INSERT into tfichatutoria(CodFicha,CodEstudiante,Fecha,Hora,Actividad,TipoTutoria,Detalles,Psicologia,Semestre,Permiso) values ( '$CodFicha','$CodEstudiante','$Fecha','$Hora','$TipoTutoria','$Actividad','$Detalles','$Psicologia','$Semestre','$Permiso'";
  $resultado=metodoPost($query);
  echo json_encode($resultado);
  header("HTTP/1.1 200 OK");
  exit();
}
#editar
if($_POST['METHOD']=='PUT'){
  unset($_POST['METHOD']);
  $CodFicha=$_POST['CodFicha'];
  $CodTutoria=$_POST['CodTutoria'];
  $TipoTutoria=$_POST['TipoTutoria'];
  $Actividad=$_POST['Actividad'];
  $Detalles=$_POST['Detalles'];
  $Psicologia=$_POST['Psicologia'];
  $Semestre=$_POST['Semestre'];
  $query="UPDATE tfichatutoria SET TipoTutoria='$TipoTtutoria',Actividad='$Actividad',Detalles='$Detalles',Psicologia='$Psicologia',Semestre='$Semestre' WHERE CodFicha='$CodFicha'";
  $resultado=metodoPut($query);
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