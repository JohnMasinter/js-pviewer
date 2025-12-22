# bash lighttpd.sh

# allows us to test these web pages locally
# run container of lighttpd, then access via browser:
# http://localhost:8080/v0/

# on mac:
# brew install podman   # Install Podman
# podman machine init   # Initialize the Podman machine
# podman machine start  # Start the Podman machine
# ...run this script to start web server...
# podman rm -f pviewer  # Stop web server when done testing
# podman machine stop   # Stop podman vm when done testing

D=$(pwd)
set -x
podman run -d \
  --name pviewer \
  -v "$D:/var/www/html:ro" \
  -p 8080:80 \
  rtsp/lighttpd

