<?php
require_once '../functions.php';
$link=sqlcon();

$success=true;
$errorCode=0;
$operand=array("Token");
if(missingOperand($operand,$_POST)){
	$data=strip($link);
	
	$token=$data['Token'];
	
	$query="SELECT * FROM tbl_token WHERE Token = '$token'";
	$result=mysqli_query($link, $query);
	if(mysqli_num_rows($result)!=1){
		$errorCode=100;
		$success=false;
		
	} else
	{
		$array=mysqli_fetch_array($result);
		if($array['ExpiryTime']-time() < 0){
			$errorCode=101;
			$success=false;
		}
	}


}else {
	$errorCode=1;
	$success=false;
}

if(!$success) $reultrs = array("success"=>$success, "error_code" => $errorCode);
else $reultrs = array("success"=>$success);
	echo json_encode($reultrs);

?>
