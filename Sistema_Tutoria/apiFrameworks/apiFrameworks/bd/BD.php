<?php
$pdo=null;
$host="localhost";
$user="root";
$password="0123456789";
$bd="bdtutorias";

function conectar(){
  try{
    $GLOBALS['pdo']=new PDO("mysql:host=".$GLOBALS['host'].";dbname=".$GLOBALS['bd']."",$GLOBALS['user'],$GLOBALS['password']);
    $GLOBALS['pdo']->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
  }catch (PDOException $e)
  {
    print"Error!: No se pudo conectar a la bd".$bd."<br/>";
    print "\nError!: ".$e."<br/>";
    die();
  }
}
function desconectar(){
  $GLOBALS['pdo']=null;
}
function metodoGet($query){
  try{
    conectar();
    $sentencia=$GLOBALS['pdo']-> prepare($query);
    $sentencia->setFetchMode(PDO::FETCH_ASSOC);
    $sentencia->execute();
    desconectar();
    return $sentencia;
  }catch(Exception $e){
    die("Error: ".$e);
  }
}
function metodoPost($query){
  try{
    conectar();
    $sentencia=$GLOBALS['pdo']-> prepare($query);
    $sentencia->setFetchMode(PDO::FETCH_ASSOC);
    $sentencia->execute();
    $resultado=array_merge($_POST);
    $sentencia->closeCursor();
    desconectar();
    return $resultado;
  }catch(Exception $e){
    die("Error: ".$e);
  }
}
function metodoPut($query){
  try{
    conectar();
    $sentencia=$GLOBALS['pdo']-> prepare($query);
    $sentencia->execute();
    $resultado=array_merge($_GET,$_POST);
    $sentencia->closeCursor();
    desconectar();
    return $resultado;
  }catch(Exception $e){
    die("Error: ".$e);
  }
}
function metodoDelete($query){
  try{
    conectar();
    $sentencia=$GLOBALS['pdo']-> prepare($query);
    $sentencia->execute();
    $sentencia->closeCursor();
    desconectar();
    return $_GET['CodDocente'];
  }catch(Exception $e){
    die("Error: ".$e);
  }
}
function metodoDeleteAlumno($query){
  try{
    conectar();
    $sentencia=$GLOBALS['pdo']-> prepare($query);
    $sentencia->execute();
    $sentencia->closeCursor();
    desconectar();
    return $_GET['CodAlumno'];
  }catch(Exception $e){
    die("Error: ".$e);
  }
}
function metodoDeleteAula($query){
  try{
    conectar();
    $sentencia=$GLOBALS['pdo']-> prepare($query);
    $sentencia->execute();
    $sentencia->closeCursor();
    desconectar();
    return $_GET['CodAulaTutoria'];
  }catch(Exception $e){
    die("Error: ".$e);
  }
}
function metodoPA($query){
  try{
    conectar();
    $sentencia=$GLOBALS['pdo']-> prepare($query);
    $sentencia->setFetchMode(PDO::FETCH_ASSOC);
    $sentencia->execute();
    desconectar();
    return $sentencia;
  }catch(Exception $e){
    die("Error: ".$e);
  }
}
 
 