$(document).ready
(
    function() 
    {
        var api = "http://samples.nicolefamulare.com/parseLogs/"

        /*
         Only certain nouns are available for each selected verb. 
         Below code stops user from choosing an unavailable noun.
        */

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
            $("option.choose_noun").prop("selected",true);
            $("#searchButton").prop("disabled", true);//Disable search if "Choose Verb" is selected
        });

        /*
         Disable the search button until a noun is choosen
        */

        $("#noun").change(function()
        {
            var noun = $("select#noun").val();

            if(noun == "choose_noun")
            {
                $("#searchButton").prop("disabled", true);
            }
            else
            {
                $("#searchButton").prop("disabled", false);
            }
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
                        if(!$.isEmptyObject(results['content']))
                        {
                            /*
                             Generates the header table row, which varies by combination pair
                            */

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

