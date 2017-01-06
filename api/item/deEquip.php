<?php
require_once '../functions.php';
$link=sqlcon();

$success=true;
$errorCode=0;
$operand=array("EquipID","Token");
if(missingOperand($operand,$_POST)){
	$data=strip($link);
	
	$equip=$data['EquipID'];
	$token=$data['Token'];
	$userID = auth($token,$link);
	if($userID<0){
		$errorCode=abs($userID);
		$success=false;
		
	} else
	{
		$query="DELETE e
		FROM tbl_equip AS e
		JOIN tbl_ownership AS o ON e.OwnershipID = o.OwnershipID
		WHERE o.UserID = $userID AND e.EquipID = $equip;";
		$result=mysqli_query($link, $query) or die (mysqli_error($link));
		$results=mysqli_fetch_array($result);
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