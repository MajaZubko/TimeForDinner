window.addEventListener('scroll', () => {
	if (window.pageYOffset > 300) {
		if (!backToTopButton.classList.contains('btnEntrance')) {
			backToTopButton.classList.add('btnEntrance');
			backToTopButton.classList.remove('btnExit');
			backToTopButton.style.display = 'block';
		}
	} else {
		if (backToTopButton.classList.contains('btnEntrance')) {
			backToTopButton.classList.add('btnExit');
			backToTopButton.classList.remove('btnEntrance');
			setTimeout(() => {
				backToTopButton.style.display = 'none';
			}, 250);
		}
	}
});

backToTopButton.addEventListener('click', () => {
	window.scrollTo(0, 0);
});
