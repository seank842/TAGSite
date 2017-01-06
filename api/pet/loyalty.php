<?php
require_once '../functions.php';
$link=sqlcon();

$success=true;
$errorCode=0;
$operand=array("CharID","Token",);
if(missingOperand($operand,$_POST)){
	$data=strip($link);
	
	$CharID=$data['CharID'];
	$token=$data['Token'];
	$userID = auth($token,$link);
	if($userID<0){
		$errorCode=abs($userID);
		$success=false;
		
	} else
	{	
		$query="UPDATE tbl_charactercharacteristic
		SET Value = Value + 1 WHERE CharacterID = $CharID AND CharacteristicID = 6;";
		
		mysqli_query($link,$query) or die (mysqli_error($link));
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