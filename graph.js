var files_loaded = 0;
var num_files_needed = 1;

function on_file_loaded()
{
    ++files_loaded;
    if(files_loaded == num_files_needed)
    {
        on_done_loading_files();
    }
}

function on_done_loading_files()
{
    start();
}

function load_file(fn, out)
{
    var client = new XMLHttpRequest();
    client.open('GET', fn);
    client.onreadystatechange = function() {
        if(client.readyState == 4)
        {
            var text = client.responseText;
        
            out.text = text;
            on_file_loaded();
        }
    }
    client.send();
}

var data_text = {text:""};

function graph_main()
{
    load_file("data.json", data_text);
}

function start()
{
    var data = JSON.parse(data_text.text);
   
    var time_ok = 0.0;
    var time_sharp = 0.0;
   
    for(i = 0; i < data.sessions.length; ++i)
    {
        var sharp = 
            (data.sessions[i].session_num_a +
            data.sessions[i].session_num_b +
            data.sessions[i].session_num_c) * 3 +
            data.sessions[i].session_num_d;
            
        var ok = 10 - sharp;
        
        time_ok += ok;
        time_sharp += sharp;
    }
    
    var percent_sharp = time_sharp / (time_ok + time_sharp);
    alert(percent_sharp * 100 + "%");
}