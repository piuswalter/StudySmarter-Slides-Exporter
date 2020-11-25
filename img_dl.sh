#!/bin/bash

json_path="/var/www/html"
img_path="./img"

for file in "${json_path}/*.json"
do
    for link in $(grep -o 'src=\\"[^ >]\+\\">' ${file})
    do
        dl=$(echo $link | sed -e 's/src=\\"//g' -e 's/\\">//g')
        pure=${dl%%\?*} # strip url parameters
        img_url="${img_path}/${pure##*\/}"
        # wget "$dl" -O "$img_url"
        sed -i "s,${dl},${img_url},g" $file
    done
done
