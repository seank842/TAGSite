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
	
	$query="SELECT e.EquipID,e.OwnershipID,i.ItemID,i.Name AS ItemName, i.Value, i.TypeID, t.Name AS TypeName, i.SlotID, s.Name AS SlotName
			FROM tbl_equip AS e
			JOIN tbl_ownership AS o ON e.OwnershipID = o.OwnershipID
			JOIN tbl_item As i ON o.ItemID = i.ItemID
			JOIN tbl_itemtype AS t ON i.TypeID = t.TypeID
			JOIN tbl_slot AS s ON i.SlotID = s.SlotID
			WHERE e.CharacterID = $cID";
	
	$query = mysqli_query($link,$query);
	
}else {
	$errorCode=1;
	$success=false;
}

if($success){
	
	$results['item'] = array();
	while($line = mysqli_fetch_array($query)){
    	array_push($results ["item"], $line);
	}
	$reultrs = array("success"=>$success,"items"=>$results);
}else
{
	$reultrs = array("success"=>$success, "error_code" => $errorCode);
}
echo json_encode($reultrs);

?>