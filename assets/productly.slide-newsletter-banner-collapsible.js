(function ($) {
    var productly = {
        initNewsletterBannerSlider: function() {
            var imgNewsletterBanner = $('[data-newsletter-banner-slide]');
            
            imgNewsletterBanner.each(function() {
                var self = $(this)
                self.slick({
                    infinite: true,
                    speed: 1000, 
                    arrows: true,
                    dots: true,
                    nextArrow: window.arrows.icon_next,
                    prevArrow: window.arrows.icon_prev,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    rtl: window.rtl_slick,
                });
            });
        }
    }
    productly.initNewsletterBannerSlider();
})(jQuery);
