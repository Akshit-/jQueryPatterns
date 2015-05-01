#!/bin/bash

music="../audio/train1.wav"
if [ -n "$1" ] ; then
    if [ "$1" == "-h" ] ; then
        echo "Usage: "
        echo "$0 [music-file]"
        exit
    fi

    music=$1
fi


./sonic-annotator -t beats.n3 $music -w csv --csv-stdout
