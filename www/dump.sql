CREATE TABLE __WebKitDatabaseInfoTable__ (key TEXT NOT NULL ON CONFLICT FAIL UNIQUE ON CONFLICT REPLACE,value TEXT NOT NULL ON CONFLICT FAIL);
INSERT INTO "__WebKitDatabaseInfoTable__" VALUES('WebKitDatabaseVersionKey','1.0');
CREATE TABLE answers (
    "answer_id" INTEGER NOT NULL,
    "question_id" INTEGER NOT NULL,
    "answer_text" TEXT
, "node_type" TEXT, "node_id" INTEGER);
INSERT INTO "answers" VALUES(1,1,'Yes','question',2);
                                                                                         0
CREATE TABLE "content" (
    "content_id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    "screen" TEXT,
    "key" TEXT,
    "value" TEXT
);
INSERT INTO "content" VALUES(1,'cat-intro','sound-detection','{title:''Sound Detection'',header:''Getting Started'',description:''<p>Complying with regulations, selecting appropriate protection and analyzing noise control options are all easier with 3M detection Solutions instrumentation for exposure assessment, noise analysis and creating a hearing conservation program.</p><p>This guide will help you select the right instrumentation for your assessment needs with confidence. Choose your application to begin.</p><p><strong>Questions? Contact your 3M Detection Solutions representative or 3M Technical Service at 800-245-0779.</strong></p>''}');
INSERT INTO "content" VALUES(2,'select-assess',NULL,'{assessment:''Sound Detection'',assessments:[{image:''individual.jpg'',title:''Individual''},{image:''task-based.jpg'',title:''Task Based''},{image:''noise-control.jpg'',title:''Noise Control''},{image:''environmental.jpg'',title:''Environmental''},{image:''specialty.jpg'',title:''Specialty''}]}');
INSERT INTO "content" VALUES(3,'assess-intro','task-based','{title:''Task Based'',image:''task-based-full.jpg'',description:''Knowing the noise levels of a particular task or activity is crucial in developing a conservation program that helps protect workers’ hearing. This is achieved through performing an area survey focusing on measurement of the specific task or process.  Find which instrumentation you need to accurately assess your risks.''}');
INSERT INTO "content" VALUES(4,'assess-intro','individual','{title:''Individual'',image:''individual-full.jpg'',description:''Monitor individual noise exposure levels to help ensure workers are wearing the correct hearing protection. The data collected will help you establish and manage your hearing conservation program.''}');
INSERT INTO "content" VALUES(5,'assess-intro','noise-control','{title:''Noise Control'',image:''noise-control-full.jpg'',description:''Engineering or administrative controls are commonly implemented to reduce noise exposures after a sound level meter survey is performed. Find which instrument is appropriate for performing noise surveys and monitoring excessive noise in your workplace.''}');
INSERT INTO "content" VALUES(6,'assess-intro','environmental','{title:''Environmental'',image:''environmental-full.jpg'',description:''Inside or outside, loud noise can create physical and psychological stress, reduce productivity, interfere with communication and contribute to accidents. Find the appropriate instrumentation to ensure your environmental monitoring needs are as comprehensive as possible — indoors and out.''}');
INSERT INTO "content" VALUES(7,'assess-intro','specialty','{title:''Specialty'',image:''specialty-full.jpg'',description:''A loudspeaker announcement that can’t be understood or reverberation levels that affect acoustical comfort in a large space is frustrating at best — dangerous at worst. Find out what instrumentation you need to perform specialty application testing.''}');
CREATE TABLE questions (
    "question_id" INTEGER NOT NULL,
    "question_text" TEXT,
    "category" TEXT,
    "assessment" TEXT
, "description" TEXT);
INSERT INTO "questions" VALUES(1,'Do you prefer a cable-free noise dosimeter?','detection','individual','Choose yes if you want a cable-free noise dosimeter clipped to the shoulder or no if you want a belt-mounted noise dosimeter with the microphone clipped to the shoulder.');
INSERT INTO "questions" VALUES(31,'test question with 3 answers','','individual','');
CREATE TABLE "answer_nodes" (
    "answer_id" INTEGER,
    "node_id" INTEGER
);
INSERT INTO "answer_nodes" VALUES(1,2);
CREATE TABLE products (
    "product_id" INTEGER NOT NULL DEFAULT (0),
    "name" TEXT,
    "model" TEXT,
    "subhead" TEXT,
    "description" TEXT,
    "image" TEXT,
    "link" TEXT
, "category" TEXT);
INSERT INTO "products" VALUES(1,'3M™ Edge eg4','','Designed for exceptional ease of use. Personal noise measurement that doesn’t weigh you down — compact, 3-ounce unit comfortably clips to the shoulder.','<h3>Intuitive display with lockout ability</h3><p>Large, easy-to-read display provides crucial information at a glance, or can be set to inhibit display, to ensure settings and measurements can’t be tampered with.</p><h3>LED dose indicator</h3><p>LED indicator can be programmed to flash when dose level has been exceeded, helping safety managers easily identify employees who have reached their daily maximum noise dose exposure.</p><h3>Contoured for comfort</h3><p>Ergonomically designed shoulder mount provides comfort and ease of movement, even when workers are equipped with multiple monitors.</p>','det/edge_phone.png','http://solutions.3m.com/wps/portal/3M/en_US/3M-PPE-Safety-Solutions/Personal-Protective-Equipment/Products/Product-Catalog/~/3M-Edge-4-Dosimeter-Kit-EG4-1kit-cs?N=4294595398+5011378&&Nr=AND%28hrcy_id%3AWJNGMZ723Kgs_L3J510D5N8_N2RL3FHWVK_GPD0K8BC31gv%29&rt=d','detection');
CREATE TABLE "version" (
    "value" TEXT NOT NULL
);
INSERT INTO "version" VALUES('0.1');
DELETE FROM sqlite_sequence;
INSERT INTO "sqlite_sequence" VALUES('content',7);
