gsap.to(".gear-img", {
    scrollTrigger: {
        trigger: ".category-gear",
        // trigger element - viewport
        start: "top 60%",
        end: "bottom bottom",
        scrub: true,
        onEnter: () => {
            $(".studio-img").removeClass("is--active");
            $(".gear-img").addClass("is--active");
        },
        onEnterBack: () => {
            $(".gear-img").removeClass("is--active");
            $(".studio-img").addClass("is--active");
        }
    }
})