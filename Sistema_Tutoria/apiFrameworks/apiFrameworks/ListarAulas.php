<?php

include 'bd/BD.php';

header('Access-control-Allow-Origin: *');

if($_SERVER['REQUEST_METHOD']=='GET'){
  if(isset($_GET['CodAulaTutoria'])){
    $query="SELECT * from taulatutoria WHERE CodAulaTutoria='".$_GET['CodAulaTutoria']."'";
    $resultado=metodoGet($query);
    echo json_encode($resultado->fetch(PDO::FETCH_ASSOC)); 
  }else{
    $query="SELECT * from taulatutoria";
    $resultado=metodoGet($query);
    echo json_encode($resultado-> fetchAll());
  }
  header("HTTP/1.1 200 OK");
  exit();
}
if($_POST['METHOD']=='POST'){
  unset($_POST['METHOD']);
  $CodAulaTutoria=$_POST['CodAulaTutoria'];
  $CodDocenteTutor=$_POST['CodDocenteTutor'];
  $CodGrupoAlumno=$_POST['CodGrupoAlumno'];
  $Semestre=$_POST['Semestre'];
  $HoraInicio=$_POST['HoraInicio'];
  $Lugar=$_POST['Lugar'];
  $query="INSERT into taulatutoria(CodAulaTutoria,CodDocenteTutor,CodGrupoAlumno,Semestre,Lugar) values ( '$CodAulaTutoria','$CodDocenteTutor','$CodGrupoAlumno','$Semestre','$Lugar')";
  $resultado=metodoPost($query);
  echo json_encode($resultado);
  header("HTTP/1.1 200 OK");
  exit();
}
if($_POST['METHOD']=='PUT'){
  unset($_POST['METHOD']);
  $CodAulaTutoria=$_POST['CodAulaTutoria'];
  $CodDocenteTutor=$_POST['CodDocenteTutor'];
  $CodGrupoAlumno=$_POST['CodGrupoAlumno'];
  $Semestre=$_POST['Semestre'];
  $HoraInicio=$_POST['HoraInicio'];
  $Lugar=$_POST['Lugar'];
  $query="UPDATE taulatutoria SET CodDocenteTutor='$CodDocenteTutor',CodGrupoAlumno='$CodGrupoAlumno',Semestre='$Semestre',Lugar='$Lugar' WHERE CodAulaTutoria='$CodAulaTutoria'";
  $resultado=metodoPut($query);
  echo json_encode($resultado);
  header("HTTP/1.1 200 OK");
  exit();
}
if($_POST['METHOD']=='DELETE'){
  unset($_POST['METHOD']);
  $CodAulaTutoria=$_GET['CodAulaTutoria'];
  $query="DELETE FROM taulatutoria WHERE CodAulaTutoria='$CodAulaTutoria'";
  $resultado=metodoDeleteAula($query);
  echo json_encode($resultado);
  header("HTTP/1.1 200 OK");
  exit();
}
if($_POST['METHOD']=='LISTAR'){
  unset($_POST['METHOD']);
  $query="SELECT * FROM listaraulasgeneral4";
  $resultado=metodoPA($query);
  echo json_encode($resultado-> fetchAll());
  header("HTTP/1.1 200 OK");
  exit();
}
if($_POST['METHOD']=='ALUMNOSNUEVOS'){
  unset($_POST['METHOD']);
  $query="CALL spuMostrarAlumnos";
  $resultado=metodoPA($query);
  echo json_encode($resultado-> fetchAll());
  header("HTTP/1.1 200 OK");
  exit();
}
if($_POST['METHOD']=='AGREGAR'){
  unset($_POST['METHOD']);
  $CodGrupoEstudiante=$_POST['CodGrupoEstudiante'];
  $CodAlumno=$_POST['CodAlumno'];
  $query="INSERT into tgrupoestudiante(CodGrupoEstudiante,CodAlumno) values ( '$CodGrupoEstudiante','$CodAlumno')";
  $resultado=metodoPost($query);
  echo json_encode($resultado);
  header("HTTP/1.1 200 OK");
  exit();
}
if($_POST['METHOD']=='MOSTRARDOCENTES'){
  unset($_POST['METHOD']);
  $query="CALL spuMostrarDocentes";
  $resultado=metodoPA($query);
  echo json_encode($resultado-> fetchAll());
  header("HTTP/1.1 200 OK");
  exit();
}
header("HTTP/1.1 Bad Request");
?>