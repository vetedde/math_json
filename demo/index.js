/*global $,XMLSerializer cases math:true*/
'use strict';

math.import(cmathml);

const serializer = new XMLSerializer();

cases.forEach(function(item, i) {
  _createFormulaContainer(item, i);

  let formulaMathjsParse = math.parse(item);
  let formulaCMathML = formulaMathjsParse.toCMathML();

  if (formulaMathjsParse && formulaCMathML) {
    $(`#mathJaxTex${i}`).text(`$$${formulaMathjsParse.toTex()}$$`);
    $(`#mathjs${i}`).html(() => {
      return JSON.stringify(formulaMathjsParse, null, 2)
        .replace(/\n/g, '<br/>')
        .replace(/ /g, '&nbsp;');
    });
    $(`#textarea${i}`).val(() => {
      return serializer.serializeToString(formulaCMathML).replace(/></g,'>\n<');
    });
    $(`#mathJaxCMathMl${i}`).html(serializer.serializeToString(formulaCMathML));

    $('<li>')
      .addClass('w3-border')
      .append($('<a>', {href: `#case${i}`, text: `Example #${i}: ${item}`}))
      .appendTo($('#navigate'));
  }
});




$('#superCompress').click(() => {
  $('.mathjs').css('height', '300px');
});
$('#fixSuperComress').click(() => {
  $('.mathjs').css('height', '300px');
});
$('#superExpand').click(() => {
  $('.mathjs').css('height', 'auto');
});
$('#fixSuperExpand').click(() => {
  $('.mathjs').css('height', 'auto');
});

$('.up').click(() => {
  $('html, body').animate({scrollTop: 0},700);
  return false;
});

function _createFormulaContainer(item, i) {
  let container = $('<div>', {'id': `case${i}`}).appendTo($('#content'));

  //Header of
  $('<h2>', {'text': `Example #${i}`}).appendTo(container);

  //Minify btn
  $('<button>')
    .addClass('w3-button w3-circle w3-purple w3-small w3-margin-bottom')
    .click(() => {
      $(`#mathjs${i}`).css('height', '300px');
    })
    .append($('<i>').addClass('fa fa-compress'))
    .appendTo(container);

  //Expand btn
  $('<button>')
    .addClass('w3-button w3-circle w3-indigo w3-small w3-margin-bottom w3-margin-left')
    .click(() => {
      $(`#mathjs${i}`).css('height', 'auto');
    })
    .append($('<i>').addClass('fa fa-expand'))
    .appendTo(container);

  $('<h3>', {'text': 'Input:'}).appendTo(container);

  //Native caption formula
  $('<p>', {'text': item}).appendTo(container);
  $('<h3>', {text: 'parsed string:'})
    .addClass('w3-margin-bottom')
    .appendTo(container);

  //div for mathjs-parsed formula
  $('<div>', {'id': `mathjs${i}`})
    .addClass('mathjs w3-margin-bottom')
    .appendTo(container);

  $('<h3>', {text: 'cMathML produced:'})
    .appendTo(container);

  //textarea for cMathML
  $('<textarea>', {'id': `textarea${i}`})
    .addClass('w3-margin-bottom')
    .appendTo(container);

  $('<h3>', {text: 'MathJax presentation of transformation: string -> TeX:'})
    .appendTo(container);

  //tex-formula
  $('<div>', {'id': `mathJaxTex${i}`})
    .appendTo(container);

  $('<h3>', {text: 'MathJax presentation of transformation: string -> cMathML:'})
    .appendTo(container);

  //CMathMl-formula
  $('<div>', {'id': `mathJaxCMathMl${i}`})
    .addClass('w3-center')
    .appendTo(container);

  //up
  $('<button>')
    .addClass('w3-padding w3-circle w3-blue-grey w3-button up')
    .append($('<i>').addClass('fa fa-arrow-up'))
    .appendTo(container);

  $('<hr>').appendTo(container);

}
