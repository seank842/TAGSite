<?php
require_once '../functions.php';
$link=sqlcon();

$success=true;
$errorCode=0;
$operand=array("Token","BoardID",'Message');
if(missingOperand($operand,$_POST)){
    $data=strip($link);
    
    $token=$data['Token'];
    $boardID=$data['BoardID'];
    $message=$data['Message'];
    
    $userID = auth($token,$link);
    if($userID<0){
        $errorCode=abs($userID);
        $success=false;
        
    } else
    {
        $time=time();
        $query="INSERT INTO tbl_message
        (message,userID,boardID,time)
        VALUES
        ('$message',$userID,$boardID, $time)";
        $query = mysqli_query($link,$query);
        
    }
    
    
}else {
    $errorCode=1;
    $success=false;
}

if($success){
    $reultrs = array("success"=>$success);
}else
{
    $reultrs = array("success"=>$success, "error_code" => $errorCode);
}
echo json_encode($reultrs);

?>