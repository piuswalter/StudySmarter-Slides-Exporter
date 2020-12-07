#!/bin/bash

json_file="viewer/studysmarter.json"
force_dl="false"

[ -d viewer/img ] || mkdir -p viewer/img

combine_json() {
    for f in input/*.json
    do
        file=${f##*/}
        course=${file%%.*}
        echo "{ \"${course}\": `cat \"$f\"` }"
    done | jq -s 'add'
}

extract_images() {
    for dl_link in $(grep -o 'http\(s\)\?://[^\\]\+' $1)
    do
        # strip url parameters
        stripped=${dl_link%%\?*}
        img_file="img/${stripped##*\/}"

        # download image and set name
        if [ ! -f viewer/$img_file ] || [ "$force_dl" == "true" ]; then
            wget "$dl_link" -O "viewer/$img_file"
        fi
        # replace original with new link
        sed -i "s,${dl_link},${img_file},g" $1
    done
}

combine_json > $json_file
extract_images $json_file
