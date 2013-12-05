mobileapp
========
Compile Handlebars
handlebars hbrs/* -m > www/js/tmpl.js


DB Notes
========
content:18     key = 'ptt-adaptors-cords'
questions       new field: 'type', values ('button','drop-down')
questions:assessment
    'in-ear' => 'in-the-ear'
    'over-ear' => 'over-the-ear'
    'adaptors' => 'ptt-adaptors-cords'

single quotes must be: ' (ASCII code 0x27)
double quotes are not allowed; use &quot; or two single quotes for html tag attributes

characters not allowed:
[^\x00-\x7F|™|—|–|®|©|°|≤|’]