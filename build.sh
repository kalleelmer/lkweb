#!/bin/bash
#

echo > x.js
echo "Including module.js"
echo "//module.js" >> x.js
echo "(function () {" >> x.js
cat js/module.js >> x.js
echo "})();" >> x.js
echo >> x.js
echo >> x.js

for f in `echo js/include/*.js`
do
	echo "Including $f"
	echo "//"$f >> x.js
	echo "(function () {" >> x.js
	cat $f >> x.js
	echo "})();" >> x.js
	echo >> x.js
	echo >> x.js
done

for f in `echo pages/**/*.js`
do
	echo "Including $f"
	echo "//"$f >> x.js
	echo "(function () {" >> x.js
	cat $f >> x.js
	echo "})();" >> x.js
	echo >> x.js
	echo >> x.js
done

echo > x.css
for f in `echo css/*.css`
do
	echo "Including $f"
	echo "/*"$f"*/" >> x.css
	cat $f >> x.css
	echo >> x.css
	echo >> x.css
done
