#/bin/bash

echo "Killing any abandoned pid files for dhcpcd..."
rm -rf /var/run/dhcp.pid

echo "done!"