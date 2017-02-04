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
        
        $query="SELECT u.UserID, u.UserName, SUM(cr.Value) AS Score FROM `tbl_character`AS ch
        JOIN tbl_charactercharacteristic AS cr ON cr.CharacterID= ch.CharacterID AND cr.CharacteristicID = 1
        JOIN tbl_user AS u on u.UserID = ch.userID
        GROUP BY u.userID
        ORDER BY Score DESC";
        $query = mysqli_query($link,$query);
        
        
    }
    
    
}else {
    $errorCode=1;
    $success=false;
}

if($success){
    $results['user'] = array();
    while($line = mysqli_fetch_array($query)){
        array_push($results ["user"], $line);
    }
    $reultrs = array("success"=>$success,"user"=>$results);
}else
{
    $reultrs = array("success"=>$success, "error_code" => $errorCode);
}
echo json_encode($reultrs);

?>