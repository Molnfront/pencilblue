 * This is a sample configuration meant to get users and up running on a local
 * machine.  The configuration will not support multi-process on a single
 * server or multi-server/elastic environments.  For more detailed information
 * on the options provided please refer to the /include/config.js file.
 *
 * The file can be renamed to "config.js" in the same directory as this file
 * and it will be used as the configuration when PencilBlue is started.  If
 * this file is used then there is no need to create a "config.json"
 */
 var mongo = process.env.VCAP_SERVICES;
 var port = process.env.PORT || 3030;
 var conn_str = "";
 var conn_port = "";
 var username = "";
 var password = "";
 var hostname = "";
 var db_server = "";
 var db_name = "";

 if (mongo) {
   var env = JSON.parse(mongo);
   if (env['mongodb-2.4']) {
     mongo = env['mongodb-2.4'][0]['credentials'];
     if (mongo.url) {
       conn_str = mongo.url;
       conn_port = mongo.port;
       username = mongo.username;
       password = mongo.password;
       hostname = mongo.hostname;
       db_name = mongo.db;
       db_server = "mongodb://" + hostname + ":" + conn_port + "/db/";

     } else {
       console.log("No mongo found");
     }
   } else {
     conn_str = 'mongodb://localhost:27017';
   }
 } else {
   conn_str = 'mongodb://localhost:27017';
 }

module.exports = {
    "siteName": "MySite",
    "siteRoot": "http://test2.molnsys.appernetic.io",
    "logging": {
    "level": "info"
    },
    "db": {
        "type": "mongo",
        "servers": [
            db_server
        ],
        "name": db_name,
        "authentication": {
            "un": username,
            "pw": password
        },
        "writeConcern": 1
    },
    "cache": {
        "fake": true,
        "host": "localhost",
        "port": 6379
    },
    "settings": {
        "use_memory": false,
        "use_cache": false
    },
    "templates": {
        "use_memory": true,
        "use_cache": false
    },
    "plugins": {
        "caching": {
            "use_memory": false,
            "use_cache": false
        }
    },
    "registry": {
        "type": "mongo"
    },
    "session": {
        "storage": "mongo"
    },
    "media": {
        "provider": "mongo",
        "max_upload_size": 6291456
    },
    "cluster": {
        "workers": 1,
        "self_managed": true
    },
    "siteIP": "0.0.0.0"
};
    "cluster": {
        "workers": 1,
        "self_managed": true
    }
};
