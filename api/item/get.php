<?php
require_once '../functions.php';
$link=sqlcon();

$success=true;
$errorCode=0;
$operand=array("ItemID");
if(missingOperand($operand,$_POST)){
	$data=strip($link);
	
	$ItemID=$data['ItemID'];
	
	$query="SELECT i.Name AS ItemName, i.Value, i.TypeID, t.Name AS TypeName, i.SlotID, s.Name AS SlotName
	FROM tbl_item AS i
	JOIN tbl_itemtype AS t ON i.TypeID = t.TypeID
	JOIN tbl_slot AS s ON i.SlotID = s.SlotID
	WHERE i.ItemID = $ItemID";
	
	$query = mysqli_query($link,$query);
	$results=mysqli_fetch_array($query);
	
}else {
	$errorCode=1;
	$success=false;
}

if($success){
	
	$reultrs = array("success"=>$success,"Item"=>$results);
}else
{
	$reultrs = array("success"=>$success, "error_code" => $errorCode);
}
echo json_encode($reultrs);

?>