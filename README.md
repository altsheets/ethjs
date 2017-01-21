# ethjsre
Useful scripts for the JSRE console of Ethereum (ETH) clones (SOIL, EXP). To make my life easier on the commandline. 

## Why?
I now only have to type     ``bal()``

... and I see **all the balances** on **all my addresses**, incl. the **sum** of them all.

:-)


### Preparations (once):

* unpack contents of [repo ZIP archive](https://github.com/altsheets/ethjsre/archive/master.zip) into the folder where gsoil.exe lives
* [read the JS code](https://github.com/altsheets/ethjsre/blob/master/altsheets.js), so that you trust it.


### How to start:

Start the node with peernodes already added:

        gsoil-start-with-addpeers.bat


Start the JSRE console
        
        gsoil-attach.bat
        loadScript("altsheets.js")
        help()


### History 

v0.3.16:
* BAT files for easier handling on windows - copy them all into folder where gsoil.exe lives
  * gsoil-start-with-addpeers.bat - starts the node, and adds peernodes
  * gsoil-attach.bat - print reminder how to loadScript, and attach JSRE console
* updated addpeers.js with new nodes (newest always at http://178.62.133.174:9001/#/util/peers ) 
* simplified README.md

v0.3.13:
* [github home](https://github.com/altsheets/ethjsre)
* running on 3 platforms (SOIL, EXP, ETH) !
* new ``status()`` = quick overview
* new ``statusLoop()`` - very useful during syncing


### Donation ware
If you like this, show it:
    
    [SOIL] 0x8da4fc05ca343e6a41646194e91931d9f413a40c  
    [ETH]  0x8024025176437c9637270ed5bec04be55352be72  
    [BTC]  1M4EaZVprZEmtrS3G78fMFy8yGVgdUJMXv  
Thanks.


