#!/bin/bash

track=108831064

if [ -n "$1" ] ; then
    if [ "$1" == "-h" ] ; then
        echo "Usage: " 
        echo "$0 <track #>"
        exit
    fi
    track=$1
fi

client_id="df1eacadddaf233fdf1c1192a27b7ce5"
file="$track.mp3"

echo "Downloading $track from SoundCloud to $file"
curl -C - -s -L "http://api.soundcloud.com/tracks/$track/stream?client_id=$client_id" -o $file
lame --decode $file
./beats.sh "$track.wav" | cut -d"," -f2 >> "$track.txt"
