
// JSRE scripts 
// for easier use of commandline
// of ethereum clones.
//
// (c) 2016 AltSheets Dev
//
//     gsoil attach
//     loadScript("altsheets.js")
//     help()
//
// now also works for other currencies, in
//     gexp attach
//     geth attach
//     gshift attach


var version=        "v0.3.14";


var fee=0.00105; // hardcoded, for now.
var welcome = "'altsheets.js' version "+version+". ";
var HOMEPAGE= "https://github.com/altsheets/ethjsre"

//////////////////////////// identify platform

function contains(string,searchfor) { return string.indexOf(searchfor) > -1 }
function startswith(string,searchfor) { return string.indexOf(searchfor) == 0 }
var currency, blockchainApi, blockchainApiName;

if (startswith(web3.version.client,      "Geth"))  currency='ether'
else if (startswith(web3.version.client, "Gsoil")) currency='soil'
else if (startswith(web3.version.client, "Gexp"))  currency='expanse'
else if (startswith(web3.version.client, "SHIFT")) currency='shf'
else throw welcome + " Unknown currency, please contact me ("+HOMEPAGE+"). Ending now.";

console.log(welcome+" Identified platform as '"+currency+"', good. Type 'help()' now.")

////////////////////////// each platform is a bit different:

var hasFn_syncing=true; // flag if function exists (in SHF doesn't)

if (currency=='ether' || currency=='soil') {
	blockchainApi=eth;
	blockchainApiName ="eth";
	blockchainApi2Name="eth";
}
if (currency=='expanse') {
	blockchainApi=web3.exp;
	blockchainApiName ="web3.exp";
	blockchainApi2Name="exp";     // some functions are over here
}
if (currency=='shf') {
	blockchainApi=web3.eth;
	blockchainApiName ="web3.eth";
	blockchainApi2Name="shf";     // some functions are over here
	hasFn_syncing=false;          // and .syncing does not exist at all?
}

/////////////////////////// yes, donate. Thanks.

var	altsheets={};
altsheets['soil']="0x8da4fc05ca343e6a41646194e91931d9f413a40c";
altsheets['ether']="0x8024025176437c9637270ed5bec04be55352be72";
altsheets['expanse']="0x00842185ca99bbabf4536e1dd4b1bf974f7f3c85";
altsheets['shf']="0xf8e9d1f0967b4da8422b8f866920758bbac48f2a";

/////////////////////////// my scripts

function failIfShf(){
	if (currency=="shf") throw "Not yet working for SHF. Wait for next version."
	// SHF has redefined fromWei and toWei - needs trying out.
}
	
function showAllBalances() {
	// goes through all   personal.listAccounts, 
	// and prints and sums balances.
	
	failIfShf()
	
	var total=0;
	personal.listAccounts.forEach(function(id){
		// console.log(  blockchainApi.getBalance(id)  );
		balance=web3.fromWei(blockchainApi.getBalance(id),currency);
		console.log(id, balance, currency);
		total+=parseFloat(balance);
	});
	return total;
};

var bal=showAllBalances;  // shortcut for the above

function send(addrFrom, addrTo, amount) {
	// sends currency from to, already subtracting fee
	
	failIfShf()
	
	var result = blockchainApi.sendTransaction({
		from: addrFrom, 
		to: addrTo,
		value: web3.toWei( amount - fee, currency)
		});
	return result;
};

///////// show situation, in one line:

function epoch2human(epoch){
	// timestamp to human readable time
	var myDate = new Date( epoch *1000);
	return myDate.toGMTString();
}

function status(){
	// basic info about node, and sync status

	var n=blockchainApi.blockNumber;
	var p=net.peerCount;
	var h="?";
	if (hasFn_syncing){
		h=blockchainApi.syncing;
		if (h==false) h=n;
		else h=h.highestBlock;
	}
	var B=blockchainApi.getBlock(parseInt(n));
	var d=Math.round(B.difficulty / 100000000)/10;
	var ts=epoch2human(B.timestamp);
	var Bbf=blockchainApi.getBlock(n-1);
	var BT=B.timestamp-Bbf.timestamp
	
	mystring = p+" peers. Block "+n+" of "+h+". Date "+ts+". Blocktime "+BT+"s. Difficulty ~"+d+" billion.";
	return mystring;
}

///////// statusLoop() is especially useful while syncing:

function sleep( sleepDuration ){
	// the given sleep function didn't work for me, so ...
    var now = new Date().getTime();
    while(new Date().getTime() < now + sleepDuration){ /* do nothing */ } 
	return; 
}

function statusLoop(){
	// runs forever, until killed.
	
	var sleepTime=5000
	console.log("This will print every "+sleepTime+"ms. Kill the process to stop the loop.")
	while (true){ 
		console.log( status() )
		sleep(sleepTime)
		// stop at keypress? https://github.com/robertkrimen/otto/issues/162
		// Workaround: Kill the whole process to end the loop.
	}
}

//////////////////////////// summary 	

function help() {
	// shows useful commands
	
	console.log("--- useful built in commands ---");
	console.log("personal.listAccounts");
	console.log('personal.newAccount("choose-a-good-password")');
	console.log("admin.nodeInfo");
	console.log("net.peerCount");
	console.log("admin.peers");
	console.log(blockchainApiName+".blockNumber");
	console.log(blockchainApi2Name+".pendingTransactions");
	console.log("exit");
	console.log("--- extended by my scripts ---");
	console.log("showAllBalances()");
	console.log("bal()");
	console.log("send(addrFrom,addrTo,"+currency+"AmountInclFee)");
	console.log("status()")
	console.log("statusLoop()")
	console.log("--- version "+version+" --- perhaps newer at "+HOMEPAGE);
	return "please reward altsheets: ["+currency+"] " + altsheets[currency];
}


