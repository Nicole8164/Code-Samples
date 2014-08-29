<?php
?>
<!DOCTYPE html>
<html>

<head>
	<script type="text/javascript" src="ThirdParty/markup/markup.min.js">
	</script>
	<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css">
	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
	<script type="text/javascript" src="js/layout.js"></script>
	<script type="text/javascript" src="js/layout_markup.js"></script>
	<link rel="stylesheet" type="text/css" href="css/main.css">
</head>

<body>
	<div class="title">
		<div class="container">
			<div class="row">
				<div class="col-lg-10">
					<h1>Select Analytic Combination To Search Log Files</h1>
				</div>
			</div>
		</div>
	</div>

	<div class="searchForm">
		<div class="container">
			<div class="row">
				<div class="col-lg-10">
					<form id="searchOptions" class="form-inline" role="form">
						<div class="form-group">
			                    <label class="sr-only">Choose Verb</label>
			                    <div class="input-group">
			                    	<select id="verb" class="form-control" onChange="check(this);">
							       			<option value="choose">Choose Verb</option>
					                    	<option value="login">Login</option>
					                    	<option value="sign_up">Sign Up</option>
					                    	<option value="watch">Watch</option>
							      </select>
				                </div>
			            </div>

			            <div class="form-group">
			                    <label class="sr-only">Choose Noun</label>
							    <div class="input-group">
				                    <select id="noun" disabled="disabled" class="form-control">
				                    	<option class="choose">Choose Noun</option>
				                    	<option class="user" value="user">User</option>
				                    	<option class="video" value="video">Video</option>
				                    </select>
				                </div>
			            </div>

			            <div class="form-group">
				            <div class="col-sm-offset-2">
					            <button  class="btn btn-primary btn-s" id="searchButton">Search</button> 
				            </div>
				        </div>
			        </form>
			    </div>
			</div>
		</div>
	</div>

	<div class="searchResults">
		<div class="container">
			<div class="row">
				<div class="col-lg-10">
					<div class="searchTable" style="display:none;">
						<table class="table table-striped table-bordered">
							<thead>
								<tr>
								</tr>
							</thead>

							<tbody >

											
							</tbody>
							
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>

</body>
</html>