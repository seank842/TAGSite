<?php
require_once '../functions.php';
$link=sqlcon();

$success=true;
$errorCode=0;
$operand=array("CharName","Token");
if(missingOperand($operand,$_POST)){
	$data=strip($link);
	
	$cname=$data['CharName'];
	$token=$data['Token'];
	$userID = auth($token,$link);
	if($userID<0){
		$errorCode=abs($userID);
		$success=false;
		
	} else
	{
		$query="INSERT INTO tbl_character 
		(Name,UserID,CurrentHealth,MaxHealth,Pet)
		VALUES 
		('$cname',$userID,50,50,1);";
		$result=mysqli_query($link, $query);
		
		$cID=mysqli_insert_id($link);
		
		$strength=rand(1,10);
		$agility=rand(1,10);
		$stamina=rand(1,10);
		$magic=rand(1,10);
		
		$sum=$strength+$agility+$stamina+$magic;
		$coificent=12/$sum;
		
		$strength=round ($strength*$coificent);
		$agility=round ($agility*$coificent);
		$stamina=round ($stamina*$coificent);
		$magic=round ($magic*$coificent);
		
		$query="INSERT INTO `tbl_charactercharacteristic` (`CharacterID`,`CharacteristicID`,`Value`) VALUES ($cID,1,0);";
		$result=mysqli_query($link, $query) or die (mysqli_error($link));
		$query="INSERT INTO `tbl_charactercharacteristic` (`CharacterID`,`CharacteristicID`,`Value`) VALUES ($cID,2,$strength);";
		$result=mysqli_query($link, $query) or die (mysqli_error($link));
		$query="INSERT INTO `tbl_charactercharacteristic` (`CharacterID`,`CharacteristicID`,`Value`) VALUES ($cID,3,$agility);";
		$result=mysqli_query($link, $query) or die (mysqli_error($link));
		$query="INSERT INTO `tbl_charactercharacteristic` (`CharacterID`,`CharacteristicID`,`Value`)VALUES ($cID,4,$stamina);";
		$result=mysqli_query($link, $query) or die (mysqli_error($link));
		$query="INSERT INTO `tbl_charactercharacteristic` (`CharacterID`,`CharacteristicID`,`Value`)VALUES ($cID,5,$magic);";
		$result=mysqli_query($link, $query) or die (mysqli_error($link));
		$query="INSERT INTO `tbl_charactercharacteristic` (`CharacterID`,`CharacteristicID`,`Value`)VALUES ($cID,6,0);";
		$result=mysqli_query($link, $query) or die (mysqli_error($link));
		
		$query="INSERT INTO `tbl_characterslot` (`SlotID`,`CharacterID`,`Number`) VALUES (1,$cID,1);";
		//$result=mysqli_query($link, $query) or die (mysqli_error($link));
		$query="INSERT INTO `tbl_characterslot` (`SlotID`,`CharacterID`,`Number`) VALUES (2,$cID,1);";
		//$result=mysqli_query($link, $query) or die (mysqli_error($link));
		$query="INSERT INTO `tbl_characterslot` (`SlotID`,`CharacterID`,`Number`) VALUES (3,$cID,1);";
		//$result=mysqli_query($link, $query) or die (mysqli_error($link));
		$query="INSERT INTO `tbl_characterslot` (`SlotID`,`CharacterID`,`Number`) VALUES (4,$cID,1);";
		//$result=mysqli_query($link, $query) or die (mysqli_error($link));
	}


}else {
	$errorCode=1;
	$success=false;
}

if($success){
	
	$stats=array(1=>0,2=>$strength,3=>$agility,4=>$stamina,5=>$magic,6=>0);
	$reultrs = array("success"=>$success,"CharID"=> $cID,"CharName"=>$data['CharName'],"Stats"=>$stats);
}else
{
	$reultrs = array("success"=>$success, "error_code" => $errorCode);
}
echo json_encode($reultrs);

?>