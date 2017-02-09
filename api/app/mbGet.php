<?php
require_once '../functions.php';
$link=sqlcon();

$success=true;
$errorCode=0;
$operand=array("Token");
if(missingOperand($operand,$_POST)){
    $data=strip($link);
    
    $token=$data['Token'];
    $userID = auth($token,$link);
    if($userID<0){
        $errorCode=abs($userID);
        $success=false;
        
    } else
    {
        $query="SELECT * FROM tbl_board";
        $query = mysqli_query($link,$query);        
        
    }
    
    
}else {
    $errorCode=1;
    $success=false;
}

if($success){
    $results['board'] = array();
    while($line = mysqli_fetch_array($query)){
        array_push($results ["board"], $line);
    }
    $reultrs = array("success"=>$success,"board"=>$results);
}else
{
    $reultrs = array("success"=>$success, "error_code" => $errorCode);
}
echo json_encode($reultrs);

?>