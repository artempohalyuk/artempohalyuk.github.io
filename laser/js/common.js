$( document ).ready( function() {

  $( '.js-show-search' ).click( function() {
    $( this ).parent().toggleClass( 'open' );
  });

  $( '.js-hide-search' ).click( function() {
    $( this ).closest( '.search' ).toggleClass( 'open' );
  });

  $( window ).click( function( e ) {
    var $search = $( '.search' );

    if ( !$search.is( e.target ) && $search.has( e.target ).length === 0 ) {
      $search.removeClass( 'open' );
    }
  });

  $( '.js-lang-select' ).click( function() {
    var langVal = $( this ).attr( 'data-val' );

    $( '.lang__current' ).text( langVal );
  });

  var hoverLine = $( '.hover-line' );

  $( '.nav__list > .nav__item' ).each( function() {
    var offsetLeft = $( this ).offset().left;
    var linkWidth = $( this ).width();
    var alignCenter = offsetLeft + ( linkWidth / 2 );

    if ( $( this ).hasClass( 'active' ) ) {
      $( hoverLine ).fadeIn().width( alignCenter );
    }
  });

  $( '.nav__list > .nav__item' )
    .mouseenter( function( e ) {
      var offsetLeft = $( this ).offset().left;
      var linkWidth = $( this ).width();
      var alignCenter = offsetLeft + ( linkWidth / 2 );

      if ( $( this ).hasClass( 'dropdown' ) ) {
        $( hoverLine ).fadeIn().width( alignCenter - 10 );
      } else {
        $( hoverLine ).fadeIn().width( alignCenter );
      }
    });

  $( '.nav__list' ).mouseleave( function() {
    if ( $( '.nav__item' ).hasClass( 'active' ) ) {
      var active = $( '.nav__item.active' );
      var offsetLeft = $( active ).offset().left;
      var linkWidth = $( active ).width();
      var alignCenter = offsetLeft + ( linkWidth / 2 );

      $( hoverLine ).fadeIn().width( alignCenter - 10 );
    } else {
      $( hoverLine ).fadeOut( 0 );
    }
  });

  $( '.slider' ).each( function() {
    if ( $( this ).hasClass( 'comments__slider' ) ) {
      $( this ).slick({
        appendDots: $( this ).closest( '.slider-wrap' ).find( '.custom-nav' ),
        appendArrows: $( this ).closest( '.slider-wrap' ).find( '.custom-nav' )
      });
    } else {
      $( this ).slick();
    }
  });

  $( '.selectpicker' ).selectpicker({
    style: 'custom-select__btn',
    size: 4
  });

  function initMap() {
    var map = new google.maps.Map( document.getElementById( 'mapInit' ), {
      zoom: 18,
      center: { lat: 55.546122, lng: 37.5586933 }
    });

    var image = 'img/pin-map.png';
    var marker = new google.maps.Marker({
      position: { lat: 55.546122, lng: 37.5586933 },
      map: map,
      disableDefaultUI: true,
      icon: image
    });
  }

  if ( $( '#mapInit' ).length ) {
    initMap();
  }

  var navOffset = $( '.nav' ).offset().top + 60;

  $( window ).on( 'scroll', function() {

    if ( $( this ).scrollTop() > navOffset ) {
      $( '.nav' ).addClass( 'fixed' );
    } else {
      $( '.nav' ).removeClass( 'fixed' );
    }

    if ( $( this ).scrollTop() > $( window ).height() ) {
      $( '.scroll-top' ).fadeIn();
    } else {
      $( '.scroll-top' ).fadeOut();
    }
  });

  $( '.js-scroll-target' ).click( function() {
    var target = $( this ).attr( 'href' );

    $( 'html, body' ).animate( {
      scrollTop: $( target ).offset().top - 60
    }, 1000 );
  });

  $( '.js-scroll-top' ).click( function() {
    $( 'html, body' ).animate( {
      scrollTop: 0
    }, 1000 );
  });

  $( 'form' ).each( function() {
    var it = $( this );
    it.validate({
      rules: {
        name: { required: true },
        phone: { required: true },
        text: { required: true }
      },
      messages: {

      },
      errorPlacement: function( ) {

      },
      submitHandler: function( form ) {
        var thisForm = $( form );

        $.ajax({
          type: 'POST',
          url: thisForm.attr( 'action' ),
          data: thisForm.serialize()
        }).done( function() {
          $( this ).find( 'input' ).val( '' );

          $( '#thanks-modal' ).modal( 'show' );
          setTimeout( function() {
            $( '#thanks-modal' ).modal( 'hide' );
          }, 3000 );

          $( 'form' ).trigger( 'reset' );
        });
        return false;
      },
      success: function() {

      },
      highlight: function( element ) {
        $( element ).addClass( 'error' );
      },
      unhighlight: function( element ) {
        $( element ).removeClass( 'error' );
      }
    });
  });

  if ( $( window ).width() < 991 ) {
    $( '.services' ).slick({
      slidesToShow: 2,

      responsive: [
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 1
          }
        }
      ]
    });

    $( '#menu' ).mmenu({
      offCanvas: false
    });

    var API = $( '#menu' ).data( 'mmenu' );

    $( '.js-show-menu' ).click( function() {
      if ( $( this ).hasClass( 'open' ) ) {
        API.close();
      }

      $( this ).toggleClass( 'open' );
    });
  }

  if ( $( window ).width() < 767 ) {
    $( '.js-mobile-slider' ).each( function() {
      $( this ).slick({
        responsive: [
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1
            }
          }
        ]
      });
    });
  }

  $( '.js-show-category-menu' ).click( function() {
    $( this ).toggleClass( 'open' );
    $( '.category-menu' ).slideToggle();
  });

  $( '.js-play-video' ).click( function () {

    var url = $( this ).find( 'a' ).attr( 'href' );
    var matches = /\/\/(?:www\.)youtube\.com\/.*(?:\?|&)v=([^&]*)/i.exec( url );

    if ( !matches ) {
      matches = /\/\/(?:www\.)youtu\.be\/([^\?&]*)/i.exec( url );
    }

    if ( matches ) {
      var videoId = matches[ 1 ];
      $( this ).replaceWith( $( '<iframe>' ).prop( 'src', 'https://www.youtube.com/embed/' + videoId + '?autoplay=1&autohide=1&border=0&wmode=opaque&enablejsapi=1' ) );
    }
  });

});
