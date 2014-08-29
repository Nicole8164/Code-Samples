$(document).ready
(
    function() 
    {
        var api = "http://samples.nicolefamulare.com/parseLogs/"
        $("#verb").change(function()
        {
            var verb = $("select#verb").val();

            if(verb == "watch")
            {
                $("option.user").prop("disabled",true);
                $("option.video").prop("disabled",false);
            }
            else if(verb == "login" || verb == "sign_up")
            {
                $("option.user").prop("disabled",false);
                $("option.video").prop("disabled",true);
            }
            else
            {
                $("select#noun").prop("disabled", true);
            }
            $("option.choose").prop("selected",true);
        });

        $("#searchButton").click(function(e)
        {
            var noun = $("select#noun").val();
            var verb = $("select#verb").val();
            
            var dataString = 'noun=' + noun + '&verb=' + verb;
            $.ajax
            (
                {
                    type: "POST",
                    url: api + 'parseLog.php',
                    data: dataString,
                    success: function(response)
                    {   
                        var results = $.parseJSON(response);
                        console.log(results);
                        if(!$.isEmptyObject(results['content']))
                        {
                            var header = [];
                            var headerNames =Object.keys(results['content'][0]);
                            header['titles']=headerNames;
                          

                            $(".searchTable").css("display","block");
                            $(".searchTable table thead tr").html(Mark.up(search_results_header, header));

                            /*
                             Infomration varies depending on verb/noun combinations. Following if/else is to choose the correct template to build the result tables
                            */

                            if(verb == "login")
                            {
                                $(".searchTable table tbody").html(Mark.up(search_results_login, results));

                            }
                            else if(verb == "sign_up")
                            {
                                $(".searchTable table tbody").html(Mark.up(search_results_signup, results));
                            }
                            else if(verb == "watch")
                            {

                                $(".searchTable table tbody").html(Mark.up(search_results_watch, results));
                            }
                            $("#error").css("display","none");
                        }
                        else
                        {
                            $("#error").html("<p style='color:red;'>Sorry, an error occurred. Please try again.</p>")
                            $("#error").css("display","block");
                            return false;
                        }
                    },
                   
                }
            );
            e.preventDefault(); //Stops ajax call from reloading page when complete
        });
    }
);

function check(elem) 
{
    document.getElementById('noun').disabled = !elem.selectedIndex;
}

