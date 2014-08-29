$(document).ready
(
    function() 
    {
        //getArtists();
        //getAdTable();
        var api = "http://samples.nicolefamulare.com/"
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
                        if(!$.isEmptyObject(results))
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
                        }
                        else
                        {
                            return false;
                        }
                    },
                   
                }
            );
            e.preventDefault();
        });

       /* $(".buttonAdd").click(function() 
        {
            var artist = $("select.selectArtists").val();
            var campaignName = $("input#name").val();
            var image_url = $('input#image_url').val();
            var dataString = 'artist='+ artist + '&campaignName=' + campaignName + '&image_url=' + image_url + '&image_link=link';
            $.ajax
            ({
                type: "POST",
                url: api + "/debug/cms/marketing/add",
                data: dataString,
                success: function(response) 
                {
                    var message = $.parseJSON(response);
                    if(message.success)
                    {
                        $("#addAds")[0].reset();
                        alert(message.success);
                        getAdTable();  
                        $('#addAds').css("display","none");
                        $('#updateAd').css("display","none");      
                    }
                    else
                    {
                        alert(message.error);
                    }
                }
            });
            return false;
        });
        $("button.addNew").click(function() 
        {
            $('#addAds').css("display","block");
        });*/
    }
);

function check(elem) 
{
    document.getElementById('noun').disabled = !elem.selectedIndex;
}

