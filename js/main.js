$(document).ready(function() {
    var experience,
        joining_date = new Date(2012, 05, 04),
        today = new Date(),
        duration_in_days = (today.getTime() - joining_date.getTime())/(86400 * 1000),
        years_of_experience = parseInt(duration_in_days / 365, 10),
        remaining_days = duration_in_days - (365 * years_of_experience),
        months_of_experience = parseInt(remaining_days/30, 10);

    experience = years_of_experience + ' years';

    if ( months_of_experience ) {
        experience += ' and ' + months_of_experience +
                      (months_of_experience > 1 ? ' months' : ' month');
    }

    $( '.js-experience' ).text( experience );

    $('.js-sections-wrapper').fullpage({
        scrollingSpeed: 500,
        menu: '#main-nav'
    });
})
