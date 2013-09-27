var app = {
    events: {
        onOnline: function () {
            // Stub for when device comes online
        },
        onOffline: function () {
            // Stub for when device goes offline
        }
    },
    dal: {
        open: function () {
            if (!app.dal.db) {
                console.log('trying to open db');
                app.dal.db = window.openDatabase(
                    'products.db',
                    '',
                    'products',
                    2000000
                );
            }
        },
        error: function (err) {
            console.log('in dal.error');
            console.log(err);
            console.log(err.message);
            return null;
        },
        getRows: function (sql, id) {
            console.log('in getRows');
            app.dal.db.transaction(
                function (tx) {
                    tx.executeSql(
                        sql,
                        [],
                        function (tx, results) {
                            console.log('got results');
                            try {
                                app.dal.results = results.rows;
                                $(document.body).trigger(id, results.rows);
                            } catch(err){
                                console.log('caught an error:');
                                console.log(err.message);
                            }
                        },
                        app.dal.error
                    );
                },
                app.dal.error
            );
        },
        updateDatabase: function() {
            switch (app.dal.db.version) {
                case '':
                    app.dal.db.changeVersion('','1');

                    $(document).one('db:update', function (event) {
                        console.log('results:');
                        console.log(event.data.item(0));
                    });

                    var sqlUpdate = "CREATE TABLE IF NOT EXISTS __WebKitDatabaseInfoTable__ (key TEXT NOT NULL ON CONFLICT FAIL UNIQUE ON CONFLICT REPLACE,value TEXT NOT NULL ON CONFLICT FAIL)|INSERT INTO '__WebKitDatabaseInfoTable__' VALUES('WebKitDatabaseVersionKey','1.0')|CREATE TABLE IF NOT EXISTS answers (    'answer_id' INTEGER NOT NULL,    'question_id' INTEGER NOT NULL,    'answer_text' TEXT, 'node_type' TEXT, 'node_id' INTEGER)|INSERT INTO 'answers' VALUES(1,1,'Yes','question',2)|INSERT INTO 'answers' VALUES(2,1,'No','question',3)|INSERT INTO 'answers' VALUES(3,2,'Yes','product',2)|INSERT INTO 'answers' VALUES(4,2,'No','product',1)|INSERT INTO 'answers' VALUES(5,3,'Yes','question',4)|INSERT INTO 'answers' VALUES(6,3,'No','product',3)|INSERT INTO 'answers' VALUES(7,4,'2','product',4)|INSERT INTO 'answers' VALUES(8,4,'4','question',5)|INSERT INTO 'answers' VALUES(9,5,'Type 1','product',6)|INSERT INTO 'answers' VALUES(10,5,'Type 2','product',5)|INSERT INTO 'answers' VALUES(11,6,'Yes','question',7)|INSERT INTO 'answers' VALUES(12,6,'No','product',7)|INSERT INTO 'answers' VALUES(13,7,'Yes','question',8)|INSERT INTO 'answers' VALUES(14,7,'No','question',9)|INSERT INTO 'answers' VALUES(15,8,'Type 1','product',10)|INSERT INTO 'answers' VALUES(16,8,'Type 2','product',11)|INSERT INTO 'answers' VALUES(17,9,'Yes','question',10)|INSERT INTO 'answers' VALUES(18,9,'No','question',11)|INSERT INTO 'answers' VALUES(19,10,'Type 1','question',29)|INSERT INTO 'answers' VALUES(20,10,'Type 2','question',30)|INSERT INTO 'answers' VALUES(21,11,'Type 1','product',35)|INSERT INTO 'answers' VALUES(22,11,'Type 2','question',12)|INSERT INTO 'answers' VALUES(23,12,'Yes','product',9)|INSERT INTO 'answers' VALUES(24,12,'No','product',8)|INSERT INTO 'answers' VALUES(25,13,'Yes','question',14)|INSERT INTO 'answers' VALUES(26,13,'No','question',17)|INSERT INTO 'answers' VALUES(27,14,'Type 1','question',15)|INSERT INTO 'answers' VALUES(28,14,'Type 2','question',16)|INSERT INTO 'answers' VALUES(29,15,'1/1','product',14)|INSERT INTO 'answers' VALUES(30,15,'1/3','product',15)|INSERT INTO 'answers' VALUES(31,16,'1/1','product',12)|INSERT INTO 'answers' VALUES(32,16,'1/3','product',13)|INSERT INTO 'answers' VALUES(33,17,'Type 1','question',18)|INSERT INTO 'answers' VALUES(34,17,'Type 2','question',19)|INSERT INTO 'answers' VALUES(35,18,'1/1','product',18)|INSERT INTO 'answers' VALUES(36,18,'1/3','product',19)|INSERT INTO 'answers' VALUES(37,19,'1/1','product',16)|INSERT INTO 'answers' VALUES(38,19,'1/3','product',17)|INSERT INTO 'answers' VALUES(39,20,'Yes','question',21)|INSERT INTO 'answers' VALUES(40,20,'No','question',24)|INSERT INTO 'answers' VALUES(41,21,'Type 1','question',22)|INSERT INTO 'answers' VALUES(42,21,'Type 2','question',23)|INSERT INTO 'answers' VALUES(43,22,'1/1','product',30)|INSERT INTO 'answers' VALUES(44,22,'1/3','product',31)|INSERT INTO 'answers' VALUES(45,23,'1/1','product',28)|INSERT INTO 'answers' VALUES(46,23,'1/3','product',29)|INSERT INTO 'answers' VALUES(47,24,'Type 1','question',25)|INSERT INTO 'answers' VALUES(48,24,'Type 2','question',26)|INSERT INTO 'answers' VALUES(49,25,'1/1','product',25)|INSERT INTO 'answers' VALUES(50,25,'1/3','product',26)|INSERT INTO 'answers' VALUES(51,26,'1/1','product',24)|INSERT INTO 'answers' VALUES(52,26,'1/3','product',27)|INSERT INTO 'answers' VALUES(53,27,'Speech Intelligibility','question',28)|INSERT INTO 'answers' VALUES(54,27,'Reverberation','product',32)|INSERT INTO 'answers' VALUES(55,28,'Type 1','product',33)|INSERT INTO 'answers' VALUES(56,28,'Type 2','product',34)|INSERT INTO 'answers' VALUES(57,29,'1/1','product',14)|INSERT INTO 'answers' VALUES(58,29,'1/3','product',15)|INSERT INTO 'answers' VALUES(59,30,'1/1','product',12)|INSERT INTO 'answers' VALUES(60,30,'1/3','product',13)|INSERT INTO 'answers' VALUES(61,31,'1','question',NULL)|INSERT INTO 'answers' VALUES(62,31,'2','question',NULL)|INSERT INTO 'answers' VALUES(63,31,'3 products','product',NULL)|INSERT INTO 'answers' VALUES(1,1,'Yes','question',2)|CREATE TABLE IF NOT EXISTS questions (    'question_id' INTEGER NOT NULL,    'question_text' TEXT,    'category' TEXT,    'assessment' TEXT, 'description' TEXT)|INSERT INTO 'questions' VALUES(1,'Do you prefer a cable-free noise dosimeter?','detection','individual','Choose yes if you want a cable-free noise dosimeter clipped to the shoulder or no if you want a belt-mounted noise dosimeter with the microphone clipped to the shoulder.')|INSERT INTO 'questions' VALUES(2,'Do you need your dosimeter to be certified intrinsically safe?','detection','individual','Choose yes if you need to assess potentially hazardous environments such as mines petrochemical sites and manufacturing facilities.')|INSERT INTO 'questions' VALUES(3,'Do you need data logging capability for later analysis?','detection','individual','Choose yes if you want to retrieve download share and save instrument data with 3M™ Detection Management Software DMS.')|INSERT INTO 'questions' VALUES(4,'Do you need to simultaneously monitor against four industry standards?','detection','individual','Choose 2 or 4 depending on how many independent dosimeters your application requires. This feature allows for simultaneous measurement within one instrument.')|INSERT INTO 'questions' VALUES(5,'Choose the microphone type your application requires.','detection','individual','Choosing the accuracy of your microphone depends on your application and the regulations you need to meet. Type 1 microphones are more accurate as defined by ANSI and IEC standards. Type 2 microphones are general purpose and are usually used for basic noise survey applications.')|INSERT INTO 'questions' VALUES(6,'Do you need data logging capability for later analysis?','detection','task-based','Choose yes if you want to retrieve download share and save instrument data with 3M™ Detection Management Software DMS.')|INSERT INTO 'questions' VALUES(7,'Do you need your dosimeter to be certified intrinsically safe?','detection','task-based','Choose yes if you need to assess potentially hazardous environments such as mines')|INSERT INTO 'questions' VALUES(8,'Choose the microphone type your application requires.','detection','task-based','Choosing the accuracy of your microphone depends on your application and the regulations you need to meet. Type 1 microphones are more accurate as defined by ANSI and IEC standards. Type 2 microphones are general purpose and are usually used for basic noise survey applications.')|INSERT INTO 'questions' VALUES(9,'Do you need octave band analysis for evaluating effectiveness of noise controls?','detection','task-based',NULL)|INSERT INTO 'questions' VALUES(10,'Choose the microphone type your application requires.','detection','task-based','Choosing the accuracy of your microphone depends on your application and the regulations you need to meet. Type 1 microphones are more accurate as defined by ANSI and IEC standards. Type 2 microphones are general purpose and are usually used for basic noise survey applications.')|INSERT INTO 'questions' VALUES(11,'Choose the microphone type your application requires.','detection','task-based','Choosing the accuracy of your microphone depends on your application and the regulations you need to meet. Type 1 microphones are more accurate as defined by ANSI and IEC standards. Type 2 microphones are general purpose and are usually used for basic noise survey applications.')|INSERT INTO 'questions' VALUES(12,'Do you need a removable preamp?','detection','task-based','A removable preamp gives you the flexibility to remotely enable interference-free monitoring in potentially hazardous areas.')|INSERT INTO 'questions' VALUES(13,'Do you need data logging capability for later analysis?','detection','noise-control','Choose yes if you want to retrieve download share and save instrument data with 3M™ Detection Management Software DMS.')|INSERT INTO 'questions' VALUES(14,'Choose the microphone type your application requires.','detection','noise-control','Choosing the accuracy of your microphone depends on your application and the regulations you need to meet. Type 1 microphones are more accurate as defined by ANSI and IEC standards. Type 2 microphones are general purpose and are usually used for basic noise survey applications.')|INSERT INTO 'questions' VALUES(15,'Do you need full octave (1/1) or third octave (1/3) real time analysis?','detection','noise-control','Octave band measurement is commonly used in noise control environmental noise and hearing conservation when the frequency of a sound needs to be verified. Third octave analysis provides a more detailed analysis of the sound source.')|INSERT INTO 'questions' VALUES(16,'Do you need full octave (1/1) or third octave (1/3) real time analysis?','detection','noise-control','Octave band measurement is commonly used in noise control environmental noise and hearing conservation when the frequency of a sound needs to be verified. Third octave analysis provides a more detailed analysis of the sound source.')|INSERT INTO 'questions' VALUES(17,'Choose the microphone type your application requires.','detection','noise-control','Choosing the accuracy of your microphone depends on your application and the regulations you need to meet. Type 1 microphones are more accurate as defined by ANSI and IEC standards. Type 2 microphones are general purpose and are usually used for basic noise survey applications.')|INSERT INTO 'questions' VALUES(18,'Do you need full octave (1/1) or third octave (1/3) real time analysis?','detection','noise-control','Octave band measurement is commonly used in noise control environmental noise and hearing conservation when the frequency of a sound needs to be verified. Third octave analysis provides a more detailed analysis of the sound source.')|INSERT INTO 'questions' VALUES(19,'Do you need full octave (1/1) or third octave (1/3) real time analysis?','detection','noise-control','Octave band measurement is commonly used in noise control environmental noise and hearing conservation when the frequency of a sound needs to be verified. Third octave analysis provides a more detailed analysis of the sound source.')|INSERT INTO 'questions' VALUES(20,'Do you need data logging capability for later analysis?','detection','environmental','Choose yes if you want to retrieve download share and save instrument data with 3M™ Detection Management Software DMS.')|INSERT INTO 'questions' VALUES(21,'Choose the microphone type your application requires.','detection','environmental','Choosing the accuracy of your microphone depends on your application and the regulations you need to meet. Type 1 microphones are more accurate as defined by ANSI and IEC standards. Type 2 microphones are general purpose and are usually used for basic noise survey applications.')|INSERT INTO 'questions' VALUES(22,'Do you need full octave (1/1) or third octave (1/3) real time analysis?','detection','environmental','Octave band measurement is commonly used in noise control environmental noise and hearing conservation when the frequency of a sound needs to be verified. Third octave analysis provides a more detailed analysis of the sound source.')|INSERT INTO 'questions' VALUES(23,'Do you need full octave (1/1) or third octave (1/3) real time analysis?','detection','environmental','Octave band measurement is commonly used in noise control environmental noise and hearing conservation when the frequency of a sound needs to be verified. Third octave analysis provides a more detailed analysis of the sound source.')|INSERT INTO 'questions' VALUES(24,'Choose the microphone type your application requires.','detection','environmental','Choosing the accuracy of your microphone depends on your application and the regulations you need to meet. Type 1 microphones are more accurate as defined by ANSI and IEC standards. Type 2 microphones are general purpose and are usually used for basic noise survey applications.')|INSERT INTO 'questions' VALUES(25,'Do you need full octave (1/1) or third octave (1/3) real time analysis?','detection','environmental','Octave band measurement is commonly used in noise control environmental noise and hearing conservation when the frequency of a sound needs to be verified. Third octave analysis provides a more detailed analysis of the sound source.')|INSERT INTO 'questions' VALUES(26,'Do you need full octave (1/1) or third octave (1/3) real time analysis?','detection','environmental','Octave band measurement is commonly used in noise control environmental noise and hearing conservation when the frequency of a sound needs to be verified. Third octave analysis provides a more detailed analysis of the sound source.')|INSERT INTO 'questions' VALUES(27,'Choose the room acoustics your application requires.','detection','specialty',NULL)|INSERT INTO 'questions' VALUES(28,'Choose the microphone type your application requires.','detection','specialty','Choosing the accuracy of your microphone depends on your application and the regulations you need to meet. Type 1 microphones are more accurate as defined by ANSI and IEC standards. Type 2 microphones are general purpose and are usually used for basic noise survey applications.')|INSERT INTO 'questions' VALUES(29,'Do you need full octave (1/1) or third octave (1/3) real time analysis?','detection','task-based','Octave band measurement is commonly used in noise control environmental noise and hearing conservation when the frequency of a sound needs to be verified. Third octave analysis provides a more detailed analysis of the sound source.')|INSERT INTO 'questions' VALUES(30,'Do you need full octave (1/1) or third octave (1/3) real time analysis?','detection','task-based','Octave band measurement is commonly used in noise control environmental noise and hearing conservation when the frequency of a sound needs to be verified. Third octave analysis provides a more detailed analysis of the sound source.')|INSERT INTO 'questions' VALUES(31,'test question with 3 answers','','individual','')|INSERT INTO 'questions' VALUES(1,'Do you prefer a cable-free noise dosimeter?','detection','individual','Choose yes if you want a cable-free noise dosimeter clipped to the shoulder or no if you want a belt-mounted noise dosimeter with the microphone clipped to the shoulder.')|INSERT INTO 'questions' VALUES(31,'test question with 3 answers','','individual','')|CREATE TABLE IF NOT EXISTS 'answer_nodes' (    'answer_id' INTEGER,    'node_id' INTEGER)|INSERT INTO 'answer_nodes' VALUES(1,2)|INSERT INTO 'answer_nodes' VALUES(2,3)|INSERT INTO 'answer_nodes' VALUES(3,2)|INSERT INTO 'answer_nodes' VALUES(4,1)|INSERT INTO 'answer_nodes' VALUES(5,4)|INSERT INTO 'answer_nodes' VALUES(6,3)|INSERT INTO 'answer_nodes' VALUES(7,4)|INSERT INTO 'answer_nodes' VALUES(8,5)|INSERT INTO 'answer_nodes' VALUES(9,6)|INSERT INTO 'answer_nodes' VALUES(10,5)|INSERT INTO 'answer_nodes' VALUES(11,7)|INSERT INTO 'answer_nodes' VALUES(12,7)|INSERT INTO 'answer_nodes' VALUES(13,8)|INSERT INTO 'answer_nodes' VALUES(14,9)|INSERT INTO 'answer_nodes' VALUES(15,10)|INSERT INTO 'answer_nodes' VALUES(16,11)|INSERT INTO 'answer_nodes' VALUES(17,10)|INSERT INTO 'answer_nodes' VALUES(18,11)|INSERT INTO 'answer_nodes' VALUES(19,29)|INSERT INTO 'answer_nodes' VALUES(20,30)|INSERT INTO 'answer_nodes' VALUES(21,10)|INSERT INTO 'answer_nodes' VALUES(22,12)|INSERT INTO 'answer_nodes' VALUES(23,9)|INSERT INTO 'answer_nodes' VALUES(24,8)|INSERT INTO 'answer_nodes' VALUES(25,14)|INSERT INTO 'answer_nodes' VALUES(26,17)|INSERT INTO 'answer_nodes' VALUES(27,15)|INSERT INTO 'answer_nodes' VALUES(28,16)|INSERT INTO 'answer_nodes' VALUES(29,14)|INSERT INTO 'answer_nodes' VALUES(30,15)|INSERT INTO 'answer_nodes' VALUES(31,12)|INSERT INTO 'answer_nodes' VALUES(32,13)|INSERT INTO 'answer_nodes' VALUES(33,18)|INSERT INTO 'answer_nodes' VALUES(34,19)|INSERT INTO 'answer_nodes' VALUES(35,18)|INSERT INTO 'answer_nodes' VALUES(36,19)|INSERT INTO 'answer_nodes' VALUES(37,16)|INSERT INTO 'answer_nodes' VALUES(38,17)|INSERT INTO 'answer_nodes' VALUES(39,21)|INSERT INTO 'answer_nodes' VALUES(40,24)|INSERT INTO 'answer_nodes' VALUES(41,22)|INSERT INTO 'answer_nodes' VALUES(42,23)|INSERT INTO 'answer_nodes' VALUES(43,30)|INSERT INTO 'answer_nodes' VALUES(44,31)|INSERT INTO 'answer_nodes' VALUES(45,28)|INSERT INTO 'answer_nodes' VALUES(46,29)|INSERT INTO 'answer_nodes' VALUES(47,25)|INSERT INTO 'answer_nodes' VALUES(48,26)|INSERT INTO 'answer_nodes' VALUES(49,25)|INSERT INTO 'answer_nodes' VALUES(50,26)|INSERT INTO 'answer_nodes' VALUES(51,24)|INSERT INTO 'answer_nodes' VALUES(52,27)|INSERT INTO 'answer_nodes' VALUES(53,28)|INSERT INTO 'answer_nodes' VALUES(54,32)|INSERT INTO 'answer_nodes' VALUES(55,33)|INSERT INTO 'answer_nodes' VALUES(56,34)|INSERT INTO 'answer_nodes' VALUES(57,14)|INSERT INTO 'answer_nodes' VALUES(58,15)|INSERT INTO 'answer_nodes' VALUES(59,12)|INSERT INTO 'answer_nodes' VALUES(60,13)|INSERT INTO 'answer_nodes' VALUES(61,2)|INSERT INTO 'answer_nodes' VALUES(62,3)|INSERT INTO 'answer_nodes' VALUES(63,2)|INSERT INTO 'answer_nodes' VALUES(63,3)|INSERT INTO 'answer_nodes' VALUES(63,4)|INSERT INTO 'answer_nodes' VALUES(1,2)|CREATE TABLE IF NOT EXISTS products (    'product_id' INTEGER NOT NULL DEFAULT (0),    'name' TEXT,    'model' TEXT,    'subhead' TEXT,    'description' TEXT,    'image' TEXT,    'link' TEXT, 'category' TEXT)|INSERT INTO 'products' VALUES(1,'3M™ Edge eg4','','Designed for exceptional ease of use. Personal noise measurement that doesn’t weigh you down — compact, 3-ounce unit comfortably clips to the shoulder.','<h3>Intuitive display with lockout ability</h3><p>Large, easy-to-read display provides crucial information at a glance, or can be set to inhibit display, to ensure settings and measurements can’t be tampered with.</p><h3>LED dose indicator</h3><p>LED indicator can be programmed to flash when dose level has been exceeded, helping safety managers easily identify employees who have reached their daily maximum noise dose exposure.</p><h3>Contoured for comfort</h3><p>Ergonomically designed shoulder mount provides comfort and ease of movement, even when workers are equipped with multiple monitors.</p>','det/edge_phone.png','http://solutions.3m.com/wps/portal/3M/en_US/3M-PPE-Safety-Solutions/Personal-Protective-Equipment/Products/Product-Catalog/~/3M-Edge-4-Dosimeter-Kit-EG4-1kit-cs?N=4294595398+5011378&&Nr=AND%28hrcy_id%3AWJNGMZ723Kgs_L3J510D5N8_N2RL3FHWVK_GPD0K8BC31gv%29&rt=d','detection')|INSERT INTO 'products' VALUES(2,'3M™ Edge eg5','','Designed for exceptional ease of use. Personal noise measurement that doesn’t weigh you down — compact, 3-ounce unit comfortably clips to the shoulder.','<h3>Intuitive display with lockout ability</h3><p>Large, easy-to-read display provides crucial information at a glance, or can be set to inhibit display, to ensure settings and measurements can’t be tampered with. </p><h3>Intrinsic safety approvals</h3><p>The Edge eg5 carries intrinsic safety approvals from MSHA, SIRA (ATEX), CSA (US and Canada) and Simtars (IECEx). Monitoring can be safely performed in potentially hazardous environments where devices must be certified.</p><h3>Three independent dosimeters</h3><p>The Edge eg5 enables simultaneous measurement against as many as three industry standards, saving time and cost by reducing the need for multiple instruments.</p>','det/edge_phone.png','http://solutions.3m.com/wps/portal/3M/en_US/3M-PPE-Safety-Solutions/Personal-Protective-Equipment/Products/Product-Catalog/~/3M-Edge-5-Dosimeter-Kit-EG5-1-kit-cs?N=4294595400+5011378&&Nr=AND%28hrcy_id%3A2KVN6D21R2gs_FLLBNQBPMX_N2RL3FHWVK_GPD0K8BC31gv%29&rt=d','detection')|INSERT INTO 'products' VALUES(3,'3M™ NoisePro™ Dosimeter','','Tough enough for the job. Built with a sturdy IP-65 aluminum case for rugged and reliable noise measurement.','<h3>Efficient</h3><p>Only one instrument needed to measure two independent dosimeter readings — LCD display offers quick assessment at a glance.</p><h3>Versatile</h3><p>Optional boom microphone allows conversion to sound level meter for area sampling.</p><h3>Reliable</h3><p>Meets UL, cUL, MSHA, Ex and ATEX intrinsic safety standards.</p>','det/NoisePro_Phone.png','http://solutions.3m.com/wps/portal/3M/en_US/3M-PPE-Safety-Solutions/Personal-Protective-Equipment/Products/Product-Catalog/~/3M-NoisePro-Dosimeter-Kit-NP-1-kit-cs?N=4294602892+5011378&&Nr=AND%28hrcy_id%3AMH2SKLP8XDgs_6M69FLGX7S_N2RL3FHWVK_GPD0K8BC31gv%29&rt=d','detection')|INSERT INTO 'products' VALUES(4,'3M™ NoisePro™ Dosimeter DL','','Tough enough for the job. Built with a sturdy IP-65 aluminum case for rugged and reliable noise measurement.','<h3>Efficient</h3><p>Only one instrument needed to measure two independent dosimeter readings — LCD display offers quick assessment at a glance.</p><h3>Reliable</h3><p>Meets UL, cUL, MSHA, Ex and ATEX intrinsic safety standards.</p><h3>Flexible</h3><p>Data logging stores time history with average and maximum readings (LAVG/LEQ, SlowMax, FastMax), so data collected can be downloaded into 3M Detection Management Software DMS for further analysis and compliance reporting.</p>','det/NoisePro_Phone.png','http://solutions.3m.com/wps/portal/3M/en_US/3M-PPE-Safety-Solutions/Personal-Protective-Equipment/Products/Product-Catalog/~/3M-NoisePro-Dosimeter-Kit-NP-DL-1-kit-cs?N=4294602921+5011378&&Nr=AND%28hrcy_id%3AJ2JLXSVZL0gs_0XGW2KCD2G_N2RL3FHWVK_GPD0K8BC31gv%29&rt=d','detection')|INSERT INTO 'products' VALUES(5,'3M™ NoisePro™ Dosimeter DLX','','Tough enough for the job. Built with a sturdy IP-65 aluminum case for rugged and reliable noise measurement.','<h3>Efficient</h3><p>Only one instrument needed to measure four independent dosimeter readings — LCD display offers quick assessment at a glance.</p><h3>Reliable</h3><p>Meets UL, cUL, MSHA, Ex and ATEX intrinsic safety standards.</p><h3>Flexible</h3><p>Data logging stores time history with average and maximum readings (LAVG/LEQ, SlowMax, FastMax), so data collected can be downloaded into 3M Detection Management Software DMS for further analysis and compliance reporting.</p>','det/NoisePro_Phone.png','http://solutions.3m.com/wps/portal/3M/en_US/3M-PPE-Safety-Solutions/Personal-Protective-Equipment/Products/Product-Catalog/~/3M-NoisePro-Dosimeter-Kit-NP-DLX-1-kit-cs?N=4294602890+5011378&&Nr=AND%28hrcy_id%3A6ZJMS83JHHgs_7CZ78WCPBH_N2RL3FHWVK_GPD0K8BC31gv%29&rt=d','detection')|INSERT INTO 'products' VALUES(6,'3M™ NoisePro™ Dosimeter DLX-1','','Tough enough for the job. Built with a sturdy IP-65 aluminum case for rugged and reliable noise measurement.','<h3>Efficient</h3><p>Four dosimeters in one — only one instrument needed to measure up to four independent dosimeter readings.</p><h3>Reliable</h3><p>Meets UL, cUL, MSHA, Ex and ATEX intrinsic safety standards.</p><h3>Flexible</h3><p>Data logging stores time history with average and maximum readings (LAVG/LEQ, SlowMax, FastMax), so data collected can be downloaded into 3M Detection Management Software DMS for further analysis and compliance reporting.</p>','det/NoisePro_Phone.png','http://solutions.3m.com/wps/portal/3M/en_US/3M-PPE-Safety-Solutions/Personal-Protective-Equipment/Products/Product-Catalog/~/3M-NoisePro-Dosimeter-Kit-NP-DLX-1-1-kit-cs?N=4294602957+5011378&&Nr=AND%28hrcy_id%3A21GTH3P867gs_Q579NZ2K4Q_N2RL3FHWVK_GPD0K8BC31gv%29&rt=d','detection')|INSERT INTO 'products' VALUES(7,'3M™ Sound Detector SD-200','','A value-driven sound detection solution.','<h3>User friendly</h3><p>Simple four-button navigation to perform all functions and comes ready to take measurements; no configuration necessary. </p><h3>Smart</h3><p>Integrating feature computes the average soundpressure level (LEQ/LAVG), for easier interpretation.</p><h3>Industry compliant</h3><p>Consistent performance with accurate readings and meets applicable ANSI and IEC Class 2 standards.</p>','det/SoundDetector_phone.png','http://solutions.3m.com/wps/portal/3M/en_US/3M-PPE-Safety-Solutions/Personal-Protective-Equipment/Products/Product-Catalog/~/3M-Sound-Detector-SD-200-Kit-USB-Cable-Windscreen-1-Kit-Case?N=4294695233+5011378&Nr=AND(hrcy_id%3AFBK4BV6W8Zgs_06TK0MB247_N2RL3FHWVK_GPD0K8BC31gv)&rt=d','detection')|INSERT INTO 'products' VALUES(8,'3M™ Sound Examiner SE-402','','Consistent noise level measurement for highly variable environments.','<h3>User friendly</h3><p>Intuitive interface allows for out-of-box use with little to no training. Data logging stores time history with average and maximum readings (LAVG/LEQ, SlowMax, FastMax), so data collected can be downloaded into 3M Detection Management Software DMS for further analysis and compliance reporting.</p><h3>Versatile</h3><p>Printing capability with optional digital printer provides hard copy documentation in the field.</p><h3>Accurate</h3><p>Meets IEC61672-1 (2002) and ANSI S1.43-1997 (R2007) standards, so you can be confident that data collected is accurate.</p>','det/SE-400_402_phone.png','http://solutions.3m.com/wps/portal/3M/en_US/3M-PPE-Safety-Solutions/Personal-Protective-Equipment/Products/Product-Catalog/%7E/All-3M-Products/Industry-and-Professionals/PPE-Safety-Solutions/Detection-Solutions?Ntt=SE-402&rt=s&lps=true&x=0&y=0','detection')|INSERT INTO 'products' VALUES(9,'3M™ Sound Examiner SE-402-R','','Consistent noise level measurement for highly variable environments.','<h3>User friendly</h3><p>Intuitive interface allows for out-of-box use with little to no training. Data logging stores time history with average and maximum readings (LAVG/LEQ, SlowMax, FastMax), so data collected can be downloaded into 3M Detection Management Software DMS for further analysis and compliance reporting.</p><h3>Versatile</h3><p>Printing capability with optional digital printer provides hard copy documentation in the field.</p><h3>Accurate</h3><p>Meets IEC61672-1 (2002) and ANSI S1.43-1997 (R2007) standards, so you can be confident that data collected is accurate.</p><h3>Adaptable</h3><p>Preamp can be easily removed to enable interference-free monitoring, especially for remote use in potentially hazardous areas.</p>','det/SE-401_402R_phone.png','http://solutions.3m.com/wps/portal/3M/en_US/3M-PPE-Safety-Solutions/Personal-Protective-Equipment/Products/Product-Catalog/~/3M-Sound-Examiner-Kit-SE-402-R-Type-2-Microphone-1-kit-case?N=4294420829+5011378&&Nr=AND%28hrcy_id%3AKCNXNT8WP0gs_F11HJJWVQF_N2RL3FHWVK_GPD0K8BC31gv%29&rt=d','detection')|INSERT INTO 'products' VALUES(10,'3M™ Sound Examiner SE-401 IS','','Consistent noise level measurementfor highly variable environments.','<h3>User friendly</h3><p>Intuitive interface allows for out-of-box use with little to no training. Data logging stores time history with average and maximum readings (LAVG/LEQ, SlowMax, FastMax), so data collected can be downloaded into 3M Detection Management Software DMS for further analysis and compliance reporting.</p><h3>Intrinsically safe</h3><p>Intrinsic safety approvals from MSHA, SIRA (ATEX), CSA (US and Canada) and Simtars (IECEx). Monitoring can be safely performed in potentially hazardous environments where devices must be certified.</p><h3>Accurate</h3><p>Meets IEC61672-1 (2002) and ANSI S1.43-1997 (R2007) standards, so you can be confident that data collected is accurate.</p>','',NULL,'detection')|INSERT INTO 'products' VALUES(11,'3M™ Sound Examiner SE-402 IS','','Consistent noise level measurementfor highly variable environments.','<h3>User friendly</h3><p>Intuitive interface allows for out-of-box use with little to no training. Data logging stores time history with average and maximum readings (LAVG/LEQ, SlowMax, FastMax), so data collected can be downloaded into 3M Detection Management Software DMS for further analysis and compliance reporting.</p><h3>Intrinsically safe</h3><p>Intrinsic safety approvals from MSHA, SIRA (ATEX), CSA (US and Canada) and Simtars (IECEx). Monitoring can be safely performed in potentially hazardous environments where devices must be certified.</p><h3>Accurate</h3><p>Meets IEC61672-1 (2002) and ANSI S1.43-1997 (R2007) standards, so you can be confident that data collected is accurate.</p>','',NULL,'detection')|INSERT INTO 'products' VALUES(12,'3M™ SoundPro™ Sound Level Meter DL-2-1/1','','Robust sound measurement technology.','<h3>Comprehensive</h3><p>Accurately measures against multiple sound level standards simultaneously with two virtual meters — documents and displays noise exposure to support hearing conservation.</p><h3>Intuitive</h3><p>Large display with menu-driven interface and quick keypad calibration.</p><h3>Powerful</h3><p>Removable SD memory card plus data logging for enhanced post-processing and compatible with 3M™ Detection Management Software DMS (sold separately) for advanced reporting and analysis.</p>','det/SoundPro_phone.png','http://solutions.3m.com/wps/portal/3M/en_US/3M-PPE-Safety-Solutions/Personal-Protective-Equipment/Products/Product-Catalog/~/3M-SoundPro-Datalogging-Octave-RTA-Kit-SP-DL-2-1-1-1-kit-cs?N=4294602931+5011378&&Nr=AND%28hrcy_id%3ALK7Q80RNWJgs_V4WF5VSVLK_N2RL3FHWVK_GPD0K8BC31gv%29&rt=d','detection')|INSERT INTO 'products' VALUES(13,'3M™ SoundPro™ Sound Level Meter DL-2-1/3','','Robust sound measurement technology.','<h3>Comprehensive</h3><p>Accurately measures against multiple sound level standards simultaneously with two virtual meters — documents and displays noise exposure to support hearing conservation.</p><h3>Intuitive</h3><p>Large display with menu-driven interface and quick keypad calibration.</p><h3>Powerful</h3><p>Removable SD memory card plus data logging for enhanced post-processing and compatible with 3M™ Detection Management Software DMS (sold separately) for advanced reporting and analysis.</p>','det/SoundPro_phone.png','http://solutions.3m.com/wps/portal/3M/en_US/3M-PPE-Safety-Solutions/Personal-Protective-Equipment/Products/Product-Catalog/~/3M-SoundPro-Datalogging-Octave-RTA-Kit-SP-DL-2-1-3-1-kit-cs?N=4294602876+5011378&&Nr=AND%28hrcy_id%3A43NZ4HHNTRgs_91KD1M0M08_N2RL3FHWVK_GPD0K8BC31gv%29&rt=d','detection')|INSERT INTO 'products' VALUES(14,'3M™ SoundPro™ Sound Level Meter DL-1-1/1','','Robust sound measurement technology.','<h3>Comprehensive</h3><p>Accurately measures against multiple sound level standards simultaneously with two virtual meters — documents and displays noise exposure to support hearing conservation.</p><h3>Intuitive</h3><p>Large display with menu-driven interface and quick keypad calibration.</p><h3>Powerful</h3><p>Removable SD memory card plus data logging for enhanced post-processing and compatible with 3M™ Detection Management Software DMS (sold separately) for advanced reporting and analysis.</p>','det/SoundPro_phone.png','http://solutions.3m.com/wps/portal/3M/en_US/3M-PPE-Safety-Solutions/Personal-Protective-Equipment/Products/Product-Catalog/~/3M-SoundPro-Sound-Level-Meter-Kit-SP-DL-1-1-1-AC3-AC-300-Calibrator-1-kt-cs?N=4294548755+5011378&&Nr=AND%28hrcy_id%3ARBZ9Z2L8S5gs_0T7GJXTJJ9_N2RL3FHWVK_GPD0K8BC31gv%29&rt=d','detection')|INSERT INTO 'products' VALUES(15,'3M™ SoundPro™ Sound Level Meter DL-1-1/3','','Robust sound measurement technology.','<h3>Comprehensive</h3><p>Accurately measures against multiple sound level standards simultaneously with two virtual meters — documents and displays noise exposure to support hearing conservation.</p><h3>Intuitive</h3><p>Large display with menu-driven interface and quick keypad calibration.</p><h3>Powerful</h3><p>Removable SD memory card plus data logging for enhanced post-processing and compatible with 3M™ Detection Management Software DMS (sold separately) for advanced reporting and analysis.</p>','det/SoundPro_phone.png','http://solutions.3m.com/wps/portal/3M/en_US/3M-PPE-Safety-Solutions/Personal-Protective-Equipment/Products/Product-Catalog/~/3M-SoundPro-Datalogging-Octave-RTA-Kit-SP-DL-1-1-3-1-kit-cs?N=4294602953+5011378&&Nr=AND%28hrcy_id%3ALZK08TVZK0gs_RJM1LSWGVH_N2RL3FHWVK_GPD0K8BC31gv%29&rt=d','detection')|INSERT INTO 'products' VALUES(16,'3M™ SoundPro™ Sound Level Meter SP-SE-2-1/1','','Robust sound measurement technology.','<h3>Comprehensive</h3><p>Accurately measures against multiple sound level standards simultaneously with two virtual meters — documents and displays noise exposure to support hearing conservation.</p><h3>Intuitive</h3><p>Large display with menu-driven interface and quick keypad calibration.</p><h3>Flexible</h3><p>Preamp can be easily removed to enable interference-free environmental noise monitoring in potentially hazardous areas.</p>','det/SoundPro_phone.png','http://solutions.3m.com/wps/portal/3M/en_US/3M-PPE-Safety-Solutions/Personal-Protective-Equipment/Products/Product-Catalog/~/3M-SoundPro-Octave-RTA-Kit-SP-SE-2-1-1-1-kit-cs?N=4294602927+5011378&&Nr=AND%28hrcy_id%3ASP651FTN9Vgs_XCCTBB7XLK_N2RL3FHWVK_GPD0K8BC31gv%29&rt=d','detection')|INSERT INTO 'products' VALUES(17,'3M™ SoundPro™ Sound Level Meter SP-SE-2-1/3','','Robust sound measurement technology.','<h3>Comprehensive</h3><p>Accurately measures against multiple sound level standards simultaneously with two virtual meters — documents and displays noise exposure to support hearing conservation.</p><h3>Intuitive</h3><p>Large display with menu-driven interface and quick keypad calibration.</p><h3>Flexible</h3><p>Preamp can be easily removed to enable interference-free environmental noise monitoring in potentially hazardous areas.</p>','det/SoundPro_phone.png','http://solutions.3m.com/wps/portal/3M/en_US/3M-PPE-Safety-Solutions/Personal-Protective-Equipment/Products/Product-Catalog/~/3M-SoundPro-Octave-RTA-Kit-SP-SE-2-1-3-1-kit-cs?N=4294602947+5011378&&Nr=AND%28hrcy_id%3AKD037ZZ4L5gs_SBSXLVJ2RF_N2RL3FHWVK_GPD0K8BC31gv%29&rt=d','detection')|INSERT INTO 'products' VALUES(18,'3M™ SoundPro™ Sound Level Meter SP-SE-1-1/1','','Robust sound measurement technology.','<h3>Comprehensive</h3><p>Accurately measures against multiple sound level standards simultaneously with two virtual meters — documents and displays noise exposure to support hearing conservation.</p><h3>Intuitive</h3><p>Large display with menu-driven interface and quick keypad calibration.</p><h3>Flexible</h3><p>Preamp can be easily removed to enable interference-free environmental noise monitoring in potentially hazardous areas.</p>','det/SoundPro_phone.png','http://solutions.3m.com/wps/portal/3M/en_US/3M-PPE-Safety-Solutions/Personal-Protective-Equipment/Products/Product-Catalog/~/3M-SoundPro-Octave-RTA-Kit-SP-SE-1-1-1-1-kit-cs?N=4294602955+5011378&&Nr=AND%28hrcy_id%3APKZ40KW79Qgs_RGC2BW5QZW_N2RL3FHWVK_GPD0K8BC31gv%29&rt=d','detection')|INSERT INTO 'products' VALUES(19,'3M™ SoundPro™ Sound Level Meter SP-SE-1-1/3','','Robust sound measurement technology.','<h3>Comprehensive</h3><p>Accurately measures against multiple sound level standards simultaneously with two virtual meters — documents and displays noise exposure to support hearing conservation.</p><h3>Intuitive</h3><p>Large display with menu-driven interface and quick keypad calibration.</p><h3>Flexible</h3><p>Preamp can be easily removed to enable interference-free environmental noise monitoring in potentially hazardous areas.</p>','det/SoundPro_phone.png','http://solutions.3m.com/wps/portal/3M/en_US/3M-PPE-Safety-Solutions/Personal-Protective-Equipment/Products/Product-Catalog/~/3M-SoundPro-Octave-RTA-Kit-SP-SE-1-1-3-1-kit-cs?N=4294603004+5011378&&Nr=AND%28hrcy_id%3ASZWM2MN05Ngs_GS882451V0_N2RL3FHWVK_GPD0K8BC31gv%29&rt=d','detection')|INSERT INTO 'products' VALUES(20,'3M™ SoundPro™ Sound Level Meter SP-DL-2-1/1','','Robust sound measurement technology.','<h3>Comprehensive</h3><p>Accurately measures against multiple sound level standards simultaneously with two virtual meters — documents and displays noise exposure to support hearing conservation.</p><h3>Intuitive</h3><p>Large display with menu-driven interface and quick keypad calibration.</p><h3>Powerful</h3><p>Removable SD memory card plus data logging for enhanced post-processing and compatible with 3M™ Detection Management Software DMS (sold separately) for advanced reporting and analysis.</p>','det/SoundPro_phone.png','http://solutions.3m.com/wps/portal/3M/en_US/3M-PPE-Safety-Solutions/Personal-Protective-Equipment/Products/Product-Catalog/~/3M-SoundPro-Datalogging-Octave-RTA-Kit-SP-DL-2-1-1-1-kit-cs?N=4294602931+5011378&&Nr=AND%28hrcy_id%3ALK7Q80RNWJgs_V4WF5VSVLK_N2RL3FHWVK_GPD0K8BC31gv%29&rt=d','detection')|INSERT INTO 'products' VALUES(21,'3M™ SoundPro™ Sound Level Meter SP-DL-2-1/3','','Robust sound measurement technology.','<h3>Comprehensive</h3><p>Accurately measures against multiple sound level standards simultaneously with two virtual meters — documents and displays noise exposure to support hearing conservation.</p><h3>Intuitive</h3><p>Large display with menu-driven interface and quick keypad calibration.</p><h3>Powerful</h3><p>Removable SD memory card plus data logging for enhanced post-processing and compatible with 3M™ Detection Management Software DMS (sold separately) for advanced reporting and analysis.</p>','det/SoundPro_phone.png','http://solutions.3m.com/wps/portal/3M/en_US/3M-PPE-Safety-Solutions/Personal-Protective-Equipment/Products/Product-Catalog/~/3M-SoundPro-Datalogging-Octave-RTA-Kit-SP-DL-2-1-3-1-kit-cs?N=4294602876+5011378&&Nr=AND%28hrcy_id%3A43NZ4HHNTRgs_91KD1M0M08_N2RL3FHWVK_GPD0K8BC31gv%29&rt=d','detection')|INSERT INTO 'products' VALUES(22,'3M™ SoundPro™ Sound Level Meter SP-DL-1-1/1','','Robust sound measurement technology.','<h3>Comprehensive</h3><p>Accurately measures against multiple sound level standards simultaneously with two virtual meters — documents and displays noise exposure to support hearing conservation.</p><h3>Intuitive</h3><p>Large display with menu-driven interface and quick keypad calibration.</p><h3>Powerful</h3><p>Removable SD memory card plus data logging for enhanced post-processing and compatible with 3M™ Detection Management Software DMS (sold separately) for advanced reporting and analysis.</p>','det/SoundPro_phone.png','http://solutions.3m.com/wps/portal/3M/en_US/3M-PPE-Safety-Solutions/Personal-Protective-Equipment/Products/Product-Catalog/~/3M-SoundPro-Sound-Level-Meter-Kit-SP-DL-1-1-1-AC3-AC-300-Calibrator-1-kt-cs?N=4294548755+5011378&&Nr=AND%28hrcy_id%3ARBZ9Z2L8S5gs_0T7GJXTJJ9_N2RL3FHWVK_GPD0K8BC31gv%29&rt=d','detection')|INSERT INTO 'products' VALUES(23,'3M™ SoundPro™ Sound Level Meter SP-DL-1-1/3 ','','Robust sound measurement technology.','<h3>Comprehensive</h3><p>Accurately measures against multiple sound level standards simultaneously with two virtual meters — documents and displays noise exposure to support hearing conservation.</p><h3>Intuitive</h3><p>Large display with menu-driven interface and quick keypad calibration.</p><h3>Powerful</h3><p>Removable SD memory card plus data logging for enhanced post-processing and compatible with 3M™ Detection Management Software DMS (sold separately) for advanced reporting and analysis.</p>','det/SoundPro_phone.png','http://solutions.3m.com/wps/portal/3M/en_US/3M-PPE-Safety-Solutions/Personal-Protective-Equipment/Products/Product-Catalog/~/3M-SoundPro-Datalogging-Octave-RTA-Kit-SP-DL-1-1-3-1-kit-cs?N=4294602953+5011378&&Nr=AND%28hrcy_id%3ALZK08TVZK0gs_RJM1LSWGVH_N2RL3FHWVK_GPD0K8BC31gv%29&rt=d','detection')|INSERT INTO 'products' VALUES(24,'3M™ SoundPro™ Sound Level Meter SP-SE-2-1/1','','Robust sound measurement technology.','<h3>Comprehensive</h3><p>Accurately measures against multiple sound level standards simultaneously with two virtual meters — documents and displays noise exposure to support hearing conservation.</p><h3>Intuitive</h3><p>Large display with menu-driven interface and quick keypad calibration.</p><h3>Capable</h3><p>Offers day/night average sound level (LDN) and community noise equivalent level (CNEL), measured over a 24-hour period.</p><h3>Flexible</h3><p>Preamp can be easily removed to enable interference-free environmental noise monitoring in potentially hazardous areas.</p>','det/SoundPro_phone.png','http://solutions.3m.com/wps/portal/3M/en_US/3M-PPE-Safety-Solutions/Personal-Protective-Equipment/Products/Product-Catalog/~/3M-SoundPro-Octave-RTA-Kit-SP-SE-2-1-1-1-kit-cs?N=4294602927+5011378&&Nr=AND%28hrcy_id%3ASP651FTN9Vgs_XCCTBB7XLK_N2RL3FHWVK_GPD0K8BC31gv%29&rt=d','detection')|INSERT INTO 'products' VALUES(25,'3M™ SoundPro™ Sound Level Meter SP-SE-1-1/1','','Robust sound measurement technology.','<h3>Comprehensive</h3><p>Accurately measures against multiple sound level standards simultaneously with two virtual meters — documents and displays noise exposure to support hearing conservation.</p><h3>Intuitive</h3><p>Large display with menu-driven interface and quick keypad calibration.</p><h3>Capable</h3><p>Offers day/night average sound level (LDN) and community noise equivalent level (CNEL), measured over a 24-hour period.</p><h3>Flexible</h3><p>Preamp can be easily removed to enable interference-free environmental noise monitoring in potentially hazardous areas.</p>','det/SoundPro_phone.png','http://solutions.3m.com/wps/portal/3M/en_US/3M-PPE-Safety-Solutions/Personal-Protective-Equipment/Products/Product-Catalog/~/3M-SoundPro-Octave-RTA-Kit-SP-SE-1-1-1-1-kit-cs?N=4294602955+5011378&&Nr=AND%28hrcy_id%3APKZ40KW79Qgs_RGC2BW5QZW_N2RL3FHWVK_GPD0K8BC31gv%29&rt=d','detection')|INSERT INTO 'products' VALUES(26,'3M™ SoundPro™ Sound Level Meter SP-SE-1-1/3','','Robust sound measurement technology.','<h3>Comprehensive</h3><p>Accurately measures against multiple sound level standards simultaneously with two virtual meters — documents and displays noise exposure to support hearing conservation.</p><h3>Intuitive</h3><p>Large display with menu-driven interface and quick keypad calibration.</p><h3>Capable</h3><p>Offers day/night average sound level (LDN) and community noise equivalent level (CNEL), measured over a 24-hour period.</p><h3>Flexible</h3><p>Preamp can be easily removed to enable interference-free environmental noise monitoring in potentially hazardous areas.</p>','det/SoundPro_phone.png','http://solutions.3m.com/wps/portal/3M/en_US/3M-PPE-Safety-Solutions/Personal-Protective-Equipment/Products/Product-Catalog/~/3M-SoundPro-Octave-RTA-Kit-SP-SE-1-1-3-1-kit-cs?N=4294603004+5011378&&Nr=AND%28hrcy_id%3ASZWM2MN05Ngs_GS882451V0_N2RL3FHWVK_GPD0K8BC31gv%29&rt=d','detection')|INSERT INTO 'products' VALUES(27,'3M™ SoundPro™ Sound Level Meter SP-SE-2-1/3','','Robust sound measurement technology.','<h3>Comprehensive</h3><p>Accurately measures against multiple sound level standards simultaneously with two virtual meters — documents and displays noise exposure to support hearing conservation.</p><h3>Intuitive</h3><p>Large display with menu-driven interface and quick keypad calibration.</p><h3>Capable</h3><p>Offers day/night average sound level (LDN) and community noise equivalent level (CNEL), measured over a 24-hour period.</p><h3>Flexible</h3><p>Preamp can be easily removed to enable interference-free environmental noise monitoring in potentially hazardous areas.</p>','det/SoundPro_phone.png','http://solutions.3m.com/wps/portal/3M/en_US/3M-PPE-Safety-Solutions/Personal-Protective-Equipment/Products/Product-Catalog/~/3M-SoundPro-Octave-RTA-Kit-SP-SE-2-1-3-1-kit-cs?N=4294602947+5011378&&Nr=AND%28hrcy_id%3AKD037ZZ4L5gs_SBSXLVJ2RF_N2RL3FHWVK_GPD0K8BC31gv%29&rt=d','detection')|INSERT INTO 'products' VALUES(28,'3M™ SoundPro™ Sound Level Meter SP-DL-2-1/1','','Robust sound measurement technology.','<h3>Comprehensive</h3><p>Accurately measures against multiple sound level standards simultaneously with two virtual meters — documents and displays noise exposure to support hearing conservation.</p><h3>Intuitive</h3><p>Large display with menu-driven interface and quick keypad calibration.</p><h3>Capable</h3><p>Offers day/night average sound level (LDN) and community noise equivalent level (CNEL), measured over a 24-hour period.</p><h3>Powerful</h3><p>Removable SD memory card plus data logging for enhanced post-processing and compatible with 3M’s Detection Management Software DMS (sold separately) for advanced reporting and analysis.</p>','det/SoundPro_phone.png','http://solutions.3m.com/wps/portal/3M/en_US/3M-PPE-Safety-Solutions/Personal-Protective-Equipment/Products/Product-Catalog/~/3M-SoundPro-Datalogging-Octave-RTA-Kit-SP-DL-2-1-1-1-kit-cs?N=4294602931+5011378&&Nr=AND%28hrcy_id%3ALK7Q80RNWJgs_V4WF5VSVLK_N2RL3FHWVK_GPD0K8BC31gv%29&rt=d','detection')|INSERT INTO 'products' VALUES(29,'3M™ SoundPro™ Sound Level Meter SP-DL-2-1/3','','Robust sound measurement technology.','<h3>Comprehensive</h3><p>Accurately measures against multiple sound level standards simultaneously with two virtual meters — documents and displays noise exposure to support hearing conservation.</p><h3>Intuitive</h3><p>Large display with menu-driven interface and quick keypad calibration.</p><h3>Capable</h3><p>Offers day/night average sound level (LDN) and community noise equivalent level (CNEL), measured over a 24-hour period.</p><h3>Powerful</h3><p>Removable SD memory card plus data logging for enhanced post-processing and compatible with 3M’s Detection Management Software DMS (sold separately) for advanced reporting and analysis.</p>','det/SoundPro_phone.png','http://solutions.3m.com/wps/portal/3M/en_US/3M-PPE-Safety-Solutions/Personal-Protective-Equipment/Products/Product-Catalog/~/3M-SoundPro-Datalogging-Octave-RTA-Kit-SP-DL-2-1-3-1-kit-cs?N=4294602876+5011378&&Nr=AND%28hrcy_id%3A43NZ4HHNTRgs_91KD1M0M08_N2RL3FHWVK_GPD0K8BC31gv%29&rt=d','detection')|INSERT INTO 'products' VALUES(30,'3M™ SoundPro™ Sound Level Meter SP-DL-1-1/1','','Robust sound measurement technology.','<h3>Comprehensive</h3><p>Accurately measures against multiple sound level standards simultaneously with two virtual meters — documents and displays noise exposure to support hearing conservation.</p><h3>Intuitive</h3><p>Large display with menu-driven interface and quick keypad calibration.</p><h3>Capable</h3><p>Offers day/night average sound level (LDN) and community noise equivalent level (CNEL), measured over a 24-hour period.</p><h3>Powerful</h3><p>Removable SD memory card plus data logging for enhanced post-processing and compatible with 3M’s Detection Management Software DMS (sold separately) for advanced reporting and analysis.</p>','det/SoundPro_phone.png','http://solutions.3m.com/wps/portal/3M/en_US/3M-PPE-Safety-Solutions/Personal-Protective-Equipment/Products/Product-Catalog/~/3M-SoundPro-Sound-Level-Meter-Kit-SP-DL-1-1-1-AC3-AC-300-Calibrator-1-kt-cs?N=4294548755+5011378&&Nr=AND%28hrcy_id%3ARBZ9Z2L8S5gs_0T7GJXTJJ9_N2RL3FHWVK_GPD0K8BC31gv%29&rt=d','detection')|INSERT INTO 'products' VALUES(31,'3M™ SoundPro™ Sound Level Meter SP-DL-1-1/3','','Robust sound measurement technology.','<h3>Comprehensive</h3><p>Accurately measures against multiple sound level standards simultaneously with two virtual meters — documents and displays noise exposure to support hearing conservation.</p><h3>Intuitive</h3><p>Large display with menu-driven interface and quick keypad calibration.</p><h3>Capable</h3><p>Offers day/night average sound level (LDN) and community noise equivalent level (CNEL), measured over a 24-hour period.</p><h3>Powerful</h3><p>Removable SD memory card plus data logging for enhanced post-processing and compatible with 3M’s Detection Management Software DMS (sold separately) for advanced reporting and analysis.</p>','det/SoundPro_phone.png','http://solutions.3m.com/wps/portal/3M/en_US/3M-PPE-Safety-Solutions/Personal-Protective-Equipment/Products/Product-Catalog/~/3M-SoundPro-Datalogging-Octave-RTA-Kit-SP-DL-1-1-3-1-kit-cs?N=4294602953+5011378&&Nr=AND%28hrcy_id%3ALZK08TVZK0gs_RJM1LSWGVH_N2RL3FHWVK_GPD0K8BC31gv%29&rt=d','detection')|INSERT INTO 'products' VALUES(32,'3M™ Reverberation Option for SoundPro™ Sound Level Meter','','Robust sound measurement technology.','<h3>User friendly</h3><p>Easy set-up and operation.</p><h3>Accurate</h3><p>Measurement results are viewable in 1/1 or 1/3 octave band charts.</p><h3>Flexible</h3><p>Digital readout displays T60 results in a tabular view, decay chart view and a bar chart view.</p>','det/SoundPro_phone.png','http://solutions.3m.com/wps/portal/3M/en_US/3M-PPE-Safety-Solutions/Personal-Protective-Equipment/Products/Product-Catalog/~/3M-Reverberation-Option-for-SoundPro-REVERB-OPTION-1-kit-cs?N=4294602981+5011378&&Nr=AND%28hrcy_id%3AJHRPWQ6STXgs_KD61LR84CD_N2RL3FHWVK_GPD0K8BC31gv%29&rt=d','detection')|INSERT INTO 'products' VALUES(33,'3M™ Verifier Type 1 STI-PA Meter Verifier-1K ','','Robust sound measurement technology.','<h3>User friendly</h3><p>Easy set-up and operation with results in Speech Transmission Index-PA (STI-PA) and Common Intelligibility Scale (CIS) formats.</p><h3>Fast and accurate</h3><p>Quick 15-second measurement intervals with post-processing from meter.</p><h3>Flexible</h3><p>Sample and store ambient noise during peak business hours to perform non-disruptive after-hours studies.</p>','det/SoundPro_phone.png','http://solutions.3m.com/wps/portal/3M/en_US/3M-PPE-Safety-Solutions/Personal-Protective-Equipment/Products/Product-Catalog/~/3M-Verifier-Type-1-STIPA-Meter-Test-Tone-CD-and-Player-Verifier-1K-1-kit-cs?N=4294549179+5011378&&Nr=AND%28hrcy_id%3A5J1FC7L0S9gs_99FW6JNSLH_N2RL3FHWVK_GPD0K8BC31gv%29&rt=d','detection')|INSERT INTO 'products' VALUES(34,'3M™ Verifier Type 2 STI-PA Meter Verifier-2K ','','Robust sound measurement technology.','<h3>User friendly</h3><p>Easy set-up and operation with results in Speech Transmission Index-PA (STI-PA) and Common Intelligibility Scale (CIS) formats.</p><h3>Fast and accurate</h3><p>Quick 15-second measurement intervals with post-processing from meter.</p><h3>Flexible</h3><p>Sample and store ambient noise during peak business hours to perform non-disruptive after-hours studies.</p>','det/SoundPro_phone.png','http://solutions.3m.com/wps/portal/3M/en_US/3M-PPE-Safety-Solutions/Personal-Protective-Equipment/Products/Product-Catalog/~/3M-Verifier-Type-2-STIPA-Meter-Verifier-2K-Test-Tone-CD-and-Player-1-kit-cs?N=4294549199+5011378&&Nr=AND%28hrcy_id%3AK698R6XWKVgs_06V30PB5CH_N2RL3FHWVK_GPD0K8BC31gv%29&rt=d','detection')|INSERT INTO 'products' VALUES(0,'3M™ E-A-R Caps™ Hearing Protector Model 200','','3M™ E-A-R Caps™ are easy to put on and remove, making them ideal for intermittent protection needs.','<ul><li>Flexible, under-the-chin band</li><li> Comfortable foam caps</li><li> NRR 17 dB*</li><ul>','prot/Super_Fit_MD_311-4109_phone.png','http://solutions.3m.com/wps/portal/3M/en_US/3M-PPE-Safety-Solutions/Personal-Protective-Equipment/Products/Product-Catalog/~/3M-E-A-R-Caps-Model-200-Hearing-Protector-321-2101-100-EA-Case?N=4294785905+5011378&&Nr=AND%28hrcy_id%3ABH5963NGT1gs_KXJHX6TQMC_N2RL3FHWVK_GPD0K8BC31gv%29&rt=d','protection')|INSERT INTO 'products' VALUES(1,'3M™ Edge eg4','','Designed for exceptional ease of use. Personal noise measurement that doesn’t weigh you down — compact, 3-ounce unit comfortably clips to the shoulder.','<h3>Intuitive display with lockout ability</h3><p>Large, easy-to-read display provides crucial information at a glance, or can be set to inhibit display, to ensure settings and measurements can’t be tampered with.</p><h3>LED dose indicator</h3><p>LED indicator can be programmed to flash when dose level has been exceeded, helping safety managers easily identify employees who have reached their daily maximum noise dose exposure.</p><h3>Contoured for comfort</h3><p>Ergonomically designed shoulder mount provides comfort and ease of movement, even when workers are equipped with multiple monitors.</p>','det/edge_phone.png','http://solutions.3m.com/wps/portal/3M/en_US/3M-PPE-Safety-Solutions/Personal-Protective-Equipment/Products/Product-Catalog/~/3M-Edge-4-Dosimeter-Kit-EG4-1kit-cs?N=4294595398+5011378&&Nr=AND%28hrcy_id%3AWJNGMZ723Kgs_L3J510D5N8_N2RL3FHWVK_GPD0K8BC31gv%29&rt=d','detection')|CREATE TABLE IF NOT EXISTS 'version' (    'value' TEXT NOT NULL)|INSERT INTO 'version' VALUES('0.1')|CREATE TABLE IF NOT EXISTS content (    'content_id' INTEGER NOT NULL,    'screen' TEXT,    'key' TEXT,    'value' TEXT)|INSERT INTO 'content' VALUES(1,'cat-intro','sound-detection','{title:''Sound Detection'',header:''Getting Started'',description:''<p>Complying with regulations, selecting appropriate protection and analyzing noise control options are all easier with 3M detection Solutions instrumentation for exposure assessment, noise analysis and creating a hearing conservation program.</p><p>This guide will help you select the right instrumentation for your assessment needs with confidence. Choose your application to begin.</p><p><strong>Questions? Contact your 3M Detection Solutions representative or 3M Technical Service at 800-245-0779.</strong></p>''}')|INSERT INTO 'content' VALUES(2,'select-assess',NULL,'{assessment:''Sound Detection'',assessments:[{image:''individual.jpg'',title:''Individual''},{image:''task-based.jpg'',title:''Task Based''},{image:''noise-control.jpg'',title:''Noise Control''},{image:''environmental.jpg'',title:''Environmental''},{image:''specialty.jpg'',title:''Specialty''}]}')|INSERT INTO 'content' VALUES(3,'assess-intro','task-based','{title:''Task Based'',image:''task-based-full.jpg'',description:''Knowing the noise levels of a particular task or activity is crucial in developing a conservation program that helps protect workers’ hearing. This is achieved through performing an area survey focusing on measurement of the specific task or process.  Find which instrumentation you need to accurately assess your risks.''}')|INSERT INTO 'content' VALUES(4,'assess-intro','individual','{title:''Individual'',image:''individual-full.jpg'',description:''Monitor individual noise exposure levels to help ensure workers are wearing the correct hearing protection. The data collected will help you establish and manage your hearing conservation program.''}')|INSERT INTO 'content' VALUES(5,'assess-intro','noise-control','{title:''Noise Control'',image:''noise-control-full.jpg'',description:''Engineering or administrative controls are commonly implemented to reduce noise exposures after a sound level meter survey is performed. Find which instrument is appropriate for performing noise surveys and monitoring excessive noise in your workplace.''}')|INSERT INTO 'content' VALUES(6,'assess-intro','environmental','{title:''Environmental'',image:''environmental-full.jpg'',description:''Inside or outside, loud noise can create physical and psychological stress, reduce productivity, interfere with communication and contribute to accidents. Find the appropriate instrumentation to ensure your environmental monitoring needs are as comprehensive as possible — indoors and out.''}')|INSERT INTO 'content' VALUES(7,'assess-intro','specialty','{title:''Specialty'',image:''specialty-full.jpg'',description:''A loudspeaker announcement that can’t be understood or reverberation levels that affect acoustical comfort in a large space is frustrating at best — dangerous at worst. Find out what instrumentation you need to perform specialty application testing.''}')";
                    var lines = sqlUpdate.split('|');
                    for (var i = 0; i < lines.length; i++)    {
                        console.log('about to execute: '+lines[i]);
                        app.dal.getRows(lines[i], 'db:update')
                    }

                    break;
                default:
                    console.log('No case for db version: ' + app.dal.db.version);
                    break;
            }
        }
    },
    db_version: 0.2,
    history: [],
    templates: [],
    screens: [
        'montage',
        'cat-intro',
        'select-assess',
        'assess-intro',
        'question-container',
        'product-page'
    ],
    assessment: {
        questions: [],
        answers: [],
        getQuestionById: function (id) {
            for (var i = 0; i < app.assessment.questions.length; i++) {
                if (app.assessment.questions[i].question_id == id)
                    return app.assessment.questions[i];
            }
            return null;
        },
        getAnswerById: function (question, id) {
            for (var i = 0; i < question.answers.length; i++) {
                if (question.answers[i].id == id)
                    return question.answers[i];
            }
            return null;
        },
        question_answered: function () {
            // Determine answer and route user to next screen {question, product}
            var question_id = $(this).data('question-id');
            var answer_id = $(this).data('answer-id');

            console.log('question_id:' + question_id);
            console.log('answer_id:' + answer_id);
            try {
                var question = app.assessment.questions.pop();
                if (question != null) {
                    question.answer = app.assessment.getAnswerById(question, answer_id);
                }
            } catch (err) {
                console.log(err.message);
            }

            console.log(question);
            app.assessment.answers.push(question);

            if (question.answer.node_type == 'question') {
                app.rndrCont('question-container', null);
            }
            else if (question.answer.node_type == 'product') {
                console.log('go to product');
                app.rndrCont('product-page', question.answer.node_id);
            }
        },
        getQuestion: function () {
            if (app.assessment.answers.length) {
                if (app.assessment.answers[app.assessment.answers.length - 1].answer.node_type != 'question') {
                    return null;
                }
            }
            if (!app.assessment.assessment) {
                return null;
            }

            var sql = 'select q.question_id, q.question_text, q.description, group_concat(a.answer_id) answer_ids, ' +
                'group_concat(a.answer_text) answer_texts, group_concat(a.node_type) node_types, group_concat(n.node_id) node_ids ' +
                'from questions q ' +
                'inner join answers a on q.question_id=a.question_id ' +
                'inner join answer_nodes n on a.answer_id=n.answer_id ' +
                'where q.assessment = \'' + app.assessment.assessment + '\' ';

            if (app.assessment.answers.length) {
                // Get the question_id of the previous answer
                var question_id = app.assessment.answers[app.assessment.answers.length - 1].answer.node_id;
                sql += 'and q.question_id = ' + question_id + ' ';
            }
            sql += 'group by q.question_id order by q.question_id, a.answer_id limit 0,1';

            $(document).one('get:content', function (event) {
                try {
                    var tmp = event.data.item(0);

                    console.log('results:');
                    console.log(tmp);

                    var question = {
                        question_id: tmp.question_id,
                        title: tmp.title,
                        question: tmp.question_text,
                        description: tmp.description,
                        answers: []
                    };

                    var ans_ids = tmp.answer_ids.split(',');
                    var texts = tmp.answer_texts.split(',');
                    var node_types = tmp.node_types.split(',');
                    var node_ids_tmp = tmp.node_ids;
                    var node_ids = node_ids_tmp ? node_ids_tmp.split(',') : null;

                    console.log('ids:' + ans_ids);
                    console.log('texts:' + texts);
                    console.log('node_types:' + node_types);
                    console.log('node_ids:' + node_ids);

                    for (var j = 0; j < ans_ids.length; j++) {
                        console.log('j:' + j);

                        var ans = {
                            id: ans_ids[j],
                            text: texts[j],
                            node_type: node_types[j],
                            // Make sure node_ids AND node_ids[j] are not null before assignment
                            node_id: node_ids ? node_ids[j] ? node_ids[j] : 0 : 0 // TODO: need to handle node 0?
                        };

                        console.log('answer ' + j);
                        console.log(ans);
                        question.answers.push(ans);
                    }
                    console.log('question:');
                    console.log(question);
                    app.assessment.questions.push(question);

                    $(document.body).trigger('question:ready', question);
                }
                catch (err) {
                    console.log(err.message);
                }
            });

            console.log('sql:' + sql);
            app.dal.getRows(sql, 'get:content');
        }},
    initialize: function () {
        if (!app.dal.db)
            app.dal.open();
        if (app.dal.db.version = '')
            app.dal.updateDatabase();

        document.addEventListener('online', this.events.onOnline, false);
        document.addEventListener('offline', this.events.onOffline, false);
        $('.splash')[0].addEventListener('webkitAnimationEnd', this.home, false)
    },
    home: function () {
        app.history = [];
        app.questions = [];
        app.answers = [];
        $('.screen').removeClass('current').hide();
        $('.montage').addClass('current').css('left', '0%').show();
        $('nav.main-nav').hide();
        $('a.next,.back').one('click', app.onNav);
    },
    browse: function () {
        $('.screen').removeClass('current').hide();
        $('.browse').addClass('current').show();

        console.log($(this));

        $(this).parent('li').toggleClass('active-nav');

        // Determine if Browse is being switched on or off
        var active = $(this).closest('li').hasClass('active-nav');
        console.log('active:' + active);

        if (active) {
            $(document).one('get:content', function (event) {
                var ctx = {
                    products: []
                };

                for (var i = 0; i < event.data.length; i++) {
                    var product = {
                        id: event.data.item(i).product_id,
                        name: event.data.item(i).name
                    };
                    ctx.products.push(product);
                }

                console.log('ctx:');
                console.log(ctx);

                var tmpl = Handlebars.compile($('#product-list-tmpl').html());
                console.log('tmpl:');
                console.log(tmpl);

                var html = tmpl(ctx);
                console.log('html:');
                console.log(html);

                $('div.product-list').html(html).show();
                $('a.open-product').one('click',app.openProduct);
            });

            var sql = 'select product_id, name from products where category=\''+app.category+'\'';

            console.log('sql:' + sql);
            app.dal.getRows(sql, 'get:content');
        }
        else {
            app.home();
        }


        //var underSlide = $('.browse').siblings('.current');

        //$('.browse .not-montage').hide();

        //$('.browse').toggle();
        //$('.browse .browse-active').toggle();
        //$(underSlide).toggle();
    },
    openProduct: function() {
        var id = $(this).data('id');
        console.log('id:'+id);

        app.rndrCont('product-page', id);
        app.moveScr($('.browse'), $('.screen[data-screen=product-page]'), 'next');
    },
    onNav: function () {
        // Determine Category
        if ($(this).hasClass('det-icon'))
            app.category = 'detection';
        else if ($(this).hasClass('pro-icon'))
            app.category = 'protection';

        // Determine direction of navigation
        var dir, inc;
        if ($(this).hasClass('next')) {
            dir = 'next';
            inc = 1;
        }
        else if ($(this).hasClass('back')) {
            dir = 'back';
            inc = -1;
        }
        else
            return;

        // Determine screen to navigate to
        var curScr = $(this).parents('.screen');
        var curScrNm = curScr.data('screen');

        var nxtScrNm = app.screens[app.screens.indexOf(curScrNm) + inc];
        var nxtScr = $('[data-screen=' + nxtScrNm + ']');

        if (nxtScrNm == 'montage') {
            app.home();
            return;
        }

        // Get contextual information on the navigation
        var obj = $(this).data('subitem');
        if (!obj)
            obj = '';
        else
            obj = obj.toLowerCase().replace(' ', '-');

        // Keep track of the navigation history
        if (dir == 'next') {
            var toPush = curScrNm;
            if (obj != '')
                toPush += ':' + obj;
            app.history.push(toPush);

            // Keep track of the assessment they're using
            if (curScrNm == 'select-assess')
                app.assessment.assessment = obj;
        }
        else
            app.history.pop();

        // Add the correct class
        // TODO: This does not work on the product page because it's not routed through here
        nxtScr.removeClass('protection').removeClass('detection').addClass(app.category);

        // Prepare content and perform transitions
        app.rndrCont(nxtScrNm, obj);
        app.moveScr(curScr, nxtScr, dir);
    },
    rndrCont: function (scr, obj) {
        console.log('in rndrCont;scr:' + scr + ';obj:' + obj);

        switch (scr) {
            case 'question-container':

                $(document).one('question:ready', function (event) {
                    var question = event.data;

                    var tmpl = Handlebars.compile($('#question-tmpl').html());

                    console.log('in question container');
                    console.log(question);
                    var qtn_html = tmpl(question);
                    console.log(qtn_html);

                    if (!question)
                        console.log('Error in getting question');

                    $('[data-screen=question-container]').html(qtn_html);
                    $('a.back').one('click', app.onNav);
                    $('a.answer').one('click', app.assessment.question_answered);
                });
                app.assessment.getQuestion();
                break;

            case 'product-page':
                var sql = 'select name, model, subhead, description, image, link from products where product_id=\'' + obj + '\'';

                $(document).one('get:content', function (event) {
                    console.log('creating product');
                    try {
                        var product = {
                            name: event.data.item(0).name,
                            model: event.data.item(0).model,
                            subhead: event.data.item(0).subhead,
                            description: event.data.item(0).description,
                            image: event.data.item(0).image,
                            link: event.data.item(0).link
                        };
                        console.log('bout to compile template');
                        var tmpl = Handlebars.compile($('#product-page-tmpl').html());
                        // Possible security vulnerability here if someone has write access to DB
                        console.log('bout to render html');

                        var html = tmpl(product);
                        $('[data-screen=product-page]').html(html);
                        $('a.next,.back').one('click', app.onNav);

                        app.moveScr($('[data-screen=question-container]'), $('[data-screen=product-page]'), 'next');
                    } catch (err) {
                        console.log(err.message);
                    }
                });

                console.log('sql:' + sql);
                app.dal.getRows(sql, 'get:content');

                break;
            default:
                var content = {
                    'cat-intro': 'select value from content where screen=\'cat-intro\' and key=\'sound-detection\'',
                    'select-assess': 'select value from content where screen=\'select-assess\'',
                    'assess-intro': 'select value from content where screen=\'assess-intro\' and key=\'' + obj + '\''
                };

                try {
                    $(document).one('get:content', function (event) {
                        // TODO: figure out a way to cache the templates or precompile them
                        var tmpl = Handlebars.compile($('#' + scr + '-tmpl').html());
                        // Possible security vulnerability here if someone has write access to DB
                        var html = tmpl(eval("(" + event.data.item(0).value + ')'));
                        $('[data-screen=' + scr + ']').html(html);
                        $('a.next,.back').one('click', app.onNav);
                    });
                } catch (err) {
                    console.log(err.message);
                }
                console.log('sql:' + content[scr]);
                app.dal.getRows(content[scr], 'get:content');

                break;
        }
    },
    moveScr: function (from, to, direction) {
        var percent = {'next': [-10, 0], 'back': [100, 0]};

        to.show();
        to.addClass('current');
        from.removeClass('current');

        from.animate(
            {left: percent[direction][0] + '%'},
            250,
            'cubic-bezier(0, 0, 0.20, 1)',
            function () {
                from.hide();
            }
        );

        to.animate(
            {left: percent[direction][1] + '%'},
            250,
            'cubic-bezier(0, 0, 0.20, 1)',
            function () {
                to.show();
            }
        );

        $('a.next,.back').one('click', app.onNav);

        if (to.data('screen') != 'montage')
            $('nav.main-nav').show();
        else
            $('nav.main-nav').hide();
    }
};

app.initialize();
$('.splash').show()




$(function () {
    //Open Browse functionality
    $('a.open-browse').click(app.browse);

    //Browse next functionality
    $('a.browse-next').click(function () {
        var oldSlide = $(this).parents('.pane');
        var newSlide = $(oldSlide).next('.pane');

        $(newSlide).show();
        $(newSlide).addClass('browse-active');
        $(oldSlide).removeClass('browse-active');
        $(oldSlide).animate({
            left: '-100%'
        }, 250, 'cubic-bezier(0, 0, 0.20, 1)', function () {
            $(oldSlide).hide();
        });
        $(newSlide).animate({
            left: '0%'
        }, 250, 'cubic-bezier(0, 0, 0.20, 1)');
    });

    //Browse back functionality
    $('a.back-pane').click(function () {
        var oldSlide = $(this).parents('.pane');
        var newSlide = $(oldSlide).prev('.pane');

        $(newSlide).show();
        $(newSlide).addClass('browse-active');
        $(oldSlide).removeClass('browse-active');
        $(newSlide).animate({
            left: '0%'
        }, 250, 'cubic-bezier(0, 0, 0.20, 1)');

        $(oldSlide).animate({
            left: '100%'
        }, 250, 'cubic-bezier(0, 0, 0.20, 1)', function () {
            $(oldSlide).hide();
        });
    });

    //Open product page
    $('a.open-product').click(function () {
        var parentSection = $(this).parents('.screen');
        var productSection = $(parentSection).siblings('.product-page');
        var otherSlides = $(productSection).siblings('.detection');

        $(productSection).show();
        $(productSection).addClass('current');
        $(otherSlides).removeClass('current');
        $(otherSlides).hide();
        $(productSection).css({left: 0});
        $(parentSection).hide();
        $('.pane').hide();
        $('li.active-nav').removeClass('active-nav');
    });

    //Back up to Select Assessment Page

    $('a.open-assessments').click(function () {
        $('.select-assess').css({left: 0});
        //$('.after-assess').css({left:'100%'});
        //$('.after-assess').removeClass('current');
        $('.cat-intro').css({left: '-10%'});
        $('.select-assess').show();
        $('.cat-intro').hide();
        //$('.after-assess').hide();
        $('cat-intro').removeClass('current');
        $('.select-assess').addClass('current');
        $('.browse').hide();
        $('li.active-nav').removeClass('active-nav');
    });
});
