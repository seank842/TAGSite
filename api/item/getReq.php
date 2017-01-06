<?php
require_once '../functions.php';
$link=sqlcon();

$success=true;
$errorCode=0;
$operand=array("ItemID");
if(missingOperand($operand,$_POST)){
	$data=strip($link);
	
	$itemID=$data['ItemID'];
	$userID = auth($token,$link);
	
	$query="SELECT c.CharacteristicID,c.ItemID,s.Name,c.Value
	FROM tbl_requirment AS c
	JOIN tbl_characteristic AS s ON c.CharacteristicID = s.CharacteristicID
	WHERE c.ItemID = $itemID";
	
	$query = mysqli_query($link,$query);
	
}else {
	$errorCode=1;
	$success=false;
}

if($success){
	
	$results['requirment'] = array();
	while($line = mysqli_fetch_array($query)){
    	array_push($results ["requirment"], $line);
		
	}
	$reultrs = array("success"=>$success,"requirments"=>$results);
}else
{
	$reultrs = array("success"=>$success, "error_code" => $errorCode);
}
echo json_encode($reultrs);

?>