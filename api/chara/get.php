<?php
require_once '../functions.php';
$link=sqlcon();

$success=true;
$errorCode=0;
$operand=array("CharID");
if(missingOperand($operand,$_POST)){
	$data=strip($link);
	
	$cID=$data['CharID'];
	$userID = auth($token,$link);
	
	$query="SELECT CharacterID,Name,CurrentHealth,MaxHealth,Pet,BuffTokens
	FROM tbl_character WHERE CharacterID = $cID";
	
	$query = mysqli_query($link,$query);
	$results=mysqli_fetch_array($query);
	
}else {
	$errorCode=1;
	$success=false;
}

if($success){
	
	$reultrs = array("success"=>$success,"Char"=>$results);
}else
{
	$reultrs = array("success"=>$success, "error_code" => $errorCode);
}
echo json_encode($reultrs);

?>