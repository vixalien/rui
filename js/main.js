/* menu-drops */
// A VIX Asset.
// Use responsibly

function registerMenus() {
	/* Get All Menu togglers */
	var menuclicks = document.querySelectorAll(".menu-toggle");
	for (var i = 0; i < menuclicks.length; i++) {
		/* If Menu toggle on hover */
		if (menuclicks[i].className.indexOf("hover")>=0) {
			/* On mouse enter, show the target */
			menuclicks[i].onmouseenter = event => { 
				var target = document.querySelector(event.target.getAttribute("target"));
				target.setAttribute("open","");
				/* Calculate whether the menu drop below or above the target */
				/* New algorithm: check if the element's width is greater than the botom */
				if((screen.availHeight - (event.target.offsetHeight + event.target.offsetTop)) > target.offsetHeight) {
					/* There is more space above */
					target.style.top = (event.target.offsetTop + event.target.offsetHeight) + "px";
				} else {
					target.style.top = (event.target.offsetTop - (target.offsetHeight)) + "px";
				}
				/* Also for left and right */
				if((screen.availWidth - (event.target.offsetWidth + event.target.offsetLeft)) > target.offsetWidth) {
					/* There is more space above */
					target.style.left = (event.target.offsetLeft) + "px";
				} else {
					target.style.left = event.target.offsetLeft - (target.offsetWidth - event.target.offsetWidth) + "px";
				}
			}
			/* On mouse leave, hide the target */
			menuclicks[i].onmouseleave = event => { 
				var target = document.querySelector(event.target.getAttribute("target"));
				/* If is going to hovered menu, don't hide it */
				if(document.elementsFromPoint(event.clientX, event.clientY).includes(target)) {
					target.onmouseleave = event => {
						target.onmouseleave = e => {};
						target.removeAttribute("open");
					}
				} else {
					target.removeAttribute("open");
				}
			}
		} else if (menuclicks[i].className.indexOf("click")>=0) {
			menuclicks[i].onclick = event => {
				var target = document.querySelector(event.target.getAttribute("target"));
				/* We can't do this later, firstly calculate the offsets */
				target.toggleAttribute("open");
				/* Calculate whether the menu drop below or above the target */
				/* New algorithm: check if the element's width is greater than the botom */
				if((screen.availHeight - (event.target.offsetHeight + event.target.offsetTop)) > target.offsetHeight) {
					/* There is more space above */
					target.style.top = (event.target.offsetTop + event.target.offsetHeight) + "px";
				} else {
					target.style.top = (event.target.offsetTop - (target.offsetHeight)) + "px";
				}
				/* Also for left and right */
				if((screen.availWidth - (event.target.offsetWidth + event.target.offsetLeft)) > target.offsetWidth) {
					/* There is more space above */
					target.style.left = (event.target.offsetLeft) + "px";
				} else {
					target.style.left = event.target.offsetLeft - (target.offsetWidth - event.target.offsetWidth) + "px";
				}
			}
		}
	}
	// body...
}
document.addEventListener("load", registerMenus());
document.addEventListener("change", registerMenus());
/* notification */
// A VIX Asset.
// Use responsibly
function closeAllNotifs() {
	var notifs = document.querySelectorAll(".notif-float");
	if (notifs) {
		for (var i = 0; i < notifs.length; i++) {
			notifs[i].remove();
		}
	}
}

function notif(content,type) {
	button = document.createElement("button");
	button.classList.add("notif-close");
	button.innerHTML = "x";
	elem = document.createElement("aside");
	elem.appendChild(button);
	elem.classList.add("notif");
	elem.classList.add("notif-float");
	elem.classList.add("notif-"+type);
	// The user provided raw html, append as it is
	if(content.startsWith("<")) {
		elem.innerHTML = content;
	} else {
		// The user provided basic text
		// Create a new p element
		p = document.createElement("p");
		p.innerHTML = content;
		content = p.outerHTML;
		elem.appendChild(p);
	}
	/* TODO: Use a stack to record active notifs so that multiple notifs
	 * can be displayed at the same time.
	 * Close all notifs then append the notif and refresh notifs list */
	closeAllNotifs();
	document.body.appendChild(elem);
	registerNotifs();
}
function registerNotifs() {
	var notifs = document.querySelectorAll(".notif");
	// Register all close buttons
	for (var i = 0; i < notifs.length; i++) {
		var notifb = notifs[i].querySelectorAll(".notif-close");
		if(notifb.length>0) {
		for (var j = 0; j < notifb.length; j++) {
			notifb[j].addEventListener("click",
				function(e) {
					var parent = e.target;
					var brak = 0;
					while(brak!=1) {
						if (parent.tagName.toUpperCase()=="BODY") {
							brak=1;
							break;
						}
						if (parent.classList.contains("notif")>0) {
							/* TODO: If the notif is a floating one, first update the stack */
							parent.remove();
							brak=1;
							break;
						}
						parent = parent.parentElement;
					}
				}
			);
		}
		}
	}
}

document.addEventListener("load", registerNotifs());
document.addEventListener("change", registerNotifs());
/* sidebar */
// A VIX Asset.
// Use responsibly

function registerSidebarTogglers() {
	var sidebartogglers = document.querySelectorAll(".sidebar-toggler");
	for (var i = 0; i < sidebartogglers.length; i++) {
		sidebartogglers[i].onclick = e => {
			/* Loop thru parents, if parent is a sidebar, toggle open */
			var parent = e.target;
			var brak = 0;
			while(brak!=1) {
				if (parent.tagName.toUpperCase()=="BODY") {
					brak=1;
					break;
				}
				if (parent.classList.contains("sidebar")>0) {
					/* THis is the sidebar, toggle open it */
					parent.toggleAttribute("open");
					brak=1;
					break;
				}
				parent = parent.parentElement;
			}
		}
	}
}

document.addEventListener("load", registerSidebarTogglers());
/* dialog */
// A VIX Asset.
// Use responsibly
function closeOpenDialogs() {
	/* Close all open dialogs */
	var opendialogs = document.querySelectorAll("dialog[open]");
	if (opendialogs) {
		for (var i = 0; i < opendialogs.length; i++) {
			opendialogs[i].removeAttribute("open");
		}
	}
	/* Close all shadows */
	var dialogshadows = document.querySelectorAll(".dialog-shadow");
	if (dialogshadows) {
		for (var i = 0; i < dialogshadows.length; i++) {
			dialogshadows[i].remove()
		}
	}
}

function registerDialogs() {
	/* First reset window dialogs */
	window.dialogTriggers = []
	/* Get All Dialog togglers */
	var dialogclicks = document.querySelectorAll(".dialog-trigger");
	for (var i = 0; i < dialogclicks.length; i++) {
		/* Add this to window dialogs */
		window.dialogTriggers = window.dialogTriggers.concat(dialogclicks[i]);
		dialogclicks[i].onclick = e => {
			/* Close all open dialogs */
			closeOpenDialogs();
			/* Open the dialog specified */
			var target = document.querySelector(e.target.getAttribute("target"));
			if(target) {
				target.setAttribute("open","");
			}
			/* Add a shadow element */
			var shadow = document.createElement("div");
			shadow.classList.add("dialog-shadow");
			shadow.onclick = e => {
				closeOpenDialogs();
			}
			document.body.appendChild(shadow);
		}
	}
	/* All dialog closers */
	var dialogcloses = document.querySelectorAll(".dialog-close");
	for (var i = 0; i < dialogcloses.length; i++) {
		/* close open dialogs on click */
		dialogcloses[i].onclick = e => {
			closeOpenDialogs();
		}
	}
}

document.addEventListener("load", registerDialogs());
document.addEventListener("change", registerDialogs());