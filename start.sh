#!/bin/sh

if  ! type 'supervisor' > /dev/null; then
    echo "Node supervisor is not installed, running without."
    node bin/www
else
    supervisor -n error bin/www
fi