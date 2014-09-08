#!/usr/bin/php
<?php

/*
	Since I'm unable to use actual data samples for this. I put together a script to generate fake data to parse.
*/

require_once("ThirdParty/generateEmail.php");

class Login{
	public $noun = "user";
	public $verb = 'login';

	function __construct($time,$logins,$user_id){
		$this->logins = $logins;
		$this->user_id = $user_id;
		$this->time = $time; 
	}

	public function generateJSON(){
		$data = array(
				'noun' => $this->noun,
				'payload' => array(
					'logins' => $this->logins,
					'user_id' => $this->user_id
					),
				'time' => $this->time,
				'verb' => $this->verb
			);
		return json_encode($data);
	}

}

class SignUp{
	public $noun = "user";
	public $verb = 'sign_up';

	function __construct($time, $email, $name, $user_id){
		$this->email = $email;
		$this->name = $name;
		$this->user_id = $user_id;
		$this->time = $time; 
	}

	public function generateJSON(){
		$data = array(
				'noun' => $this->noun,
				'payload' => array(
					'email' => $this->email,
					'name' => $this->name,
					'user_id' => $this->user_id
					),
				'time' => $this->time,
				'verb' => $this->verb
			);
		return json_encode($data);
	}

}


class Watch{
	public $noun = "video";
	public $verb = "watch";

	function __construct($time, $episode, $title, $name, $type, $user_id){
		$this->episode = $episode;
		$this->title = $title;
		$this->type = $type;
		$this->user_id = $user_id;
		$this->time = $time; 
	}

	public function generateJSON(){
		$data = array(
				'noun' => $this->noun,
				'payload' => array(
					'episode' => $this->episode,
					'title' => $this->title,
					'type' => $this->type,
					'user_id' => $this->user_id
					),
				'time' => $this->time,
				'verb' => $this->verb
			);
		return json_encode($data);
	}

}

/*
	Since these logs are dummy we want to  generate different date/time records. 
	Setting limit to be within the last month.
*/
	
function generateTime(){
	date_default_timezone_set("UTC"); 
	$date = time();
	$currentTime = $date;
	$minDateRange = $currentTime - (30 * 24 * 60 * 60);//60 days, 24 hours, 60 minutes, 60 seconds 
	$time = rand($minDateRange,$currentTime);
	return $time;
}

/*
	Creating a name with random characters and length
*/
function generateName(){
	$char = "abcdefghijklmnopqrstuvwxyz";

  	$firstLength = mt_rand(3, 8);
  	$lastLength = mt_rand(5, 10);

  	$first = "";
  	for ($i=1; $i<=$firstLength; $i++) {
    	$first .= substr($char, mt_rand(0, strlen($char)), 1);
	}

	$last = "";
    for ($i = 1; $i <= $lastLength; $i++) {
    $last .= substr($char, mt_rand(0, strlen($char)), 1);
 	}

 	$name = ucfirst($first) . " " . ucfirst($last);

    return $name;

}
/*
 	Add randomness into whether or not watch video is movie or TV
*/

function generateType(){
	$chance = rand(0,1);
	if($chance == 0){
		return "Movie";
	}
	else{
		return "TV";
	}
}

/*
	Create a new log file where each generated log record will be written to
*/

$fileName = "Data/" . time() . ".SampleData.log";
$filePath = fopen ($fileName, 'w');

for($i=0;$i<=20;$i++)//create 21 new records
{
	/*
		Since we aren't using real data we need to generate rand numbers for user logins and user_id.
	*/

	$logins = rand(0,1000);
	$user_id = rand(100,500);
	$time = generateTime();

	//Currently only 3 compbinations. Each get 7 entries created
	if($i<=6){
		$data = new Login($time,$logins,$user_id);
		$data = $data->generateJSON();
		fwrite($filePath, $data . "\n");
	}
	else if($i<=13){
		$email = generateEmail();
		$name = generateName();
		$data = new SignUp($time, $email, $name, $user_id);
		$data = $data->generateJSON();
		fwrite($filePath, $data . "\n");
	}
	else{
		$email = generateEmail();
		$type = generateType();
		if($type == "Movie"){
			$episode = NULL;
		}
		else{
			$episode = rand(0,25);
		}
		$name = generateName();
		$title = generateName();
		$data = new Watch($time, $episode, $title, $name, $type, $user_id);
		$data = $data->generateJSON();
		fwrite($filePath, $data . "\n");
	}
}

fclose($filePath);

?>