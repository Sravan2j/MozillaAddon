java -cp "./data/js.jar" org.mozilla.javascript.tools.jsc.Main data/test.js > data/opcodes.txt
java -cp "./data" CheckOpcodes data/opcodes1.txt data/opcodes.txt > $1
