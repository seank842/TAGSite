<?php
require_once '../functions.php';
$link=sqlcon();

$success=true;
$errorCode=0;
$operand=array("Token");
if(missingOperand($operand,$_POST)){
	$data=strip($link);
	
	$token=$data['Token'];
	$userID = auth($token,$link);
	if($userID<0){
		$errorCode=abs($userID);
		$success=false;
		
	} else
	{
		
	$query="SELECT o.OwnershipID,o.ItemID,i.Name,i.Value, i.ImageURL, i.TypeID, t.Name AS TypeName, i.SlotID, s.Name AS SlotName
	FROM tbl_ownership AS o
	JOIN tbl_item AS i ON o.ItemID = i.ItemID
	JOIN tbl_itemtype AS t ON i.TypeID = t.TypeID
	JOIN tbl_slot AS s ON i.SlotID = s.SlotID
	WHERE o.UserID = $userID";
	
	$query = mysqli_query($link,$query);
	}


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