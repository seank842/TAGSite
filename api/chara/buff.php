<?php
require_once '../functions.php';
$link=sqlcon();

$success=true;
$errorCode=0;
$operand=array("CharID","StatID","Token",);
if(missingOperand($operand,$_POST)){
	$data=strip($link);
	
	$CharID=$data['CharID'];
	$statID=$data['StatID'];
	$token=$data['Token'];
	$userID = auth($token,$link);
	if($userID<0){
		$errorCode=abs($userID);
		$success=false;
		
	} else
	{
		$query="SELECT BuffTokens
		FROM tbl_character
		WHERE CharacterID = $CharID AND UserID = $userID;";
		$result=mysqli_query($link, $query) or die (mysqli_error($link));
		$results=mysqli_fetch_array($result);
		$buffToken=$results['BuffTokens'];
		
		if(!isset($buffToken)||$buffToken==0) {
			$errorCode=2;
			$success=false;
		} else{
		
			$query="UPDATE tbl_character
			SET BuffTokens = BuffTokens - 1 WHERE CharacterID = $CharID;";
			mysqli_query($link,$query) or die (mysqli_error($link));
		
			$query="UPDATE tbl_charactercharacteristic
			SET Value = Value + 1 WHERE CharacterID = $CharID AND CharacteristicID = $statID;";
		
			mysqli_query($link,$query) or die (mysqli_error($link));
		}
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