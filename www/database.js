
// IMPORTANT: A relative path is required by phonegap!
var SQL_DUMP_FILE = "./../mobileapp/www/dump.sql";

database = {
    /* open the database and return a reference to it
     If the database doesn't exist yet, create it. */
    init: function()
    {
        console.log('initDatabase()');
        try
        {
            if (!window.openDatabase)
            {
                console.log('not supported');
            }
            else
            {
                var bytes = 5 * 1024 * 1024;
                db = openDatabase('color', '1.0', 'Color Schemes', bytes);
            }
        }
        catch(e)
        {
            // Error handling code goes here.
            if (e == 2)
            {
                // Version number mismatch.
                console.log("Invalid database version.");
            }
            else
            {
                console.log("database.init error "+e+".");
            }
            return null;
        }
    },

    /* Takes the *filename* which represents a text file
     made by issuing the command "sqlite .dump.sql <database_name>".

     Then splits the string into an array of strings, each elt is
     an individual SQL statment (without the trailing ';')

     Finally, execute the callback if provided
     */
    read_file: function(filename, callback)
    {
        console.log('read_file');
        /* Drop and recreate database */
        var reader = new FileReader();
        reader.onload = function(evt)
        {
            console.log('reader.onload');
            var lines = evt.target.result.split(';');
            callback && callback(lines);
            callback || console.log('no callback provided');
        };

        reader.onerror = function(evt)
        {
            console.log('fail');
            console.log(evt.target);
        };

        reader.readAsText( filename );
    },

    /* Transaction Error Callback */
    error_callback: function(error)
    {
        console.log('Oops. '+error.message+' (Code '+error.code+')');
    },

    tx_results_callback: function(tx, results)
    {
        console.log('Results: '+ JSON.stringify(tx));
    },

    /* This is used as a data handler for a request that should return no data. */
    success_callback: function()
    {
        console.log('apparently we have a success!');
    },

    /* Drop and recreate the colors database */
    populate_exec_sql: function(tx)
    {
        // drop all tables;
        tx.executeSql("select 'drop table ' || name || ';' from sqlite_master where type = 'table';");
        for (var i = 0; i < lines.length; i++)
        {
            var query = lines[i].replace(/\n/g, '');        // strip newline
            query && query.length && tx.executeSql(query); // ignore empty lines
        }
    },

    populate_db: function(lines)
    {
        db.transaction( database.populate_exec_sql, database.error_callback, database.success_callback );
    }
}

/* PhoneGap has been initialized and this function is called by the onDeviceReady event listener */
function onDeviceReady()
{
    console.log('onDeviceReady()');
    database.init();  // Global
    database.read_file( SQL_DUMP_FILE, database.populate_db );
  //  myScroll = new iScroll('scroller');
}

/* Establish an event listener for when the Phonegap APIs are initialised and ready. */
//function onBodyLoad()
//{
    document.addEventListener("deviceready", onDeviceReady, false);
//}
        