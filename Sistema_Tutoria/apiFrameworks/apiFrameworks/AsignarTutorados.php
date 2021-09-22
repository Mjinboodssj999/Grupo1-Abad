<?php

include 'bd/BD.php';

header('Access-control-Allow-Origin: *');

if($_SERVER['REQUEST_METHOD']=='GET'){
  if(isset($_GET['CodGrupoEstudiante'])){ 
    $query="SELECT * from tgrupoestudiante WHERE CodGrupoEstudiante='".$_GET['CodGrupoEstudiante']."'";
    $resultado=metodoGet($query);
    echo json_encode($resultado->fetch(PDO::FETCH_ASSOC)); 
  }else{
    $query="SELECT * from tgrupoestudiante";
    $resultado=metodoGet($query);
    echo json_encode($resultado-> fetchAll());
  }
  header("HTTP/1.1 200 OK");
  exit();
}
if($_POST['METHOD']=='POST'){
  unset($_POST['METHOD']);
  $CodGrupoEstudiante=$_POST['CodGrupoEstudiante'];
  $CodAlumno=$_POST['CodAlumno'];
  $query="INSERT into tgrupoestudiante(CodGrupoEstudiante,CodAlumno) values ( '$CodGrupoEstudiante','$CodAlumno')";
  $resultado=metodoPost($query);
  echo json_encode($resultado);
  header("HTTP/1.1 200 OK");
  exit();
}
 if($_POST['METHOD']=='BUSCAR'){
  unset($_POST['METHOD']);
  $query="CALL spuConsultarAulaTutoria";
  $resultado=metodoPA($query);
  echo json_encode($resultado-> fetchAll());
  header("HTTP/1.1 200 OK");
  exit();
} 
if($_POST['METHOD']=='CALCULAR'){
  unset($_POST['METHOD']);
  $query="CALL spuCalcularAlumnoGrupo";
  $resultado=metodoPA($query);
  echo json_encode($resultado-> fetchAll());
  header("HTTP/1.1 200 OK");
  exit();
}
if($_POST['METHOD']=='GENERARESTUDIANTES'){
  unset($_POST['METHOD']);
  $CantidadAlumnos=$_POST['CantidadAlumnos'];
  $query="CALL spuGenerarListaAlumnos($CantidadAlumnos)";
  $resultado=metodoPA($query);
  echo json_encode($resultado-> fetchAll());
  header("HTTP/1.1 200 OK");
  exit();
}
if($_POST['METHOD']=='PUT'){
  unset($_POST['METHOD']);
  $CodAulaTutoria=$_POST['CodAulaTutoria'];
  $CodGrupoAlumno=$_POST['CodGrupoAlumno'];
  $query="UPDATE taulatutoria SET CodGrupoAlumno='$CodGrupoAlumno' WHERE CodAulaTutoria='$CodAulaTutoria'";
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
if($_POST['METHOD']=='LISTARESTUDIANTES'){
  unset($_POST['METHOD']);
  $CodAulaTutoria=$_POST['CodAulaTutoria'];
  $query="CALL spuListarAlumnos('$CodAulaTutoria')";
  $resultado=metodoPA($query);
  echo json_encode($resultado-> fetchAll());
  header("HTTP/1.1 200 OK");
  exit();
}

/*if($_SERVER['REQUEST_METHOD']=='BUSCAR'){
    $query="SELECT * from tgrupoestudiante";
    $resultado=metodoGet($query);
    echo json_encode($resultado-> fetchAll());
    header("HTTP/1.1 200 OK");
    exit();
} 
/*if($_POST['METHOD']=='PUT'){
  unset($_POST['METHOD']);
  $CodAulaTutoria=$_POST['CodAulaTutoria'];
  $CodDocenteTutor=$_POST['CodDocenteTutor'];
  $CodGrupoAlumno=$_POST['CodGrupoAlumno'];
  $Semestre=$_POST['Semestre'];
  $HoraInicio=$_POST['HoraInicio'];
  $Lugar=$_POST['Lugar'];
  $query="UPDATE taulatutoria SET CodDocenteTutor='$CodDocenteTutor',CodGrupoAlumno='$CodGrupoAlumno',Semestre='$Semestre',HoraInicio='$HoraInicio',Lugar='$Lugar' WHERE CodAulaTutoria='$CodAulaTutoria'";
  $resultado=metodoPut($query);
  echo json_encode($resultado);
  header("HTTP/1.1 200 OK");
  exit();
}
if($_POST['METHOD']=='DELETE'){
  unset($_POST['METHOD']);
  $CodAulaTutoria=$_GET['CodAulaTutoria'];
  $query="DELETE FROM taulatutoria WHERE CodAulaTutoria='$CodAulaTutoria'";
  $resultado=metodoDelete($query);
  echo json_encode($resultado);
  header("HTTP/1.1 200 OK");
  exit();
}*/
header("HTTP/1.1 Bad Request");
?>