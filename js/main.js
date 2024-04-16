const sr = ScrollReveal ({
    distance: '25px',
    duration: 2500,
    reset: true
});

sr.reveal('hero', {delay:190, origin:'bottom'});
sr.reveal('.about,.services,.projects,.contact', {delay:200, origin:'bottom'});