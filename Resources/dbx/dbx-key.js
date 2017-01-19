


//initialise the docking boxes manager
var manager = new dbxManager(
	'bookshelves',			// session ID [/-_a-zA-Z0-9/]
	'yes',					// enable box-ID based dynamic groups ['yes'|'no']
	'yes',					// hide source box while dragging ['yes'|'no']
	'button'				// toggle button element type ['link'|'button']
	);


//create new docking boxes group
var bookshelves = new dbxGroup(
	'bookshelves', 			// container ID [/-_a-zA-Z0-9/]
	'freeform', 			// orientation ['vertical'|'horizontal'|'freeform'|'freeform-insert'|'confirm'|'confirm-insert']
	'18', 					// drag threshold ['n' pixels]
	'no',					// restrict drag movement to container/axis ['yes'|'no']
	'10', 					// animate re-ordering [frames per transition, or '0' for no effect]
	'no', 					// include open/close toggle buttons ['yes'|'no']
	'', 					// default state ['open'|'closed']

	'', 										// word for "open", as in "open this box"
	'', 										// word for "close", as in "close this box"
	'click-down and drag to move this book', 	// sentence for "move this box" by mouse
	'', 										// pattern-match sentence for "(open|close) this box" by mouse
	'use the arrow keys to move this book', 	// sentence for "move this box" by keyboard
	'',  										// pattern-match sentence-fragment for "(open|close) this box" by keyboard
	'%mytitle%  [%dbxtitle%]', 					// pattern-match syntax for title-attribute conflicts
	
	'',											// confirm dialog sentence for "selection okay"
	''											// confirm dialog sentence for "selection not okay"
	);



