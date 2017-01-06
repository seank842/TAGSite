<?php
require_once '../functions.php';
$link=sqlcon();

$success=true;
$errorCode=0;
$operand=array("User_Name","Email","Password","g-recaptcha-response");
if(missingOperand($operand,$_POST)){
	$data=strip($link);

	$uname=$data['User_Name'];

	$query="SELECT * FROM tbl_user WHERE UserName = '$uname'";
	$result=mysqli_query($link, $query);
	if(mysqli_num_rows($result)>=1){
		$errorCode=2;
		$success=false;

	} else
	{
		$response=json_decode(
		file_get_contents(
		"https://www.google.com/recaptcha/api/siteverify?secret=6LegnhAUAAAAADPSgTYaDJg7D7-B_ucWcvjJjZx0&response=".$data['g-recaptcha-response']."&remoteip=".$_SERVER['REMOTE_ADDR']
		), true);

		if(!$response['success'])
		{
			$errorCode=3;
			$success=false;
		} else {

			$email=$data['Email'];
			$salt=generateRandomString(20);
			$password=hash("sha512",$data['Password'].$salt);

			$now = time();
			$query="INSERT INTO tbl_user (UserName,Email,Password,Salt,DateJoined) VALUES ('$uname','$email','$password','$salt',$now)";
			mysqli_query($link, $query) or die (mysqli_error($link));
		}
	}
}else {
	$errorCode=1;
	$success=false;
}

$reultrs = array("success"=>$success, "error_code" => $errorCode);
echo json_encode($reultrs);

?>