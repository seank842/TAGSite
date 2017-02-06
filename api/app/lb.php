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
        $query="SELECT UserName, UserID, Score, FIND_IN_SET( Score, ( SELECT GROUP_CONCAT(Score ORDER BY Score DESC ) FROM leaderBoard ) ) AS Rank FROM leaderBoard WHERE UserID='$userID'";
        $query = mysqli_query($link,$query);
        $curentUser = mysqli_fetch_array($query);


        $query="SELECT UserName, UserID, Score, FIND_IN_SET( Score, ( SELECT GROUP_CONCAT(Score ORDER BY Score DESC ) FROM leaderBoard ) ) AS Rank FROM leaderBoard";
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
    $reultrs = array("success"=>$success,"user"=>$results,"userPos"=>$curentUser);
}else
{
    $reultrs = array("success"=>$success, "error_code" => $errorCode);
}
echo json_encode($reultrs);

?>