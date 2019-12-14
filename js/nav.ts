function registerSidebar(): void {
	let sidebar: Element = document.querySelector("nav.sidebar");
	sidebar.addEventListener("mouseover", 
		function() {
			setTimeout(function(e: Event) {e.target.toggleAttribute("hovered");}, 200)
		}
	);
}