#!/bin/bash

date >> loc.txt
html=$(find . -type d -name node_modules -prune -o -name '*.html' -exec awk NF {} \; | wc -l)
css=$(find . -type d -name node_modules -prune -o -name '*.css' -exec awk NF {} \; | wc -l)
js=$(find . -type d -name node_modules -prune -o -name '*.js' -exec awk NF {} \; | wc -l)
tsx=$(find . -type d -name node_modules -prune -o -name '*.tsx' -exec awk NF {} \; | wc -l)


echo "HTML   $html" >> loc.txt
echo "CSS    $css" >> loc.txt
echo "Java Script ` expr  $tsx + $js`" >> loc.txt
echo "TOTAL `expr $html + $css + $js + $tsx`">> loc.txt
