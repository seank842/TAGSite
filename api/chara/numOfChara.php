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
		
	$query="SELECT CharacterID,Name,CurrentHealth,MaxHealth,Pet,BuffTokens,Type
	FROM tbl_character WHERE UserID = $userID";
	$query = mysqli_query($link,$query);
	
	
	}


}else {
	$errorCode=1;
	$success=false;
}

if($success){
    $num = mysqli_num_rows($query);
	$reultrs = array("success"=>$success,"numOfChars"=>$num);
}else
{
	$reultrs = array("success"=>$success, "error_code" => $errorCode);
}
echo json_encode($reultrs);

?>