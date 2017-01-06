<?php
require_once '../functions.php';
$link=sqlcon();

$success=true;
$errorCode=0;
$operand=array("OwnershipID","CharID","Token");
if(missingOperand($operand,$_POST)){
	$data=strip($link);
	
	$ownershipID=$data['OwnershipID'];
	$charID=$data['CharID'];
	$token=$data['Token'];
	$userID = auth($token,$link);
	if($userID<0){
		$errorCode=abs($userID);
		$success=false;
		
	} else
	{
		$query="SELECT *
		FROM tbl_ownership
		WHERE UserID = $userID AND OwnershipID = $ownershipID;";
		$result=mysqli_query($link, $query) or die (mysqli_error($link));
		if(mysqli_num_rows($result)!=1){
			$errorCode=2;
			$success=false;	
		}
		else
		{
			$results=mysqli_fetch_array($result);
			$itemID=$results['ItemID'];
			$query="SELECT *
			FROM tbl_equip
			WHERE OwnershipID = $ownershipID AND CharacterID = $charID;";
			$result=mysqli_query($link, $query) or die (mysqli_error($link));
			if(mysqli_num_rows($result)!=0){
				$errorCode=3;
				$success=false;	
			}
			else
			{
				$query="SELECT *
				FROM tbl_requirment
				WHERE ItemID = $itemID;";
				$result=mysqli_query($link, $query) or die (mysqli_error($link));
				while($line = mysqli_fetch_array($result))
				{
					$charist=$line['CharacteristicID'];
    				$query="SELECT *
					FROM tbl_charactercharacteristic
					WHERE CharacterID = $charID AND CharacteristicID = $charist;";
					$subResult=mysqli_query($link, $query) or die (mysqli_error($link));
					$charchar = mysqli_fetch_array($subResult);
					if(mysqli_num_rows($subResult)==0)
					{
						$errorCode=4;
						$success=false;	
					} else if($charchar['Value']<$line['Value'])
					{
						$errorCode=4;
						$success=false;	
					}	
				}
			}		
		}
	}


}else {
	$errorCode=1;
	$success=false;
}

if($success){
	$query="SELECT * 
	FROM tbl_item AS i 
	JOIN tbl_characterslot AS c ON i.SlotID = c.SlotID 
	WHERE i.ItemID = $itemID AND c.CharacterID = $charID";
	$result=mysqli_query($link, $query) or die (mysqli_error($link));
	if(mysqli_num_rows($result)==0){
		$errorCode=5;
		$success=false;	
		}
		else
		{
			$results=mysqli_fetch_array($result);
			$slotID=$results['SlotID'];
			$query="SELECT * FROM `tbl_equip` AS e
					JOIN tbl_ownership AS o ON e.OwnershipID = o.OwnershipID
					JOIN tbl_item As i ON o.ItemID = i.ItemID
					WHERE i.SlotID = $slotID AND e.CharacterID = $charID";
			$result=mysqli_query($link, $query) or die (mysqli_error($link));
			if(mysqli_num_rows($result)!=0){
				$errorCode=5;
				$success=false;	
			}
		}
}

if($success){
	$query="INSERT INTO tbl_equip
			(OwnershipID, CharacterID) VALUES($ownershipID,$charID)";
	mysqli_query($link,$query) or die (mysqli_error($link));
	
	$reultrs = array("success"=>$success);
}else
{
	$reultrs = array("success"=>$success, "error_code" => $errorCode);
}
echo json_encode($reultrs);

?>