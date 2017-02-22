<?php
require_once '../functions.php';
$link=sqlcon();

$success=true;
$errorCode=0;
$operand=array("ItemID","Token");
if(missingOperand($operand,$_POST)){
	$data=strip($link);
	
	$itemID=$data['ItemID'];
	$token=$data['Token'];
	$userID = auth($token,$link);
	if($userID<0){
		$errorCode=abs($userID);
		$success=false;
		
	} else
	{
		$query="SELECT Money
		FROM tbl_user
		WHERE UserID = $userID;";
		$result=mysqli_query($link, $query) or die (mysqli_error($link));
		$results=mysqli_fetch_array($result);
		$balence=$results['Money'];
		
		$query="SELECT Value
		FROM tbl_item
		WHERE ItemID = $itemID;";
		$result=mysqli_query($link, $query) or die (mysqli_error($link));
		$results=mysqli_fetch_array($result);
		$cost=$results['Value'];
	
			 if($cost<=$balence){
		
			$query="UPDATE tbl_user
			SET Money = Money - $cost WHERE `UserID` = $userID;";
			mysqli_query($link,$query) or die (mysqli_error($link));
		
			$query="INSERT INTO tbl_ownership
			(ItemID, UserID) VALUES($itemID,$userID)";
		
			mysqli_query($link,$query) or die (mysqli_error($link));
		} else {
			$errorCode=2;
			$success=false;	
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