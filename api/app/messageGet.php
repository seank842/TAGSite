<?php
require_once '../functions.php';
$link=sqlcon();

$success=true;
$errorCode=0;
$operand=array("Token","BoardID");
if(missingOperand($operand,$_POST)){
    $data=strip($link);
    
    $token=$data['Token'];
    $boardID=$data['BoardID'];
    $userID = auth($token,$link);
    if($userID<0){
        $errorCode=abs($userID);
        $success=false;
        
    } else
    {
        $query="SELECT m.MessageID, m.Message,m.time,u.UserName FROM tbl_message AS m
        JOIN tbl_user AS u ON m.UserID = u.UserID
        WHERE m.BoardID='$boardID' ORDER BY m.time ASC";
        $query = mysqli_query($link,$query);        
        
    }
    
    
}else {
    $errorCode=1;
    $success=false;
}

if($success){
    $results['message'] = array();
    while($line = mysqli_fetch_array($query)){
        array_push($results ["message"], $line);
    }
    $reultrs = array("success"=>$success,"message"=>$results);
}else
{
    $reultrs = array("success"=>$success, "error_code" => $errorCode);
}
echo json_encode($reultrs);

?>