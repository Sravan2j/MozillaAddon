cd data
java -Xmx500m -cp "." DownloaderApp test.js
cd ../
java -cp "./data/js.jar" org.mozilla.javascript.tools.jsc.Main data/test2.js > data/opcodes.txt
java -cp "./data" CheckOpcodes data/opcodes1.txt data/opcodes.txt > $1