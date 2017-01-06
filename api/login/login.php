<?php
require_once '../functions.php';
$link=sqlcon();

$success=true;
$errorCode=0;
$operand=array("User_Name","Password");
if(missingOperand($operand,$_POST)){
	$data=strip($link);
	
	$uname=$data['User_Name'];
	
	$query="SELECT * FROM tbl_user WHERE UserName = '$uname'";
	$result=mysqli_query($link, $query);
	if(mysqli_num_rows($result)!=1){
		$errorCode=2;
		$success=false;
		
	} 
	else
	{
		$array=mysqli_fetch_array($result);
		if($array['Password']!=hash("sha512",$data['Password'].$array['Salt'])){
			$errorCode=2;
			$success=false;
		} else
		{
			$userID=$array['UserID'];
			$token=generateRandomString(20);
			$expTime=strtotime('+24 week');
			$query="INSERT INTO tbl_token (UserID,Token,ExpiryTime) VALUES ('$userID','$token','$expTime')";
			mysqli_query($link, $query);
		}
	}

}else {
	$errorCode=1;
	$success=false;
}

if(!$success) $reultrs = array("success"=>$success, "error_code" => $errorCode);
else $reultrs = array("success"=>$success, "token" => $token);
	echo json_encode($reultrs);

?>
