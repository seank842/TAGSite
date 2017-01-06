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
	
	$query="SELECT c.CharacterID,c.SlotID,s.Name,c.Number
	FROM tbl_characterslot AS c
	JOIN tbl_slot AS s ON c.SlotID = s.SlotID
	WHERE c.CharacterID = $cID";
	
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
	$reultrs = array("success"=>$success,"Slots"=>$results);
}else
{
	$reultrs = array("success"=>$success, "error_code" => $errorCode);
}
echo json_encode($reultrs);

?>