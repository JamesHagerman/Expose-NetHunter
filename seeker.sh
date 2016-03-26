#/bin/bash
echo "Starting seeker..."

airmon-ng start wlan1

echo "seeker started!"
iw dev
sleep 10


echo "killing seeker..."
airmon-ng stop wlan1mon

echo "done."