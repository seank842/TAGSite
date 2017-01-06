<?php
require_once '../functions.php';
$link=sqlcon();

$success=true;
$errorCode=0;
$operand=array("CharID","XP","Token");
if(missingOperand($operand,$_POST)){
	$data=strip($link);
	
	$cID=$data['CharID'];
	$value=$data['XP'];
	$token=$data['Token'];
	$userID = auth($token,$link);
	if($userID<0){
		$errorCode=abs($userID);
		$success=false;
		
	} else
	{
		$query="SELECT *
		FROM tbl_charactercharacteristic AS cc
		JOIN tbl_character AS c ON cc.CharacterID = c.CharacterID
		WHERE cc.CharacterID = $cID AND cc.CharacteristicID = 1 AND c.UserID = $userID;";
		$result=mysqli_query($link, $query) or die (mysqli_error($link));
		if(mysqli_num_rows($result)!=1){
			$errorCode=2;
			$success=false;	
		} else {
			$results=mysqli_fetch_array($result);
			$oldLevel=getLevel($results['Value']);
			$newLevel=getLevel($results['Value']+$value);
			$diffrence=$newLevel-$oldLevel;
		
			$query="UPDATE tbl_charactercharacteristic
					SET Value = Value + $value WHERE `CharacterID` = $cID AND `CharacteristicID` = 1;";
			mysqli_query($link,$query) or die (mysqli_error($link));
		
			$query="UPDATE tbl_character
					SET BuffTokens = BuffTokens + $diffrence WHERE `CharacterID` = $cID AND `UserID` = $userID;";
			mysqli_query($link,$query) or die (mysqli_error($link));
		} 
	}
}else {
	$errorCode=1;
	$success=false;
}

if($success){
	$reultrs = array("success"=>$success,"newXP"=>$results['Value']+$value,"levelChange"=>$diffrence);
}else
{
	$reultrs = array("success"=>$success, "error_code" => $errorCode);
}
echo json_encode($reultrs);

?>