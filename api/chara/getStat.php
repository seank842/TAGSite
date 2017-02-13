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
	
	$query="SELECT c.CharacterID,c.CharacteristicID,s.Name,c.Value
	FROM tbl_charactercharacteristic AS c
	JOIN tbl_characteristic AS s ON c.CharacteristicID = s.CharacteristicID
	WHERE c.CharacterID = $cID";
	
	$query = mysqli_query($link,$query);
	
}else {
	$errorCode=1;
	$success=false;
}

if($success){
	
	$results['stat'] = array();
	while($line = mysqli_fetch_array($query)){
		if($line["CharacteristicID"]==1){
			array_push($results ["stat"], 
			array(
			"0"=> "$cID",
        	"1"=> "0",
        	"2"=> "Level Value",
        	"3"=> (string)getLevel($line['Value']),
        	"CharacterID"=> "$cID",
        	"CharacteristicID"=> "0",
        	"Name"=> "Level Value",
        	"Value"=> (string)getLevel($line['Value'])));
		}
    	array_push($results ["stat"], $line);
		
	}
	$reultrs = array("success"=>$success,"Starts"=>$results);
}else
{
	$reultrs = array("success"=>$success, "error_code" => $errorCode);
}
echo json_encode($reultrs);

?>