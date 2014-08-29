<?php

/*
 * Parses a directory of log files to find all records that match the searched verb/noun combo.
*/
require_once("ThirdParty/Tools/Dir.php");
require_once("ThirdParty/Tools/Arrays.php");

function parse()
{
	$noun = $_POST['noun'];
	$verb = $_POST['verb'];

	$dir = "Data/";
	$files = \Tools\Dir::read_dir($dir);

	date_default_timezone_set('America/New_York');

	$searchResults = array("content" => array());//setting up array to work with the format needed for markup.js

	foreach($files as $file)
	{
		$content = file_get_contents($file);
		$lines = array_filter(explode ("\n", $content)); 

		foreach ($lines as $line) 
		{ 
			//Need to flatten array to format information to fit in table structure
			$flattenArray=array();
			$cooked = json_decode ($line, true);
			$flattenArray = \Tools\Arrays::flatten($cooked);

			if(($flattenArray['noun'] == $noun) && ($flattenArray['verb'] == $verb) )
			{
				//Turn Unix Date Stamp into a Readable date
				$unixTime = $flattenArray['time'];
				$newDate = date('m-d-Y', $unixTime);
				$flattenArray['date'] = $newDate;

				array_push($searchResults['content'], $flattenArray);			
			}
		}
	}
	
	return json_encode($searchResults);

}

exit(parse());

?>

