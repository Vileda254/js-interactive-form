(function IFFY ($) {
  "use strict";

  function showOtherJob() {
    var selected = $('option:selected', this).val(),
      text_box = $('#other-title');

    if (selected === "other") {
      text_box.prev().show();
      text_box.show();
    } else {
      text_box.prev().hide();
      text_box.hide();
    }
  }


  function filterColor() {
    var selected_theme = $('option:selected', this).val(),
      first_option = 0,
      $colors_wrapper = $('#colors-js-puns'),
      $color_select = $('#color'),
      $js_puns = $('.js-puns'),
      js_puns_default = $js_puns[first_option].value,
      $js_hearts = $('.js-hearts'),
      js_hearts_default = $js_hearts[first_option].value;

    if (selected_theme === 'js puns') {
      $js_hearts.hide();
      $js_puns.show();
      $color_select.val(js_puns_default);
      $colors_wrapper.show();
    } else if (selected_theme === 'heart js') {
      $js_puns.hide();
      $js_hearts.show();
      $color_select.val(js_hearts_default);
      $colors_wrapper.show();
    } else {
      $colors_wrapper.hide();
    }
  }


  function disableOverlaps(event) {
    var checkboxes = $.makeArray($(event.target).parent().siblings().children()),
      checkbox_date_str = $(event.target).parent().text(),
      first_matched_item = 0;
    checkbox_date_str = checkbox_date_str.match(/(\w*\s\w*-\w*)/ig);
    checkbox_date_str = checkbox_date_str ? checkbox_date_str[first_matched_item] : undefined;

    if (event.target.checked) {
      checkboxes.forEach(function (current_item) {
        var haystack = $(current_item).parent().text(),
          found = ~haystack.indexOf(checkbox_date_str);
        if (found) {
          $(current_item).parent().addClass('disabled');
          $(current_item).attr('disabled', 'disabled');
        }
      });
    } else {
      checkboxes.forEach(function (current_item) {
        var haystack = $(current_item).parent().text(),
          found = ~haystack.indexOf(checkbox_date_str);
        if (found) {
          $(current_item).parent().removeClass('disabled');
          $(current_item).removeAttr('disabled');
        }
      });
    }
  }

  function displayPrice() {
    var inputs = $.makeArray($('.activities').find('label')),
      $total_price = $('#total-price'),
      total_price = 0,
      empty_price = 0,
      first_matched_item = 0,
      first_character = 1,
      first_element = 0;
    inputs.forEach(function (current_item) {
      var price = Number($(current_item).text().match(/(\$\d+)/g)[first_matched_item].slice(first_character));
      if ($(current_item).children()[first_element].checked) {
        if (!isNaN(price)) {
          total_price += price;
        }
      }
    });
    if (total_price > empty_price) {
      $total_price.text('Total price: $' + total_price);
    } else {
      $total_price.text('');
    }
  }

  function filterPayments() {
    var payment_input = $('option:selected', this).val(),
      $credit_card_wrapper = $('#credit-card'),
      $paypal_wrapper = $('#paypal'),
      $bitcoin_wrapper = $('#bitcoin');

    if (payment_input === 'credit card') {
      $credit_card_wrapper.show();
      $paypal_wrapper.hide();
      $bitcoin_wrapper.hide();
    } else if (payment_input === 'paypal') {
      $credit_card_wrapper.hide();
      $paypal_wrapper.show();
      $bitcoin_wrapper.hide();
    } else if (payment_input === 'bitcoin') {
      $credit_card_wrapper.hide();
      $paypal_wrapper.hide();
      $bitcoin_wrapper.show();
    } else {
      $credit_card_wrapper.hide();
      $paypal_wrapper.hide();
      $bitcoin_wrapper.hide();
    }
  }

  function validateForm(e) {
    var $name_input = $('#name'),
      $email_input = $('#mail'),
      invalid_email,
      $activities_list = $('.activities'),
      checked_activity,
      no_checked_activities = 0,
      $payment_select = $('#payment'),
      $credit_card_wrapper = $('#credit-card'),
      payment_value = $payment_select.val(),
      $credit_card_number = $('#cc-num'),
      $invalid_cc_error = $('.invalid-cc'),
      invalid_cc_number,
      $credit_card_zip = $('#zip'),
      $invalid_zip_error = $('.invalid-zip'),
      invalid_zip,
      $credit_card_cvv = $('#cvv'),
      $invalid_cvv_error = $('.invalid-cvv'),
      invalid_cvv,
      validation_error = 'validation-error';
    if ($name_input.val() === '') {
      e.preventDefault();
      $name_input.prev('label').text('Name: (please provide your name)').addClass(validation_error);
    } else {
      $name_input.prev('label').text('Name:').removeClass(validation_error);
    }
    invalid_email = !$email_input.val().match(/^[-a-z0-9~!$%^&*_=+}{\\'?]+(\.[-a-z0-9~!$%^&*_=+}{\\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i);
    if (invalid_email) {
      e.preventDefault();
      $email_input.prev('label').text('Email: (please enter a correct email)').addClass(validation_error);
    } else {
      $email_input.prev('label').text('Email:').removeClass(validation_error);
    }
    checked_activity = $activities_list.find('input[type="checkbox"]:checked');

    if (checked_activity.length === no_checked_activities) {
      e.preventDefault();
      $activities_list.find('legend').text('Register for Activities (please select at least one activity)').addClass(validation_error);
    } else {
      $activities_list.find('legend').text('Register for Activities').removeClass(validation_error);
    }


    if (payment_value === 'credit card') {
      $invalid_cc_error.remove();
      $invalid_zip_error.remove();
      $invalid_cvv_error.remove();
      invalid_cc_number = $credit_card_number.val().replace(/\D+/, '');
      invalid_cc_number = !invalid_cc_number.match(/^(?:4[0-9]{12}(?:[0-9]{3})?|(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|6(?:011|5[0-9]{2})[0-9]{12}|(?:2131|1800|35\d{3})\d{11})$/);
      if (invalid_cc_number) {
        e.preventDefault();
        $credit_card_number.prev('label').addClass(validation_error);
        $credit_card_wrapper.prepend('<p class="invalid-cc">Please enter a valid card number.</p>').addClass(validation_error);
      } else {
        $credit_card_number.prev('label').removeClass(validation_error);
        $invalid_cc_error.remove();
      }
      invalid_zip = !$credit_card_zip.val().match(/^\d{5}(?:[-\s]\d{4})?$/);
      if (invalid_zip) {
        e.preventDefault();
        $credit_card_zip.prev('label').addClass(validation_error);
        $credit_card_wrapper.prepend('<p class="invalid-zip">Please enter a valid zip code.</p>').addClass(validation_error);
      } else {
        $credit_card_zip.prev('label').removeClass(validation_error);
        $invalid_zip_error.remove();
      }
      invalid_cvv = !$credit_card_cvv.val().match(/^\d{3}$/);
      if (invalid_cvv) {
        e.preventDefault();
        $credit_card_cvv.prev('label').addClass(validation_error);
        $credit_card_wrapper.prepend('<p class="invalid-cvv">Please enter a valid CVV code.</p>').addClass(validation_error);
      } else {
        $credit_card_cvv.prev('label').removeClass(validation_error);
        $invalid_cvv_error.remove();
      }
    }


  }

  $(document).on('change', '#title', showOtherJob);
  $(document).on('change', '#design', filterColor);
  $(document).on('change', 'input[type="checkbox"]', disableOverlaps);
  $(document).on('change', 'input[type="checkbox"]', displayPrice);
  $(document).on('change', '#payment', filterPayments);
  $(document).on('click', '#form-submit', validateForm);

  $(document).ready(function () {
    $('select').wrap('<div class="styled-select"></div>');
    var other_title = $('#other-title');
    $('body').find('input[type="text"]').first().focus();
    $('.activities').append('<span id="total-price"></span>');
    $('#colors-js-puns').hide();
    $('#payment').val('credit card');
    $('#paypal').hide();
    $('#bitcoin').hide();
    other_title.prev().hide();
    other_title.hide();
  });

})(jQuery);
