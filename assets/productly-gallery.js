document.addEventListener('DOMContentLoaded', function() {
  // Initialize product gallery on homepage
  function initProductGallery() {
      const galleryContainer = document.querySelector('[data-image-gallery]');
      if (!galleryContainer) return;

      const mainImageContainer = galleryContainer.querySelector('[data-image-gallery-main]');
      const thumbnailContainer = galleryContainer.querySelector('.productView-for');
      
      if (!mainImageContainer || !thumbnailContainer) return;
      const mobileThumb  = parseInt(thumbnailContainer.getAttribute('data-max-thumbnail-to-show')) || 3;

      // Initialize main image slider
      const $mainImages = $(mainImageContainer);
      if ($mainImages.length && !$mainImages.hasClass('slick-initialized')) {
          $mainImages.slick({
              slidesToShow: 1,
              slidesToScroll: 1,
              arrows: false,
              fade: false,
              asNavFor: '.productView-for',
              rtl: window.rtl_slick || false,
              infinite: false
          });
      }

      // Initialize thumbnail slider
      const $thumbnails = $(thumbnailContainer);
      if ($thumbnails.length && !$thumbnails.hasClass('slick-initialized')) {
          $thumbnails.slick({
              slidesToShow: mobileThumb,
              slidesToScroll: 1,
              asNavFor: '[data-image-gallery-main]', 
              dots: false,
              arrows: true,
              centerMode: false,
              focusOnSelect: true,
              rtl: window.rtl_slick || false,
              infinite: false,
              responsive: [
                  {
                      breakpoint: 1024,
                      settings: {
                          slidesToShow: mobileThumb,
                          arrows: false,
                          dots: false
                      }
                  },
                  {
                      breakpoint: 768,
                      settings: {
                          slidesToShow: mobileThumb,
                          slidesToScroll: 1,
                          arrows: false,
                          dots: false,
                          centerMode: false,
                          variableWidth: false
                      }
                  },
                  {
                      breakpoint: 480,
                      settings: {
                          slidesToShow: mobileThumb,
                          slidesToScroll: 1,
                          arrows: false,
                          dots: false,
                          centerMode: false
                      }
                  }
              ]
          });
      }

      // Add click handlers for thumbnails
      thumbnailContainer.addEventListener('click', function(e) {
          const thumbnail = e.target.closest('.productView-thumbnail');
          if (!thumbnail) return;
          
          e.preventDefault();
          const mediaId = thumbnail.getAttribute('data-media-id');
          if (!mediaId) return;
          
          // Find the corresponding main image
          const targetImage = mainImageContainer.querySelector(`[data-media-id="${mediaId}"]`);
          if (targetImage) {
              const slideIndex = Array.from(mainImageContainer.children).indexOf(targetImage);
              $mainImages.slick('slickGoTo', slideIndex);
          }
      });
  }

  // Initialize when DOM is ready
  initProductGallery();
  
  // Re-initialize if needed (for dynamic content)
  if (window.Shopify && window.Shopify.designMode) {
      document.addEventListener('shopify:section:load', initProductGallery);
  }
});
