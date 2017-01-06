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
	
	$query="SELECT c.StatID,c.ItemID,s.Name,c.Value
	FROM tbl_itemstat AS c
	JOIN tbl_stat AS s ON c.StatID = s.StatID
	WHERE c.ItemID = $itemID";
	
	$query = mysqli_query($link,$query);
	
}else {
	$errorCode=1;
	$success=false;
}

if($success){
	
	$results['stat'] = array();
	while($line = mysqli_fetch_array($query)){
    	array_push($results ["stat"], $line);
		
	}
	$reultrs = array("success"=>$success,"Starts"=>$results);
}else
{
	$reultrs = array("success"=>$success, "error_code" => $errorCode);
}
echo json_encode($reultrs);

?>