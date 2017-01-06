<?php
require_once '../functions.php';
$link=sqlcon();

$success=true;
$errorCode=0;
$operand=array("User_Name","Email","Password");
if(missingOperand($operand,$_POST)){
	$data=strip($link);

	$uname=$data['User_Name'];

	$query="SELECT * FROM tbl_user WHERE UserName = '$uname'";
	$result=mysqli_query($link, $query);
	if(mysqli_num_rows($result)>=1){
		$errorCode=2;
		$success=false;

	} 
}else {
	$errorCode=1;
	$success=false;
}

$reultrs = array("success"=>$success, "error_code" => $errorCode);
echo json_encode($reultrs);

?>