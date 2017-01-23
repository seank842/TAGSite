<?php
require_once '../functions.php';
$link=sqlcon();

$success=true;
$errorCode=0;
$operand=array();

		
	$query="SELECT i.ItemID, i.Name AS ItemName, i.Value,i.ImageURL , i.TypeID, t.Name AS TypeName, i.SlotID, s.Name AS SlotName
	FROM tbl_item AS i
	JOIN tbl_itemtype AS t ON i.TypeID = t.TypeID
	JOIN tbl_slot AS s ON i.SlotID = s.SlotID";
	$query = mysqli_query($link,$query);
	
	




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
